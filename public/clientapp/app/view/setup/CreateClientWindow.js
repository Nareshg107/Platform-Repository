Ext.define('ClientApp.view.setup.CreateClientWindow', {
    extend: 'Ext.window.Window',
    xtype: 'clientwindow',
    itemId:'clientwindow',
    onBoxReady: function(){
        
				if(sessionStorage.getItem('_cid') != null &&  sessionStorage.getItem('_cid') !=''){
					Ext.Ajax.request(
									{
									
									url : 'http://192.168.1.154:3000/users/getClientData?client_id='+sessionStorage.getItem('_cid'), 
									method: 'GET',
									success: function ( result, request) { 
										
										console.log('on success:::'+result);												
										response = result.responseText;
										res = eval('(' + response + ')');																		
										var usermodel = Ext.create('ClientApp.model.ClientModel',	{
											_id: res._id,
											name: res.name,
											activityType: sessionStorage.getItem('activityType'),
											address: res.address,
											description: res.description,
                                            super_id: res.super_id,
                                            super_pass: res.super_pass
											});
										Ext.ComponentQuery.query("#clientRegistrationForm")[0].loadRecord(usermodel);

									},
									failure: function ( result, request) { 
									console.log('on failure:::');
										Ext.MessageBox.alert('Failed', 'Request failed'); 
									} 
								});	
				}

		//alert(measurestore);
		//var userModel = measurestore.getAt(0);

		//phoneInfo.loadRecord(userModel);
	},
    frame: true,
    title: '<div id="titlebar" align="left">Register Client</div>',
    bodyPadding: 10,

    width: 300,

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        msgTarget: 'side'
    },  
    height: 300,
   // width: 500, 
   // autoScroll: true,
    bodyPadding: 10, 
    bodyStyle:'background-color:#F7F9F8;',
    constrain: true,
    closable: true,
    closeAction: 'hide',
	id:'createUserWindow',
	shadow: false,

	cls:'winHeaderClass',
	items:[{border: false,
         xtype: 'form',
          bodyStyle:'background-color:#F7F9F8;',
          itemId:'clientRegistrationForm',
            items: [ {
       
        
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },
        
        items: [ {
            fieldLabel: 'Client Login Id',
            emptyText: 'Super UserId',
            allowBlank:false,
            name: 'super_id'
        }, {
            fieldLabel: 'Password',
            emptyText: 'Password',
            allowBlank:false,
            name: 'super_pass'
        },{
            fieldLabel: 'Name',
            emptyText: 'Name',
			allowBlank:false,
            name: 'name'
        }, {
            fieldLabel: 'Description',
            name: 'description',
             emptyText: 'Description',
			allowBlank:false
           
        },{
            xtype: 'hiddenfield',
            name: 'activityType',
            value: 'create'
        },{
            xtype: 'hiddenfield',
            name: '_id'
        }, {
            fieldLabel: 'Address',
            name: 'address',
            emptyText:'Address'
        }]
    }], buttons: [ {
        text: 'Save',
        cls:'button-primary',
        //formBind: true, //only enabled once the form is valid
        disabled: false,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {

				var userJson = JSON.stringify(form.getFieldValues());
				//alert(userJson);
                form.submit({
					url: 'http://192.168.1.154:3000/users/saveClientDetails',
					//jsonSubmit : true,
                    success: function(form, action) {
                      // Ext.Msg.alert('Success', action.result.msg);
                      	   var createDataViewwithButton= new Ext.create('ClientApp.view.setup.ClientGridWithButton');		
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

		 var createDataViewwithButton= new Ext.create('ClientApp.view.setup.ClientGridWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton);	
		
		}
	}
});