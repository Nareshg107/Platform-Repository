Ext.define('SmartApp.view.chart.PieChartView', {
    extend: 'Ext.Panel',
    requires:['SmartApp.model.ChartModel'],
    alias: 'widget.smartapp-view-chart-piechartview',
    width: 700,
	   height:315,
	   border:true,
    
    initComponent: function() {
       var me = this;
         var collectionId=sessionStorage.getItem('selectedCollId');
         var measureValue= sessionStorage.getItem('measureValue');
         var dimensionValue= sessionStorage.getItem('dimensionValue');   
         var aggregation_type= sessionStorage.getItem('aggregationValue');
         var filterby= sessionStorage.getItem('filterby');
    
     
        this.myDataStore = Ext.create('Ext.data.Store', {
           model:'SmartApp.model.ChartModel',       
            proxy: {
                    type: 'ajax',         
                   url : 'http://localhost:3000/users/visualizeData?coll_id='+collectionId+'&dimension='+dimensionValue+'&measure='+measureValue+'&aggregation_type='+aggregation_type+'&filterby='+filterby, 
                   method: 'GET',
                  
                    reader: {
                        type: 'json'               
                        }
                    },
                    autoLoad : true                  

                   });

        me.items = [{
            xtype: 'polar',
            width: '100%',
             height:300,
            store: me.myDataStore,
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
		
			
	