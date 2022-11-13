//User
define([
    'jquery',
    'underscore',
    'backbone',
    'models/PagingCollection',
    'app'
], function(
    $,
    _,
    Backbone,
    PagingCollection,
    app
) {
    'use strict';

    var UserModel = Backbone.Model.extend({

        defaults: {},

        initialize: function(attrs) {
            if(attrs && attrs.slug && !attrs.resourceUri) {
                this.set({resourceUri: this.url()});
            }
        },

        url: function() {
            this.urlRoot = app.getApiUrl('org_member');
            if (this.id) {
                return this.urlRoot + this.id + '/';
            } else {
                return this.urlRoot;
            }
        },

    });
    var UserCollection = PagingCollection.collection.extend({
        pageSize: 100,    
        model: UserModel,

        initialize: function(options) {
            this.urlRoot = app.getApiUrl('org_member');
            PagingCollection.collection.prototype.initialize.apply(this, arguments);
        },
    });
    return {
        model: UserModel,
        collection: UserCollection
    };    
});