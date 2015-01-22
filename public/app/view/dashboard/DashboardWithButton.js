Ext.define('SmartApp.view.dashboard.DashboardWithButton', {
	extend: 'Ext.container.Container',
	requires:['SmartApp.view.dashboard.ListOfDashboardGrid'],			    
	xtype:'dashboardWithButton',
	autoDestroy: false,
	id:'dashboardWithButton',
	margin:'12 0 0 0',
	items:[
			{

tools: [{

                xtype: 'combobox',
               cls: 'ddl-rounded',
                width: 150,
                emptyText: 'Sort by',
               
                store: {
                    fields: ['SearchApp', 'SearchAppVal'],
                    data: [
						['Name', 'Name'],
						['Date', 'Date']
                    ]
                },
                displayField: 'SearchApp',
                valueField: 'SearchAppVal',
                filterPickList: true,
                queryMode: 'local',
                publishes: 'value'

            },{
            xtype: 'button',
            text: '',
			style: 'margin-right:20px',
			cls:'ddl-rounded-right-border'
        },{

                xtype: 'textfield',
                cls: 'ddl-search-app',
                width: 280,
                emptyText: 'Search Insight',
                name : 'appname',
                id:'appnameId',
                 labelWidth: null,
                        listeners: {
                          // scope : this,
                         buffer: 200,
                      change:'appname'
                        }
                  
              
            }, {
            xtype: 'button',
            text: 'GO',
			cls:'app-gobutton',
			handler: function() {
			var appname=Ext.getCmp('appnameId').getRawValue();	
		//alert(appname);
				var view=Ext.ComponentQuery.query("#listOfDashboardGrid")[0];

            store = view.getStore(),
            selModel = view.getSelectionModel(),
            selection = selModel.getSelection()[0];
        //alert(newValue);

        store.getFilters().replaceAll({
            property: 'name',
            anyMatch: true,
            value   : appname
        });
        if (selection && store.indexOf(selection) === -1) {
            selModel.clearSelections();
            this.down('listOfDashboardGrid').clear();
        }

						
			}
        },  {
            xtype: 'button',
			cls:'button-label-or',
            text: 'OR',
        }, {
            xtype: 'button',
            text: 'CREATE',
			cls: 'button-round-corner-primary',
			handler: function() {
						sessionStorage.setItem('activityType','create');
						sessionStorage.removeItem('dashboardConfig');
						sessionStorage.removeItem('dashboard_id');

						var createDashboardPage= new Ext.create('SmartApp.view.dashboard.CreateDashboardPage');		
						var vport=Ext.getCmp('contentRegionPanel');
						vport.removeAll(true, true);
						vport.add(createDashboardPage);	
			}
        }]},



			/*{
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
					}
				}
			
			},*/
			{
				itemId:'listOfDashboardGrid',
				cls:'content-apps-grid',	
				margin:'10 0 0 0',
				xtype:'listOfDashboardGrid'						
			}]
   
});
