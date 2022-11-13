// StaticView
define([
    'jquery',
    'backbone',
    'underscore',
    'app'
], function(
    $,
    Backbone,
    _,
    app
) {
    'use strict';
    var StaticView = Backbone.View.extend({

        events: function() {
            var _extended;
            if (app.hasTouch) {
                _extended = {
                    'touchstart .scrollToContent': 'scrollToContent'
                };
            } else {
                _extended = {
                    'click .scrollToContent': 'scrollToContent'
                };
            }
            return _.extend(_extended, _.result(Backbone.View.prototype, 'events'));
        }, 

        initialize: function(options) {
            var self = this;
            options = options || {};
            this.options = options;
            this.feeds = {};
            this.viewType = options.viewType || '';
            this.subType = options.subType || '';
            this.rootUrl = options.rootUrl || '';
            var elString = '#static-' + this.viewType;
            if (this.subType) {
                elString += '-' + this.subType;
            }
            var $el = $(elString);
                 
            var template = 'static-' + this.viewType;
            if (this.subType) {
                template += '-' + this.subType
            }
            var partials = [];  

            this.templatePromise = app.templateLoader.getTemplate(template, partials);

        },

        fetchContext: function() {
            var self = this;
            return $.ajax({
                url: self.rootUrl,
                type: 'GET',
                data: {
                    spa: true         
                }
            });
        },

        render: function() {
            var self = this;
            var $el;
            var $html;
            let context = {csrf: app.csrf}; // for forms

            self.templatePromise.done(function(tmpl) {
                var staticMeta = context.meta;
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
                self.trigger('renderComplete', self.$el, staticMeta);
            });      
        },

        afterRender: function() {
            // app.tooltip();
            console.log('static viewType is ' + this.viewType)
            var pageTitle = document.getElementsByTagName("title")[0].innerHTML;
            var staticUrl = window.location.pathname;
            switch(this.viewType) {
                case 'landing':
                    app.vent.trigger('hideTopNav');
                break;
            }
        },

        fireAuthModal: function(e) {
            app.fireAuthModal();
        },
        
        clearAllMainViews: function() {
            var views = [''];
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
            this.clearAllMainViews();
            Backbone.View.prototype.destroy.apply(this, arguments);
        }
    });

    return StaticView;
});