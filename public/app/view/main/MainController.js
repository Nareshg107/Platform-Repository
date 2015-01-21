/**
 * This class is the main view for the application. It is specified in app.js as
 * the "autoCreateViewport" property. That setting automatically applies the
 * "viewport" plugin to promote that instance of this class to the body element.
 * 
 * TODO - Replace this content of this view to suite the needs of your
 * application.
 */
Ext.define('SmartApp.view.main.MainController', {
	extend : 'Ext.app.ViewController',
	requires : [// 'Ext.MessageBox'//,'SmartApp.view.realtimepandl.FileUploadView'
	],
	alias : 'controller.main',
	 routes : {
            'home' : 'onHome'
        },
		  onHome : function() {
		  
		  this.redirectTo('home');
		  },
		  
		/*  //For App 
	menuItemClickINSIGHT: function (menuitem) {
	if(menuitem.text=='Market Movement') {
	
				var marketMovement = Ext.create('SmartApp.view.marketmvmnttabcontent.MarketMvmntContent', {
				});					
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(marketMovement);				
	 } 
	 else if(menuitem.text=='RealTime PnL') {
	var realtimePnLMain = Ext.create('SmartApp.view.realtimepandl.RealtimePnLMain', {
	});		
	
								
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(realtimePnLMain);				
	 } 
	 else if(menuitem.text=='Grid') {
	var gridView = Ext.create('SmartApp.view.realtimepandl.GridWithToolBarButton', {
	});		
	
								
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(gridView);				
	 } 
	  else if(menuitem.text=='File Upload') {
		var fileUploadView = Ext.create('SmartApp.view.realtimepandl.FileUploadView');		
	
								
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(fileUploadView);				
	 } 
   },
	
	//Buttons for page
	onClickButton:function(button)
	{
	if(button.text=='Upload Quotes')
	{
	var fileUploadView = Ext.create('SmartApp.view.realtimepandl.FileUploadView');		
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(fileUploadView);			
	
	} else if(button.text=='Charts')
	{
		var fileUploadView = Ext.create('SmartApp.view.realtimepandl.CurrentPnLMainChart');		
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(fileUploadView);	
	}
	else if(button.text=='Compute P&L')
	{
		var gridWithToolBarButton = Ext.create('SmartApp.view.realtimepandl.GridWithToolBarButton');		
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(gridWithToolBarButton);	
	}
	else if(button.text=='Home')
	{
		var wind=Ext.create('SmartApp.view.home.ContentRegion');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(wind.show());		
	}
	
	},
	//for toobar Menu
	menuItemClickINSIGHTs:function(button)
	{
	if(button.text=='Home')
	{
		var contentRegion=Ext.create('SmartApp.view.home.ContentRegion');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
	
	}else if(button.text=='Collections')
	{
	var contentRegion=Ext.create('SmartApp.view.collections.CollectionwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
	}
	
	



	},*/
	//for tab change

showCategoryApps: function() {
	
		var contentRegion=Ext.create('SmartApp.view.app.AppGridWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);
	},
	showCategoryInsights: function() {
		var contentRegion=Ext.create('SmartApp.view.dashboard.DashboardWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);
	},
	showCategoryDataView: function() {
		var contentRegion=Ext.create('SmartApp.view.dataviews.DataViewwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);
	},
	
	showCategoryCollections: function() {
		var contentRegion=Ext.create('SmartApp.view.collections.CollectionwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
	},
	showSetup: function() {
		var contentRegion=Ext.create('SmartApp.view.setup.UserSetupGridWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);
	}


//for tab change
/*	onTabChange: function(tabPanel, newItem, oldItem) {
        if(newItem.title=='Collections')
		{
		var contentRegion=Ext.create('SmartApp.view.collections.CollectionwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
		}else if(newItem.title=='Home')
		{
			var contentRegion=Ext.create('SmartApp.view.home.ContentRegion');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
		
		}else if(newItem.title=='Insights')
		{
		
			var contentRegion=Ext.create('SmartApp.view.dashboard.DashboardWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
		
		}else if(newItem.title=='Data Views')
		{
	
			var contentRegion=Ext.create('SmartApp.view.dataviews.DataViewwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
		
		}else if(newItem.title=='Setups')
		{
	
			var contentRegion=Ext.create('SmartApp.view.setup.UserSetupGridWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
		
		}else if(newItem.title=='App')
		{
	
			var contentRegion=Ext.create('SmartApp.view.app.AppGridWithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(contentRegion);	
		
		}
		


		
		
		
		
    }*/
	
});
