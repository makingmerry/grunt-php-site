module.exports = function(grunt) {

  // # functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // # configurations
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    config: {
      //////////////////////////////
      // # general
      //////////////////////////////
      fullPath : 'http://localhost:8888/',
      assets   : 'assets',
      source   : 'src',
      temporary: 'tmp',
      build    : 'build',
      library  : 'lib',

      //////////////////////////////
      // # models
      //////////////////////////////
      snippetDirectory: 'snippets',

      //////////////////////////////
      // # media
      //////////////////////////////
      faviconDirectory: 'favicons',
      iconDirectory   : 'icons',
      imgDirectory    : 'images',

      //////////////////////////////
      // # css
      //////////////////////////////
      sassDirectory: 'sass',
      cssDirectory : 'stylesheets',
      fontDirectory: 'fonts',

      //////////////////////////////
      // # javascript
      //////////////////////////////
      jsDirectory: 'javascripts'
    },


    // # media
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    //////////////////////////////
    // # real favicons
    // generate favicons for various platforms
    // use interface to set properties
    // https://github.com/RealFaviconGenerator/grunt-real-favicon
    //////////////////////////////
    realFavicon: {
      favicons: {
        src : '<%= config.faviconDirectory %>/<%= config.source %>/favicon.png',
        dest: '<%= config.faviconDirectory %>/<%= config.build %>/',
        options: {
          iconsPath: '<%= config.faviconDirectory %>/<%= config.build %>/',
          html     : ['<%= config.faviconDirectory %>/<%= config.build %>/favicons.html'],
          design: {
            ios: {
              pictureAspect  : 'backgroundAndMargin',
              backgroundColor: '#ffffff',
              margin         : '14%',
              assets: {
                ios6AndPriorIcons     : false,
                ios7AndLaterIcons     : false,
                precomposedIcons      : false,
                declareOnlyDefaultIcon: true,
              },
            },
            desktopBrowser: {},
            windows: {
              pictureAspect  : 'whiteSilhouette',
              backgroundColor: '#ffffff',
              onConflict     : 'override',
              assets: {
                windows80Ie10Tile     : false,
                windows10Ie11EdgeTiles: {
                  small    : false,
                  medium   : true,
                  big      : false,
                  rectangle: false,
                },
              },
            },
            androidChrome: {
              pictureAspect: 'noChange',
              themeColor   : '#ffffff',
              manifest: {
                display    : 'standalone',
                orientation: 'notSet',
                onConflict : 'override',
                declared   : true,
              },
              assets: {
                legacyIcon: false,
                lowResolutionIcons: false,
              },
            },
            safariPinnedTab: {
              pictureAspect: 'silhouette',
              themeColor   : '#ffffff',
            },
          },
          settings: {
            scalingAlgorithm    : 'Mitchell',
            errorOnImageTooSmall: false,
          },
        },
      },
    },

    //////////////////////////////
    // # svg sprite
    // generate svg iconsheet from individual files
    //////////////////////////////
    svg_sprite: {
      icons: {
        expand : true,
        cwd    : '<%= config.iconDirectory %>/<%= config.source %>/',
        src    : ['*.svg'],
        dest   : '<%= config.iconDirectory %>/<%= config.build %>/',
        options: {
          mode: {
            symbol: {
              dest: '.',
              sprite: 'iconsheet.svg',
            },
          },
        },
      },
    },

    //////////////////////////////
    // # svg2png
    // build png fallbacks from svg
    //////////////////////////////
    svg2png: {
      icons: {
        files: [{ 
          flatten: true,
          cwd    : '<%= config.iconDirectory %>/<%= config.source %>/', 
          src    : ['*.svg'], 
          dest   : '<%= config.iconDirectory %>/<%= config.temporary %>/',
        }]
      },

      graphics: {
        files: [{ 
          flatten: true,
          cwd    : '<%= config.imgDirectory %>/<%= config.source %>/', 
          src    : ['*.svg'], 
          dest   : '<%= config.imgDirectory %>/<%= config.temporary %>/',
        }]
      },
    },

    //////////////////////////////
    // # imagemin
    // minifying image file sizes
    //////////////////////////////
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd   : '<%= config.imgDirectory %>/<%= config.source %>/',
          src   : ['*.{png,jpg,gif,}'],
          dest  : '<%= config.imgDirectory %>/<%= config.build %>/'
        }]
      },

      graphics: {
        options: {
          optimizationLevel: 3,
          svgoPlugins      : [
            { cleanupIDs      : false },
            { removeDimensions: true },
            { removeAttrs     : {
              attrs: ['fill']
            }}
          ]
        },
        files: [{
          expand: true,
          cwd   : '<%= config.imgDirectory %>/<%= config.source %>/',
          src   : ['*.{svg}'],
          dest  : '<%= config.imgDirectory %>/<%= config.build %>/'
        }]
      },

      graphicsFallback: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd   : '<%= config.imgDirectory %>/<%= config.temporary %>/',
          src   : ['*.{png,jpg,gif,}'],
          dest  : '<%= config.imgDirectory %>/<%= config.build %>/'
        }]
      },

      icons: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd   : '<%= config.iconDirectory %>/<%= config.temporary %>/',
          src   : ['*.{png,jpg,gif}'],
          dest  : '<%= config.iconDirectory %>/<%= config.build %>/'
        }]
      },

      favicons: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd   : '<%= config.faviconDirectory %>/<%= config.build %>/',
          src   : ['*.{png,jpg,gif}'],
          dest  : '<%= config.faviconDirectory %>/<%= config.build %>/'
        }]
      },
    },


    // # css
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    //////////////////////////////
    // # sass
    // compile sass to css
    //////////////////////////////
    sass: {
      dist: {
        options: {
          style  : 'expanded',
          require: 'breakpoint'
        },
        files: {
          '<%= config.cssDirectory %>/<%= config.temporary %>/style.css': '<%= config.sassDirectory %>/style.scss'
        }
      }
    },

    //////////////////////////////
    // # postcss
    // add fallbacks for rem units,
    // add vendor prefixes,
    // minify the result
    //////////////////////////////
    postcss: {
      base: {
        options: {
          map       : true,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')()
          ]
        },
        src: '<%= config.cssDirectory %>/<%= config.temporary %>/style.css',
        dest: '<%= config.cssDirectory %>/<%= config.build %>/style.css'
      },

      critical: {
        options: {
          map       : false,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')()
          ]
        },
        expand: true,
        cwd   : '<%= config.cssDirectory %>/<%= config.temporary %>/critical/',
        src   : ['**/*.css'],
        dest  : '<%= config.cssDirectory %>/<%= config.build %>/critical/'
      }
    },

    //////////////////////////////
    // # critical css
    // build critical inline stylesheets from main stylesheet
    //////////////////////////////
    criticalcss: {
      // index page template
      index: {
        options: {
          url         : '<%= config.fullPath %>',
          filename    : '<%= config.cssDirectory %>/<%= config.temporary %>/style.css',
          width       : 1280,
          height      : 720,
          outputfile  : '<%= config.cssDirectory %>/<%= config.temporary %>/critical/index.css',
          forceInclude: []
        }
      },
    },


    // # javascript
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    //////////////////////////////
    // # babel
    // transpile es2015 syntax to older standards for browser support
    //////////////////////////////
    babel: {
      options: {
        sourceMap: true,
      },
      dist: {
        files: {
          '<%= config.jsDirectory %>/<%= config.temporary %>/main.js': '<%= config.jsDirectory %>/<%= config.source %>/main.js'
        }
      }
    },

    //////////////////////////////
    // # concat
    // concatenate javascript files
    //////////////////////////////
    concat: {
      dist: {
        src: [
          // polyfills
          '<%= config.jsDirectory %>/<%= config.source %>/<%= config.library %>/picturefill.js',
          '<%= config.jsDirectory %>/<%= config.source %>/<%= config.library %>/svg4everybody.js',
          // features
          '<%= config.jsDirectory %>/<%= config.source %>/<%= config.library %>/barba.js',
          // animations
          '<%= config.jsDirectory %>/<%= config.source %>/<%= config.library %>/TweenLite.js',
          '<%= config.jsDirectory %>/<%= config.source %>/<%= config.library %>/CSSPlugin.js',
          '<%= config.jsDirectory %>/<%= config.source %>/<%= config.library %>/ScrollToPlugin.js',
          // project
          '<%= config.jsDirectory %>/<%= config.temporary %>/main.js'
        ],
        dest: '<%= config.jsDirectory %>/<%= config.temporary %>/global.js',
      },
    },




    // //////////////////////////////
    // // # jshint
    // // javascript linter
    // //////////////////////////////
    // jshint: {
    //   options: {
    //     esversion: 6
    //   },
    //   all: '<%= config.jsDirectory %>/<%= config.source %>/main.js',
    // },

    //////////////////////////////
    // # eslint
    // javascript linter
    //////////////////////////////
    eslint: {
      options: {
        configFile: '',
        rulePaths: ''
      },
      target: [
        '<%= config.jsDirectory %>/<%= config.source %>/main.js'
      ]
    },

    //////////////////////////////
    // # uglify
    // compress javscript files
    //////////////////////////////
    uglify: {
      build: {
        src : '<%= config.jsDirectory %>/<%= config.temporary %>/global.js',
        dest: '<%= config.jsDirectory %>/<%= config.build %>/global.min.js'
      }
    },


    // # core
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    //////////////////////////////
    // # copy
    // copy build files for deployment
    //////////////////////////////
    copy: {
      build: {
        expand: true,
        src   : [
          // media
          '<%= config.iconDirectory %>/<%= config.build %>/*',
          '<%= config.faviconDirectory %>/<%= config.build %>/*',
          '<%= config.imgDirectory %>/<%= config.build %>/*',
          // css
          '<%= config.cssDirectory %>/<%= config.build %>/**',
          '<%= config.fontDirectory %>/*',
          // javascript
          '<%= config.jsDirectory %>/<%= config.build %>/*',
          // models
          '<%= config.snippetDirectory %>/*.{html,php}',
          '*.{html,php}',
        ],
        dest: 'build/'
      }
    },

    //////////////////////////////
    // # watch
    // watch files for changes
    //////////////////////////////
    watch: {
      options: {
        event     : ['changed', 'added', 'deleted'],
        spawn     : false,
        livereload: {
          host: '127.0.0.1', // livereload IP
          port: 35729 // livereload port
        }
      },
      template: {
        files: ['**/*.{html,php}'],
      },
      img: {
        files: ['<%= config.imgDirectory %>/<%= config.source %>/**'],
        tasks: ['build-img'],
      },
      svgs: {
        files: ['<%= config.iconDirectory %>/<%= config.source %>/**'],
        tasks: ['build-svg'],
      },
      css: {
        files: ['<%= config.sassDirectory %>/**/*.scss'],
        tasks: ['build-base-css'],
      },
      js: {
        files: ['<%= config.jsDirectory %>/<%= config.source %>/**/*.js'],
        tasks: ['build-js'],
      },
    },
  });



  // # load plugin dependencies
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////
  // # media
  //////////////////////////////
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-real-favicon');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  //////////////////////////////
  // # css
  //////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-criticalcss');

  //////////////////////////////
  // # javascript
  //////////////////////////////
  grunt.loadNpmTasks('grunt-babel');

  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //////////////////////////////
  // # core
  //////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');



  // # tasks
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////
  // # media
  //////////////////////////////
  grunt.registerTask('build-favicons', ['realFavicon:favicons', 'imagemin:favicons']);
  grunt.registerTask('build-icons', ['svg_sprite:icons', 'svg2png:icons', 'imagemin:icons']);
  grunt.registerTask('build-graphics', ['svg2png:graphics', 'imagemin:graphics', 'imagemin:graphicsFallback']);
  grunt.registerTask('build-img', ['imagemin:images']);

  //////////////////////////////
  // # css
  //////////////////////////////
  grunt.registerTask('build-base-css', ['sass', 'postcss:base']);
  grunt.registerTask('build-critical-css', ['criticalcss', 'postcss:critical']);
  grunt.registerTask('build-css', ['build-base-css', 'build-critical-css']);

  //////////////////////////////
  // # javascript
  //////////////////////////////
  grunt.registerTask('build-js', ['babel', 'concat', 'eslint', 'uglify']);

  //////////////////////////////
  // # core
  //////////////////////////////
  grunt.registerTask('build', 'copy:build');
  grunt.registerTask('default', ['build-svg', 'build-favicons', 'build-img', 'build-css', 'build-js', 'build']);
};