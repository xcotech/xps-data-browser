define(['jquery', 'app'], function($, app) {
    'use strict';
    return function(ajaxObj, status, statusCode) {
        var response = ajaxObj.responseJSON, label;
        if(statusCode === 'BAD REQUEST' || ajaxObj.statusText === 'BAD REQUEST') {
            for(var key in response) {
                if(this && this.$ && this.$('label[for="id_'+key+'"]').length) {
                    label = this.$('label[for="id_'+key+'"]').text() + ': ';
                } else {
                    if (!key.match(/_/)) {
                        label = key + ': ';
                    } else {
                        label = '';
                    }
                }
                app.notify.alert({
                    msg: label + response[key],
                    //heading: 'Form Error',
                    type: 'error',
                    delay: 6000
                });
            }
        }
    };
});