Ext.define('SmartApp.view.app.AppGridWithButton', {
	extend: 'Ext.Panel',
	requires:[
	'SmartApp.view.app.ContentApp'],
	alias: 'widget.appGridWithButton',	
	id: 'appGridWithButton',
	autoDestroy: false,
	margin:'12 0 0 0',
	items:[
			
			/*{
			 cls:'content-apps-grid',
			 itemId:'listOfAppGrid',	
			 margin:'10 0 0 0',
			 xtype:'listOfAppGrid'
			
			}*/
			{            
			collapsible:false,
			//frame:false,
			cls : 'app-dashboard-items', 
			header: {
            title: 'CUSTOM APPS'
        	},
        	tools: [{
			xtype:'button',
			itemId:'CreateitemId',
			cls:'button-primary',
			margin:'0 10 0 2',
			text:'Create',
			listeners:{			
					click: function(btn) 
					{
						sessionStorage.setItem('activityType','create');
						sessionStorage.removeItem('_id');

						var createDashboardPage= new Ext.create('SmartApp.view.app.CreateAppPage');		
						var vport=Ext.getCmp('contentRegionPanel');
						vport.removeAll(true, true);
						vport.add(createDashboardPage);	
					
									
					}
				}
			
			} /*,
			{
			xtype:'button',
			itemId:'ModifyitemId',
			cls:'button-primary',
			margin:'0 10 0 2',
			text:'Modify',
			listeners:{			
					click: function(btn) {
								var list = Ext.getCmp('appGridWithButton'); // getting id
								var grid = list.down('#listOfAppGrid'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];
								
								if(row==null||row==undefined)
								{
									alert('Please select an App to proceed');	
								}else 
								{
									var apptype =  row.get("apptype");
									if(apptype == 'Pre-packaged'){
										alert('Prepackaged Apps cannot be modified');
									} else {
										var app_id = row.get("_id");
										sessionStorage.setItem('activityType','modify');
										sessionStorage.setItem('_id',app_id);
										
										var createDataViewwithButton= new Ext.create('SmartApp.view.app.CreateAppPage');		
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(createDataViewwithButton);	
									}
								}
							
						}
				}
			
			},
			
			{
			xtype:'button',
			itemId:'DeleteitemId',
			cls:'button-primary',
			margin:'0 10 0 2',
			text:'Delete',
			listeners:{			
					click: function(btn) {
					
					var list = Ext.getCmp('appGridWithButton'); // getting id
						var grid = list.down('#listOfAppGrid'); // using itemid of grid
						var row = grid.getSelectionModel().getSelection()[0];
						
						
					if(row==null||row==undefined)
					{
						alert('Please select an App to proceed');	
					}else 
					{
						var apptype =  row.get("apptype");
						if(apptype == 'Pre-packaged'){
							alert('Prepackaged Apps cannot be deleted');
						} else {
							var app_id = row.get("_id");
							sessionStorage.removeItem('activityType');
							sessionStorage.removeItem('_id');
						
							Ext.Ajax.request(
								{
								url : 'http://192.168.1.154:3000/users/deleteApp?app_id='+app_id, 
								method: 'POST',
								success: function ( result, request) { 
								console.log('on success:::');												
										var createDataViewwithButton= new Ext.create('SmartApp.view.app.AppGridWithButton');		
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(createDataViewwithButton);	
									
								},
								failure: function ( result, request) { 
								console.log('on failure:::');
								//Ext.MessageBox.alert('Failed', 'Request failed'); 
								} 
								});

								grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
								grid.getStore().sync(); 
							}
						
						
					}

					}
				}
			
			}*/],
					//height:800,	
		           // margin: '0 0 10 0',
					xtype:'ContentApp',
					id : 'ContentApp'
		        }
			
		]
   
});
