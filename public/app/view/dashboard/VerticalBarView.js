Ext.define('SmartApp.view.dashboard.VerticalBarView', {
    extend: 'Ext.Panel',
    requires:['SmartApp.model.ChartModel'],
    alias: 'widget.verticalbarview',
	width: '100%',
	height:350,
	border:true,
    dataviewId:null,
    initComponent: function() {
       var me = this;
        var dataview_id = this.dataviewId;
	 var chartStore = new Ext.data.Store({	
            //model:'SmartApp.store.ChartStore',
			extend: 'Ext.data.Store',
			alias: 'store.chartstore',
			//requires: ["SmartApp.model.ChartModel"],
			model: 'SmartApp.model.ChartModel',
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
		//alert("bar view"+chartStore);
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
                position: 'left',
                fields: ['value'],
                label: {
                    renderer: function(v) { return v; }
                },
                grid: true,
                minimum: 0
            }, {
                type: 'category',
                position: 'bottom',
                fields: ['_id'],
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
            series: [{
                type: 'bar',
                axis: 'left',
                xField: '_id',
                yField: 'value',
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 20,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('value') + ': ' + storeItem.get('_id'));
                    }
                }
            }]
        }];

        this.callParent(arguments);
    }
});