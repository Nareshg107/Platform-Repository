Ext.define('SmartApp.view.collections.DyanamicGridWithBackButton', {
	extend: 'Ext.panel.Panel',
	requires:['SmartApp.view.collections.DynamicGridCreator',
			'SmartApp.view.reader.DynamicReader'
			],
		//title:'Test',
		 itemId: 'dyanamicGridWithBackButton',
		 xtype:'dyanamicGridWithBackButton',
		 margin:'12 0 0 0',	
			 
	items:[	
			{
		
			itemId:'textdsfsId',
			xtype:'label'
			}		
			,
			{
			xtype:'button',
			cls:'button-primary',
			margin:'2 0 0 2',
			text:' Back ', 
			handler:function()
			{			
			var createDataConnectionView= new Ext.create('SmartApp.view.dataviews.DataViewwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true,true);
							vport.add(createDataConnectionView);	
							
			}
			}
			,
			{
			 itemId:'dynamicGridCreator',
			// cls:'content-apps-grid',
			 margin:'10 0 0 0',
			xtype:'dynamicGridCreator'
			
			}				
		],	
			buttons:[
							{	 
							xtype:'button',
							cls:'button-primary',
							text:'Next',
							margin:'0 1100',
							handler:function()
							{
							var dynamicstore = Ext.ComponentQuery.query("#dynamicGridCreator")[0].getStore();
								var data = [];
								dynamicstore.getFilters().each(function (filter) {
									data.push(filter.serialize());
								});

								if(data!=null || data!='') {
									var filterby = Ext.JSON.encodeValue(data);
									sessionStorage.setItem('filterby',filterby);
								}
								//var filterby = Ext.JSON.encodeValue(data);
								//sessionStorage.setItem('filterby',filterby);
							
								var chartsDetailsForm= new Ext.create('SmartApp.view.dataviews.ChartsDetailsForm');		
								var vport=Ext.getCmp('contentRegionPanel');
								vport.removeAll(true, true);
								vport.add(chartsDetailsForm);	
									}
							},
							{
								margin:'0 50 0 0', 
								xtype:'button',
								cls:'button-primary',
								text:'Save Data View',
								handler:function(btn)
							//	sessionStorage.removeItem("activity_type",);
								
								{
									var activity_type=sessionStorage.getItem("activity_type");

									//alert(activity_type);
									var dynamicstore = Ext.ComponentQuery.query("#dynamicGridCreator")[0].getStore();
									var data = [];
									dynamicstore.getFilters().each(function (filter) {
										data.push(filter.serialize());
									});
									
									if(data!=null || data!='') {
										var filterby = Ext.JSON.encodeValue(data);
										sessionStorage.setItem('filterby',filterby);
									}
								
									 if (activity_type!=null && activity_type=='modify'){

									 	var dataviewId = sessionStorage.getItem('dataviewId');
										var collectionId = sessionStorage.getItem('selectedCollId');
										var dimensionValue = sessionStorage.getItem('dimensionValue');
										var measureValue = sessionStorage.getItem('measureValue');
										var aggregationValue = sessionStorage.getItem('aggregationValue');
										var visualizationValue = sessionStorage.getItem('visualizationValue');	
										
										var filterby = sessionStorage.getItem('filterby');		
										var activity_type = sessionStorage.getItem('activity_type');	
										
										var dataviewNameValue=sessionStorage.getItem('dataviewName');					
							   			var dataviewDescValue=sessionStorage.getItem('dataviewDesc');
										
										var params = '?dimension='+dimensionValue+'&measure='+measureValue+'&aggType='+aggregationValue+'&chartType='+visualizationValue+'&filterby='+filterby+'&collId='+collectionId+
										'&dataViewName='+dataviewNameValue+'&dataViewDesc='+dataviewDescValue+'&activity_type='+activity_type+'&dataview_id='+dataviewId;
					//alert(params);
										Ext.Ajax.request(
											{
											//url : 'http://localhost:3001/users/deleteCollection?dataviewId='+dataviewId+'&collectionId='+collectionId, 
											url: 'http://192.168.1.154:3000/users/saveDataViews'+params,
											method: 'POST',
											success: function ( result, request) { 
											console.log('on success1:::');												

											},
											failure: function ( result, request) { 
											console.log('on failure:::');
											response = result.responseText;
											res = eval('(' + response + ')');	
											Ext.Msg.alert('Failed', res.msg); 
											} 
										});							
									
										var createDataConnectionView= new Ext.create('SmartApp.view.dataviews.DataViewwithButton');		
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(createDataConnectionView.show());	
										
									} else {

										if (activity_type!=null){
											
											
											if(activity_type=='clone'){
												
											
												var dataviewNameValue=sessionStorage.getItem('dataviewName');
												sessionStorage.setItem('dataviewName','Copy of '+dataviewNameValue);
												//sessionStorage.removeItem('dataviewName');
											} else {
												sessionStorage.removeItem('dataviewName');
											}
										}

										var createDataConnectionView= new Ext.create('SmartApp.view.dataviews.CreateDataViewWindow');		
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(createDataConnectionView.show());	
									}
								}
							}
					]	
   
});
