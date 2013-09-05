<?php

/**
 * ownCloud - ProtOn files plugin
 *
 * @author Antonio Espinosa
 * @copyright 2013 Protección Online, S.L. info@prot-on.com
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
 
 if (!in_array('curl', get_loaded_extensions())) {
    \OCP\Util::writeLog("ProtOn", 'This app needs cUrl PHP extension', \OCP\Util::DEBUG);
    return false;
}

include_once 'apps/files_proton/common/includes.php';
 
OCP\App::registerAdmin( 'files_proton', 'settings' );
OCP\Util::addScript('files_proton', 'proton');
OCP\Util::addStyle('files_proton', 'proton');


