# Bob

Framework and [Grunt](http://gruntjs.com/getting-started) task-runner configuration for developing multi-page PHP websites.

---

## Table of contents
1. [Installation](#user-content-installation)
2. [Configuration](#user-content-configuration)
3. [Features](#user-content-features)
4. [Resources](#user-content-resources)

---

## Installation
### Prerequisites
- [Node.js](https://docs.npmjs.com/getting-started/installing-node)
- [Grunt](http://gruntjs.com/getting-started)
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [Sass](http://sass-lang.com/install)
- [Livereload](https://chrome.google.com/webstore/detail/livereload/)

### Install
- Clone project and run npm install

---

## Configuration
### General
| @param    | Type   | Default value   | Description                            |
| --------- | ------ | --------------- | -------------------------------------- |
| path      | string | 'localhost'     | Path to project.                       |
| assets    | string | 'assets'        | Assets folder name.                    |
| library   | string | 'lib'           | Library modules folder name.           |
| source    | string | 'src'           | Source folder name.                    |
| temporary | string | 'tmp'           | Temporary folder name.                 |
| build     | string | 'build'         | Build folder name.                     |

### Structure
| @param    | Type   | Default value   | Description                            |
| --------- | ------ | --------------- | -------------------------------------- |
| snipDir   | string | 'snippets'      | Folder containing snippet blocks.      |

### Media
| @param    | Type   | Default value   | Description                            |
| --------- | ------ | --------------- | -------------------------------------- |
| faviDir   | string | 'favicons'      | Folder containing the favicon image.   |
| symbDir   | string | 'symbols'       | Folder containing graphic symbols.     |
| imgDir    | string | 'images'        | Folder containing images and graphics. |

### CSS
| @param    | Type   | Default value   | Description                            |
| --------- | ------ | --------------- | -------------------------------------- |
| sassDir   | string | 'favicons'      | Folder containing Sass partials.       |
| cssDir    | string | 'symbols'       | Folder containing compiled CSS.        |
| fontDir   | string | 'images'        | Folder containing font files.          |

### JS    
| @param    | Type   | Default value   | Description                            |
| --------- | ------ | --------------- | -------------------------------------- |
| jsDir     | string | 'javascripts'   | Folder containing JS modules.          |

---

## Features
### Media
  - #### Icon spritesheet
    Concat and compile individual graphics into a single spritesheet for use.
    ##### Configuration/documentation:
      - Compiling spritesheet: [grunt-svg-sprite](https://github.com/jkphl/grunt-svg-sprite)

  - #### Image optimisation
    Generate vector graphic fallbacks and minify images.
    ##### Configuration/documentation:
      - Generating vector graphic fallbacks: [grunt-svg2png](https://www.npmjs.com/package/grunt-svg2png)
      - Minification: [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)

### CSS
  - #### Sass compilation
    Concat, process (e.g. adding vendor prefixes, .etc) and compiling Sass partials into CSS.
    ##### Configuration/documentation:
      - Concatenating and compiling: [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)
      - Processors: [grunt-postcss](https://github.com/nDmitry/grunt-postcss)

  - #### Critical CSS
    Generate critical CSS for rendering 'above the fold' content for individual templates.
    ##### Configuration/documentation:
      - Generating critical CSS: [grunt-criticalcss](https://github.com/filamentgroup/grunt-criticalcss)

  - #### Functional classes with modular structure
    Generate property-based functional classes for rapid development, while setting modular structure for extension.
    ##### Configuration/documentation:
      - Functional classes: [Scoop](https://github.com/makingmerry/tool_scoop)

### JS
  - #### Transpile, concat and compile
    Transpile ES6 code to ES5 code, concatenate required modules and minify for production.
    ##### Configuration/documentation:
      - Transpiling ES6 code: [grunt-babel](https://github.com/babel/grunt-babel)
      - Concatenation: [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
      - Minification: [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)

  - #### Linting
    Enforce JS development standards, following the [Airbnb Styleguides](https://github.com/airbnb/javascript).
    ##### Configuration/documentation:
      - Linter: [grunt-eslint](https://github.com/sindresorhus/grunt-eslint)
      - Styleguide: [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

  - #### Smooth page transitions
    Simulate Single Page Application (SPA) style transitions when moving around pages.
    ##### Configuration/documentation:
      - Ajax transition library: [Barba.js](http://barbajs.org/)

### Integrated services/applications
  - #### Analytics tracking
    Setup preferred analytics' (Google Analytics) tracking code.
    ##### Configuration/documentation:
      - Async implementation: [Google Analytics fundamentals](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
      - SPA tracking: [Google Analytics SPA tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications)

  - #### Favicon generation
    Generate and install a multi-platform favicon.
    ##### Configuration/documentation:
      - Generator: [Real Favicon Generator](https://realfavicongenerator.net)

  - #### Asynchronous web font loading
    Asynchronously add web fonts with most popular web font providers.
    ##### Configuration/documentation:
      - Loader: [Web Font Loader](https://github.com/typekit/webfontloader)

---

## Resources
*Coming soon*
