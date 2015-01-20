Ext.define('SmartApp.model.DataViewModel', {
    extend: 'SmartApp.model.Base',
    fields: [
	{
			name: 'dataview_id',type:'string'
	},{
        name: 'collection_id',type:'string'
    },{
			name: 'dataview_name',type:'string'
	},{
        name: 'dataview_desc',type:'string'
    }, {
        name: 'source',type:'string'
    }, {
        name: 'no_of_records',type:'number'
    }, {
        name: 'visualization_type',type:'string'
    }, {
        name: 'group_by',type:'string'
    }, {
        name: 'measure',type:'string'
    }
	, {
        name: 'aggregation_type',type:'string'
    }]
});