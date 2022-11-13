//SystemView
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
    var SystemView = Backbone.View.extend({
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

            this.apiUrl = app.getApiUrl('system');

            this.templatePromise = app.templateLoader.getTemplate('system-detail', ['pagination-links']);

            var elString = '#system';
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

        loadSystemPager: function() {
            var firstPage = true;
            var self = this;
            var threshold = 130;
            var $listViewEl = this.$('.feed');
            var contentTemplate = 'system-list-item';
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
                name: 'explore-' + self.viewType
            });
            self.listenToOnce(self.systemPager, 'errorFetchingCollection' || 'noListViewResults', function() {
                // var memberName = app.loggedInUser.get('firstName') || app.loggedInUser.get('fullName') || 'you who cannot be named';
                // self.$('.unreadNotifs .paginatedList').html('<div class="no-notifs noNotifs">Good news and bad news, ' + memberName + '. You have no new notifications to deal with.');
            });
        },


        scrollToTop: function(e) {
            var offset = this.windowHeight / 1.5;
            $('body').velocity("scroll", { 
              duration: 500,
              easing: [ 0.19, 1, 0.22, 1 ],
              offset: offset
            });
        },

        scrollToContent: function(e) {
            var offset = this.windowHeight-800;
            this.$('.mainBody').velocity("scroll", { 
              duration: 300,
              easing: [ 0.19, 1, 0.22, 1 ],
              offset: offset
            });
        },

        _setupLogin: function() {
            var $authEl = this.$('.headContent');
            app.swapInAuthPane($authEl);
        },

        _closedownLogin: function() {
        },

        toggleLoginPane: function() {
            // app.fireAuthModal();
            if (!this.loginActive) {
                this._setupLogin();
            } else { 
                this._closedownLogin();
            }
        },

        toggleInbox: function(e) {
            app.toggleInbox(e)
        },
        
        followThis: function(e) {
            app.followThis(e);
        },

        destroy: function() {
            this.systemPager && this.systemPager.destroy();
            Backbone.View.prototype.destroy.apply(this, arguments);
        }
    });

    return SystemView;
});