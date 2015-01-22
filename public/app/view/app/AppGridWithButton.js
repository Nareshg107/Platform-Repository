Ext.define('SmartApp.view.app.AppGridWithButton', {
	extend: 'Ext.form.Panel',
	requires:[
	'SmartApp.view.app.ContentApp'],
	alias: 'widget.appGridWithButton',	
	id: 'appGridWithButton',
	xtype:'appGridWithButton',
	controller:'main',
	autoDestroy: false,
	margin:'12 0 0 0',
	items:[
			
			/*{
			 cls:'content-apps-grid',
			 itemId:'listOfAppGrid',	
			 margin:'10 0 0 0',
			 xtype:'listOfAppGrid'
			
			}*/
			{            
			collapsible:false,
			//frame:false,
			cls : 'app-dashboard-items', 
			header: {
            title: 'CUSTOM APPS'
        	},
        	tools: [{

                xtype: 'combobox',
               cls: 'ddl-rounded',
                width: 150,
                emptyText: 'Sort by',
               
                store: {
                    fields: ['SearchApp', 'SearchAppVal'],
                    data: [
						['Name', 'Name'],
						['Date', 'Date']
                    ]
                },
                displayField: 'SearchApp',
                valueField: 'SearchAppVal',
                filterPickList: true,
                queryMode: 'local',
                publishes: 'value'

            },{
            xtype: 'button',
            text: '',
			style: 'margin-right:20px',
			cls:'ddl-rounded-right-border'
        },{

                xtype: 'textfield',
                cls: 'ddl-search-app',
                width: 280,
                emptyText: 'Search Apps',
                name : 'appname',
                id:'appnameId',
                 labelWidth: null,
                        listeners: {
                          // scope : this,
                         buffer: 200,
                      change:'appname'
                        }
                  
              
            }, {
            xtype: 'button',
            text: 'GO',
			cls:'app-gobutton',
			handler: function() {
			var appname=Ext.getCmp('appnameId').getRawValue();	
		//alert(appname);
				var view=Ext.getCmp("InsightsCarouselContent");

            store = view.getStore(),
            selModel = view.getSelectionModel(),
            selection = selModel.getSelection()[0];
        //alert(newValue);

        store.getFilters().replaceAll({
            property: 'name',
            anyMatch: true,
            value   : appname
        });
        if (selection && store.indexOf(selection) === -1) {
            selModel.clearSelections();
            this.down('AppCarouselView').clear();
        }

						
			}
        },  {
            xtype: 'button',
			cls:'button-label-or',
            text: 'OR',
        }, {
            xtype: 'button',
            text: 'CREATE',
			cls: 'button-round-corner-primary',
			handler: function() {
						sessionStorage.setItem('activityType','create');
						sessionStorage.removeItem('_id');
						var createDashboardPage= new Ext.create('SmartApp.view.app.CreateAppPage');		
						var vport=Ext.getCmp('contentRegionPanel');
						vport.removeAll(true, true);
						vport.add(createDashboardPage);	
			}
        }],
					//height:800,	
		           // margin: '0 0 10 0',
					xtype:'ContentApp',
					id : 'ContentApp'
		        }
			
		]
   
});
