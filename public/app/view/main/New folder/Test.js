/**
 * This class is the main view for the application. It is specified in app.js as
 * the "autoCreateViewport" property. That setting automatically applies the
 * "viewport" plugin to promote that instance of this class to the body element.
 * 
 * TODO - Replace this content of this view to suite the needs of your
 * application.
 */

Ext.define('SmartApp.view.main.Test', {
	extend : 'Ext.panel.Panel',
	xtype : 'app-panel',

	bodyPadding : 5, // Don't want content to crunch against the borders
	width : 300,
	title : 'Filters',
	items : [ {
		xtype : 'datefield',
		fieldLabel : 'Start date'
	}, {
		xtype : 'datefield',
		fieldLabel : 'End date'
	} ]
});
