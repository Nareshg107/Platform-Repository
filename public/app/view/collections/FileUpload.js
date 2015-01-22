Ext.define('SmartApp.view.collections.FileUpload', {
    extend: 'Ext.window.Window',
    xtype: 'basic-window',  
    height: 240,
    width: 450, 
    autoScroll: true,
      bodyStyle:'background-color:#F7F9F8;',
    bodyPadding: 10, 
    constrain: true,
    closable: true,
    closeAction: 'hide',
	shadow: false,
	title:'Select File',	
	title: '<div id="titlebar" align="left">Select File</div>',
	 cls:'winHeaderClass',
	 listeners:{
		close:function(){
		var collectionsGrid= new Ext.create('SmartApp.view.collections.CollectionwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(collectionsGrid);	
		
		}
	},
	items:[
	{
	xtype: 'form',
	layout:'hbox',
	cls:'button-primary',
	items:[
			{
						xtype: 'filefield',
						margin: '0 5 10 10',
						name: 'myFile',
						width:300,
						height:30,
						fileUpload: true,
						id:'DictUploadField1',
						fieldLabel: 'File',
						labelWidth: 50,
						msgTarget: 'side',
						allowBlank: false,
						anchor:'100%',
						buttonText: 'Select File...'
						//cls:'button-primary'
						
					},
					{
					
					xtype:'button',
					cls:'button-primary',
					text:'Upload',
					margin: '0 10 10 5',
					width:100,
					height:23,
						
					handler: function() {
							var collName     = sessionStorage.getItem("collectionName");
							var collDesc     = sessionStorage.getItem("collectionDesc");
							var uploadurl = 'http://localhost:3000/users/saveCollection?collName='+collName+'&collDesc='+collDesc;

							if( sessionStorage.getItem("collectionName")!= null || sessionStorage.getItem("collectionName")!='') 
								sessionStorage.removeItem("collectionName");
							
							if( sessionStorage.getItem("collectionDesc")!= null || sessionStorage.getItem("collectionDesc")!='') 
								sessionStorage.removeItem("collectionDesc");
			
								
							var form = this.up('form').getForm();
							var file = Ext.getCmp('DictUploadField1').getEl().down('input[type=file]').dom.files[0];           							
							
							if(form.isValid()){
								form.submit({								
									url: uploadurl,
									waitMsg: 'Uploading your File...',	
									success: function(response) 
									{	
									console.log('on success:::');
									var marketQuoteGridView=Ext.create('SmartApp.view.collections.CollectionwithButton');
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(marketQuoteGridView);	
									},
									failure:function(res,O){
									console.log('on failure:::');
									var marketQuoteGridView=Ext.create('SmartApp.view.collections.CollectionwithButton');
										var vport=Ext.getCmp('contentRegionPanel');
										vport.removeAll(true, true);
										vport.add(marketQuoteGridView);	
										console.log(res);
										console.log(O);
									},
									error:function(res){
										console.log(res);
									}
								});
							}
						}
					}]}
					],



				buttons:[	{
						
							text: 'Previous',
							margin:'10 350 0 0',
							cls:'button-primary',
							handler:function()
							{
										var createDataConnectionView= new Ext.create('SmartApp.view.collections.CreateDataCollectionType');		
														var vport=Ext.getCmp('contentRegionPanel');
														vport.removeAll(true, true);
														vport.add(createDataConnectionView.show());	
							}
						}]
					
			});
		
			
	