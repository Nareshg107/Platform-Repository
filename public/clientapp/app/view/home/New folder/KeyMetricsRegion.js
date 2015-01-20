var navigate = function(panel, direction) {
	var layout = panel.getLayout();
	layout[direction]();
	Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
	Ext.getCmp('move-next').setDisabled(!layout.getNext());
};
Ext
		.define(
				'SmartApp.view.home.KeyMetricsRegion',
				{
					extend : 'Ext.panel.Panel',
					requires : 'SmartApp.view.home.KeyMetricsRegionModel',
					xtype : 'keyMetricsRegionPanel',
					
					viewModel : {
						type : 'keyMetricsModel'
					},
					
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
							items : [ {
								itemId : 'move-prev',
								text : '&lt;',
								scale : 'small',
								handler : function(btn) {
									navigate(btn.up("panel"), "prev");
								},
								disabled : true
							}, {
								itemId : 'move-next',
								text : '&gt;',
								scale : 'small',
								handler : function(btn) {
									navigate(btn.up("panel"), "next");
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
									'</a>', '</div>', '</tpl>' ]
						} ]

					} ]

				});