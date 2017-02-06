# Task Runner



## Introduction
Grunt task runner for rapid deployment of static PHP sites by:

1. Automating processes to meet basic optimisations in current development standards
2. Setting development conventions in the organisation



## Installation
1. Install [Node.js](https://docs.npmjs.com/getting-started/installing-node) and update npm
2. Install [Grunt](http://gruntjs.com/getting-started)
3. Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
4. Install [Sass](http://sass-lang.com/install)
5. Install [Brew](http://brew.sh/) and [ImageMagick](https://github.com/gleero/grunt-favicons) for grunt-favicons module
6. Install LiveReload (optional), preferably Chrome's [LiveReload browser extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) if developing on Chrome.
7. Add _base-site_(rename to preference) to folder
8. Change directory to deployment on Terminal(Mac) and run `npm install`



## Configuration
### General
| Property name  | Default value | Description                                                                                   |
| -------------- | :-----------: | --------------------------------------------------------------------------------------------: |
| `siteFullPath` | `null`        | Full path to the project folder                                                               |
| `src`          | "src"         | Source folder name. Source folders store initial assets before build processing.              |
| `tmp`          | "tmp"         | Temporary folder name. Temporary folders stored by-products generated during build processes. |
| `build`        | "build"       | Build folder name. Build folders store the output of build processes.                         |

### Media
| Property name  | Default value | Description                                                                                   |
| -------------- | :-----------: | --------------------------------------------------------------------------------------------: |
| `svgDir`       | "svgs"        | Folder storing SVG icon assets                                                                |
| `faviDir`      | "favicons"    | Folder storing Favicon assets                                                                 |
| `imgDir`       | "images"      | Folder storing static images                                                                  |

### Stylesheets
| Property name  | Default value | Description                                                                                   |
| -------------- | :-----------: | --------------------------------------------------------------------------------------------: |
| `sassDir`      | "sass"        | Folder storing Sass assets                                                                    |
| `cssDir`       | "stylesheets" | Folder storing generated css assets                                                           |
| `fontDir`      | "fonts"       | Folder storing font assets                                                                    |

### Javascripts
| Property name  | Default value | Description                                                                                   |
| -------------- | :-----------: | --------------------------------------------------------------------------------------------: |
| `jsDir`        | "javascripts" | Folder storing javascript assets       



## Features

### Scalable Vector Graphics (SVG)
#### Clean SVGs
- Change `classes` and `ids` to lowercase
- Change `ids` of SVG groups to `classes` (name paths/layers: `class="{class name}"`)

##### Sources/documentation
- <http://mattsoria.com/killersvgworkflow/>
- <https://github.com/yoniholmes/grunt-text-replace>

---

#### Concatenating SVGs into spritesheet
- Injects individual shape with ids with `shape-` prefix (shape reference: `#shape- + {name of file}`)
- Generates spritesheet in build sub-folder (file reference: svg-defs.svg)
- Generates image fallbacks (file reference: {name of file}.png)
- Compression of generated fallback images

##### Issues/Milestones
- Generate Sass spritesheet partial
- Generate HTML demo file

##### Sources/documentation
- <http://mattsoria.com/killersvgworkflow/>
- <https://github.com/FWeinb/grunt-svgstore>
- <https://github.com/sindresorhus/grunt-svgmin>
- <https://github.com/dbushell/grunt-svg2png>
- <https://github.com/gruntjs/grunt-contrib-imagemin>


### Favicons
#### Generating favicon versions
- Accepts favicon.png
- Recommended size for base image is 640 * 640px
- HTML is generated into page header
- Compression of generated favicon images

##### Issues/Milestones
- Subsequent favicon generation creates blank lines

##### Sources/documentation
- <https://github.com/audreyr/favicon-cheat-sheet>
- <https://github.com/gleero/grunt-favicons>
- <https://github.com/gruntjs/grunt-contrib-imagemin>


### Static Images
#### Compressing static images
- Accepts .png, .jpg, .gif image formats

##### Sources/documentation
- <https://github.com/gruntjs/grunt-contrib-imagemin>


### Cascading Stylesheets (CSS)
#### Compiling Sass into CSS
- Automated prefixing for CSS properties
- Automated `px` fallback values provided for `rem` values

##### Sources/documentation
- <https://github.com/gruntjs/grunt-contrib-sass>

---

#### Prevent render blocking of non-critical CSS
- Critical CSS is called into page header
- Asynchronous and deferred loading of non-critical CSS
- * Manual listing of template pages in Gruntfile

##### Sources/documentation
- <https://github.com/filamentgroup/grunt-criticalcss>
- <https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery>
- <https://varvy.com/pagespeed/render-blocking-css.html>


### Javascripts (JS)
#### Ensuring code quality and consistency
- Lint logs errors, bad practices and inconsistencies in terminal

##### Sources/documentation
- <https://github.com/gruntjs/grunt-contrib-jshint>

---

#### Concatenating scripts into a global script
- Generates global script in build sub-folder (file reference: global.min.js
- * Manual ordered listing of script files in Gruntfile

##### Sources/documentation
- <https://github.com/gruntjs/grunt-contrib-concat>
- <https://github.com/gruntjs/grunt-contrib-uglify>

---

#### Prevent render blocking of non-critical scripts
- Asynchronous and deferred loading of non-critical scripts
- * Manual adding of critical scripts

##### Sources/documentation
- <https://developers.google.com/speed/docs/insights/BlockingJS>
- <https://varvy.com/pagespeed/render-blocking.html>


### Layout
#### Basic grid system
- `Flex-box` based row and column grid system (file references: base/_grid.scss)

##### Sources/documentation
- <https://css-tricks.com/snippets/css/a-guide-to-flexbox>/



## Tasks
| Operation name             | Description                                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `grunt watch`              | Watches for changes to listed scope (templates, images, SVG files, Sass files, scripts) and fires LiveReload if available.                                                        |
| `grunt build-favicons`     | Generate favicon images and HTML. * Subsequent generations create blank lines in place of previously generated HTML, refactor as required.                                        |
| `grunt build-critical-css` | Generate critical CSS for various template files. * Not included in watch due to manual aspect of listing template files and long processing time for generating critical styles. |
| `grunt build`              | Generate a build copy of the files (not listing source and temporarily generated files)                                                                                           |
| `grunt`                    | Full build of site, useful for initial deployment.                                                                                                                                |