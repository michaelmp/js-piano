// Generated on 2014-12-28 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var pkg = grunt.file.readJSON( 'package.json'  );

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        jsdoc : {
            dist : {
                src: ['app/**/*.js', 'backedn/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },

            js: {
                files: ['<%= yeoman.app %>/scripts/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                //files: ['<%= yeoman.app %>/{,*/}*.{scss,sass}'],
                files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            proxies: [
                {
                    context: '/backend',
                    host: '127.0.0.1',
                    port: 3000,
                    https: false,
                    xforward: false
                }
            ],
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect ) {
                        return [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {

            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/**/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/spec/.jshintrc'
                },
                src: ['test/spec/**/*.js']
            },
            'backend': {
                options: {
                    jshintrc: 'backend/.jshintrc'
                },
                src: ['backend/**/*.js']
            },
            'backendTest' : {
                options: {
                    jahintrc: 'test/backend/.jshintrc'
                },
                src: ['test/backend/**/*.js']
            }
        },


        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath: /\.\.\//
            },
            sass: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: './bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
        jscpd:{
            all: {
                path: 'app',
                output: 'dev/jscpd.output.txt',
                threshold: 1
            }
        },
        'jscpdreporter': {
            options: {
                sourcefile: 'dev/jscpd.output.txt',
                outputDir: 'dev/jscpd-report/'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        '**/*.html',
                        'images/**/*.{webp}',
                        'fonts/**/*',
                        'mocks/**/*',
                        '!bower_component'

                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= yeoman.dist %>'
                }, {
                    'expand' : true,
                    'cwd' : '.',
                    'src' : ['package.json','server.js', 'backend/**'],
                    'dest' : '<%= yeoman.dist %>'
                }]
            },
            artifacts : {
                expand: true,
                cwd: '<%= yeoman.dist %>',
                dest: 'artifacts',
                src: [ '*.tgz','version.json']
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        mochaTest: {
            unit: {
                options: {
                    reporter: 'xunit-file'
                },
                src: ['test/backend/**/*.spec.js']
            },
            develop: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/backend/**/*.spec.js']
            }

        },
        /*jshint camelcase: false */
        mocha_istanbul: {
            coverage: {
                'src' : 'test/backend/**/*.spec.js'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'

            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            },
            debug: {
                browsers: ['Chrome'],
                reporters: ['spec'],
                configFile: 'test/karma.conf.js',
                singleRun: false
            }
        },
        shell: {
            npmPack: {
                command: 'npm pack',
                options: {
                    execOptions: {
                        cwd : '<%= yeoman.dist %>'
                    }
                }
            },
            npmInstallDist : {
                command: 'npm install --production',
                options: {
                        execOptions: {
                            cwd: '<%= yeoman.dist %>'
                        }
                }
            }
        },
        aws:{},
        gitinfo: {},
        aws_s3: {
            options: {
                accessKeyId: '<%= aws.accessKey %>', // Use the variables
                secretAccessKey: '<%= aws.secretKey %>', // You can also use env variables
                region: '<%= aws.region %>',
                access: 'private',
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5 // 5 simultaneous downloads
            },
            release: {
                options: {
                    bucket: '<%= aws.bucket %>'
                },
                files: [
                    {dest: '<%= aws.folder %>', cwd: './artifacts' , expand:true, src:['**'],action: 'upload'}
                ]
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            //'wiredep',
            'configureProxies:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('testBackend', [
        'mochaTest:unit'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('analyze', [ 'jscpd', 'grunt-jscpd-reporter']);


    grunt.registerTask('bundle', 'A task that bundles all dependencies.', function () {
        // "package" is a reserved word so it's abbreviated to "pkg"
        var packagePath = appConfig.dist + '/package.json';
        var pkg = grunt.file.readJSON( packagePath  );
        // set the bundled dependencies to the keys of the dependencies property
        pkg.bundledDependencies = Object.keys(pkg.dependencies);
        // write back to package.json and indent with two spaces
        grunt.file.write(  packagePath , JSON.stringify(pkg, undefined, '  '));
    });


    grunt.registerTask( 'writeVersion', function(  ){
        //console.log(grunt.config.data.gitinfo.local );
        grunt.file.write( appConfig.dist + '/version.json', JSON.stringify(
            { 'version' : pkg.version, 'gitinfo' : grunt.config.data.gitinfo, timestamp : new Date().getTime(), hostname: require('os').hostname()  }
        ) );
    });

    grunt.registerTask('readS3Keys', function(){
        grunt.config.data.aws =  grunt.file.readJSON( process.env.AWS_JSON || './dev/aws-keys.json'); // Read the file
    });

    grunt.registerTask( 'release', [
        'readS3Keys',
        'aws_s3:release'
    ] );

    /**
     * builds and packs the project. the output is a tar.gz file
     */
    grunt.registerTask( 'pack' , [
        'default',
        'bundle',
        'gitinfo',
        'writeVersion',
        'shell:npmInstallDist',
        'shell:npmPack',

        'copy:artifacts'
    ] );

    grunt.registerTask('default', [
        'jshint',
        'test',
        'testBackend',
        'build'
    ]);
};
