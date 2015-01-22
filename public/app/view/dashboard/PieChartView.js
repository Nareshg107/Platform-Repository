Ext.define('SmartApp.view.dashboard.PieChartView', {
    extend: 'Ext.Panel',
   // requires:['SmartApp.store.ChartStore'],
    alias: 'widget.piechartview',
    width: '100%',
	height:350,
	border:true,
    dataviewId:null,
    
    initComponent: function() {
       var me = this;
       var dataview_id = this.dataviewId;
	   var chartStore = new Ext.data.Store({	
          //  model:'SmartApp.store.ChartStore',
			extend: 'Ext.data.Store',
			alias: 'store.chartstore',
			requires: ["SmartApp.model.ChartModel"],
			model: "SmartApp.model.ChartModel",
			autoLoad: true,
			proxy: {
				type: 'ajax',         
				url : 'http://localhost:3000/users/getChartForDB?dataview_id='+dataview_id, 
				method: 'GET',
				reader: {
					type: 'json'               
				}
			}					
        });	
	 // alert("pie view"+chartStore.getCount());
		me.items = [{
            xtype: 'polar',
            width: '100%',
            height: 290,
            store: chartStore,
            insetPadding: 50,
            innerPadding: 20,
            legend: {
                docked: 'bottom'
            },
            interactions: ['rotate', 'itemhighlight'],
            
            series: [{
                type: 'pie',
                angleField: 'value',
                label: {
                    field: '_id',
                    calloutLine: {
                        length: 60,
                        width: 3
                        // specifying 'color' is also possible here
                    }
                },
                highlight: true,
                tooltip: {
                    trackMouse: true, 
                    width:200,
                     renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('_id') + ': ' + storeItem.get('value') );
                    }
             
                }
            }]
        }];
        this.callParent();
    }
});
		
			
	