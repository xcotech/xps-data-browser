// template loader helper module
define(['jquery', 'handlebars', 'HbTemplates'], function($, Handlebars, HbTemplates) {
    'use strict';
    
    var _templateLoader = {
        _getSingleTemplate: function(templateName) {
            var tmplRaw,
                templateDeferred = $.Deferred();
                self = this;
            if(!HbTemplates.templates) {
                templateDeferred.resolve(false);
            } else { 
                if(HbTemplates.templates[templateName]) { // this should always be true, no?
                    //look for it in the Handlebars namespace
                    templateDeferred.resolve(HbTemplates.templates[templateName], null, templateName);
                } else if(this.requestedTemplates[templateName]) {
                    //this template has previously been requested and the ajax to grab it is pending
                    return this.requestedTemplates[templateName];
                } else {
                    templateDeferred.resolve(false);
                }
            }
            return templateDeferred.promise();
        },
       
        _getPartials: function(partials) {
            //given an array of template names, fetch each of them and register them as Handlebars partials
            var i, l, tmpPartial, partialName, partialsPromiseArr = [];
            for(i=0, l=partials.length ; i<l ; ++i) {
                partialName = partials[i];
                tmpPartial = this._getSingleTemplate(partialName);
                tmpPartial.done(this._registerPartial);
                partialsPromiseArr.push(tmpPartial);
            }
            return partialsPromiseArr;
        },

        _registerPartial: function(tmpl, html, tname) {
            Handlebars.registerPartial(tname, tmpl);
        },

        getTemplate: function(templateName, partials) { 
            //exposed API method
            if(!partials || !partials.length) {
                //if no partials are requested, just fetch the template
                return this._getSingleTemplate(templateName);
            } else {
                var templateFullyLoaded = $.Deferred(),
                templatePromiseArr;
                //grab partials first
                templatePromiseArr = this._getPartials(partials);
                //grab the main template, push the promise to the end of the promise array
                templatePromiseArr.push(this._getSingleTemplate(templateName, true));
                $.when.apply(this, templatePromiseArr).done(function() {
                    //when all promises have returned...
                    //grab the last one... it's the main template
                    var mainTemplateArg = arguments[arguments.length-1];
                    templateFullyLoaded.resolve(mainTemplateArg[0], mainTemplateArg[1], mainTemplateArg[2]);
                });
                return templateFullyLoaded.promise();
            }
        }
    };
    return _templateLoader;
});