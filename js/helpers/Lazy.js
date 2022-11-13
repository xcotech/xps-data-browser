// Lazy loader helper
define([
    'jquery',
    'underscore',
    'lib/includePolyfill' // no exports
    ], 
    function($, _) {
    'use strict';
    
    var Lazy = function(options) {
        var self = this,
            _options = {};
        this.options = _options = $.extend({
            url: '.',
            delay: 200,            
            dataType: 'json',
            id: new Date().getTime() + 'lazy'
        }, options);

        this.collection = this.options.collection;
        this.startingPageNo = this.pageNo;
        this.currentTopPageNo = this.currentBottomPageNo = this.startingPageNo = this.pageNo = this.collection.getCurrentPageNo();
        this.suspended = false;
        this.contentContainer = this.options.contentContainer;
        this.fetchingTop = this.fetchingBottom = false; // directional fetch semaphore
        this.reachedBottom = this.reachedTop = false;
        if(this.startingPageNo < 2) {
            // this.reachedTop = true;
        } 
        this.renderRepeatCount = 0;
        this.scrollWatch = this.options.scrollWatch || $(window);
        this.threshold = this.options.threshold || 200; // px
        if(_options.manual) {}

        // } else if(this.pageNo !== 0) {
        //     this.bindScroll();
        // } 
    };
    
    Lazy.prototype.bindScroll = function() {
        var self = this;
        this.detectScroll(); //run it once manually, in case the scroll container requires no scroll i.e. big screen
        $(this.scrollWatch).off('scroll.lazyload'+this.options.id).on('scroll.lazyload'+this.options.id, _.debounce(function(){
            self.detectScroll();
        }, this.options.delay));
    };
    
    Lazy.prototype.suspend = function() {
        this.suspended = true;
        $(this.scrollWatch).off('scroll.lazyload'+this.options.id);
    };
    
    Lazy.prototype.resume = function() {
        this.suspended = false;
        if(!this.options.semiautomatic) {
            this.bindScroll();
        }
    };

    Lazy.prototype.appendLoader = function() {        
        var loader = '<div class="scrib-loader block scribLoader"><div class="loader"><div class="loader__figure"></div></div></div>';
        this.contentContainer && this.contentContainer.append(loader);
    };

    Lazy.prototype.detectScroll = function() {
        var self = this;
        var scrollTop = $(this.scrollWatch).scrollTop();

        if(!self.reachedBottom) {
            var apex = $(this.scrollWatch).scrollTop() + $(this.scrollWatch).outerHeight() + this.threshold;
            if(apex >= $(this.contentContainer).outerHeight()) {
                if(!this.fetching) {
                    this.fetching = true;
                    this.fetchNextPage('bottom');
                }
            }
        }

        if(!self.reachedTop) {
            var upwardApex = $(this.options.scrollWatch).scrollTop() + this.threshold;
            if(upwardApex <= this.threshold) {
                this.fetchNextPage('top');
            }
        } else {
        }
    };

    Lazy.prototype.fetchNextPage = function(direction) {
        direction = direction || 'bottom';
        var self = this;
        var renderContext = this.options.renderContext || this;

        var _collectionFetch = function() {
            self.appendLoader();
            self.collection.fetch({
                direction: direction,
                reset: false,
                remove: false,
                data: self.options.data || null,
                success: function(collection, response) {
                    self.fetching = false;
                    if(!response.objects) {
                        self.onFetchError(direction, arguments);
                        return;
                    }
                    if(response.objects.length < collection.pageSize) {
                        self.reachedTheEnd(direction);
                    }                 
                    if(self.options.render && typeof self.options.render === 'function') {
                        self.options.render.call(renderContext, response);
                    }            
                    if(self.options.success && typeof self.options.success === 'function') {
                        self.options.success.apply(self, arguments);
                    }
                },
                error: function() {
                    self.fetching = false;
                    self.onFetchError(direction, arguments);
                }
            });

        };

        switch(direction) {
            case 'top':
                if(this.reachedTop) {
                    return;
                }
                var nextA = this.collection.indexA - this.pageSize;
                this.collection.indexB = nextA >= 0 ? nextA : 0;
                // if(this.currentTopPageNo > 1) { // this should always be true if we get this far
                //     this.currentTopPageNo -= 1;
                //     this.collection.currentPageNo = this.currentTopPageNo;
                // }      
            break;
            case 'bottom':
                if(this.reachedBottom) {
                    return;
                } 
                if (this.collection.indexPaging) {
                    this.index = this.collection.length +1;
                }
                this.currentBottomPageNo += 1;
                this.collection.currentPageNo = this.currentBottomPageNo;
            break;
        }

        if (this.options.pageCallbacks && this.options.pageCallbacks.pages.includes(this.currentBottomPageNo) && typeof self.options.pageCallbacks.callback === 'function' ) {
            self.options.pageCallbacks.callback.call(null, self.contentContainer).then(function() {
                _collectionFetch();
            });
        } else {
            _collectionFetch();
        }
    };

    Lazy.prototype.onFetchError = function(direction) {
        if(this.options.error && typeof this.options.error === 'function') {
            this.options.error.apply(this, arguments);
        }
        this.reachedTheEnd(direction);
    };

    Lazy.prototype.reachedTheEnd = function(direction) {
        direction = direction || 'bottom';
        var self = this;
        switch(direction) {
            case 'bottom':
                this.reachedBottom = true;
                this.collection.bottomed = true;
                if(this.options.bottomedCallback && typeof this.options.bottomedCallback === 'function') {
                    this.options.bottomedCallback.call(context);
                }
            break;
            case 'top':
                this.reachedTop = true;
                this.collection.topped = true;
                if(this.options.toppedCallback && typeof this.options.toppedCallback === 'function') {
                    this.options.toppedCallback.call(context);
                }                
            break;
        }    
        if(this.reachedBottom && this.reachedTop) {
            this.suspend();
        }
        
    };

    Lazy.prototype.setUrl = function(url) {
        this.url = url;
    };

    Lazy.prototype.kickOff = function() {
        this.started = true;
        this.bindScroll();
    };

    Lazy.prototype.destroy = function() {
        $(this.scrollWatch).off('.lazyload'+this.options.id);
    };
    return Lazy;
});