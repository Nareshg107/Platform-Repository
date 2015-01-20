/**
 * The main application class. An instance of this class is created by app.js
 * when it calls Ext.application(). This is the ideal place to handle
 * application launch and initialization details.
 */
Ext.define('SmartApp.Application', {
	extend : 'Ext.app.Application',

	name : 'SmartApp',

	stores : [],
	launch : function() {
	
	  if (Ext.browser.is.Gecko && Ext.browser.version.major < 28) {
            Ext.getBody().addCls('x-flex-wrap-broken');
        }
	}

});
