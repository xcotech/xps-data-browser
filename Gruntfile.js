const sass = require('node-sass');
module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        handlebars: {
            compile: {
                options: {
                    amd: true,
                    namespace: 'HbTemplates.templates',
                    processName: function(filepath) {
                        return filepath.replace(/templates\/|\.handlebars\.html/ig, '');
                    }
                },
                files: {
                    './js/templates.js': 'templates/*.handlebars.html'
                }
            }
        },
        sass: {
            production: {
                options: {
                    implementation: sass,
                    sourceMap: true,
                    sourceMapRootpath: '/'
                },
                files: {
                    'dist/css/main.css': 'sass/main.scss'
                }
            },
            dev: {
                options: {
                    implementation: sass,
                    sourceMap: true,
                    sourceMapRootpath: '/'
                },
                files: {
                    'dist/css/main.css': 'sass/main.scss'
                }
            }
        },
        copy: {
          main: {
            files: [
              // // includes files within path and its sub-directories
              // {expand: true, src: ['path/**'], dest: 'dest/'},

              // makes all src relative to cwd
                {expand: true, cwd: 'static/', src: ['**/*'], dest: 'dist/'},
                {expand: true, faltten: true, src: ['_build/js/app.min.js'], dest: 'dist/', filter: 'isFile'},

              // // flattens results to a single level
              // {expand: true, flatten: true, src: ['_build/config.js'], dest: 'dest/', filter: 'isFile'},
            ],
          },
        },
        replace: {
          prod: {
            options: {
              patterns: [
                {
                  match: /_build\/js\/config\.js/g,
                  replacement: 'dist\/app\.min.js'
                },
                {
                  match: /dev\:true/g,
                  replacement: 'dev\:false'
                }
              ]
            },
            files: [
              {expand: true, flatten: true, src: ['index.html'], dest: '\./'}
            ]
          },
          dev: {
            options: {
              patterns: [
                {
                  match: /dist\/app\.min\.js/g,
                  replacement: '_build\/js\/config\.js',
                },
                {
                  match: /dev\:false/g,
                  replacement: 'dev\:true'
                }                
              ]
            },
            files: [
              {expand: true, flatten: true, src: ['index.html'], dest: '\./'}
            ]
          }          
        },        
        shell: {
            optimize: {
                command: 'node js/r.js -o js/build.js optimize=none'
            },            
            minify: {
                command: 'minify _build/js/config.js --out-file dist/app.min.js --mangle.keepClassName'              
            }
        },
        cacheBust: {
            taskName: {
                options: {
                    assets: ['_build/js/config.js']
                },
                src: ['index.html']
            }
        },
        watch: {
            js: {
                files: ['js/*.js', 'js/*/*.js', 'js/*/*/*.js'],
                tasks: ['copy', 'shell:optimize', 'handlebars:compile', 'sass:dev', 'copy', 'replace:dev' ],
            },
            handlebars: {
                files: ['templates/*.handlebars.html'],
                tasks: ['handlebars:compile']
            },
            sass: {
                files: ['sass/*.scss', 'sass/**/*.scss'],
                tasks: ['sass:dev']
            }
        }
    });
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    /** Grunt Tasks **/

    grunt.registerTask('indexReplace', 'indexReplace');
    grunt.registerTask('default', ['sass:dev', 'watch'], ['handlebars:compile', 'watch'], ['shell:optimize', 'watch'], []);
    grunt.registerTask('optimizeJs', ['shell:optimize']);
    grunt.registerTask('cacheBust', ['cacheBust']);
    grunt.registerTask('minifyJs', ['shell:minify']);
    grunt.registerTask('precompileHandlebars', ['handlebars:compile']);
    grunt.registerTask('makeSass', ['sass:production']);
    grunt.registerTask('build:prod', ['copy', 'sass:dev', 'handlebars:compile', 'shell:optimize', 'shell:minify', 'replace:prod' ])
    grunt.registerTask('build:dev', ['copy', 'sass:dev', 'handlebars:compile', 'shell:optimize', 'replace:dev' ])
};          





