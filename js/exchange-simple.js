/* global $ */

(function () {

    'use strict';

    var exchangeApp = {};

    exchangeApp.accountStatus = {
        "Automatic": {
            "id" : "status-auto",
            "helpText" : "Automatic help text",
            "modalMessage": "Automatic message"
        },
        "UW Exchange": {
            "id" : "status-uw-exchange",
            "helpText" : "UW Exchange help text",
            "modalMessage": "UW Exchange message"
        },
        "Exchange Local": {
            "id" : "status-exchange-local",
            "helpText" : "Exchange Local help text",
            "modalMessage": "UW Exchange Local message"
        },
        "Exchange GAL Only": {
            "id" : "status-gal",
            "helpText" : "GAL help text",
            "modalMessage": "UW Exchange GAL Only message",
            "otherMessage" : "You only appear in the Exchange GAL but do not have access to email, etc."
        },
        "Off": {
            "id" : "status-off",
            "helpText" : "Off help text",
            "modalMessage": "Turning off UW Exchange. This is a destructive action and will do x and y.",
            "otherMessage" : "Your account is not configured to use Exchange."
        }
    }

    exchangeApp.theTabs = {
            "Account" : {
                "id" : "account",
                "helpText" : "Account Help"
            },
            "Mailbox" : {
                "id" : "mailbox",
                "helpText" : "Mailbox Help"
            },
            "Reply As" : {
                "id" : "reply-as",
                "helpText" : "Reply As Help"
            },
            "Mail Permissions" : {
                "id" : "permissions",
                "helpText" : "Mail Permissions Help"
            },
            "Delegates" : {
                "id" : "delegates",
                "helpText" : "Delegates Help"
            }
        }

    exchangeApp.modalCloseMessage = function () {
        console.log('running modalClose')

        // tab options

        // placement options


        $('#save-modal').click(function () {
            var message = '<div class="alert alert-success">' + 
              '<button type="button" class="close" data-dismiss="alert">×</button>' +
              'Account change successful.' +
            '</div>';

            $('.container').prepend(message);
            //if (placement === 'top') {
            //    $('#' + tab).prepend(message);
//
            //} else if (placement === 'bottom') {
            //    $('#' + tab).append(message);
            //}
        });
        //console.log('successAlert where = ' + tab)
    }
    
    exchangeApp.addButton = function (clickedStatus, tabId, placeSuccess) {
        $('#' + tabId).append('<br/><br/>' + 
        '<button type="button" class="save-changes btn btn-primary" data-loading-text="Saving...">Save Changes</button>');
        $('.save-changes').button().click(function() {
            exchangeApp.saveModal(clickedStatus);
        });
    }

    exchangeApp.saveModal = function (statusSet) {

        $('#save-modal').attr('data-status-set', statusSet).modal();
        $('.save-changes').hide();
        statusSet = $.trim(statusSet);
        $('#save-modal div.modal-body p').text(exchangeApp.accountStatus[statusSet].modalMessage);
        
        var tab,
            placement;
        var otherMessage = exchangeApp.accountStatus[statusSet].otherMessage;
        var offOrGALMessage = function (offOrGAL) {
            //$('#settings').hide();
             exchangeApp.showSettings.display(false);
            $('#new-address, #exchange-link').hide();
            $('#other-message').html(offOrGAL).fadeIn();
        }
        if (statusSet === 'Off') {
            offOrGALMessage(otherMessage);
        } else if (statusSet === 'Exchange GAL Only') {
            offOrGALMessage(otherMessage);
        } else if (statusSet === 'UW Exchange') {
            //
        }
        $('#save-modal').click(function (){
            exchangeApp.modalCloseMessage();
        });

    }
    
    exchangeApp.showSettings = {
        bind: function () {
            $('#show-settings').click(function() {
                $('#settings').fadeIn();
            });
        },
        display : function (value) {
            if (value === true) {
                $('#settings').show();

            } else if (value === false) {
                $('#settings').hide();
            }
        }
    }

    
    exchangeApp.setStatus = function (yourStatus) {
        $('#' + yourStatus).parent().attr('data-selected', 'true');
        var serviceStatus = $('li[data-selected="true"] a').text();
        $('#service-status').text(serviceStatus);
    }
    
    exchangeApp.statusDropdown = function () {
        $('#status-dropdown li a').click(function(){
            var clicked = $(this).text()
            exchangeApp.addButton(clicked, 'account-tab', 'settings');
        });
    }

    exchangeApp.helpText = {
        bind : function () {
            $('.help').click(function() {
                console.log('help for = ' + $('#service-status').text());
                var serviceStatus = $('#service-status').text(),
                helpText = exchangeApp.accountStatus[serviceStatus].helpText;
                $('#account-tab .help-well').toggle().html(helpText);
            });
        },
        dismiss : function (value) {
            if (value === true) {
                $('#account-tab .help-well').fadeOut().empty();
            }
        }
    }

    exchangeApp.deliverySettings = function () {
        //stuff
    }

    $(function(){
        // https://uwnetid.washington.edu/nws/v1/uwnetid/jtate/exchange.json
        // first enable the bootstrap plugins we need
        //$('.help').popover({'trigger':'hover'});

        exchangeApp.setStatus('status-auto');
        // bind the showSettings stuff
        exchangeApp.showSettings.bind();
        // this is more binding, but of the lame kind
        exchangeApp.statusDropdown();

        exchangeApp.helpText.bind();

       $('#delivery-settings-tab input').change(function(){
           // console.log('delivery settings changed');
           exchangeApp.addButton('delivery-settings-tab', 'delivery-settings-tab');
       });
    });
}());