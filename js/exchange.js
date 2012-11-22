/* global $ */

// https://github.com/h5bp/html5-boilerplate/blob/master/js/plugins.js
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


(function () {

    'use strict';

    var exchangeApp = {};

    //jqXHR, textStatus, errorThrown

    exchangeApp.ajaxConsoleLog = function (textStatus, jqXHR) {
        var face;
        if (textStatus === 'success') {
            face = ':)';
        } else {
            face = ':(';
        }
        console.log(face + ' ' +  textStatus.toUpperCase()  + ' -- jqXHR.statusText = ' + jqXHR.statusText + ', textStatus = ' + textStatus);
    };

    exchangeApp.accountStatus = {
        "default": {
            "name" : "Default",
            "id" : "status-auto",
            "helpText" : "Automatic help text",
            "modalMessage": "Automatic message"
        },
        "exchange": {
            "name" : "UW Exchange",
            "id" : "status-uw-exchange",
            "helpText" : "UW Exchange help text",
            "modalMessage": "UW Exchange message"
        },
        "local": {
            "name" : "exchange Local",
            "id" : "status-exchange-local",
            "helpText" : "Exchange Local help text",
            "modalMessage": "UW Exchange Local message"
        },
        "gal": {
            "name" : "Exchange GAL Only",
            "id" : "status-gal",
            "helpText" : "GAL help text",
            "modalMessage": "UW Exchange GAL Only message",
            "otherMessage" : "You only appear in the Exchange GAL but do not have access to email, etc.",
            "tabs" : ["account", "mailbox"]
        },
        "off": {
            "name" : "Off",
            "id" : "status-off",
            "helpText" : "Off help text",
            "modalMessage": "Turning off UW Exchange. This is a destructive action and will do x and y.",
            "otherMessage" : "Your account is not configured to use Exchange."
        }
    }

    exchangeApp.theTabs = {
            "account" : {
                "name" : "Account",
                "id" : "account",
                "helpText" : "Account Help",
                "icon" : "user"
            },
            "mailbox" : {
                "name" : "Mailbox",
                "id" : "mailbox",
                "helpText" : "Mailbox Help",
                "icon" : "inbox"
            },
            "replyAs" : {
                "name" : "Reply As",
                "id" : "reply-as",
                "helpText" : "Reply As Help",
                "icon" : "share-alt"
            },
            "mailPermissions" : {
                "name" : "Mail Permissions",
                "id" : "permissions",
                "helpText" : "Mail Permissions Help",
                "icon" : "unlock"
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
        $('#' + tabId).append('<br/><br/><hr/>' + 
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
            $('#exchange-address, #exchange-link').hide();
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
    
    exchangeApp.statusDropdown = function () {
        $('#status-dropdown li a').click(function(){
            var clicked = $(this).text()
            exchangeApp.addButton(clicked, 'account-tab', 'settings');
        });
    }

    exchangeApp.adjustSettings = {
        bind: function () {
            $('#show-settings').click(function() {
                $('#bottom-container').fadeIn();
            });
        },
        display: function (boolean) {
            if (value === true) {
                $('#bottom-container').show();
            } else if (value === false) {
                $('#bottom-container').hide();
            }
        }
    }

    exchangeApp.theTabs.displayTabs = function () {
        var html = '',
            theTabs = exchangeApp.theTabs;
        $.each(arguments, function (argKey, argValue) {
            $.each(theTabs, function (theTabsKey, theTabsValue) {
                if (argValue === theTabsKey) {
                    html +=  '<li><a href="#' + theTabsValue.id + '-tab" data-toggle="tab">' + theTabsValue.name + ' <i class="icon-' + theTabsValue.icon + '"></i></a></li>';
                } 
            })
        });
        $('ul.nav').append(html);
    }


    exchangeApp.setStatus = function (yourStatus) {
        console.log(yourStatus);
        $('#' + yourStatus).parent().attr('data-selected', 'true');
        var serviceStatus = $('li[data-selected="true"] a').text();
        $('#service-status').text(serviceStatus);
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
        //console.log('document ready');
        // https://uwnetid.washington.edu/nws/v1/uwnetid/jtate/exchange.json
        exchangeApp.adjustSettings.bind();


        //var netID = $.cookie('uwnetid_session');
        //console.log('netID = ' + netID.Value);

        $.ajax({
            url: 'user.json',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                exchangeApp.ajaxConsoleLog(textStatus, jqXHR);
                //console.log('user status is ' + data.status);
                var leadStatus = data.status;

                var tabsToShow = exchangeApp.accountStatus[leadStatus].tabs;
                console.log('tabsToShow = ' + typeof tabsToShow)

                // account, mailbox, replyAs, mailPermissions
                exchangeApp.theTabs.displayTabs('account', 'mailbox');  
                
                if (data.pending === true) {
                    $('#pending').show();
                }
                
                $('#lead-account-status, #service-status').append(exchangeApp.accountStatus[leadStatus].name);
                $('#other-message').show().text(exchangeApp.accountStatus[leadStatus].otherMessage);

                if (data.status === 'gal') {
                    //
                } else {
                    exchangeApp.setStatus('status-auto');
                    // bind the showSettings stuff
                    // this is more binding, but of the lame kind
                    exchangeApp.statusDropdown();
                    exchangeApp.helpText.bind();
                    $('#delivery-settings-tab input').change(function(){
                        // console.log('delivery settings changed');
                        exchangeApp.addButton('delivery-settings-tab', 'delivery-settings-tab');
                    }); 
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(':( Error: jqXHR.statusText = ' + jqXHR.statusText + ', textStatus = ' + textStatus);
            }
        });

    });
}());
