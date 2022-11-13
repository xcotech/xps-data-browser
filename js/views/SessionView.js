// SessionView
    define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'models/Activity',
    'highcharts'

],
function(
    $,
    Backbone,
    _,
    app,
    Activity,
    Highcharts
) {
    'use strict';
    var SessionView = Backbone.View.extend({
        events: function() {
            var _extended = {
                'hide.bs.modal': 'exit',
            };
            if (app.hasTouch) {
                _extended = _.extend(_extended, {
                    'touchstart .gotoGroup': 'gotoGroup',
                    'touchstart .sessionCrumb': 'toSession'
                });
            } else {
                _extended = _.extend(_extended, {
                    'click .gotoGroup': 'gotoGroup',
                    'click .sessionCrumb': 'toSession'
                });
            }
            return _.extend(_extended, _.result(Backbone.View.prototype, 'events'));
        },   
        
        initialize: function(options) {  
            var self = this;
            this.options = options || {};
            this.model = this.options.model || null; 

            this.viewTmpl = app.templateLoader.getTemplate('session-detail', ['session-subnav', 'activity-teaser-mini']);
            this.viewname = 'SessionView';
          
            var elString = '#session';
            var modelId = this.model.id;
            if(modelId) {
                 elString += '-' + modelId;
            }
            var $el = $('#session');

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
            this.bodyStage = this.$('.sessionBody');
            this.subNavContainer = this.$('.subNav');
            let groupFilter = this.options.groupFilter;

            this.activityCollection && this.activityCollection.destroy();
            this.activityCollection = new Activity.activityCollection({session: this.model.id});
            this.activityCollection.fetch().done(function() {
                console.log(self.activityCollection.toJSON())
                // ... and group them by type_hash please
                self.activityGroups = _.groupBy(self.activityCollection.toJSON(), 'type_hash')
                if (groupFilter) {
                    let group = self.activityGroups[groupFilter]
                    if (group) {
                        self.loadGroup(group)    
                    }
                } else{
                    self.loadGroupedActivities();
                }
            });
        },

        toSession: function(e) {
            var $target = $(e.currentTarget);
            // get the target group from grouped activities collection
            let sessionId = $target.data('id');
        },

        gotoGroup: function(e) {
            var $target = $(e.currentTarget);
            // get the target group from grouped activities collection
            let groupId = $target.data('id');
            var group = this.activityGroups[groupId]
            this.loadGroup(group);
            this.trigger('groupDetail', groupId);
        },

        loadGroup: function(group) {
            var self = this;
            var $body;
            var sortedActivities = _.sortBy(group, function(o) { return o.type_definition.activity_type == 'jump' ? (o.type_definition.orientation == 'vertical' ? o.data_summary.height : o.data_summary.length) : o.created; })
            var context = {type_hash: group[0].type_hash, type_definition: group[0].type_definition, activities: sortedActivities };

            app.templateLoader.getTemplate('activity-group-detail', ['activity-teaser']).done(function(tmpl) {
                $body = tmpl(context);
                self.bodyStage.html($body);
                self.bodyStage.velocity('stop', true).velocity('transition.slideUpIn', 200);

                app.templateLoader.getTemplate('session-subnav').done(function(tmpl) {
                    let $subnav = tmpl(_.extend(self.model.toJSON(), {type_hash: group[0].type_hash, type_definition: group[0].type_definition}));
                    self.subNavContainer.html($subnav);
                    self.bodyStage.velocity('stop', true).velocity('transition.slideDownIn', 200);
                });

                self.setupActivityGroupPlot(group);
            });
            // plotContainer
        },

        setupActivityGroupPlot: function(group) {

            let velocitySeries = [];
            let distances = [];

            // loop over groups to extract velocities from splits
            _.each(group, function(item) {
                let events = item.events;
                if (events) {

                    let splits = [];
                    events.reduce(function(filtered, event) {
                        if (event.type == 'split') {
                            splits.push([event.cumulative_distance, event.velocity])
                        }                   
                        return [];
                    });
                    velocitySeries.push(splits)                
                }

            });

            let dataSeries = [];
            _.each(velocitySeries, function(val, i) {
                dataSeries.push({ name: group[i].user.first_name + '(' + group[i].data_summary.total_time.toFixed(2) + ')', data: val, type: 'spline' });
            });         

            this.chart = Highcharts.chart('plotContainer', {

                  credits: {
                      enabled: false
                  },

                title: {
                    text: ''
                },

                subtitle: {
                    text: ''
                },
                yAxis: [{ title: { text: 'Velocity (m/s)' }}, { visible: false }],
            xAxis: [
            {
                title: {
                    text: 'Split (m)'
                },          
            },
            {
                visible: false,
                title: {
                    text: 'Time (s)'
                },             
            }
            ],
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 0
                    }
                },

                series: dataSeries,
                chart: {
                    height: 600,
                    backgroundColor: '#ffffff',
                },
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

        loadGroupedActivities: function() {

            var self = this;
            var $renderEl = this.$('.sessionBody');            

            var $domFrag = $(document.createDocumentFragment());            
            app.templateLoader.getTemplate('activity-group', ['activity-teaser-mini']).done(function(tmpl) {
                _.each(self.activityGroups, function(group, key) {

                    group = _.sortBy(group, function(o) { return o.type_definition.activity_type == 'jump' ? (o.type_definition.orientation == 'vertical' ? o.data_summary.height : o.data_summary.length) : o.data_summary.total_time; })

                    $domFrag.append(tmpl({ type_hash: group[0].type_hash, type_definition: group[0].type_definition, activities: group }));
                });
                $renderEl.html($domFrag);
                self.trigger('activityItemsRendered');
            });   

        },
        
        enableFieldEditors: function() {
            var self = this;

            this.nameEditor && this.nameEditor.enable(false);
            this.nameEditor = app.getEditor({
                el: self.$('.activityName').get(0),
                disableReturn: true,
                model: self.model,
                // wordCountContainer: $wordCountContainer,
                placeholder: 'Give your activity a name', 
                forceTab: true             
            });

            this.descriptionEditor && this.descriptionEditor.enable(false);
            this.descriptionEditor = app.getEditor({
                el: self.$('.activityDescription').get(0),
                disableReturn: true,
                model: self.model,
                // wordCountContainer: $wordCountContainer,
                placeholder: 'Add an optional description', 
                forceTab: true             
            });            

            this.nameEditor.on('text-change', function(delta, oldDelta, source) {
                if(source=='user' && !self.model.get('isUnsaved')) {
                    app.submitDelay(this, function() {
                        self.model.set('name', self.nameEditor.getText()).save();
                    });
                }
            });

            this.descriptionEditor.on('text-change', function(delta, oldDelta, source) {
                if(source=='user' && !self.model.get('isUnsaved')) {
                    app.submitDelay(this, function() {
                        self.model.set('description', self.descriptionEditor.getText()).save();
                    });
                }
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
            this.chart && this.chart.destroy();
            this.nameEditor && this.nameEditor.enable(false);
            this.descriptionEditor && this.descriptionEditor.enable(false);
            Backbone.View.prototype.destroy.apply(this, arguments);            
        }

    });
    return SessionView;
});