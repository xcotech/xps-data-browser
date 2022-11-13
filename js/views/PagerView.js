// PagerView
define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'models/PagingCollection',
    'helpers/Lazy'
], 
function(
    $,
    Backbone,
    _,
    app,
    PagingCollection,
    Lazy
) {
    'use strict';
    var PagerView = Backbone.View.extend({
        events: function() {
            return _.extend({
                'click .namedFilter': 'toggleNamedFilter'
            }, _.result(Backbone.View.prototype, 'events'));
        },

        initialize: function(options) {
            var self = this;
            options = options || {};

            this.scope = options.scope || null; // original calling view's scope
            this.templateName = options.templateName; // handlebars template we use to render
            this.templatePartials = options.templatePartials || [];
            this.template = app.templateLoader.getTemplate(this.templateName, this.templatePartials);
            this.search = options.search || null; // search object
            this.listName = options.name;
            this.semiAuto = options.semiAuto || false; // don't activate scrollWatch
            this.loadFirstPage = options.firstPage || true;
            this.inert = options.inert && !this.loadFirstPage || false; // do not start the 
            this.pageSize = options.pageSize || 20;
            this.threshold = options.threshold || 130;
            this.filter = options.filter || null;
            this.scrollerEl = options.scrollerEl || $(window); // scrollwatch element
            this.$list = this.$('.paginatedList'); // our inner content element
            this.$el = options.el; // always pass in an element
            this.breadcrumbsEl = options.breadcrumbsEl || null;
            this.incomingModels = options.incomingModels || null;
            this.isMod = options.isMod || false;
            this.validateUnique = options.validateUnique || false;
            this.pageCallbacks = options.pageCallbacks || null;
            this.pagerCallback = (options.pagerCallback && typeof options.pagerCallback === 'function') ? options.pagerCallback : null;
            this.paginationLinks = app.templateLoader.getTemplate('pagination-links');
            this.url = options.url || '';
            this.activeNamedFilter = options.namedFilter || '';
            this.pageTop = this.pageBottom; // split out top and bottom bounds

            if (this.search) {
                this.setupPagerSearch();
            }

            // we can pass in an existing collection or define a new one
            this.collection = options.collection || new PagingCollection.collection([], {
                urlRoot: this.url,
                pageSize: this.pageSize,
                bottomed: false,
                validateUnique: this.validateUnique
            });
            this.collection.firstPage = this.loadFirstPage;  
            this.collection.currentPageNo = options.startPage || 1;

            if (this.collection.length && !this.loadFirstPage) {
                if (this.collection.length < this.pageSize) { 
                    // no need to proceed 
                    // return; 
                }
            }

            if (this.incomingModels) {
                _(this.incomingModels).each(function(model) {
                    self.collection.add(model);
                });
                if (this.incomingModels.length < this.pageSize) {
                    // no need to proceed
                    return;
                }
            }
            this.listenTo(this.collection, 'change', function(changedModel) {
                self.updateItem(changedModel);
            })
            this.pagerStart();            
        },

        setupPagerSearch: function() {
            var self = this;

            var searchEl = this.search.el.get(0) || null; // assuming we're passed  jQuery element
            var placeholder = this.search.placeholder || 'Search'; // for search box

            this.pagerSearch && this.pagerSearch.enable(false);
            this.pagerSearch = app.getEditor({
                el: searchEl,
                disableReturn: true,
                model: self.model,
                // wordCountContainer: $wordCountContainer,
                placeholder: placeholder, 
                forceTab: true             
            });

            this.pagerSearch.on('text-change', function(delta, oldDelta, source) {
                if(source=='user') {
                    app.submitDelay(this, function() {
                        self.filterThis();
                    });
                }
            });

        },

        toggleNamedFilter: function(e) {
            var $cTarget = $(e.currentTarget);
            var filter = $cTarget.data('filter');
            if(filter==this.activeNamedFilter) {
                return;
            }
            this.activeNamedFilter = filter;
            $cTarget.addClass('active');
            $cTarget.siblings().removeClass('active');
            this.filterThis();
        },

        filterThis: function() {
            var self = this;

            var queryString;

            var connector = '?search=';
            var q = this.pagerSearch.getText().trim();
            if(q) {
                if(q==this.currentQuery) { return; }
                if(q && q.length) {
                    // q = q.toLowerCase().replace(/\s\s+/g, ' ').replace(/[^a-z\d\s]+/gi, "").trim().replace(/\s/ig, '-');    
                    queryString = connector + q
                } 
            }
            
            this.currentQuery = q;
            this.loadFirstPage = true;
            // this.$list.html('');

            this.collection.filters = (q ? queryString : q); // if empty search, we'll reset the collection url
            this.collection.allReset();
            this._fetchCollection();

        },

        _fetchCollection: function() {
            var self = this;
            this.collection.fetch({context:self.collection}).done(function() {
                if(!this.length) {
                    self.trigger('noListViewResults');                     
                } else {
                    var items = this.toJSON(); // get collection.models as JSON (usually @ page 0)
                    if(items) {
                        self.renderItems(items, true);    
                        if (items.length<this.pageSize) { return; }
                        self.setupLazyLoader();
                    } else {
                        self.trigger('noListViewResults');
                        return;
                    }                        
                    
                }
            }); 
        },

        pagerStart: function() {
            var self = this;
            var loader = '<div class="scrib-loader block scribLoader"><div class="loader"><div class="loader__figure"></div></div></div>';

            if(this.loadFirstPage) {
                // this.$list.append(loader);                
                this.collection.fetch({context:self.collection}).done(function() {
                    if(!this.length) {
                        self.trigger('noListViewResults');                     
                    } else {
                        var items = this.toJSON(); // get collection.models as JSON (usually @ page 0)
                        if(items) {
                            self.renderItems(items, true);    
                            if (items.length < self.pageSize) { return; }
                            self.setupLazyLoader();
                        } else {
                            self.trigger('noListViewResults');
                            return;
                        }                        
                        
                    }
                });                

            } else if (!this.inert) {
                this.setupLazyLoader();
            }
        },

        setupLazyLoader: function() {
            var self = this;
            var items;

            // setup the lazyloader
            this.lazyLoader = new Lazy({
                threshold: self.threshold,
                scrollWatch: self.scrollerEl,
                contentContainer: self.$list,
                id: this.cid + self.listName,
                collection: self.collection,
                pageCallbacks: self.pageCallbacks,
                // bottomedCallback: function() { self.lazyLoader && self.lazyLoader.destroy(); }
                render: function(response, direction) {
                    items = response.results || null;
                    if (!items) {
                        return;
                    }
                    self.udpateBreadcrumbs();                    
                    if(response.bottomed) {
                        return;
                    }
                    self.renderItems(items, direction);
                },
                renderContext: this
            });
            this.lazyLoader && this.lazyLoader.kickOff();           
        },

        udpateBreadcrumbs: function() {
            var self = this;
            var $links;            

            if (!this.breadcrumbsEl) { return; }
            var $next = this.breadcrumbsEl.find('.crumbNext')

            var currentPage = this.collection.currentPageNo;
            var context = {
                prevLink: (currentPage > 1 ? this.collection.url(currentPage - 1) : null),
                nextLink: (this.collection.bottomed ? null : this.collection.url(currentPage + 1))
            }
            this.paginationLinks.done(function(tmpl) {
                $links = tmpl(context);
                self.breadcrumbsEl.html($links);
            });
        },

        removeLoader: function() {
            this.$('.scribLoader').remove();
        },

        updateItem: function(changedModel) {
            // update an individual item in this.collection with fresh json
            var modelId = changedModel.id;
            var modelType = changedModel.get('contentType') || '';

            var $modelEl = this.$el.find('.pagerItem[data-id="' + modelId + '"][data-type="' + modelType + '"]');
            if ($modelEl && $modelEl.length) {            
                this.template = app.templateLoader.getTemplate(this.templateName, this.templatePartials);
                var newEl;
                this.template.done(function(tmpl) {
                    newEl = $(tmpl(changedModel.toJSON()));
                    $modelEl.replaceWith(newEl)
                });
            } else { this.pagerStart(); }
        },

        renderItems: function(items, firstpage) {
            var self = this;
            var collection = this.collection;
            firstpage = firstpage || false;
            this.removeLoader();
            var $domFrag = $(document.createDocumentFragment());
            this.template.done(function(tmpl) {
                _(items).each(function(item) {
                    if(self.isMod) { item['isMod'] = true; }
                    if (self.pagerCallback) {
                        item = self.pagerCallback.call(self.scope, item);
                    }       
                    $domFrag.append(tmpl(item));
                });
                if(firstpage) {
                    self.$list.html($domFrag);    
                } else {
                    self.$list.append($domFrag);
                }
                self.trigger('itemsRendered', items);
            });
        },

        destroy: function() {
            this.pagerSearch && this.pagerSearch.enable(false);
            this.pagerSearch = void 0;
            this.lazyLoader && this.lazyLoader.destroy();
            this.stopListening();
            this.unbind();
        }
    });
    return PagerView;
});