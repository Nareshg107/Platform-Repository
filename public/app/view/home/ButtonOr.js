/**
 * This view is the filterFileupload.
 */
Ext.define('SmartApp.view.home.ButtonOr', {
    extend: 'Ext.form.Panel',
    xtype: 'ButtonOr',
    fieldDefaults: {
      //  labelAlign: 'top',
       // msgTarget: 'side'
    },
    defaults: {
        border: false,
        xtype: 'form',         
        layout: 'anchor'
    },

    //layout: 'hbox',
    
    items: [ {
                   xtype: 'button',
				margin: '13px 0px 0 10px',
				cls: 'button-or',
                text: 'OR'}]
});