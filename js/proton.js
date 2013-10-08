/**
 * ownCloud - ProtOn files plugin
 *
 * @author Antonio Espinosa
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

OC.Proton = {
    FILE_TYPE_UNPROTECTED:0,
    FILE_TYPE_PROTECTED_DND:1,
    FILE_TYPE_PROTECTED:2,
    FILE_TYPE_UNSUPPORTED:3,
	MIMETYPES: new Array(
		'application/msword', 
		'application/msexcel',
		'application/mspowerpoint',
		'application/pdf',
		'image'),
	UNPROTECTED: /.*\.(docx|xlsx|pptx|pdf|jpg|png|gif|bmp|tiff)$/,
    PROTECTED_DND: /.*\.proton.*?\.(docx|xlsx|pptx|pdf|jpg|png|gif|bmp|tiff)$/,
    PROTECTED: /.*\.proton.*?\..+$/,
    droppedDown:false,
    lastAjaxCall: null,
    dndEnabled: false,
    fileTypeGet:function(fileName) {
        if (OC.Proton.PROTECTED_DND.test(fileName)) {
            return OC.Proton.FILE_TYPE_PROTECTED_DND;
        } else if (OC.Proton.PROTECTED.test(fileName)) {
            return OC.Proton.FILE_TYPE_PROTECTED;
        } else if (OC.Proton.UNPROTECTED.test(fileName)) {
            return OC.Proton.FILE_TYPE_UNPROTECTED;
        }
        return OC.Proton.FILE_TYPE_UNSUPPORTED;
    },
    register:function(fileName) {
        // Show drop down
        var $tr          = $('tr').filterAttr('data-file', fileName);
        var appendTo    = $tr.find('td.filename');
        if (OC.Proton.droppedDown) {
            if ($tr.attr('data-id') != $('#proton-dropdown').attr('data-item-source')) {
                OC.Proton.hideDropDown(function () {
                    $tr.addClass('mouseOver');
                    OC.Proton.showDropDown($tr, appendTo);
                });
            } else {
                OC.Proton.hideDropDown();
            }
        } else {
            $tr.addClass('mouseOver');
            OC.Proton.showDropDown($tr, appendTo);
        }
    },
    showDropDown:function($tr, appendTo) {
        var fileName    = $tr.attr('data-file');
        var itemSource  = $tr.attr('data-id');
        var fileType    = OC.Proton.fileTypeGet(fileName);
        var html = '<div id="proton-dropdown" class="drop" data-item-source="' + itemSource + '">';
        html += '<ul>';
        if (fileType == OC.Proton.FILE_TYPE_UNPROTECTED) {
            html += '<li><a href="#" class="proton-action-protect">'+t('files_proton','Protect')+'</a></li>';
        } else {
            html += '<li><a href="#" class="proton-action-rights">'+t('files_proton','Manage permision')+'</a></li>';
            html += '<li><a href="#" class="proton-action-activity">'+t('files_proton','View activity log')+'</a></li>';
            html += '<li><a href="#" class="proton-action-unprotect">'+t('files_proton','Unprotect')+'</a></li>';
        }
        html += '</ul>';
        html += '</div>';
        $(html).appendTo(appendTo);

        $('#proton-dropdown').each(OC.Proton.setActions);
        $('#proton-dropdown').show('blind', function() {
            OC.Proton.droppedDown = true;
        });
    },
    hideDropDown:function(callback) {
        $('#proton-dropdown').hide('blind', function() {
            OC.Proton.droppedDown = false;
            $('#proton-dropdown').remove();
            if (typeof FileActions !== 'undefined') {
                $('tr').removeClass('mouseOver');
            }
            if (callback) {
                callback.call();
            }
        });
    },
    setActions:function() {
        $(this).find('.proton-action-protect').click(OC.Proton.modifyFileContents('protect', 'Error protecting file'));
        $(this).find('.proton-action-unprotect').click(OC.Proton.modifyFileContents('unprotect', 'Error unprotecting file'));
        
        $(this).find('.proton-action-view').click(OC.Proton.getUrlAndRedirect('view', 'Error processing file'));
        $(this).find('.proton-action-rights').click(OC.Proton.getUrlAndRedirect('rights', 'Error processing file'));
        $(this).find('.proton-action-activity').click(OC.Proton.getUrlAndRedirect('activity', 'Error processing file'));
    },
    modifyFileContents: function(action, title) {
    	return function(event) {
    		var $tr = $(this).closest('tr');
			var path = $('#dir').val()+"/"+$tr.attr('data-file');
    		var itemSource = $tr.attr('data-id');
    		OC.Proton.lastAjaxCall = OC.Proton.getModifyAjaxFunction(action, itemSource, path, $tr, title);
    		OC.Proton.lastAjaxCall();
       };
    },
    getModifyAjaxFunction: function (action, itemSource, path, $tr, title) {
    	return function() {
	        $.get(OC.filePath('files_proton', 'ajax', 'action.php'),
	            { action: action, itemSource: itemSource, path: path },
	            OC.Proton.checkResult(title, function(result) {
	            	OC.Proton.renameAndRefresh($tr, result);
    			}));
    	};
    },
    renameAndRefresh: function(tr, result) {
    	var newname = result.name;
    	var name = tr.attr('data-file');
		tr.attr('data-file', newname);
		tr.attr('data-size', result.size);
		var td=tr.children('td.filename');
		var path = td.children('a.name').attr('href');
		td.children('a.name').attr('href', path.replace(encodeURIComponent(name), encodeURIComponent(newname)));
		if (newname.indexOf('.') > 0 && tr.attr('data-type') != 'dir') {
			var basename=newname.substr(0,newname.lastIndexOf('.'));
		} else {
			var basename=newname;
		}
		td.find('a.name span.nametext').text(basename);
		if (newname.indexOf('.') > 0 && tr.attr('data-type') != 'dir') {
			if (td.find('a.name span.extension').length == 0 ) {
				td.find('a.name span.nametext').append('<span class="extension"></span>');
			}
			td.find('a.name span.extension').text(newname.substr(newname.lastIndexOf('.')));
		}
		OC.Proton.hideDropDown();
    },
    getUrlAndRedirect: function(action, title) {
    	return function(path, itemSource) {
    		if (!itemSource && typeof path == 'object') {
	    		var $tr = $(this).closest('tr');
				var path = $('#dir').val()+"/"+$tr.attr('data-file');
	    		var itemSource = $tr.attr('data-id');
    		}
    		OC.Proton.lastAjaxCall = OC.Proton.getAjaxUrlAndRedirect(action, itemSource, path, title);
    		OC.Proton.lastAjaxCall();
		};
    },
    getAjaxUrlAndRedirect: function(action, itemSource, path, title) {
    	return function() {
	        $.get(OC.filePath('files_proton', 'ajax', 'action.php'),
	            { action: action, itemSource: itemSource, path: path },
	            OC.Proton.checkResult(title,
		            function(result) {
		                if (result && result.status === 'success') {
		                	OC.Proton.lastAjaxCall = null;
		                	OC.Proton.hideDropDown();
		                	OC.Proton.openIframe(result.redirect, '');
		                }
	        		}
	        ));
    	};
    },
    checkResult: function(title, func) {
    	return function(result) {
			if (!result || result.status == 'error') {
				OC.dialogs.alert(result.data.message, t('files_proton',title));
			} else if (result.status == 'oauth'){
				OC.Proton.hideDropDown();
				OC.Proton.openIframe(result.oauth, t('files_proton','Link your Prot-On account'));
			} else if (func){
				func(result);
			}
		};
    },
	openIframe: function (url, title) {
		$dialog = $('<div><iframe id="proton_OAuth" style="width:99%; height:99%; margin: 0 auto;"/></div>');
		$('body').append($dialog);
		$dialog.dialog({
		    show: "fade",
		    hide: "fade",
		    modal: true,
		    height: parseInt( $(window).height() * parseFloat(80) / 100, 10),
		    width: parseInt( $(window).width() * parseFloat(80) / 100, 10),
		    resizable: true,
		    open: function (ev, ui) {
				$('#proton_OAuth').attr('src',url);
		    },
		    close: function( ev, ui ) {
		    	$dialog.remove();
		    },
		    title: title
		});	
	},
	closeIframe: function() {
		$('#proton_OAuth').parent().dialog('close');
		if (OC.Proton.lastAjaxCall) {
			OC.Proton.lastAjaxCall();			
		}
	},
    hijackDefault: function () { //Overwrite defaults for our supported files with our filter function
		for (var i = 0; i < OC.Proton.MIMETYPES.length; ++i){
			var mime = OC.Proton.MIMETYPES[i];
			var name = FileActions.defaults[mime];
			if (name) {
				var oldDefault = FileActions.actions[mime][name]['action'];
				var newDefault = OC.Proton.newDefaultGenerator(oldDefault);
				FileActions.actions[mime][name]['action'] = newDefault;
			} else {
				var newDefault = OC.Proton.newDefaultGenerator();
				FileActions.register(mime,'View',OC.PERMISSION_READ,'',function(filename){
					newDefault(filename);
				});
				FileActions.setDefault(mime,'View');
			}
		}	
	},
	newDefaultGenerator: function (oldDefault) { //This should show or downoad protected files and download or call existing default for not protected files
		return function(file) {
			var type = OC.Proton.fileTypeGet(file);
			if (type == OC.Proton.FILE_TYPE_PROTECTED_DND) {
				var itemSource = $('tr').filterAttr('data-file', file).attr('data-id');
				var path = $('#dir').val() + "/" + file;
				OC.Proton.getUrlAndRedirect('view', 'Error processing file')(path, itemSource);
			} else if (type != OC.Proton.FILE_TYPE_PROTECTED && oldDefault) {
				oldDefault(file);
			} else {//No Old and protected but no DnD
				window.location = OC.filePath('files', 'ajax', 'download.php') + '?files=' + encodeURIComponent(file) + '&dir=' + encodeURIComponent($('#dir').val());
			}
		};
	},
	checkIfProtonFile: function (itemSource) {
		var file = $('tr').filterAttr('data-id', String(itemSource)).data('file');
		return (OC.Proton.PROTECTED.test(file));
	},
	parseQueryString: function(query) {
    	query = query.split('&');
    	if (query == "") return {};
		var ret = {};
    	for (var i = 0; i < query.length; ++i) {
        	var param=query[i].split('=');
        	if (param.length != 2) continue;
        	ret[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
    	}
    	return ret;  	
	}
};

$(document).ready(function(){

    if (typeof OC.Proton !== 'undefined' && typeof FileActions !== 'undefined') {
		for (var i = 0; i < OC.Proton.MIMETYPES.length; ++i){
			var mime = OC.Proton.MIMETYPES[i];
	        FileActions.register(mime, 'Prot-On', OC.PERMISSION_UPDATE, OC.imagePath('files_proton', 'proton'), OC.Proton.register);
		}
		if (OC.Proton.dndEnabled) {
			setTimeout(OC.Proton.hijackDefault,100);
		}
    }
    
	$(this).click(function(event) {
		var target = $(event.target);
		var isMatched = !target.is('.drop, .ui-datepicker-next, .ui-datepicker-prev, .ui-icon')
			&& !target.closest('#ui-datepicker-div').length;
		if (OC.Proton.droppedDown && isMatched && $('#proton-dropdown').has(event.target).length === 0) {
			OC.Proton.hideDropDown();
		}
	});
	
	$( document ).ajaxSuccess(function( event, xhr, settings ) {
		if ( settings.url == OC.filePath('core', 'ajax', 'share.php')) {
			var params = OC.Proton.parseQueryString(settings.data);
			if ( ( params['action'] == 'email' ||
				params['action'] == 'setExpirationDate' ) 
				&& OC.Proton.checkIfProtonFile(params['itemSource'])
			) {
				data = $.parseJSON(xhr.responseText);
				if (data && data.status == 'success') {
					$.get(OC.filePath('files_proton', 'ajax', 'action.php'), { action: params['action'], itemSource: params['itemSource'], date: params['date'], email: params['toaddress'], link: params['link']});				
				}
			}
		}
	});
});

