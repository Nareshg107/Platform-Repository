
Ext.define('SmartApp.view.app.ContentApp', {
     extend : 'Ext.Panel',
     xtype: 'ContentApp',

    requires: [
		'SmartApp.view.app.AppCarouselView',
		'SmartApp.view.app.AppCarouselHeaderView',
        'SmartApp.view.app.PrepackagedAppView',
        'SmartApp.view.app.PrepackagedAppHeaderView'
    ],
    collapsible:false,
    frame:false,
    //cls : 'app-dashboard-items',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
	
	cls:'content-insights',
    items: [
        {
            cls:'background-color-carousal',
            xtype: 'AppCarouselHeaderView',
            id: 'AppCarouselHeaderView',
            listeners : {
                itemclick : function(s, record, item, index, e, Opts){
                    //getContentPanel(record.data.id);
                    //alert("inside content app custom");
                }
            },
            trackOver: true
        },
        {
            title:'PRE-PACKAGED APPS',
            height:"50px",
        },
        {
            cls:'background-color-carousal',
            xtype: 'PrepackagedAppHeaderView',
            id: 'PrepackagedAppHeaderView',
            listeners : {
                itemclick : function(s, record, item, index, e, Opts){
                    //getContentPanel(record.data.id);
                   // alert("inside content app prepackaged");
                }
            },
            trackOver: true
        }
    ]
 });

 