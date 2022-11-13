define([
    'jquery',
    'backbone',
    'underscore',
    'views/UserView',
    'views/UserCreateView',
    'views/UserListView',
    'models/Org',
    'app'
],
function(
    $,
    Backbone,
    _,
    UserView,
    UserCreateView,
    UserListView,
    Org,
    app
) {
    'use strict';
    var UserController = Backbone.View.extend({

        initialize: function(options) {
            options = options || {};                        
            var self = this;
            this.id = 'UserController';
            var activateController = options.activateController || false;            
            app.pageController.registerController({ controller: this, activate: activateController });

            this.listenTo(app.pageController, 'closeDown-UserController', function() {
                this.clearViews();
            });
        },

        loadUserFromId: function(id) {
            console.log(app.orgMemberCollection.models)
            this.loadUserView({ model: app.orgMemberCollection.get(id) });
        },

        loadUserCreateView: function() {
            var self = this;
            this.userCreateView = new UserCreateView();

            this.listenTo(this.userCreateView, 'closeView', function() {
                self.clearViews(['userCreateView']);
                app.vent.trigger('orgMemberChange');
            });           

            this.userCreateView.render();              
        },
        

        loadUserView: function(options) {
            console.log(options)
            // we should always have a fully synced model at this point
            var self = this;
            var href = null;

            // this.clearViews();
            this.userView = new UserView(options);
            this.listenToOnce(this.userView, 'renderComplete', function($el) {
                // this.updateMeta(metaAttrs);

                self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                    self.userView.afterRender();
                });

                self.trigger('pageChange', self, $el, {
                    trigger: false
                });

            });
            this.userView.render();
        },        

        loadUserListView: function(options) {
            var self = this;

            if (!app.state.get('user')) {
                app.pageController.notFound();
                return;
            }

            this.clearViews();
            this.userListView = new UserListView(options);

            this.listenTo(this.userListView, 'startUserCreate', function() {
                self.loadUserCreateView();
            });

            this.listenToOnce(this.userListView, 'renderComplete', function($el) {
                this.updateMeta(self.userListView.metaAttrs);

                self.listenToOnce(app.pageController, 'renderdone-'+self.id, function() {
                    self.userListView.afterRender();
                });

                self.trigger('pageChange', self, $el, {
                    trigger: false
                });

            });
            this.userListView.render();
        },     

        updateMeta: function(attrs) {
            app.metaHandler.updateHead(attrs);
        },

        isDirty: function() {
            return false;//for now...
        },

        clearViews: function(views) {
            views = views || ['userView', 'userCreateView'];
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
    return UserController;
});