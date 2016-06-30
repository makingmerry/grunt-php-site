module.exports = function(grunt) {

  // # functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //////////////////////////////
    // # css
    //////////////////////////////
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

    // add fallbacks for rem units,
    // add vendor prefixes,
    // minify the result
    postcss: {
      options: {
        map: true,
        processors: [
          require('pixrem')(),
          require('autoprefixer')({browsers: 'last 2 versions'}),
          require('cssnano')()
        ]
      },
      dist: {
        src: 'stylesheets/*.css'
      }
    },

    penthouse: {
      extract: {
        outfile: 'stylesheets/tmp/critical.css',
        css: 'stylesheets/style.css',
        url: 'http://localhost:8888/personal/playground/base-site/',
        width: 1280,
        height: 720,
      },
    },

    //////////////////////////////
    // # javascript
    //////////////////////////////
    // # concat javascript files
    concat: {
      dist: {
        src: ['javascripts/libs/picturefill.min.js', 'javascripts/libs/eq.min.js', 'javascripts/libs/jquery.min.js', 'javascripts/libs/velocity.min.js', 'javascripts/libs/main.js'],
        dest: 'javascripts/global.js',
      },
    },

    // hint for javascript errors
    jshint: {
      all: 'javascripts/libs/main.js',
    },

    // # compress global javascript file
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
  // # core
  //////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-watch');

  //////////////////////////////
  // # media
  //////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-imagemin');

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



  // # tasks
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////
  // # css
  //////////////////////////////
  grunt.registerTask('build-css', ['sass', 'postcss']);

  //////////////////////////////
  // # javascript
  //////////////////////////////
  grunt.registerTask('build-js', ['concat', 'jshint', 'uglify']);

  //////////////////////////////
  // # default
  //////////////////////////////
  grunt.registerTask('default', ['build-css', 'build-js']);

};