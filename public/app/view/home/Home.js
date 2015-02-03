Ext.Ajax.on("beforerequest", function(){
	if (sessionStorage.getItem("sessionID") != null) {
	    Ext.Ajax.defaultHeaders = {"sessionID":sessionStorage.getItem("sessionID")};
		Ext.Ajax.method = 'GET';
		console.info("beforerequest");
	}					        
});
Ext.Ajax.on("requestcomplete", function(conn, result, options){
	console.info("requestcomplete"+result);
	//alert('inside requestcomplete');
	response = result.responseText;
	res = eval('(' + response + ')');
	//alert('resmsg:'+res.msg);
	if(res != undefined || res!='' && (res.msg != undefined || res.msg != '')) {
		
		var appErrorMassage;
		var bodyMsg;
		
		if(res.msg!=undefined)
		{
			var massage=res.msg;
			appErrorMassage=massage.substring(0,17);
			bodyMsg=massage.substring(19,massage.length);
			if(appErrorMassage=='Application Error')
					{
							Ext.Msg.alert(appErrorMassage,bodyMsg);
						/*	var createDataViewwithButton= new Ext.create('SmartApp.view.collections.CreateDataCollectionWindow');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataViewwithButton.Show());*/
							

					}	
			
		}
		if(res.msg == "Invalid Session") {
			Ext.Msg.alert(res.msg,'Please login to start a new session.',
			 	function (btn, text) {
                if (btn=='ok') {  
                	sessionStorage.removeItem('sessionID');             
  					window.location="/index.html";
                    // TODO: Show logon form here.

                }

            }

        );
			 					                      		
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
			 	
				xtype : 'tabpanelXtype',
				height:50,
			 	cls:'platform-navigation'
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
