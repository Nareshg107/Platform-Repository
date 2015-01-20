Ext.define('SmartApp.view.main.SideBar', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-mainTest',

    requires: [
        //<debug>
        'Ext.app.bindinspector.Inspector'
        //</debug>
        
    ],
    
    ui: 'navigation',
    //cls: 'exec-menu-navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    tabBar: { 
        flex: 1,//MyCom:applied to child items of the container managed by this layout
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    items: [{
        // This page has a hidden tab so we can only get here during initialization. This
        // allows us to avoid rendering an initial activeTab only to change it immediately
        // by routing
        xtype: 'component',
        tabConfig: {
            hidden: true
        }
    },{
       // xtype: 'kpi',
        title: 'Trading',
    //    iconCls: 'exec-trading-icon',
		tooltip: 'Trading'
    },{
      //  xtype: 'quarterly',
        title: 'Risk',
    //    iconCls: 'exec-risk-icon',
		tooltip: 'Risk'
    },{
      //  xtype: 'news',
       title: 'Cost',
    //    iconCls: 'exec-cost-icon',
		tooltip: 'Cost'
    },{
       // xtype: 'profitloss',
        title: 'Asset Optimization',
     //   iconCls: 'exec-asset-icon',
		tooltip: 'Asset Optimization'
    },{
       // xtype: 'news',
        title: 'User Management',
     //   iconCls: 'exec-UserManagement-icon',
		tooltip: 'User Management'
    }],

    // This object is a config for the popup menu we present on very small form factors.
    // It is used by our controller (MainController).
    assistiveMenu: {
        items: [{
        height: 50,
        text: 'Trading'//,
       // iconCls: 'exec-trading-icon'
    },{
         height: 50,
        text:  'Risk'//,
       // iconCls: 'exec-risk-icon'
    },{
         height: 50,
        text: 'Cost'//,
        //iconCls: 'exec-cost-icon'
    },{
         height: 50,
        text: 'Asset Optimization'//,
       // iconCls: 'exec-asset-icon'
    },{
        height: 50,
        text: 'User Management'//,
       // iconCls: 'exec-UserManagement-icon'
    }]
        
    }
});
