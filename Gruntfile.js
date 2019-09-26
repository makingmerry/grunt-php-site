module.exports = function(grunt) {
  grunt.initConfig({
    // # configuration
    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////

    pkg: grunt.file.readJSON("package.json"),
    config: {
      hostname: "127.0.0.1",
      port: 3000,
      library: "lib",
      assets: "assets",
      source: "src",
      temporary: "tmp",
      build: "build",
      snippets: "snippets",
      favicons: "favicons",
      icons: "icons",
      img: "img",
      sass: "sass",
      css: "css",
      fonts: "fonts",
      js: "js"
    },

    // # modules
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    //////////////////////////////
    // # real favicons
    //////////////////////////////
    realFavicon: {
      favicons: {
        src:
          "<%= config.assets %>/<%= config.favicons %>/<%= config.source %>/favicon.png",
        dest:
          "<%= config.assets %>/<%= config.favicons %>/<%= config.build %>/",
        options: {
          iconsPath:
            "<%= config.assets %>/<%= config.favicons %>/<%= config.build %>/",
          html: [
            "<%= config.assets %>/<%= config.favicons %>/<%= config.build %>/favicons.html"
          ],
          design: {
            ios: {
              pictureAspect: "backgroundAndMargin",
              backgroundColor: "#ffffff",
              margin: "14%",
              assets: {
                ios6AndPriorIcons: false,
                ios7AndLaterIcons: false,
                precomposedIcons: false,
                declareOnlyDefaultIcon: true
              }
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
                  rectangle: false
                }
              }
            },
            androidChrome: {
              pictureAspect: "noChange",
              themeColor: "#ffffff",
              manifest: {
                display: "standalone",
                orientation: "notSet",
                onConflict: "override",
                declared: true
              },
              assets: {
                legacyIcon: false,
                lowResolutionIcons: false
              }
            },
            safariPinnedTab: {
              pictureAspect: "silhouette",
              themeColor: "#ffffff"
            }
          },
          settings: {
            scalingAlgorithm: "Mitchell",
            errorOnImageTooSmall: false
          }
        }
      }
    },

    //////////////////////////////
    // # svg sprite
    //////////////////////////////
    svg_sprite: {
      icons: {
        expand: true,
        cwd: "<%= config.assets %>/<%= config.icons %>/<%= config.source %>/",
        src: ["*.svg"],
        dest: "<%= config.assets %>/<%= config.icons %>/<%= config.build %>/",
        options: {
          mode: {
            icon: {
              dest: ".",
              sprite: "icons.svg"
            }
          }
        }
      }
    },

    //////////////////////////////
    // # svg2png
    //////////////////////////////
    svg2png: {
      icons: {
        files: [
          {
            flatten: true,
            cwd:
              "<%= config.assets %>/<%= config.icons %>/<%= config.source %>/",
            src: ["*.svg"],
            dest:
              "<%= config.assets %>/<%= config.icons %>/<%= config.temporary %>/"
          }
        ]
      },
      graphics: {
        files: [
          {
            flatten: true,
            cwd: "<%= config.assets %>/<%= config.img %>/<%= config.source %>/",
            src: ["*.svg"],
            dest:
              "<%= config.assets %>/<%= config.img %>/<%= config.temporary %>/"
          }
        ]
      }
    },

    //////////////////////////////
    // # imagemin
    //////////////////////////////
    imagemin: {
      img: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: "<%= config.assets %>/<%= config.img %>/<%= config.source %>/",
            src: ["*.{png,jpg,gif}"],
            dest: "<%= config.assets %>/<%= config.img %>/<%= config.build %>/"
          }
        ]
      },
      graphics: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ cleanupIDs: false }, { removeDimensions: true }]
        },
        files: [
          {
            expand: true,
            cwd: "<%= config.assets %>/<%= config.img %>/<%= config.source %>/",
            src: ["*.svg"],
            dest: "<%= config.assets %>/<%= config.img %>/<%= config.build %>/"
          }
        ]
      },
      graphicsFallback: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd:
              "<%= config.assets %>/<%= config.img %>/<%= config.temporary %>/",
            src: ["*.{png,jpg,gif}"],
            dest: "<%= config.assets %>/<%= config.img %>/<%= config.build %>/"
          }
        ]
      },
      icons: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd:
              "<%= config.assets %>/<%= config.icons %>/<%= config.temporary %>/",
            src: ["*.{png,jpg,gif}"],
            dest:
              "<%= config.assets %>/<%= config.icons %>/<%= config.build %>/"
          }
        ]
      },
      favicons: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd:
              "<%= config.assets %>/<%= config.favicons %>/<%= config.build %>/",
            src: ["*.{png,jpg,gif}"],
            dest:
              "<%= config.assets %>/<%= config.favicons %>/<%= config.build %>/"
          }
        ]
      }
    },

    //////////////////////////////
    // # sass
    //////////////////////////////
    sass: {
      functional: {
        options: {
          style: "expanded",
          precision: 3,
          sourcemap: false
        },
        files: {
          "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/functional.css":
            "<%= config.assets %>/<%= config.sass %>/functional.scss"
        }
      },
      structural: {
        options: {
          style: "expanded",
          precision: 3,
          sourcemap: false
        },
        files: {
          "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/structural.css":
            "<%= config.assets %>/<%= config.sass %>/structural.scss"
        }
      }
    },

    //////////////////////////////
    // # postcss
    //////////////////////////////
    postcss: {
      base: {
        options: {
          map: false,
          processors: [
            require("pixrem")(),
            require("autoprefixer")({ browsers: "last 2 versions" }),
            require("cssnano")()
          ]
        },
        src:
          "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/style.css",
        dest:
          "<%= config.assets %>/<%= config.css %>/<%= config.build %>/style.css"
      },
      critical: {
        options: {
          map: false,
          processors: [
            require("pixrem")(),
            require("autoprefixer")({ browsers: "last 2 versions" }),
            require("cssnano")()
          ]
        },
        expand: true,
        cwd:
          "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/critical/",
        src: ["**/*.css"],
        dest:
          "<%= config.assets %>/<%= config.css %>/<%= config.build %>/critical/"
      }
    },

    //////////////////////////////
    // # critical css
    //////////////////////////////
    criticalcss: {
      index: {
        options: {
          url: "http://<%= config.hostname %>:<%= php.dev.options.port %>",
          filename:
            "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/style.css",
          width: 1280,
          height: 720,
          outputfile:
            "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/critical/index.css",
          forceInclude: [],
          ignoreConsole: true
        }
      },
      default: {
        options: {
          url:
            "http://<%= config.hostname %>:<%= php.dev.options.port %>/page.php",
          filename:
            "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/style.css",
          width: 1280,
          height: 720,
          outputfile:
            "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/critical/default.css",
          forceInclude: [],
          ignoreConsole: true
        }
      }
    },

    //////////////////////////////
    // # eslint
    //////////////////////////////
    eslint: {
      options: {
        configFile: "",
        rulePaths: ""
      },
      project: [
        "<%= config.assets %>/<%= config.js %>/<%= config.source %>/project.js"
      ]
    },

    //////////////////////////////
    // # babel
    //////////////////////////////
    babel: {
      options: {
        sourceMap: true
      },
      project: {
        files: {
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/project.js":
            "<%= config.assets %>/<%= config.js %>/<%= config.source %>/project.js"
        }
      }
    },

    //////////////////////////////
    // # uglify
    //////////////////////////////
    uglify: {
      library: {
        src:
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/library.js",
        dest:
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/library.js"
      },
      project: {
        src:
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/project.js",
        dest:
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/project.js"
      },
      global: {
        src:
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/global.js",
        dest:
          "<%= config.assets %>/<%= config.js %>/<%= config.build %>/global.js"
      }
    },

    //////////////////////////////
    // # concat
    //////////////////////////////
    concat: {
      css: {
        src: [
          "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/functional.css",
          "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/structural.css"
        ],
        dest:
          "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/style.css"
      },
      libraryJs: {
        src: [
          "<%= config.assets %>/<%= config.js %>/<%= config.source %>/<%= config.library %>/*.js"
        ],
        dest:
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/library.js"
      },
      js: {
        src: [
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/library.js",
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/project.js"
        ],
        dest:
          "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/global.js"
      }
    },

    //////////////////////////////
    // # clean
    //////////////////////////////
    clean: {
      favicons: [
        "<%= config.assets %>/<%= config.favicons %>/<%= config.build %>/*"
      ],
      icons: [
        "<%= config.assets %>/<%= config.icons %>/<%= config.temporary %>/*",
        "<%= config.assets %>/<%= config.icons %>/<%= config.build %>/*"
      ],
      img: [
        "<%= config.assets %>/<%= config.img %>/<%= config.temporary %>/*",
        "<%= config.assets %>/<%= config.img %>/<%= config.build %>/*"
      ],
      functionalCss: [
        "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/functional.css",
        "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/functional.css.map",
        "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/style.css",
        "<%= config.assets %>/<%= config.css %>/<%= config.build %>/*"
      ],
      structuralCss: [
        "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/structural.css",
        "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/structural.css.map",
        "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/style.css",
        "<%= config.assets %>/<%= config.css %>/<%= config.build %>/*"
      ],
      criticalCss: [
        "<%= config.assets %>/<%= config.css %>/<%= config.temporary %>/critical/*",
        "<%= config.assets %>/<%= config.css %>/<%= config.build %>/critical/*"
      ],
      css: ["<%= config.assets %>/<%= config.css %>/*"],
      libraryJs: [
        "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/library.js"
      ],
      projectJs: [
        "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/project.js",
        "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/project.js.map"
      ],
      js: [
        "<%= config.assets %>/<%= config.js %>/<%= config.temporary %>/*",
        "<%= config.assets %>/<%= config.js %>/<%= config.build %>/*"
      ]
    },

    //////////////////////////////
    // # copy
    //////////////////////////////
    copy: {
      build: {
        expand: true,
        src: [
          "<%= config.assets %>/<%= config.favicons %>/<%= config.build %>/*",
          "<%= config.assets %>/<%= config.icons %>/<%= config.build %>/*",
          "<%= config.assets %>/<%= config.img %>/<%= config.build %>/*",
          "<%= config.assets %>/<%= config.css %>/<%= config.build %>/**",
          "<%= config.assets %>/<%= config.fonts %>/*",
          "<%= config.assets %>/<%= config.js %>/<%= config.build %>/*",
          "<%= config.snipDir %>/**/*.{html,php}",
          "*.{html,php}"
        ],
        dest: "build/"
      }
    },

    //////////////////////////////
    // # php server
    //////////////////////////////
    php: {
      dev: {
        options: {
          hostname: "<%= config.hostname %>",
          port: 8888,
          base: "."
        }
      }
    },

    //////////////////////////////
    // # watch
    //////////////////////////////
    watch: {
      options: {
        spawn: false
      },
      icons: {
        files: [
          "<%= config.assets %>/<%= config.icons %>/<%= config.source %>/**"
        ],
        tasks: ["build-icons"]
      },
      img: {
        files: [
          "<%= config.assets %>/<%= config.img %>/<%= config.source %>/**"
        ],
        tasks: ["build-img"]
      },
      functionalCss: {
        files: [
          "<%= config.assets %>/<%= config.sass %>/base/properties/**/*.scss",
          "<%= config.assets %>/<%= config.sass %>/functional.scss"
        ],
        tasks: ["build-functional-css"]
      },
      structuralCss: {
        files: [
          "<%= config.assets %>/<%= config.sass %>/element/*.scss",
          "<%= config.assets %>/<%= config.sass %>/component/*.scss",
          "<%= config.assets %>/<%= config.sass %>/composition/*.scss",
          "<%= config.assets %>/<%= config.sass %>/page/*.scss",
          "<%= config.assets %>/<%= config.sass %>/structural.scss"
        ],
        tasks: ["build-structural-css"]
      },
      css: {
        files: [
          "<%= config.assets %>/<%= config.sass %>/base/configurations/*.scss",
          "<%= config.assets %>/<%= config.sass %>/base/tools/*.scss"
        ],
        tasks: ["build-base-css"]
      },
      libraryJs: {
        files: [
          "<%= config.assets %>/<%= config.js %>/<%= config.source %>/<%= config.library %>/*.js"
        ],
        tasks: ["build-library-js"]
      },
      projectJs: {
        files: [
          "<%= config.assets %>/<%= config.js %>/<%= config.source %>/project.js"
        ],
        tasks: ["build-project-js"]
      },
      models: {
        files: ["*.{html,php}", "<%= config.snipDir %>/**/*.{html,php}"]
      }
    },

    //////////////////////////////
    // # browser sync
    //////////////////////////////
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            "<%= config.assets %>/<%= config.favicons %>/<%= config.build %>/*.{html}",
            "<%= config.assets %>/<%= config.icons %>/<%= config.build %>/*.{svg}",
            "<%= config.assets %>/<%= config.img %>/<%= config.build %>/*.{png,jpg,gif,svg}",
            "<%= config.assets %>/<%= config.css %>/<%= config.build %>/*.{css}",
            "<%= config.assets %>/<%= config.js %>/<%= config.build %>/*.{js}",
            "*.{html,php}",
            "<%= config.snipDir %>/**/*.{html,php}"
          ]
        },
        options: {
          proxy: "<%= config.hostname %>:<%= php.dev.options.port %>",
          port: "<%= config.port %>",
          open: true,
          watchTask: true,
          watchEvents: ["add", "change"]
        }
      }
    }
  });

  // # load modules
  /// /////////////////////////////////////////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////////////////////////////

  grunt.loadNpmTasks("grunt-svg-sprite");
  grunt.loadNpmTasks("grunt-svg2png");
  grunt.loadNpmTasks("grunt-real-favicon");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-criticalcss");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-php");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");

  // # tasks
  /// /////////////////////////////////////////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////////////////////////////
  /// /////////////////////////////////////////////////////////////////////////////////////////////////

  grunt.registerTask("build-favicons", [
    "clean:favicons",
    "realFavicon:favicons",
    "imagemin:favicons"
  ]);
  grunt.registerTask("build-icons", [
    "clean:icons",
    "svg_sprite:icons",
    "svg2png:icons",
    "imagemin:icons"
  ]);
  grunt.registerTask("build-graphics", [
    "svg2png:graphics",
    "imagemin:graphics",
    "imagemin:graphicsFallback"
  ]);
  grunt.registerTask("build-img", [
    "clean:img",
    "imagemin:img",
    "build-graphics"
  ]);
  grunt.registerTask("build-functional-css", [
    "clean:functionalCss",
    "sass:functional",
    "concat:css",
    "postcss:base"
  ]);
  grunt.registerTask("build-structural-css", [
    "clean:structuralCss",
    "sass:structural",
    "concat:css",
    "postcss:base"
  ]);
  grunt.registerTask("build-base-css", [
    "clean:css",
    "sass:functional",
    "sass:structural",
    "concat:css",
    "postcss:base"
  ]);
  grunt.registerTask("build-critical-css", [
    "clean:criticalCss",
    "php",
    "criticalcss",
    "postcss:critical"
  ]);
  grunt.registerTask("build-css", ["build-base-css", "build-critical-css"]);
  grunt.registerTask("build-library-js", [
    "clean:libraryJs",
    "concat:libraryJs",
    "uglify:library",
    "concat:js",
    "uglify:global"
  ]);
  grunt.registerTask("build-project-js", [
    "clean:projectJs",
    "eslint:project",
    "babel:project",
    "uglify:project",
    "concat:js",
    "uglify:global"
  ]);
  grunt.registerTask("build-js", [
    "clean:js",
    "concat:libraryJs",
    "uglify:library",
    "eslint:project",
    "babel:project",
    "uglify:project",
    "concat:js",
    "uglify:global"
  ]);
  grunt.registerTask("init", [
    "build-base-css",
    "build-js",
    "build-icons",
    "build-img"
  ]);
  grunt.registerTask("build", [
    "build-favicons",
    "build-icons",
    "build-img",
    "build-css",
    "build-js",
    "copy:build"
  ]);
  grunt.registerTask("default", ["php", "browserSync", "watch"]);
};
