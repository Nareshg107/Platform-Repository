Ext.define('ClientApp.model.ClientModel', {
    extend: 'ClientApp.model.Base',
     fields: [{
            name: '_id',type:'string'
        },{
            name: 'name',type:'string'
        },{
            name: 'description',type:'string'
        },{
            name: 'address',type:'string'
        },{
            name: 'clientloginId',type:'string'
        },{
            name: 'password',type:'string'
        },{
            name: 'activityType',type:'string'
        }]
});