Ext.define('SmartApp.view.setup.UserSetupGridView', {
					extend: 'Ext.grid.Panel',
				    requires: [
				        'Ext.data.*',
				        'Ext.grid.*',
				        'Ext.util.*',
				        'Ext.toolbar.Paging',
				        'Ext.ux.ProgressBarPager',
						'Ext.grid.filters.Filters',
				       	'SmartApp.model.UserModel'],	
				    xtype: 'userSetupGridView',
				    	cls: 'content-apps-grid',   		
				    height:  window.innerHeight-200,
					forceFit: true,
					width:'100%',
					itemId:'userSetupGridView',
					emptyText: 'No Matching Records',
				    loadMask: true,
					
				    initComponent: function() {
				       
				        this.width='99.4%';	
				        var userSetUpModel = new Ext.data.Store({	
				            model:'SmartApp.model.UserModel',
							autoLoad: true,	
							proxy: {
									type: 'ajax',
									//url:'resources/data/grid/CollectionData.json',				
									url: 'http://localhost:3000/users/getUserList',
									reader: {
										type: 'json',
										rootProperty:'data'						
										}
									}					
				             });	
				       
				        Ext.apply(this, {
						       	store: userSetUpModel,	
								defaultListenerScope: true,
								plugins: 'gridfilters',	
								columns: [
									{
										dataIndex:'_id',minWidth:200,
										text: 'Id',
										hidden: true,
										hideable: false
									},{
										dataIndex:'userId',minWidth:200,
										text: 'User Id'
									
									},{
										dataIndex:'name',width:150,
										text: 'User Name',		
									 filter: {
										 type: 'string'
											}
									}
									,{
										dataIndex:'email',width:200,
										text: 'Email',		
									 filter: {
										 type: 'string'
											}
										
									},{
										dataIndex:'address',width:150,
										text: 'Address',		
									 filter: {
										 type: 'string'
											}
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
              	
							var list = Ext.getCmp('userSetupGridWithButton'); // getting id
											var grid = list.down('#userSetupGridView'); // using itemid of grid
											var row = grid.getSelectionModel().getSelection()[0];
											//console.log(row.get("_id"));
											//alert(row.get("_id"));

											sessionStorage.setItem('activityType','modify');
											sessionStorage.setItem('_uid',row.get("_id"));
											var createDataViewwithButton= new Ext.create('SmartApp.view.setup.CreateUserWindow');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton.show());	
            }
        },'-',{
			icon: 'resources/images/icon-grid-delete.png',  
            tooltip: 'Delete',
    		getClass: function() {
       // return 'x-hide-display';  //Hide the action icon
    		},
            handler: function(grid, rowIndex, colIndex) {
            var list = Ext.getCmp('userSetupGridWithButton'); // getting id
									var grid = list.down('#userSetupGridView'); // using itemid of grid
									var row = grid.getSelectionModel().getSelection()[0];
									var user_id=row.get('_id');
									grid.getStore().remove(grid.getSelectionModel().getSelection()[0]);							
									grid.getStore().sync(); 
									
									Ext.Ajax.request(
									{
									url : 'http://localhost:3000/users/deleteUser?user_id='+user_id, 
									method: 'POST',
									success: function ( result, request) { 
									console.log('on success:::');												
									var createDataViewwithButton= new Ext.create('SmartApp.view.setup.UserSetupGridWithButton');
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(createDataViewwithButton);
									},
									failure: function(form, action) {
				                        Ext.Msg.alert('Failed', action.result.msg);
				                    } 
								});
									
            }                
        }]
    }
									],
										bbar: {
											xtype: 'pagingtoolbar',
											style:'background-color:#F7F9F8;',
											pageSize: 1,
											store: userSetUpModel,
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
