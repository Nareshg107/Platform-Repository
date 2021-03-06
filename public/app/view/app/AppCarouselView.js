$(document).ready(function() {
        //move he last list item before the first item. The purpose of this is if the user clicks to slide left he will be able to see the last item.
        
        $('#InsightsCarouselContent .item:first').before($('#InsightsCarouselContent .item:last'));  
  })
Ext.define('SmartApp.view.app.AppCarouselView', {
     extend: 'Ext.view.View',
     xtype: 'AppCarouselView',
id:'InsightsCarouselContent',
    requires: ['Ext.data.Store',
			'SmartApp.model.AppModel'],
    tpl: [
         
        '<tpl for=".">',
            '<div class="item thumb-wrap">',
                '<div class="thumb" style="width:180px; height:180px;">',
                '<div ><span class="thumb-title-home-page tile-light-blue" ><span>{name}</span></span></div>',
                   
                        '<div class="thumb-description"><span class="thumb-description-name">{description}</span>  <span class="thumb-description-value"></span></div>',
                    
                '</div>',
            '</div>',
        '</tpl>'
    
     ],

    itemSelector: 'div.thumb-wrap',
    singleSelect: true,
    cls: 'x-image-view',
    
    initComponent: function() {

      //  var insightData=getAppInsights();

       /* this.store = Ext.create('Ext.data.Store', {
			storeId: 'insightDataStore',
           // autoLoad: true,
            data:insightData,
            model: 'SmartApp.model.AppModel',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            }
        }); */

       this.store = Ext.create('Ext.data.Store', {
           // type: 'products',   
            model:'SmartApp.model.AppModel',
            autoLoad: true, 
            proxy: {
                    type: 'ajax',
                    //url:'resources/data/grid/CollectionData.json',                
                    url: 'http://localhost:3000/users/appList',
                    reader: {
                        type: 'json'
                        //rootProperty:'data'                       
                        }
                    }                   
        }); 
        
        this.callParent();
    },
	listeners : {
        itemclick : function(s, record, item, index, e, Opts){
            console.log("Item Click "+record.data.selecteddashboards);
            var firstinsight = record.data.selecteddashboards.split(",")[0]; 
            var insightsArr = record.data.selecteddashboards.split(","); 
           // alert(insightsArr);
          //alert(insightsArr.length);
        var insightsArrJson ={
            fomatsarr: []
                        };
          for(var i in insightsArr) {

                                var item = insightsArr[i];
                               // alert('item'+item);
                                insightsArrJson.fomatsarr.push({ 
                                    "_id" : item,
                                    "name" :item,
                                   
                             });
                            }
var out = JSON.stringify(insightsArr.map(function (el) {
  return { name: el };
}));


           
          
            var app_id=record.data._id;
              var app_name=record.data.name;
              //alert('app_id:-'+app_id);
             // alert('app_name:-'+app_name);
            sessionStorage.removeItem('app_id');
            sessionStorage.setItem('app_id',app_id);

            sessionStorage.removeItem('app_name');
            sessionStorage.setItem('app_name',app_name);

            

            
            sessionStorage.removeItem('insightsArrJson');
            sessionStorage.setItem('insightsArrJson',out);

          
            sessionStorage.removeItem('insightId');
            sessionStorage.setItem('insightId',firstinsight);

            var topInsightView= new Ext.create('SmartApp.view.app.TopInsightView');      
            var vport=Ext.getCmp('contentRegionPanel');
            vport.removeAll(true, true);
            vport.add(topInsightView); 
                    
        }
    }

 });

