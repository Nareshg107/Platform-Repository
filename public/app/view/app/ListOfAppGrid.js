Ext.define('SmartApp.view.app.ListOfAppGrid', {
	extend: 'Ext.grid.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
		'Ext.grid.filters.Filters',
        'SmartApp.model.AppModel'
    ],	
    alias: 'widget.listOfAppGrid',	
    id: 'listOfAppGrid',
    height:  window.innerHeight-200,
	forceFit: true,
	width:'100%',
	emptyText: 'No Matching Records',
    loadMask: true,
    initComponent: function() {
        this.width='99.4%';	
        var appModel = new Ext.data.Store({	
			type: 'products',	
            model:'SmartApp.model.AppModel',
			autoLoad: true,	
			proxy: {
					type: 'ajax',
					//url:'resources/data/grid/CollectionData.json',				
					url: 'http://192.168.1.154:3000/users/appList',
					reader: {
						type: 'json'
						//rootProperty:'data'						
						}
					}					
        });	
        Ext.apply(this, {
            store: appModel,
			// Dispatch named listener and handler methods to this instance
		defaultListenerScope: true,
		plugins: 'gridfilters',
		
		columns: [
			{
				dataIndex:'_id',
				//text: 'Id',
				hidden: true,
				hideable: false
			},{
				dataIndex:'name',width:150,
				text: 'App Name'
				
			},{
				dataIndex:'description',width:150,
				text: 'App Description',
				
			},{
				dataIndex:'apptype',width:150,
				text: 'App Type',		
				filter: {
				 type: 'string'
				}				
			},{
				dataIndex:'selecteddashboards',width:300,
				text: 'Used Insights',		
			 filter: {
				 type: 'string'
					}
			}
			],
				bbar: {
					xtype: 'pagingtoolbar',
					style:'background-color:#F7F9F8;',
					pageSize: 1,
					store: appModel,
					displayInfo: true
				}
			});
			this.callParent();
		},
		listeners: {
			cellclick:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
				if(record.data.apptype == 'Pre-packaged'){
					var url = record.data.url;
					if(url != '' )
						window.open(url,'width=1000 height=1000, scrollbars=yes, resizable=yes');
				}			 
			}
		},
		onClearFilters: function () {
			// The "filters" property is added to the grid (this) by gridfilters
			this.filters.clearFilters();
		},

		onShowFilters: function () {
			var data = [];

			// The actual record filters are placed on the Store.
			this.store.getFilters().each(function (filter) {
				data.push(filter.serialize());
			});

			// Pretty it up for presentation
			data = Ext.JSON.encodeValue(data, '\n').replace(/^[ ]+/gm, function (s) {
				for (var r = '', i = s.length; i--; ) {
					r += '&#160;';
				}
				return r;
			});
			data = data.replace(/\n/g, '<br>');

			Ext.Msg.alert('Filter Data', data);
		}
});
