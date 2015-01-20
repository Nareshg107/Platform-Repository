Ext.define('SmartApp.view.setup.Login', {
	extend:'Ext.form.Panel',
	xtype: 'form-login',
    title: 'Login',
    frame:true,
    width: 320,
    bodyPadding: 10,
    
    defaultType: 'textfield',
    
    
    items: [{
        allowBlank: false,
        fieldLabel: 'User ID',
        name: 'user',
        emptyText: 'user id'
    }, {
        allowBlank: false,
        fieldLabel: 'Password',
        name: 'pass',
        emptyText: 'password',
        inputType: 'password'
    }],
    
    buttons: [

        { 
        text:'Login',
         handler:function(){

    	alert("LOgin");
   		 }
         }
    ],
    
    initComponent: function() {
        this.defaults = {
            anchor: '100%',
            labelWidth: 120
        };
        
        this.callParent();
    }
});