// Session
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

    var SessionModel = Backbone.Model.extend({

        urlRoot: '',
        defaults: {
            needsFetch: true
        },

        url: function() {
            this.urlRoot = app.getApiUrl('session');
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

    var SessionCollection = PagingCollection.collection.extend({
        pageSize: 20,    
        model: SessionModel,

        initialize: function(options) {
            this.urlRoot = app.getApiUrl('session');
            PagingCollection.collection.prototype.initialize.apply(this, arguments);
        },
    });

    return {
        sessionModel: SessionModel,
        sessionCollection: SessionCollection
    };
});