Ext.define('SmartApp.view.home.Header', {
     extend: 'Ext.Panel',
     xtype: 'Header',
    requires: [
        'Ext.layout.container.Column',
		'SmartApp.view.home.ButtonCreateApp',
		'SmartApp.view.home.ButtonOr'
    ],
   layout: 'column',

   // bodyPadding: 5,
    
    defaults: {
		border:0	
      //  bodyPadding: 15
    },
    items: [
        {
            //title: 'Width = 0.3',
           columnWidth: 0.99,
		   cls:'eka-header-logo',
		    //margin: '0 0 0 10',
            title: 'Smart Platform'
        },		
        {          
            width: 180,
			docked:'right',
			items: [{
            tbar: {  
			    cls: 'tbar-usermanagement',              
                margin: '10px 10px 0 5px',                
                items: [{
                    text: sessionStorage.getItem('clientName'),
                    width: 160,
                    menu: {
                        items: [{
                                   // xtype:'button',
                                    text : 'Logout',
                                    handler:function()
                                    {           
                                        sessionStorage.removeItem('sessionID');
                                        Ext.Ajax.request(
                                        {
                                        //url : 'http://localhost:3000/users/deleteCollection?dataviewId='+dataviewId+'&collectionId='+collectionId, 
                                        url: 'http://localhost:3000/users/logout',
                                        method: 'GET',
                                        
                                        success: function ( result, request) { 
                                        console.log('on success:::');
                                        window.location.href='/index.html','width=1000 height=1000, scrollbars=yes, resizable=yes'                                               
                                        
                                        },
                                        failure: function ( result, request) { 
                                        console.log('on failure:::');
                                        Ext.Msg.alert('Failed', 'Request failed'); 
                                        } 
                                    });
                                    }
                            }]
                    }

                }]
            }
        }]
        },{          
            width: 180,
            docked:'right',
            items: [{
            tbar: {  
                cls: 'tbar-usermanagement',              
                margin: '10px 10px 0 5px',                
                items: [{
                    text : 'Client Setup',
                   
                    handler:function()
                    {           
                    window.open('http://localhost:3000/clientapp','width=1000 height=1000, scrollbars=yes, resizable=yes');
                                    
                    }
            }]
            }
        }]
        }
    ]

 });

 