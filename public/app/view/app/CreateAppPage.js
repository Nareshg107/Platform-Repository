Ext.define('SmartApp.view.app.CreateAppPage', {
	extend: 'Ext.form.Panel',
	requires:['SmartApp.store.DashboardStore'],
	bodyStyle:'background-color:#F7F9F8;',
	initComponent: function(){    
       
	    var me = this;
		var insightstore = new Ext.create('SmartApp.store.DashboardStore');
		
		me.items = [{
			xtype: 'form',
			bodyStyle:'background-color:#F7F9F8;',
			margin:'10 0 0 10',
			items:[{
				xtype: 'hiddenfield',
				name: 'activityType',
				value: 'create'
			},{
				xtype: 'hiddenfield',
				name: 'apptype',
				value: 'Custom'
			},{
				xtype: 'hiddenfield',
				name: 'url',
				value: ''
			},{
				xtype: 'hiddenfield',
				name: '_id'
			},{
				xtype: 'textfield',
				name: 'name',
				fieldStyle:'background-color:#FFFFFF;',
				fieldLabel: 'App Name',
				width:550,
				msgTarget: 'side', 
				invalidText: 'This field is required',     
				allowBlank: false 			  
			},{
				xtype: 'textarea',
				allowBlank: true,
				width:550,
				name: 'description',
				fieldStyle:'background-color:#FFFFFF;',
				fieldLabel: 'App Description'
			},{				    	
				xtype: 'itemselector',
				cls:'itemselector',
				name: 'selecteddashboards',
				id: 'itemselector-field',
				width: 550,
				height : 200,
				fieldLabel: 'Select InSights',
				imagePath: 'resources/images/images',
				store: insightstore,
				displayField: 'name',
				allowBlank: false, 
				msgTarget: 'side',
				fromTitle: '<b>Available InSights</b>',
				fieldStyle:'background-color:#FFFFFF;',
				toTitle: '<b>Selected InSights</b>'
			}]
		}];
        this.callParent();        
    },	
	onBoxReady: function(){
        
        if(sessionStorage.getItem('activityType')!=null && sessionStorage.getItem('activityType')=='modify') {
			Ext.Ajax.request({
			
				url : 'http://192.168.1.154:3000/users/getAppData?app_id='+sessionStorage.getItem('_id'), 
				method: 'GET',
				success: function ( result, request) { 
					
					console.log('on success:::'+result);												
					response = result.responseText;
					res = eval('(' + response + ')');																		
					var usermodel = Ext.create('SmartApp.model.AppModel',	{
						_id: res._id,
						name: res.name,
						description: res.description,
						selecteddashboards: res.selecteddashboards,
						activityType: sessionStorage.getItem('activityType'),
						apptype: 'Custom',
						url: ''
						});
					Ext.ComponentQuery.query("#createAppPage")[0].loadRecord(usermodel);

				},
				failure: function ( result, request) { 
				console.log('on failure:::');
					Ext.MessageBox.alert('Failed', 'Request failed'); 
				} 
			});	
        }		
	},
	itemId: 'createAppPage',
	xtype:'createAppPage',		
	width:'45%',
	height:550, 
	//border:true,
	title:'Create App',
	margin:'8 0 0 10', 
	buttons:[{	 
			xtype:'button',
			cls:'button-primary',
			text:'Back',
			margin:'0 430',
			handler:function(){								
				var createDataViewwithButton= new Ext.create('SmartApp.view.app.AppGridWithButton');		
				var vport=Ext.getCmp('contentRegionPanel');
				vport.removeAll(true, true);
				vport.add(createDataViewwithButton);
			}
			},{
				margin:'0 20 0 0', 
				xtype:'button',
				cls:'button-primary',
				text:'Save',
				handler:function(btn){

					var form = this.up('form').getForm();
					if (form.isValid()) {

						var userJson = JSON.stringify(form.getFieldValues());
						form.submit({
							url: 'http://192.168.1.154:3000/users/saveapp',
							//jsonSubmit : true,
							success: function(form, action) {
							  // Ext.Msg.alert('Success', action.result.msg);
								   var createDataViewwithButton= new Ext.create('SmartApp.view.app.AppGridWithButton');		
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(createDataViewwithButton);	

							},
							failure: function(form, action) {
								Ext.Msg.alert('Failed', action.result.msg);
							}
						});
					}
				}
			}]	
   
});
