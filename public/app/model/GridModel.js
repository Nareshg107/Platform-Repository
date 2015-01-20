Ext.define('SmartApp.model.GridModel', {
    extend: 'SmartApp.model.Base',
    fields: [{
			name: 'Rlz_Type'
		},{
        name: 'Profit_Center'
    }, {
        name: 'Product'
    }, {
        name: 'Origin'
    }, {
        name: 'Quality'
    }, {
        name: 'Allocation_Group'
    }, {
        name: 'Sales_Contract_Ref_No'
    }, {
        name: 'Contract_Type'
    }, {
        name: 'Business_Partner'
    }, {
        name: 'INCO_Term'
    }, {
        name: 'Quantity'
    }, {
        name: 'Current_Rlz_Quantity'
    }, {
        name: 'Rlz_Profit_and_Loss'
    }],
	proxy: {
        type: 'ajax',		
        url: 'resources/data/grid/convertcsv.json',
        reader: {
            type: 'json',
            rootProperty: 'data',
            idProperty: 'Rlz_Type',
            totalProperty: 'total'
        }
    },
    remoteSort: false,
    sorters: [{
        property: 'Company',
        direction: 'ASC'
    }],
    pageSize: 10
});