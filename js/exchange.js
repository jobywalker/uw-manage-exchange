(function () {

    'use strict';


    // namespacing so it doesn't collide with pre-existing JavaScript 
    var exchangeApp = {};

    exchangeApp.accountState = function (arg) {
        var state = getURLParameter('state'); 
        if (state === 'pending') {
            $('#pending').show();
        } else if (state === 'ready') {
            $('#ready').show();
        } else if (state === 'problem') {
            $('#problem').show();
        }
    };
    
    //tabs: account, mailbox, replyAs, mailPermissions

    exchangeApp.accountStatus = function () {
        console.log('running .accountStatus')
        $.ajax({
            url: 'accounts.json',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                ajaxConsoleLog('accountStatus', textStatus, jqXHR);
                //console.log('$.ajax user status = ' + data.status)
                return data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(':( Error: jqXHR.statusText = ' + jqXHR.statusText + ', textStatus = ' + textStatus);
            }
        });
    }

    exchangeApp.accountStatus = {
        "default": {
            "name" : "Default",
            "id" : "status-auto",
            "helpText" : "Automatic help text",
            "modalMessage": "Automatic message",
            "otherMessage" : "UW is managing your Exchange settings",
            "tabs" : [
                "account", 
                "mailbox",
                "replyAs",
                "mailPermissions"
            ]
        },
        "exchange": {
            "name" : "UW Exchange",
            "id" : "status-uw-exchange",
            "helpText" : "UW Exchange help text",
            "modalMessage": "UW Exchange message",
            "otherMessage" : "You're using Exchange.",
            "tabs" : [
                "account", 
                "mailbox",
                "replyAs",
                "mailPermissions"
            ]
        },
        "local": {
            "name" : "Exchange Local",
            "id" : "status-exchange-local",
            "helpText" : "Exchange Local help text",
            "modalMessage": "UW Exchange Local message",
            "otherMessage" : "You're using Exchange Local.",
            "tabs" : [
                "account", 
                "mailbox",
                "replyAs",
                "mailPermissions"
            ]
        },
        "gal": {
            "name" : "Exchange GAL Only",
            "id" : "status-gal",
            "helpText" : "GAL help text",
            "modalMessage": "UW Exchange GAL Only message",
            "otherMessage" : "You only appear in the Exchange GAL but do not have access to email, etc.",
            "tabs" : [
                "account"
            ]
        },
        "off": {
            "name" : "Off",
            "id" : "status-off",
            "helpText" : "Off help text",
            "modalMessage": "Turning off UW Exchange. This is a destructive action and will do x and y.",
            "otherMessage" : "Your account is not configured to use Exchange.",
            "tabs" : [
                "account"
            ]
        }
    };

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
        };

    exchangeApp.modalCloseMessage = function () {
        console.log('running modalClose');
        $('#save-modal').click(function () {
            var message = '<div class="alert alert-success">' + 
              '<button type="button" class="close" data-dismiss="alert">×</button>' +
              'Account change successful.' +
            '</div>';
            $('.container').prepend(message);
        });
    };
    
    exchangeApp.addButton = function (clickedStatus, tabId, placeSuccess) {
        $('#' + tabId).append('<br/><br/><hr/>' + 
        '<button type="button" class="save-changes btn btn-primary" data-loading-text="Saving...">Save Changes</button>');
        $('.save-changes').button().click(function() {
            exchangeApp.saveModal(clickedStatus);
        });
    };

    exchangeApp.saveModal = function (statusSet) {

        $('#save-modal').attr('data-status-set', statusSet).modal();
        $('.save-changes').hide();
        statusSet = $.trim(statusSet);
        $('#save-modal div.modal-body p').text(exchangeApp.accountStatus[statusSet].modalMessage);
        
        var tab,
            placement,
            otherMessage = exchangeApp.accountStatus[statusSet].otherMessage;
        var offOrGALMessage = function (offOrGAL) {
            //$('#settings').hide();
             exchangeApp.showSettings.display(false);
            $('#exchange-address, #exchange-link').hide();
            $('#other-message').html(offOrGAL).fadeIn();
        };

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
    };
    
    exchangeApp.statusDropdown = function () {
        $('#status-dropdown li a').click(function(){
            var clicked = $(this).text();
            exchangeApp.addButton(clicked, 'account-tab', 'settings');
        });
    };

    exchangeApp.adjustSettings = {
        bind: function () {
            $('#show-settings').click(function() {
                //console.log('')
                $('#bottom-container').fadeToggle(function () { 
                    if ($(this).is(":visible") === true) {
                        $('#show-settings span').text('Close Settings');
                    } else {
                        $('#show-settings span').text('Adjust Settings');

                    }

                });

            });
        },
        display: function (status) {
            var tabsToBuild = exchangeApp.accountStatus[status].tabs,
                html = '';
            if (tabsToBuild !== undefined) {
                $.each(tabsToBuild, function (k, v) {
                    v = exchangeApp.theTabs[v];                
                    html +=  '<li><a href="#' + v.id + '-tab" data-toggle="tab">' + v.name + ' <i class="icon-' + v.icon + '"></i></a></li>';
                });
                $('ul.nav').append(html);            
            }
        }
    };

    exchangeApp.setStatus = function (yourStatus) {
        console.log('setStatus is ' + yourStatus);
        $('#' + yourStatus).parent().attr('data-selected', 'true');
        var serviceStatus = $('li[data-selected="true"] a').text();
        $('#service-status').text(serviceStatus);
    };

    exchangeApp.helpText = {
        bind : function (userStatus) {
            $('.help').click(function() {
                console.log('help for = ' + userStatus);
                var helpText = exchangeApp.accountStatus[userStatus].helpText;
                $('.help-well').toggle().append(helpText);
                var html = '';
            $.each(exchangeApp.accountStatus, function (k, v) {
                    html +=  '<h4>' + v.name +'</h4><p>' + v.helpText + '</p>';
                });
            $('.help-well').html(html);
            });
        },
        display : function () {
            // console.log('running display helptext')
            var html = '';
            $.each(exchangeApp.accountStatus, function (k, v) {
                    html +=  '<h4>' + v.name +'</h4><p>' + v.helpText + '</p>';
                });
            $('.help-well').html(html);
        }
    };

    exchangeApp.deliverySettings = function () {
        //stuff
    };


    $(function () {
        //console.log('document ready');
        // https://uwnetid.washington.edu/nws/v1/uwnetid/jtate/exchange.json
        //console.log('running adjustSettings.bind')

        var test = getURLParameter('test')
            if (test === 'true') {
                $('#test-mode').show();
            }
        

        exchangeApp.adjustSettings.bind();
        
        //window.history.pushState(data, "Title", "/new-url");

        //var netID = $.cookie('uwnetid_session');
        //console.log('netID = ' + netID.Value);

        //$.ajax({
        //    url: 'user.json',
        //    dataType: 'json',
        //    contentType: 'application/json',
        //    success: function (data, textStatus, jqXHR) {
        //        ajaxConsoleLog('dom ready call', textStatus, jqXHR);
        //        //console.log('$.ajax user status = ' + data.status)
        //        var userStatus = data.status,
        //            tabsToShow = exchangeApp.accountStatus[userStatus].tabs;
        //        exchangeApp.accountState(data.accountState);
        //        exchangeApp.adjustSettings.display(userStatus);
        //        exchangeApp.helpText.bind(userStatus);
        //        //console.log(exchangeApp.accountStatus[userStatus].otherMessage)
        //        $('#lead-account-status span, #service-status').append(exchangeApp.accountStatus[userStatus].name);
        //        $('#other-message').show().text(exchangeApp.accountStatus[userStatus].otherMessage);
        //    },
        //    error: function (jqXHR, textStatus, errorThrown) {
        //        console.log(':( Error: jqXHR.statusText = ' + jqXHR.statusText + ', textStatus = ' + textStatus);
        //    }
        //});
            

                var userStatus = getURLParameter('status'),
                    tabsToShow = exchangeApp.accountStatus[userStatus].tabs;
                //exchangeApp.accountState(data.accountState);
                exchangeApp.adjustSettings.display(userStatus);
                exchangeApp.helpText.bind(userStatus);
                exchangeApp.accountState();
                //console.log(exchangeApp.accountStatus[userStatus].otherMessage)
                $('#lead-account-status span, #service-status').append(exchangeApp.accountStatus[userStatus].name);
                $('#other-message').show().text(exchangeApp.accountStatus[userStatus].otherMessage);
        
        //unction theForm() {
        //   var userStatus = $('input:radio[name=status-radios]:checked').val(),
        //       //var userStatus = getURLParameter('status'),
        //       tabsToShow = exchangeApp.accountStatus[userStatus].tabs;
        //       //exchangeApp.accountState(data.accountState);
        //       exchangeApp.adjustSettings.display(userStatus);
        //       exchangeApp.helpText.bind(userStatus);
        //       exchangeApp.accountState();
        //       //console.log(exchangeApp.accountStatus[userStatus].otherMessage)
        //       $('#lead-account-status span, #service-status').text(exchangeApp.accountStatus[userStatus].name);
        //       $('#other-message').show().text(exchangeApp.accountStatus[userStatus].otherMessage);
        //   }

        //       $('input:radio[name=status-radios]').change(function(){
        //           theForm(); 
        //       });
        //   
        //   theForm();


    });
}());