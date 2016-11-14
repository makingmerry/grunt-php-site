module.exports = function(grunt) {

  // # functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      // *
      // general
      siteFullPath: 'http://localhost:8888/',
      src: 'src',
      tmp: 'tmp',
      build: 'build',

      // *
      // media
      svgDir: 'svgs',
      faviDir: 'favicons',
      imgDir: 'images',

      // *
      // css
      sassDir: 'sass',
      cssDir: 'stylesheets',
      fontDir: 'fonts',

      // *
      // javascript
      jsDir: 'javascripts'
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
        src: ['<%= config.svgDir %>/<%= config.src %>/*.svg'],
        dest: '<%= config.svgDir %>/<%= config.tmp %>/',
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
          cwd: '<%= config.svgDir %>/<%= config.tmp %>/',
          src: ['*.svg'],
          dest: '<%= config.svgDir %>/<%= config.tmp %>/'
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
          '<%= config.svgDir %>/<%= config.build %>/svg-defs.svg': ['<%= config.svgDir %>/<%= config.tmp %>/*.svg']
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
          cwd: '<%= config.svgDir %>/<%= config.src %>/', 
          src: ['*.svg'], 
          dest: '<%= config.svgDir %>/<%= config.build %>/'
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
        HTMLPrefix: '<%= config.faviDir %>/<%= config.build %>/'
      },
      icons: {
        src: '<%= config.faviDir %>/<%= config.src %>/favicon.png',
        dest: '<%= config.faviDir %>/<%= config.build %>/'
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
          cwd: '<%= config.imgDir %>/<%= config.src %>/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= config.imgDir %>/<%= config.build %>/'
        }]
      },

      svgs: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '<%= config.svgDir %>/<%= config.build %>/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= config.svgDir %>/<%= config.build %>/'
        }]
      },

      favicons: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '<%= config.faviDir %>/<%= config.build %>/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= config.faviDir %>/<%= config.build %>/'
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
          '<%= config.cssDir %>/<%= config.tmp %>/style.css': '<%= config.sassDir %>/style.scss'
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
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')()
          ]
        },
        src: '<%= config.cssDir %>/<%= config.tmp %>/style.css',
        dest: '<%= config.cssDir %>/<%= config.build %>/style.css'
      },

      // critical inline css
      critical: {
        options: {
          map: false,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')()
          ]
        },
        src: '<%= config.cssDir %>/<%= config.tmp %>/critical/*.css',
      }
    },

    // *
    // build critical inline stylesheets
    criticalcss: {
      // index page template
      index: {
        options: {
          url: '<%= config.siteFullPath %>',
          filename: '<%= config.cssDir %>/<%= config.tmp %>/style.css',
          width: 1280,
          height: 720,
          outputfile: '<%= config.cssDir %>/<%= config.tmp %>/critical/index.css',
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
          '<%= config.jsDir %>/<%= config.src %>/picturefill.js',
          '<%= config.jsDir %>/<%= config.src %>/svg4everybody.js',
          // '<%= config.jsDir %>/<%= config.src %>/eq.js', // element query not required in default build
          '<%= config.jsDir %>/<%= config.src %>/jquery-3.1.1.js',
          '<%= config.jsDir %>/<%= config.src %>/velocity.js',
          '<%= config.jsDir %>/<%= config.src %>/main.js'],
        dest: '<%= config.jsDir %>/<%= config.tmp %>/global.js',
      },
    },

    // *
    // hint for javascript errors
    jshint: {
      all: '<%= config.jsDir %>/<%= config.src %>/main.js',
    },

    // *
    // compress global javascript file
    uglify: {
      build: {
        src: '<%= config.jsDir %>/<%= config.tmp %>/global.js',
        dest: '<%= config.jsDir %>/<%= config.build %>/global.min.js'
      }
    },

    //////////////////////////////
    // # core
    //////////////////////////////
    // *
    // copy build files for deployment
    copy: {
      deploy: {
        expand: true,
        src: [
          // media
          '<%= config.svgDir %>/<%= config.build %>/*',
          '<%= config.faviDir %>/<%= config.build %>/*',
          '<%= config.imgDir %>/<%= config.build %>/*',

          // css
          '<%= config.cssDir %>/<%= config.build %>/*',
          '<%= config.fontDir %>/*',

          // javascript
          '<%= config.jsDir %>/<%= config.build %>/*',

          // template
          '*.{html,php}'
        ],
        dest: 'build/'
      }
    },

    // *
    // watch files for changes
    watch: {
      options: {
        event: ['changed', 'added', 'deleted'],
        spawn: false,
        livereload: {
          host: '127.0.0.1', // livereload IP
          port: 35729 // livereload port
        }
      },

      // watch for changes to mark up
      template: {
        files: ['**/*.{html,php}'],
      },

      // watch for new images in source folder
      img: {
        files: ['<%= config.imgDir %>/<%= config.src %>/**'],
        tasks: ['build-img'],
      },

      // watch for new svg files in source folder
      svgs: {
        files: ['<%= config.svgDir %>/<%= config.src %>/**'],
        tasks: ['build-svg'],
      },

      // watch for changes in sass files
      css: {
        files: ['<%= config.sassDir %>/**/*.scss'],
        tasks: ['build-base-css'],
      },

      // watch for changes in javascript files
      js: {
        files: ['<%= config.jsDir %>/<%= config.src %>/**/*.js'],
        tasks: ['build-js'],
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
  grunt.loadNpmTasks('grunt-contrib-copy');
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
  grunt.registerTask('deploy', 'copy:deploy');
  grunt.registerTask('default', ['build-svg', 'build-favicons', 'build-img', 'build-css', 'build-js', 'deploy']);

};