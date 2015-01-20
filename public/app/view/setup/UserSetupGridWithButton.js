Ext.define('SmartApp.view.setup.UserSetupGridWithButton', {
	extend: 'Ext.container.Container',
	requires:['SmartApp.view.setup.UserSetupGridView'],
			    
			    xtype:'userSetupGridWithButton',
			    autoDestroy: false,
			    id:'userSetupGridWithButton',
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
									//sessionStorage.setItem('activityType','create');
										sessionStorage.removeItem('_uid');
							var createDataViewwithButton= new Ext.create('SmartApp.view.setup.CreateUserWindow');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton.show());	

												
									}
							}
						
						},
						{
						xtype:'button',
						itemId:'ModifyitemId',
						cls:'button-primary',
						margin:'0 10 0 2',
						text:'Modify',
						listeners:{			
								click: function(btn) {
											var list = Ext.getCmp('userSetupGridWithButton'); // getting id
											var grid = list.down('#userSetupGridView'); // using itemid of grid
											var row = grid.getSelectionModel().getSelection()[0];
											//console.log(row.get("_id"));
											//alert(row.get("_id"));

											sessionStorage.setItem('activityType','modify');
											sessionStorage.setItem('_uid',row.get("_id"));
											var createDataViewwithButton= new Ext.create('SmartApp.view.setup.CreateUserWindow');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton.show());	

												
									}
							}
						
						},
						/*{
						xtype:'button',
						itemId:'ViewitemId',
						cls:'button-primary',
						margin:'0 10 0 2',
						text:'View',
						listeners:{			
								click: function(btn) {
											var list = Ext.getCmp('userSetupGridWithButton'); // getting id
											var grid = list.down('#userSetupGridView'); // using itemid of grid
											var row = grid.getSelectionModel().getSelection()[0];
												
									}
							}
						
						},*/
						{
						xtype:'button',
						itemId:'DeleteitemId',
						cls:'button-primary',
						margin:'0 10 0 2',
						text:'Delete',
						listeners:{			
								click: function(btn) {
									var list = Ext.getCmp('userSetupGridWithButton'); // getting id
									var grid = list.down('#userSetupGridView'); // using itemid of grid
									var row = grid.getSelectionModel().getSelection()[0];
									var user_id=row.get('_id');
									grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
								grid.getStore().sync(); 
									Ext.Ajax.request(
									{
									url : 'http://192.168.1.154:3000/users/deleteUser?user_id='+user_id, 
									method: 'POST',
									success: function ( result, request) { 
									console.log('on success:::');												
var createDataViewwithButton= new Ext.create('SmartApp.view.setup.UserSetupGridWithButton');
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(createDataViewwithButton);
									},
									failure: function ( result, request) { 
									console.log('on failure:::');
									Ext.MessageBox.alert('Failed', 'Request failed'); 
									} 
								});
									

									
									/*var createDataViewwithButton= new Ext.create('SmartApp.view.setup.UserSetupGridWithButton');
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(createDataViewwithButton.show());	*/

									
												
									}
							}
						
						},
						{
						 itemId:'userSetupGridView',
						 cls:'content-apps-grid',	
						 margin:'10 0 0 0',
						xtype:'userSetupGridView'
						
						}
						
					]
   
});
