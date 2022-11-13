// Project requirejs configuration file
//
// For more options and documentation visit:
// https://github.com/jrburke/r.js/blob/master/build/example.build.js
require.config({
    // urlArgs: "bust=" + (new Date()).getTime(),
    
    // Define where dependencies have been installed to so they can be refered
    // to in define() and require() calls by their package name rather than
    // their overly verbose path

    paths   : {
        'jquery'                    : 'lib/jquery.min', // currently 3.1.1
        'velocity'                  : 'lib/velocity.min',
        'velocityui'                : 'lib/velocity.ui.min',
        'lazysizes'                 : 'lib/lazysizes-umd.min',
        'underscore'                : 'lib/underscore',
        'backbone'                  : 'lib/backbone.min',
        'lib/handlebars'            : 'lib/handlebars-runtime.min', // runtime version
        'handlebars'                : 'lib/handlebars-packaged',
        'HbTemplates'               : 'templates',
        'dexie'                     : 'lib/dexie.min',
        'taggle'                    : 'lib/taggle',
        'lib/quill'                 : 'lib/quill.min',
        'app'                       : 'main/app'
    },    
    shim : {

        'jquery': {
            exports: ['$', 'jQuery']
        },
        
        'underscore': {
            exports: '_'
        },
            
        'highcharts': {
            exports: 'Highcharts'
        },

        'highcharts-more': {
            deps: ['highcharts'],
            exports: 'highchartsMore'
        },
        
        'backbone' : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'handlebars': {
            exports: 'Handlebars'
        },

        'HbTemplates': {
            deps: ['handlebars'],
            exports: 'HbTemplates'
        },

        'lib/quill': {
            exports: 'Quill'
        },

        'dexie': {
            exports: 'Dexie'
        },        
                        
        'velocity': {
            deps: ['jquery']
        },

        'velocityui': {
            deps: ['velocity']
        },        

        'lib/dropzone': {
            deps: []
        },

        'lazysizes': {
            deps: []
        },

        'lib/includePolyfill': {            
        },
              
        'lib/json2': {
            deps: []
        },

        'helpers/jquery.placeholder': {
            deps: ['jquery']
        },

        'helpers/jquery.dynamicButtonHelper': {
            deps: ['jquery']
        },
        
        'dropdown': {
            deps: ['jquery']
        },
        
        'modal': {
            deps: ['jquery']
        },
                       

    }

    // Directory where our optimized files will be compiled to:
    // {{STATIC_URL}}/compiled/js/
    // dir     : "./static/compiled/js/",

});