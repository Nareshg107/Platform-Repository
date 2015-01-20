Ext.define('SmartApp.model.ClientModel', {
    extend: 'SmartApp.model.Base',
     fields: [{
            name: '_id',type:'string'
        },{
            name: 'name',type:'string'
        },{
            name: 'description',type:'string'
        },{
            name: 'address',type:'string'
        },{
            name: 'activityType',type:'string'
        }]
});