Ext.define('SmartApp.view.collections.CreateDataCollectionType', {
    extend: 'Ext.window.Window',
    xtype: 'basic-window',  
    height: 230,
    width: 400, 
    autoScroll: true,
    bodyStyle:'background-color:#F7F9F8;',
    bodyPadding: 10, 
    constrain: true,
	listeners:{
		close:function(){

		
		var collectionsGrid= new Ext.create('SmartApp.view.collections.CollectionwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(collectionsGrid);	
		
		}
	},
    closable: true,
    closeAction: 'hide',
	shadow: false,
	title: '<div id="titlebar" align="left">Select Data Source or File</div>',
	cls:'winHeaderClass',	
	items:[
			
			{
			layout:'hbox',
			bodyStyle:'background-color:#F7F9F8;',
			items:[
				
			{
			xtype:'button',
			cls:'button-primary',
			margin:'50 10 0 10',
			text:'Upload a File',
		//	scale:'large',
			handler:function()
			{
			var fileUpload= new Ext.create('SmartApp.view.collections.FileUpload');	
			var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(fileUpload.show());	
			}
			},
			{
			html:'<b style="background-color:#F7F9F8;">OR</b>',
			margin:'50 10 0 10',
			},
		{
			xtype:'button',
			cls:'button-primary',
			margin:'50 10 0 10',
		//	scale:'large',
			text:'Connect to a Data Source',
			handler:function(){
			Ext.Msg.alert('U Data Source button');
			}
			}
			]
		},
			
],
buttons: [	


{
		xtype:'button',
		margin:'10 300 0 0',
            text: 'Previous',
			cls:'button-primary',
			style:'margin:10px 10px 10px 10px;',
			handler:function()
			{
			var createDataConnectionView= new Ext.create('SmartApp.view.collections.CreateDataCollectionWindow');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataConnectionView.show());	
			}
        }



		]
			
});