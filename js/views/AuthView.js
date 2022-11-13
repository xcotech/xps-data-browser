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
    var AuthView = Backbone.View.extend({

        events: function() {
            var _extended, _base = {
                'submit .authForm': 'submitForm',
                'keyup .loginPassword': 'passwordKeyup'
            };
            if (app.hasTouch) {
                _extended = {
                    'touchstart .authError': 'clearErrors',
                    'touchstart .apiOption': 'selectApi',
                };
            } else {
                _extended = {
                    'click .authError': 'clearErrors',
                    'click .apiOption': 'selectApi',
                };
            }
            return _.extend(_base, _extended, _.result(Backbone.View.prototype, 'events'));
        },         

        initialize: function(options) {
            var self = this;
            this.options = options || {};

            this.inlineSwap = this.options.inlineSwap || null;

            this.loginEnabled = app.login || false;
            this.authMode = this.options.authMode || 'login';
            this.resetKey = this.options.resetKey || null;
         
            this.authTmplPromise = app.templateLoader.getTemplate('auth-pane', ['auth-form']);
            this.authFormTmpl = app.templateLoader.getTemplate('auth-form', ['api-select']);

            this.setElement($('.authContainer'));
        },

        render: function() {
            var self = this;
            console.log('hey')
            var context = app.state.toJSON();
            var $authPaneHtml;
            
            this.authTmplPromise.done(function(tmpl) {
                $authPaneHtml = $(tmpl(context));
                self.$el.html($authPaneHtml);
                $authPaneHtml.velocity('stop', true).velocity('transition.slideUpBigIn', 180);
                self.renderForm();
            });
        },      

        getText: function() {
            return this._textStrings[this.authMode];
        },

        // renderApi: function() {
        //     console.log('rendering the api block');
        //     var context = app.state.toJSON();
        //     console.log(context);
        //     var $apiContainer = $('.apiSelectContainer');
        //     var $apiDef = $('.apiDef');
        //     app.templateLoader.getTemplate('api-select').done(function(tmpl) {
        //         var $html = $(tmpl(context));
        //         $apiContainer.html($html);
        //     });            
        // },

        selectApi: function(e) {
            console.log('--- setting API')
            app.selectApi(e);
        },        

        renderForm: function() {
                        console.log('dev?' + app.dev)
            var self = this;
            var socialOptions = this.authMode == 'login' || this.authMode == 'register' ? true : false;

            // get a translations object
            var translations = this.getText();

            var context = _.extend(app.state.toJSON(), {csrf: app.csrf, dev: app.dev}, translations);
            context[this.authMode + 'Mode'] = true;         

            this.formContainer = this.$el.find('.formContainer');

            this.authFormTmpl.done(function(tmpl) {
                var $authForm = $(tmpl(context));
                if(self.inlineSwap) {
                    self.swappedContent.hide();
                }
                self.formContainer.html($authForm);
                self.formContainer.velocity('stop', true).velocity('transition.slideUpIn', 200);
                self.$('input, textarea').placeholder();
            });
        },

        changeMode: function(e) {
            var target = $(e.currentTarget);
            var targetMode = target.data('target');
            if (targetMode == this.authMode) {
                return; // no change
            }
            this.authMode = targetMode;
            this.renderForm();
        },   

        clearErrors: function() {
            var $authError = this.$('.authError')
            $authError.velocity('transition.fadeOut', 140);            
            var wait = setTimeout(function() { 
                $authError.html('');
            }, 140);
        },

        _validateForm: function(formData) {
            var self = this;
            var formValidPromise = new Promise(function(resolve, reject) {   
                switch(self.authMode) {
                    case 'login':
                        if (!formData.username) {
                            self.renderFormError(self._textStrings[self.authMode].validation.usernameEmpty);
                            return resolve(false);
                        }   
                        if (!formData.password) {
                            self.renderFormError(self._textStrings[self.authMode].validation.pwEmpty);
                            return resolve(false);
                        }
                    break;
                    case 'resetWithKey':           
                        if (!formData.password) {
                            self.renderFormError(self._textStrings[self.authMode].validation.pwEmpty);
                            return resolve(false);
                        }
                        if (formData.password != formData.password2) {
                            self.renderFormError(self._textStrings[self.authMode].validation.pwMatch);
                            return resolve(false);
                        }
                    break;
                    case 'forgot':                        
                        if (!formData.username) {
                            self.renderFormError(self._textStrings[self.authMode].validation.empty);
                            return resolve(false);
                        }                                              
                    break;
                    // case 'register':
                    //     self.ajaxValidation(formData.username).done(function(valid) {
                    //         if (!valid) {
                    //             self.renderFormError(self._textStrings[self.authMode].validation.notFound);
                    //             return resolve(false);                                
                    //         }
                    //     })
                    // break;                    

                    default:
                        return resolve(true);
                    break;
                }
                return resolve(true);
            });

            return formValidPromise;            
        },

        submitForm: function(e) {
            var self = this;
            var duration = 140;
            e.preventDefault();

            var $authForm = this.$('.authForm.active');         
            var authUrl = app.getApiUrl('login');

            var $button = this.$('.authButton');
            var $authError = this.$('.authError');
            var loginMode = this.authMode || 'login';

            var $loginErrorBlock = this.$('.authErrorBlock');
            var formfields = $authForm.find('input');
            var formData = {};
            if(formfields && formfields.length) {
                for(var i=0, l=formfields.length, item ; i<l ; ++i) {
                    var field = formfields[i];
                    formData[field.name] = $(field).val();
                }
            } else {
                // no form fields?!
            }             

            $button.dynamicButton({immediateEnable: true});

            console.log(formData)
            this._validateForm(formData).then(function(response) {
                if (!response) {
                    $button && $button.dynamicButton('revert');
                    return;
                }

                $.ajax({
                    url: authUrl,
                    type: 'POST',
                    data: formData,
                    success: function(response) {
                        $button && $button.dynamicButton('revert');
                        console.log(response)
                        if(response.error) {
                            var errorMsg = self._textStrings[self.authMode].validation[response.error] || 'An error has occurred.';
                            self.renderFormError(errorMsg);
                        } else {
                            switch(self.authMode) {
                                case 'forgot':
                                    self.authMode = 'forgotDone';
                                    self.renderForm();
                                break;
                                case 'logout':
                                    app.state.unset('user');
                                    app.unsetUser();
                                    app.fireAuthPane();
                                break;
                                case 'login':                                    
                                    var userData = _.extend({"token": response.token}, response.user);
                                    app.state.setUser(userData);
                                    app.setUser(userData);
                                    // self.exit();
                                    window.location.reload();
                                break;
                            }
                        }
                    },
                    error: function(response) {
                        $button && $button.dynamicButton('revert');
                        switch(self.authMode) {
                            case 'login':
                                // status = { 'error': 'credentials' }
                                self.renderFormError(response.error);
                            break;
                            default:
                                console.log('that failed '); console.log(response);
                            break;
                        }
                    }
                });                

            });

        },

        passwordKeyup: function(e) {
            var rawString = $(e.currentTarget).text(); 
            console.log(rawString);           
            console.log(rawString.length);

            var code = e.charCode || e.keyCode || e.which;
            var valid;
            if(code === 27) {
            }
            if(code === 13) {
                console.log('enter!');
                e.preventDefault();
            }
        },

        clearFormError: function(errorType) {
            this.$('.authButton').dynamicButton('revert');
            this.$('.authError').html('');
        },

        renderFormError: function(errorMessage) {
            errorMessage = errorMessage || 'An unknown error has occurred!';
            console.log('------- about to render errorMessage: ' + errorMessage)
            console.log('<div class="inner-error innerError">' + errorMessage + '</div>')
            this.$('.authError').html('<div class="inner-error innerError">' + errorMessage + '</div>').velocity('stop', true).velocity('transition.slideDownIn', 200);
        },

        exit: function() {
            console.log('exit')
            // put the swapped content back
            var self = this;
            this.$el.velocity('stop', true).velocity('reverse', {
                    complete: function() {
                        self.trigger('closeAuthView');
                        // self.$el.html('');
                    }
                });

        },

        destroy: function() {
            Backbone.View.prototype.destroy.apply(this, arguments);
            this.$el.remove();
        },

        _textStrings: {
            forgot: {
                title: 'Submit your email address and we\'ll send you a reset link.',
                button: 'Send me a reset link',
                validation: {
                    empty: 'We could not find a matching member.'
                }                 
            },
            login: {
                title: 'Please login to continue',
                button: 'Login',
                validation: {
                    usernameEmpty: 'Don\'t forget your username.',
                    pwEmpty: 'Please enter your password to proceed.',
                    auth: 'That username/password combination does not match.',
                }                
            },
            register: {
                title: 'Welcome to XCO.',
                button: 'Create account',
            },
            forgotDone: {
                title: 'If we\'ve found a matching XCo account, we\'ll have sent you instructions to reset your password.',
            },
            resetDone: {
                title: '<div>Your password has been reset. Logging you in.</div><div class="scrib-loader block scribLoader"><div class="loader"><div class="loader__figure"></div></div></div>'
            },
            resetWithKey: {
                title: 'Enter (and then repeat) your new password',
                button: 'Submit',
                validation: {
                    pwMatch: 'Passwords do not match.',
                    pwEmpty: 'Seems you haven\'t typed a password at all.'
                } 
            }
        },

    });
    return AuthView;
});