//jQuery plugin for automatically disabling a button and appending a loading spinner
// usage: $(<selector>).dynamicButton(<options>)
//options:
//           loader:    jQuery object or plain HTML string depicting a loading icon that gets pushed into the button markup
//                      default: '<i class="ico io-load-c io-spin load-indicator"></i>'
//  immediateEnable:    Boolean indicating if the loading sequence should be enabled immediately upon initialization
//                      default: false
//usable methods:
//          loading():  initialize loading and disabled state
//           revert():  revert loading and disabled state
define(['jquery'], function($) {
    'use strict';
    var defaults = {
        // loader: ' <i class="ico io-cog io-spin load-indicator"></i>',
        loader: '<span class="load-indicator"><svg class="spinner" width="20px" height="20px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="3" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></span>',
        immediateEnable: false,
        disableButtonOnLoading: true
    };
    var dynamicButtonHelper = {
        initialize: function(options) {
            var $el = this;
            this.options = options;
            if(!$el.find('.load-indicator').length) {
                $el.append(options.loader);
            }
            if(options.immediateEnable) {
                dynamicButtonHelper.loading.call(this);
            }
            $el.data('dynamicButton', true);
            this.elHeight = $el.css('line-height') || 32;
            console.log('line height is ' + this.elHeight);
            $('.load-indicator').css('line-height', this.elHeight);
            return this; //for chainability
        },
        loading: function() {
            var $el = this,
                disableButton = true;
            if(this.options) {
                disableButton = this.options.disableButtonOnLoading;
            }
            $el.addClass('loading').prop('disabled', disableButton);
            return this; //for chainability
        },
        revert: function() {
            var $el = this;
            $el.prop('disabled', false).removeClass('loading');
            $el.find('.load-indicator').remove();
            return this; //for chainability
        }
    };
    $.fn.dynamicButton = function(method) {
        var options = {};
        if(!method || typeof method==='object') {
            $.extend(options, defaults, method);
            for(var i=0,l=this.length ; i<l ; ++i) {
                dynamicButtonHelper.initialize.call(this.eq(i), options);
            }
            return this;
        } else if(dynamicButtonHelper[method] && typeof dynamicButtonHelper[method] === 'function') {
            for(var i=0,l=this.length ; i<l ; ++i) {
                dynamicButtonHelper[method].apply(this.eq(i), arguments);
            }
            return this;
        }
    };
    // jQuery plugin, no exports
});