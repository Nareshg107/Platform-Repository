Ext.define('SmartApp.view.dashboard.LineChartView', {
    extend: 'Ext.Panel',
   // requires:['SmartApp.store.ChartStore'],
    alias: 'widget.linechartview',
	width: '100%',
	height:350,
	border:true, 
    dataviewId:null,                                 
    initComponent: function() {
       
       var dataview_id = this.dataviewId;
	    var chartStore = new Ext.data.Store({	
            //model:'SmartApp.store.ChartStore',
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
//alert("line view"+chartStore.getCount());
		var me = this;
        me.items = [{
            xtype: 'chart',
            width: '100%',
            height: 290,
            store: chartStore,
            insetPadding: 50,
            innerPadding: 20,
            animate: true,
            shadow: false,
            axes: [{
                type: 'numeric',
                fields: 'value',
                position: 'left',
                grid: true,
                minimum: 10,
                label: {
                    renderer: function(v) { return v ; }
                }
            }, {
                type: 'category',
                fields: '_id',
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: '_id',
                yField: 'value',
                style: {
                    'stroke-width': 4
                },
                markerConfig: {
                    radius: 4
                },
                highlight: {
                    fill: '#000',
                    radius: 5,
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('_id') + ': ' + storeItem.get('value') );
                    }
                }
            }]
        }];

        this.callParent();

    }
});