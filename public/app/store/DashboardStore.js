Ext.define('SmartApp.store.DashboardStore', {
    extend: 'Ext.data.Store',
    alias: 'store.dashboardStore',
    requires: ["SmartApp.model.DashboardModel"],
    model: "SmartApp.model.DashboardModel",
    autoLoad: true,
    proxy: {
	type: 'ajax',
	method:'GET',			
	url: 'http://192.168.1.154:3000/users/dashboardList',
	reader: {
		type: 'json'					
		}
	}
});

