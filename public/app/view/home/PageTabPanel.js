Ext.define('SmartApp.view.home.PageTabPanel', {
   extend : 'Ext.TabPanel',
	xtype : 'tabpanelXtype',
    cls: 'tab-smart',
	id:'tabpanelXtype',
    controller: 'main',
    width: '100%',
    height:30,

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
        title: 'App',
         layout: 'column'
        
    },{
        title: 'Insights',
         layout: 'column'
        
    }, {
        title: 'Data Views'
       /* loader: {
            url: 'resources/data/tab/ajax2.htm',
            contentType: 'html',
            loadMask: true
        }*/
    },
	 {
        title: 'Collections'
       /* loader: {
            url: 'resources/data/tab/ajax2.htm',
            contentType: 'html',
            loadMask: true
        }*/
   
    },
	{
        title: 'Setups',
        loader: {
            url: 'resources/data/tab/ajax2.htm',
            contentType: 'html',
            loadMask: true
        }
    }]
});
