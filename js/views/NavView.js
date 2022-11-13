define([
    'jquery',
    'backbone',
    'underscore',
    'app'
    ],
function($,
    Backbone,
    _,
    app
) {
    'use strict';
    var NavView = Backbone.View.extend({
        el: '[data-view-bind="NavView"]',

        events: function() {
            var _extended;
            if (app.hasTouch) {
                _extended = {
                    'touchstart .logMeOut': 'logMeOut'
                };
            } else {
                _extended = {
                    'click .logMeOut': 'logMeOut'
                };
            }
            return _.extend(_extended, _.result(Backbone.View.prototype, 'events'));
        },

        initialize: function(options) {
            var self = this;
            this.viewTmpl = app.templateLoader.getTemplate('topnav');
            this.setElement($('.navBar'));
        },    

        render: function() {
            var self = this;
            var $el;
            var $html;

            var context = app.loggedInUser ? { user: app.loggedInUser.toJSON() } : {};
            this.viewTmpl.done(function(tmpl) {
                $html = $(tmpl(context));
                self.$el.html($html);
                self.afterRender();
            });

        },

        afterRender: function() {
            var self = this;
            this.listenToOnce(app.vent, 'loginStateChange', function() {
                self.render();
            });               
        },

        toggleMenu: function() {
            console.log('navview.togglemenu')
            this.trigger('toggleMenu');          
        },

        closeMenu: function() {
            this.trigger('closeMenu');
        },

        toggleSearch: function(e) {
            app.pageController.toggleSearch(e);
        },          

        authPane: function() {
            app.fireAuthModal();
        },

        logMeOut: function(e) {
            e.preventDefault();
            e.stopPropagation();
            app.logMeOut(e);
        },

        destroy: function() {
            console.log('destroying this')
            this.$el.html('');
            Backbone.View.prototype.destroy.apply(this, arguments);
        }
    });
    return NavView;
});