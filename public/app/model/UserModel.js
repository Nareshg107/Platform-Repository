Ext.define('SmartApp.model.UserModel', {
    extend: 'SmartApp.model.Base',
     fields: [{
            name: 'userId',type:'string'
        },{
            name: 'password',type:'string'
        },{
            name: 'verifiedpwd',type:'string'
        },{
            name: 'name',type:'string'
        },{
            name: 'address',type:'string'
        },{
            name: 'email',type:'string'
        },{
            name: 'activityType',type:'string'
        },{
            name: 'selectedUserId',type:'string'
        },{
            name: 'clients',type:'string'
        }]
});