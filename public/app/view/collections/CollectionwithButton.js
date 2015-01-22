Ext.define('SmartApp.view.collections.CollectionwithButton', {
	extend: 'Ext.container.Container',
	requires:['SmartApp.view.collections.CollectionsGrid',
			'SmartApp.view.reader.DynamicReader',
				'SmartApp.view.collections.DynamicGridCreator',
			],
		title:'Test',
		 id: 'listSubpages',
		 autoDestroy: false,
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
                emptyText: 'Search collection',
                name : 'collection_name',
                id:'collectionnamenameId',
                 labelWidth: null,
                        listeners: {
                          // scope : this,
                     //    buffer: 200,
                      //change:'appname'
                        }
                  
              
            }, {
            xtype: 'button',
            text: 'GO',
			cls:'app-gobutton',
			handler: function() {
			var collection_name=Ext.getCmp('collectionnamenameId').getRawValue();	
		//alert(appname);
				var view=Ext.ComponentQuery.query("#gridSubpagesList")[0];

            store = view.getStore(),
            selModel = view.getSelectionModel(),
            selection = selModel.getSelection()[0];
        //alert(newValue);

        store.getFilters().replaceAll({
            property: 'collection_name',
            anyMatch: true,
            value   : collection_name
        });
        if (selection && store.indexOf(selection) === -1) {
            selModel.clearSelections();
            this.down('collectionsGrid').clear();
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
							var createDataConnectionView= new Ext.create('SmartApp.view.collections.CreateDataCollectionWindow');		
								var vport=Ext.getCmp('contentRegionPanel');
								vport.removeAll(true, true);
								vport.add(createDataConnectionView.show());	
			}
        }, {
            xtype: 'button',
            text: 'VIEW DATA',
			cls: 'button-round-corner-primary',
			handler: function() {
							
							var list = Ext.getCmp('listSubpages'); // getting id
								var grid = list.down('#gridSubpagesList'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];
								if(row==null||row==undefined)
								{

								alert('Please Select a row first!');	
								}else 
								{
								var gridIdd=row.get('_id');
								console.log('the selected record path' +gridIdd);
								
								if( sessionStorage.getItem("selectedCollId")!= null || sessionStorage.getItem("selectedCollId")!='') 
									sessionStorage.removeItem("selectedCollId");
						
								sessionStorage.setItem("selectedCollId",gridIdd);
								
								if( sessionStorage.getItem("dataviewId")!= null || sessionStorage.getItem("dataviewId")!='') 
									sessionStorage.removeItem("dataviewId");
					
								if( sessionStorage.getItem("dimensionValue")!= null || sessionStorage.getItem("dimensionValue")!='') 
									sessionStorage.removeItem("dimensionValue");
									
								if( sessionStorage.getItem("measureValue")!= null || sessionStorage.getItem("measureValue")!='') 
									sessionStorage.removeItem("measureValue");
					
								if( sessionStorage.getItem("aggregationValue")!= null || sessionStorage.getItem("aggregationValue")!='') 
									sessionStorage.removeItem("aggregationValue");
									
								if( sessionStorage.getItem("visualizationValue")!= null || sessionStorage.getItem("visualizationValue")!='') 
									sessionStorage.removeItem("visualizationValue");									
								
								if( sessionStorage.getItem("activity_type")!= null || sessionStorage.getItem("activity_type")!='') 
									sessionStorage.removeItem("activity_type");

								if( sessionStorage.getItem("dataviewName")!= null || sessionStorage.getItem("dataviewName")!='') 
									sessionStorage.removeItem("dataviewName");									
								
								if( sessionStorage.getItem("dataviewDesc")!= null || sessionStorage.getItem("dataviewDesc")!='') 
									sessionStorage.removeItem("dataviewDesc");

								if( sessionStorage.getItem("filterby")!= null || sessionStorage.getItem("filterby")!='') 
									sessionStorage.removeItem("filterby");
								
						
							sessionStorage.setItem("activity_type","create");

							var createDataConnectionView= new Ext.create('SmartApp.view.collections.DyanamicGridWithBackButton');
		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataConnectionView);


								}
			}
        }]},
	
		/*	{
					xtype:'button',
					cls:'button-primary',
					margin:'2 0 0 2',
					text:'Create',
					handler:function()
					{			
								var createDataConnectionView= new Ext.create('SmartApp.view.collections.CreateDataCollectionWindow');		
								var vport=Ext.getCmp('contentRegionPanel');
								vport.removeAll(true, true);
								vport.add(createDataConnectionView.show());	
									
					}
			},
			
			{
					xtype:'button',
					itemId:'ViewDataId',
					cls:'button-primary',
					margin:'0 10 0 10',
					text:'View Data',
					
					listeners:{			
								click: function(btn) {
								var list = Ext.getCmp('listSubpages'); // getting id
								var grid = list.down('#gridSubpagesList'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];
								if(row==null||row==undefined)
								{

								alert('Please Select a row first!');	
								}else 
								{
								var gridIdd=row.get('_id');
								console.log('the selected record path' +gridIdd);
								
								if( sessionStorage.getItem("selectedCollId")!= null || sessionStorage.getItem("selectedCollId")!='') 
									sessionStorage.removeItem("selectedCollId");
						
								sessionStorage.setItem("selectedCollId",gridIdd);
								
								if( sessionStorage.getItem("dataviewId")!= null || sessionStorage.getItem("dataviewId")!='') 
									sessionStorage.removeItem("dataviewId");
					
								if( sessionStorage.getItem("dimensionValue")!= null || sessionStorage.getItem("dimensionValue")!='') 
									sessionStorage.removeItem("dimensionValue");
									
								if( sessionStorage.getItem("measureValue")!= null || sessionStorage.getItem("measureValue")!='') 
									sessionStorage.removeItem("measureValue");
					
								if( sessionStorage.getItem("aggregationValue")!= null || sessionStorage.getItem("aggregationValue")!='') 
									sessionStorage.removeItem("aggregationValue");
									
								if( sessionStorage.getItem("visualizationValue")!= null || sessionStorage.getItem("visualizationValue")!='') 
									sessionStorage.removeItem("visualizationValue");									
								
								if( sessionStorage.getItem("activity_type")!= null || sessionStorage.getItem("activity_type")!='') 
									sessionStorage.removeItem("activity_type");

								if( sessionStorage.getItem("dataviewName")!= null || sessionStorage.getItem("dataviewName")!='') 
									sessionStorage.removeItem("dataviewName");									
								
								if( sessionStorage.getItem("dataviewDesc")!= null || sessionStorage.getItem("dataviewDesc")!='') 
									sessionStorage.removeItem("dataviewDesc");

								if( sessionStorage.getItem("filterby")!= null || sessionStorage.getItem("filterby")!='') 
									sessionStorage.removeItem("filterby");
								
						
							sessionStorage.setItem("activity_type","create");

							var createDataConnectionView= new Ext.create('SmartApp.view.collections.DyanamicGridWithBackButton');
		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataConnectionView);


								}
					
                }
			}
			
			
			},
			{
						xtype:'button',
						cls:'button-primary',
						itemId:'deleteButtonId',
						margin:'0 10 0 2',
						text:'Delete',
							
											handler: function(rowIndex, colIndex) {
											var list = Ext.getCmp('listSubpages'); // getting id
											var grid = list.down('#gridSubpagesList'); // using itemid of grid
											var row = grid.getSelectionModel().getSelection()[0];								
											if(row==null||row==undefined)
											{
												alert('Please Select a row first!');	
											}else 
											{
											grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
											grid.getStore().sync(); 								
											var gridIdd=row.get('_id');
										
											console.log('the selected record path' +gridIdd);								
											
											if( sessionStorage.getItem("deletedCollId")!= null || sessionStorage.getItem("deletedCollId")!='') 
												sessionStorage.removeItem("deletedCollId");
												sessionStorage.setItem("deletedCollId",gridIdd);
											Ext.Ajax.request(
																{
																url : 'http://localhost:3000/users/deleteCollection?coll_Id='+gridIdd, 
																method: 'POST',
																success: function ( result, request) { 
																console.log('on success:::');												

																},
																failure: function(form, action) {
				                        						Ext.Msg.alert('Failed', action.result.msg);
				                    							}
															});

									var createDataConnectionView= new Ext.create('SmartApp.view.collections.CollectionwithButton');
				
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(createDataConnectionView);	
						
								
			               
								}//else
			                }
				
			},*/
			{
			 itemId:'gridSubpagesList',
			cls:'content-apps-grid',
			 margin:'10 0 0 0',
			xtype:'collectionsGrid'
			
			}
			
		]
   
});
