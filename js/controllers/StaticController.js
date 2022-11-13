// StaticController
define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'views/StaticView'
], function(
    $,
    Backbone,
    _,
    app,
    StaticView
) {
    'use strict';
    var StaticController = Backbone.View.extend({
        initialize: function(options) {
            options = options || {};
            this.id = 'StaticController';
            var activateController = options.activateController || false;

            if(options.el) {
                this.setElement(options.el);
            }
            app.pageController.registerController({ controller: this, activate: activateController });
            this.listenTo(app.pageController, 'closeDown-StaticController', function() {
                this.clearAllMainViews();
            });

         },

         loadStaticView: function(options) {
            var self = this;
            var rootUrl;
            var staticMeta = options.staticMeta || {};
            console.log(options)

            this.rootUrl = '/' + options.viewType;
            this.apiUrl = '/api/static/' + (options.viewType ? options.viewType : 'home');

            if (options.subType) {
                this.rootUrl += '/' + options.subType; 
            }

            var skipRender = options.skipRender || false;
            this.clearAllMainViews();

            this.staticView = new StaticView({
                viewType: options.viewType,
                subType: options.subType,
                rootUrl: self.rootUrl,
                apiUrl: self.apiUrl
            }); // need to pass in options with path data

            this.listenToOnce(self.staticView, 'renderComplete', function($el, staticMeta) {
                this.updateMeta(staticMeta);
                self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                    this.staticView.afterRender();
                });

                if(!self.viewType == 'error') {
                    self.trigger('pageChange', self, self.staticView.$el, rootUrl, {
                        trigger: false
                    });
                } else { 
                        self.trigger('pageChange', self, self.staticView.$el, '', {
                        trigger: false,
                        replace: true
                    });
                 }
            });
            if(!skipRender) {
                this.staticView.render();
            }
        },

        updateMeta: function(staticMeta) {
            var attrs = staticMeta;

                //  attrs = {
                //     'title': postModel.get('title'),
                //     'meta': [{
                //         'name': 'copyright',
                //         'content': postModel.get('author').fullName
                //     }]
                // };;
                // attrs = {
                //     'title': postModel.get('title'),
                //     'meta': [{
                //         'name': 'copyright',
                //         'content': postModel.get('author').fullName
                //     }]
                // };
            app.metaHandler.updateHead(attrs);
        },

        load404SuggestionsView: function(options) {
            this.clearAllMainViews();
            this.staticView = new StaticView({
                viewType: 'notfound'
            }); // need to pass in options with path data
            this.staticView.setup404Search();
        },
        
        clearAllMainViews: function() {
            var views = ['staticView'];
            for(var view, i = 0, l = views.length ; i < l ; i += 1) {
                view = views[i];
                if(this[view]) {
                    this[view].destroy();
                    this.stopListening(this[view]);
                    this[view] = null;
                }
            }
        },

        destroy: function() {
            this.stopListening(this.staticView);
            this.staticView && this.staticView.destroy();
            this.staticView = null;
            Backbone.View.prototype.destroy.apply(this, arguments);
        }

    });
    return StaticController;
});