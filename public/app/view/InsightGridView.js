/**
 * Created by shiva.kumar on 15-12-2014.
 */
Ext.define('SmartApp.view.InsightGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.insightgridview',
    requires: ["SmartApp.store.InsightGridStore","SmartApp.view.InsightDragZone"],
    itemId:'vaap-view-general-grid-gridView',
    height: 400,
    title: 'List of Dataviews',
    draggable:true,
    initComponent: function(){
        var insightGridStore = new Ext.create('SmartApp.store.InsightGridStore');
        Ext.apply(this, {
            height: this.height,
            store: insightGridStore,
           // stripeRows: true,
            columnLines: true,
            columns: [{
                text   : 'Name',
                width: 125,
                dataIndex: 'dataview_name'
            },{
                text   : 'Description',
                width: 120,
                dataIndex: 'dataview_desc'
            },{
                text   : 'Type',
                width: 100,
                dataIndex: 'visualization_type'
            }]
        });
        this.callParent(arguments);
    },
    afterRender : function() {
        this.callParent(arguments);

        // Setup the drag zone
        new SmartApp.view.InsightDragZone(this.getEl(),{
            grid : this
        });
    }
});