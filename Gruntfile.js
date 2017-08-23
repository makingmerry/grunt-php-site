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
      path: 'http://localhost:8888/',
      library: 'lib',
      assets: 'assets',
      source: 'src',
      temporary: 'tmp',
      build: 'build',

      //////////////////////////////
      // # models
      //////////////////////////////
      snipDir: 'snippets',

      //////////////////////////////
      // # media
      //////////////////////////////
      faviDir: 'favicons',
      symbDir: 'symbols',
      imgDir: 'images',

      //////////////////////////////
      // # css
      //////////////////////////////
      sassDir: 'sass',
      cssDir: 'stylesheets',
      fontDir: 'fonts',

      //////////////////////////////
      // # javascript
      //////////////////////////////
      jsDir: 'javascripts',
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
        src: '<%= config.assets %>/<%= config.faviDir %>/<%= config.source %>/favicon.png',
        dest: '<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/',
        options: {
          iconsPath: '<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/',
          html: ['<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/favicons.html'],
          design: {
            ios: {
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#ffffff',
              margin: '14%',
              assets: {
                ios6AndPriorIcons: false,
                ios7AndLaterIcons: false,
                precomposedIcons: false,
                declareOnlyDefaultIcon: true,
              },
            },
            desktopBrowser: {},
            windows: {
              pictureAspect: 'whiteSilhouette',
              backgroundColor: '#ffffff',
              onConflict: 'override',
              assets: {
                windows80Ie10Tile: false,
                windows10Ie11EdgeTiles: {
                  small: false,
                  medium: true,
                  big: false,
                  rectangle: false,
                },
              },
            },
            androidChrome: {
              pictureAspect: 'noChange',
              themeColor: '#ffffff',
              manifest: {
                display: 'standalone',
                orientation: 'notSet',
                onConflict: 'override',
                declared: true,
              },
              assets: {
                legacyIcon: false,
                lowResolutionIcons: false,
              },
            },
            safariPinnedTab: {
              pictureAspect: 'silhouette',
              themeColor: '#ffffff',
            },
          },
          settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false,
          },
        },
      },
    },

    //////////////////////////////
    // # svg sprite
    // generate svg symbolsheet from individual files
    //////////////////////////////
    svg_sprite: {
      symbols: {
        expand: true,
        cwd: '<%= config.assets %>/<%= config.symbDir %>/<%= config.source %>/',
        src: ['*.svg'],
        dest: '<%= config.assets %>/<%= config.symbDir %>/<%= config.build %>/',
        options: {
          mode: {
            symbol: {
              dest: '.',
              sprite: 'symbolsheet.svg',
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
      symbols: {
        files: [{ 
          flatten: true,
          cwd: '<%= config.assets %>/<%= config.symbDir %>/<%= config.source %>/', 
          src: ['*.svg'], 
          dest: '<%= config.assets %>/<%= config.symbDir %>/<%= config.temporary %>/',
        }]
      },

      graphics: {
        files: [{ 
          flatten: true,
          cwd: '<%= config.assets %>/<%= config.imgDir %>/<%= config.source %>/', 
          src: ['*.svg'], 
          dest: '<%= config.assets %>/<%= config.imgDir %>/<%= config.temporary %>/',
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
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/<%= config.imgDir %>/<%= config.source %>/',
          src: ['*.{png,jpg,gif,}'],
          dest: '<%= config.assets %>/<%= config.imgDir %>/<%= config.build %>/',
        }],
      },

      graphics: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [
            { cleanupIDs: false },
            { removeDimensions: true },
          ],
        },
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/<%= config.imgDir %>/<%= config.source %>/',
          src: ['*.svg'],
          dest: '<%= config.assets %>/<%= config.imgDir %>/<%= config.build %>/',
        }],
      },

      graphicsFallback: {
        options: {
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/<%= config.imgDir %>/<%= config.temporary %>/',
          src: ['*.{png,jpg,gif,}'],
          dest: '<%= config.assets %>/<%= config.imgDir %>/<%= config.build %>/',
        }],
      },

      symbols: {
        options: {
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/<%= config.symbDir %>/<%= config.temporary %>/',
          src: ['*.{png,jpg,gif}'],
          dest: '<%= config.assets %>/<%= config.symbDir %>/<%= config.build %>/',
        }],
      },

      favicons: {
        options: {
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/',
          src: ['*.{png,jpg,gif}'],
          dest: '<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/',
        }],
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
          style: 'expanded',
        },
        files: {
          '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/style.css': '<%= config.assets %>/<%= config.sassDir %>/style.scss',
        },
      },
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
          map: true,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')(),
          ],
        },
        src: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/style.css',
        dest: '<%= config.assets %>/<%= config.cssDir %>/<%= config.build %>/style.css',
      },

      critical: {
        options: {
          map: false,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')(),
          ]
        },
        expand: true,
        cwd: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/critical/',
        src: ['**/*.css'],
        dest: '<%= config.assets %>/<%= config.cssDir %>/<%= config.build %>/critical/',
      },
    },

    //////////////////////////////
    // # critical css
    // build page type specific critical stylesheets
    //////////////////////////////
    criticalcss: {
      index: {
        options: {
          url: '<%= config.path %>',
          filename: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/style.css',
          width: 1280,
          height: 720,
          outputfile: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/critical/index.css',
          forceInclude: [],
          ignoreConsole: true,
        },
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
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/main.js': '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/main.js',
        },
      },
    },

    //////////////////////////////
    // # concat
    // concatenate javascript files
    //////////////////////////////
    concat: {
      dist: {
        src: [
          // polyfills
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/picturefill.js',
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/svg4everybody.js',
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/polyfill.array.from.js',
          // features
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/barba.js',
          // animations
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/TweenLite.js',
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/CSSPlugin.js',
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/ScrollToPlugin.js',
          // project
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/main.js',
        ],
        dest: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/global.js',
      },
    },

    //////////////////////////////
    // # eslint
    // javascript linter
    //////////////////////////////
    eslint: {
      options: {
        configFile: '',
        rulePaths: '',
      },
      target: [
        '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/main.js',
      ],
    },

    //////////////////////////////
    // # uglify
    // compress javscript files
    //////////////////////////////
    uglify: {
      build: {
        src: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/global.js',
        dest: '<%= config.assets %>/<%= config.jsDir %>/<%= config.build %>/global.min.js',
      },
    },


    // # core
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    //////////////////////////////
    // # clean
    // delete old and unnecessary files
    //////////////////////////////
    clean: {
      // media
      favicons: [
        '<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/*',
      ],
      symbols: [
        '<%= config.assets %>/<%= config.symbDir %>/<%= config.temporary %>/*',
        '<%= config.assets %>/<%= config.symbDir %>/<%= config.build %>/*',
      ],
      images: [
        '<%= config.assets %>/<%= config.imgDir %>/<%= config.temporary %>/*',
        '<%= config.assets %>/<%= config.imgDir %>/<%= config.build %>/*',
      ],
      // css
      css: [
        '<%= config.assets %>/<%= config.cssDir %>/*',
      ],
      // javascript
      javascripts: [
        '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/*',
        '<%= config.assets %>/<%= config.jsDir %>/<%= config.build %>/*',
      ],
    },

    //////////////////////////////
    // # copy
    // copy build files for deployment
    //////////////////////////////
    copy: {
      build: {
        expand: true,
        src: [
          // media
          '<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/*',
          '<%= config.assets %>/<%= config.symbDir %>/<%= config.build %>/*',
          '<%= config.assets %>/<%= config.imgDir %>/<%= config.build %>/*',
          // css
          '<%= config.assets %>/<%= config.cssDir %>/<%= config.build %>/**',
          '<%= config.assets %>/<%= config.fontDir %>/*',
          // javascript
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.build %>/*',
          // models
          '<%= config.snipDir %>/*.{html,php}',
          '*.{html,php}',
        ],
        dest: 'build/',
      },
    },

    //////////////////////////////
    // # watch
    // watch files for changes
    //////////////////////////////
    watch: {
      options: {
        event: ['changed', 'added', 'deleted'],
        spawn: false,
        livereload: {
          host: '127.0.0.1', // livereload IP
          port: 35729, // livereload port
        },
      },
      templates: {
        files: ['*.{html,php}', 'snippets/*.{html,php}'],
      },
      symbols: {
        files: ['<%= config.assets %>/<%= config.symbDir %>/<%= config.source %>/**'],
        tasks: ['build-symbols'],
      },
      images: {
        files: ['<%= config.assets %>/<%= config.imgDir %>/<%= config.source %>/**'],
        tasks: ['build-img'],
      },
      css: {
        files: ['<%= config.assets %>/<%= config.sassDir %>/**/*.scss'],
        tasks: ['build-base-css'],
      },
      js: {
        files: ['<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/**/*.js'],
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
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //////////////////////////////
  // # core
  //////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');



  // # tasks
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////
  // # media
  //////////////////////////////
  grunt.registerTask('build-favicons', ['clean:favicons', 'realFavicon:favicons', 'imagemin:favicons']);
  grunt.registerTask('build-symbols', ['clean:symbols', 'svg_sprite:symbols', 'svg2png:symbols', 'imagemin:symbols']);
  grunt.registerTask('build-graphics', ['svg2png:graphics', 'imagemin:graphics', 'imagemin:graphicsFallback']);
  grunt.registerTask('build-img', ['clean:images', 'imagemin:images', 'build-graphics']);

  //////////////////////////////
  // # css
  //////////////////////////////
  grunt.registerTask('build-base-css', ['clean:css', 'sass', 'postcss:base']);
  grunt.registerTask('build-critical-css', ['criticalcss', 'postcss:critical']);
  grunt.registerTask('build-css', ['build-base-css', 'build-critical-css']);

  //////////////////////////////
  // # javascript
  //////////////////////////////
  grunt.registerTask('build-js', ['clean:javascripts', 'babel', 'concat', 'eslint', 'uglify']);

  //////////////////////////////
  // # core
  //////////////////////////////
  grunt.registerTask('build', 'copy:build');
  grunt.registerTask('default', ['build-favicons', 'build-symbols', 'build-img', 'build-css', 'build-js', 'build']);
};