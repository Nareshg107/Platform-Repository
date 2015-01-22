Ext.define("Country", {
		extend : "Ext.data.Model",
		fields : ["dimension","measure"]
		
		});		
		var url1='http://localhost:3000/users/getDimensionsAndMeasures?collId='+sessionStorage.getItem("selectedCollId")+'&activity_type='+sessionStorage.getItem("activity_type")+'&dataview_id='+sessionStorage.getItem('dataviewId');		
			var dimstore = new Ext.data.Store({
			    model: "Country",	  
				proxy : {
					type : 'ajax',
					url :url1 ,
					reader : {
						type : 'json',
						rootProperty : 'dimensions'
					}
				},
				autoLoad : true,	
			});
			
			var url2='http://localhost:3000/users/getDimensionsAndMeasures?collId='+sessionStorage.getItem("selectedCollId")+'&activity_type='+sessionStorage.getItem("activity_type")+'&dataview_id='+sessionStorage.getItem('dataviewId');
			var measurestore = new Ext.data.Store({
			    model: "Country",	  
				proxy : {
					type : 'ajax',
				//	url : 'resources/data/xyjson.json',
					url :url2, 
					reader : {
						type : 'json',
						rootProperty : 'measures'
					}
				},
				autoLoad : true,
				
				
			});
			
