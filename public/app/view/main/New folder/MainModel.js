Ext.define('SmartApp.view.main.MainModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.main',
	requires : [ 'SmartApp.model.Kpi', 'SmartApp.store.Kpi' ],
	data : {
	},
	stores : {
		statements : {
			fields : [ 'name', 'thumb', 'url', 'type' ],
			proxy : {
				type : 'ajax',
				url : 'resources/data/dv_data.json',
				reader : {
					type : 'json'
				}
			},

			autoLoad : true
		}
	}
});
