Ext.define('SmartApp.view.home.CenterContentPanel', {
	extend : 'Ext.panel.Panel',
	
 requires:[
	'SmartApp.view.home.ContentRegion',
	'SmartApp.view.home.PageTabPanel'
	],
	
	xtype : 'centerContentPanel',	  
    height:window.innerHeight-120,
    width : '100%',
    layout: 'border',
	region : 'center',
	margin:'3',
  items : [ {
				region : 'north',
				xtype : 'tabpanelXtype'
			}, {
				xtype:'panel',
				id:'contentRegionPanel',
				height:'100%',
				
				region : 'center',
				height:window.innerHeight-120,
				items:[
						{
							id:'contentRegionPanelid',
							xtype :'contentRegionPanel'
			
						}
					]

				}			
		]
});