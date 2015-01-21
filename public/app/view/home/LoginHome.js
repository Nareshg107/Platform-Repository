Ext.define('SmartApp.view.home.LoginHome',{
extend : 'Ext.container.Viewport',
requires : [ 'SmartApp.view.home.LoginHeader'],
xtype : 'appLayout1',
 id: 'appLayoutId1',
    cls: 'login-bg',
    height: '100%',
    defaults: {
                frame: false,
                border: 0
    },
    refs: {
        HomeView: {
            autoCreate: true,
            selector: 'HomeView',
            xtype: 'HomeView'
        }
    },
    layout: {
                    type: 'border',
                    align: 'stretch'
              },
    items: [
        /*{
                frame: false,
                collapsible: false,
                region: 'north',
                cls: 'eka-header',
            },*/
        {
            region: 'center',
            id: 'contentSection1',
            layout:'ux.center',
            width: '100%',
            defaults: {
                    frame: false,
                    border: 0
                },
            /*items: [Ext.create('Ext.window.Window', {
                //  title: 'Signin',

                height: 340,
                closable: false,
                draggable: false,
                resizable:false,
                floating: {shadow: false},
                width: 700,
                cls: 'eka-login-window',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    frame: false,
                    border: 0
                },
                items: [{
                    layout: {
                        type: 'column',
                        align: 'stretch'
                    },
                    defaults: {
                        frame: false,
                        border: 0
                    },
                    items: [

                        {
                            cls: 'eka-login-logo',
                            height: 265,
                            width: 340
                        }, {
                            height: 265,
                            width: 345,
                            title: 'Signin',
                            cls:'eka-login-form',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                margin: '5px 10px',
                                frame: false,
                                border: 0
                            },
                            items: [{


                                xtype: 'form',
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                itemId: 'clientRegistrationForm',
                                items: [{
                                   
                                    //  fieldLabel: 'UserId',
                                    width: 200,
                                    emptyText: 'Username',
                                    allowBlank: false,
                                    name: 'userName'
                                }, {
                                    
                                    width: 200,
                                    // fieldLabel: 'Password',
                                    inputType: 'password',
                                    name: 'pwd',
                                    emptyText: 'Password',
                                    allowBlank: false

                                }, {
                                    xtype: 'hiddenfield',
                                    name: 'activityType',
                                    value: 'create'
                                }, {
                                    xtype: 'hiddenfield',
                                    name: '_id'
                                }]
                            }, {
                                xtype: 'button',
                                text: 'Continue',

                                cls: 'button-primary',
                                //formBind: true, //only enabled once the form is valid
                                disabled: false,
                                handler: function() {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        console.log(form);
                                        if (form.isValid()) {
                                            var userJson = JSON.stringify(form.getFieldValues());
                                            var sessionID = form.findField('userName').getSubmitValue();
                                            sessionStorage.setItem('sessionID', sessionID);
                                            window.location = "/smartapp-web/smartapp/index.html";
                                        }
                                    }
                                }
                            }, {
                                xtype: 'form',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [{
                                    xtype: 'checkbox',
                                    width: 200,
                                    name: 'billingSameAsMailing',
                                    boxLabel: 'Remember Password',
                                    hideLabel: true,
                                    checked: true,
                                    margin: '0 0 10 0'
                                }, {
                                    width: 120,
                                    labelAlign: 'right',
                                    fieldLabel: 'Forgot Password',
                                    id: 'kanri-user',
                                    xtype: 'box',
                                    autoEl: {
                                        tag: 'a',
                                        href: '#',
                                        html: 'Forgot Password?',
                                    },
                                    listeners: {
                                        render: function(c) {
                                            c.getEl().on('click', function() {
                                                Ext.getCmp('kanri-content-panel').layout.setActiveItem('kanri-user-panel');
                                            }, c, {
                                                stopEvent: true
                                            });
                                        }
                                    }
                                }]
                            }] }
                    ]
                }, {
                    //xtype: 'container',
                    height:80,
                    cls:'eka-login-window-copyright',
                    html: 'Eka software Solutions Private Limited. All rights reserved.'
                }]
            }).show()]*/
            items: [{
                //  title: 'Signin',

                height: 340,
               // closable: false,
               // draggable: false,
                //resizable:false,
                //floating: {shadow: false},
                width: 700,
                //cls: 'eka-login-window',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    frame: false,
                    border: 0
                },
                items: [{
                    layout: {
                        type: 'column',
                        align: 'stretch'
                    },
                    defaults: {
                        frame: false,
                        border: 0
                    },
                    items: [

                        {
                            cls: 'eka-login-logo',
                            height: 265,
                            width: 340
                        }, {
                            height: 265,
                            width: 345,
                            title: 'Signin',
                            cls:'eka-login-form',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            defaults: {
                                margin: '5px 10px',
                                frame: false,
                                border: 0
                            },
                            items: [{


                                xtype: 'form',
                                id:'LoginformId',
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%'
                                },
                                itemId: 'clientRegistrationForm',
                                items: [{
                                   
                                    //  fieldLabel: 'UserId',
                                    width: 200,
                                    emptyText: 'Username',
                                    allowBlank: false,
                                    name: 'userName'
                                }, {
                                    
                                    width: 200,
                                    // fieldLabel: 'Password',
                                    inputType: 'password',
                                    name: 'pwd',
                                    emptyText: 'Password',
                                    allowBlank: false

                                }, {
                                    xtype: 'hiddenfield',
                                    name: 'activityType',
                                    value: 'create'
                                }, {
                                    xtype: 'hiddenfield',
                                    name: '_id'
                                }]
                            }, {
                                xtype: 'button',
                                text: 'Continue',
                                
                                cls: 'button-primary',
                                //formBind: true, //only enabled once the form is valid
                                disabled: false,
                                handler: function() {   
                                    var form = Ext.getCmp("LoginformId").getForm();
                            //  alert(userJson);
                                form.submit({
                                    url: 'http://192.168.1.154:3000/users/login',
                                    //jsonSubmit : true,
                                    success: function(form, action) {
                                  // Ext.Msg.alert('Success', action.result.msg);
                                  var sessionID=action.result.sessionID;
                                  var clientName=action.result.clientName;
                                
                                   sessionStorage.setItem('sessionID',sessionID);
                                   sessionStorage.setItem('clientName',clientName);                                             
                                            window.location="/index.html";
                                            

                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result.msg);
                                    }
                                });
                                }
                            }, {
                                xtype: 'form',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [{
                                    xtype: 'checkbox',
                                    width: 200,
                                    name: 'billingSameAsMailing',
                                    boxLabel: 'Remember Password',
                                    hideLabel: true,
                                    checked: true,
                                    margin: '0 0 10 0'
                                }, {
                                    width: 120,
                                    labelAlign: 'right',
                                    fieldLabel: 'Forgot Password',
                                    id: 'kanri-user',
                                    xtype: 'box',
                                    autoEl: {
                                        tag: 'a',
                                        href: '#',
                                        html: 'Forgot Password?',
                                    },
                                    listeners: {
                                        render: function(c) {
                                            c.getEl().on('click', function() {
                                                Ext.getCmp('kanri-content-panel').layout.setActiveItem('kanri-user-panel');
                                            }, c, {
                                                stopEvent: true
                                            });
                                        }
                                    }
                                }]
                            }] }
                    ]
                }, {
                    //xtype: 'container',
                    height:80,
                    cls:'eka-login-window-copyright',
                    html: 'Eka software Solutions Private Limited. All rights reserved.'
                }]
            }]

        }
    ]
});
