Ext.define('ClientApp.view.home.PageTabPanel', {
   extend : 'Ext.tab.Panel',
	xtype : 'tabpanelXtype',
    cls: 'tab-smart',
	id:'tabpanelXtype',
    controller: 'main',
    width: '100%',
    height:25,

    defaults: {
        bodyPadding: 10,
        autoScroll: true
    },

    listeners: {
        tabchange: 'onTabChange',
        scope: 'controller'
    },
	margin:'3 0 0 5',
    items: [ {
        title: 'Setup'
        
    }]
});
