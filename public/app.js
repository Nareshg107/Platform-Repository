/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
	name : 'SmartApp',

	extend : 'SmartApp.Application',
	views:[
	'SmartApp.view.reader.DynamicReader',
	
	'SmartApp.view.home.PageTabPanel',
							'SmartApp.view.home.ContentRegion',
							'SmartApp.view.main.MainController',
							'SmartApp.view.collections.CollectionsGrid',
							'SmartApp.view.collections.CollectionwithButton',
							'SmartApp.view.reader.DynamicReader',
							'SmartApp.view.collections.CreateDataCollectionWindow',
							'SmartApp.view.collections.CreateDataCollectionType',
							'SmartApp.view.collections.FileUpload',
							'SmartApp.view.collections.DyanamicGridWithBackButton',
							'SmartApp.view.dataviews.DataViewwithButton'
							],
							autoCreateViewport : false,
							
							launch: function(){
										
										var key=	sessionStorage.getItem('sessionID');
										//session.getAttribute("loginId");
								//alert("key1:---"+key);
										//this.getSession("UserName");
										//key="admin"

										if (key== 'undefined' || key== 'null' || key== null || key.length <= 0){
										    // load login UI as user is not logged in
										    Ext.create('SmartApp.view.home.LoginHome');
										}
										else {
										    // load main UI as user is already logged in
										     Ext.create('SmartApp.view.home.Home');		
																			
										}
									}
									
	
// -------------------------------------------------------------------------
// Most customizations should be made to SmartApp.Application. If you need to
// customize this file, doing so below this section reduces the likelihood
// of merge conflicts when upgrading to new versions of Sencha Cmd.
// -------------------------------------------------------------------------
});
