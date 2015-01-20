Ext.define('ClientApp.view.home.Home',{
	extend : 'Ext.container.Viewport',	
	requires:['ClientApp.view.home.PageTabPanel',
		'ClientApp.view.setup.ClientGridWithButton', 
		'ClientApp.view.home.Header'],			
	xtype : 'appLayout',
	id : 'appLayoutId',
	controller:'main',
	height:'100%',
	layout : 'border',
	items : [{
				frame:false,
				collapsible:false,
				region: 'north',
				cls: 'eka-header',
				items:[{xtype: 'Header'}]
			},							 {
				height:'100%',
				region : 'center',
				cls:'app-dashboard',
				id : 'contentSection',
				items : [ {
					xtype : 'tabpanelXtype'
				}, {
					xtype:'panel',
					id:'contentRegionPanel',
					height:'100%',
					items:[
					{
					xtype:'clientGridWithButton'
					}]
								
				}]

			}

		]

	});
