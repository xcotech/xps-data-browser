//TagView
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
    var TagView = Backbone.View.extend({
        events: function() {
            return _.extend({
                }, _.result(Backbone.View.prototype, 'events')
            );
        },

        initialize: function (options) {
            var self = this;
            var contentTemplate;
            this.options = options || {};
            this.viewType = this.options.viewType || '';
            this.urlRoot = '/';
            if(this.viewType) {
                this.urlRoot += this.viewType;
            }
            console.log(this.options);

            this.apiUrl = app.getApiUrl('tag');

            this.templatePromise = app.templateLoader.getTemplate('tag-detail', ['pagination-links']);

            var elString = '#tag';
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
            var context = this.options;

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
            this.loadSystemPager();
        },

        startTagCreate: function() {
            app.templateLoader.getTemplate('tag-modal').done(function(tmpl) {
                self.tagCreateModal = $(tmpl({}));
                self.tagCreateModal.modal();
            });
        },

        loadSystemPager: function() {
            var firstPage = true;
            var self = this;
            var threshold = 130;
            var $listViewEl = this.$('.feed');
            var contentTemplate = 'tag-list-item';
            var templatePartials = []
            var metaTitle, metaDescription, pageCallbacks;

            this.systemPager && this.systemPager.destroy();
            this.systemPager = new PagerView({
                el: $listViewEl,
                firstPage: firstPage,
                threshold: threshold,
                breadcrumbsEl: self.$('.breadcrumbLinks'),
                url: self.apiUrl,
                templateName: contentTemplate,
                templatePartials: templatePartials,
                name: 'tagpager'
            });
            self.listenToOnce(self.systemPager, 'errorFetchingCollection' || 'noListViewResults', function() {
                // var memberName = app.loggedInUser.get('firstName') || app.loggedInUser.get('fullName') || 'you who cannot be named';
                // self.$('.unreadNotifs .paginatedList').html('<div class="no-notifs noNotifs">Good news and bad news, ' + memberName + '. You have no new notifications to deal with.');
            });
        },

        destroy: function() {
            this.systemPager && this.systemPager.destroy();
            Backbone.View.prototype.destroy.apply(this, arguments);
        }
    });

    return TagView;
});