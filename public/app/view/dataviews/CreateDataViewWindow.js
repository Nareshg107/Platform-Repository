Ext.define('SmartApp.view.dataviews.CreateDataViewWindow', {
    extend: 'Ext.window.Window',
   // xtype: 'basic-window',  
    height: 220,
    width: 400, 
    autoScroll: true,
    bodyPadding: 10, 
    bodyStyle:'background-color:#F7F9F8;',
    constrain: true,
    closable: true,
    closeAction: 'hide',
	id:'MyWinId1',
	shadow: false,
	title: '<div id="titlebar" align="left">Save Data View</div>',
	cls:'winHeaderClass',
	
	items:[
	{
	xtype: 'form',

	bodyStyle:'background-color:#F7F9F8;',

	items:[	
	{
        xtype: 'textfield',
        name: 'dataviewName',
        fieldStyle:'background-color:#FFFFFF;',
        fieldLabel: 'Name',
		msgTarget: 'side', // location of the error message
        invalidText: 'This field is required', // custom error message text      
        allowBlank: false,  // requires a non-empty value
        value: sessionStorage.getItem('dataviewName')
    },
	{
        xtype: 'textarea',
		allowBlank: true,
        name: 'dataviewDesc',
        fieldStyle:'background-color:#FFFFFF;',
        fieldLabel: 'Description'
      //  allowBlank: false  // requires a non-empty value
    }

	]
	}],
	listeners:{
		close:function(){

		
		var collectionsGrid= new Ext.create('SmartApp.view.dataviews.DataViewwithButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(collectionsGrid);	
		
		}
	},
	buttons: [	
		
		{
			margin:'10 10 0 5',
			xtype:'button',
			cls:'button-primary',
			text: 'Previous',
			handler:function(btn)
		{
		
		var createDataConnectionView= new Ext.create('SmartApp.view.collections.DyanamicGridWithBackButton');		
							var vport=Ext.getCmp('contentRegionPanel');
							vport.removeAll(true, true);
							vport.add(createDataConnectionView);	
		}
}	,
	
	{
		margin:'10 10 0 200',
		xtype:'button',
	    cls:'button-primary',
        text: 'Submit',
			
			handler:function(btn)
			{					
				var win = btn.up('window'),
				form = win.down('form');		
					
				    var dataviewName=form.getForm().findField('dataviewName').getSubmitValue();					
				    var dataviewDesc=form.getForm().findField('dataviewDesc').getSubmitValue();
						
						sessionStorage.removeItem("dataviewName");
						sessionStorage.setItem('dataviewName',dataviewName);

						sessionStorage.removeItem("dataviewDesc");
						sessionStorage.setItem('dataviewDesc',dataviewDesc);


					var collectionId = sessionStorage.getItem('selectedCollId');
					var dimensionValue = sessionStorage.getItem('dimensionValue');
					var activity_type=sessionStorage.getItem("activity_type");
					var dataview_id=sessionStorage.getItem('dataviewId')
					var measureValue = sessionStorage.getItem('measureValue');
					var aggregationValue = sessionStorage.getItem('aggregationValue');
					var visualizationValue = sessionStorage.getItem('visualizationValue');	
					var filterby = sessionStorage.getItem('filterby');	

					//	alert(filterby+measureValue+dimensionValue+visualizationValue);
					if(measureValue == null)
						measureValue = '';
					if(aggregationValue == null)
						aggregationValue = '';
					if(dimensionValue == null)
						dimensionValue = '';
					if(visualizationValue == null)
						visualizationValue = '';



				//	alert(activity_type);
					var params = '?dimension='+dimensionValue+'&measure='+measureValue+'&aggType='+aggregationValue+'&chartType='+visualizationValue+'&filterby='+filterby+'&collId='+collectionId+
					'&dataViewName='+dataviewName+'&dataViewDesc='+dataviewDesc+'&activity_type='+activity_type+'&dataview_id='+dataview_id;
		
					if(form.isValid()){
					
							Ext.Ajax.request(
								{
								url : 'http://192.168.1.154:3000/users/saveDataViews'+params, 
								method: 'POST',
								success: function ( result, request) { 
								console.log('on success:::');		

									Ext.getCmp('tabpanelXtype').setActiveItem(3);								
									var databuttonView= new Ext.create('SmartApp.view.dataviews.DataViewwithButton');		
									var vport=Ext.getCmp('contentRegionPanel');
									vport.removeAll(true, true);
									vport.add(databuttonView);										
									
								},
								failure: function ( result, request) { 
								console.log('on failure:::');
								Ext.MessageBox.alert('Failed', 'Request failed'); 
								} 
							});
					}
					
					
				
			}
        }

		
		]
});