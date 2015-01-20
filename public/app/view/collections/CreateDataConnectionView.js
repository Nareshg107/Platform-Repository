Ext.define('SmartApp.view.collections.CreateDataConnectionView', {
	extend: 'Ext.panel.Panel',
	title:'Select Data Source',
	
	width:'50%',
	margin:'0 0 0 70%',
	
	layout:{
	type:'hbox',
	pack:'center',
	align:'middle'	
	}
	,
	items:[
			{
			xtype:'button',
			margin:'150 50 0 10',
			text:'Upload a File',
			scale:'large',
			handler:function()
			{
			Ext.Msg.alert('U clicked Upload button');
			}
			},
			{
			html:'<b>OR</b>'
			},
			{
			xtype:'button',
			margin:'150 10 0 50',
			scale:'large',
			text:'Connect to a Data Source',
			handler:function(){
			
			Ext.Msg.alert('U Data Source button');
			
			}
			}
			
		]
   
});
