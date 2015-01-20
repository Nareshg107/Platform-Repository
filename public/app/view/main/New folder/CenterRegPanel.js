Ext
		.define(
				'SmartApp.view.main.CenterRegPanel',
				{
					extend : 'Ext.container.Container',
					layout : 'container',
					xtype : 'CenterRegPanel',
					viewModel : {
						type : 'main'
					},
					items : [ {

						region : 'center',
						items : [ {
							region : 'center',

							items : [
									{
										region : 'north',
										activeTab : 1,
										xtype : 'tabpanel',

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
													}, {
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
											margin : 20
										},
										height : 300,
										items : [
												{

													xtype : 'panel',
													title : "Your Position",
													frame : true,
													width : '70%',
													height : 300
												},
												{
													xtype : 'panel',
													layout : 'card',
													title : "Card",
													width : '30%',
													border : true,
													height : 300,
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
																html : '<h2>Welcome to the Demo Wizard!</h2><p>Step 1 of 3</p><p>Please click the "Next" button to continue...</p>'
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

					} ]

				})