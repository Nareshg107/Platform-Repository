Ext.define('SmartApp.view.home.KeyMetricsRegionModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.keyMetricsModel',
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
