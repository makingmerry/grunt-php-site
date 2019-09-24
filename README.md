# Grunt PHP site

Grunt taskrunner starter-kit for generating .php websites.

## Table of contents

1. [Installation](#user-content-installation)
2. [Tasks](#user-content-tasks)
3. [Features](#user-content-features):
    1. [General](#user-content-general)
    2. [Markup](#user-content-markup)
    3. [Images](#user-content-media)
    4. [CSS](#user-content-css)
    5. [Javascript](#user-content-javascript)

## Installation
You will need [Node](https://docs.npmjs.com/getting-started/installing-node), [Sass](http://sass-lang.com/install) and [Sass](http://sass-lang.com/install) installed on your local development machine.

To get your starter-kit up and running:

```
npm install
grunt init
grunt
```

## Tasks
| Task               | Description                                            |
| ------------------ | ------------------------------------------------------ |
| ```grunt init```   | Compile and process initial core project assets        |
| ```grunt build```  | Build production optimised project assets and files    |
| ```grunt```        | Start development server and watch on assets and files |

## Features
### General
- * Favicon generation.
- * Development server.
- * Hot reloading.

### Markup
- * Base site structure.
- * Scoped snippet includes.

### Images
- Compiles spritesheet from individual .svg icon assets.
- Optimises vector and bitmap image assets.
- Generates vector image fallbacks.

### CSS
- Compiles from Sass.
- Configurable critical CSS generation.
- Generates atomic CSS classnames.

### Javascript
- Transpiles from ES6.
- Configurable smooth page load transitions.
- Configurable Google Analytics implementation.
- Configurable Web Font loader implementation.
- * Prettier config.

<!-- # Bob


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
  - #### Built-in PHP web server
    Runs a built-in server to assist in developing PHP projects or running tests.
      ##### Configuration/documentation:
      - Module: [grunt-php](https://github.com/sindresorhus/grunt-php)

  - #### Watching and live reloading of browsers
    Run tasks and reload browsers when files are updated.
      ##### Configuration/documentation:
      - Watcher: [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
      - Browser sync: [grunt-browser-sync](https://github.com/BrowserSync/grunt-browser-sync)

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
*Coming soon* -->


