Ext.define('SmartApp.view.dashboard.ListOfDashboardGrid', {
					extend: 'Ext.grid.Panel',
				    requires: [
				        'Ext.data.*',
				        'Ext.grid.*',
				        'Ext.util.*',
				        'Ext.toolbar.Paging',
				        'Ext.ux.ProgressBarPager',
						'Ext.grid.filters.Filters',
				       	'SmartApp.model.DashboardModel'],	
				   // xtype: 'listOfDashboardGrid',	
				    height:  window.innerHeight-200,
					forceFit: true,
					width:'100%',
					itemId:'listOfDashboardGrid',
					emptyText: 'No Matching Records',
				    loadMask: true,
				    alias: 'widget.listOfDashboardGrid',
					
				    initComponent: function() {
				       
				        this.width='99.4%';	
				        var dashboardModel = new Ext.data.Store({	
				            model:'SmartApp.model.DashboardModel',
							autoLoad: true,	
							proxy: {
									type: 'ajax',
									//url:'resources/data/grid/CollectionData.json',				
									url: 'http://192.168.1.154:3000/users/dashboardList',
									reader: {
										type: 'json'
										//rootProperty:'data'						
										}
									}					
				             });	
				       
				        Ext.apply(this, {
						       	store: dashboardModel,	
								defaultListenerScope: true,
								plugins: 'gridfilters',	
								columns: [
									{
										dataIndex:'_id',width:150,
									//	text: 'Id',
										hidden: true,
										hideable: false
									},{
										dataIndex:'name',width:150,
										text: 'InSight Name',		
									 filter: {
										 type: 'string'
											}
									},{
										dataIndex:'description',width:150,
										text: 'InSight Description'
												
									}
									/*,{
										dataIndex:'layout_type',width:150,
										text: 'Layout Type',		
									 filter: {
										 type: 'string'
											}
									}*/
									],
										bbar: {
											xtype: 'pagingtoolbar',
											style:'background-color:#F7F9F8;',
											pageSize: 1,
											store: dashboardModel,
											displayInfo: true
											//plugins: new Ext.ux.ProgressBarPager()
										}
									});
							this.callParent();
						}
});
