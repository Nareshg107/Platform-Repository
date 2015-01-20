/**
 * Created by shiva.kumar on 15-12-2014.
 */

Ext.define('SmartApp.model.InsightGridModel', {
    extend: 'Ext.data.Model',
 //   fields: ['dataview_id','name', 'description', 'visualiseType']
// extend: 'SmartApp.model.Base',
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
