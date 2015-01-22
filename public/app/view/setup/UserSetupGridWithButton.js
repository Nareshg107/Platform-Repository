Ext.define('SmartApp.view.setup.UserSetupGridWithButton', {
	extend: 'Ext.container.Container',
	requires:['SmartApp.view.setup.UserSetupGridView'],
			    
			    xtype:'userSetupGridWithButton',
			    autoDestroy: false,
			    id:'userSetupGridWithButton',
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
                emptyText: 'Search user',
                name : 'name',
                id:'usernameId',
                 labelWidth: null,
                        listeners: {
                          // scope : this,
                         //buffer: 200,
                     // change:'appname'
                        }
                  
              
            }, {
            xtype: 'button',
            text: 'GO',
			cls:'app-gobutton',
			handler: function() {
			var appname=Ext.getCmp('usernameId').getRawValue();	
		//alert(appname);
				//var view=Ext.getCmp("InsightsCarouselContent");
//userSetupGridView
var view=Ext.ComponentQuery.query("#userSetupGridView")[0];
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
            this.down('userSetupGridView').clear();
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
						//sessionStorage.setItem('activityType','create');
										sessionStorage.removeItem('_uid');
							var createDataViewwithButton= new Ext.create('SmartApp.view.setup.CreateUserWindow');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton.show());	
			}
        }]},

					/*	{
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
									url : 'http://localhost:3000/users/deleteUser?user_id='+user_id, 
									method: 'POST',
									success: function ( result, request) { 
									console.log('on success:::');												
									var createDataViewwithButton= new Ext.create('SmartApp.view.setup.UserSetupGridWithButton');
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(createDataViewwithButton);
									},
									failure: function(form, action) {
				                        Ext.Msg.alert('Failed', action.result.msg);
				                    } 
								});
									

									
									

									
												
									}
							}
						
						},*/
						{
						 itemId:'userSetupGridView',
						 cls:'content-apps-grid',	
						 margin:'10 0 0 0',
						xtype:'userSetupGridView'
						
						}
						
					]
   
});