Ext.define('SmartApp.view.dataviews.ChartsDetailsForm', {
    extend: 'Ext.form.Panel',
    xtype: 'chartsDetailsForm',  
    height: window.innerHeight-100,
    width: '100%',  
	margin:'10 10 10 10',
	itemId:'chartsDetailsForm',
	onBoxReady: function(){
        
	
		var dimensionValue = sessionStorage.getItem('dimensionValue');
		var measureValue = sessionStorage.getItem('measureValue');
		
		var aggregationValue = sessionStorage.getItem('aggregationValue');
		var visualizationValue = sessionStorage.getItem('visualizationValue');	
		
		if(dimensionValue!=null && measureValue!=null && aggregationValue!=null && visualizationValue!=null) {
			var dataviewmodel = Ext.create('SmartApp.model.DataViewModel', {
				measure : measureValue,
				group_by : dimensionValue,
				aggregation_type : aggregationValue,
				visualization_type : visualizationValue
			});
			

			Ext.ComponentQuery.query("#chartsDetailsForm")[0].loadRecord(dataviewmodel);
		}
       
        var activity_type = sessionStorage.getItem("activity_type");
       

        if (activity_type!=null && (activity_type == 'clone' || activity_type=='modify')){

				if(visualizationValue == 'HorzBar') {
				
					var createDataConnectionView= new Ext.create('SmartApp.view.chart.HorizontalBarView');
					var vport=Ext.getCmp('chartVisualizePlace');
				
					vport.removeAll(true, true);
					vport.add(createDataConnectionView);
				
				} else if(visualizationValue == 'VertBar') {
					var createDataConnectionView= new Ext.create('SmartApp.view.chart.VerticalBarView');
					var vport=Ext.getCmp('chartVisualizePlace');
				    vport.removeAll(true, true);
				    vport.add(createDataConnectionView);							
				
				} else if(visualizationValue == 'LineChart') {
					var lineChartView= new Ext.create('SmartApp.view.chart.LineChartView');
					var vport=Ext.getCmp('chartVisualizePlace');
					vport.removeAll(true, true);
					vport.add(lineChartView);
					
				} else if(visualizationValue == 'PiChart') {
					
					var pieChartView= new Ext.create('SmartApp.view.chart.PieChartView');
					var vport=Ext.getCmp('chartVisualizePlace');
					vport.removeAll(true, true);
					vport.add(pieChartView);
					
				} else if(visualizationValue == 'Tabular') {
				
					var tabularView= new Ext.create('SmartApp.view.chart.TabularView');
					var vport=Ext.getCmp('chartVisualizePlace');
					vport.removeAll(true, true);
					vport.add(tabularView);
				} 

        }
	},
	items:[
		{
		xtype:'form',
		layout:'hbox',
		items:[{
      
        border: false,
        items: [{
		xtype:'form',
		layout:'hbox',
		items:[	
				{
					xtype: 'label',
					margin:'10 10 10 10',
					text: 'Group By '	
				},{
					xtype: 'combo',
					margin:'10 10 10 10',
					//width:'20%',
					fieldlabel:'Group By',
					id        : 'dimension',
					store: dimstore,
					queryMode: 'local',
					name:'group_by',
					displayField: 'dimension',
				 
				},{
					xtype: 'label',
					margin:'10 10 10 10',
					text: 'Measure '
				
				},{
					xtype: 'combo',
					fieldlabel:'Measure',
					id        : 'measure',
					margin:'10 10 10 10',
				//	width:'20%',
					store: measurestore,
					queryMode: 'local',
					displayField: 'measure',
					name:'measure'
				}]},//
				{
					xtype      : 'radiogroup',
					fieldLabel : 'Aggregation',
					defaultType: 'radiofield',
					id:'aggregation',					
					layout: 'hbox',
				
					margin:'10 0 0 10',
					
					items: [
						{
							boxLabel  : 'Sum',
							name      : 'aggregation_type',
							margin:'0 0 0 20',
							inputValue: 'Sum',
							id        : 'Sum1'
						}, {
							boxLabel  : 'Avg',
							name      : 'aggregation_type',
							margin:'0 0 0 40',
							inputValue: 'Avg',
							id        : 'Avg2'
						}, {
							boxLabel  : 'Count',
							name      : 'aggregation_type',
							margin:'0 0 0 45',
							inputValue: 'Count',
							id        : 'Total3'
						}, {
							boxLabel  : 'Max',
							name      : 'aggregation_type',
							margin:'0 0 0 45',
							inputValue: 'Max',
							id        : 'Total4'
						}, {
							boxLabel  : 'Min',
							name      : 'aggregation_type',
							margin:'0 0 0 45',
							inputValue: 'Min',
							id        : 'Total5'
						}
					]
			},
			{
					xtype      : 'radiogroup',
					fieldLabel : 'Visualization',
					defaultType: 'radiofield',
					
					layout: 'hbox',
					id:'visualization',
					margin:'10 0 0 10',
					
					items: [
						/*{
							//horizontal bar
							boxLabel  : '<img alt="mysite" src="resources/images/charts_icons/shape_align_left.png"  height="20" width="20">',
								margin:'0 0 0 20',
							name      : 'visualization_type',
							inputValue: 'HorzBar',
							id        : 'radio1'
						},*/{
							//vertical bar
							boxLabel  : '<img alt="mysite" src="resources/images/charts_icons/column-chart-icon.png"  height="20" width="20">',
							//margin:'0 0 0 20',
							margin:'10 0 0 20',
							name      : 'visualization_type',
							inputValue: 'VertBar',
							id        : 'radio2'
						}, {
							//line chart
							boxLabel  : '<img alt="mysite" src="resources/images/charts_icons/chart_line.png"  height="20" width="20">',
							//margin:'0 0 0 20',
							margin:'10 0 0 20',
							name      : 'visualization_type',
							inputValue: 'LineChart',
							id        : 'radio3'
						}, {
							//pichart
							boxLabel  : '<img alt="mysite" src="resources/images/charts_icons/chart-icon.png"  height="20" width="20">',
							//html : '<img alt="mysite" src="resources/images/charts_icons/chart_pie.png"  height="10" width="10">',
							//margin:'0 0 0 20',
							margin:'10 0 0 20',
							name      : 'visualization_type',
							inputValue: 'PiChart',
							id        : 'radio4'
						}, {
							boxLabel  : '<img alt="mysite" src="resources/images/charts_icons/table.png"  height="20" width="20">',
							//margin:'0 0 0 20',
							margin:'10 0 0 20',
							name      : 'visualization_type',
							inputValue: 'Tabular',
							id        : 'radio5'

						}
					]
			}]
    }]
		},
		{
				xtype:'button',
				margin:'10 0 0 10',
				cls:'button-primary',
				text:'Visualize',
				handler:function(btn){									
							
					var dimensionValue=Ext.getCmp('dimension').getRawValue();					
				    var measureValue=Ext.getCmp('measure').getRawValue();
					
					var aggregationValue = Ext.ComponentQuery.query('[name=aggregation_type]')[0].getGroupValue();
					var visualizationValue = Ext.ComponentQuery.query('[name=visualization_type]')[0].getGroupValue();
					
					var collectionId = sessionStorage.getItem('selectedCollId');
					var dataviewId = sessionStorage.getItem('dataviewId');
					var filterby = sessionStorage.getItem('filterby');
			
					if(dimensionValue==null || dimensionValue == '' || measureValue==null || measureValue == ''
								|| visualizationValue==null || visualizationValue == ''){
						alert("Please select dimension/measure/visualization type to proceed");
						return;
					}
					
					//clear the session before resetting for clone
					sessionStorage.removeItem('dimensionValue');
					sessionStorage.removeItem('measureValue');
					sessionStorage.removeItem('aggregationValue');
					sessionStorage.removeItem('visualizationValue');
						
					//if( sessionStorage.getItem("dimensionValue") == null || sessionStorage.getItem("dimensionValue")=='') 
								sessionStorage.setItem('dimensionValue',dimensionValue);
								
					//if( sessionStorage.getItem("measureValue") == null || sessionStorage.getItem("measureValue")=='') 								
								sessionStorage.setItem('measureValue',measureValue);
								
					//if( sessionStorage.getItem("aggregationValue") == null || sessionStorage.getItem("aggregationValue")=='') 
								sessionStorage.setItem('aggregationValue',aggregationValue);
								
					//if( sessionStorage.getItem("visualizationValue") == null || sessionStorage.getItem("visualizationValue")=='') 								
								sessionStorage.setItem('visualizationValue',visualizationValue);
					
					
					var params = '?dimension='+dimensionValue+'&measure='+measureValue+'&aggregation='+aggregationValue+'&visualization='+visualizationValue+								'&filterby='+filterby+'&collectionId='+collectionId+'&dataviewId='+dataviewId;
					
				
							if(visualizationValue == 'HorzBar') {
							
								var createDataConnectionView= new Ext.create('SmartApp.view.chart.HorizontalBarView');
								var vport=Ext.getCmp('chartVisualizePlace');
								
								vport.removeAll(true, true);
								vport.add(createDataConnectionView);
							
							} else if(visualizationValue == 'VertBar') {
								var createDataConnectionView= new Ext.create('SmartApp.view.chart.VerticalBarView');
								var vport=Ext.getCmp('chartVisualizePlace');
							    vport.removeAll(true, true);
							    vport.add(createDataConnectionView);							
							
							} else if(visualizationValue == 'LineChart') {
								var lineChartView= new Ext.create('SmartApp.view.chart.LineChartView');
								var vport=Ext.getCmp('chartVisualizePlace');
								vport.removeAll(true, true);
								vport.add(lineChartView);
								
							} else if(visualizationValue == 'PiChart') {
								
								var pieChartView= new Ext.create('SmartApp.view.chart.PieChartView');
								var vport=Ext.getCmp('chartVisualizePlace');
								vport.removeAll(true, true);
								vport.add(pieChartView);
								
							} else if(visualizationValue == 'Tabular') {
							
								var tabularView= new Ext.create('SmartApp.view.chart.TabularView');
								var vport=Ext.getCmp('chartVisualizePlace');
								vport.removeAll(true, true);
								vport.add(tabularView);
							} 
				
				
				/*Ext.Ajax.request(
						{
						url : 'http://localhost:3000/users/visualizeData?coll_id='+collectionId+'&dimension='+dimensionValue+'&measure='+measureValue+'&aggregation_type='+aggregationValue, 
						method: 'POST',
						success: function ( result, request) { 
							console.log('on success:::');												

														
							
						},
						failure: function ( result, request) { 
							console.log('on failure:::');
							alert('Request failed'); 
						} 
					});	*/
				}				
			},{
			id:'chartVisualizePlace',
			//margin:'10 0 0 0',
			 xtype:'container',
			
			 //layout:'fit'
			//height:300,
			//width:700
			
			
			}
		],
	
	buttons: [		
	{
		margin:'0 1045 0 130',
		xtype:'button',
	    cls:'button-primary',
        text: 'Previous',		
			handler:function(btn)
			{					
					var createDataConnectionView= new Ext.create('SmartApp.view.collections.DyanamicGridWithBackButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataConnectionView);
				
				
			}
        },
		{
		margin:'0 30 0 130',
		xtype:'button',
	    cls:'button-primary',
        text: 'Save',		
			handler:function(btn)
			{		
						var dataviewId = sessionStorage.getItem('dataviewId');
						var collectionId = sessionStorage.getItem('selectedCollId');
					    var activity_type = sessionStorage.getItem('activity_type');

						//update dataview
						//alert(activity_type);
						  if (activity_type!=null && activity_type=='modify'){

						
							var collectionId = sessionStorage.getItem('selectedCollId');
							var dimensionValue = sessionStorage.getItem('dimensionValue');
							var measureValue = sessionStorage.getItem('measureValue');
							var aggregationValue = sessionStorage.getItem('aggregationValue');
							var visualizationValue = sessionStorage.getItem('visualizationValue');	
							var filterby = sessionStorage.getItem('filterby');									
							var dataviewNameValue=sessionStorage.getItem('dataviewName');					
				   			var dataviewDescValue=sessionStorage.getItem('dataviewDesc');
							
							var params = '?dimension='+dimensionValue+'&measure='+measureValue+'&aggType='+aggregationValue+'&chartType='+visualizationValue+'&filterby='+filterby+'&collId='+collectionId+
							'&dataViewName='+dataviewNameValue+'&dataViewDesc='+dataviewDescValue+'&activity_type='+activity_type+'&dataview_id='+dataviewId;
		
							Ext.Ajax.request(
								{
								
								url : 'http://localhost:3000/users/saveDataViews'+params, 
								method: 'POST',
								success: function ( result, request) { 
								console.log('on success:::');		

									var createDataConnectionView= new Ext.create('SmartApp.view.dataviews.DataViewwithButton');		
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(createDataConnectionView.show());											

								},
								failure: function ( result, request) { 
								console.log('on failure:::');
								Ext.MessageBox.alert('Failed', 'Request failed'); 
								} 
							});		
							
						} else {
			
								if (activity_type!=null){

									if(activity_type=='clone'){
										var dvCloneName = sessionStorage.getItem('dataviewName');
										sessionStorage.removeItem('dataviewName');
										sessionStorage.setItem('dataviewName','Copy of ' +dvCloneName);
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
        }]
});