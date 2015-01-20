/**
 * This view is the filterFileupload.
 */
Ext.define('SmartApp.view.home.ButtonCreateApp', {
    extend: 'Ext.form.Panel',
    xtype: 'ButtonCreateApp',
    fieldDefaults: {
      //  labelAlign: 'top',
      //  msgTarget: 'side'
    },
    defaults: {
        border: false,
        xtype: 'form',         
        layout: 'anchor'
    },

    //layout: 'hbox',
    
    items: [ {
                   xtype: 'button',
				margin: '16px 0px 0 10px',
				cls: 'button-create',
                text: 'CREATE'}]
});