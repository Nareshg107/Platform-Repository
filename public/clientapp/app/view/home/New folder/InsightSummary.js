Ext.define('SmartApp.view.home.InsightSummary',
				{
					extend : 'Ext.panel.Panel',
					requires : [ 'Ext.layout.container.Card',
							'SmartApp.view.home.InsightChart' ],
					xtype : 'insightSummary',
					itemId : 'insightSummary',
					layout : 'card',
					title : "Insights",
					height : 400,
					bodyPadding : 15,
					frame : true,
					defaults : {
						border : false
					},
					margin : '0 0 0 0px',
					layout : {
						type : 'card'
					},

					defaultListenerScope : true,
					tools : [ {
						xtype : 'segmentedbutton',
						cls : 'eka-smart-split-btn',
						items : [ {
							itemId : 'card-prev',
							text : '&lt;',
							scale : 'small',
							handler : 'showPrevious',
							disabled : true
						}, {
							itemId : 'card-next',
							text : '&gt;',
							scale : 'small',
							handler : 'showNext'
						} ]
					} ],

					items : [
							{
								id : 'card-0',
								frame : true,
								layout : {
									type : 'vbox',
									align : 'stretch'
								},
								overflowY : 'auto',
								items : [ {
									xtype : 'insightChart'
								}, {
									xtype : 'insightChart'
								}, {
									xtype : 'insightChart'
								} ]
							},
							{
								id : 'card-1',
								html : '<p>Step 2 of 3</p><p>Almost there.  Please click the "Next" button to continue...</p>'
							},
							{
								id : 'card-2',
								html : '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
							} ],

					showNext : function() {
						this.doCardNavigation(1);
					},

					showPrevious : function(btn) {
						this.doCardNavigation(-1);
					},

					doCardNavigation : function(incr) {
						var me = this;
						var l = me.getLayout();
						var i = l.activeItem.id.split('card-')[1];
						var next = parseInt(i, 10) + incr;
						l.setActiveItem(next);
						me.down('#card-prev').setDisabled(next === 0);
						me.down('#card-next').setDisabled(next === 2);
					}

				});