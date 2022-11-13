define([
    'jquery',
    'backbone',
    'underscore',
    'views/NavView',
    'views/MenuView',
    'views/GenericModalView',
    'app'
], function(
    $,
    Backbone,
    _,
    NavView,
    MenuView,
    GenericModalView,
    app
) {
    'use strict';
    return Backbone.View.extend({
        initialize: function(options) {

            var self = this;
            options = options || {};

            this.id = 'NavController';
            var activateController = options.activateController || false;            
            app.pageController.registerController({ controller: this, activate: activateController });

            this.listenTo(app.pageController, 'closeDown-NavController', function() {
                // this.clearViews();
            });            

            this.listenTo(app.vent, 'hideTopNav', function() {
                self.hideTopNav()
            });
            
            this.listenTo(app.vent, 'showTopNav', function() {
                self.loadTopNav() 
            });

            this.loadTopNav();

            this.listenTo(this.navView, 'toggleMenu', function() {
                if (!app.menuOpen) { self.openMenu(); } else { self.closeMenu(); }
            }); 

            this.listenTo(app.pageController, 'pageChangeRenderDone', function($el) {
                app.navScrollWatch($el);
            });


        }, 

        hideTopNav: function() {
            this.clearViews(['navView']);
        },

        loadTopNav: function() {
            this.clearViews(['navView']);
            this.navView = new NavView();
            this.navView.render();
        },

        openMenu: function(options) {
            var self = this;
            options = options || {};

            // this.clearAllMainViews();

            this.menuView = new MenuView();
            this.menuView.render();

            this.listenToOnce(self.menuView, 'toggleMenu', function() {
                if (!app.menuOpen) { self.openMenu(); } else { self.closeMenu(); }
            });

        },

        closeMenu: function() {
                // if (!app.menuOpen) { self.openMenu(); } else { self.closeMenu(); }            
                this.menuView && this.menuView.closeMenu();
        },

        loadGenericActionModal: function(options) {
            this.clearViews(['genericModalView']);
            this.genericModalView = new GenericModalView(options)
            this.genericModalView.render();
            this.listenTo(this.genericModalView, 'closeGenericModal', function() {
                this.clearViews(['genericModalView']);
                app.vent.trigger('genericModalClosed');  
            });              
        },

        clearViews: function(views) {
            views = views || ['navView', 'menuView', 'genericModalView'];
            for(var view, i = 0, l = views.length ; i < l ; i += 1) {
                view = views[i];
                if(this[view]) {
                    this[view].destroy();                    
                    // this[view].unbind();
                    this.stopListening(this[view]);
                    this[view] = null;
                }
            }
        },

        getNavEl: function() {
            return this.navView.$el;
        }
    });
});