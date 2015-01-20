Ext.define('SmartApp.model.AppModel', {
    extend: 'SmartApp.model.Base',
     fields: [{
            name: 'name',type:'string'
        },{
            name: 'description',type:'string'
        },{
            name: 'selecteddashboards',type:'string'
        },{
            name: '_id',type:'string'
        }, {
            name: 'activityType',type:'string'
        }, {
            name: 'apptype',type:'string'
        }, {
            name: 'url',type:'string'
        }]
});