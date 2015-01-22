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
				       	cls: 'content-apps-grid',   	
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
									url: 'http://localhost:3000/users/dashboardList',
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
												
									},{
        xtype:'actioncolumn',		
        width:50,
		align:'right',
        items: [{
			icon: 'resources/images/icon-grid-edit.png',  
            tooltip: 'Edit',
    		getClass: function() {
     //   return 'x-hide-display';  //Hide the action icon
    		},
			padding:'10px 0',  //8
            handler: function(grid, rowIndex, colIndex) {
              
							var list = Ext.getCmp('dashboardWithButton'); // getting id
							var grid = list.down('#listOfDashboardGrid'); // using itemid of grid
							var row = grid.getSelectionModel().getSelection()[0];
							console.log(row.get("_id"));

							sessionStorage.setItem('activityType','modify');
							sessionStorage.setItem('dashboard_id',row.get("_id"));
							
							Ext.Ajax.request({								
								url : 'http://localhost:3000/users/getDashboardData?dashboard_id='+row.get("_id"), 
								method: 'GET',
								success: function ( result, request) { 									
									console.log(result);												
									response = result.responseText;
									res = eval('(' + response + ')');

									var dashboardconfig = Ext.decode(res.dashboardconfig);

									var createDashboardWindow= new Ext.create('SmartApp.view.dashboard.CreateDashboardPage',{
										dashboardconfig : dashboardconfig
									});		
									

									
									var dashboard = createDashboardWindow.getComponent("insightdashboardview");
									dashboard.setParts(dashboardconfig.partsObj);

									var dashboardItems = dashboardconfig.dashboardItems;
									for(var i=0;i<dashboardItems.length;i++){
										var panelConfig = dashboardItems[i];
										dashboard.addView(panelConfig,panelConfig.columnIndex);
									}

									var vport=Ext.getCmp('contentRegionPanel');

									vport.removeAll(true, true);
									vport.add(createDashboardWindow);

								},
								failure: function ( result, request) { 
								console.log('on failure:::');
									Ext.Msg.alert('Failed', 'Request failed'); 
								} 
							});	
            }
        },'-',{
			icon: 'resources/images/icon-grid-delete.png',  
            tooltip: 'Delete',
    		getClass: function() {
       // return 'x-hide-display';  //Hide the action icon
    		},
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);


					
						sessionStorage.removeItem('dashboard_id');
						sessionStorage.removeItem('activityType');					
						sessionStorage.removeItem('dashboardConfig');

						var list = Ext.getCmp('dashboardWithButton'); // getting id
						var grid = list.down('#listOfDashboardGrid'); // using itemid of grid
						var row = grid.getSelectionModel().getSelection()[0];
						var dashboard_id=row.get("_id");
					
						Ext.Ajax.request(
							{
							url : 'http://localhost:3000/users/deleteDashboard?dashboard_id='+dashboard_id, 
							method: 'POST',
							success: function ( result, request) { 
								console.log('on success:::');												
								var createDataViewwithButton= new Ext.create('SmartApp.view.dashboard.DashboardWithButton');
								var vport=Ext.getCmp('contentRegionPanel');
								vport.removeAll(true, true);
								vport.add(createDataViewwithButton);	
							},
							failure: function ( result, request) { 
								console.log('on failure:::');
								Ext.Msg.alert('Failed', 'Request failed'); 
							} 
						});

						grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
						grid.getStore().sync();
                //Ext.MessageBox.alert('Delete',rec.get('portfolio'));
               // Ext.MessageBox.alert('Delete','Are you sure you want to delete the selected Record?');
            }                
        }]
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
