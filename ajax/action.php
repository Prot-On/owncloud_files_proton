<?php
/**
 * ownCloud - ProtOn files plugin
 *
 * @author Antonio Espinosa
 * @copyright 2013 Protección Online, S.L. info@prot-on.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
$action     = $_GET['action'];
$availableActions = array('view', 'protect', 'unprotect', 'rights', 'activity', 'setExpirationDate', 'email');

const PUT = 'PUT';
const POST = 'POST';
const GET  = 'GET';

if (empty($action)) {
	 OC_JSON::error(array( 'data' => array( 'message' => $l->t('No action selected')))); 
	 exit(); 
}
if (!in_array($action, $availableActions)) {
	 OC_JSON::error(array( 'data' => array( 'message' => $l->t('Action is not available'),
                                                                  'availableActions' => $availableActions))); 
  	exit(); 
}
if (!isset($_GET['path']) && !isset($_GET['itemSource'])) {
	 OC_JSON::error(array( 'data' => array( 'message' => $l->t('No file selected')))); 
	 exit(); 
}

$path = isset($_GET['path'])?$_GET['path']:null;
$itemSource = isset($_GET['itemSource'])?$_GET['itemSource']:null;

switch ($action) {
    case 'view':
        $url = \OC_Helper::makeURLAbsolute('/public.php').'?service=files_proton&path='.urlencode($path).'&user_id='.urlencode(\OC_User::getUser());
        OC_JSON::success(array('redirect' => \OC_Config::getValue( "files_proton_dnd_url" ) .'?url=' . urlencode($url)));
        break;
    case 'protect':
        $temp = \OCA\Proton\Util::toTmpFilePath($path);
		$thing = executePest('/documents/encrypt', array('file' => '@'.$temp, 'algorithm' => 'AES128', 'return_url' => 'false'), 'Error protecting file', POST);
        \OC\Files\Filesystem::file_put_contents($path, $thing);
        $newPath = substr($path,0,strripos($path, '.')).'.proton'.substr($path,strripos($path, '.'));
        \OC\Files\Filesystem::rename($path, $newPath);
        OC_JSON::success(array('name' => basename ($newPath), 'size' => \OC\Files\Filesystem::filesize($newPath)));
        break;
    case 'unprotect':
        $temp = \OCA\Proton\Util::toTmpFilePath($path);
		$thing = executePest('/documents/decrypt', array('file' => '@'.$temp), 'Error unprotecting file', POST);
        \OC\Files\Filesystem::file_put_contents($path, $thing);
        $newPath = preg_replace("/\.proton.*?\./", ".", $path);
        \OC\Files\Filesystem::rename($path, $newPath);
        OC_JSON::success(array('name' => basename ($newPath), 'size' => \OC\Files\Filesystem::filesize($newPath)));
        break;
    case 'rights':
        $docIds = getDocIds($itemSource);
        OC_JSON::success(array('redirect' => \OC_Config::getValue( "user_proton_url" ) . 'manager.do?action=detail&xdocid=' . urlencode($docIds['xDocId'])));
        break;
    case 'activity':
        $docIds = getDocIds($itemSource);
        OC_JSON::success(array('redirect' => \OC_Config::getValue( "user_proton_url" ) . 'showActivityForm.do?docId=' . urlencode($docIds['docId'])));
        break;
    case 'setExpirationDate':
		$docIds = getDocIds($itemSource);
		$params = array();
		if ($_GET['date'] && !empty($_GET['date'])) {
			$date = DateTime::createFromFormat('d-m-Y', $_GET['date']);
			$date->setTime(0,0);
			$params['to_time'] = $date->format('d/m/Y H:i');
		} else {
			$params['to_time'] = '';
		}
		executePest('/documents/'.$docIds['docId'].'/validity_period', $params, 'Error setting expiration time in Prot-On', PUT);  
		break;
    case 'email':
		$docIds = getDocIds($itemSource);
		$params = array();
		$permission = array('modify'=>false, 'read' => true, 'manage' => false, 'print' => false, 'copy' => false);
		$attachment = array('permissionDTO' => $permission, 'docId' => intval($docIds['docId']), 'openInViewer' => false, 'url' => $_GET['link']);
		$invitations = array(array('message' => '', 'email' => $_GET['email'], 'attachments' => array($attachment))); 
	    $pest = getPest();
		try {
        	$pest->post('/users/invite', json_encode($invitations), array('Content-Type' => 'application/json'));
	    } catch (\Exception $e) {
	        \OCA\Proton\Util::log('Excepcion '.$e);
	        $l = OC_L10N::get('lib');
	        OC_JSON::error(array( 'data' => array( 'message' => $l->t('Error inviting user') )));
	        exit();
	    }
		break;
    default:
        OC_JSON::error();
}

function executePest($url, $params, $errorTitle, $type) {
    $pest = getPest();
	$thing = null;
    try {
    	switch ($type) {
			case POST:
		        $thing = $pest->post($url, $params);
				break;
			case PUT:
		        $thing = $pest->put($url, $params);
				break;
			default:
		        $thing = $pest->get($url, $params);
				break;
		}
    } catch (\Exception $e) {
        \OCA\Proton\Util::log('Excepcion '.$e);
        $l = OC_L10N::get('lib');
        OC_JSON::error(array( 'data' => array( 'message' => $l->t($errorTitle) )));
        exit();
    }
	return $thing;
}

function getDocIds($itemSource) {
    $docIds = null;
    try {
        $docIds = \OCA\Proton\Util::getDocIds($itemSource);
    } catch (\Exception $e) {
        $token = \OCA\Proton\OAuthPersist::getToken();
        if ($token) {
            \OCA\Proton\Util::setToken($token);
            $docIds = \OCA\Proton\Util::getDocIds($itemSource);
        } else {
            OC_JSON::encodedPrint(array('oauth' => getOAuthUrl(), 'status' => 'oauth'));
            die();
        }
    }
    return $docIds;
    
}

function getPest() {
    $pest = null;
    try {
        $pest = \OCA\Proton\Util::getPest();
    } catch (\Exception $e) {
        $token = \OCA\Proton\OAuthPersist::getToken();
        if ($token) {
            \OCA\Proton\Util::setToken($token);
            $pest = \OCA\Proton\Util::getPest();
        } else {
            OC_JSON::encodedPrint(array('oauth' => getOAuthUrl(), 'status' => 'oauth'));
            die();
        }
    }
    return $pest;
}

function getOAuthUrl() {
    return \OCP\Util::linkToRoute( 'proton_files_oauth');
}
