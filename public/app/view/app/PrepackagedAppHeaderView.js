$('#PrepackagedAppContent div:first').before($('#PrepackagedAppContent div:last')); 
Ext.define('SmartApp.view.app.PrepackagedAppHeaderView', {
     extend : 'Ext.Panel',
     xtype: 'PrepackagedAppHeaderView',
     requires: [
        'SmartApp.view.app.PrepackagedAppView'
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
              //  xtype: 'button',
                itemId: 'slideLeft',
                width: 40,
                dock: 'left'
            }],
          //  renderTo: Ext.getBody(),
            items: [{ width: '100%',xtype: 'PrepackagedAppView'}]    
    
    
 });

 