Ext.define('SmartApp.view.home.PageToolBarMenu', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'toolBarMenuXtype',
	floating : false,
	id : 'menuToolbarForPage',
	cls:'tbar-menu',
	height : 40,
	items : [],
	listeners : {
		beforerender : function() {
			var navStore = Ext.create('Ext.data.Store', {
				fields : [ 'name', 'handler', 'displaySequence' ],
				proxy : {
					type : 'ajax',
					url : 'resources/data/SampleData.json',
					reader : {
						type : 'json',
						rootProperty : 'menuData'
					}
				},
				autoLoad : true,
				listeners : {
					load : function(store, records, success, operation, opts) {

						var toolbar = Ext.getCmp('menuToolbarForPage');
							
						// First the top level items
						store.each(function(record) {							
							toolbar.add({
								xtype : 'button',
								text : record.data.name,
								handler : record.data.handler,
								displaySequence : record.data.displaySequence,
								
																			
								textAlign: 'left',
								width:'10%'								
							
								
							});
						});
					}
				}
			});
		}
	}

});