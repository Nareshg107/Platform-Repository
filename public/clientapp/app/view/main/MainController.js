/**
 * This class is the main view for the application. It is specified in app.js as
 * the "autoCreateViewport" property. That setting automatically applies the
 * "viewport" plugin to promote that instance of this class to the body element.
 * 
 * TODO - Replace this content of this view to suite the needs of your
 * application.
 */
Ext.define('ClientApp.view.main.MainController', {
	extend : 'Ext.app.ViewController',
	requires : [ 'Ext.MessageBox'
	],
	alias : 'controller.main',
	 routes : {
            'home' : 'onHome'
        },
		  onHome : function() {
		  
		  this.redirectTo('home');
		  },
	
	
	
	//for tab change
	onTabChange: function(tabPanel, newItem, oldItem) {
       if(newItem.title=='App')
		{
	/* alert('hi ');
			var contentRegion=Ext.create('ClientApp.view.setup.ClientGridWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
		*/
		}
		


		
		
		
		
    }
	
});
