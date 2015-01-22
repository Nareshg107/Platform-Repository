Ext.define('SmartApp.view.collections.DynamicGridCreator', {
	extend: 'Ext.grid.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
		'Ext.grid.filters.Filters',
		'SmartApp.view.reader.DynamicReader'
    ],
    xtype: 'dynamicGridCreator',
	 width: '100%',
	bodyStyle:'background-color:#F7F9F8;',
	 height:window.innerHeight-185,
	 itemId:'dynamicGridCreator',
	 
    // URL used for request to the server. Required
  // url: 'http://localhost:8080/getMarketQuotes',
  					
  
  // url: 'http://localhost:3000/getDataViews?collId='+sessionStorage.getItem("selectedCollId")+'&activityType='+sessionStorage.getItem("activity_type")+'&dataview_id='+sessionStorage.getItem("dataviewId"),
    plugins: 'gridfilters',

	

	
/**
 * Lukas Sliwinski
 * sliwinski.lukas@gmail.com
 *
 * Dynamic grid, allow to display data setting only URL.
 * Columns and model will be created dynamically.
 */
    initComponent: function() {	

    		var url = '';
    	 	if(sessionStorage.getItem('activity_type')!=null && sessionStorage.getItem('activity_type')!='create') {
    			 url='http://localhost:3000/users/getDataViews?collId='+sessionStorage.getItem("selectedCollId")+'&activityType='+sessionStorage.getItem("activity_type")+'&dataview_id='+sessionStorage.getItem("dataviewId");
    		}else {
    			 url='http://localhost:3000/users/getDataViews?collId='+sessionStorage.getItem("selectedCollId")+'&activityType='+sessionStorage.getItem("activity_type");
    		}
    		
	
			 var viewDynStore = Ext.create('Ext.data.Store', {
							// Fields have to be set as empty array. Without this Ext will not create dynamic model.
							fields: [],
							// After loading data grid have to reconfigure columns with dynamic created columns
							// in Ext.ux.data.reader.DynamicReader
							listeners: {
								'metachange': function(store, meta) {
								me.reconfigure(store, meta.columns);
								}
							},
							autoLoad: true,
							remoteSort: false,
							pageSize: 10,
							remoteFilter: false,
							remoteGroup: false,
							
							proxy: {
								reader: 'dynamicReader',
								type: 'rest',
								url:  url
							}
						});

			 var filterMap = getFiltervalues();

			 console.log("filterMap::"+filterMap);
			 //add filters to store
            if(filterMap.length > 0){
                viewDynStore.addFilter(filterMap);
            }

			
			var config = {
						viewConfig: {
						 //forceFit: false,
						  autoScroll:true
						  },
						  bbar: {
							xtype: 'pagingtoolbar',
							style:'background-color:#F7F9F8;',
							pageSize: 10,
							store: viewDynStore,
							displayInfo: true
							//plugins: new Ext.ux.ProgressBarPager()
						},
							enableColLock: false,			
							border: true,
							autoSync:true,
							stripeRows: true

							
							};
			Ext.apply(this,config);			
			Ext.apply(this.initialConfig, config);
			var me = this;
			me.callParent(arguments);
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
   /* if(colFilters != undefined || colFilters != '' ){  
        for(var i=0 ; i<colFilters.length; i++){
            var filtername = colFilters[i].property;
            filterMap[filtername] = colFilters[i].value;
        }
    }*/
    return colFilters;
}