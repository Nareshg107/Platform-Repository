Ext.define('SmartApp.view.collections.CreateDataCollectionWindow', {
    extend: 'Ext.window.Window',
    xtype: 'basic-window',  
    height: 220,
    width: 400, 
    autoScroll: true,
    bodyPadding: 10, 
    bodyStyle:'background-color:#F7F9F8;',
    constrain: true,
    closable: true,
    closeAction: 'hide',
	id:'MyWinId',
	shadow: false,
	title: '<div id="titlebar" align="left">Select Data Collection</div>',
	cls:'winHeaderClass',
	
	items:[
	{
	xtype: 'form',
	name : 'collCaptureForm',
	id : 'collCaptureFormId',

	bodyStyle:'background-color:#F7F9F8;',


	items:[	
	{
        xtype: 'textfield',
        name: 'collectionName',
        fieldStyle:'background-color:#FFFFFF;',
        fieldLabel: 'Name',
		msgTarget: 'side', // location of the error message
        invalidText: 'This field is required', // custom error message text      
        allowBlank: false  // requires a non-empty value
    },
	{
        xtype: 'textarea',
		allowBlank: true,
        name: 'collectionDesc',
        fieldStyle:'background-color:#FFFFFF;',
        fieldLabel: 'Description',
      //  allowBlank: false  // requires a non-empty value
    }

	]
	}],
	listeners:{
		close:function(){

		
		var collectionsGrid= new Ext.create('SmartApp.view.collections.CollectionwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(collectionsGrid);	
		
		}
	},
	buttons: [		
	{
		margin:'10 10 0 300',
		xtype:'button',
	    cls:'button-primary',
        text: 'Next',
			
			handler:function(btn)
			{					
				var win = btn.up('window'),
				form = win.down('form');
				var collectionNameValue = form.getForm().findField('collectionName').getSubmitValue() ;
				var collectionDescValue = form.getForm().findField('collectionDesc').getSubmitValue() ;				
				
					if( sessionStorage.getItem("collectionName")!= null || sessionStorage.getItem("collectionName")!='') 
						sessionStorage.removeItem("collectionName");
					
					if( sessionStorage.getItem("collectionDesc")!= null || sessionStorage.getItem("collectionDesc")!='') 
						sessionStorage.removeItem("collectionDesc");
			
					sessionStorage.setItem("collectionName",collectionNameValue);
					sessionStorage.setItem("collectionDesc",collectionDescValue);
					
					if(form.isValid()){
						var createDataConnectionView= new Ext.create('SmartApp.view.collections.CreateDataCollectionType');		
						var vport=Ext.getCmp('contentRegionPanel');
						vport.removeAll(true, true);
						vport.add(createDataConnectionView.show());	
					}
				
			}
        }]
});