Ext.define('SmartApp.view.home.LoginHome',{
extend : 'Ext.container.Viewport',
requires : [ 'SmartApp.view.home.LoginHeader'],
xtype : 'appLayout1',
id : 'appLayoutId1',
height:'100%',
refs: {
	HomeView: {
		autoCreate: true,
		selector: 'HomeView',
		xtype: 'HomeView'
	}
},
layout : 'border',
items : [{
	frame:false,
	collapsible:false,
	region: 'north',
	cls: 'eka-header',
	items:[{xtype: 'LoginHeader'}]
	},{
		region : 'center',
		id : 'contentSection1',
		width:'100%',
		items : [  {
			xtype:'panel',
			id:'contentRegionPanel1',
			height:'100%',
			width:'100%',	
			layout:{
					type:'vbox',
					height:500,
					width:400,
					align:'center'
			},
			margin:'10',
			items:[
				{
					border: false,
					frame:true,
					title: 'Login',
					xtype: 'form',
					itemId:'clientRegistrationForm',
					items: [ {			
					defaultType: 'textfield',
					defaults: {
						anchor: '100%'
					},
					
					items: [{
						margin:'10',
						fieldLabel: 'UserId',
						emptyText: 'Name',
						allowBlank:false,
						name: 'userName'
					}, {
						margin:'10',
					
						fieldLabel: 'Password',
						inputType: 'password',
						name: 'pwd',
						emptyText: 'Password',
						allowBlank:false
					   
					},{
						xtype: 'hiddenfield',
						name: 'activityType',
						value: 'create'
					},{
						xtype: 'hiddenfield',
						name: '_id'
					}]
				}], buttons: [ {
					text: 'Login',
					cls:'button-primary',
					//formBind: true, //only enabled once the form is valid
					disabled: false,
					handler: function() {						
						  var form = this.up('form').getForm();
				            if (form.isValid()) {
								var userJson = JSON.stringify(form.getFieldValues());
							//	alert(userJson);
				             	form.submit({
									url: 'http://192.168.1.154:3000/users/login',
									//jsonSubmit : true,
				                    success: function(form, action) {
				                  // Ext.Msg.alert('Success', action.result.msg);
				                  var sessionID=action.result.sessionID;
								  var clientName=action.result.clientName;
				                
								   sessionStorage.setItem('sessionID',sessionID);
								   sessionStorage.setItem('clientName',clientName);						                      	
											window.location="/index.html";
											

				                    },
				                    failure: function(form, action) {
				                        Ext.Msg.alert('Failed', action.result.msg);
				                    }
				                });
				               
				            }
					}
				}]
			}]
		}]

	}]
});
