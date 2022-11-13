//UserListView
define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'views/PagerView'
], function(
    $,
    Backbone,
    _,
    app,
    PagerView
) {
    'use strict';
    var UserListView = Backbone.View.extend({
        // TODO: implement view level permissions
        authRequired:true, 
        events: function() {
            return _.extend({
                }, _.result(Backbone.View.prototype, 'events')
            );
        },

        initialize: function (options) {
            var self = this;
            var contentTemplate;
            this.options = options || {};
            this.viewType = this.options.viewType || 'user';
            this.urlRoot = '/';
            if(this.viewType) {
                this.urlRoot += this.viewType;
            }

            this.apiUrl = app.getApiUrl('org_member');

            this.templatePromise = app.templateLoader.getTemplate('explore-shell', ['pagination-links']);

            var elString = '#explore';
            if(this.viewType) {
                 elString += '-' + this.viewType;
            }
            var $el = $(elString);
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
            var context = _.extend({showCreateNew: true}, this.options);

            // self.feed = context.feed;
            this.templatePromise.done(function(tmpl) {
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
            app.tooltip();
            this.startExploreFeed();
        },

        startExploreFeed: function() {
            var firstPage = true;
            var self = this;
            var threshold = 130;
            var $listViewEl = this.$('.exploreFeed');
            var contentTemplate = 'org-member';
            var templatePartials = []
            var metaTitle, metaDescription, pageCallbacks;

            this.explorePager && this.explorePager.destroy();
            this.explorePager = new PagerView({
                el: $listViewEl,
                firstPage: firstPage,
                threshold: threshold,
                breadcrumbsEl: self.$('.breadcrumbLinks'),
                collection: app.orgMemberCollection,
                templateName: contentTemplate,
                templatePartials: templatePartials,
                name: 'userpagervivew'
            });
            self.listenToOnce(self.explorePager, 'errorFetchingCollection' || 'noListViewResults', function() {
                // var memberName = app.loggedInUser.get('firstName') || app.loggedInUser.get('fullName') || 'you who cannot be named';
                // self.$('.unreadNotifs .paginatedList').html('<div class="no-notifs noNotifs">Good news and bad news, ' + memberName + '. You have no new notifications to deal with.');
            });
        },

        createNew: function() {
            this.trigger('startUserCreate');
        },

        destroy: function() {
            this.explorePager && this.explorePager.destroy();
            Backbone.View.prototype.destroy.apply(this, arguments);
        }
    });

    return UserListView;
});