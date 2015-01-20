Ext.define('SmartApp.model.CollectionModel', {
    extend: 'SmartApp.model.Base',
    fields: [
	{
			name: '_id',type:'string'
		},
	{
			name: 'collection_name',type:'string'
		},{
        name: 'source',type:'string'
    }, {
        name: 'description',type:'string'
    }, {
        name: 'no_of_records',type:'number'
    }, {
        name: 'update_date',type:'date'
    }]
});