Ext.define('SmartApp.view.app.AppGridWithButton', {
	extend: 'Ext.Panel',
	requires:[
	'SmartApp.view.app.ContentApp'],
	alias: 'widget.appGridWithButton',	
	id: 'appGridWithButton',
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

                xtype: 'combobox',
                cls: 'ddl-search-app',
                width: 280,
                emptyText: 'Search Apps',
                //style: 'margin-right:20px',
                store: {
                    fields: ['SearchApp', 'SearchAppVal'],
                    data: [
						['Crude Oil Insights', 'Crude Oil Insights'],
						['Global Oil Risk Position', 'Global Oil Risk Position'],
						['North American Strategy', 'North American Strategy'],
						['My Trade Insights', 'My Trade Insights'],
						['Derivatives And Financial View', 'Derivatives And Financial View'],
						['Risk Insights', 'Risk Insights']
                    ]
                },
                displayField: 'SearchApp',
                valueField: 'SearchAppVal',
                filterPickList: true,
                queryMode: 'local',
                publishes: 'value'

            }, {
            xtype: 'button',
            text: 'GO',
			cls:'app-gobutton'
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
