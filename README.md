# Grunt PHP site

Grunt taskrunner starter-kit for developing accessible and performant .php websites

## Table of contents

1. [Installation](#user-content-installation)
2. [Tasks](#user-content-tasks)
3. [Features](#user-content-detailed-features):
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
grunt install
grunt start
```

## Tasks

| Task            | Description                                         |
| --------------- | --------------------------------------------------- |
| `grunt install` | Compile core project assets                         |
| `grunt start`   | Start development server and watch assets and files |
| `grunt build`   | Build production optimised project assets and files |

## Features

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

- Templates are written to the `/templates` folder
- Includes commonly used core snippets and a basic site structure for
  - Rapidly developing websites
  - Supporting other project features (e.g. favicon generation and injection, .etc)

### Images

#### Compiles spritesheet from individual .svg icon assets

- Individual .svg icon assets are written to the `/assets/icons/src/` folder
- Icons are compiled into a single spritesheet, and can be included in the project as a media snippet:

  **Adding icon:**

  ```
  <?php snippet('media/icon', ['icon' => '{:name}']); ?>
  ```

- Keeping [icons as symbols](https://css-tricks.com/svg-symbol-good-choice-icons/) in an .svg spritesheet allows for additional CSS styling control (e.g. `fill`, `transition`, .etc)
- Optimised fall-back .png files are also generated from original .svg icon assets
- Default (and recommended) dimensions for icon: `24px by 24px`

#### Optimises vector and bitmap image assets

- Both vector and bitmap image assets are written to the `assets/img/src/` folder
- Optimised fall-back .png files are also generated from vector image assets

### CSS

#### Multilayered CSS style of organising CSS

1. Foundational style reset/normalising
2. Use of [Atomic CSS](https://css-tricks.com/methods-organize-css/#article-header-id-2) style classes (e.g. `w-100` for `width: 100%`) for base styling
3. Use of [OOCSS](https://css-tricks.com/methods-organize-css/#article-header-id-0) style overriding classes to support project-specific component styling

#### Compiles from Sass

- Compiles [Sass](https://sass-lang.com/) files from `assets/sass/` folder to `assets/css/` folder
- Sass files are compiled to a single stylesheet to reduce number of stylesheet requests
- Sass files are grouped to reflect multilayered style of organising and component structure:
  ```
  | foundation
  | -- config
  | -- reset
  | -- tools
  | base
  | -- layout
  | -- typography
  | -- theme
  | project
  | -- element
  | -- component
  | -- composition
  | -- page
  ```

#### Automatic critical CSS generation for production code

- On build, critical CSS is generated for all templates listed in `templates/` folder
- `$template` prop in template files must match filename for correct automation

### Javascript

#### Compiles library scripts

- Library scripts are added to the `assets/js/src/` folder
- Library scripts are concatenanted to the project script to form a global script to reduce number of script requests

#### Compiles to ES5

- Write with the latest features and allow [Babel](https://babeljs.io/) to compile down to ES5 for browser compatibility.
- Optimised global script is generated after project script is concatenated with any library scripts

#### Smooth page load transitions

- Uses [Barba.js](https://barba.js.org/docs/v2/user/) to enhance with client-side rendering
- Page transitions are customisable with default loader

#### Google Analytics implementation

- Added basic [Google Analytics](https://analytics.google.com/analytics/web/) implementation to reduce intergration time to Google Analytics

#### Web Font loader implementation

- Added control when linking fonts with [Web Font Loader](https://github.com/typekit/webfontloader), to improve loading experience
