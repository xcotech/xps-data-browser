// ActivityView
    define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'highcharts',
    'highcharts-more',

],
function(
    $,
    Backbone,
    _,
    app,
    Highcharts,
    highchartsMore
) {
    'use strict';
    var ActivityView = Backbone.View.extend({
        events: function() {
            var _extended = {
                'mouseover .strideItem': 'toggleStrideBand',
                'mouseover .splitItem': 'toggleSplitBand'
            };
            if (app.hasTouch) {
                _extended = _.extend(_extended, {
                    'touchstart .seriesSelect': 'toggleSeries',
                    'touchstart .strideItem': 'toggleStrideBand'
                });
            } else {
                _extended = _.extend(_extended, {
                    'click .seriesSelect': 'toggleSeries',
                    'click .navTab': 'changeNavTab'
                    // 'click .strideItem': 'toggleStrideBand'
                });
            }
            return _.extend(_extended, _.result(Backbone.View.prototype, 'events'));
        },   
        
        initialize: function(options) {  
            var self = this;
            highchartsMore(Highcharts);
            
            this.model = options.model; 
            this.dataModel = options.dataModel; // this will always be a first class Model

            this.viewTmpl = app.templateLoader.getTemplate('activity-detail', ['session-subnav']);
            this.viewname = 'ActivityView';
          
            var $el = $('#activity');

            if($el.length) {
                this.setElement($el);
                this.afterRender();
            } else {
                this.needForceRender = true;
                // this.render();
            }

        },

        render: function() {
            var self = this;
            var $el;
            var $html;
            var context = this.model.toJSON();

            // self.feed = context.feed;
            this.viewTmpl.done(function(tmpl) {
                $html = $(tmpl(context));
                // self.$el.html($html);
                if($html.length > 1) {
                    $el = $('<div/>').append($html);
                } else {
                    $el = $html.eq(0);
                }
                if(self.$el.is(':empty')) {
                    //first time render
                    self.setElement($el);
                } else {
                    self.$el.html($html.html());
                }
                self.trigger('renderComplete', self.$el);     

            });
        },

        afterRender: function() {
            var self = this;
            this.setupDataPlot(); // instantiate empty chart
            this.dataModel.fetch().done(function() {

                // set the typeDefinition (from activityModel)
                // ... and set up the series
                self.dataModel.set('typeDefinition', self.model.get('type_definition')).buildSeries();

                // render the plot navigation panes
                self.setupPlotNav();

                _.each(self.dataModel.get('selectedSeries')[self.dataModel.get('typeDefinition').activity_type], function(series) {
                    let dataSeries = self.dataModel.getSeries(series);
                    if (dataSeries) {
                        self.chart.addSeries(_.extend({id: series, name: series, data: dataSeries}, self.getSeriesOptions(series)));
                    }
                });

                // self.setupSplitsTable();
                // self.setupStridesTable();                
            });

        },

        setupDataPlot: function() {
            var container = document.getElementById('plotContainer');
            this.chart = Highcharts.chart('plotContainer', {

                chart: {
                    height: 600,
                    backgroundColor: '#ffffff'
                },

                tooltip: {
                    crosshairs: {
                        color: 'green',
                        dashStyle: 'solid'
                    },
                    shared: true
                },
                credits: {
                    enabled: false
                },

                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },
               
                legend: {
                    enabled: false,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    arearange: {
                        // shared options for all arearange series
                        color: '#cccccc',
                        fillOpacity: 0.3                        
                    },                    
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        // pointStart: ests[0].time
                    }
                },

                xAxis: {
                    plotBands: [],
                },  

                yAxis: [
                    { title: { text: 'Velocity' }, visible: false },
                    { title: { text: 'Acc' }, visible: false },
                ],
                series: [],

                responsive: {
                    rules: [{
                        condition: {
                            // maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });

        },

        getSeriesOptions: function(seriesName) {
            seriesName = seriesName || null;
            if (!seriesName) {
                return seriesOptions;
            } return seriesOptions[seriesName];
        },

        _clearPlotBands: function() {
            var self = this;
            _.each(this.chart.xAxis[0].plotLinesAndBands, function(item) {
                if (item.id) {
                    self.chart.xAxis[0].removePlotBand(item.id);        
                }
            });           
        },

        changeNavTab: function(e) {
            var self = this;
            let $currentTarget = $(e.currentTarget);
            let target = $currentTarget.data('id');
            this._clearPlotBands(); // clean the slate 
            $currentTarget.addClass('active').siblings().removeClass('active');
            let $targetPane = this.$('#' + target);
            $targetPane.addClass('active').siblings().removeClass('active');
        },

        toggleSplitBand: function(e) {
            var self = this;
            let $currentTarget = $(e.currentTarget);
            let index = $currentTarget.data('index');

            let splits = this.dataModel.get('splits')
            let split = splits[index]

            // get all other splits
            let otherSplits = this.chart.xAxis[0].plotLinesAndBands.filter(obj => { return obj.id !== 'split-' + index })

            // set highlight on list item
            $currentTarget.addClass('selected').siblings().removeClass('selected');
            if (otherSplits) {
                _.each(otherSplits, function(otherSplit) {
                    self.chart.xAxis[0].removePlotBand(otherSplit.id);
                });
            }
            this.chart.xAxis[0].addPlotBand({ id: 'split-' + index, color: '#f7f7f7', from: split.time * 1000, to: (split.time + split.duration) * 1000 });

        },

        toggleStrideBand: function(e) {
            var self = this;
            let $currentTarget = $(e.currentTarget);
            let index = $currentTarget.data('index');

            let strides = this.dataModel.get('strides')
            let stride = strides[index]

            // get all other strides
            let otherStrides = this.chart.xAxis[0].plotLinesAndBands.filter(obj => { return obj.id !== 'stride-' + index })

            // set highlight on list item
            $currentTarget.addClass('selected').siblings().removeClass('selected');
            if (otherStrides) {
                _.each(otherStrides, function(otherStride) {
                    self.chart.xAxis[0].removePlotBand(otherStride.id);
                });
            }
            this.chart.xAxis[0].addPlotBand({ id: 'stride-' + index, color: '#f7f7f7', from: stride.time * 1000, to: (stride.time + stride.total_time) * 1000 });

        },

        toggleSeries: function(e) {
            let $currentTarget = $(e.currentTarget);
            let series = $currentTarget.data('series');
            
            let toggleOn = this.dataModel.toggleSeries(series);
            console.log(series)
            
            if (toggleOn) {
                let dataSeries = this.dataModel.getSeries(series);
                if (dataSeries) {
                    $currentTarget.addClass('selected');
                    this.chart.addSeries(_.extend({id: series, name: series, data: dataSeries}, this.getSeriesOptions(series)));
                } 

            } else { 
                $currentTarget.removeClass('selected');
                this.chart.get(series).remove()
                // this.chart.series[0].remove()

            }
        },

        toggleSeriesSelector: function(e) {
            var self = this;
            let $currentTarget = $(e.currentTarget);
            let $selectorContainer = this.$('.selectorContainer');

            if ($selectorContainer.text()) {
                $selectorContainer.velocity('stop', true).velocity('transition.slideDownOut', 120);
                $selectorContainer.html('');
                $currentTarget.addClass('open').text('Series');
            } else {        
                app.templateLoader.getTemplate('activity-series-selector').done(function(tmpl) {
                    let context = {series: self.dataModel.get('selectedSeries')[self.dataModel.get('typeDefinition').activity_type]};
                    let $selector = $(tmpl(context));
                    $selectorContainer.html($selector);
                    $selectorContainer.velocity('stop', true).velocity("transition.slideUpIn", 320);
                    $currentTarget.addClass('open').text('Done');
                });
            }
        },

        setupPlotNav: function() {
            let strides = this.dataModel.get('strides');
            let splits = this.dataModel.get('splits');

            let $renderEl = this.$('.plotNav');
            app.templateLoader.getTemplate('plot-nav').done(function(tmpl) {            
                 var $html = $(tmpl({strides: strides, splits: splits}));
                 $renderEl.html($html.html());
             });
        },

        actDownload: function(e) {
            if (!this.model.id) {
                return;
            }
            var downloadUrl = app.getUrl('ea_to_csv/' + this.model.id);
            var $btn = $(e.currentTarget);

            $btn.dynamicButton({immediateEnable: true});
            $.ajax({
                url: downloadUrl,
                type: 'GET',
                data: {},

                // var csv = JSON.parse(json.replace(/"([\w]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); }));

                //         downloadFile('download.csv', encodeURIComponent(csv));


                success: function (data) {
                    var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(data);
                    downloadFile('download.csv', encodeURIComponent(csvData));
                    // $("#exportsags").attr({
                    //     "href": csvData,
                    //     "download": "sag_data.csv"
                    // });
                },
                always: function() {
                    $btn && $btn.dynamicButton('revert');
                }
            });            
        },

        clearViews: function(views) {
            views = views || [''];
            for(var view, i = 0, l = views.length ; i < l ; i += 1) {
                view = views[i];
                if(this[view]) {
                    this.stopListening(this[view]);
                    this[view].destroy();
                    this[view] = null;
                }
            }
        },        

        destroy: function() {
            console.log('destroying activityview')
            this.chart && this.chart.destroy();
            this.model.clear();
            this.dataModel.clear();
            Backbone.View.prototype.destroy.apply(this, arguments);            
        }

    });

    var seriesOptions = {
        'velocityMPS': {
            type: 'spline',
            // color: '#eeeeee',
            name: 'Velocity',
            yAxis: 0,
            tooltip: {
                formatter: function() {
                    return this.toFixed(3);
                }
            }
        },
        'velMPS.x': {
            type: 'spline',
            // color: '#eeeeee',
            yAxis: 0,
            tooltip: {
                formatter: function() {
                    return this.toFixed(3);
                }
            }
        },        
        'accBodyMPS2.z': {
            type: 'spline',
            name: 'Ground accel',
            // color: '#d63020',
            lineWidth: 0.75,
            yAxis: 1,
            tooltip: {
                formatter: function() {
                    return this.toFixed(3);
                }
            }
        },
        'stridesContact': {
            type: 'scatter',
            name: 'Contact',
            // data: dataStrides,
            yAxis: 1
        },        
    };

    return ActivityView;
});