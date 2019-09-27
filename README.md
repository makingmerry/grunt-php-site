# Grunt PHP site

Grunt taskrunner starter-kit for generating .php websites

## Table of contents

1. [Installation](#user-content-installation)
2. [Tasks](#user-content-tasks)
3. [Features](#user-content-features):
4. [Detailed features](#user-content-detailed-features):
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

| Task          | Description                                            |
| ------------- | ------------------------------------------------------ |
| `grunt init`  | Compile and process initial core project assets        |
| `grunt build` | Build production optimised project assets and files    |
| `grunt`       | Start development server and watch on assets and files |

## Features

1. **General**

   1. Generates favicon variants and application icons
   2. Starts development server with hot reloading in browser

2. **Markup**

   1. Scoped snippet include function to support building with reusable components
   2. Starter template structure

3. **Images**

   1. Compiles spritesheet from individual .svg icon assets
   2. Optimises vector and bitmap image assets
   3. Generates vector image fallbacks

4. **CSS**

   1. Compiles from Sass
   2. Configurable critical CSS generation
   3. Generates atomic CSS classnames

5. **Javascript**
   1. Transpiles from ES6
   2. Configurable smooth page load transitions
   3. Configurable Google Analytics implementation
   4. Configurable Web Font loader implementation

## Detailed features

### General

#### Generates favicon variants and application icons

- Include initial favicon image to `/assets/favicons/src`
- Recommended dimensions for initial favicon image: `260px by 260px`

#### Starts development server with hot-reloading in browser

- Serves .php files with PHP built-in web server
- Hot-reloading in browser when files are updated

### Markup

#### Reusable snippets

- Snippets are written to the `/snippets` folder

  **Writing snippets:**

  ```
  <?php
    // Define expected prop keys and default values
    ${:key} = ${:key} ?? {:default_value};
  ?>
  <div>
    <?php
      // Use prop values in mark-up
      echo ${:key};
    ?>
  </div>
  ```

- Snippets can be included onto templates or other snippets

  **Adding snippets:**

  ```
  <?php
    $data = [
      // data array key-value pairs are passed and scoped to
      // snippet files as prop variables
      '{:key}' => {:value},
    ];
    // path string is relative to /snippets folder
    snippet('path/to/snippet', $data);
  ?>
  ```

#### Starter template structure

- Includes commonly used core snippets and a basic site structure for
  - Rapidly developing websites
  - Supporting other project features (e.g. favicon generation and injection)

### Images

#### Compiles spritesheet from individual .svg icon assets

- Individual .svg icon assets are written to the `/assets/icons/src/` folder
- Icons are compiled into a single spritesheet, and can be included in the project as a media snippet:

  **Adding icon:**

  ```
  <?php snippet('media/icon', ['icon' => '{:name}']); ?>
  ```

- Keeping icons as symbols in an .svg spritesheet allows for additional CSS styling control (e.g. `fill`, `transition`, .etc)
- Optimised fall-back .png files are also generated from original .svg icon assets
- Default (and recommended) dimensions for icon: `24px by 24px`

#### Optimises vector and bitmap image assets

- Both vector and bitmap image assets are written to the `assets/img/src/` folder
- Optimised fall-back .png files are also generated from vector image assets

### CSS

#### Multilayered CSS style of organising CSS

1. Foundational style reset/normalising
2. Use of Atomic CSS style classes (e.g. `w-100` for `width: 100%`) for base styling
3. Use of OOCSS style overriding classes to support project-specific component styling

#### Compiles from Sass

- Compiles .scss files from `assets/sass/` folder to `assets/css/` folder
  <!-- - .scss files are grouped to reflect multilayered style of organising and component structure:
    ```
    | foundation
    | -- config
    | -- reset
    | -- tools
    | base
    | -- properties
    | ---- layout
    | ---- typography
    | ---- theme
    | project
    | -- element
    | -- component
    | -- composition
    | -- page
    ```-->

#### Configurable critical CSS generation

-

### Javascript

#### Transpiles from ES6

#### Configurable smooth page load transitions

#### Configurable Google Analytics implementation

#### Configurable Web Font loader implementation

<!--
TODO:
- Resolve hot-reloading not triggering when CSS and JS is updated.
- Resolve .gitignore conflict and not listing folders/files named icon
- Check if ignore list can be better streamlined.
- Keep empty directories (.keep)
-->

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
