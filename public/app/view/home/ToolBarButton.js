Ext.define('SmartApp.view.home.ToolBarButton', {
	extend : 'Ext.toolbar.Toolbar',
	renderTo: document.body,
	xtype:'toolBarButton',
	id:'toolBarButton',
    width   : 500,
	items:[],	
	
	listeners : {
		beforerender : function() {
			var navStore = Ext.create('Ext.data.Store', {
				fields : [ 'name', 'handler', 'displaySequence' ],
				proxy : {
					type : 'ajax',
					url : 'resources/data/ToolbarButton.json',
					reader : {
						type : 'json',
						rootProperty : 'menuData'
					}
				},
				autoLoad : true,
				listeners : {
					load : function(store, records, success, operation, opts) {

						var toolbar = Ext.getCmp('toolBarButton');

						// First the top level items
						store.each(function(record) {
							toolbar.add({
								xtype : 'button',
								text : record.data.name,
								handler : record.data.handler,
								displaySequence : record.data.displaySequence,
								
							});
						});
					}
				}
			});
		}
	
	}
	
	
	

});