Ext.define('SmartApp.view.dataviews.DataViewGrid', {
	extend: 'Ext.grid.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
		'Ext.grid.filters.Filters',
        'SmartApp.model.DataViewModel'
    ],	
    xtype: 'dataViewGrid',	
    height:  window.innerHeight-200,
	forceFit: true,
	width:'100%',
	itemId:'dataViewGrid',
	emptyText: 'No Matching Records',
    loadMask: true,
    initComponent: function() {
        this.width='99.4%';	
        var dataViewGridStore = new Ext.data.Store({	
			type: 'products',	
            model:'SmartApp.model.DataViewModel',
			autoLoad: true,	
			proxy: {
					type: 'ajax',
					//url:'resources/data/grid/CollectionData.json',				
					url: 'http://192.168.1.154:3000/users/getDataViewList',
					reader: {
						type: 'json',
						rootProperty:'data'						
						}
					}					
        });	
        Ext.apply(this, {
            store: dataViewGridStore,
			// Dispatch named listener and handler methods to this instance
		defaultListenerScope: true,
		plugins: 'gridfilters',
		
		columns: [
			{
				dataIndex:'dataview_id',minWidth:200,
				text: 'Id',
				hidden: true,
				hideable: false
			},{
				dataIndex:'collection_id',minWidth:200,
				text: 'Id',
				hidden: true,
				hideable: false
			},{
				dataIndex:'dataview_name',width:150,
				text: 'Dataview Name',		
			 filter: {
				 type: 'string'
					}
			}
			,{
				dataIndex:'source',width:200,
				text: 'Source',		
			 filter: {
				 type: 'string'
					}
				
			},{
				dataIndex:'dataview_desc',width:150,
				text: 'Description',		
			 filter: {
				 type: 'string'
					}
			},{
				dataIndex:'no_of_records',width:150,
				text: 'No of records',
				 filter: {
				 type: 'number'		
			 }			
			},{
				dataIndex:'visualization_type',width:150,
				text: 'Visualization Type',		
			 filter: {
				 type: 'string'
					}
				
			}
			,{
				dataIndex:'group_by',width:150,
				text: 'Group By',	
				hidden: true,
				hideable: false				
			
				
			},{
				dataIndex:'measure',width:150,
				text: 'Measure',
				hidden: true,
				hideable: false				
			
				
			},{
				dataIndex:'aggregation_type',width:150,
				text: 'aggregation_type',
				hidden: true,
				hideable: false					
			
			},{
				dataIndex:'filterby',width:150,
				text: 'filterby',
				hidden: true,
				hideable: false					
			
			}],
				bbar: {
					xtype: 'pagingtoolbar',
					style:'background-color:#F7F9F8;',
					pageSize: 1,
					store: dataViewGridStore,
					displayInfo: true
					//plugins: new Ext.ux.ProgressBarPager()
				}
			});
			this.callParent();
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
