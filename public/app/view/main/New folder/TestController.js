/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SmartApp.view.main.TestController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.MessageBox'
    ],
	
	init: function (view) {
        // We provide the updater for the activeState config of our View.
        view.updateActiveState = this.updateActiveState.bind(this);
    },
 
	menuItemClickINSIGHTS: function () {
	alert();
	this.getTargetPanel().removeAll();
	var newContent = Ext.widget('SmartApp.view.Test');
	this.getTargetPanel().add(newContent);
	 
	
    },
	refs: [
        {
        ref: 'menuItemClickINSIGHTS',
        selector: '',
        xtype: 'app-panel',
        autoCreate: true
		}
    ]
		
	onClickHome:function(){
	Ext.Msg.confirm("Hello You have Clicked Home");
	
	},
	onClickMovement:function(){
	Ext.Msg.alert("Hello you Clicked Movement");
}
});
