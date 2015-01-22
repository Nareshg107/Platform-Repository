Ext.define('SmartApp.view.dashboard.CreateDashboardWindow', {
    //extend: 'Ext.form.Panel',
	extend: 'Ext.window.Window',
 	alias: 'widget.createDashboardWindow',  
    height: 220,
    width: 400, 
    bodyStyle:'background-color:#F7F9F8;',
    closable: true,
    closeAction: 'hide',
	itemId:'createDashboardWindow',	
	title: '<div id="titlebar" align="left"><b>Save Insight</b></div>',
	cls:'winHeaderClass',
	items:[{border: false,
         xtype: 'form',
		 bodyStyle:'background-color:#F7F9F8;',
          itemId:'dashboardForm',
		items:[{
			xtype: 'textfield',
			name: 'name',
			fieldStyle:'background-color:#FFFFFF;',
			fieldLabel: 'Name',
			msgTarget: 'side', 
			invalidText: 'This field is required',     
			allowBlank: false  
		},{
			xtype: 'textarea',
			allowBlank: true,
			name: 'description',
			fieldStyle:'background-color:#FFFFFF;',
			fieldLabel: 'Description'
		},{
			xtype: 'hidden',
			name: 'dashboardconfig'
		}]
	}],
	listeners:{
		close:function(){		
			var collectionsGrid= new Ext.create('SmartApp.view.dashboard.CreateDashboardPage');		
			var vport=Ext.getCmp('contentRegionPanel');
			vport.removeAll(true, true);
			vport.add(collectionsGrid);	
		}
	},
	buttons: [{
			margin:'10 10 0 5',
			xtype:'button',
			cls:'button-primary',
			text: 'Previous',
			handler:function(btn){
		
				var createDataConnectionView= new Ext.create('SmartApp.view.dashboard.CreateDashboardPage');		
				var vport=Ext.getCmp('contentRegionPanel');
				vport.removeAll(true, true);
				vport.add(createDataConnectionView);	
			}
	}, {
		margin:'10 10 0 200',
		xtype:'button',
	    cls:'button-primary',
        text: 'Submit',
		handler:function(btn){		
		//	var win = btn.up('window'),
		//	var	form = win.down('form');
		 var form = Ext.ComponentQuery.query("#dashboardForm")[0].getForm();
		//var form = this.up('form').getForm();
			if (form.isValid()) {	

				form.findField('dashboardconfig').setValue(sessionStorage.getItem('dashboardConfig'));
				var userJson = JSON.stringify(form.getFieldValues());
				form.submit({
					url: 'http:///localhost:3000/users/saveDashboard?activityType='+sessionStorage.getItem('activityType'),
					success: function(form, action) {
					    var databuttonView= new Ext.create('SmartApp.view.dashboard.DashboardWithButton');		
						var vport=Ext.getCmp('contentRegionPanel');
						vport.removeAll(true, true);
						vport.add(databuttonView);	
					},
					failure: function(form, action) {
						Ext.Msg.alert('Failed', 'Error in saving dashboard');
					}
				});
			}	
		}
    }]
});