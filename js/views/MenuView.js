define([
    'jquery',
    'backbone',
    'underscore',
    'app'
], function(
    $,
    Backbone,
    _,  
    app
    ) {
    'use strict';
    var MenuView = Backbone.View.extend({
        events: function() {
            var _extended;
            if (app.hasTouch) {
                _extended = {
                    'touchstart [data-navigate]': 'linkCatcher',
                };
            } else {
                _extended = {
                    'click [data-navigate]': 'linkCatcher',
                };
            }
            return _.extend(_extended, _.result(Backbone.View.prototype, 'events'));
        },   

        initialize: function(options) {
            options = options || {};
            // if(!app.loggedInUser) { return; } 
            this.opened = false;
            this.templatePromise = app.templateLoader.getTemplate('menu');
            this.context = options.context || {};
        },

        render: function() {
            var self = this;
            var $el;
            var $html;
            this.setElement($('.menuContainer'));
            var context = app.state.toJSON()
       
            this.closeOnClick = true;
            var size = app.getWindowSize();
            var height = size.height;
            var flickDuration = 1180; // ms

            this.drawerWidth = this.getMenuWidth();
            this.openWidth = (size.width - this.drawerWidth);

            var menuHeight = this.$('.drawerProfileActions').offsetHeight; 
            var menuHeight2 = this.$('.drawerProfileActions').height(); 

            this.templatePromise.done(function(tmpl) {
                $html = $(tmpl(context));
                self.$el.html($html);

                $('body').addClass('menuOpen');
                $('.menuToggle').addClass('open');
                self.$el.addClass('open');                

                self.$el.velocity('stop', true).velocity({ top: 0, bottom: '40%' }, {
                    duration: self.animDuration,
                    easing: [ .42, .85, .42, 1 ],
                    complete: function() {
                        self.afterRender();
                    }
                }); 

                $('.dimmer').velocity('stop', true).velocity('transition.fadeIn', {
                    duration: self.animDuration,
                    complete: function() {}
                });

                self.$('.innerMenu').velocity('stop', true).velocity('transition.slideDownIn', {
                    duration: self.animDuration,
                    complete: function() {}
                });

                app.menuOpen = true;

                document.addEventListener('keyup', function (event) {
                    if (event.defaultPrevented) {
                        return;
                    }

                    var key = event.key || event.keyCode;

                    if (key === 'Escape' || key === 'Esc' || key === 27) {
                        self.trigger('toggleMenu');
                    }
                });                


                $('.shell').on('click', function() { self.toggleMenu(); });

            });
        },


        afterRender: function() {
            var self = this;
            this.listenTo(app.vent, 'brokerStateChange', function() {
                self.renderSystemBlock()
            });       
        },

        toggleMenu: function() {
            this.trigger('toggleMenu');
        },

        closeMenu: function() {
            var self = this;            
            var size = app.getWindowSize();
            var height = size.height;
            app.menuOpen = false;

            $('.menuToggle').removeClass('open'); // remove this right away, start the button animation
            this.stopListening(app.keyWatcher);
            // document.removeEventListener('keyup');
            $('.shell').off();
            this.openWidth = (size.width - this.drawerWidth);

            $('.dimmer').velocity('stop', true).velocity('transition.fadeOut', {
                duration: self.animDuration,
                complete: function() {}
            });  

            $('.menuContainer').velocity('stop', true).velocity({ bottom: "100%", top: -600 },  {
                duration: 200,
                complete: function() {
                    self.$el.removeClass('open').html('');
                    $('body').removeClass('menuOpen');                    
                }
            })
            
        },

        getMenuWidth: function() {    
            if(app.getWindowSize().width < 480) {
                return app.getWindowSize().width; } else { return 420; }
        },     

        linkCatcher: function() {
            // this.trigger('closeMenu');
        },

        logout: function() {
            app.unsetUser();
        },

        loginModal: function() {
            this.trigger('closeMenu');
            app.fireAuthPane();
        },        

        destroy: function() {
            this.closeMenu();
            this.stopListening(app.activeBroker);
            $('.menuBackdrop').off('click');
            Backbone.View.prototype.destroy.apply(this, arguments);
        }

    });
    return MenuView;
});