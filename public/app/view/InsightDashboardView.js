/**
 * Created by shiva.kumar on 16-12-2014.
 */
Ext.define('SmartApp.view.InsightDashboardView', {
    extend: 'Ext.dashboard.Dashboard',
    xtype: 'insightdashboardview',
    requires: ["SmartApp.view.InsightDashboardDropZone","SmartApp.view.DashboardController"],
    //title: 'Insight Dashboard',
    reference: 'dashboard',
    region: 'center',
    stateful: false,
    
    controller: 'dashboardcontroller',

    listeners: {
       paneldrop: 'onPanelDrop',
        scope: 'controller'
    },

    parts: {/*
       stocks: {
            viewTemplate: {
                title: 'Markets',
                items: [{
                    //xtype: 'markets'
                }]
            }
        },

        stockTicker: {
            viewTemplate: {
                title: 'Stocks',
                items: [{
                    //xtype: 'piechartview'
                }]
            }
        }*/
    },
    initComponent: function(){
        Ext.apply(this, {
            columnWidths: [
                0.50,
                0.50
            ],
            defaultContent: [/*{
                type: 'stockTicker',
                columnIndex: 0,
                height: 300
            }, {
                type: 'stocks',
                columnIndex: 1,
                height: 300
            }*/]
        });
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);

        // At this stage, we can reference the container Element for this component and setup the drop zone
        var dashboardDropZone = new SmartApp.view.InsightDashboardDropZone(this.getEl(), {
            dashboard : this
        });
        //  alert("dashboard rendered");
    }
});
