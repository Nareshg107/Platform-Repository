Ext.define('SmartApp.view.chart.TabularView', {

    extend: 'Ext.Panel',
	alias: 'widget.smartapp-view-chart-tabularview',
    requires:['SmartApp.model.ChartModel'],
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
                    reader: {
                        type: 'json'
                              
                        }
                    },
                    autoLoad : true                   
      
    

                   });
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
            store: this.myDataStore,
            width:500
        //</example>
       
        }];

        this.callParent();

    }
});