/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SmartApp.view.main.MainTest', {
				extend: 'Ext.container.Container',
					requires: ['SmartApp.view.main.MainController'],
				xtype: 'app-maintest',   
				//	controller: 'main',				
				layout:'border',
				viewModel: {
							type: 'main'
						},
				items: [	
							{
								region: 'north',
								xtype: 'header',
								padding: 10,
								height: 100,
								html: '<a href="#"><img alt="mysite" src="../private/images/Eka-logo-med-rgb.jpg" class="logo" height="40" width="80"></a><h1 style="color:white">InSight CM - SMART</h1>',
							//	layout:'vbox',
								items:[{
										xtype:'toolbar',
    									items: [{
													xtype: 'button',
													text: 'Aravind',
													menu: [{
															text: 'Change Password'
															},{
															text: 'Logout'
															}
														]
												}]    
										}]																
							},
							{
								xtype: 'panel',
								title: 'Navigation',
								position: 'fixed',
								region: 'west',
								header: false,
								html:'west',
								split: true,
								width: '10%',
								
							},
							{
								region: 'center',								
								width: '90%',
								style: {
										color: '#FFFFFF',
										backgroundColor:'#000000'
										},
								
								
								html:'west'								
							}
						]
		
		});
		
	


