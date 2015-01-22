/**
 * Created by shiva.kumar on 15-12-2014.
 */
Ext.define('SmartApp.store.InsightGridStore', {
    extend: 'Ext.data.Store',
    alias: 'store.insightgridstore',
    requires: ["SmartApp.model.InsightGridModel"],
    model: "SmartApp.model.InsightGridModel",
    autoLoad: true,
    proxy: {
	type: 'ajax',
	method:'GET',
	//url:'data/insightGrid.json',				
	url: 'http://localhost:3000/users/getDataViewList',
	reader: {
		type: 'json'					
		}
	}
});

