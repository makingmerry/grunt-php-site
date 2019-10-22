// Configure development server
const config = {
  host: "127.0.0.1",
  port: 3000,
}

// Grunt configuration
module.exports = function(grunt) {
  // Modules
  grunt.loadNpmTasks("grunt-svg-sprite")
  grunt.loadNpmTasks("grunt-svg2png")
  grunt.loadNpmTasks("grunt-real-favicon")
  grunt.loadNpmTasks("grunt-contrib-imagemin")
  grunt.loadNpmTasks("grunt-sass")
  grunt.loadNpmTasks("grunt-postcss")
  grunt.loadNpmTasks("grunt-criticalcss")
  grunt.loadNpmTasks("grunt-babel")
  grunt.loadNpmTasks("grunt-eslint")
  grunt.loadNpmTasks("grunt-contrib-concat")
  grunt.loadNpmTasks("grunt-contrib-uglify")
  grunt.loadNpmTasks("grunt-php")
  grunt.loadNpmTasks("grunt-browser-sync")
  grunt.loadNpmTasks("grunt-contrib-watch")
  grunt.loadNpmTasks("grunt-contrib-clean")
  grunt.loadNpmTasks("grunt-contrib-copy")

  // Dynamically list templates that require generating critical CSS
  const templates = grunt.file.expand(
    { filter: "isFile", cwd: "src/templates" },
    ["*.php"]
  )
  const criticalcss = templates.reduce((map, filename) => {
    const template = filename.split(".")[0]
    map[template] = {
      options: {
        url: `http://${config.host}:${config.port}/${filename}`,
        filename: "src/assets/css/tmp/style.css",
        outputfile: `src/assets/css/tmp/critical/${template}.css`,
        width: 1280,
        height: 720,
        forceInclude: [],
        ignoreConsole: true,
      },
    }
    return map
  }, {})

  // Config
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    // Generates favicons from a source favicon image
    realFavicon: {
      favicons: {
        src: "src/assets/favicons/src/favicon.png",
        dest: "src/assets/favicons/build/",
        options: {
          iconsPath: "src/assets/favicons/build/",
          html: "src/assets/favicons/build/favicons.html",
          design: {
            ios: {
              pictureAspect: "backgroundAndMargin",
              backgroundColor: "#ffffff",
              margin: "14%",
              assets: {
                ios6AndPriorIcons: false,
                ios7AndLaterIcons: false,
                precomposedIcons: false,
                declareOnlyDefaultIcon: true,
              },
            },
            desktopBrowser: {},
            windows: {
              pictureAspect: "whiteSilhouette",
              backgroundColor: "#ffffff",
              onConflict: "override",
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
              pictureAspect: "noChange",
              themeColor: "#ffffff",
              manifest: {
                display: "standalone",
                orientation: "notSet",
                onConflict: "override",
                declared: true,
              },
              assets: {
                legacyIcon: false,
                lowResolutionIcons: false,
              },
            },
            safariPinnedTab: {
              pictureAspect: "silhouette",
              themeColor: "#ffffff",
            },
          },
          settings: {
            scalingAlgorithm: "Mitchell",
            errorOnImageTooSmall: false,
          },
        },
      },
    },
    // Generates spritesheet from .svg icon sources
    svg_sprite: {
      icons: {
        expand: true,
        cwd: "src/assets/icons/src/",
        dest: "src/assets/icons/tmp/",
        src: ["*.svg"],
        options: {
          mode: {
            symbol: {
              dest: ".",
              sprite: "icons.svg",
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
            cwd: "src/assets/icons/src/",
            dest: "src/assets/icons/tmp/",
            src: ["*.svg"],
          },
        ],
      },
      svg: {
        files: [
          {
            flatten: true,
            cwd: "src/assets/img/src/",
            dest: "src/assets/img/build/",
            src: ["*.svg"],
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
            cwd: "src/assets/icons/tmp/",
            dest: "src/assets/icons/build/",
            src: ["*.svg"],
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
            cwd: "src/assets/img/src/",
            dest: "src/assets/img/build/",
            src: ["*.svg"],
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
            cwd: "src/assets/img/src/",
            dest: "src/assets/img/build/",
            src: ["*.{png,jpg,gif}"],
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
            cwd: "src/assets/img/tmp/",
            dest: "src/assets/img/build/",
            src: ["*.{png,jpg}"],
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
            cwd: "src/assets/icons/tmp/",
            dest: "src/assets/icons/build/",
            src: ["*.{png,jpg}"],
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
            cwd: "src/assets/favicons/build/",
            src: ["*.{png,jpg}"],
            dest: "src/assets/favicons/build/",
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
      options: {
        implementation: require("sass"),
        // By default, in Dart Sass, synchronous compilation is twice as fast as asynchronous compilation
        // due to overhead of asynchronous callbacks.
        // Fibers pacakge helps to avoid this overhead
        fiber: require("fibers"),
        sourcemap: false,
        outputStyle: "expanded",
      },
      base: {
        files: {
          "src/assets/css/tmp/base.css": "src/assets/sass/base.scss",
        },
      },
      project: {
        files: {
          "src/assets/css/tmp/project.css": "src/assets/sass/project.scss",
        },
      },
    },
    // Generate critical (above-the-fold) CSS
    criticalcss,
    // Optimise and transform post-compiled CSS
    postcss: {
      options: {
        map: false,
        processors: [
          require("pixrem")(),
          require("autoprefixer")({ browsers: "last 2 versions" }),
          require("cssnano")(),
        ],
      },
      // !Important to remove duplicates from concatenating step (see concat)
      global: {
        src: "src/assets/css/tmp/style.css",
        dest: "src/assets/css/build/style.css",
      },
      critical: {
        expand: true,
        cwd: "src/assets/css/tmp/critical/",
        dest: "src/assets/css/build/critical/",
        src: ["**/*.css"],
      },
    },
    // Linter
    eslint: {
      target: ["src/assets/js/src/project.js"],
    },
    // Transpile project ES6 script to ES5
    babel: {
      options: {
        sourceMap: false,
      },
      project: {
        files: {
          "src/assets/js/tmp/project.js": "src/assets/js/src/project.js",
        },
      },
    },
    // Optimise JS
    uglify: {
      js: {
        src: "src/assets/js/tmp/global.js",
        dest: "src/assets/js/build/global.js",
      },
    },
    // Concat assets
    concat: {
      // !Concatenating base and project styles WILL result in duplicate declarations
      css: {
        src: ["src/assets/css/tmp/base.css", "src/assets/css/tmp/project.css"],
        dest: "src/assets/css/tmp/style.css",
      },
      libraryJs: {
        src: ["src/assets/js/src/lib/*.js"],
        dest: "src/assets/js/tmp/library.js",
      },
      js: {
        src: ["src/assets/js/tmp/library.js", "src/assets/js/tmp/project.js"],
        dest: "src/assets/js/tmp/global.js",
      },
    },
    // Clean up old files before every update/build
    clean: {
      favicons: ["src/assets/favicons/build/*"],
      icons: ["src/assets/icons/tmp/*", "src/assets/icons/build/*"],
      img: [
        "src/assets/img/tmp/*.{png,jpg,gif}",
        "src/assets/img/build/*.{png,jpg,gif}",
      ],
      svg: ["src/assets/img/tmp/*.svg", "src/assets/img/build/*.svg"],
      // !Important to keep compiled other half of CSS,
      // to allow for quicker concatenation
      baseCss: [
        "src/assets/css/tmp/base.css",
        "src/assets/css/tmp/style.css",
        "src/assets/css/build/style.css",
      ],
      projectCss: [
        "src/assets/css/tmp/project.css",
        "src/assets/css/tmp/style.css",
        "src/assets/css/build/style.css",
      ],
      css: ["src/assets/css/*"],
      projectJs: ["src/assets/js/tmp/project.js", "src/assets/js/build/*"],
      js: ["src/assets/js/tmp/*", "src/assets/js/build/*"],
      build: ["build/"],
    },
    // Copy production files to build directory
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: "src/",
            src: [
              "assets/favicons/build/*",
              "assets/icons/build/*",
              "assets/img/build/*",
              "assets/css/build/*",
              "assets/fonts/*",
              "assets/js/build/*",
              "utils/**/*",
              "snippets/**/*",
              "templates/**/*",
              "*.{html,php}",
            ],
            dest: "build/",
            filter: "isFile",
          },
        ],
      },
    },
    // Start PHP in-built server
    php: {
      dev: {
        options: {
          hostname: config.host,
          port: config.port,
          base: "src",
          router: "src/router.php",
        },
      },
    },
    // Watcher for running development tasks
    watch: {
      options: {
        spawn: false,
      },
      icons: {
        files: ["src/assets/icons/src/*"],
        tasks: [
          "clean:icons",
          "svg_sprite",
          "svg2png:icons",
          "imagemin:icons",
          "imagemin:iconImg",
        ],
      },
      img: {
        files: ["src/assets/img/src/*.{png,jpg,gif}"],
        tasks: ["clean:img", "imagemin:img"],
      },
      svg: {
        files: ["src/assets/img/src/*.svg"],
        tasks: ["clean:svg", "svg2png:svg", "imagemin:svg", "imagemin:svgImg"],
      },
      baseCss: {
        files: ["src/assets/sass/base/**/*", "src/assets/sass/base.scss"],
        tasks: ["clean:baseCss", "sass:base", "concat:css", "postcss:global"],
      },
      projectCss: {
        files: ["src/assets/sass/project/**/*", "src/assets/sass/project.scss"],
        tasks: [
          "clean:projectCss",
          "sass:project",
          "concat:css",
          "postcss:global",
        ],
      },
      css: {
        files: ["src/assets/sass/foundation/**/*"],
        tasks: ["clean:css", "sass", "concat:css", "postcss:global"],
      },
      projectJs: {
        files: ["src/assets/js/src/project.js"],
        tasks: ["clean:projectJs", "eslint", "babel", "concat:js", "uglify"],
      },
      js: {
        files: ["src/assets/js/src/lib/*"],
        tasks: [
          "clean:js",
          "eslint",
          "babel",
          "concat:libraryJs",
          "concat:js",
          "uglify",
        ],
      },
    },
    // Browser hot-reloading for quicker development
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            "src/assets/icons/build/*",
            "src/assets/img/build/*",
            "src/assets/css/build/*",
            "src/assets/js/build/*",
            "src/utils/**/*",
            "src/snippets/**/*",
            "src/templates/**/*",
            "src/*.{html,php}",
          ],
        },
        options: {
          proxy: `${config.host}:${config.port}`,
          open: true,
          startPath: "/index.php",
          watchTask: true,
          watchEvents: ["add", "change"],
        },
      },
    },
  })

  // Tasks
  grunt.registerTask("install", [
    // Cleanup
    "clean:icons",
    "clean:img",
    "clean:svg",
    "clean:css",
    "clean:js",
    "clean:favicons",
    // Build icons
    "svg_sprite",
    "svg2png:icons",
    "imagemin:icons",
    "imagemin:iconImg",
    // Build images (bitmap + SVG)
    "svg2png:svg",
    "imagemin:svg",
    "imagemin:svgImg",
    "imagemin:img",
    // Build CSS
    "sass",
    "concat:css",
    "postcss:global",
    // Build JS
    "eslint",
    "babel",
    "concat:libraryJs",
    "concat:js",
    "uglify",
    // Build favicons
    "realFavicon:favicons",
    "imagemin:favicons",
  ])
  grunt.registerTask("start", [
    // Start server
    "php",
    // Start browser + sync
    "browserSync",
    // Start watching files for changes
    "watch",
  ])
  grunt.registerTask("build", [
    // Cleanup
    "clean:build",
    // Build core assets
    "install",
    // Build critical CSS
    "php",
    "criticalcss",
    "postcss:critical",
    // Copy files and assets to build
    "copy",
  ])
}
