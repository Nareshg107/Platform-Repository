Ext.define('ClientApp.view.setup.ClientGridWithButton', {
	extend: 'Ext.container.Container',
	requires:['ClientApp.view.setup.ClientGridView'],
			    
			    xtype:'clientGridWithButton',
			    autoDestroy: false,
			    id:'clientGridWithButton',
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
							sessionStorage.removeItem('_cid');
							var createDataViewwithButton= new Ext.create('ClientApp.view.setup.CreateClientWindow');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton.show());	
												
									}
							}
						
						} ,
						/*{
						xtype:'button',
						itemId:'ViewitemId',
						cls:'button-primary',
						margin:'0 10 0 2',
						text:'View',
						listeners:{			
								click: function(btn) 
								{
									//sessionStorage.setItem('activityType','create');
							sessionStorage.removeItem('_uid');
							var createDataViewwithButton= new Ext.create('SmartApp.view.setup.CreateClientWindow');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton.show());	

												
									}
							}
						
						},*/
						{
						xtype:'button',
						itemId:'ModifyitemId',
						cls:'button-primary',
						margin:'0 10 0 2',
						text:'Modify',
						listeners:{			
								click: function(btn) {
											var list = Ext.getCmp('clientGridWithButton'); // getting id
											var grid = list.down('#clientGridView'); // using itemid of grid
											var row = grid.getSelectionModel().getSelection()[0];
											//console.log(row.get("_id"));
											//alert(row.get("_id"));

											sessionStorage.setItem('activityType','modify');
											sessionStorage.setItem('_cid',row.get("_id"));
											var createDataViewwithButton= new Ext.create('ClientApp.view.setup.CreateClientWindow');		
											var vport=Ext.getCmp('contentRegionPanel');
											vport.removeAll(true, true);
											vport.add(createDataViewwithButton.show());	

												
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
									var list = Ext.getCmp('clientGridWithButton'); // getting id
											var grid = list.down('#clientGridView'); // using itemid of grid
											var row = grid.getSelectionModel().getSelection()[0];
											var client_id=row.get("_id");
								
								Ext.Ajax.request(
									{
									url : 'http://192.168.1.154:3000/users/deleteClient?client_id='+client_id, 
									method: 'POST',
									success: function ( result, request) { 
									console.log('on success:::');												

									},
									failure: function ( result, request) { 
									console.log('on failure:::');
									Ext.MessageBox.alert('Failed', 'Request failed'); 
									} 
								});
									grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
									grid.getStore().sync(); 
									/*var createDataViewwithButton= new Ext.create('SmartApp.view.setup.UserSetupGridWithButton');
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(createDataViewwithButton.show());	*/

									
												
									}
							}
						
						},
						{
						 itemId:'clientGridView',	
						 cls:'content-apps-grid',
						 margin:'10 0 0 0',
						xtype:'clientGridView'
						
						}
						
					]
   
});
