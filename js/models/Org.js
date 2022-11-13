// Org
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

    var OrgMemberModel = Backbone.Model.extend({

        urlRoot: '',
        defaults: {
            needsFetch: true
        },

        url: function() {
            this.urlRoot = app.getApiUrl('org_member');
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

    var TeamModel = Backbone.Model.extend({

        urlRoot: '',
        defaults: {
            needsFetch: true
        },

        url: function() {
            this.urlRoot = app.getApiUrl('team');
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

    var OrgMemberCollection = PagingCollection.collection.extend({
        pageSize: 100,    
        model: OrgMemberModel,

        initialize: function(options) {
            this.urlRoot = app.getApiUrl('org_member');
            PagingCollection.collection.prototype.initialize.apply(this, arguments);
        },

          parse: function(attr) {
            // loop through incoming orgMembers and add team JSON where needed
            // assumption that we have a full app.teamCollection from app initialization
            let objects = attr;
            _(attr.results).each(function(item) {   
                if (item.teams) {
                    let teams = [];
                    _(item.teams).each(function(teamId) {
                        let teamModel = app.teamCollection.get(teamId);
                        if (teamModel) {
                            teams.push(teamModel.toJSON())
                        }
                    });
                    item.teams = teams;
                }
            });

            if(attr.results) {
                objects = attr.results;
            } else {
                return attr;
            }
            return objects;                

          }

    });

    var TeamCollection = PagingCollection.collection.extend({
        pageSize: 100,    
        model: TeamModel,

        initialize: function(options) {
            this.urlRoot = app.getApiUrl('team');
            PagingCollection.collection.prototype.initialize.apply(this, arguments);
        },
    });    

    return {
        orgMemberModel: OrgMemberModel,
        teamModel: TeamModel,
        orgMemberCollection: OrgMemberCollection,
        teamCollection: TeamCollection
    };
});