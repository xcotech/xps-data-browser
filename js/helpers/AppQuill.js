// AppQuill
define([
    'jquery',
    'backbone',
    'underscore',
    'app',
    'lib/quill'    
    ],
function($,
    Backbone,
    _,
    app,
    Quill
) {
    'use strict';
    var AppQuill = {

        getEditor   : function(options) {
            var self = this;
            this.options = options || {};
            this.$el = options.el;
            this.toolbar = options.toolbar || null;

            this.disableReturn = options.disableReturn || false;
            this.submitOnReturn = options.submitOnReturn || false;
            this.wordCount = options.wordCount || null;
            this.theme = options.theme || null;
            this.placeholder = options.placeholder || $(this.$el).data('placeholder') || 'Type your text';
            this.editor = null;
            this.$el.setAttribute('spellcheck', false);
            
            // set up a new global Editor if necessary
            if(!app.Editor) {
                this.extendQuill(); // creates a new app.Editor object
            } 
            
            var Delta = app.Editor.import('delta');
            var attrs = { // universal settings
                disableSpellcheck: true,
                placeholder: this.placeholder,
                model: options.model || null
            };

            attrs.formats = ['bold', 'italic', 'strike', 'underline', 'blockquote', 'iframe', 'link', 'bullet', 'list', 'image', 'video', 'figure'];

            var editorInstance = new app.Editor(this.$el, attrs);

            editorInstance.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
                console.log('triggering embedPaste!')
                let parsedHtml = $.parseHTML(node)
                console.log(parsedHtml[0])
                app.vent.trigger('embedPaste', node, delta);
                    return new Delta();
                    // return delta.compose(new Delta().retain(delta.length(), { color: "red" }));
            });
        

            if(this.disableReturn) {                
                editorInstance.keyboard.bindings[13] = void 0;
                editorInstance.keyboard.bindings[9] = void 0;    

                // disable Tab
                editorInstance.keyboard.addBinding({
                  key: 9,
                  handler: function(range, context) {
                    editorInstance.blur();
                  }
                });

                // submit on return
                if(this.submitOnReturn) {
                    editorInstance.keyboard.addBinding({
                      key: 13,
                      handler: function(range, context) {
                        var $formWrapper = $(editorInstance.container).closest('.formWrapper');
                        $formWrapper.find('.formSubmit').click();
                        editorInstance.blur();
                        return;
                      }
                    });
                } else {
                    editorInstance.keyboard.addBinding({
                        key: 13,
                        handler: function(range, context) {                    
                            return;
                        }
                    }); 
                }                                             
            } else {
                // if this is a modified enter keypress, fire a submitEvent, see if anyone's listening
                editorInstance.keyboard.bindings[13] = void 0;
                editorInstance.keyboard.addBinding({
                  key: 13,
                  metaKey: true,
                  handler: function(range, context) {
                    app.vent.trigger('submitEvent');
                  }
                });           
            }


            // editorInstance.clipboard.addMatcher('blockquote', function(node, delta) {
            //     // look for pasted links, embed if possible
            //     // blockquote class="twitter-tweet"
            //     let blockquoteTypes = ['twitter-tweet'];
            //     let clz = node.attributes['class'];
            //     console.log(clz)
            //     console.log('hey there')
            //     // if (node.classList.contains('twitter-tweet')) {
            //     //     console.log('that is a tweet, no?')
            //     // }
                
            //     console.log('pasting a thing?')
                
            //     if (node.data!="asdfa") {
            //         return delta;
            //     } else { console.log('that was asdfa')}

            //     // $checkLink.done(function(response) {
            //     //     let range = editorInstance.getSelection(); 
            //     //     let embedValue = response;
            //     //     editorInstance.insertEmbed(range.index,"figure", embedValue);
            //     // });
            //     return new Delta(); // return an empty delta because we will insert an embed/link (insetEmbed) after we fetch from the server              

            // }); 


            return editorInstance;
        },

        extendQuill: function() {
            app.Editor = Quill;
            let Inline = app.Editor.import('blots/inline');
            let Block = app.Editor.import('blots/block');
            let BlockEmbed = app.Editor.import('blots/block/embed');

            // class LinkBlot extends Inline {
            //   static create(url) {
            //     let node = super.create();
            //     node.setAttribute('href', url);
            //     node.setAttribute('target', '_blank');
            //     return node;
            //   }
              
            //   static formats(node) {
            //     return node.getAttribute('href');
            //   }
            // }
            // LinkBlot.blotName = 'link';
            // LinkBlot.tagName = 'a';

            class Figure extends BlockEmbed {
              static create(value) {
                console.log('create')

                let node = super.create();

                if (value.html) {
                    node.innerHTML = value.html;
                    node.setAttribute('data-post-ref', value.ref);                    
                    node.setAttribute('contenteditable', false);
                    node.setAttribute('unselectable', 'on');                    
                    // node.setAttribute('data-pppppppppppppppppppppp', 'zilch')

                } 
                return node
              }
              
            static value(node) {
                if (node.innerHTML) {
                    return { 
                        html: node.innerHTML,
                        ref: node.getAttribute('data-post-ref')
                    }
                }
                return node

              }
                            
              format(name, value) {
                if (name === 'height' || name === 'width') {
                  if (value) {
                    this.domNode.setAttribute(name, value);
                  } else {
                    this.domNode.removeAttribute(name, value);
                  }
                } else {
                  super.format(name, value);
                }
              }
            }

            Figure.blotName = 'figure';
            // Figure.className = 'app-embed';
            Figure.tagName = 'figure';
            app.Editor.register('formats/figure', Figure);


        }
     

    };
    return AppQuill;
});