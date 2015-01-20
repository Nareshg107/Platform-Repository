Ext.define('SmartApp.view.home.SideBarMenu', {
	extend : 'Ext.panel.Panel',
	xtype : 'sideBarMenu',
	layout : {
		type : 'hbox',
		align : 'stretch',
		margin : 20
	},
	align : 'stretch',
	items : [ {
		html : '<a href="#" id="myHrefIdClick">Trading</a><br>',
		listeners : {
			render : function(component) {
				component.getEl().on(
						'click',
						function(e) {

							var testView = Ext.create(
									'SmartApp.view.test.TestView', {});
							
							var vport = Ext.getCmp('appLayoutId');
							var centerRegion = vport.getComponent(3);
							centerRegion.removeAll(true, true);
							centerRegion.add(testView);
						});
			}
		}
	}]

});