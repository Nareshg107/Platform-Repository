Ext.define('SmartApp.view.chart.VerticalBarView', {

     extend: 'Ext.Panel',
    requires:['SmartApp.model.ChartModel'],
    alias: 'widget.smartapp-view-chart-verticalbarview',
     width:'70%',
    height:320,

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
                   url : 'http://192.168.1.154:3000/users/visualizeData?coll_id='+collectionId+'&dimension='+dimensionValue+'&measure='+measureValue+'&aggregation_type='+aggregation_type+'&filterby='+filterby, 
                   method: 'GET',
                  
                    reader: {
                        type: 'json'               
                        }
                    },
                    autoLoad : true                  
                   });

        me.items = [{
            xtype: 'chart',
            width:'70%',
            height:315,
            style: 'background: #fff',
            padding: '10 0 0 0',
            insetPadding: 40,
            animate: true,
            shadow: false,
            store: this.myDataStore,
            /*sprites: [{
                type  : 'text',
                text  : 'Column Charts - Basic Column',
                font  : '22px Helvetica',
                width : 100,
                height: 30,
                x : 40, //the sprite x position
                y : 12  //the sprite y position
            }, {
                type: 'text',
                text: 'Data: Browser Stats 2012',
                font: '10px Helvetica',
                x: 12,
                y: 380
            }, {
                type: 'text',
                text: 'Source: http://www.w3schools.com/',
                font: '10px Helvetica',
                x: 12,
                y: 390
            }],*/
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

        this.callParent();
    }
});