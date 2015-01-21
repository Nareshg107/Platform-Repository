Ext.define('SmartApp.view.home.PageTabPanel', {
   extend: 'Ext.toolbar.Toolbar',
	xtype : 'tabpanelXtype',
   // cls: 'tab-smart',
	id:'tabpanelXtype',
    controller: 'main',
    width: '100%',
    height:30,

    defaults: {
        frame: false
    },
   items:[{
                    xtype: 'button',
                    text:'APPS',
                    iconCls: 'apps',
                    id:'AppsId',
                    handler:'showCategoryApps'
                }, {
                    xtype: 'button',
                    text:'INSIGHTS',                    
                    id:'InsightsId',
                    iconCls: 'insights',
                  handler:'showCategoryInsights'
                }, {
                    xtype: 'button',
                    text:'DATAVIEW',
                    id:'DataViewId',
                    iconCls: 'dataviews',
                    handler:'showCategoryDataView'
                }, {
                    xtype: 'button',
                    text:'COLLECTIONS',
                    id:'CollectionsId',
                   iconCls: 'collections',
                   handler:'showCategoryCollections'
                }, {
                    xtype: 'button',
                    text:'SETUP',
                    id:'SetupId',
                   iconCls: 'algorithms',
                   handler:'showSetup'
                }]
});
