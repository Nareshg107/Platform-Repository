Ext.define('SmartApp.view.app.TopInsightView', {
     extend : 'Ext.form.Panel',
     xtype: 'TopInsightView',

    width: '100%',
   autoScroll: true,
    height: window.innerHeight-100,
    overflowY:'auto',
   // id: 'Parent',
   /*layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'center'                    
    },*/
    
    items: [{   width: '100%',
     // height:'1000',
     overflowY:'auto',
            id:'topinsightview',
            xtype:'container'}],
     onBoxReady:function(){
        console.log(this);

        var insightname = sessionStorage.getItem('insightId');
        //alert("box ready called");


         Ext.Ajax.request({                              
                url : 'http://192.168.1.154:3000/users/getDashboardByName?name='+insightname, 
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

                    var vport = Ext.getCmp('topinsightview');
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

 