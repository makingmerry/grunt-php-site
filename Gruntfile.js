// Configure development server
const config = {
  host: '127.0.0.1',
  port: 3000,
  serverPort: 4000,
};

// Grunt configuration
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

  // Dynamically list templates that require generating critical CSS
  const templates = grunt.file.expand({ filter: 'isFile', cwd: 'templates' }, ['*.php']);
  const criticalcss = templates.reduce((map, filename) => {
    const template = filename.split('.')[0];
    map[template] = {
      options: {
        url: `http://${config.host}:${config.port}/${filename}`,
        filename: 'assets/css/tmp/style.css',
        outputfile: `assets/css/tmp/critical/${template}.css`,
        width: 1280,
        height: 720,
        forceInclude: [],
        ignoreConsole: true,
      },
    };
    return map;
  }, {});

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
      // SVG
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
    // Transpile project ES6 script to ES5
    babel: {
      options: {
        sourceMap: false,
      },
      project: {
        files: {
          'assets/js/tmp/project.js': 'assets/js/src/project.js',
        },
      },
    },
    // Optimise JS
    uglify: {
      js: {
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
      img: ['assets/img/tmp/*.{png,jpg,gif}', 'assets/img/build/*.{png,jpg,gif}'],
      svg: ['assets/img/tmp/*.svg', 'assets/img/build/*.svg'],
      // !Important to keep compiled other half of CSS,
      // to allow for quicker concatenation
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
      css: ['assets/css/*'],
      projectJs: ['assets/js/tmp/project.js', 'assets/js/build/*'],
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
    // Watcher for running development tasks
    watch: {
      options: {
        spawn: false,
      },
      icons: {
        files: ['assets/icons/src/*'],
        tasks: ['clean:icons', 'svg_sprite', 'svg2png:icons', 'imagemin:icons', 'imagemin:iconImg'],
      },
      img: {
        files: ['assets/img/src/*.{png,jpg,gif}'],
        tasks: ['clean:img', 'imagemin:img'],
      },
      svg: {
        files: ['assets/img/src/*.svg'],
        tasks: ['clean:svg', 'svg2png:svg', 'imagemin:svg', 'imagemin:svgImg'],
      },
      baseCss: {
        files: ['assets/sass/base/**/*', 'assets/sass/base.scss'],
        tasks: ['clean:baseCss', 'sass:base', 'concat:css', 'postcss:global'],
      },
      projectCss: {
        files: ['assets/sass/base/**/*', 'assets/sass/base.scss'],
        tasks: ['clean:projectCss', 'sass:project', 'concat:css', 'postcss:global'],
      },
      css: {
        files: ['assets/sass/foundation/**/*'],
        tasks: ['clean:css', 'sass', 'concat:css', 'postcss:global'],
      },
      projectJs: {
        files: ['assets/js/src/project.js'],
        tasks: ['clean:projectJs', 'babel', 'concat:js', 'uglify'],
      },
      js: {
        files: ['assets/js/src/lib/*'],
        tasks: ['clean:js', 'babel', 'concat:libraryJs', 'concat:js', 'uglify'],
      },
    },
    // Browser hot-reloading for quicker development
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'assets/icons/build/*',
            'assets/img/build/*',
            'assets/css/build/*',
            'assets/js/build/*',
            'snippets/**/*',
            '*.{html,php}',
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
  grunt.registerTask('install', [
    // Clean assets
    'clean:icons',
    'clean:img',
    'clean:svg',
    'clean:css',
    'clean:js',
    // Build icons
    'svg_sprite',
    'svg2png:icons',
    'imagemin:icons',
    'imagemin:iconImg',
    // Build images (bitmap + SVG)
    'svg2png:svg',
    'imagemin:svg',
    'imagemin:svgImg',
    'imagemin:img',
    // Build CSS
    'sass',
    'concat:css',
    'postcss:global',
    // Build JS
    'babel',
    'concat:libraryJs',
    'concat:js',
    'uglify',
  ]);
  grunt.registerTask('start', [
    // Start server
    'php',
    // Start browser + sync
    'browserSync',
    // Start watching files for changes
    'watch',
  ]);
  grunt.registerTask('build', [
    // Build core assets
    'install',
    // Build favicons
    'clean:favicons',
    'realFavicon:favicons',
    'imagemin:favicons',
    // Build critical CSS
    'php',
    'criticalcss',
    'postcss:critical',
    // Copy files and assets to build
    'copy',
  ]);
};
