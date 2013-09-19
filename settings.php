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
OC_Util::checkAdminUser();

if($_POST) {
    // CSRF check
    OCP\JSON::callCheck();

    if(isset($_POST['proton_url'])) {
        OC_CONFIG::setValue('user_proton_url', strip_tags($_POST['proton_url']));
    }
    if(isset($_POST['proton_oauth_client_id'])) {
        OC_CONFIG::setValue('user_proton_oauth_client_id', strip_tags($_POST['proton_oauth_client_id']));
    }
    if(isset($_POST['proton_oauth_secret'])) {
        OC_CONFIG::setValue('user_proton_oauth_secret', strip_tags($_POST['proton_oauth_secret']));
    }
    if(isset($_POST['proton_api_url'])) {
        OC_CONFIG::setValue('user_proton_api_url', strip_tags($_POST['proton_api_url']));
    }
    if(isset($_POST['proton_dnd_url'])) {
        OC_CONFIG::setValue('files_proton_dnd_url', strip_tags($_POST['proton_dnd_url']));
    }
}
// fill template
$tmpl = new OC_Template( 'files_proton', 'settings');
$tmpl->assign( 'proton_url', OC_Config::getValue( "user_proton_url" ));
$tmpl->assign( 'proton_oauth_client_id', OC_Config::getValue( "user_proton_oauth_client_id" ));
$tmpl->assign( 'proton_oauth_secret', OC_Config::getValue( "user_proton_oauth_secret" ));
$tmpl->assign( 'proton_api_url', OC_Config::getValue( "user_proton_api_url" ));
$tmpl->assign( 'proton_dnd_url', OC_Config::getValue( "files_proton_dnd_url" ));

$code = OC_Config::getValue( "files_proton_dnd_code" );
if (empty($code)) {
    $code = substr(md5(rand()),0,10);
    OC_CONFIG::setValue('files_proton_dnd_code', $code);
}
$tmpl->assign( 'proton_dnd_code', $code);
return $tmpl->fetchPage();
