// TouchDetect
define([
    'app'
], function(
    app
) {
    'use strict';
    var touchDetect = {
        initialize: function(options) {
            this.setupListeners();
        },
        
        setupListeners: function() {
            var listenForMouse = function() {
                // make this true to remove it once invoked (ie to run once)       
                window.addEventListener('mousemove', detectMouse, false );            
            };
            var listenForTouch = function() {
                window.addEventListener('touchstart', detectTouch, false);                        
            };

            var detectMouse = function() {
                var htmlEl = document.getElementsByTagName( 'html' )[0]; 
                htmlEl.classList.remove('touch'); 
                htmlEl.classList.add('no-touch');
                
                // add global app variable
                app.hasTouch = false;
                window.removeEventListener('mousemove', detectMouse, false);
                listenForTouch();
            };

            var detectTouch = function() {
                var htmlEl = document.getElementsByTagName( 'html' )[0]; 
                htmlEl.classList.remove('no-touch');
                htmlEl.classList.add('touch'); 
             
                // add global app variable
                app.hasTouch = true;
                window.removeEventListener('touchstart', detectTouch, false);
                listenForMouse();
            };

            // kickoff both
            listenForTouch();
            listenForMouse();

        },
    };
    return touchDetect;
});