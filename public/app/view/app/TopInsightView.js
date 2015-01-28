 Ext.define('SmartApp.view.app.TopInsightView', {
     extend : 'Ext.form.Panel',
     xtype: 'TopInsightView',
     itemId:'TopInsightView',

    width: '100%',
   autoScroll: true,
    height: window.innerHeight-100,
    overflowY:'auto',
     initComponent: function() {

            var insightname = sessionStorage.getItem('insightId');
            var app_name=sessionStorage.getItem('app_name');
            var out=sessionStorage.getItem('insightsArrJson');
            var data=Ext.JSON.decode(out);
            var dashboardModelStore = new Ext.data.Store({ 
                           fields : [{
                                        name: '_id',type:'string'
                                    },{
                                        name: 'name',type:'string'
                                    }],
                                 data:data                                
                            });

            Ext.apply(this, {
                         items: [ {
                                    margin:'0 0 0 7',
                                    html:'<h3> App Name : '+sessionStorage.getItem('app_name')+'</h3>'
                                }, {
                                 layout:'hbox',
                                 items:[{
                                    xtype:'button',
                                    text:'back',
                                    cls:'button-primary',
                                    margin:'10 10 0 7',
                                    listeners:{
                                                click:function()
                                                                {
                                                var appGridWithButton= new Ext.create('SmartApp.view.app.AppGridWithButton');      
                                                var vport=Ext.getCmp('contentRegionPanel');
                                                vport.removeAll(true, true);
                                                vport.add(appGridWithButton); 

                                            }

                                    }
                                     },{
                                            xtype: 'combo',
                                            itemId : 'dashnameId',
                                            margin:'10 10 10 10',
                                            width:'30%',
                                           // id:'inSightComboId',
                                           store: dashboardModelStore,
                                            displayField: 'name',
                                            valueField:'_id',
                                            name:'name',
                                            listeners: {
                                                  beforerender: function(combo, value) {                             
                                                       combo.setValue(sessionStorage.getItem('insightId'));

                                                  },
                                                select: function(combo, records, eOpts){
                                                // change: function(combo, value) {                       
                                                  var insightname1= Ext.ComponentQuery.query('#dashnameId')[0].getRawValue();
                                               
                                                   insightname=insightname1
                                                   sessionStorage.removeItem('insightId');
                                                   
                                                sessionStorage.setItem('insightId',insightname);
                                                 console.log('changed insightname:-'+sessionStorage.getItem('insightId'));

                                
                                               var topInsightView= new Ext.create('SmartApp.view.app.TopInsightView');      
                                                var vport=Ext.getCmp('contentRegionPanel');
                                                vport.removeAll(true, true);
                                                vport.add(topInsightView);                    

                                                    }

                                            }

                                    },{
                                        width:'20%',
                                        margin:'10 10 10 250',
                                        itemId:'htmlInsightName',
                                       html:'<h3>'+sessionStorage.getItem('insightId')+'</h3>' 
                                    },{
       
                                        xtype:'button',
                                        itemId:'modifyButtonId',
                                        
                                        cls:'button-primary',
                                        margin:'10 10 0 350',
                                        text:'Modify',  
                                        listeners:{         
                                            click: function(btn) {
                                                    sessionStorage.removeItem('activityType');
                                                    sessionStorage.setItem('activityType','modify');
                                                    var appGridWithButton= new Ext.create('SmartApp.view.app.CreateAppPage');      
                                                    var vport=Ext.getCmp('contentRegionPanel');
                                                    vport.removeAll(true, true);
                                                    vport.add(appGridWithButton); 

                                                         }
                                             }
                                     },{
       
                                        xtype:'button',
                                        itemId:'DeleteButtonId',
                                        
                                        cls:'button-primary',
                                        margin:'10 10 0 10',
                                        text:'Delete',  
                                        listeners:{         
                                            click: function(btn) {
                                           Ext.Ajax.request({
                                        
                                            url : 'http://localhost:3000/users/deleteApp?app_id='+sessionStorage.getItem('app_id'), 
                                            method: 'POST',
                                            success: function ( result, request) { 
                                                var appGridWithButton= new Ext.create('SmartApp.view.app.AppGridWithButton');      
                                                                                                var vport=Ext.getCmp('contentRegionPanel');
                                                                                                vport.removeAll(true, true);
                                                                                                vport.add(appGridWithButton); 


                                               

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
                                        },{   width: '100%',  
                                             overflowY:'auto',
                                                    itemId:'topinsightview',
                                                    xtype:'container'
                                            }
                                ]

                    });

       

this.callParent();
     },
    //column:2,
    
     onBoxReady:function(){
        console.log(this);

       
        //alert("box ready called");


         Ext.Ajax.request({                              
                url : 'http://localhost:3000/users/getDashboardByName?name='+sessionStorage.getItem('insightId'), 
                method: 'GET',
                success: function ( result, request) {                                  
                    console.log(result);                                                
                    response = result.responseText;
                    res = eval('(' + response + ')');

                    var dashboardconfig = Ext.decode(res[0].dashboardconfig);                 

                    var dashboardItems = dashboardconfig.partsObj;

                    var chartsArr = new Array();
                    for(key in dashboardItems){
                        var dataviewId = dashboardItems[key].viewTemplate.items[0].dataviewId;
                        var vxtype = dashboardItems[key].viewTemplate.items[0].xtype;
                        var dataviewname = key;

                        if(vxtype == 'verticalbarview') {
                            var VerticalBarView =new Ext.create('SmartApp.view.dashboard.VerticalBarView',{
                                dataviewId : dataviewId
                            });    

                            var verticalbarpanel = Ext.create('Ext.panel.Panel', {
                                title: key,
                                width: '100%',
                                height: 300,
                               // border:0,

                                items:[VerticalBarView]
                            });
                            chartsArr.push(verticalbarpanel); 

                        } else if(vxtype == 'linechartview') {
                            var lineChartView =new Ext.create('SmartApp.view.dashboard.LineChartView',{
                                dataviewId : dataviewId
                            });
                            var lineChartpanel = Ext.create('Ext.panel.Panel', {
                                title: key,
                                width: '100%',
                                height: 300,
                                items:[lineChartView]
                            });     
                            chartsArr.push(lineChartpanel);

                        }else if(vxtype == 'piechartview') {
                            var pieChartView =new Ext.create('SmartApp.view.dashboard.PieChartView',{
                                dataviewId : dataviewId
                            });  
                            var pieChartpanel = Ext.create('Ext.panel.Panel', {
                                title: key,
                                width: '100%',
                                height: 300,
                                items:[pieChartView]
                            }); 
                            chartsArr.push(pieChartpanel);  

                        } else if(vxtype == 'tabularview') {
                            var tabularview =new Ext.create('SmartApp.view.dashboard.TabularView',{
                                dataviewId : dataviewId
                            });  
                            var tabularpanel = Ext.create('Ext.panel.Panel', {
                                title: key,
                                 width: '100%',
                                height: 300,
                                items:[tabularview]
                            });
                            chartsArr.push(tabularpanel);   
                        }
                       
                    }

                    var vport =Ext.ComponentQuery.query('#topinsightview')[0];
                    vport.removeAll(true, true);
                    vport.add(chartsArr);


                },
                failure: function ( result, request) { 
                console.log('on failure:::');
                    Ext.MessageBox.alert('Failed', 'Request failed'); 
                } 
            }); 


            



    }

    
    
    
    
 });

 