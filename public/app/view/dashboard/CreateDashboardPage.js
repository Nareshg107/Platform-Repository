Ext.define('SmartApp.view.dashboard.CreateDashboardPage', {
    extend: 'Ext.container.Container',
    requires: [
        'SmartApp.view.InsightGridView',
        'SmartApp.view.InsightDashboardView',
		'SmartApp.view.DashboardController'
    ],

    xtype: 'app-main',
	height : 580,
	controller: 'dashboardcontroller',
    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        region: 'west',
        width: 350,
        height:450,
        split: true,
        items:[{
            xtype:"insightgridview",
            cls:'content-apps-grid'   
        }]
    },{
        xtype:"insightdashboardview",
		itemId:'insightdashboardview'
    },{
        xtype: 'panel',       
        region: 'south',
        width: 250,
      //  split: true,
        buttons: [{
			xtype:'button',	
            cls : 'button-primary',					
            text: 'Save Insight',           
			handler: 'onClickButton'
        }]
    }]
});
