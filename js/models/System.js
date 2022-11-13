// System
define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'models/PagingCollection',
], function(
    $,
    _,
    Backbone,
    app,
    PagingCollection
) {
    'use strict';

    var SystemModel = Backbone.Model.extend({

        urlRoot: '',
        defaults: {
            needsFetch: true
        },

        url: function() {
            this.urlRoot = app.getApiUrl('system');
            if (this.id) {
                return this.urlRoot + this.id + '/';
            } else {
                return this.urlRoot;
            }
        },

        // initialize: function(attrs) { 
        // },

        // validate: function(attrs) {
        // },


    });

    var SystemCollection = PagingCollection.collection.extend({
        pageSize: 20,    
        model: SystemModel,

        initialize: function(options) {
            this.urlRoot = app.getApiUrl('system');
            PagingCollection.collection.prototype.initialize.apply(this, arguments);
        },
    });

    var TagModel = Backbone.Model.extend({

        urlRoot: '',
        defaults: {
            needsFetch: true
        },

        url: function() {
            this.urlRoot = app.getApiUrl('tag');
            if (this.id) {
                return this.urlRoot + this.id + '/';
            } else {
                return this.urlRoot;
            }
        },

        // initialize: function(attrs) { 
        // },

        // validate: function(attrs) {
        // },


    });

    var SystemCollection = PagingCollection.collection.extend({
        pageSize: 20,    
        model: TagModel,

        initialize: function(options) {
            this.urlRoot = app.getApiUrl('tag');
            PagingCollection.collection.prototype.initialize.apply(this, arguments);
        },
    });    

    return {
        systemModel: SystemModel,
        systemCollection: SystemCollection
    };
});