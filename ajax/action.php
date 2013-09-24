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
$path = $_GET['path'];
$itemSource = $_GET['itemSource'];
$availableActions = array('view', 'protect', 'unprotect', 'rights', 'activity');

if (empty($action)) { OC_JSON::error(array( 'data' => array( 'message' => $l->t('No action selected')))); exit(); }
if (!in_array($action, $availableActions)) { OC_JSON::error(array( 'data' => array( 'message' => $l->t('Action is not available'),
                                                                  'availableActions' => $availableActions))); exit(); }
if (!$path && !$itemSource) { OC_JSON::error(array( 'data' => array( 'message' => $l->t('No file selected')))); die; }

switch ($action) {
    case 'view':
        $url = \OC_Helper::makeURLAbsolute('/public.php').'?service=files_proton&path='.urlencode($path).'&user_id='.urlencode(\OC_User::getUser());
        OC_JSON::success(array('redirect' => \OC_Config::getValue( "files_proton_dnd_url" ) .'?url=' . urlencode($url)));
        break;
    case 'protect':
        $temp = \OCA\Proton\Util::toTmpFilePath($path);
        $pest = \OCA\Proton\Util::getPest();
        try {
            $thing = $pest->post('/documents/encrypt', array('file' => '@'.$temp, 'algorithm' => 'AES128', 'return_url' => 'false'));
        } catch (\Exception $e) {
            \OCA\Proton\Util::log('Excepcion '.$e);
            $l = OC_L10N::get('lib');
            OC_JSON::error(array( 'data' => array( 'message' => $l->t('Error protecting file') )));
            exit();
        }
        \OC\Files\Filesystem::file_put_contents($path, $thing);
        $newPath = substr($path,0,strripos($path, '.')).'.proton'.substr($path,strripos($path, '.'));
        \OC\Files\Filesystem::rename($path, $newPath);
        OC_JSON::success(array('name' => basename ($newPath), 'size' => \OC\Files\Filesystem::filesize($newPath)));
        break;
    case 'unprotect':
        $temp = \OCA\Proton\Util::toTmpFilePath($path);
        $pest = \OCA\Proton\Util::getPest();
        try {
            $thing = $pest->post('/documents/decrypt', array('file' => '@'.$temp));
        } catch (\Exception $e) {
            \OCA\Proton\Util::log('Excepcion '.$e);
            $l = OC_L10N::get('lib');
            OC_JSON::error(array( 'data' => array( 'message' => $l->t('Error unprotecting file') )));
            exit();
        }
        \OC\Files\Filesystem::file_put_contents($path, $thing);
        $newPath = preg_replace("/\.proton.*?\./", ".", $path);
        \OC\Files\Filesystem::rename($path, $newPath);
        OC_JSON::success(array('name' => basename ($newPath), 'size' => \OC\Files\Filesystem::filesize($newPath)));
        break;
    case 'rights':
        $docIds = \OCA\Proton\Util::getDocIds($itemSource);
        OC_JSON::success(array('redirect' => \OC_Config::getValue( "user_proton_url" ) . 'manager.do?action=detail&xdocid=' . urlencode($docIds['xDocId'])));
        break;
    case 'activity':
        $docIds = \OCA\Proton\Util::getDocIds($itemSource);
        OC_JSON::success(array('redirect' => \OC_Config::getValue( "user_proton_url" ) . 'showActivityForm.do?docId=' . urlencode($docIds['docId'])));
        break;
    default:
        OC_JSON::error();
}

