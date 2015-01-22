Ext.define('SmartApp.view.dataviews.DataViewwithButton', {
	extend: 'Ext.container.Container',
	requires:['SmartApp.view.dataviews.DataViewGrid'
	],			
			xtype:'dataViewwithButton',
			id: 'dataViewwithButton',
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
                emptyText: 'Search Dataview',
                name : 'dataview_name',
                id:'dvnameId',
                 labelWidth: null,
                        listeners: {
                          // scope : this,
                        // buffer: 200,
                      //change:'appname'
                        }
                  
              
            }, {
            xtype: 'button',
            text: 'GO',
			cls:'app-gobutton',
			handler: function() {
			var appname=Ext.getCmp('dvnameId').getRawValue();	
		//alert(appname);

				var view=Ext.ComponentQuery.query("dataViewGrid")[0];

            store = view.getStore(),
            selModel = view.getSelectionModel(),
            selection = selModel.getSelection()[0];
        //alert(newValue);

        store.getFilters().replaceAll({
            property: 'dataview_name',
            anyMatch: true,
            value   : appname
        });
        if (selection && store.indexOf(selection) === -1) {
            selModel.clearSelections();
            this.down('dataViewGrid').clear();
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
						sessionStorage.removeItem("activity_type");
						sessionStorage.setItem("activity_type","create");
		
				var createDataViewwithButton= new Ext.create('SmartApp.view.dataviews.CreateDataViewwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton);	
							Ext.getCmp('tabpanelXtype').setActiveItem(3);	
			}
        }, {
            xtype: 'button',
            text: 'CLONE',
			cls: 'button-round-corner-primary',
			handler: function() {
							
								var list = Ext.getCmp('dataViewwithButton'); // getting id
								var grid = list.down('#dataViewGrid'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];
								
								if(row==null||row==undefined)
								{
								alert('Please Select a Dataview Name !');	
								}else 
										{

										sessionStorage.removeItem("activity_type");
										sessionStorage.setItem("activity_type","clone");
										var dataviewId=row.get('dataview_id');
										var collectionId=row.get('collection_id');
										var measureValue=row.get('measure');							
										var visualizationValue=row.get('visualization_type');
										var dimensionValue=row.get('group_by');	
										var aggregationValue=row.get('aggregation_type');
										var filterby=row.get('filterby');
										var dataviewName=row.get('dataview_name');
										var dataviewDesc=row.get('dataview_desc');

										sessionStorage.setItem('selectedCollId',collectionId);											
										sessionStorage.setItem('dataviewId',dataviewId);
										sessionStorage.setItem('dimensionValue',dimensionValue);
										sessionStorage.setItem('measureValue',measureValue);
										sessionStorage.setItem('aggregationValue',aggregationValue);
									    sessionStorage.setItem('visualizationValue',visualizationValue);	
									    sessionStorage.setItem('filterby',filterby);	
									    sessionStorage.setItem('dataviewName',dataviewName);
										sessionStorage.setItem('dataviewDesc',dataviewDesc);						

										console.log('during load '+sessionStorage.getItem('filterby'));

										var createDataConnectionView= new Ext.create('SmartApp.view.collections.DyanamicGridWithBackButton');			
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(createDataConnectionView);		
							
									}
			}
        }]},
		/*{
			xtype:'button',
			cls:'button-primary',
			margin:'2 0 0 2',
			text:'Create',
			handler:function()
			{
				sessionStorage.removeItem("activity_type");
				sessionStorage.setItem("activity_type","create");
		
			var createDataViewwithButton= new Ext.create('SmartApp.view.dataviews.CreateDataViewwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton);	
							Ext.getCmp('tabpanelXtype').setActiveItem(3);	
							
			}
			},
			
			{
			xtype:'button',
			itemId:'modifyButtonId',
			
			cls:'button-primary',
			margin:'0 10 0 10',
			text:'Modify',	
			listeners:{			
				click: function(btn) {

								
								
								var list = Ext.getCmp('dataViewwithButton'); // getting id
								var grid = list.down('#dataViewGrid'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];
								
							if(row==null||row==undefined)
								{
								alert('Please Select a Dataview Name !');	
								}else 
								{
								sessionStorage.removeItem("activity_type");
								sessionStorage.setItem("activity_type","modify");
								var dataviewId=row.get('dataview_id');								
								var dataviewName=row.get('dataview_name');
								var dataviewDesc=row.get('dataview_desc');
								var collectionId=row.get('collection_id');
								var measureValue=row.get('measure');									
								var visualizationValue=row.get('visualization_type');
								var dimensionValue=row.get('group_by');	
								var aggregationValue=row.get('aggregation_type');

								
								var directChildPanel = Ext.ComponentQuery.query('#textdsfsId > dyanamicGridWithBackButton');
								var textId=Ext.getCmp('textdsfsId');						
								
								
								sessionStorage.setItem('selectedCollId',collectionId);
								sessionStorage.setItem('dataviewName',dataviewName);
								sessionStorage.setItem('dataviewDesc',dataviewDesc);																		
								sessionStorage.setItem('dataviewId',dataviewId);
								sessionStorage.setItem('dimensionValue',dimensionValue);
								sessionStorage.setItem('measureValue',measureValue);
								sessionStorage.setItem('aggregationValue',aggregationValue);
							    sessionStorage.setItem('visualizationValue',visualizationValue);
							    sessionStorage.setItem('filterby',row.get('filterby'));						

								var createDataConnectionView= new Ext.create('SmartApp.view.collections.DyanamicGridWithBackButton');			
								var vport=Ext.getCmp('contentRegionPanel');
								vport.removeAll(true, true);
								vport.add(createDataConnectionView);	
					}//else
					}
				

				}	
			},
			{
			xtype:'button',
			itemId:'CloningButtonId',
			
			cls:'button-primary',
			margin:'0 10 0 2',
			text:'Clone',	
			listeners:{			
				click: function(btn) {
					
								
								var list = Ext.getCmp('dataViewwithButton'); // getting id
								var grid = list.down('#dataViewGrid'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];
								
								if(row==null||row==undefined)
								{
								alert('Please Select a Dataview Name !');	
								}else 
										{

										sessionStorage.removeItem("activity_type");
										sessionStorage.setItem("activity_type","clone");
										var dataviewId=row.get('dataview_id');
										var collectionId=row.get('collection_id');
										var measureValue=row.get('measure');							
										var visualizationValue=row.get('visualization_type');
										var dimensionValue=row.get('group_by');	
										var aggregationValue=row.get('aggregation_type');
										var filterby=row.get('filterby');
										var dataviewName=row.get('dataview_name');
										var dataviewDesc=row.get('dataview_desc');

										sessionStorage.setItem('selectedCollId',collectionId);											
										sessionStorage.setItem('dataviewId',dataviewId);
										sessionStorage.setItem('dimensionValue',dimensionValue);
										sessionStorage.setItem('measureValue',measureValue);
										sessionStorage.setItem('aggregationValue',aggregationValue);
									    sessionStorage.setItem('visualizationValue',visualizationValue);	
									    sessionStorage.setItem('filterby',filterby);	
									    sessionStorage.setItem('dataviewName',dataviewName);
										sessionStorage.setItem('dataviewDesc',dataviewDesc);						

										console.log('during load '+sessionStorage.getItem('filterby'));

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
			margin:'0 10 0 2',
			
			itemId:'deleteButtonId',
			text:'Delete',
				
								handler: function(rowIndex, colIndex) {
								
								var list = Ext.getCmp('dataViewwithButton'); // getting id
								var grid = list.down('#dataViewGrid'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];								
								if(row==null||row==undefined)
								{
									alert('Please Select a Dataview Name !');	
								}else 
								{
								
								grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
								grid.getStore().sync(); 
								var dataviewId=row.get('dataview_id');
								var collectionId=row.get('collection_id');
															
								Ext.Ajax.request(
									{
									url : 'http://localhost:3000/users/deleteDataView?dataview_id='+dataviewId+'&collection_id='+collectionId, 
									method: 'POST',
									success: function ( result, request) { 
									console.log('on success:::');												

									},
									failure: function(form, action) {
				                        Ext.Msg.alert('Failed', action.result.msg);
				                    } 
								});

						    var dataViewwithButtonView= new Ext.create('SmartApp.view.dataviews.DataViewwithButton');	
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(dataViewwithButtonView);			
					}
                }
				
			},*/
			{
			 itemId:'dataViewGrid',
			 cls:'content-apps-grid',
			 margin:'10 0 0 0',
			xtype:'dataViewGrid'
			
			}
			
		]
   
});
