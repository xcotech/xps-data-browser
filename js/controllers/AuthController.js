define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'views/AuthView',    
], function(
    $,
    Backbone,
    _,
    app,
    AuthView
    
) {
    'use strict';
    return Backbone.View.extend({

        initialize: function(options) {
            var self = this;
            options = options || {};

            this.id = 'AuthController';
            var activateController = options.activateController || false;            
            app.pageController.registerController({ controller: this, activate: activateController });

            this.listenTo(app.pageController, 'closeDown-AuthController', function() {
                // console.log('so this is closeDown-AuthController');
                this.clearViews();
            });            
        },     

        loadLauncher: function(options) {
            options = options || {};

            this.clearViews(['authView']);
            this.authView = new AuthView(options);
            this.authView.renderLauncher();

        },

        loadAuthView: function(options) {
            console.log('loadauthview')
            var self = this;

            this.clearViews(['authView']);
            this.authView = new AuthView(options);

            this.listenToOnce(this.authView, 'renderComplete', function($el) {
                console.log('about to render the auth form');
            });

            this.listenTo(this.authView, 'closeAuthView', function() {
                this.clearViews(['authView']);
            });

            this.authView.render();
            // this.authView.renderForm();
            
        },

        clearViews: function(views) {
            views = views || ['authView'];
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

    });
});