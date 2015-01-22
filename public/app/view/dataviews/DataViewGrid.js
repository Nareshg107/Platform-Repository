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
		cls: 'content-apps-grid',   	
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
					url: 'http://localhost:3000/users/getDataViewList',
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
				dataIndex:'_id',minWidth:200,
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
			},{
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
			
			},{
        xtype:'actioncolumn',		
        width:50,
		align:'right',
        items: [{
			icon: 'resources/images/icon-grid-edit.png',  
            tooltip: 'Edit',
    		getClass: function() {
     //   return 'x-hide-display';  //Hide the action icon
    		},
			padding:'10px 0',  //8
            handler: function(grid, rowIndex, colIndex) {
              	
								var list = Ext.getCmp('dataViewwithButton'); // getting id
								var grid = list.down('#dataViewGrid'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];
								
							if(row==null||row==undefined)
								{
								alert('Please Select a Dataview Name !');	
								}else 
								{
								sessionStorage.removeItem("activity_type");
								sessionStorage.setItem("activity_type","modify");
								var dataviewId=row.get('_id');								
								var dataviewName=row.get('dataview_name');
								var dataviewDesc=row.get('dataview_desc');
								var collectionId=row.get('collection_id');
								var measureValue=row.get('measure');									
								var visualizationValue=row.get('visualization_type');
								var dimensionValue=row.get('group_by');	
								var aggregationValue=row.get('aggregation_type');

								
								var directChildPanel = Ext.ComponentQuery.query('#textdsfsId > dyanamicGridWithBackButton');
								var textId=Ext.getCmp('textdsfsId');						
								
								
								sessionStorage.setItem('selectedCollId',collectionId);
								sessionStorage.setItem('dataviewName',dataviewName);
								sessionStorage.setItem('dataviewDesc',dataviewDesc);																		
								sessionStorage.setItem('dataviewId',dataviewId);
								sessionStorage.setItem('dimensionValue',dimensionValue);
								sessionStorage.setItem('measureValue',measureValue);
								sessionStorage.setItem('aggregationValue',aggregationValue);
							    sessionStorage.setItem('visualizationValue',visualizationValue);
							    sessionStorage.setItem('filterby',row.get('filterby'));						

								var createDataConnectionView= new Ext.create('SmartApp.view.collections.DyanamicGridWithBackButton');			
								var vport=Ext.getCmp('contentRegionPanel');
								vport.removeAll(true, true);
								vport.add(createDataConnectionView);	
					}//else
            }
        },'-',{
			icon: 'resources/images/icon-grid-delete.png',  
            tooltip: 'Delete',
    		getClass: function() {
       // return 'x-hide-display';  //Hide the action icon
    		},
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);


					
					var list = Ext.getCmp('dataViewwithButton'); // getting id
								var grid = list.down('#dataViewGrid'); // using itemid of grid
								var row = grid.getSelectionModel().getSelection()[0];								
								if(row==null||row==undefined)
								{
									alert('Please Select a Dataview Name !');	
								}else 
								{
								
								grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
								grid.getStore().sync(); 
								var dataviewId=row.get('_id');
								var collectionId=row.get('collection_id');
															
								Ext.Ajax.request(
									{
									url : 'http://localhost:3000/users/deleteDataView?dataview_id='+dataviewId+'&collection_id='+collectionId, 
									method: 'POST',
									success: function ( result, request) { 
									console.log('on success:::');												

									},
									failure: function(form, action) {
				                        Ext.Msg.alert('Failed', action.result.msg);
				                    } 
								});

						    var dataViewwithButtonView= new Ext.create('SmartApp.view.dataviews.DataViewwithButton');	
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(dataViewwithButtonView);			
					}
            }                
        }]
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
