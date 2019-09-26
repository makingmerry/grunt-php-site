const config = {
  host: '127.0.0.1',
  port: 3000,
  serverPort: 4000,
};

const templates = [{ path: '', template: 'home' }, { path: 'page.php', template: 'default' }];
const criticalcss = templates.reduce((map, item) => {
  map[item.template] = {
    options: {
      url: `http://${config.host}:${config.port}/${item.path}`,
      filename: 'assets/css/tmp/style.css',
      outputfile: `assets/css/tmp/critical/${item.template}.css`,
      width: 1280,
      height: 720,
      forceInclude: [],
      ignoreConsole: true,
    },
  };
  return map;
}, {});

module.exports = function (grunt) {
  // Modules
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-real-favicon');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-babel');
  // grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-php');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Generates favicons from a source favicon image
    realFavicon: {
      favicons: {
        src: 'assets/favicons/src/favicon.png',
        dest: 'assets/favicons/build/',
        options: {
          iconsPath: 'assets/favicons/build/',
          html: 'assets/favicons/build/favicons.html',
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
    // Generates spritesheet from .svg icon sources
    svg_sprite: {
      icons: {
        expand: true,
        cwd: 'assets/icons/src/',
        dest: 'assets/icons/tmp/',
        src: ['*.svg'],
        options: {
          mode: {
            symbol: {
              dest: '.',
              sprite: 'icons.svg',
            },
          },
        },
      },
    },
    // Generates fall-back bitmap images from .svg sources
    svg2png: {
      icons: {
        files: [
          {
            flatten: true,
            cwd: 'assets/icons/src/',
            dest: 'assets/icons/tmp/',
            src: ['*.svg'],
          },
        ],
      },
      svg: {
        files: [
          {
            flatten: true,
            cwd: 'assets/img/src/',
            dest: 'assets/img/build/',
            src: ['*.svg'],
          },
        ],
      },
    },
    // Optimises images for smaller file-sizes
    imagemin: {
      // svg
      svg: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ removeDimensions: true }],
        },
        files: [
          {
            expand: true,
            cwd: 'assets/img/src/',
            dest: 'assets/img/build/',
            src: ['*.svg'],
          },
        ],
      },
      icons: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ cleanupIDs: false }, { removeDimensions: true }],
        },
        files: [
          {
            expand: true,
            cwd: 'assets/icons/tmp/',
            dest: 'assets/icons/build/',
            src: ['*.svg'],
          },
        ],
      },
      // bitmap
      img: {
        options: {
          optimizationLevel: 3,
        },
        files: [
          {
            expand: true,
            cwd: 'assets/img/src/',
            dest: 'assets/img/build/',
            src: ['*.{png,jpg,gif}'],
          },
        ],
      },
      svgImg: {
        options: {
          optimizationLevel: 3,
        },
        files: [
          {
            expand: true,
            cwd: 'assets/img/tmp/',
            dest: 'assets/img/build/',
            src: ['*.{png,jpg}'],
          },
        ],
      },
      iconImg: {
        options: {
          optimizationLevel: 3,
        },
        files: [
          {
            expand: true,
            cwd: 'assets/icons/tmp/',
            dest: 'assets/icons/build/',
            src: ['*.{png,jpg}'],
          },
        ],
      },
      favicons: {
        options: {
          optimizationLevel: 3,
        },
        files: [
          {
            expand: true,
            cwd: 'assets/favicons/build/',
            src: ['*.{png,jpg}'],
            dest: 'assets/favicons/build/',
          },
        ],
      },
    },
    // Compile Sass to CSS
    // !Bulk of compilation time attributed to base CSS but it is usually unchanged, so
    // to allow for quicker compilations, first split into base and project specific styles,
    // then concat and reconcile later down the pipeline (see concat, postcss and clean)
    // so project styles don't trigger base re-compilations
    sass: {
      base: {
        options: {
          style: 'expanded',
          precision: 3,
          sourcemap: 'none',
        },
        files: {
          'assets/css/tmp/base.css': 'assets/sass/base.scss',
        },
      },
      project: {
        options: {
          style: 'expanded',
          precision: 3,
          sourcemap: 'none',
        },
        files: {
          'assets/css/tmp/project.css': 'assets/sass/project.scss',
        },
      },
    },
    // Generate critical (above-the-fold) CSS
    criticalcss,
    // Optimise and transform post-compiled CSS
    postcss: {
      // !Important to remove duplicates from concatenating step (see concat)
      global: {
        options: {
          map: false,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')(),
          ],
        },
        src: 'assets/css/tmp/style.css',
        dest: 'assets/css/build/style.css',
      },
      critical: {
        options: {
          map: false,
          processors: [
            require('pixrem')(),
            require('autoprefixer')({ browsers: 'last 2 versions' }),
            require('cssnano')(),
          ],
        },
        expand: true,
        cwd: 'assets/css/tmp/critical/',
        dest: 'assets/css/build/critical/',
        src: ['**/*.css'],
      },
    },
    // linter — !reconcile with .prettier config
    // eslint: {
    //   options: {
    //     configFile: '',
    //     rulePaths: '',
    //   },
    //   project: ['assets/js/src/project.js'],
    // },
    // Transpile project ES6 code to ES5
    babel: {
      options: {
        sourceMap: true,
      },
      project: {
        files: {
          'assets/js/tmp/project.js': 'assets/js/src/project.js',
        },
      },
    },
    // Optimise js
    uglify: {
      library: {
        src: 'assets/js/tmp/library.js',
        dest: 'assets/js/tmp/library.js',
      },
      project: {
        src: 'assets/js/tmp/project.js',
        dest: 'assets/js/tmp/project.js',
      },
      global: {
        src: 'assets/js/tmp/global.js',
        dest: 'assets/js/build/global.js',
      },
    },
    // Concat assets
    concat: {
      // !Concatenating base and project styles WILL result in duplicate declarations
      css: {
        src: ['assets/css/tmp/base.css', 'assets/css/tmp/project.css'],
        dest: 'assets/css/tmp/style.css',
      },
      libraryJs: {
        src: ['assets/js/src/lib/*.js'],
        dest: 'assets/js/tmp/library.js',
      },
      js: {
        src: ['assets/js/tmp/library.js', 'assets/js/tmp/project.js'],
        dest: 'assets/js/tmp/global.js',
      },
    },
    // Clean up old files before every update/build
    clean: {
      favicons: ['assets/favicons/build/*'],
      icons: ['assets/icons/tmp/*', 'assets/icons/build/*'],
      img: ['assets/img/tmp/*', 'assets/img/build/*'],
      // !Important to keep compiled other half of CSS, to allow for concatenation
      baseCss: [
        'assets/css/tmp/base.css',
        'assets/css/tmp/style.css',
        'assets/css/build/style.css',
      ],
      projectCss: [
        'assets/css/tmp/project.css',
        'assets/css/tmp/style.css',
        'assets/css/build/style.css',
      ],
      criticalCss: ['assets/css/tmp/critical/*', 'assets/css/build/critical/*'],
      css: ['assets/css/*'],
      libraryJs: ['assets/js/tmp/library.js'],
      projectJs: ['assets/js/tmp/project.js', 'assets/js/tmp/project.js.map'],
      js: ['assets/js/tmp/*', 'assets/js/build/*'],
    },
    // Copy production files to build directory
    copy: {
      build: {
        expand: true,
        src: [
          'assets/favicons/build/*',
          'assets/icons/build/*',
          'assets/img/build/*',
          'assets/css/build/*',
          'assets/fonts/*',
          'assets/js/build/*',
          'snippets/**/*',
          '*.{html,php}',
        ],
        dest: 'build/',
      },
    },
    // Start PHP in-built server
    php: {
      dev: {
        options: {
          hostname: config.host,
          port: config.serverPort,
          base: '.',
        },
      },
    },
    // Watcher for running tasks post updates
    watch: {
      options: {
        spawn: false,
      },
      icons: {
        files: ['assets/icons/src/**'],
        tasks: ['build-icons'],
      },
      img: {
        files: ['assets/img/src/**'],
        tasks: ['build-img'],
      },
      baseCss: {
        files: ['assets/sass/base/**/*.scss', 'assets/sass/base.scss'],
        tasks: ['build-base-css'],
      },
      projectCss: {
        files: ['assets/sass/project/**/*.scss', 'assets/sass/project.scss'],
        tasks: ['build-project-css'],
      },
      globalCss: {
        files: ['assets/sass/foundation/**/*.scss'],
        tasks: ['build-global-css'],
      },
      libraryJs: {
        files: ['assets/js/src/lib/*.js'],
        tasks: ['build-library-js'],
      },
      projectJs: {
        files: ['assets/js/src/project.js'],
        tasks: ['build-project-js'],
      },
      models: {
        files: ['*.{html,php}', 'snippets/**/*.{html,php}'],
      },
    },
    // Browser hot-reloading for quicker development
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'assets/favicons/build/*.{html}',
            'assets/icons/build/*.{svg}',
            'assets/img/build/*.{png,jpg,gif,svg}',
            'assets/css/build/*.{css}',
            'assets/js/build/*.{js}',
            '*.{html,php}',
            'snippets/**/*.{html,php}',
          ],
        },
        options: {
          proxy: `${config.host}:${config.serverPort}`,
          port: config.port,
          open: true,
          watchTask: true,
          watchEvents: ['add', 'change'],
        },
      },
    },
  });

  // Tasks
  grunt.registerTask('build-favicons', [
    'clean:favicons',
    'realFavicon:favicons',
    'imagemin:favicons',
  ]);
  grunt.registerTask('build-icons', [
    'clean:icons',
    'svg_sprite',
    'svg2png:icons',
    'imagemin:icons',
    'imagemin:iconImg',
  ]);
  grunt.registerTask('build-graphics', ['svg2png:svg', 'imagemin:svg', 'imagemin:svgImg']);
  grunt.registerTask('build-img', ['clean:img', 'imagemin:img', 'build-graphics']);
  grunt.registerTask('build-base-css', [
    'clean:baseCss',
    'sass:base',
    'concat:css',
    'postcss:global',
  ]);
  grunt.registerTask('build-project-css', [
    'clean:projectCss',
    'sass:project',
    'concat:css',
    'postcss:global',
  ]);
  grunt.registerTask('build-global-css', [
    'clean:css',
    'sass:base',
    'sass:project',
    'concat:css',
    'postcss:global',
  ]);
  grunt.registerTask('build-critical-css', [
    'clean:criticalCss',
    // Start server to allow for criticalcss to visualise
    // and scan the project in the background
    'php',
    'criticalcss',
    'postcss:critical',
  ]);
  grunt.registerTask('build-css', ['build-global-css', 'build-critical-css']);
  grunt.registerTask('build-library-js', [
    'clean:libraryJs',
    'concat:libraryJs',
    'uglify:library',
    'concat:js',
    'uglify:global',
  ]);
  grunt.registerTask('build-project-js', [
    'clean:projectJs',
    // 'eslint:project',
    'babel:project',
    'uglify:project',
    'concat:js',
    'uglify:global',
  ]);
  grunt.registerTask('build-js', [
    'clean:js',
    'concat:libraryJs',
    'uglify:library',
    // 'eslint:project',
    'babel:project',
    'uglify:project',
    'concat:js',
    'uglify:global',
  ]);
  grunt.registerTask('init', ['build-base-css', 'build-js', 'build-icons', 'build-img']);
  grunt.registerTask('build', [
    'build-favicons',
    'build-icons',
    'build-img',
    'build-css',
    'build-js',
    'copy:build',
  ]);
  grunt.registerTask('default', ['php', 'browserSync', 'watch']);
};
