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
    var UserCreateView = Backbone.View.extend({
        // TODO: implement view level permissions
        authRequired:true, 
        events: function() {
            var _extended = {
                'hide.bs.modal': 'exit',
            };
            if (app.hasTouch) {
                _extended = _.extend(_extended, {
                });
            } else {
                _extended = _.extend(_extended, {
                });
            }
            return _.extend(_extended, _.result(Backbone.View.prototype, 'events'));
        },   
        
        initialize: function (options) {
            var self = this;
        },

        render: function() {
            var self = this;
            var $el;
            var $html;

            app.templateLoader.getTemplate('user-modal').done(function(tmpl) {
                self.viewModal = $(tmpl({}));
                self.viewModal.modal();
                self.setElement(self.viewModal);
            });            


        },

        saveUser: function() {
            var self = this;
            let attrs = {org: app.state.get('user').org.id, user: {} }; // always use the user's org here

            var $userForm = this.$('.userCreateForm');         

            let userFullName = this.$('#fullName').val();
            let firstName;

            let splitName = userFullName.split(' ');
            if (splitName.length > 1) {
                attrs.user.first_name = splitName.splice(0,1)[0];
                attrs.user.last_name = splitName.join(' ');
            } else { attrs.user.first_name = fullName; }

            app.orgMemberCollection.create(attrs, {   success: function() { self.viewModal.modal('hide'); } });

            // validate user input, set and save user; collection.create()
        },

        afterRender: function() {
        },

        exit: function() {
            this.trigger('closeView');
        },

        destroy: function() {
            this.explorePager && this.explorePager.destroy();
            Backbone.View.prototype.destroy.apply(this, arguments);
        }
    });

    return UserCreateView;
});