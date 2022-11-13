//PagingCollection
define([
    'jquery',
    'underscore',
    'backbone'
], function(
    $,
    _,
    Backbone
) {
    'use strict';
    var PagingCollection = {};
    PagingCollection.collection = Backbone.Collection.extend({

        model: Backbone.Model,

        initialize: function(data, options) {
            var _options = options || {};
            this.options = _options;
            if(_options.urlRoot) {
                this.urlRoot = _options.urlRoot;
            }
            if(_options.nextUrl) {
                this.nextUrl = _options.nextUrl;
            }
            this.indexPaging = _options.indexPaging || false;
            this.index = null;
            this.validateUnique = _options.validateUnique || false;
            this.pageSize = this.pageSize || _options.pageSize || 20;
            this.currentPageNo = _options.startPage || 1;
            this.bottomed = !!_options.bottomed;
            this.postFetch = this.options.postFetch || true;
        },

        getModelsAtPage: function(pageNo) {
            pageNo = pageNo || this.currentPageNo;
            var start = pageNo * this.pageSize;
            var end = start + this.pageSize;
            return this.slice(start, end);
        },

        getJSONAtPage: function(pageNo) {
            // fetch a single, specific page (usually the first page)
            pageNo = pageNo || this.currentPageNo;
            var models = this.getModelsAtPage(pageNo);
            return _(models).map(function(model) {
                return model.toJSON();
            });
        },

        getLastPageNo: function() {
            return (this.length / this.pageSize) - 1
        },

        url: function(atPage) {
            atPage = atPage || this.currentPageNo;
            var returnUrl = this.urlRoot, querySym, offset=0;

            if(this.nextUrl) {
                returnUrl = this.nextUrl;
            } else {
                querySym = '?';
                if(returnUrl.indexOf('?') && returnUrl.indexOf('?') > -1) {
                    querySym = '&';
                }
                if(atPage > 0) {
                    returnUrl = returnUrl + querySym + 'page=' + (atPage);
                }
            }
            return returnUrl.replace('/?', '?').replace('/&', '&');
        },

        allReset: function(options) {
            var _options = _.extend({reset: true}, options);
            this.currentPageNo = 0;
            this.bottomed = false;
            return this.fetch(_options);
        },

        getCurrentPageNo: function() {
            return this.currentPageNo;
        },

        incrementPageNo: function() {
            ++this.currentPageNo;
        },

        parse: function(attr) {
            var self = this;
            var objects = attr;

            if (this.validateUnique) {
                console.log('validating unique')
                var ids = this.pluck('id');
                var objs = [];
                _(attr.results).each(function(item) {   
                    console.log(item);            
                    if (!_.contains(ids, item.id)) {
                        // this is OK to add
                        objs.unshift(item);
                    }
                });

                if (objs && objs.length) {
                    attr.results = objs;
                    } else { 
                        attr.results = null;
                    }
            }

            if(attr.meta) {
                this.nextUrl = attr.meta.next;
                this.prevUrl = attr.meta.previous;
                this.pageSize = attr.meta.limit;
                this.offset = attr.meta.offset;
                this.totalCount = attr.meta.totalCount;
                if(!attr.meta.next) {
                    this.bottomed = true;
                }
                if(!this.offset) {
                    this.currentPageNo = 1;
                } else {
                    // this.currentPageNo = this.offset / this.pageSize;
                    this.currentBottomPageNo = this.offset / this.pageSize;
                }
            }
            if(attr.results) {
                objects = attr.results;
            } else {
                return attr;
            }
            return objects;
        }

    });
    return PagingCollection;
});