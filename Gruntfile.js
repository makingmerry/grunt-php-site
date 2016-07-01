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
    }
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
  grunt.loadNpmTasks('grunt-contrib-watch');



  // # tasks
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////
  // # media
  //////////////////////////////
  grunt.registerTask('build-img', 'imagemin');
  grunt.registerTask('build-svg', ['svgmin', 'svgstore', 'svg2png']);
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
  // # default
  //////////////////////////////
  grunt.registerTask('default', ['build-media', 'build-css', 'build-js']);

};