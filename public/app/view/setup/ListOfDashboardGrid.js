Ext.define('SmartApp.view.setup.ListOfDashboardGrid', {
					extend: 'Ext.grid.Panel',
				    requires: [
				        'Ext.data.*',
				        'Ext.grid.*',
				        'Ext.util.*',
				        'Ext.toolbar.Paging',
				        'Ext.ux.ProgressBarPager',
						'Ext.grid.filters.Filters',
				       	'SmartApp.model.DashboardModel'],	
				    xtype: 'listOfDashboardGrid',	
				    height:  window.innerHeight-200,
					forceFit: true,
					width:'100%',
					itemId:'listOfDashboardGrid',
					emptyText: 'No Matching Records',
				    loadMask: true,
					
				    initComponent: function() {
				       
				        this.width='99.4%';	
				        var dashboardModel = new Ext.data.Store({	
				            model:'SmartApp.model.DashboardModel',
							autoLoad: true,	
							proxy: {
									type: 'ajax',
									//url:'resources/data/grid/CollectionData.json',				
									url: 'http://localhost:3000/users/getClientList',
									reader: {
										type: 'json',
										rootProperty:'data'						
										}
									}					
				             });	
				       
				        Ext.apply(this, {
						       	store: dashboardModel,	
								defaultListenerScope: true,
								plugins: 'gridfilters',	
								columns: [
									{
										dataIndex:'_id',minWidth:200,
										text: 'Id',
										hidden: true,
										hideable: false
									},{
										dataIndex:'name',width:150,
										text: 'Dashboard Name',		
									 filter: {
										 type: 'string'
											}
									},{
										dataIndex:'description',width:150,
										text: 'Description'
												
									}
									,{
										dataIndex:'layout_type',width:150,
										text: 'Layout Type',		
									 filter: {
										 type: 'string'
											}
									}
									],
										bbar: {
											xtype: 'pagingtoolbar',
											pageSize: 1,
											store: dashboardModel,
											displayInfo: true
											//plugins: new Ext.ux.ProgressBarPager()
										}
									});
							this.callParent();
						},
						
						onClearFilters: function () {
							// The "filters" property is added to the grid (this) by gridfilters
							this.filters.clearFilters();
						},

						onShowFilters: function () {
							var data = [];

							// The actual record filters are placed on the Store.
							this.store.getFilters().each(function (filter) {
								data.push(filter.serialize());
							});

							// Pretty it up for presentation
							data = Ext.JSON.encodeValue(data, '\n').replace(/^[ ]+/gm, function (s) {
								for (var r = '', i = s.length; i--; ) {
									r += '&#160;';
								}
								return r;
							});
							data = data.replace(/\n/g, '<br>');

							Ext.Msg.alert('Filter Data', data);
						}
});
