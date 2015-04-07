<?php
/**
 * ownCloud - ProtOn files plugin
 *
 * @author Antonio Espinosa
 * @author Santiago Cuenca Lizcano
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
?>
<div class="section">
	<h2><?php p($l->t('Prot-On Files Integration'));?></h2>
	<form id="files_proton" action="#" method="post">
		<input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']) ?>" id="requesttoken">
		<fieldset>
			<legend><strong>Prot-On Rest API & Key Server</strong></legend>
			<p><label for="proton_api_url"><?php p($l->t('Prot-On API URL: '));?><input type="text" id="proton_api_url" name="proton_api_url" value="<?php p($_['proton_api_url']); ?>" style="width:20em;" title="<?php p($l->t('Url of the Prot-On rest API')); ?>"></label></p>
	
			<p><label for="proton_url"><?php p($l->t('Prot-On Server URL: '));?><input type="text" id="proton_url" name="proton_url" value="<?php p($_['proton_url']); ?>" style="width:20em;" title="<?php p($l->t('Url of the Prot-On server')); ?>"></label></p>
			<br />
		</fieldset>
		
		<fieldset>
			<legend><strong>OAuth Settings</strong></legend>

			<p><label for="proton_oauth_client_id"><?php p($l->t('OAuth Client Id: '));?><input type="text" id="proton_oauth_client_id" name="proton_oauth_client_id" value="<?php p($_['proton_oauth_client_id']); ?>"></label>
			<label for="proton_oauth_secret"><?php p($l->t('OAuth Client Secret: '));?><input type="text" id="proton_oauth_secret" name="proton_oauth_secret" value="<?php p($_['proton_oauth_secret']); ?>"></label></p>
			<span class="msg"><?php p($l->t('OAuth credentials used to connect with Prot-On')); ?></span>
			<br />
			<br />
			
		</fieldset>
		
		<fieldset>
			<legend><strong>Drag and Drop Settings</strong></legend>
			<p><label for="proton_dnd_url"><?php p($l->t('Prot-On Drag and Drop URL: '));?><input type="text" id="proton_dnd_url" name="proton_dnd_url" value="<?php p($_['proton_dnd_url']); ?>" style="width:20em;" title="<?php p($l->t('Url of the Prot-On Drag and Drop server')); ?>"></label></p>
			<p><label for="proton_dnd_code"><?php p($l->t('DnD configuration code: '));?><input type="text" name="proton_dnd_code" disabled="disabled" value="<?php p(\OC_Request::serverHost().';secret;'.$_['proton_dnd_code']); ?>" style="width:30em;"></label></p>
			<span class="msg"><?php p($l->t('You must add this to your DnD server configuration in the url.parameters section')); ?></span>
			<br />
		</fieldset>

		<br />
		<input type="submit" value="Save" />
	</form>
</div>

