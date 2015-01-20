Ext.define('SmartApp.view.home.ContentRegion', {
	extend : 'Ext.panel.Panel',
	requires:['SmartApp.view.app.AppGridWithButton'],
	region : 'center',
	xtype : 'contentRegionPanel',	  
    bodyBorder: false,
    initComponent: function() {
        this.items = [{
			itemId:'appGridWithButton',
			xtype:'appGridWithButton'
						
		}];        
        this.callParent(arguments);
    }
});