//app
define([
    'jquery',
    'backbone',
    'underscore',
    'velocity',//noexports
    'velocityui',//noexports
    'lib/modal', //noexports
    'lib/dropdown' //noexports
],
function(
    jQuery,
    Backbone,
    _
) {
    'use strict';
    //export app namespace
    var $ = jQuery;
    var vent = _.extend({}, Backbone.Events);
    var app = {
        initialize: _initialize,
        setupCSRF: setupCSRF,
        isIE: ((navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent) !== null))),
        convertImgToBase64: convertImgToBase64,
        parseQueryString: parseQueryString,
        throbber: '<div class="orbitalloader blue"><span class="scrib-icon spinning"></span></div>',
        throbberAlt: '<div class="orbitalloader blue"><i class="ico io-load-c io-spin"></i></div>',
        vent: vent
    };

    function parseQueryString (queryString){
        var params = {};
        if(queryString){
            _.each(
                _.map(decodeURI(queryString).split(/&|\?/g),function(el,i){
                    var aux = el.split('='), o = {};
                    if(aux.length >= 1){
                        var val = undefined;
                        if(aux.length == 2)
                            val = aux[1];
                        if(aux[0])
                            o[aux[0]] = val;
                    }
                    return o;
                }),
                function(o){
                    _.extend(params,o);
                }
            );
        }
        return params;
    };

    function convertImgToBase64 (url, callback, width, outputFormat){
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image(),
            _width = width || 1280;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var neww = (img.width >= _width)? _width : img.width, // don't make the base64 version bigger than the actual image
                newh = Math.round((img.height / img.width) * neww);
            canvas.height = newh;
            canvas.width = neww;
            ctx.drawImage(img,0,0,neww,newh);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            // Clean up
            canvas = null;
        };
        img.src = url;
    };

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function setupCSRF(csrf) {
        if (!csrf) {
            csrf = getCookie('csrftoken')
            if (!csrf) { return; }
        }

        var oldSync = Backbone.sync;
        Backbone.sync = function(method, model, options) {
            options.beforeSend = function(xhr){
                xhr.setRequestHeader('X-CSRFToken', csrf);
            };
            return oldSync(method, model, options);
        };
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                    // Send the token to same-origin, relative URLs only.
                    // Send the token only if the method warrants CSRF protection
                    // Using the CSRFToken value acquired earlier
                    // var token = app.getCookie('csrftoken');
                    xhr.setRequestHeader('X-CSRFToken', csrf);
                }
            }
        });
        app.csrf = csrf;
    }
    
    function _initialize(options) {
        //*** Initial settings, including csrf, user, language ***
        var csrf;
        options = options || {};

        app.staticUrl = options.dev ? 'staticURLDev' : 'staticURLProd'

        console.log('app.staticUrl is ' + app.staticUrl)

        app.login = options.login;
        app.dev = options.dev || false;
        app.language = options.language || 'en';

        if(options && options.csrf_token) {
            csrf = options.csrf_token;
        } else {
            csrf = $('meta[name="csrftoken"]').attr('content');
        }
        if(csrf) {
            setupCSRF(csrf);
        }

        // general js shortcuts
        if (!Array.prototype.last){
            Array.prototype.last = function(){
                return this[this.length - 1];
            };
        };

        // background image listener for core img lazyloader
        document.addEventListener('lazybeforeunveil', function(e){
            var bg = e.target.getAttribute('data-bg');
            if(bg){
                e.target.style.backgroundImage = 'url(' + bg + ')';
            }
        });

        // Backbone Views extensions 
        // Override Backbone's toJSON function to recursively stringify, including child models
        // Backbone.Model.prototype.toJSON = function() {
        //   var json = _.clone(this.attributes);
        //   for(var attr in json) {
        //     if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
        //       json[attr] = json[attr].toJSON();   
        //     }
        //   }
        //   return json;
        // };

        Backbone.View = Backbone.View.extend({
            // specify touch and non-touch events
            authRequired: false,
            events: function() {
                var _extended;
                if (app.hasTouch) {
                    _extended = {
                        'touchstart.actionBouncer [data-actionbind]': 'actionBouncer'
                    };
                } else {
                    _extended = {
                        'click.actionBouncer [data-actionbind]': 'actionBouncer'
                    };
                }
                return _extended;
            },
            actionBouncer: function actionBouncer(e) {
                var $ctarget = $(e.currentTarget),
                    targetData = $ctarget.data(),
                    action = targetData.action;
                if(targetData.keepDefault === undefined) {
                    e.preventDefault();
                }
                if(action && this[action] && typeof this[action] === 'function') {
                    if(targetData.continuePropagate === undefined){
                        e.stopPropagation();
                    }
                    this[action].call(this, e);
                    return true;
                }
            },
            destroy: function() {
                this.stopListening(app.vent);
                this.unbind(); // Unbind all local event bindings  
                this.stopListening();
                this.undelegateEvents();
                this.trigger('destroy');                
            }
        });
        // TODO: allow json objects to be stored directly with $.cookie api 
        // https://github.com/js-cookie/js-cookie
    }
    _.extend(app, Backbone.Events);
    return app;
});