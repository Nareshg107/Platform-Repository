Ext.define('SmartApp.view.dataviews.CreateDataViewwithButton', {
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
			html:'<h1>Choose Collection</h1>',
			margin:'2 0 10 0'
							
			},	
			{
			xtype:'button',
			itemId:'ViewDataId',
			
			cls:'button-primary',
			margin:'0 10 0 2',
			text:'View Data',
		
				
		
			listeners:{			
								click: function(btn) {
								var list = Ext.getCmp('listSubpages'); // getting id
								var grid = list.down('#gridSubpagesList'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];
								if(row==null||row==undefined)
								{
								alert('Please Select a Collection Name !');	
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
										
						
						var createDataConnectionView= new Ext.create('SmartApp.view.collections.DyanamicGridWithBackButton');
	
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataConnectionView);	
						}
					
                }
				}
			
			
			},
			{
			 itemId:'gridSubpagesList',
			cls:'content-apps-grid',
			 margin:'10 0 0 0',
			xtype:'collectionsGrid'
			
			}
			
		]
   
});
