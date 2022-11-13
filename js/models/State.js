// State
define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'dexie'
], function(
    $,
    _,
    Backbone,
    app,
    Dexie
) {
    'use strict';

    var apiOptions = {
        'dev': {
            'id': 'dev',
            'name': 'Local dev',
            'url': 'http://localhost:8000/api'
        },
        'prod': {
            'id': 'prod',
            'name': 'Production',
            'url': 'https://xps.xco.io/api'
        },                        
    };

    var StateModel = Backbone.Model.extend({
        urlRoot: '',
        url: function() {
            return this.urlRoot;
        },

        defaults: {
            time: '',
            activeView: null,
            apiEnv: apiOptions['prod']
        },

        initialize: function() {
            var self = this;
            var silent = false; // to save or not to save

            // setup local indexedDb
            app.db = new Dexie("dash_local");
            app.db.version(1).stores({
                state: 'time, view'
            });

            // get state from local storage; run our setup tasks, then emit a ready signal
            app.db.state.orderBy('time').last().then(function(storedState) {
                storedState = storedState || {};
                console.log(storedState)


                if (!storedState.time) {
                    var date = new Date();
                    storedState.time = date.getTime();
                    //  
                }

                if (storedState.user) {
                    app.setUser(storedState.user);
                }
                self.set(storedState, { silent: silent });
                
                // if (self.get('user')) {
                //     self.listenToOnce(app.vent, 'havecols', function() {
                //         app.vent.trigger('stateReady'); // wait for collections
                //     });
                // } else { app.vent.trigger('stateReady'); }
                app.vent.trigger('stateReady');
                
            });

            // we want to store all state model changes to local storage 
            // (IndexedDB); toLocalDB callback with every change
            this.listenTo(self, 'change', this.toLocalDB);
        },

        setUser: function(userData) {
            this.set('user', userData);
        },

        getApiUrl: function(path) {
            path[0] && path[0] != '/' ? (path = '/' + path) : path; // add a slash to the path if necessary
            return this.get('apiEnv').url + path;
        }, 

        setApi: function(env) {
            // define API backend to use, set to state cache
            var apiDetails = apiOptions[env];
            this.set('apiEnv', apiDetails);
            return apiDetails
        },        

        toLocalDB: function() { 
            app.db.state.put(this.attributes); // note: the state model will always have a time stamp
        },

        setAttrs: function(options) {
            this.set(options);
        },                    

    });

    return {
        model: StateModel
    };
});