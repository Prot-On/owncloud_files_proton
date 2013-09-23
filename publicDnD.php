<?php

/**
 * ownCloud - ProtOn files plugin
 *
 * @author Ramiro Aparicio
 * @copyright 2013 Protección Online, S.L. info@prot-on.com
 *
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
 *
 */
 
// Load other apps for file previews
OC_App::loadApps();
if (!is_null(\OC_Config::getValue( "files_proton_dnd_url" ))  && !is_null(\OC_Config::getValue( "files_proton_dnd_code" ))
    && isset($_GET['secret']) && $_GET['secret'] === \OC_Config::getValue( "files_proton_dnd_code" )
    && isset($_GET['file_id']) && isset($_GET['user_id'])
) {
    $userId = $_GET['user_id'];
    OC_Util::tearDownFS();
    OC_Util::setupFS($userId);
    $path = \OC\Files\Filesystem::getPath($_GET['file_id']);
    if (isset($path)) {
        $dir = dirname($path);
        $file = basename($path);
        OC_Files::get($dir, $file, $_SERVER['REQUEST_METHOD'] == 'HEAD' ? true : false);
        exit();
    }
}
header('HTTP/1.0 404 Not Found');
$tmpl = new OCP\Template('', '404', 'guest');
$tmpl->printPage();
