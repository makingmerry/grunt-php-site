module.exports = function(grunt) {

  // # functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      domainName: 'http://localhost:8888/'
    },

    //////////////////////////////
    // # media
    //////////////////////////////
    ///////////////
    // # svg
    ///////////////
    // *
    // ID cleanup: performs a manual ID cleanup as Illustrator exports a mess
    replace: {
      svgclass: {
        src: ['svgs/src/*.svg'],
        dest: 'svgs/tmp/',
        replacements: [{
          // Remove escaped underscore character
          from: '_x5F_',
          to: '-'
        }, {
          // replace class names with proper classes
          //class_x3D__x22_tank-option_x22__2_
          from: /id\=\"class_x3D__x22_(.+?)_x22_(.*?)\"/gi,
          to: function(matchedWord, index, fullText, regexMatches) {
            return 'class="'+ regexMatches[0].toLowerCase()+'"';
          }
        }, {
          // lowercase all ids
          from: /id\=\"(.+?)\"/gi,
          to: function(matchedWord, index, fullText, regexMatches) {
            return 'id="'+ regexMatches[0].toLowerCase()+'"';
          }
        }, {
          // lowercase all id references to match the previous replace rule
          from: /url\(\#(.+?)\)/gi,
          to: function(matchedWord, index, fullText, regexMatches) {
            return 'url(#'+ regexMatches[0].toLowerCase() +')';
          }
        }, {
          // lowercase all id href to match the previous replace rule
          from: /href\=\"\#(.+?)\"/gi,
          to: function(matchedWord, index, fullText, regexMatches) {
            return 'href="#'+ regexMatches[0].toLowerCase() +'"';
          }
        }, {
          // remove all font references as we will use CSS for this
          from: /font\-family\=\"(.+?)\"/gi,
          to: function(matchedWord, index, fullText, regexMatches) {
            return '';
          }
        }]
      }
    },

    // *
    // minify individual svgs
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'svgs/tmp/',
          src: ['*.svg'],
          dest: 'svgs/tmp/'
        }]
      },
      options: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: false }
        ]
      }
    },

    // *
    // merge svgs to a spritesheet
    svgstore: {
      dist: {
        files: {
          'svgs/build/svg-defs.svg': ['svgs/tmp/*.svg']
        },
      },
      options: {
        cleanup: true,
        prefix: 'shape-'
      }
    },

    // *
    // build png fallbacks from svg
    svg2png: {
      dist: {
        files: [{ 
          flatten: true,
          cwd: 'svgs/src/', 
          src: ['*.svg'], 
          dest: 'svgs/build/'
        }]
      }
    },

    ///////////////
    // # favicon
    ///////////////
    // *
    // generate favicons for various platforms
    favicons: {
      options: {
        html: 'header.php',
        HTMLPrefix: 'favicons/build/'
      },
      icons: {
        src: 'favicons/src/favicon.png',
        dest: 'favicons/build/'
      }
    },

    ///////////////
    // # general
    ///////////////
    // *
    // minifying image
    imagemin: {
      statics: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'images/src/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/build/'
        }]
      },

      svgs: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'svgs/build/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'svgs/build/'
        }]
      },

      favicons: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'favicons/build/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'favicons/build/'
        }]
      },
    },

    //////////////////////////////
    // # css
    //////////////////////////////
    // *
    // compile sass to css
    sass: {
      dist: {
        options: {
          style: 'expanded',
          require: 'breakpoint'
        },
        files: {
          'stylesheets/tmp/style.css': 'sass/style.scss'
        }
      }
    },

    // *
    // add fallbacks for rem units,
    // add vendor prefixes,
    // minify the result
    postcss: {
      // base css
      base: {
        options: {
          map: true,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({browsers: 'last 2 versions'}),
            require('cssnano')()
          ]
        },
        src: 'stylesheets/tmp/style.css',
        dest: 'stylesheets/build/style.css'
      },

      // critical inline css
      critical: {
        options: {
          map: false,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({browsers: 'last 2 versions'}),
            require('cssnano')()
          ]
        },
        src: 'stylesheets/tmp/critical/*.css',
      }
    },

    // *
    // build critical inline stylesheets
    criticalcss: {
      // index page template
      index: {
        options: {
          url: '<%= config.domainName %>',
          filename: 'stylesheets/tmp/style.css',
          width: 1280,
          height: 720,
          outputfile: 'stylesheets/tmp/critical/index.css',
          forceInclude: []
        }
      },
    },

    //////////////////////////////
    // # javascript
    //////////////////////////////
    // *
    // concat javascript files
    concat: {
      dist: {
        src: [
          'javascripts/src/picturefill.min.js',
          'javascripts/src/svg4everybody.min.js',
          // 'javascripts/src/eq.min.js', // element query not required in default build
          'javascripts/src/jquery.min.js',
          'javascripts/src/velocity.min.js',
          'javascripts/src/main.js'],
        dest: 'javascripts/tmp/global.js',
      },
    },

    // *
    // hint for javascript errors
    jshint: {
      all: 'javascripts/src/main.js',
    },

    // *
    // compress global javascript file
    uglify: {
      build: {
        src: 'javascripts/tmp/global.js',
        dest: 'javascripts/build/global.min.js'
      }
    },

    //////////////////////////////
    // # core
    //////////////////////////////
    // *
    // watch files for changes
    watch: {
      options: {
        spawn: false,
        livereload: {
          host: '127.0.0.1',
          port: 35729
        }
      },

      // watch for changes to mark up
      template: {
        files: '*.{html,php}'
      },

      // watch for new images in source folder
      img: {
        files: 'images/src/*.{png,jpg,gif}',
        tasks: 'build-img'
      },

      // watch for new svg files in source folder
      svgs: {
        files: 'svgs/src/*.svg',
        tasks: 'build-svg',
      },

      // watch for changes in sass files
      css: {
        files: 'sass/**/*.scss',
        tasks: 'build-base-css'
      },

      // watch for changes in javascript files
      js: {
        files: 'javascripts/src/*.js',
        tasks: 'build-js'
      }
    },

  });



  // # load plugin dependencies
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////
  // # media
  //////////////////////////////
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-favicons');
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //////////////////////////////
  // # core
  //////////////////////////////
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');



  // # tasks
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////
  // # media
  //////////////////////////////
  grunt.registerTask('build-svg', ['replace:svgclass', 'svgmin', 'svgstore', 'svg2png', 'imagemin:svgs']);
  grunt.registerTask('build-favicons', ['favicons', 'imagemin:favicons']);
  grunt.registerTask('build-img', 'imagemin:statics');

  //////////////////////////////
  // # css
  //////////////////////////////
  grunt.registerTask('build-base-css', ['sass', 'postcss:base']);
  grunt.registerTask('build-critical-css', ['criticalcss', 'postcss:critical']);
  grunt.registerTask('build-css', ['build-base-css', 'build-critical-css']);

  //////////////////////////////
  // # javascript
  //////////////////////////////
  grunt.registerTask('build-js', ['concat', 'jshint', 'uglify']);

  //////////////////////////////
  // # core
  //////////////////////////////
  grunt.registerTask('default', ['build-svg', 'build-favicons', 'build-img', 'build-css', 'build-js']);

};