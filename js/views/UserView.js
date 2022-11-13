// UserView
    define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'views/PagerView'
],
function(
    $,
    Backbone,
    _,
    app,
    PagerView
) {
    'use strict';
    var UserView = Backbone.View.extend({
        events: function() {
            var _extended = {
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

        initialize: function(options) {  
            var self = this;
            this.model = options.model;
            this.viewname = 'userdetailview';

            this.templatePromise = app.templateLoader.getTemplate('user-detail');            

            var $el = $('#user-detail');

            if($el.length) {
                this.setElement($el);
                this.afterRender();
            } else {
                this.needForceRender = true;
            }             
        },

        render: function() {
            var self = this;
            var $el;
            var $html;
            var viewType = {}
            viewType[this.viewType + 'View'] = true;
            var context = $.extend(viewType, this.model.toJSON());
            this.templatePromise.done(function(tmpl) {
                $html = $(tmpl(context));
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
            var self = this;
            this.setupActivityList();
        },
        
        setupActivityList: function() {
        
            var self = this;
            var $pageEl = this.$('.pagerContainer');
            var apiUrl = app.getApiUrl('activity?user=' + this.model.get('user').id);

            this.activityPager && this.activityPager.destroy();
            this.activityPager = new PagerView({
                el: $pageEl,
                breadcrumbsEl: self.$('.breadcrumbLinks'),
                url: apiUrl,
                templateName: 'activity-teaser',
                name: 'orguseractivities-' + self.model.id
            });
            self.listenToOnce(self.activityPager, 'errorFetchingCollection' || 'noListViewResults', function() {
                // var memberName = app.loggedInUser.get('firstName') || app.loggedInUser.get('fullName') || 'you who cannot be named';
                // self.$('.unreadNotifs .paginatedList').html('<div class="no-notifs noNotifs">Good news and bad news, ' + memberName + '. You have no new notifications to deal with.');
            });            


        },

        clearViews: function(views) {
            views = views || [''];
            for(var view, i = 0, l = views.length ; i < l ; i += 1) {
                view = views[i];
                if(this[view]) {
                    this.stopListening(this[view]);
                    this[view].destroy();
                    this[view] = null;
                }
            }
        },        

        destroy: function() {
            Backbone.View.prototype.destroy.apply(this, arguments);
        }
    });
    return UserView;
});