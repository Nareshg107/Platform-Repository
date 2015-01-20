Ext.define('SmartApp.view.collections.FileUploadConfirmationView', {
	extend: 'Ext.container.Container',
	
	title:'Test',
	html:'you Have Successfully Uploaded file',
	
	items:[
			{
			xtype:'button',
			cls:'button-primary',
			margin:'0 0 0 10',
			text:'Ok',
			handler:function()
			{	
			var createDataConnectionView= new Ext.create('SmartApp.view.collections.CollectionwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataConnectionView.show());	
							
			}
			}
			
		]
   
});
