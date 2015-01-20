Ext.define('SmartApp.view.home.MySearchWin', {
	extend : 'Ext.panel.Panel',
	xtype : 'mySearchWin',
	requires :['SmartApp.view.home.InsightSummary'],
	layout : {
		type : 'hbox',
		align : 'stretch',
		margin : 20
	},
	height : 400,
	items : [
			{
				xtype : 'panel',
				title : "Your Position",
				frame : true,
				height : 400,
				width : '80%',
				loader : {
					autoLoad : true,
					scripts : true,
					ajaxOptions : {
						method : 'GET'
					},
					renderer : function(loader, response, active) {
						loader.getTarget().update(response.responseText,
								active.scripts === true);
						return true;
					},
					manageHeight : true,
					manageWidth : true,
					autoHeight : true,
					autoWidth : true,
					url : pnlChartLocation1
				}
			},

			{
				//xtype : 'insightSummary',
				height : 400,
				width : '20%'
			} ]

});