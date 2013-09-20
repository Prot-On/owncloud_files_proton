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

OC.Proton = {
    FILE_TYPE_UNPROTECTED:0,
    FILE_TYPE_PROTECTED_DND:1,
    FILE_TYPE_PROTECTED:2,
    FILE_TYPE_UNSUPPORTED:3,
    fileTypes:[],
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
        var tr          = $('tr').filterAttr('data-file', fileName);
        var appendTo    = $(tr).find('td.filename');
        var itemSource  = $(tr).data('id');
        if (OC.Proton.droppedDown) {
            if (itemSource != $('#proton-dropdown').attr('data-item-source')) {
                OC.Proton.hideDropDown(function () {
                    $(tr).addClass('mouseOver');
                    OC.Proton.showDropDown(itemSource, appendTo);
                });
            } else {
                OC.Proton.hideDropDown();
            }
        } else {
            $(tr).addClass('mouseOver');
            OC.Proton.showDropDown(itemSource, appendTo);
        }
    },
    iconLoad:function(index) {
        // What type is this file?
        var fileName    = $(this).attr('data-file');
        var itemSource  = $(this).attr('data-id');
        var fileType    = OC.Proton.fileTypeGet(fileName);
        OC.Proton.fileTypes[itemSource] = fileType;
    },
    iconsLoad:function(itemType) {
        $('#fileList tr').filterAttr('data-type', itemType).each(OC.Proton.iconLoad);
    },
    showDropDown:function(itemSource, appendTo) {
        var fileType = OC.Proton.fileTypes[itemSource];
        var html = '<div id="proton-dropdown" class="drop" data-item-source="' + itemSource + '">';
        html += '<ul>';
        if (fileType == OC.Proton.FILE_TYPE_UNPROTECTED) {
            html += '<li><a href="#" class="proton-action-protect">Proteger</a></li>';
        } else if (fileType == OC.Proton.FILE_TYPE_PROTECTED_DND) {
            html += '<li><a href="#" class="proton-action-view">Ver</a></li>';
        } else {
            html += 'Tipo de archivo no soportado';
        }
        if ( (fileType == OC.Proton.FILE_TYPE_PROTECTED) ||
             (fileType == OC.Proton.FILE_TYPE_PROTECTED_DND) ) {
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
        $(this).find('.proton-action-view').click(OC.Proton.getUrlAndRedirect('view'));
        $(this).find('.proton-action-protect').click(OC.Proton.actionProtect);
        $(this).find('.proton-action-unprotect').click(OC.Proton.actionUnprotect);
        $(this).find('.proton-action-rights').click(OC.Proton.getUrlAndRedirect('rights'));
        $(this).find('.proton-action-activity').click(OC.Proton.getUrlAndRedirect('activity'));
    },
    actionProtect:function(event) {
        var itemSource = $(this).closest('#proton-dropdown').data('item-source');
    },
    actionUnprotect:function(event) {
        var itemSource = $(this).closest('#proton-dropdown').data('item-source');
    },
    getUrlAndRedirect: function(action) {
    	return function(event) {
	        var itemSource = $(this).closest('#proton-dropdown').data('item-source');
	        $.get(OC.filePath('files_proton', 'ajax', 'action.php'),
	            { action: action, itemSource: itemSource },
	            function(result) {
	                if (result && result.status === 'success') {
	                	$.fancybox({
	                		'href'				: result.redirect,
							'width'				: '75%',
							'height'			: '75%',
					        'autoScale'     	: false,
					        'transitionIn'		: 'none',
							'transitionOut'		: 'none',
							'type'				: 'iframe'
						});
	                }
	        });
		};
    }
};

$(document).ready(function(){

    if (typeof OC.Proton !== 'undefined' && typeof FileActions !== 'undefined') {
        FileActions.register('file', 'Proton', OC.PERMISSION_READ, OC.imagePath('files_proton', 'proton'), OC.Proton.register);
    }
    OC.Proton.iconsLoad('file');

    // Settings
	$('#somesetting').blur(function(event){
		event.preventDefault();
		var post = $( "#somesetting" ).serialize();
		$.post( OC.filePath('apptemplate', 'ajax', 'seturl.php') , post, function(data){
			$('#apptemplate .msg').text('Finished saving: ' + data);
		});
	});

	$(this).click(function(event) {
		var target = $(event.target);
		var isMatched = !target.is('.drop, .ui-datepicker-next, .ui-datepicker-prev, .ui-icon')
			&& !target.closest('#ui-datepicker-div').length;
		if (OC.Proton.droppedDown && isMatched && $('#proton-dropdown').has(event.target).length === 0) {
			OC.Proton.hideDropDown();
		}
	});


});
