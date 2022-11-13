/* globals define */
define([
    'jquery',
    'app',
    'backbone',
    'underscore',
    'helpers/alertHandler',
    'helpers/KeyWatcher',
    'helpers/templateLoader',
    'controllers/PageController',
    'models/User',
    'models/State',
    'helpers/AppQuill',
    'helpers/MetaHandler',
    'helpers/TouchDetect',
    'HbTemplates', // noexports; precompiled hb templates
    'lazysizes', // noexports
    'helpers/jquery.placeholder',//noexports 
    'helpers/jquery.dynamicButtonHelper',//noexports 
],
function($,
    app,
    Backbone,
    _,
    alertHandler,
    KeyWatcher,
    templateLoader,
    PageController,
    User,
    State,
    AppQuill,
    metaHandler,
    touchDetect
) {
    'use strict';

    app.startTime = (new Date()).getTime();
    // instantiate a new backbone state model
    app.state = new State.model({}); 

    app.templateLoader = templateLoader;
    app.metaHandler = metaHandler.initialize();
    touchDetect.initialize();

    //doc ready
    $(function () {
        app.quill = AppQuill;
        app.keyWatcher = new KeyWatcher();
        app.notify = alertHandler.initialize();
        app.pageController = new PageController();

        // app.pageController.setupTopNav();
        
        $(window).on('beforeunload', function() {return app.pageController.beforeUnload.apply(app.pageController, arguments); });

        app.hasTouch = false;
        app.loaderSvg = '<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>';
        
        app.validateEmail = function(email) {
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return re.test(email);
        };

        app.navScrollWatch = function(options) {
            var _scrollTop = function() {
                return scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            };

            var _bindScroll = function() {    

                checkSet(_scrollTop());
                if (overlayEls && overlayEls.length) {                
                    $scrollEl.off('scroll.main').on('scroll.main', (function () {   
                        if (!busy) {
                            checkSet(_scrollTop());
                        }
                    }));
                }
            };

            options = options || {};
            var busy = false; // only accept scroll events when we're not busy
            var scrollTop, bounceHeight, subNavRelease, subNavPos;

            var $window = $(window);
            var startingScrollPos = _scrollTop();

            var $el = options.el || $('.pageContainer.activeView');
            var $scrollEl = options.scrollEl || $(window);

            // main nav
            var $navBar = $('.navBar');
            var navBar = document.getElementById('navBar');
            var navHeight = navBar.clientHeight;

            // subnav
            var subNav = document.getElementById('subNav');

            // if topnav overlaps these, navOverlay = true
            var overlayEls = $el.find('[data-nav-overlay]'); 
            // var $fadeEl = $hero.find('[data-fade]');

            // var bounceEls = document.querySelectorAll('[data-content-bounce]');
            var fadeOpacity = 1;

            var checkSet = function(scrollTop) {
                var working;
                var rawRange;
                busy = true;

                // try to get an nav-overlay element over which the navbar currently overlaps
                var currentOverlay = _.find(overlayEls, function(oEl) {
                    var elPos = oEl.getBoundingClientRect();
                    return elPos.top <= navHeight/2 && elPos.bottom >= navHeight/2;
                });

                if (currentOverlay) {
                    var luminosity = currentOverlay.getAttribute('data-nav-overlay') || 'light';
                    var oldLum = luminosity == 'dark' ? 'light' : 'dark';

                    navBar.classList.add('overlay', luminosity);
                    navBar.classList.remove(oldLum);
                } else {
                    navBar.classList.remove('overlay', luminosity);
                }

                busy = false;

            }

            // listen for signal to shut down
            this.listenToOnce(app.vent, 'stopScrollWatch', function() {
                $window.off();
            });

            _bindScroll();

        };

        app.getApiUrl = function(path) {
            var fullUrl = app.state.getApiUrl(path)
            // var fullUrl = 'https://xps.xco.io/api/' + path;

            // add a slash if necessary (if no query parameters, in particular)
            if (fullUrl[fullUrl.length - 1] != '/') {
                fullUrl = fullUrl.indexOf('?') !== -1 ? fullUrl : fullUrl + '/';
            }
            return fullUrl.replace('\/\?', '?').replace('/&', '&');
        };

        app.selectApi = function(e) {
            // e.preventDefault();
            // e.stopPropagation();
            var $target = $(e.currentTarget);
            var api = $target.data('api');
            var newApi = app.state.setApi(api);
            app.vent.trigger('apiUpdate');

            var context = app.state.toJSON();
            var $apiContainer = $('.apiSelectContainer');
            var $apiDef = $('.apiDef');
            app.templateLoader.getTemplate('api-select').done(function(tmpl) {
                var $html = $(tmpl(context));
                $apiContainer.html($html);
            });                        

        };        

        // delayed action for text-entry listeners
        app.submitDelay = function(that, callback, timeout) {
            timeout = timeout || 700; // ms
            app.delayDoneTyping && clearTimeout(app.delayDoneTyping);
            app.delayDoneTyping = setTimeout(function() { 
                callback.call(that, arguments);
            }, timeout);
        };        

        app.touchClickConfig = function() {
            // determine whether to setup a touch or click event
            return app.hasTouch ? 'touchstart' : 'click';
        };

        app.fireAuthModal = function(join) {
            join = join || false;
            app.pageController.loadAuthModal(join);
        }; 

        app.setUser = function(userData) {
            // set up users >> set up org collections >> then trigger 'ready'
            app.loggedInUser = new User.model(userData);            
            app.setAuthHeaders();
            app.vent.trigger('loginStateChange');
        };

        app.unsetUser = function() {
            // unset liu, headers, etc >> then reload
            app.loggedInUser = null;
            app.setAuthHeaders();
            app.state.unset('user');
            app.vent.trigger('loggedOut');
        };

        app.setAuthHeaders = function() {
            var oldSync = Backbone.sync;            
            if (!app.loggedInUser) {

                $.ajaxSetup({
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader('Authorization', '');
                    }
                });                

            } else {
                var authHeader = 'JWT ' + app.loggedInUser.get('token');

                Backbone.sync = function(method, model, options) {
                    options.beforeSend = function(xhr){
                        xhr.setRequestHeader('Authorization', authHeader);
                    };
                    return oldSync(method, model, options);
                };                

                $.ajaxSetup({
                    beforeSend: function(xhr, settings) {
                        xhr.setRequestHeader('Authorization', authHeader);
                    }
                });
            }
        };

        app.swapInAuthPane = function($authEl) {
            app.pageController.swapInAuthPane($authEl);
        };

        app.logMeOut = function(e) {
            var $btn = $(e.currentTarget);
            app.unsetUser();
        };

        app.selectPermalink = function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $parent = $(e.currentTarget).closest('.sharePermalink');
            var permalink = $parent.find('.link')

            // var permalink = this.$('.sharePermalink .link');
            permalink.select();
        };

        app.getWindowSize = function() {
            var size = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            return size;
        };

        app.tooltip = function(enable) {
            enable = enable || true;
        };

    });
});

