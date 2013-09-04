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
$action     = $_GET['action'];
$itemSource = $_GET['itemSource'];
$availableActions = array('view', 'protect', 'unprotect', 'rights', 'activity');

if (empty($action)) { OC_JSON::error(array('msg' => 'No action selected')); die; }
if (!in_array($action, $availableActions)) { OC_JSON::error(array('msg' => 'Action is not available',
                                                                  'availableActions' => $availableActions)); die; }
if (empty($itemSource)) { OC_JSON::error(array('msg' => 'No itemSource selected')); die; }
if (!is_numeric($itemSource)) { OC_JSON::error(array('msg' => 'itemSource must be a number')); die; }

switch ($action) {
    case 'view':
        OC_JSON::success(array('redirect' => 'http://owncloud.proton.teachnova.net/dnd/view?id=' . $itemSource));
        break;
    case 'protect':
        OC_JSON::success(array('redirect' => 'http://owncloud.proton.teachnova.net/dnd/protect?id=' . $itemSource));
        break;
    case 'unprotect':
        OC_JSON::success(array('redirect' => 'http://owncloud.proton.teachnova.net/dnd/unprotect?id=' . $itemSource));
        break;
    case 'rights':
        OC_JSON::success(array('redirect' => 'http://owncloud.proton.teachnova.net/dnd/rights?id=' . $itemSource));
        break;
    case 'activity':
        OC_JSON::success(array('redirect' => 'http://owncloud.proton.teachnova.net/dnd/activity?id=' . $itemSource));
        break;
    default:
        OC_JSON::error();
}
