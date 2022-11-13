define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'views/ExploreView',
    'views/ActivityView',
    'views/ActivityRecordView',
    'views/SessionView',
    'models/Session',
    'models/Activity'
],
function(
    $,
    Backbone,
    _,
    app, 
    ExploreView,
    ActivityView,
    ActivityRecordView,
    SessionView,
    Session,
    Activity
) {
    'use strict';
    var ExploreController = Backbone.View.extend({

        initialize: function(options) {
            options = options || {};                        
            var self = this;
            this.id = 'ExploreController';
            var activateController = options.activateController || false;            
            app.pageController.registerController({ controller: this, activate: activateController });

            this.listenTo(app.pageController, 'closeDown-ExploreController', function() {
                this.clearViews();
            });
        },
        
        loadActivity: function(id) { // from id :)
            var self = this;
            this.clearViews();

            var loadActivityView = function(options) {
                self.activityView = new ActivityView(options);

                self.listenToOnce(self.activityView, 'renderComplete', function($el) {
                    // self.updateMeta(self.activityView.metaAttrs);

                    self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                        self.activityView.afterRender();
                    });

                    self.trigger('pageChange', self, $el, {
                        trigger: false
                    });

                });                

                self.activityView.render();
            };

            var activityModel = new Activity.activityModel({ id: id })
            let dataModel = new Activity.activityDataModel({ id: id }); // read-only expression of ActivityData model

            activityModel.fetch().done(function() {
                loadActivityView({ model: activityModel, dataModel: dataModel });                    
            }).catch(function(error) {
                app.pageController.notFound();
                });

        },

        loadSession: function(id) { // from id :)
            var self = this;
            this.clearViews();

            // this.clearViews();
            var loadSessionView = function(model) {

                // get url params to extract group and user filter state info
                let params = new URLSearchParams(Backbone.history.getSearch());

                self.sessionView = new SessionView({ model: model, userFilter: params.get('user') || null, groupFilter: params.get('group') || null });

                self.listenToOnce(self.sessionView, 'renderComplete', function($el) {
                    // self.updateMeta(self.sessionView.metaAttrs);

                    self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                        self.sessionView.afterRender();
                    });

                    self.trigger('pageChange', self, $el, {
                        trigger: false
                    });

                });

                self.listenTo(self.sessionView, 'groupDetail', function(groupHash) {
                    params.set('group', groupHash);

                    // self.trigger('pageChange', self, $el, {
                    //     trigger: false
                    // });               
                    app.pageController.navigate(Backbone.history.getPath() + '?' + params, {trigger: false, replace: true});
                });

                self.sessionView.render();
            };

            var sessionModel = new Session.sessionModel({ id: id })
            sessionModel.fetch().done(function() {
                loadSessionView(sessionModel);                    
            }).catch(function(error) {
                  app.pageController.notFound();
                });

        },

        loadExploreView: function(options) {
            var self = this;

            this.clearViews();
            this.exploreView && this.exploreView.destroy();
            this.exploreView = new ExploreView(options);

            this.listenToOnce(this.exploreView, 'renderComplete', function($el) {
                this.updateMeta(self.exploreView.metaAttrs);

                self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                    self.exploreView.afterRender();
                });

                self.trigger('pageChange', self, $el, {
                    trigger: false
                });

            });
            this.exploreView.render();
        }, 

        updateMeta: function(attrs) {
            app.metaHandler.updateHead(attrs);
        },

        clearViews: function(views) {
            views = views || ['activityView', 'sessionView', 'exploreview'];

            for(var view, i = 0, l = views.length ; i < l ; i += 1) {
                view = views[i];
                if(this[view]) {
                    this.stopListening(this[view]);
                    this[view].destroy();
                    this[view] = null;
                }
            }
        }, 
      

    });
    return ExploreController;
});