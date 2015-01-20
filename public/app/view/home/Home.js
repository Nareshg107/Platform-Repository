Ext.Ajax.on("beforerequest", function(){
	if (sessionStorage.getItem("sessionID") != null) {
	    Ext.Ajax.defaultHeaders = {"sessionID":sessionStorage.getItem("sessionID")};
		Ext.Ajax.method = 'GET';
		console.info("beforerequest");
	}					        
});


Ext.Ajax.on("requestcomplete", function(conn, result, options){
	console.info("requestcomplete"+result);
	response = result.responseText;
	res = eval('(' + response + ')');	
	if(res != undefined || res!='' && (res.msg != undefined || res.msg != '')) {
		if(res.msg == "Invalid Session") {
			 sessionStorage.removeItem('sessionID');					                      	
			 window.location="/index.html";
		}		
	}      
});

Ext.define('SmartApp.view.home.Home',{
extend : 'Ext.container.Viewport',
requires: ['SmartApp.view.home.Header'],
id : 'appLayoutId',
controller:'main',
height:'100%',
layout : 'border',
items : [{
	    frame:false,
	    collapsible:false,
        region: 'north',
		cls: 'eka-header',
		items:[{xtype: 'Header'}]
    },{
		height:'100%',
		region : 'center',
		id : 'contentSection',
		cls:'app-dashboard',
		items : [{
					xtype : 'tabpanelXtype'
				}, {
					xtype:'panel',
					id:'contentRegionPanel',
					height:'100%',
					items:[{
							id:'contentRegionPanelid',					
							xtype : 'contentRegionPanel'												
						}]		
				}]
	}]
});