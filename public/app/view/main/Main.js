
var navigate = function(panel, direction) {
	// This routine could contain business logic required to manage the
	// navigation steps.
	// It would call setActiveItem as needed, manage navigation button state,
	// handle any
	// branching logic that might be required, handle alternate actions like
	// cancellation
	// or finalization, etc. A complete wizard implementation could get pretty
	// sophisticated depending on the complexity required, and should probably
	// be
	// done as a subclass of CardLayout in a real-world implementation.
	var layout = panel.getLayout();
	layout[direction]();
	Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
	Ext.getCmp('move-next').setDisabled(!layout.getNext());
};

Ext
		.define(
				'SmartApp.view.main.Main',
				{
					extend : 'Ext.container.Viewport',
					requires : [ 'SmartApp.view.main.MainController',
							'SmartApp.view.main.MainModel',
							'SmartApp.view.main.Test',
							'SmartApp.view.main.CenterRegPanel',
							'SmartApp.view.main.PageToolBarMenu'
					],
					xtype : 'app-main',
					controller : 'main',
					id : 'viewportId',
					viewModel : {
						type : 'main'
					},
					layout : 'border',
					items : [
							{
								region : 'north',
								xtype : 'header',
								padding : 10,
								height : 60,
								html : '<a href="#"><img alt="mysite" src="resources/images/Eka-logo-med-rgb.jpg" class="logo" height="40" width="80"></a><h1 style="color:white;display:inline;margin-left:15px; align:center;">InSight CM - SMART</h1>',
								// layout:'vbox',
								items : [ {
									xtype : 'toolbar',
									items : [ {
										xtype : 'button',
										text : 'Aravind',
										menu : [ {
											text : 'Change Password'
										}, {
											text : 'Logout'
										} ]
									} ]
								} ]
							},
							{

								region : 'west',
								title : 'Application Menu',
								// html: '<ul><li>This area is used for
								// nevigation...</li></ul>',
								width : 250,
								split : true,
								collapsible : true,
								titleCollapse : true,
								split : true,
								items : [ {
									xtype : 'button',
									text : 'Home',
									width : '100%',
									// enableToggle: true,
									height : '7%',
									handler : 'menuItemClickINSIGHTS'

								}, {
									xtype : 'button',
									text : 'button',
									// enableToggle: true,
									width : '100%',
									height : '7%',
									handler : 'menuItemClickINSIGHTS'

								}

								]

							},
							{
								region : 'center',

								items : [
										{
											region : 'north',
											activeTab : 1,
											tabBar : {
												items : [
														{
															xtype : 'button',
															text : 'HOME',
															handler : 'onClickHome',
															html : 'U are on Home Page'
														},
														{
															xtype : 'button',
															text : 'INSIGHT',
															menu : {
																cls : 'main-sub-menu',
																items : [
																		{
																			text : 'Management Movement',
																			handler : 'onClickHome'
																		},
																		{
																			text : 'RealTime P&L'
																		} ]
															}
														},
														{
															xtype : 'button',
															text : 'MARKET SENTIMENT'
														},
														{
															xtype : 'button',
															text : 'KEY MATRICS'
														}, {
															xtype : 'button',
															text : 'CUBE'
														} ]
											}

										},

										{
											region : 'center',
											// frame:true,
											xtype : 'panel',
											layout : {
												type : 'hbox',
												align : 'stretch',
												margin : 20
											},
											height : 400,
											items : [
													{
														xtype : 'panel',
														title : "Your Position",
														frame : true,
														height : 400,
														width : '80%',
														loader : {
															autoLoad : true,
															scripts : true,
															ajaxOptions : {
																method : 'GET'
															},
															renderer : function(
																	loader,
																	response,
																	active) {
																loader
																		.getTarget()
																		.update(
																				response.responseText,
																				active.scripts === true);
																return true;
															},
															manageHeight : true,
															manageWidth : true,
															autoHeight : true,
															autoWidth : true,
															url : pnlChartLocation
														}
													},

													{
														xtype : 'panel',
														layout : 'card',
														title : "Card",
														width : '20%',
														border : true,
														height : 400,
														bodyPadding : 15,
														frame : true,
														defaults : {
															border : false
														},
														tools : [ {
															xtype : 'segmentedbutton',// MYCOM
																						// :
																						// SegmentedButton
																						// is a
																						// container
																						// for
																						// a
																						// group
																						// of
																						// {@link
																						// Ext.Button}s
																						// and
																						// used
																						// to
																						// switch
																						// between
																						// views
															cls : 'eka-smart-split-btn',
															items : [
																	{
																		itemId : 'move-prev',
																		text : '&lt;',
																		scale : 'small',
																		handler : function(
																				btn) {
																			navigate(
																					btn
																							.up("panel"),
																					"prev");
																		},// MYCOM
																			// :showing
																			// card
																			// view
																		disabled : true
																	},
																	{
																		itemId : 'move-next',
																		text : '&gt;',
																		scale : 'small',
																		handler : function(
																				btn) {
																			navigate(
																					btn
																							.up("panel"),
																					"next");
																		}
																	}

															]
														} ],

														items : [
																{
																	id : 'card-0',
																	frame : true,
																	layout : {
																		type : 'vbox',
																		align : 'stretch'
																	},

																	overflowY : 'auto'
																},

																{
																	id : 'card-1',
																	html : '<p>Step 2 of 3</p><p>Almost there.  Please click the "Next" button to continue...</p>'
																},
																{
																	id : 'card-2',
																	html : '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
																} ]
													} ]
										},
										{
											region : 'center',
											items : [ {
												region : 'north',
												title : 'Key Metrics',
												layout : {
													xtype : 'panel',
													type : 'vbox',
													align : 'fit'
												},
												tools : [ {
													xtype : 'segmentedbutton',
													cls : 'eka-smart-split-btn',
													items : [
															{
																itemId : 'move-prev',
																text : '&lt;',
																scale : 'small',
																handler : function(
																		btn) {
																	navigate(
																			btn
																					.up("panel"),
																			"prev");
																},
																disabled : true
															},
															{
																itemId : 'move-next',
																text : '&gt;',
																scale : 'small',
																handler : function(
																		btn) {
																	navigate(
																			btn
																					.up("panel"),
																			"next");
																}
															} ]
												} ],

												items : [ {
													xtype : 'dataview',
													cls : 'quarterly-dataview',
													bind : '{statements}',
													itemSelector : 'div.thumb-wrap',
													listeners : {
														itemclick : 'onQuarterlyStatementClick'
													},
													tpl : [
															'<tpl for=".">',
															'<tpl if="xindex % 4 === 1">',
															'</tpl>',
															'<div class="thumb-wrap">',
															'<a class="thumb" href="{url}" target="_blank">',
															'<div class="{iconClass}"></div>',
															'<div class="thumb-title-container">',
															'<div class="thumb-title">{title}</div>',
															'<div class="thumb-title-small">Uploaded: {uploaded}</div>',
															'</div>',
															'<div class="thumb-favourite"></div>',
															'<div class="{marketPosition}"></div>',
															'</a>', '</div>',
															'</tpl>' ]
												} ]

											} ]
										} ]

							} // center close

					]

				});
