
Ext.define("Country1", {
		extend : "Ext.data.Model",
		fields: [
        'abbr',
        'name']
		
		});		
 
var dimstore = new Ext.data.ArrayStore({
                model: "Country1",    
                proxy : {
                    type : 'ajax',
                    url :'http://localhost:3000/users/getClientList' ,
                    reader : {
                        type : 'json'   
                    }
                },
                autoLoad : true,    
            });
			

Ext.define('SmartApp.view.setup.CreateUserWindow', {
    extend: 'Ext.window.Window',
    xtype: 'userwindow',
    itemId:'userwindow',
    onBoxReady: function(){
        
        if(sessionStorage.getItem('_uid')!=null && sessionStorage.getItem('_uid')!='') {
				Ext.Ajax.request(
								{
								
								url : 'http://localhost:3000/users/getUserData?user_id='+sessionStorage.getItem('_uid'), 
								method: 'GET',
								success: function ( result, request) { 
									
									console.log('on success:::'+result);												
									response = result.responseText;
									res = eval('(' + response + ')');																		
									var usermodel = Ext.create('SmartApp.model.UserModel',	{
										_id: res._id,
										userId: res.userId,
										password: res.password,
										verifiedpwd: res.verifiedpwd,
										name: res.name,
										activityType: sessionStorage.getItem('activityType'),
									    selectedUserId: res.selectedUserId,
										address: res.address,
										email: res.email,
										clients: res.clients});
									
                                    Ext.ComponentQuery.query("#userRegistrationForm")[0].loadRecord(usermodel);

								},
								failure: function ( result, request) { 
								console.log('on failure:::');
									Ext.MessageBox.alert('Failed', 'Request failed'); 
								} 
							});	
        }

        		
        	},
            frame: true,
            border:false,
            title: '<div id="titlebar" align="left">Register User</div>',
            cls:'winHeaderClass',
            bodyPadding: 10,
            width: 355,
            height: 370,
            bodyStyle:'background-color:#F7F9F8;',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 115,
                msgTarget: 'side'
            },  
           
           //modal:true,
            constrain: true,
            closable: true,
            closeAction: 'hide',
        	id:'createUserWindow',
        	//shadow: false,
        	//title: 'Register User',
        	
        	items:[{
                border: false,
                xtype: 'form',
                bodyStyle:'background-color:#F7F9F8;',
                itemId:'userRegistrationForm',
                    items: [{
                xtype: 'fieldset',
                title: 'User Info',
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                
                items: [
                    { allowBlank:false, fieldLabel: 'User ID', name: 'userId', emptyText: 'user id' },
                    { allowBlank:false, fieldLabel: 'Password', name: 'password', emptyText: 'password', inputType: 'password' },
                    { allowBlank:false, fieldLabel: 'Verify',name:'verifiedpwd', emptyText: 'password', inputType: 'password' }
                ]
            }, {
                xtype: 'fieldset',
                title: 'Contact Information',
                
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                
                items: [{
                    fieldLabel: 'First Name',
                    emptyText: 'firstname',
        				allowBlank:false,
                    name: 'name'
                }, {
                    xtype: 'hiddenfield',
                    name: 'activityType',
        			value: 'create'
                }, {
                    xtype: 'hiddenfield',
                    name: 'selectedUserId'
                } ,{
                    xtype: 'hiddenfield',
                    name: '_id'
                }, {
                    fieldLabel: 'Address',
                    emptyText: 'address',
                    name: 'address'
                }, {
                    fieldLabel: 'Email',
                    name: 'email',
                    emptyText: 'email',
        			allowBlank:false,
                    vtype: 'email'
                }]
    }], buttons: [ {
        text: 'Save',
        cls:'button-primary',
       // formBind: true, //only enabled once the form is valid
        disabled: false,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {

				var userJson = JSON.stringify(form.getFieldValues());
				//alert(userJson);
                form.submit({
					url: 'http://localhost:3000/users/saveUserDetails?user_data='+userJson,
					//jsonSubmit : true,
                    success: function(form, action) {
                      // Ext.Msg.alert('Success', action.result.msg);
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
        }
    }]}],
	listeners:{
		close:function(){

		 var createDataViewwithButton= new Ext.create('SmartApp.view.setup.UserSetupGridWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton);	
		
		}
	}
});