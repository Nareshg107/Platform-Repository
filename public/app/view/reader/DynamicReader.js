/**
 * @class Ext.ux.data.DynamicReader
 * @extends Ext.data.reader.Json
 * <p>Dynamic reader, allow to get working grid with auto generated columns and without setting a model in store</p>
 */

/**
 * floatOrString data type provide proper sorting in grid for string and float
 * if you don't now what data type of that two whould be in column
 */
Ext.apply(Ext.data.Types, {
    FLOATORSTRING: {
        convert: function(v, n) {
            v = Ext.isNumeric(v) ? Number(v) : v;
            return v;
        },
        sortType: function(v) {
            v = Ext.isNumeric(v) ? Number(v) : v;
            return v;
        },
        type: 'floatOrString'
    }
});

Ext.define('SmartApp.view.reader.DynamicReader', {
    extend: 'Ext.data.reader.Json',
    alias : 'reader.dynamicReader' , 
    readRecords: function(data) {
        
        if (data.length > 0) {      
            var item = data[0]; 
            var columns = new Array();
            var filterMap = getFiltervalues();

            for (var p in item) {
                if (p && p != undefined) {
                    var coltext = p.toUpperCase();
                    
                    //double check to confirm the first row always returns column datatypes
                    var datatype = item[p];                 
                    if(datatype == null || datatype == ''){
                        datatype = 'string';                        
                    }

                    var filter = {
                        type: datatype, value:filterMap[p]
                    }                   
                    var column = {
                        text: coltext, dataIndex: p, width : 150, filter : filter
                    };
                    columns.push(column);                   
                }
            }

            //removes the first item of the data store
            data = data[1];

            data.metaData = {columns: columns};
        }
        
        return this.callParent([data]);
    }
});

function getFiltervalues() {
    var filterMap = {};
    var colFilters = '';
    if(sessionStorage.getItem("activity_type")=='modify' || sessionStorage.getItem("activity_type")=='clone'){
        Ext.Ajax.request({
            url: 'http://localhost:3000/users/getDataViewFilter?dataview_id='+sessionStorage.getItem("dataviewId")+'&collection_id='+sessionStorage.getItem("selectedCollId"),
            method: 'GET',
            async : false,
            success: function ( result, request) { 
                console.log('on success:::');                                               
                response = result.responseText;
                colFilters = eval('(' + response + ')');
            },
            failure: function ( result, request) { 
                console.log('on failure:::');
                Ext.MessageBox.alert('Failed', 'Request failed');   
            } 
        });
    } else if(sessionStorage.getItem("activity_type")=='create'){
        var filterby = sessionStorage.getItem("filterby");

        console.log("filterby"+filterby);
        if(filterby != null && (filterby != undefined || filterby != ''))
            colFilters = Ext.JSON.decode(filterby); 
    }

    console.log("column filters::"+colFilters);
    if(colFilters != undefined || colFilters != '' ){  
        for(var i=0 ; i<colFilters.length; i++){
            var filtername = colFilters[i].property;
            filterMap[filtername] = colFilters[i].value;
        }
    }
    return filterMap;
}


