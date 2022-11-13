define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'views/SystemView',
    'views/TagView',
    'models/System'

],
function(
    $,
    Backbone,
    _,
    app, 
    SystemView,
    TagView,
    System
) {
    'use strict';
    var AdminController = Backbone.View.extend({

        initialize: function(options) {
            options = options || {};                        
            var self = this;
            this.id = 'AdminController';
            var activateController = options.activateController || false;            
            app.pageController.registerController({ controller: this, activate: activateController });

            this.listenTo(app.pageController, 'closeDown-AdminController', function() {
                console.log('so this is closeDown-AdminController');
                this.clearViews();
            });
        },
        
        loadSession: function(id) { // from id :)
            var self = this;

            this.clearViews();
            var loadSessionView = function(model) {

                self.sessionView = new SessionView(model);

                self.listenToOnce(self.sessionView, 'renderComplete', function($el) {
                    // self.updateMeta(self.sessionView.metaAttrs);

                    self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                        self.sessionView.afterRender();
                    });

                    self.trigger('pageChange', self, $el, {
                        trigger: false
                    });

                });                

                self.sessionView.render();
            };

            console.log('about to get a session model and fetch it');
            var sessionModel = new Session.sessionModel({ id: id })
            sessionModel.fetch().done(function() {
                console.log(sessionModel);
                loadSessionView(sessionModel);                    
            }).catch(function(error) {
                console.log('fuck, failed to fetch session');
                  // app.pageController.notFound();
                });

        },

        loadSystemView: function(options) {
            var self = this;

            this.clearViews();
            this.systemView && this.systemView.destroy();
            this.systemView = new SystemView(options);

            this.listenToOnce(this.systemView, 'renderComplete', function($el) {
                this.updateMeta(self.systemView.metaAttrs);

                self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                    self.systemView.afterRender();
                });

                self.trigger('pageChange', self, $el, {
                    trigger: false
                });

            });
            this.systemView.render();
        }, 

        loadTagView: function(options) {
            var self = this;

            this.clearViews();
            this.tagView && this.tagView.destroy();
            this.tagView = new TagView(options);

            this.listenToOnce(this.tagView, 'renderComplete', function($el) {
                this.updateMeta(self.tagView.metaAttrs);

                self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                    self.tagView.afterRender();
                });

                self.trigger('pageChange', self, $el, {
                    trigger: false
                });

            });
            this.tagView.render();
        },         

        updateMeta: function(attrs) {
            app.metaHandler.updateHead(attrs);
        },

        clearViews: function(views) {
            views = views || ['orgView', 'tagView', 'systemView', 'teamView', 'tagView'];
            if (views) {
                for(var view, i = 0, l = views.length ; i < l ; i += 1) {
                    view = views[i];
                    if(this[view]) {
                        this[view].destroy();
                        // this.stopListening(this[view]);
                        // this[view] = null;
                    } 
                }
            }
        },

    });
    return AdminController;
});