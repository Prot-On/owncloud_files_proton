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
?>
<form id="files_proton" action="#" method="post">
    <fieldset class="personalblock">
         <input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']) ?>" id="requesttoken">
        <legend><strong><?php p($l->t('Prot-On Files Integration'));?></strong></legend>
        <p><label for="proton_api_url"><?php p($l->t('Prot-On API URL: '));?><input type="text" id="proton_api_url" name="proton_api_url" value="<?php p($_['proton_api_url']); ?>" style="width:20em;" title="<?php p($l->t('Url of the Prot-On rest API')); ?>"></label></p>
        
        <p><label for="proton_url"><?php p($l->t('Prot-On Server URL: '));?><input type="text" id="proton_url" name="proton_url" value="<?php p($_['proton_url']); ?>" style="width:20em;" title="<?php p($l->t('Url of the Prot-On server')); ?>"></label></p>
        <br />
        
        <p><label for="proton_oauth_client_id"><?php p($l->t('OAuth Client Id: '));?><input type="text" id="proton_oauth_client_id" name="proton_oauth_client_id" value="<?php p($_['proton_oauth_client_id']); ?>"></label>
        <label for="proton_oauth_secret"><?php p($l->t('OAuth Client Secret: '));?><input type="text" id="proton_oauth_secret" name="proton_oauth_secret" value="<?php p($_['proton_oauth_secret']); ?>"></label></p>
        <span class="msg"><?php p($l->t('OAuth credentials used to connect with Prot-On')); ?></span>
        <br />
        <br />
        <p><label for="proton_dnd_url"><?php p($l->t('Prot-On Drag and Drop URL: '));?><input type="text" id="proton_dnd_url" name="proton_dnd_url" value="<?php p($_['proton_dnd_url']); ?>" style="width:20em;" title="<?php p($l->t('Url of the Prot-On Drag and Drop server')); ?>"></label></p>
        <p><label for="proton_dnd_code"><?php p($l->t('DnD configuration code: '));?><input type="text" name="proton_dnd_code" disabled="disabled" value="<?php p(\OC_Helper::makeURLAbsolute('').';secret;'.$_['proton_dnd_code']); ?>" style="width:30em;"></label></p>
        <span class="msg"><?php p($l->t('You must add this to your DnD server configuration in the url.parameters section')); ?></span>
        <br />
        
        <br />
        <input type="submit" value="Save" />
    </fieldset>
</form>

