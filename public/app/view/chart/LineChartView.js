Ext.define('SmartApp.view.chart.LineChartView', {

    extend: 'Ext.Panel',
    requires:['SmartApp.model.ChartModel'],
    alias: 'widget.smartapp-view-chart-linechartview',
    width:'70%',
        height:320,
                                                 

    initComponent: function() {
         var collectionId=sessionStorage.getItem('selectedCollId');
         var measureValue= sessionStorage.getItem('measureValue');
         var dimensionValue= sessionStorage.getItem('dimensionValue');   
         var aggregation_type= sessionStorage.getItem('aggregationValue');
          var filterby= sessionStorage.getItem('filterby');
     var me = this;
    


        this.myDataStore = Ext.create('Ext.data.Store', {
           model:'SmartApp.model.ChartModel',   
           
            proxy: {
                    type: 'ajax',         
                   url : 'http://localhost:3000/users/visualizeData?coll_id='+collectionId+'&dimension='+dimensionValue+'&measure='+measureValue+'&aggregation_type='+aggregation_type+'&filterby='+filterby, 
                   method: 'GET',

                   // console.log('url :-'+url);
                    reader: {
                        type: 'json'
                     // rootProperty:'data'                     
                        }
                    },
                    autoLoad : true                   
      
    

                   });


        me.items = [{
            xtype: 'chart',
           width:'70%',
            height:315,
            padding: '10 0 0 0',
            style: {
                'background' : '#fff'
            },
            animate: true,
            shadow: false,
            store: this.myDataStore,
            insetPadding: 40,
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