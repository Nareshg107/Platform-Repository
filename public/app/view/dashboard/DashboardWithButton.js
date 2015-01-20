Ext.define('SmartApp.view.dashboard.DashboardWithButton', {
	extend: 'Ext.container.Container',
	requires:['SmartApp.view.dashboard.ListOfDashboardGrid'],			    
	xtype:'dashboardWithButton',
	autoDestroy: false,
	id:'dashboardWithButton',
	margin:'12 0 0 0',
	items:[
			{
			xtype:'button',
			itemId:'CreateitemId',
			cls:'button-primary',
			margin:'0 10 0 2',
			text:'Create',
			listeners:{			
					click: function(btn) 
					{
						sessionStorage.setItem('activityType','create');
						sessionStorage.removeItem('dashboardConfig');
						sessionStorage.removeItem('dashboard_id');

						var createDashboardPage= new Ext.create('SmartApp.view.dashboard.CreateDashboardPage');		
						var vport=Ext.getCmp('contentRegionPanel');
						vport.removeAll(true, true);
						vport.add(createDashboardPage);		
					}
				}						
			} ,	{
			xtype:'button',
			itemId:'ModifyitemId',
			cls:'button-primary',
			margin:'0 10 0 2',
			text:'Modify',
			listeners:{			
				click: function(btn) {
							var list = Ext.getCmp('dashboardWithButton'); // getting id
							var grid = list.down('#listOfDashboardGrid'); // using itemid of grid
							var row = grid.getSelectionModel().getSelection()[0];
							console.log(row.get("_id"));

							sessionStorage.setItem('activityType','modify');
							sessionStorage.setItem('dashboard_id',row.get("_id"));
							
							Ext.Ajax.request({								
								url : 'http://192.168.1.154:3000/users/getDashboardData?dashboard_id='+row.get("_id"), 
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
									Ext.MessageBox.alert('Failed', 'Request failed'); 
								} 
							});	
							
					}
				}
			}, {
			xtype:'button',
			itemId:'DeleteitemId',
			cls:'button-primary',
			margin:'0 10 0 2',
			text:'Delete',
			listeners:{			
					click: function(btn) {
					
						sessionStorage.removeItem('dashboard_id');
						sessionStorage.removeItem('activityType');					
						sessionStorage.removeItem('dashboardConfig');

						var list = Ext.getCmp('dashboardWithButton'); // getting id
						var grid = list.down('#listOfDashboardGrid'); // using itemid of grid
						var row = grid.getSelectionModel().getSelection()[0];
						var dashboard_id=row.get("_id");
					
						Ext.Ajax.request(
							{
							url : 'http://192.168.1.154:3000/users/deleteDashboard?dashboard_id='+dashboard_id, 
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
								Ext.MessageBox.alert('Failed', 'Request failed'); 
							} 
						});

						grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
						grid.getStore().sync();			
					}
				}
			
			},
			{
				itemId:'listOfDashboardGrid',
				cls:'content-apps-grid',	
				margin:'10 0 0 0',
				xtype:'listOfDashboardGrid'						
			}]
   
});
