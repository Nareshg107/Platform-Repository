Ext.define('SmartApp.view.setup.UserSetupGridView', {
					extend: 'Ext.grid.Panel',
				    requires: [
				        'Ext.data.*',
				        'Ext.grid.*',
				        'Ext.util.*',
				        'Ext.toolbar.Paging',
				        'Ext.ux.ProgressBarPager',
						'Ext.grid.filters.Filters',
				       	'SmartApp.model.UserModel'],	
				    xtype: 'userSetupGridView',	
				    height:  window.innerHeight-200,
					forceFit: true,
					width:'100%',
					itemId:'userSetupGridView',
					emptyText: 'No Matching Records',
				    loadMask: true,
					
				    initComponent: function() {
				       
				        this.width='99.4%';	
				        var userSetUpModel = new Ext.data.Store({	
				            model:'SmartApp.model.UserModel',
							autoLoad: true,	
							proxy: {
									type: 'ajax',
									//url:'resources/data/grid/CollectionData.json',				
									url: 'http://192.168.1.154:3000/users/getUserList',
									reader: {
										type: 'json',
										rootProperty:'data'						
										}
									}					
				             });	
				       
				        Ext.apply(this, {
						       	store: userSetUpModel,	
								defaultListenerScope: true,
								plugins: 'gridfilters',	
								columns: [
									{
										dataIndex:'_id',minWidth:200,
										text: 'Id',
										hidden: true,
										hideable: false
									},{
										dataIndex:'userId',minWidth:200,
										text: 'User Id'
									
									},{
										dataIndex:'name',width:150,
										text: 'User Name',		
									 filter: {
										 type: 'string'
											}
									}
									,{
										dataIndex:'email',width:200,
										text: 'Email',		
									 filter: {
										 type: 'string'
											}
										
									},{
										dataIndex:'address',width:150,
										text: 'Address',		
									 filter: {
										 type: 'string'
											}
									}
									],
										bbar: {
											xtype: 'pagingtoolbar',
											style:'background-color:#F7F9F8;',
											pageSize: 1,
											store: userSetUpModel,
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
