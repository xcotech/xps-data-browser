// ActivityRecordView
    define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'views/PagerView',
    'highcharts'

],
function(
    $,
    Backbone,
    _,
    app,
    PagerView,
    Highcharts
) {
    'use strict';
    var ActivityRecordView = Backbone.View.extend({
        events: function() {
            var _extended = {
            };
            if (app.hasTouch) {
                _extended = _.extend(_extended, {
                });
            } else {
                _extended = _.extend(_extended, {
                });
            }
            return _.extend(_extended, _.result(Backbone.View.prototype, 'events'));
        },   
        
        initialize: function(model) {  
            var self = this;

            this.model = model || null; 
            this.viewTmpl = app.templateLoader.getTemplate('activity-record-detail');
            this.viewname = 'ActivityRecordView';
          
            var $el = $('#activity-record');

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
            console.log('ActivityRecordView.afterRender()');
            this.setupDataPlot();
        },

        setupDataPlot: function() {

            // velMPS
            //     "t": "1970-01-01T00:10:08.044Z",
            //     "name": "EstGM-FT",
            //     "posM": {
            //         "x": 0.023085,
            //         "y": 7.759471,
            //         "z": 1.188377
            //     },
            //     "time": 607044,
            //     "tagId": 10,
            //     "tempC": 0,
            //     "velMPS": {
            //         "x": -0.024811,
            //         "y": 0.08111,
            //         "z": 0.093901
            //     },
            //     "accMPS2": {
            //         "x": -0.054093,
            //         "y": 0.295756,
            //         "z": 0.063597
            //     },
            //     "kfState": 2,
            //     "posDevM": {
            //         "x": 0,
            //         "y": 0,
            //         "z": 0
            //     },
            //     "accBodyMPS2": {
            //         "x": 1.451382,
            //         "y": -2.236948,
            //         "z": 9.462722
            //     },
            //     "gyroBodyDegPS": {
            //         "x": -9.140015,
            //         "y": -3.77655,
            //         "z": 6.42395
            //     },
            //     "heartRatePerMin": 0

            let recordMeta = this.model.get('meta');
            let dataTime = [];
            let dataSpeed = [];
            let distanceFromStart = [];
            let accZ = [];
            let distance = [];
            let startPos = recordMeta.startPosAndTime;
            let stridesTime = [];
            let dataStrides = [];

            _.each(this.model.get('data').data, function(item) {
                dataTime.push(item.time);
                let velocity = item.velMPS;
                dataSpeed.push(Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2) + Math.pow(velocity.z, 2)));
                let dist = Math.sqrt(Math.pow((item.posM.x - startPos.x), 2) + Math.pow((item.posM.y - startPos.y), 2)); 
                if (dist > 0) {
                    distanceFromStart.push(dist);
                }
                accZ.push(item.accBodyMPS2.z);
                distance.push(item.posM.y)
            });

            _.each(this.model.get('meta').stride_data_metres, function(item) {
                stridesTime.push(item.time * 1000);
                dataStrides.push(item.contactTime);
            });            

            var tester = document.getElementById('plotContainer');

            Highcharts.plot( tester, [


                {
                    type: 'line',
                    x: [recordMeta.start*1000, recordMeta.start*1000],
                    y: [0,10],
                    yref: 'paper',
                    text: 'Start',
                    line: {
                      color: 'red',
                      width: 1.5,
                      dash: 'dot'
                    }
                },
                {
                    type: 'line',
                    x: [recordMeta.end*1000, recordMeta.end*1000],
                    y: [0,10],
                    yref: 'paper',
                    text: 'End',
                    line: {
                        text: 'asdfasdf',
                        color: 'red',
                        width: 1.5,
                        dash: 'dot'
                    }
                  },              
                {
                    x: stridesTime,
                    y: dataStrides,
                    type: 'scatter',
                    mode: 'markers',
                    line: {
                        color: 'blue',
                        width: 12
                    }
                },                
                {
                    name: 'Distance',
                    x: dataTime,
                    y: distance,
                    line: {shape: 'spline',
                        smoothing: 1.3,
                        color: '#999',
                        width: 1,
                        dash: 'dot'
                    }
                },
                {
                    name: 'Accelerometer (Z)',
                    x: dataTime,
                    y: accZ,
                    line: {shape: 'spline',
                        smoothing: 1.3,
                        color: '#ccc',
                        width: 1
                    }
                },
                {
                name: 'Speed',
                x: dataTime,
                y: dataSpeed,
                line: {shape: 'spline',
                    smoothing: 1.3,
                    color: '#0ca3d4',
                    width: 1
                }
                }], 
                { 
                    hoverinfo: 'none',
                    showlegend: true,  
                    y: {}, xaxis: {
                        ticks: '',
                        showticklabels: false,
                        title: {
                            text: 'time'
                        }
                    },
                    margin: { t: 0 } }, 
                    );

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
            Backbone.View.prototype.destroy.apply(this, arguments);            
        }

    });
    return ActivityRecordView;
});