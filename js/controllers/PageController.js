//PageController
define([
    'jquery',
    'backbone',
    'underscore',
    'app',  
    'controllers/NavController',
    'controllers/UserController',
    'controllers/StaticController',
    'controllers/AuthController',
    'controllers/AdminController'
], function(
    $,
    Backbone,
    _,
    app,
    NavController,
    UserController,
    StaticController,
    AuthController,
    AdminController
) {

    'use strict';
    var RESOURCETYPE = {
        '1': 'user',
        '2': 'post',
        '13': 'unknown'
    };

    var PageControllerView = Backbone.View.extend({

        el: 'body',

        events: function() {
            return _.extend({
                'click [data-navigate]': 'linkCatcher'
            }, _.result(Backbone.View.prototype, 'events'));
        },

        initialize: function() {
            console.log('hey man')
            this.renderStack = [];
            // this.$progressBar = $('<div class="progress-bar"></div>');
            // $('body').append(this.$progressBar);
            this.$('.pageContainer:visible').addClass('activeView');
        },

        showProgress: function() {
            this.$progressBar.show();
        },
        
        hideProgress: function() {
            this.$progressBar.hide();
        },

        linkCatcher: function(e) {
            var self = this;
            var target = $(e.currentTarget);
            var href;
            var root = location.protocol + '//' + location.host + Backbone.history.root;
            var slugType = target.data('slug-type') || '';

            app.vent.trigger('navigate-action'); // broadcast this event, nice and early

            // we have an explicit path
            if (target.data('navigate').length) {
                Backbone.history.navigate(target.data('navigate'), true);
            } else { // get the path from the href

                href = {
                    prop: $(e.currentTarget).prop('href'),
                    attr: $(e.currentTarget).attr('href')
                };

                //http://stackoverflow.com/questions/12081894/backbone-router-navigate-and-anchor-href
                if (href.prop && href.prop.slice(0, root.length) === root) {
                    e.preventDefault();
                    if (href.attr == '/') { app.vent.trigger('homeLink'); }
                    Backbone.history.navigate(href.attr, true);
                }      
            }
        },

        pushToPageStack: function(cid, $el, doNotTrack) {
            var hideNav = false;
            $el
            .css({
                display: 'none'
            })
            this.renderStack.push({
                cid: cid,
                $el: $el,
                doNotTrack: doNotTrack
            });
            if($el && $el.hasClass('no-nav')) {
                hideNav = true;
            }
            this.render(hideNav);
        },

        render: function(hideNav) {
            hideNav = hideNav || false;
            var popped,
                self = this,
                $html = $('html');

            popped = this.renderStack.pop();
            this.$('[data-page-change-remove="true"]').remove();
            if(hideNav) {
                $('body').addClass('no-nav cover');
            } else {
                $('body').removeClass('no-nav cover');
            }
            if(!this.$('.shell').has(popped.$el).length) {
                this.$('.shell').append(popped.$el);
                popped.resetBodyScroll = true;
            }
            if(this.renderStack.length) {
                this.render();
            } else {
                this.$('.activeView').remove();
                self._showPage(popped);
            }
        },

        _showPage: function(popped) {
            var self = this;
            if(popped.resetBodyScroll) {
                $('body').scrollTop(0);
            }
            popped.$el
                .addClass('activeView')
                .css({
                    display: 'block',
                })
                .velocity("transition.fadeIn", 320)
                .promise()
                .done(function() {
                    if(!popped.doNotTrack) {
                        self.activePage = popped;
                    } else {
                        self.activePage = null;
                    }
                    self.trigger('renderdone', popped.cid, popped.$el);
                });
        }

    });
    var PageController = Backbone.Router.extend({   
        routes: {
            // Static
            'about': function() {
                this.staticRoute('about');
            },

            '': function() {
                this.staticRoute('home');
            },


            // blog/posts
            'blog': function() {
                this.blogRoute();
            },            
            'b/new': function() {
                this.startNewPost();
            },            
            'b/:slug': function(slug) {
                this.blogRoute(slug);
            },

            'blog/admin': function() {
                this.loadBlogAdmin();
            },  

            'login': function() {
                this.authRoute('auth', 'login');
            },
            'register': function() {
                this.authRoute('auth', 'register');
            },            

            'support': function() {
                this.staticRoute('support');
            },         

            // // Others

            // default behavior for root slugs if we do not have
            // a dynamically added route (eg if user refreshes, loses Backbone.History, and
            // then traverses their browser history)

            // '@:slug': function(slug) {
            //     this.userRoute({ slug: slug });
            // },

            ':slug': function() {
                this.notFound();
            },

            // ':slug/:subType': function(slug, subType) {
            //     this.staticRoute(slug, subType);
            // },

            // ':type/:hash': 'loadNameHash',
        },

        current : function() {
            var Router = this,
                fragment = Backbone.history.fragment,
                routes = _.pairs(Router.routes),
                route = null, params = null, matched;

            matched = _.find(routes, function(handler) {
                route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
                return route.test(fragment);
            });

            if(matched) {
                // NEW: Extracts the params using the internal
                // function _extractParameters 
                params = Router._extractParameters(route, fragment);
                route = matched[1];
            }

            return {
                route : route,
                fragment : fragment,
                params : params
            };
        },

        initialize: function(options) {
            this.controllers = {};
            this.pageHistory = {};
            // use this object to keep track of dynamically added routes (see this.LinkCatcher)
            this.slugRoutes = {};

            this.view = new PageControllerView();
            this.activeController = null;
            var oldLoadUrl = Backbone.history.loadUrl, self = this;

            Backbone.history.loadUrl = function(fragmentOverride) {
                this.fragment = this.getFragment(fragmentOverride);
                if (self.activeController && self.activeController.isDirty && self.activeController.isDirty()) {
                    var dialog = confirm("Watch out! Any unsaved changes will be lost when you leave.");
                }
                return oldLoadUrl.apply(this, arguments);
            };

            this.listenTo(this.view, 'renderdone', function(cid, $el) {
                this.trigger('pageChangeRenderDone', $el, cid);
                this.trigger('renderdone-'+cid, $el);
            });

            this.listenToOnce(app.vent, 'loggedOut', function() {
                window.location.href = '/';
                                location.reload(true);
            });                           

     
            this.listenTo(app.vent, 'stateReady', function() {
                console.log('state is ready, says here')
                // we have parsed stored state; ready to load views, nav               
                Backbone.history.start({
                    pushState: true,
                    root: '/',
                    silent: true,
                    hashChange: false
                });

                // assuming hard page load; reroute the current page
                Backbone.history.loadUrl();
                this.setupTopNav();
            });
        },

        setupTopNav: function() {            
            var navController = this.controllers['NavController'];
            if(!navController) {
                var navController = new NavController({});
            } 
            // navController.startNewConv();            
        },        

        checkHash: function(hash) {
            return $.ajax({
                url: '/decode/' + hash
            });
        },

        route: function(route, name, callback) {
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if(!callback) { callback = this[name]; }
            var self = this,
                injectedCallback = function() {
                    callback && callback.apply(self, arguments);
                };
            
            Backbone.Router.prototype.route.call(this, route, name, injectedCallback);
        },

        toggleProgress: function(show) {
            if(show) {
                this.view.showProgress();
            } else {
                this.view.hideProgress();
            }
        },

        registerController: function(options) {
            var controller = options.controller || null;
            var activate = options.activate || false;

            //controller call this to register itself with PC
            if (controller.id && !this.controllers[controller.id]) {
                if(activate) {
                    if (!this.activeController) {
                        // no active controller; assume hard page refresh
                        app.navScrollWatch();
                    }
                    controller.active = true;
                    this.activeController = controller;
                }
                this.controllers[controller.id] = controller;
                this.listenTo(controller, 'pageLoading', function() {   
                    this.view.showProgress();
                });
                this.listenTo(controller, 'pageChange', this._pageChangeHandler);
            }
        },

        _pageChangeHandler: function(controller, $el, href, _options) {
            var options = _options || {},
                cid = controller.id;
            //determine if $el is already visible, if not, push it into the render stack
            this.view.pushToPageStack(controller.id, $el, options.doNotTrack);

            if(this.activeController) {
                this.activeController.active = false;
                if (this.activeController.id !== controller.id) {
                    this.trigger('closeDown-' + this.activeController.id);
                } 
            }
            // app.checkNotifications();
            controller.active = true;
            this.activeController = controller;
            if(href) {
                // Backbone.history.navigate(target.data('navigate'), true);
                // this.navigate(href, {trigger: options.trigger, replace: false});//update url
            }
            $(window).off();
        },

        registerEventBroadcast: function(events, controller) {
            var passThroughHandler = function(evt) {
                //use this to avoid the function in a loop closure trap
                return function() {
                    var argumentsArr = Array.prototype.slice.call(arguments),
                        args = [evt].concat(argumentsArr);
                    this.trigger.apply(this, args); //Broadcast!
                };
            };
            for(var i=0, l=events.length, evt ; i < l ; ++i) {
                evt = events[i];
                this.listenTo(controller, evt, passThroughHandler(evt));
            }
        },

        getPageHistory: function(key) {
            if (this.pageHistory && this.pageHistory[key]) {
                return this.pageHistory[key];
            }
            return [];
        },

        passThrough: function() {
            //noop
            window.location.reload();
        },

        startNewConv: function() {
            var convController = this.controllers['ConvController'];
            if(!convController) {
                convController = new ConvController({});
            } 
            convController.startNewConv();
        },

        loadConversation: function(id) {
            id = id || 'new';
            var convController = this.controllers['ConvController'];
            if(!convController) {
                convController = new ConvController();
            } 
            convController.loadConvFromId(id);
        },

        loadConvWithPost: function(convHash, postHash) {
            var self = this;
            this.decodeConvPostHash(convHash, postHash).done(function(response) {
                var convId = response.convId;
                var postIndex = response.postIndex;
                self.loadConversation({ id: convId, hash: convHash, postHash: postHash, postIndex: postIndex });
            });
        },

        loadNameHash: function(hash) {
            var self = this;
            this.checkHash(hash).done(function(response) {
                var type = RESOURCETYPE[response.object_type],
                    id = response.object_id;
                switch(type) {                     
                    case 'link':
                        self.loadLink({ id: id, hash: hash });
                    break;
                    case 'conversation':
                        self.loadConversation({ id: id, hash: hash });
                    break;
                }
            });
        },

        notFound: function() {
            this.staticRoute('error', '404');
        },

        authRoute: function(authMode) {
            var authController = this.controllers['AuthController'];
            if(!authController) {
                authController = new AuthController();
            }
            authController.loadAuthView({ authMode: authMode });              
        },

        loadAuthModal: function(authMode) {
            var authController = this.controllers['AuthController'];
            if(!authController) {
                authController = new AuthController();
            }
            authController.loadAuthView({ useModal: true, authMode: authMode });              
        }, 

        swapInAuthPane: function($authEl) {
            var authController = this.controllers['AuthController'];
            if(!authController) {
                authController = new AuthController();
            }
            authController.loadAuthView({ inlineSwap: $authEl, inline: true });
        },

        staticRoute: function(viewType, subType) {
            var subType = subType || '';
            var viewType = viewType || '';
            var staticController = this.controllers['StaticController'];
            if(!staticController) {
                staticController = new StaticController();
            }
            staticController.loadStaticView({ viewType: viewType, subType: subType });        
        },     

        unregisterController: function(controller) {
            if (controller.id && this.controllers[controller.id]) {
                this.stopListening(controller);
                this.controllers[controller.id] = null;
            }
        },

        hashChange : function(evt) {
            //http://mikeygee.com/blog/backbone.html
            if(this.cancelNavigate) { // cancel out if just reverting the URL
                evt.stopImmediatePropagation();
                this.cancelNavigate = false;
                return;
            }
            if(this.activeController && this.activeController.isDirty && this.activeController.isDirty()) {
                var dialog = confirm("Any unsaved changes will be lost.");
                if(dialog === true)
                    return;
                else {
                    evt.stopImmediatePropagation();
                    this.cancelNavigate = true;
                    window.location.href = evt.originalEvent.oldURL;
                }
            }
        },

        userRoute: function(options) {
            var userController = this.controllers['UserController'];
            if(!userController) {
                userController = new UserController();
            } 
            userController.loadUserFromSlug(options)
        },

        beforeUnload: function(e) {
            if(this.activeController && this.activeController.isDirty && this.activeController.isDirty()) {
                return 'Any unsaved changes will be lost if you leave or reload this page.';
            }
        }      

    });
    return PageController;
});