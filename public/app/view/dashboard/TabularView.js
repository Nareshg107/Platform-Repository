Ext.define('SmartApp.view.dashboard.TabularView', {
    extend: 'Ext.Panel',
	alias: 'widget.tabularview', 
	//requires:['SmartApp.store.ChartStore'],
	width: '100%',
	height:350,
    dataviewId:null,
    initComponent: function() {
            
        var me = this;
        var dataview_id = this.dataviewId;
		var chartStore = new Ext.data.Store({	
           // model:'SmartApp.store.ChartStore',
			extend: 'Ext.data.Store',
			alias: 'store.chartstore',
			requires: ["SmartApp.model.ChartModel"],
			model: "SmartApp.model.ChartModel",
			autoLoad: true,
			proxy: {
				type: 'ajax',         
				url : 'http://192.168.1.154:3000/users/getChartForDB?dataview_id='+dataview_id, 
				method: 'GET',
				reader: {
					type: 'json'               
				}
			}					
        });	
//alert("tab view"+chartStore.getCount());
        me.items = [ {
            style: 'padding-top: 10px;',
            xtype: 'gridpanel',
            forceFit:true,
            columns : {
                defaults: {
                    sortable: false,
                    menuDisabled: true
                },
                items: [
                    { text: 'Group By', dataIndex: '_id', },
                    { text: 'Value', dataIndex: 'value', renderer: function(v) { return v ; } }
                ]
            },
			height: 290,
            store: chartStore,
            insetPadding: 50,
            innerPadding: 20      
        }];

        this.callParent();

    }
});