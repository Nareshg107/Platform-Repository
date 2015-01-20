Ext.define('ClientApp.view.home.Header', {
     extend: 'Ext.Panel',
     xtype: 'Header',
    requires: [
        'Ext.layout.container.Column'
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
            title: 'Smart Client Platform'
        },		
        {          
            width: 180,
			docked:'right',
			items: []
        }
    ]

 });

 