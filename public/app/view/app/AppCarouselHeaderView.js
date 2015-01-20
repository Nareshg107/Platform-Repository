$('#InsightsCarouselContent div:first').before($('#InsightsCarouselContent div:last')); 
Ext.define('SmartApp.view.app.AppCarouselHeaderView', {
     extend : 'Ext.Panel',
     xtype: 'AppCarouselHeaderView',
     requires: [
        'SmartApp.view.app.AppCarouselView'
    ],
            height: 180,
            width: '100%',
            //padding:'10px 0',
            autoScroll: true,
            overflowX:'hidden',
            id: 'Parent',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'                    
            },
            dockedItems: [{
                xtype: 'button',
                itemId: 'slideLeft',
                width: 40,
                dock: 'left',
                cls: 'carousel-slide-left',
                
           
                listeners: {
                    click: {
                        fn: function () {                           
                           // Ext.getCmp('InsightsCarouselContent').scrollBy(-500, 0, true);
                            //var cmp = Ext.getCmp("InsightsCarouselContent");
                            //var pos = cmp.getPosition();
                            //cmp.setPosition(pos[0]+255,0,true);
                            //$('#InsightsCarouselContent').animate({left: '+='+300}, 500);
                             var item_width = $('#InsightsCarouselContent div').outerWidth() + 10;
                            var left_indent = parseInt($('#InsightsCarouselContent').css('left')) + item_width;                         
                            $('#InsightsCarouselContent:not(:animated)').animate({'left' : left_indent},500,function(){ 
                            $('#InsightsCarouselContent .item:first').before($('#InsightsCarouselContent .item:last')); 
                            $('#InsightsCarouselContent').css({'left' : '-50px'});
                            });
                        }
                    }
                }
            },
            {
                xtype: 'button',
                itemId: 'slideRight',
                width: 40,
                dock: 'right',
                cls: 'carousel-slide-right',
                listeners: {
                    click: {
                        fn: function () {
                            console.log('right')
                            //Ext.getCmp('InsightsCarouselContent').scrollBy(500, 0, true);
                            //var cmp = Ext.getCmp("InsightsCarouselContent");
//                              var pos = cmp.getPosition();
//                              cmp.setPosition(pos[0]-250,0,true);
                            var item_width = $('#InsightsCarouselContent div').outerWidth() + 10;
                            var left_indent = parseInt($('#InsightsCarouselContent').css('left')) - item_width;
                            $('#InsightsCarouselContent:not(:animated)').animate({'left' : left_indent},500,function(){ 
                                $('#InsightsCarouselContent .item:last').after($('#InsightsCarouselContent .item:first')); 
                                $('#InsightsCarouselContent').css({'left' : '-50px'});
                            });
                        }
                    }
                }
            }],
          //  renderTo: Ext.getBody(),
            items: [{ width: '100%',xtype: 'AppCarouselView'}]
    
    
    
    
    
 });

 