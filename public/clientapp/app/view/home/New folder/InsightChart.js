Ext
		.define(
				'SmartApp.view.home.InsightChart',
				{
					extend : 'Ext.panel.Panel',
					requires : [ 'Ext.chart.PolarChart', 'Ext.draw.Color',
							'Ext.draw.sprite.Rect', 'Ext.chart.axis.Numeric',
							'Ext.chart.axis.Category', 'Ext.chart.series.Area',
							'Ext.chart.series.Pie',
							'Ext.chart.interactions.PanZoom',
							'Ext.chart.interactions.Rotate',
							'Ext.layout.container.Card' ],
					xtype:'insightChart',
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					items : [
							{
								xtype : 'polar',
								animation : true,
								padding : '0 0 0 0',
								height : 100,
								width : '40%',
								donut : true,
								interactions : [ 'rotate' ],
								colors : [ '#FA6B5A', '#D5D9DD' ],
								store : {
									fields : [ 'name', 'data1' ],
									data : [ {
										name : 'metric one',
										data1 : 12
									}, {
										name : 'metric two',
										data1 : 88
									} ]
								},

								sprites : [ {
									type : 'text',
									x : 15,
									y : 55,
									text : '12%',
									font : '25px 100 Proxima Nova, Helvetica Neue, Helvetica, Arial, sans-serif',
									fillStyle : '#69708a'
								} ],

								series : [ {
									type : 'pie',
									xField : 'data1',
									colors : [ '#FA6B5A', '#D5D9DD' ],
									donut : 88
								} ]
							},
							{
								xtype : 'button',
								cls : 'long-text-buttons',
								width : '200px',
								height : 50,
								html : '12% difference<br>between AECO and<br>Henry Hub Index'

							} ]

				});