Ext.define('SmartApp.view.home.LoginHeader', {
     extend: 'Ext.Panel',
     xtype: 'LoginHeader',
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
			items: []
        }
    ]

 });

 