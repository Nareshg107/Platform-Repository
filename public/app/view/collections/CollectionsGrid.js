Ext.define('SmartApp.view.collections.CollectionsGrid', {
	extend: 'Ext.grid.Panel',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.ProgressBarPager',
		'Ext.grid.filters.Filters',
        'SmartApp.model.CollectionModel'
    ],	
    xtype: 'collectionsGrid',
    height:  window.innerHeight-200,
	forceFit: true,
	width:'100%',
	itemId:'collectionsGrid',
	cls: 'content-apps-grid',   	
	emptyText: 'No Matching Records',
    loadMask: true,
  //  stateful: true,
	
	
	// Set a stateId so that this grid's state is persisted.
 //   stateId: 'stateful-filter-collectiongrid',
    initComponent: function() {
          this.width='99.4%';	
	
        var storePortfolioGrid = new Ext.data.Store({	
			type: 'products',
			//autoSync:true,			
            model:'SmartApp.model.CollectionModel',
			autoLoad: true,
			
			proxy: {
					type: 'ajax',
					//url:'resources/data/grid/CollectionData.json',				
				    url: 'http://localhost:3000/users/getCollectionList',
					reader: {
						type: 'json',
						rootProperty:'data'						
						}
					}					
        });	
	
		
        Ext.apply(this, {
            store: storePortfolioGrid,
			// Dispatch named listener and handler methods to this instance
			defaultListenerScope: true,
			plugins: 'gridfilters'
			/*listeners: {
			
			rowclick: function(grid, idx){
				var grid = Ext.getCmp('collectionsGrid');
				var row = grid.getSelectionModel().getSelection()[0];
			//alert(row);			
           
    }
}*/
		
		,
		columns: [
			{
				dataIndex:'_id',minWidth:200,
				text: 'Id',
				hidden: true,
				hideable: false
			},{
				dataIndex:'collection_name',width:150,
				text: 'Collection Name',		
			 filter: {
				 type: 'string'
					}
			}
			,{
				dataIndex:'status',width:150,
				text: 'Status',		
			 filter: {
				 type: 'string'
					}				
			
			},{
				dataIndex:'source',width:150,
				text: 'Source',		
			 filter: {
				 type: 'string'
					}
			},{
				dataIndex:'description',width:200,
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
				dataIndex:'update_date',width:150,
				text: 'Update date',
				
				 filter: {
				 type: 'date'								
			 }			
			},{
        xtype:'actioncolumn',		
        width:50,
		align:'right',
        items: [{
			icon: 'resources/images/icon-grid-delete.png',  
            tooltip: 'Delete',
    		getClass: function() {
       // return 'x-hide-display';  //Hide the action icon
    		},
            handler: function(grid, rowIndex, colIndex) {
              var list = Ext.getCmp('listSubpages'); // getting id
											var grid = list.down('#gridSubpagesList'); // using itemid of grid
											var row = grid.getSelectionModel().getSelection()[0];								
											if(row==null||row==undefined)
											{
												alert('Please Select a row first!');	
											}else 
											{
											grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
											grid.getStore().sync(); 								
											var gridIdd=row.get('_id');
										
											console.log('the selected record path' +gridIdd);								
											
											if( sessionStorage.getItem("deletedCollId")!= null || sessionStorage.getItem("deletedCollId")!='') 
												sessionStorage.removeItem("deletedCollId");
												sessionStorage.setItem("deletedCollId",gridIdd);
											Ext.Ajax.request(
																{
																url : 'http://localhost:3000/users/deleteCollection?coll_Id='+gridIdd, 
																method: 'POST',
																success: function ( result, request) { 
																console.log('on success:::');												

																},
																failure: function(form, action) {
				                        						Ext.Msg.alert('Failed', action.result.msg);
				                    							}
															});

									var createDataConnectionView= new Ext.create('SmartApp.view.collections.CollectionwithButton');
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(createDataConnectionView);	
						
								
			               
								}//else
            }                
        }]
    }],
				bbar: {
					xtype: 'pagingtoolbar',
					pageSize: 1,
					style:'background-color:#F7F9F8;',
					store: storePortfolioGrid,
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
