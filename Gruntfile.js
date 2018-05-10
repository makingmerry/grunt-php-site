module.exports = function(grunt) {
  grunt.initConfig({
    // # configuration
    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////

    // # project
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    pkg: grunt.file.readJSON('package.json'),
    config: {
      //////////////////////////////
      // # general
      //////////////////////////////
      hostname: '127.0.0.1',
      port: 3000,
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

    // # modules
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    //////////////////////////////
    // # real favicons
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
    //////////////////////////////
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          cwd: '<%= config.assets %>/<%= config.imgDir %>/<%= config.source %>/',
          src: ['*.{png,jpg,gif}'],
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
          src: ['*.{png,jpg,gif}'],
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

    //////////////////////////////
    // # sass
    //////////////////////////////
    sass: {
      functional: {
        options: {
          style: 'expanded',
          precision: 3,
          sourcemap: false,
        },
        files: {
          '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/functional.css': '<%= config.assets %>/<%= config.sassDir %>/functional.scss',
        },
      },
      structural: {
        options: {
          style: 'expanded',
          precision: 3,
          sourcemap: false,
        },
        files: {
          '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/structural.css': '<%= config.assets %>/<%= config.sassDir %>/structural.scss',
        },
      },
    },

    //////////////////////////////
    // # postcss
    //////////////////////////////
    postcss: {
      base: {
        options: {
          map: false,
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
    //////////////////////////////
    criticalcss: {
      index: {
        options: {
          url: 'http://<%= config.hostname %>:<%= php.dev.options.port %>',
          filename: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/style.css',
          width: 1280,
          height: 720,
          outputfile: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/critical/index.css',
          forceInclude: [],
          ignoreConsole: true,
        },
      },
      default: {
        options: {
          url: 'http://<%= config.hostname %>:<%= php.dev.options.port %>/page.php',
          filename: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/style.css',
          width: 1280,
          height: 720,
          outputfile: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/critical/default.css',
          forceInclude: [],
          ignoreConsole: true,
        },
      },
    },

    //////////////////////////////
    // # eslint
    //////////////////////////////
    eslint: {
      options: {
        configFile: '',
        rulePaths: '',
      },
      project: [
        '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/project.js',
      ],
    },

    //////////////////////////////
    // # babel
    //////////////////////////////
    babel: {
      options: {
        sourceMap: true,
      },
      project: {
        files: {
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/project.js': '<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/project.js',
        },
      },
    },

    //////////////////////////////
    // # uglify
    //////////////////////////////
    uglify: {
      library: {
        src: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/library.js',
        dest: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/library.js',
      },
      project: {
        src: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/project.js',
        dest: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/project.js',
      },
      global: {
        src: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/global.js',
        dest: '<%= config.assets %>/<%= config.jsDir %>/<%= config.build %>/global.js',
      },
    },

    //////////////////////////////
    // # concat
    //////////////////////////////
    concat: {
      // css
      css: {
        src: [
          '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/functional.css',
          '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/structural.css',
        ],
        dest: '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/style.css',
      },
      // js
      libraryJs: {
        src: ['<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/*.js'],
        dest: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/library.js',
      },
      js: {
        src: [
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/library.js',
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/project.js',
        ],
        dest: '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/global.js',
      },
    },
    
    //////////////////////////////
    // # clean
    //////////////////////////////
    clean: {
      // media
      favicons: ['<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/*'],
      symbols: [
        '<%= config.assets %>/<%= config.symbDir %>/<%= config.temporary %>/*',
        '<%= config.assets %>/<%= config.symbDir %>/<%= config.build %>/*',
      ],
      images: [
        '<%= config.assets %>/<%= config.imgDir %>/<%= config.temporary %>/*',
        '<%= config.assets %>/<%= config.imgDir %>/<%= config.build %>/*',
      ],
      // css
      functionalCss: [
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/functional.css',
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/functional.css.map',
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/style.css',
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.build %>/*'
      ],
      structuralCss: [
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/structural.css',
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/structural.css.map',
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/style.css',
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.build %>/*'
      ],
      criticalCss: [
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.temporary %>/critical/*',
        '<%= config.assets %>/<%= config.cssDir %>/<%= config.build %>/critical/*',
      ],
      css: ['<%= config.assets %>/<%= config.cssDir %>/*'],
      // js
      libraryJs: ['<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/library.js'],
      projectJs: [
        '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/project.js',
        '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/project.js.map',
      ],
      js: [
        '<%= config.assets %>/<%= config.jsDir %>/<%= config.temporary %>/*',
        '<%= config.assets %>/<%= config.jsDir %>/<%= config.build %>/*',
      ],
    },

    //////////////////////////////
    // # copy
    //////////////////////////////
    copy: {
      deploy: {
        expand: true,
        src: [
          // media
          '<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/*',
          '<%= config.assets %>/<%= config.symbDir %>/<%= config.build %>/*',
          '<%= config.assets %>/<%= config.imgDir %>/<%= config.build %>/*',
          // css
          '<%= config.assets %>/<%= config.cssDir %>/<%= config.build %>/**',
          '<%= config.assets %>/<%= config.fontDir %>/*',
          // js
          '<%= config.assets %>/<%= config.jsDir %>/<%= config.build %>/*',
          // models
          '<%= config.snipDir %>/*.{html,php}',
          '*.{html,php}',
        ],
        dest: 'build/',
      },
    },

    //////////////////////////////
    // # php server
    //////////////////////////////
    php: {
      dev: {
        options: {
          hostname: '<%= config.hostname %>',
          port: 8888,
          base:  '.',
        },
      },
    },

    //////////////////////////////
    // # watch
    //////////////////////////////
    watch: {
      options: {
        spawn: false,
      },
      // media
      symbols: {
        files: ['<%= config.assets %>/<%= config.symbDir %>/<%= config.source %>/**'],
        tasks: ['build-symbols'],
      },
      images: {
        files: ['<%= config.assets %>/<%= config.imgDir %>/<%= config.source %>/**'],
        tasks: ['build-img'],
      },
      // css
      functionalCss: {
        files: [
          '<%= config.assets %>/<%= config.sassDir %>/base/properties/**/*.scss',
          '<%= config.assets %>/<%= config.sassDir %>/functional.scss',
        ],
        tasks: ['build-functional-css'],
      },
      structuralCss: {
        files: [
          '<%= config.assets %>/<%= config.sassDir %>/element/*.scss',
          '<%= config.assets %>/<%= config.sassDir %>/component/*.scss',
          '<%= config.assets %>/<%= config.sassDir %>/composition/*.scss',
          '<%= config.assets %>/<%= config.sassDir %>/page/*.scss',
          '<%= config.assets %>/<%= config.sassDir %>/structural.scss',
        ],
        tasks: ['build-structural-css'],
      },
      css: {
        files: [
          '<%= config.assets %>/<%= config.sassDir %>/base/configurations/*.scss',
          '<%= config.assets %>/<%= config.sassDir %>/base/tools/*.scss',
        ],
        tasks: ['build-base-css'],
      },
      // js
      libraryJs: {
        files: ['<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/<%= config.library %>/*.js'],
        tasks: ['build-library-js'],
      },
      projectJs: {
        files: ['<%= config.assets %>/<%= config.jsDir %>/<%= config.source %>/project.js'],
        tasks: ['build-project-js'],
      },
      // models
      models: {
        files: [
          '*.{html,php}',
          '<%= config.snipDir %>/*.{html,php}',
        ],
      },
    },

    //////////////////////////////
    // # browser sync
    //////////////////////////////
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            // media
            '<%= config.assets %>/<%= config.faviDir %>/<%= config.build %>/*.{html}',
            '<%= config.assets %>/<%= config.symbDir %>/<%= config.build %>/*.{svg}',
            '<%= config.assets %>/<%= config.imgDir %>/<%= config.build %>/*.{png,jpg,gif,svg}',
            // css
            '<%= config.assets %>/<%= config.cssDir %>/<%= config.build %>/*.{css}',
            // js
            '<%= config.assets %>/<%= config.jsDir %>/<%= config.build %>/*.{js}',
            // models
            '*.{html,php}',
            '<%= config.snipDir %>/*.{html,php}',
          ],
        },
        options: {
          proxy: '<%= config.hostname %>:<%= php.dev.options.port %>',
          port: '<%= config.port %>',
          open: true,
          watchTask: true,
          watchEvents: ['add', 'change'],
        },
      },
    },
  });

  // # load modules
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // media
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-real-favicon');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // css
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-criticalcss');
  // js
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // core
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // # tasks
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // media
  grunt.registerTask('build-favicons', [
    'clean:favicons',
    'realFavicon:favicons',
    'imagemin:favicons',
  ]);
  grunt.registerTask('build-symbols', [
    'clean:symbols',
    'svg_sprite:symbols',
    'svg2png:symbols',
    'imagemin:symbols',
  ]);
  grunt.registerTask('build-graphics', [
    'svg2png:graphics',
    'imagemin:graphics',
    'imagemin:graphicsFallback',
  ]);
  grunt.registerTask('build-img', [
    'clean:images',
    'imagemin:images',
    'build-graphics',
  ]);
  // css
  grunt.registerTask('build-functional-css', [
    'clean:functionalCss',
    'sass:functional',
    'concat:css',
    'postcss:base',
  ]);
  grunt.registerTask('build-structural-css', [
    'clean:structuralCss',
    'sass:structural',
    'concat:css',
    'postcss:base',
  ]);
  grunt.registerTask('build-base-css', [
    'clean:css',
    'sass:functional',
    'sass:structural',
    'concat:css',
    'postcss:base',
  ]);
  grunt.registerTask('build-critical-css', [
    'clean:criticalCss',
    'php',
    'criticalcss',
    'postcss:critical',
  ]);
  grunt.registerTask('build-css', [
    'build-base-css',
    'build-critical-css',
  ]);
  // js
  grunt.registerTask('build-library-js', [
    'clean:libraryJs',
    'concat:libraryJs',
    'uglify:library',
    'concat:js',
    'uglify:global',
  ]);
  grunt.registerTask('build-project-js', [
    'clean:projectJs',
    'eslint:project',
    'babel:project',
    'uglify:project',
    'concat:js',
    'uglify:global',
  ]);
  grunt.registerTask('build-js', [
    'clean:js',
    'concat:libraryJs',
    'uglify:library',
    'eslint:project',
    'babel:project',
    'uglify:project',
    'concat:js',
    'uglify:global',
  ]);
  // core
  grunt.registerTask('init', [
    'build-base-css',
    'build-js',
  ]);
  grunt.registerTask('build', [
    'build-favicons',
    'build-symbols',
    'build-img',
    'build-css',
    'build-js',
  ]);
  grunt.registerTask('deploy', [
    'build',
    'copy:deploy',
  ]);
  grunt.registerTask('default', [
    'php',
    'browserSync',
    'watch',
  ]);
};
