Ext.define('SmartApp.view.main.PageToolBarMenu', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'toolBarMenuXtype',
	floating : false,
	id : 'menuToolbarForPage',
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
							var menu = Ext.create('Ext.menu.Menu');
							Ext.each(record.raw.menu, function(item) {
								menu.add({
									text : item.name
								})
							})

							toolbar.add({
								xtype : 'button',
								text : record.data.name,
								handler : record.data.handler,
								displaySequence : record.data.displaySequence,
								menu : menu
							});
						});
					}
				}
			});
		}
	}

});