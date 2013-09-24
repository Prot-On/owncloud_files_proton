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
    droppedDown:false,
	UNPROTECTED: /.*\.(docx|xlsx|pptx|pdf|jpg|png|gif|bmp|tiff)$/,
    PROTECTED_DND: /.*\.proton.*?\.(docx|xlsx|pptx|pdf|jpg|png|gif|bmp|tiff)$/,
    PROTECTED: /.*\.proton.*?\..+$/,
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
            html += '<li><a href="#" class="proton-action-protect">Proteger</a></li>';
        } else {
            html += '<li><a href="#" class="proton-action-rights">Gestionar permisos</a></li>';
            html += '<li><a href="#" class="proton-action-activity">Ver actividad</a></li>';
            html += '<li><a href="#" class="proton-action-unprotect">Desproteger</a></li>';
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
	        var itemSource = $(this).closest('#proton-dropdown').attr('data-item-source');
	        $.get(OC.filePath('files_proton', 'ajax', 'action.php'),
	            { action: action, itemSource: itemSource },
	            OC.Proton.checkResult(title, function(result) {
	            	OC.Proton.renameAndRefresh($tr, result);
    			}));
       };
    },
    getUrlAndRedirect: function(action, title) {
    	return function(itemSource) {
    		if (typeof itemSource == 'object') {
    			itemSource = $(this).closest('#proton-dropdown').attr('data-item-source');
    		}
	        $.get(OC.filePath('files_proton', 'ajax', 'action.php'),
	            { action: action, itemSource: itemSource },
	            OC.Proton.checkResult(title,
		            function(result) {
		                if (result && result.status === 'success') {
		                	$.fancybox({
		                		'href'				: result.redirect,
								'width'				: '75%',
								'height'			: '75%',
								'type'				: 'iframe',
								'autoScale'     	: false
							});
		                }
	        		}
	        ));
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
    checkResult: function(title, func) {
    	return function(result) {
			if (!result || result.status == 'error') {
				OC.dialogs.alert(result.data.message, title);
			} else if (func){
				func(result);
			}
		};
    }
};

$(document).ready(function(){

    if (typeof OC.Proton !== 'undefined' && typeof FileActions !== 'undefined') {
		for (var i = 0; i < OC.Proton.MIMETYPES.length; ++i){
			var mime = OC.Proton.MIMETYPES[i];
	        FileActions.register(mime, 'Prot-On', OC.PERMISSION_UPDATE, OC.imagePath('files_proton', 'proton'), OC.Proton.register);
		}
		FileActions.register('image','View', OC.PERMISSION_READ, '',function(filename){
			view($('#dir').val(),filename, true);
		});
		FileActions.setDefault('image','View');
		var supportedMimes = new Array(
			'application/msword', 
			'application/msexcel',
			'application/mspowerpoint');
		for (var i = 0; i < supportedMimes.length; ++i){
			var mime = supportedMimes[i];
			FileActions.register(mime,'View',OC.PERMISSION_READ,'',function(filename){
				view($('#dir').val(),filename, false);
			});
			FileActions.setDefault(mime,'View');
		}
		
    }
    
   	OC.search.customResults.Images=function(row,item){
		var image=item.link.substr(item.link.indexOf('download')+8);
		var a=row.find('a');
		a.attr('href','#');
		a.click(function(){
			image = decodeURIComponent(image);
			var pos=image.lastIndexOf('/');
			var file=image.substr(pos + 1);
			var dir=image.substr(0,pos);
			viewImage(dir,file);
		});
	};

	$(this).click(function(event) {
		var target = $(event.target);
		var isMatched = !target.is('.drop, .ui-datepicker-next, .ui-datepicker-prev, .ui-icon')
			&& !target.closest('#ui-datepicker-div').length;
		if (OC.Proton.droppedDown && isMatched && $('#proton-dropdown').has(event.target).length === 0) {
			OC.Proton.hideDropDown();
		}
	});
});

function view(dir, file, image) {
	var type = OC.Proton.fileTypeGet(file);
	if (type == OC.Proton.FILE_TYPE_PROTECTED_DND) {
		var itemSource = $('tr').filterAttr('data-file', file).attr('data-id');
		OC.Proton.getUrlAndRedirect('view', 'Error processing file')(itemSource);
		return;
	} else if ((type == OC.Proton.FILE_TYPE_UNPROTECTED) && image){
		if(file.indexOf('.psd') < 0){//can't view those
			var location = fileDownloadPath(dir, file);
			$.fancybox({
				"href": location,
				"title": file.replace(/</, "&lt;").replace(/>/, "&gt;"),
				"titlePosition": "inside"
			});
			return;
		}
	}
	window.location = OC.filePath('files', 'ajax', 'download.php') + '?files=' + encodeURIComponent(file) + '&dir=' + encodeURIComponent($('#dir').val());
}

function hijackDefault(previous) {
	for (var i = 0; i < OC.Proton.MIMETYPES.length; ++i){
		var mime = OC.Proton.MIMETYPES[i];
		var oldDefault = FileActions.actions[mime]['View']['action'] = action;
		var newDefault = function(file) {
			var type = OC.Proton.fileTypeGet(file);
			if (type == OC.Proton.FILE_TYPE_PROTECTED_DND) {
				var itemSource = $('tr').filterAttr('data-file', file).attr('data-id');
				OC.Proton.getUrlAndRedirect('view', 'Error processing file')(itemSource);
			} else if (type == OC.Proton.FILE_TYPE_PROTECTED) {
				window.location = OC.filePath('files', 'ajax', 'download.php') + '?files=' + encodeURIComponent(file) + '&dir=' + encodeURIComponent($('#dir').val());
			} else {
				if (oldDefault) {
					oldDefault(file);
				}
			}
		};
		
	}	
}
