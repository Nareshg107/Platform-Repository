Ext.define('SmartApp.model.DashboardModel', {
    extend: 'SmartApp.model.Base',
     fields: [{
            name: '_id',type:'string'
        },{
            name: 'name',type:'string'
        },{
            name: 'description',type:'string'
        },{
            name: 'layout_type',type:'string'
        }]
});