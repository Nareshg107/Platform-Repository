Ext.define('ClientApp.view.setup.ClientGridView', {
					extend: 'Ext.grid.Panel',
				    requires: [
				        'Ext.data.*',
				        'Ext.grid.*',
				        'Ext.util.*',
				        'Ext.toolbar.Paging',
				        'Ext.ux.ProgressBarPager',
						'Ext.grid.filters.Filters',
				       	'ClientApp.model.ClientModel'],	
				    xtype: 'clientGridView',	
				    height:  window.innerHeight-200,
					forceFit: true,
					width:'100%',
					itemId:'clientGridView',
					emptyText: 'No Matching Records',
				    loadMask: true,
					
				    initComponent: function() {
				       
				        this.width='99.4%';	
				        var clientModel = new Ext.data.Store({	
				            model:'ClientApp.model.ClientModel',
							autoLoad: true,	
							proxy: {
									type: 'ajax',
									//url:'resources/data/grid/CollectionData.json',				
									url: 'http://192.168.1.154:3000/users/getClientList',
									reader: {
										type: 'json',
										rootProperty:'data'						
										}
									}					
				             });	
				       
				        Ext.apply(this, {
						       	store: clientModel,	
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
										text: 'Client Name',		
									 filter: {
										 type: 'string'
											}
									},{
										dataIndex:'description',width:150,
										text: 'Description'
												
									}
									,{
										dataIndex:'address',width:150,
										text: 'Address',		
									 filter: {
										 type: 'string'
											}
									},{
										dataIndex:'super_id',width:150,
										text: 'Super UserId',		
									 filter: {
										 type: 'string'
											}
									}
									],
										bbar: {
											xtype: 'pagingtoolbar',
											style:'background-color:#F7F9F8;',
											pageSize: 1,
											store: clientModel,
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
