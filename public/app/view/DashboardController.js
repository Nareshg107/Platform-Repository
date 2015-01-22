/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SmartApp.view.DashboardController', {
    extend: 'Ext.app.ViewController',
	requires:['SmartApp.view.dashboard.PieChartView','SmartApp.view.dashboard.VerticalBarView',
		'SmartApp.view.dashboard.LineChartView','SmartApp.view.dashboard.TabularView','SmartApp.view.dashboard.CreateDashboardWindow'],

    alias: 'controller.dashboardcontroller',

    onBoxReady:function(){
    	//console.log(this);
    	//alert("box ready called");
    },

    onClickButton: function () {

		var dashboard = Ext.ComponentQuery.query("#insightdashboardview")[0];

			var dashboardItemArray = new Array();

			var partsObj = {};

			var partItems = dashboard.getParts().items;

			for(var i=0;i<partItems.length;i++){
				var viewConfig = partItems[i].config;
				var partId = partItems[i]._id;
				var viewTemplateItemArray = new Array();
				viewTemplateItemArray.push(viewConfig.viewTemplate.items[0]);
				var viewTitle = viewConfig.viewTemplate.title

				partsObj[partId] = {
					viewTemplate:{
						title:viewTitle,
						items:viewTemplateItemArray
					}
				}
			}

			var dashboardColumns = dashboard.items.items;

			for (var i = 0; i < dashboardColumns.length; i += 2) {
				var dashboardColumnObj = dashboardColumns[i];
				var columnItems = dashboardColumnObj.items.items;
				for (var j = 0; j < columnItems.length; j++) {
					var itemConfig = columnItems[j]._partConfig
					var columnIndex = i/2;
					itemConfig.columnIndex = columnIndex;
					dashboardItemArray.push(itemConfig);
				}
			}

			console.log(partsObj);

			console.log(dashboardItemArray);

			var dashboardConfig = {};

			dashboardConfig.partsObj = partsObj;
			dashboardConfig.dashboardItems = dashboardItemArray;

			console.log(dashboardConfig);
			
			sessionStorage.setItem('dashboardConfig',Ext.encode(dashboardConfig));

		if(sessionStorage.getItem('activityType')!=null && sessionStorage.getItem('activityType')=='create'){					
			var createDashboardWindow= new Ext.create('SmartApp.view.dashboard.CreateDashboardWindow');		
			var vport=Ext.getCmp('contentRegionPanel');
			vport.removeAll(true, true);
			vport.add(createDashboardWindow.show());	
		} else {
			//alert("inside modify"+sessionStorage.getItem('dashboardConfig'));
			Ext.Ajax.request({								
				url : 'http://localhost:3000/users/saveDashboard?dashboard_id='+sessionStorage.getItem('dashboard_id')+'&activityType='+sessionStorage.getItem('activityType')+'&dashboardconfig='+sessionStorage.getItem('dashboardConfig'), 
				method: 'POST',
				success: function ( result, request) { 									
					console.log("Update successful"+result);	
					
					sessionStorage.removeItem('dashboard_id');
					sessionStorage.removeItem('activityType');					
					sessionStorage.removeItem('dashboardConfig');					

					var dashboardWithButton= new Ext.create('SmartApp.view.dashboard.DashboardWithButton');		
					var vport=Ext.getCmp('contentRegionPanel');
					vport.removeAll(true, true);
					vport.add(dashboardWithButton);	
				},
				failure: function ( result, request) { 
				console.log('on failure:::');
					Ext.MessageBox.alert('Failed', 'Request failed'); 
				} 
			});	
			
		}
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

	onPanelDrop:function(columnIndex, dashboard, data){
		console.log("data from drop");
		//console.log(data);

		var panelName = data.records[0].data.dataview_name;
		sessionStorage.removeItem('dataview_id');
		sessionStorage.setItem('dataview_id',data.records[0].data.dataview_id);
		//alert(data.records[0].data.visualization_type);

        var partsName = panelName;

        var partsObj = {};

        partsName = partsName.replace(/\W/g, '');

        var dataview_id = data.records[0].data.dataview_id;

		var visualizationValue = data.records[0].data.visualization_type;
		if(sessionStorage.getItem('dataview_id') != null){
			if(visualizationValue == 'VertBar') {

				//var verticalbarview = new Ext.create("smartapp.view.chart.VerticalBarView");		
				partsObj[partsName] = {
					viewTemplate: {
						title: panelName,
						items: [{
							xtype: 'verticalbarview',
							dataviewId:dataview_id
						}]
					}
				}
			} else if(visualizationValue == 'LineChart') {

				//var verticalbarview = new Ext.create("smartapp.view.chart.LineChartView");		
				partsObj[partsName] = {
					viewTemplate: {
						title: panelName,
						items: [{
							xtype: 'linechartview',
							dataviewId:dataview_id
						}]
					}
				}			
			} else if(visualizationValue == 'PiChart') {

				//var piechartview = new Ext.create("smartapp.view.chart.PieChartView");		
				partsObj[partsName] = {
					viewTemplate: {
						title: panelName,
						items: [{
							xtype: 'piechartview',
							dataviewId:dataview_id
						}]
					}
				}
			} else if(visualizationValue == 'Tabular') {

				//var tabularview = new Ext.create("smartapp.view.chart.TabularView");		
				partsObj[partsName] = {
					viewTemplate: {
						title: panelName,
						items: [{
							xtype: 'tabularview',
							dataviewId:dataview_id
						}]
					}
				}
			} 
		}
       
        this.view.setParts(partsObj)
        var panelConfig = {
            type:partsName,
            height:300
        }

        this.view.addView(panelConfig,columnIndex);
	}
});
