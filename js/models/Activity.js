// Activity
define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/PagingCollection',
], function(
    $,
    _,
    Backbone,
    app,
    PagingCollection
) {
    'use strict';

    var ActivityModel = Backbone.Model.extend({

        urlRoot: '',
        defaults: {
            needsFetch: true,
            session: null,
            data: null // this will be a read-only instance of ActivityDataModel
        },

        url: function() {   
            this.urlRoot = app.getApiUrl('activity');
            if (this.id) {
                return this.urlRoot + this.id + '/';
            } else {
                return this.urlRoot;
            }
        },

          parse: function(attr) {
            // update user object with (always stored) orgMember object

            if (Number.isInteger(attr.user)) {
                let usersFound = app.orgMemberCollection.find(function(model) { return model.get('user').id === attr.user; })
                if (usersFound) {
                    attr.user = usersFound.toJSON().user;
                }                
            }
              return attr;
          }            


    });

    var ActivityDataModel = Backbone.Model.extend({

        urlRoot: '',

        defaults: function() {
            return {
                needsFetch: true,
                dataSeries: {
                    velocityMPS: [],
                    velMPS: {x:[],y:[],z:[]},
                    posM: {x:[],y:[],z:[]},
                    accBodyMPS2: {x:[],y:[],z:[]},
                    gyroBodyDegPS: {x:[],y:[],z:[]},
                },
                selectedSeries: { // this is set by, and sets, a persistent state variable
                    sprint: ['velocityMPS'],
                    jump: ['posM.z'],
                    agility: ['velocityMPS']
                },
                strides: [],
                splits: [],
                typeDefinition: null
            };
        },

        initialize: function(attrs) { 
            // set selectedSeries with state variable
            this.set('selectedSeries', app.state.get('activitySelectedSeries') ? app.state.get('activitySelectedSeries') : this.get('selectedSeries'));
        },

        url: function() {
            this.urlRoot = app.getApiUrl('activity_data');
            if (this.id) {
                return this.urlRoot + this.id + '/';
            } else {
                return this.urlRoot;
            }
        },

        getSeries: function(series) {
            return series.indexOf('.') !== -1 ? this.get('dataSeries')[series.split(('.'))[0]][series.split(('.'))[1]] : this.get('dataSeries')[series];
        },

        toggleSeries: function(series) {
            var self = this;
            var inArray;

            let seriesIndex = this.get('selectedSeries')[this.get('typeDefinition').activity_type].indexOf(series);
            if (seriesIndex > -1) {
              this.get('selectedSeries')[this.get('typeDefinition').activity_type].splice(seriesIndex, 1);
              inArray = false;
            } else {
                this.get('selectedSeries')[this.get('typeDefinition').activity_type].push(series)
                inArray = true;
            }
            // persist in state cache
            app.state.set('activitySelectedSeries', self.get('selectedSeries'))
            app.state.trigger('change', app.state);
            return inArray;
        },

        buildSeries: function() {
            var self = this;
            // format data for plotting, lists
            let ests = this.get('est');
            let events = this.get('events');
            let dataSeries = self.get('dataSeries');
            let strides = this.get('strides') || [];
            let splits = this.get('splits') || [];

            // let userVelRanges = this.dataModel.get('user_velocity_ranges');

            // if (this.model.get('type_definition').start_type == 'motion') {
            //     dataVelocityRanges = userVelRanges.motion || [];
            // } else {
            //     if (this.model.get('type_definition').start_type == 'fly') {
            //         dataVelocityRanges = userVelRanges.fly || [];
            //     }
            // }

            // let startPos = events.find( event => event.type === 'motion_start' );

            // loop over events
            _.each(ests, function(item) {
                dataSeries.velMPS.x.push([item.time, parseFloat(item.velMPS.x.toFixed(3))]);
                dataSeries.velMPS.y.push([item.time, parseFloat(item.velMPS.y.toFixed(3))]);
                dataSeries.velMPS.z.push([item.time, parseFloat(item.velMPS.z.toFixed(3))]);

                dataSeries.posM.x.push([item.time, parseFloat(item.posM.x.toFixed(3))]);
                dataSeries.posM.y.push([item.time, parseFloat(item.posM.y.toFixed(3))]);
                dataSeries.posM.z.push([item.time, parseFloat(item.posM.z.toFixed(3))]);                

                dataSeries.accBodyMPS2.x.push([item.time, parseFloat(item.accBodyMPS2.x.toFixed(3))]);
                dataSeries.accBodyMPS2.y.push([item.time, parseFloat(item.accBodyMPS2.y.toFixed(3))]);
                dataSeries.accBodyMPS2.z.push([item.time, parseFloat(item.accBodyMPS2.z.toFixed(3))]);                

                dataSeries.gyroBodyDegPS.x.push([item.time, parseFloat(item.gyroBodyDegPS.x.toFixed(3))]);
                dataSeries.gyroBodyDegPS.y.push([item.time, parseFloat(item.gyroBodyDegPS.y.toFixed(3))]);
                dataSeries.gyroBodyDegPS.z.push([item.time, parseFloat(item.gyroBodyDegPS.z.toFixed(3))]);

                let vel = item.velocityMPS || null;
                if (!vel) {
                    vel = Math.sqrt(Math.pow((item.velMPS.x - 0), 2) + Math.pow((item.velMPS.y -0), 2));
                }
                if (vel) {
                    dataSeries.velocityMPS.push([item.time, parseFloat(vel.toFixed(3))]);
                }

                // let dist = Math.sqrt(Math.pow((item.posM.x - 0), 2) + Math.pow((item.posM.y -0), 2)); 
                // if (dist > 0) {
                //     distanceFromStart.push(dist);
                // }
                // accZ.push([item.time, parseFloat(item.accBodyMPS2.z.toFixed(3))]);
            });

            // loop over events to split out strides
            _.each(events, function(event) {
              if (event.type == 'split') {
                splits.push(event);
              }

              if (event.type == 'stride') {
                strides.push(event);
              }                  
            });

            // let dataTime = ests.map(({ time }) => time)

            // _.each(this.dataModel.get('events'), function(item) {
            //     stridesTime.push(item.time * 1000);
            //     stridesContact.push(item.contactTime);
            // });            

            // if (events && events.length) {

            //     sprintStart = events.filter(obj => {
            //       return obj.type === "start"
            //     });

            //     sprintEnd = events.filter(obj => {
            //       return obj.type === "end"
            //     });

            //     events.reduce(function(filtered, event) {
            //       if (event.type == 'stride') {
            //          stridesTime.push(event.time);
            //          stridesContact.push(event.contactTime);
            //          dataStrides.push([event.time * 1000, event.contactTime])
            //       } else { 
            //       }
            //       return [];
            //     });

            //     events.reduce(function(filtered, event) {
            //       if (event.type == 'split') {
            //             splitLines.push({
            //                 color: '#f7f7f7', 
            //                 width: 1,
            //                 value: event.time * 1000,
            //                 label: { text: event.cumulative_distance}
            //             });
            //       }
            //       return [];
            //     });


            // }

            // sprintStart = sprintStart && sprintStart[0].time * 1000;
            // sprintEnd = sprintEnd && sprintEnd[0].time * 1000;

            // ------------------------
            // TODO: splits plotbands
            // ------------------------
            // xAxis: {
            //     plotBands: [{
            //         color: 'orange', // Color value
            //         from: 3, // Start of the plot band
            //         to: 4 // End of the plot band,
            //         label: {
            //             text: 'I am a label', // Content of the label. 
            //             align: 'left', // Positioning of the label. 
            //             Default to center. x: +10 // Amount of pixels the label will be repositioned according to the alignment.                         
            //         }
            //     }],
            // }

            // ------------------------
            // TODO: more series (user median ranges)
            // ------------------------
            // {
            //     name: 'Range',
            //     data: dataVelocityRanges,
            //     type: 'arearange',
            //     lineWidth: 0,
            //     color: '#eeeeee',
            //     fillOpacity: 0.3,
            //     zIndex: 0,
            //     marker: {
            //         enabled: false
            //     }
            // }  

            // ------------------------
            // TODO: axes
            // ------------------------
            // yAxis: [{ title: { text: 'Velocity (m/s)' }}, { visible: false }],
            // xAxis: {
            //     title: {
            //         text: 'Time (s)'
            //     },
            //     plotLines: splitLines.concat([
            //     {
            //         color: '#00A82D', // Green
            //         width: 1.5,
            //         value: sprintStart,
            //           label: { 
            //             text: 'Start',
            //             verticalAlign: 'middle',
            //             align: 'center',
            //           }
            //     },
            //     {
            //         color: '#ff4500', // Red
            //         width: 1.5,
            //         value: sprintEnd,
            //           label: { 
            //             text: 'End',
            //             align: 'center',
            //             verticalAlign: 'middle'
            //           }
            //     }
            //     ]),
            //     labels: {
            //         formatter: function(){
            //           return this.value /1000;
            //           return d.getMinutes() +':'+ d.getSeconds() +':'+ d.getMilliseconds();
            //         }
            //     },                
            // },


        },

    });

    var ActivityCollection = PagingCollection.collection.extend({
        pageSize: 100,    
        model: ActivityModel,

        initialize: function(options) {
            this.session = options.session || null;
            var urlBase = 'activity';
            if (this.session) {
                this.urlRoot = app.getApiUrl(urlBase + '?session=' + this.session)
            } else { this.urlRoot = app.getApiUrl(urlBase); }
            PagingCollection.collection.prototype.initialize.apply(this, arguments);
        },

          parse: function(attr) {
            // update user object with (always stored) orgMember object

            let objects = attr;
            _(attr.results).each(function(item) {              
                let usersFound = app.orgMemberCollection.find(function(model) { return model.get('user').id === item.user; })
                if (usersFound) {
                    item.user = usersFound.toJSON().user;
                }
            });

            if(attr.results) {
                objects = attr.results;
            } else {
                return attr;
            }
            return objects;
          }        

    });

    return {
        activityModel: ActivityModel,
        activityDataModel: ActivityDataModel,
        activityCollection: ActivityCollection
    };
});