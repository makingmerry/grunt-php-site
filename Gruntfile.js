module.exports = function(grunt) {

  // # functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //////////////////////////////
    // # image
    //////////////////////////////
    // *
    // minifying image
    imagemin: {
      build: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'images/src/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/build/'
        }]
      }
    },

    // *
    // ID cleanup: performs a manual ID cleanup as Illustrator exports a mess
    replace: {
      svgclass: {
        src: ['svgs/src/*.svg'],
        overwrite: true,
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
    // minifying svg with svgo
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'svgs/src/',
          src: ['*.svg'],
          dest: 'svgs/'
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
    // merge svgs in a folder
    svgstore: {
      dist: {
        files: {
          'svgs/build/svg-defs.svg': ['svgs/*.svg']
        },
      },
      options: {
        cleanup: true,
        prefix: 'icon-'
      }
    },

    // *
    // build png fallbacks from svg
    svg2png: {
      dist: {
        files: [{ 
          flatten: true,
          cwd: 'svgs/', 
          src: ['*.svg'], 
          dest: 'svgs/build/'
        }]
      }
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
          'stylesheets/style.css': 'sass/style.scss'
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
        src: 'stylesheets/*.css'
      },

      // critical inline css
      critical: {
        options: {
          processors: [
            require('cssnano')()
          ]
        },
        src: 'stylesheets/tmp/*.css'
      }
    },

    // *
    // build critical inline stylesheet
    penthouse: {
      // index page template
      index: {
        css: 'stylesheets/style.css',
        url: 'http://localhost:8888/personal/playground/base-site/',
        outfile: 'stylesheets/tmp/critical.css',
        width: 1280,
        height: 720
      }
    },

    //////////////////////////////
    // # javascript
    //////////////////////////////
    // *
    // concat javascript files
    concat: {
      dist: {
        src: ['javascripts/libs/picturefill.min.js', 'svg4everybody.min.js', 'javascripts/libs/eq.min.js', 'javascripts/libs/jquery.min.js', 'javascripts/libs/velocity.min.js', 'javascripts/libs/main.js'],
        dest: 'javascripts/global.js',
      },
    },

    // *
    // hint for javascript errors
    jshint: {
      all: 'javascripts/libs/main.js',
    },

    // *
    // compress global javascript file
    uglify: {
      build: {
        src: 'javascripts/global.js',
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
        files: 'javascripts/libs/*.js',
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
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-svg2png');

  //////////////////////////////
  // # css
  //////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-penthouse');

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
  grunt.registerTask('build-img', 'imagemin');
  grunt.registerTask('build-svg', ['replace:svgclass', 'svgmin', 'svgstore', 'svg2png']);
  grunt.registerTask('build-media', ['build-img', 'build-svg']);

  //////////////////////////////
  // # css
  //////////////////////////////
  grunt.registerTask('build-base-css', ['sass', 'postcss:base']);
  grunt.registerTask('build-critical-css', ['penthouse', 'postcss:critical']);
  grunt.registerTask('build-css', ['build-base-css', 'build-critical-css']);

  //////////////////////////////
  // # javascript
  //////////////////////////////
  grunt.registerTask('build-js', ['concat', 'jshint', 'uglify']);

  //////////////////////////////
  // # core
  //////////////////////////////
  grunt.registerTask('default', ['build-media', 'build-css', 'build-js']);

};