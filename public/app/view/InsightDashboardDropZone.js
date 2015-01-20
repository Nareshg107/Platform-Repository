Ext.define("SmartApp.view.InsightDashboardDropZone", {
    extend      : "Ext.dd.DropZone",
    ddGroup     : 'dashboardinsights',
    alias       : 'widget.insightdashboarddropzone',
    constructor : function() {
        console.log("constructor");
        this.callParent(arguments);
        var dashboard = this.dashboard;
    },

    getTargetFromEvent: function(e) {
        return e.getTarget();
    },

    getColumnIndexFromEvent: function (dd, e, data) {
        var dashboard = this.dashboard,
            items = dashboard.items.items,
            count = items.length,
            xy = e.getXY(),
            columnIndex,item;

        for (var i = 0; i < count; i += 2) {
            item = items[i];
            if(e.getX() >= item.getBox().x){
                columnIndex = i;
            }
        }

        return columnIndex;
    },

    onNodeDrop  : function(target, dragSource, e, data){
        
		var columnIndex = this.getColumnIndexFromEvent(dragSource, e, data);

        var view = this.dashboard;

        view.fireEvent('paneldrop',columnIndex, view, data);
    }
});
