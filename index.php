<?
$page = 'index';
include 'header.php';
include 'mast.php';
?>

<main class="row row--m">
  <header class="col col--m-12 pc-doc__header">
    <div class="col__core">
      <h1 class="title title--xl pc-doc__headline">Task runner</h1>
    </div>
  </header>



  <nav class="col col--m-4 col--l-3 pc-doc__nav">
    <ul class="pc-doc__nav-list">
      <li class="pc-doc__nav-item">
        <a class="pc-doc__nav-link" href="#introduction">
          <span class="pc-doc__nav-link-label">Introduction</span>
        </a>
      </li>
      <li class="pc-doc__nav-item">
        <a class="pc-doc__nav-link" href="#installation">
          <span class="pc-doc__nav-link-label">Installation</span>
        </a>
      </li>
      <li class="pc-doc__nav-item">
        <a class="pc-doc__nav-link" href="#features">
          <span class="pc-doc__nav-link-label">Features</span>
        </a>
      </li>
      <li class="pc-doc__nav-item">
        <a class="pc-doc__nav-link" href="#0">
          <span class="pc-doc__nav-link-label">Configurations</span>
        </a>
      </li>
      <li class="pc-doc__nav-item">
        <a class="pc-doc__nav-link" href="#0">
          <span class="pc-doc__nav-link-label">Tasks/shortcuts</span>
        </a>
      </li>
    </ul>
  </nav>



  <article class="col col--m-8 col--l-9 pc-doc__article">
    <div class="pc-doc__article-core">
      <section class="pc-doc__section" id="introduction">
        <header class="pc-doc__section-header">
          <h2 class="title title--l pc-doc__section-title">Introduction</h2>
        </header>

        <div class="pc-doc__section-textarea">
          <p><a href="http://gruntjs.com/">Grunt task runner</a> for rapid deployment of static PHP websites by:</p>
          <ol>
            <li>Automating processes to meet basic optimisations in current development standards</li>
            <li>Setting development conventions in the organisation</li>
          </ol>
        </div>
      </section>



      <section class="pc-doc__section" id="installation">
        <header class="pc-doc__section-header">
          <h2 class="title title--l pc-doc__section-title">Installation</h2>
        </header>

        <div class="pc-doc__section-textarea">
          <ol>
            <li>Install <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js</a> and update npm</li>
            <li>Install <a href="http://gruntjs.com/getting-started">Grunt</a></li>
            <li>Install <a href="https://github.com/gleero/grunt-favicons">ImageMagick</a> for <em>grunt-favicons</em> module</li>
            <li>Add <em>base-site</em> to folder</li>
            <li>Change directory to deployment on Terminal(Mac) and run 'grunt'</li>
          </ol>
        </div>
      </section>



      <section class="pc-doc__section" id="features">
        <header class="pc-doc__section-header">
          <h2 class="title title--l pc-doc__section-title">Features</h2>
        </header>



        <section class="pc-doc__sub-section" id="scalable-vector-graphics-svg">
          <header class="pc-doc__sub-section-header">
            <h3 class="title title--m">Scalable Vector Graphics (SVG)</h3>
          </header>

          <div class="pc-doc__section-textarea pc-doc__section-textarea--sub">
            <h4>SVG clean up</h4>
            <ul>
              <li>Takes in SVGs from [src] folder and creates clean SVGs in [tmp] folder</li>
              <li>Changes classes and IDs to lowercase</li>
              <li>Changes IDs of groups to classes (layers in illustrator have to be named "class="{class name}"" for this to work)</li>
              <li>Only accepts .svg files</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="http://mattsoria.com/killersvgworkflow/">http://mattsoria.com/killersvgworkflow/</a>
              </li>
              <li>
                <a href="https://github.com/yoniholmes/grunt-text-replace">https://github.com/yoniholmes/grunt-text-replace</a>
              </li>
            </ul>



            <hr>



            <h4>Concatenating SVGs into a single spritesheet</h4>
            <ul>
              <li>Takes in SVGs from [tmp] folder and compresses them into a single sprite sheet (svg-defs.svg) in [build] folder</li>
              <li>Only accepts .svg files</li>
              <li>Reference individual shapes with IDs ('#shape-' + {name of file})</li>
              <li>Automated minification of concatenated spritesheet</li>
            </ul>

            <h5>Issues/Milestones</h5>
            <ol>
              <li>Generate SASS partial with aspect ratio from viewport width and height</li>
              <li>Generate HTML file in [root] listing spritesheets for use</li>
            </ol>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="http://mattsoria.com/killersvgworkflow/">http://mattsoria.com/killersvgworkflow/</a>
              </li>
              <li>
                <a href="https://github.com/FWeinb/grunt-svgstore">https://github.com/FWeinb/grunt-svgstore</a>
              </li>
              <li>
                <a href="https://github.com/sindresorhus/grunt-svgmin">https://github.com/sindresorhus/grunt-svgmin</a>
              </li>
            </ul>



            <hr>



            <h4>Building image fallbacks</h4>
            <ul>
              <li>Takes in SVGs from [src] folder and creates .png files in [build] folder</li>
              <li>Only accepts .svg files</li>
              <li>Reference image file names ({name of file}.png)</li>
              <li>Automated compression of generated fallback images</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="http://mattsoria.com/killersvgworkflow/">http://mattsoria.com/killersvgworkflow/</a>
              </li>
              <li>
                <a href="https://github.com/dbushell/grunt-svg2png">https://github.com/dbushell/grunt-svg2png</a>
              </li>
              <li>
                <a href="https://github.com/gruntjs/grunt-contrib-imagemin">https://github.com/gruntjs/grunt-contrib-imagemin</a>
              </li>
            </ul>
  
            <
          /div>
        </section>



        <section class="pc-doc__sub-section" id="favicons">
          <header class="pc-doc__sub-section-header">
            <h3 class="title title--m">Favicons</h3>
          </header>

          <div class="pc-doc__section-textarea pc-doc__section-textarea--sub">
            <h4>Automated generation of favicons</h4>
            <ul>
              <li>Takes in base image from [src] folder and generates sized versions into [build] folder</li>
              <li>Corresponding markup is generated into page header</li>
              <li>Recommended size for base image is 640 * 640px</li>
              <li>Automated compression of generated images</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://github.com/audreyr/favicon-cheat-sheet">https://github.com/audreyr/favicon-cheat-sheet</a>
              </li>
              <li>
                <a href="https://github.com/gleero/grunt-favicons">https://github.com/gleero/grunt-favicons</a>
              </li>
              <li>
                <a href="https://github.com/gruntjs/grunt-contrib-imagemin">https://github.com/gruntjs/grunt-contrib-imagemin</a>
              </li>
            </ul>
          </div>
        </section>



        <section class="pc-doc__sub-section" id="static-images">
          <header class="pc-doc__sub-section-header">
            <h3 class="title title--m">Static Images</h3>
          </header>

          <div class="pc-doc__section-textarea pc-doc__section-textarea--sub">
            <h4>Automated compression of static images</h4>
            <ul>
              <li>Takes in images from [src] folder and compresses into [build] folder</li>
              <li>Accepts .png, .jpg, .gif image formats</li>
              <li>*Automated resizing and cropping of images not included to allow for art direction</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://github.com/gruntjs/grunt-contrib-imagemin">https://github.com/gruntjs/grunt-contrib-imagemin</a>
              </li>
            </ul>



            <hr>



            <h4>Polyfill for Picture element</h4>
            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://scottjehl.github.io/picturefill/">https://scottjehl.github.io/picturefill/</a>
              </li>
            </ul>
          </div>
  
          </section>



        <section class="pc-doc__sub-section" id="cascading-stylesheets-css">
          <header class="pc-doc__sub-section-header">
            <h3 class="title title--m">Cascading Stylesheets (CSS)</h3>
          </header>

          <div class="pc-doc__section-textarea pc-doc__section-textarea--sub">
            <h4>Compiling Sass into CSS</h4>
            <ul>
              <li>Takes in partials and compresses them into a single stylesheet in the [../stylesheets] folder</li>
              <li>Automated prefixing for CSS properties</li>
              <li>Provide pixel values fallbacks for rem valies</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://github.com/gruntjs/grunt-contrib-sass">https://github.com/gruntjs/grunt-contrib-sass</a>
              </li>
            </ul>



            <hr>



            <h4>Automated minification of CSS</h4>
            <ul>
              <li>Takes in main stylesheet from [tmp] folder and minifies it to [build] folder</li>
              <li>Overwrite critical styles from [tmp/critical] folder post minification</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://github.com/nDmitry/grunt-postcss">https://github.com/nDmitry/grunt-postcss</a>
              </li>
            </ul>



            <hr>



            <h4>Extract critical CSS</h4>
            <ul>
              <li>Extracts the critical CSS from local stylesheet after scanning the URL input [Gruntfile.js]</li>
              <li>Output stored in [tmp/critical] folder</li>
            </ul>

            <h5>Issues/Milestones</h5>
            <ol>
              <li>Add automated removal of properties with external calls (e.g. @font-face, background: url('external') .etc) that might be present in critical styles</li>
              <li>Add automated embedding of critical styles into pages</li>
            </ol>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://github.com/fatso83/grunt-penthouse">https://github.com/fatso83/grunt-penthouse</a>
              </li>
            </ul>



            <hr>



            <h4>Prevent render blocking of non-critical CSS</h4>
            <ul>
              <li>Asynchronous and deferred loading of non-critical CSS</li>
              <li>*Works in conjunction with extraction of critcal CSS</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery">https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery</a>
              </li>
              <li>
                <a href="https://varvy.com/pagespeed/render-blocking-css.html">https://varvy.com/pagespeed/render-blocking-css.html</a>
              </li>
            </ul>
          </div>
        </section>



        <section class="pc-doc__sub-section" id="javascripts-js">
          <header class="pc-doc__sub-section-header">
            <h3 class="title title--m">Javascripts (JS)</h3>
          </header>

          <div class="pc-doc__section-textarea pc-doc__section-textarea--sub">
            <h4>Ensure code quality and consistency</h4>
            <ul>
              <li>Lint logs errors, bad practices and inconsistencies in terminal</li>
            </ul>

            <h5>Issues/Milestones</h5>
            <ol>
              <li>Add unit testing module and cases</li>
            </ol>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://github.com/gruntjs/grunt-contrib-jshint">https://github.com/gruntjs/grunt-contrib-jshint</a>
              </li>
            </ul>



            <hr>



            <h4>Concatenating scripts into a single file</h4>
            <ul>
              <li>Takes in .js files from [src] folder and creates a global.js file in [tmp] folder</li>
              <li>Only accepts listed .js files [Gruntfile.js]</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ol>
              <li>
                <a href="https://github.com/gruntjs/grunt-contrib-concat">https://github.com/gruntjs/grunt-contrib-concat</a>
              </li>
            </ol>



            <hr>



            <h4>Automated minification of scripts</h4>
            <ul>
              <li>Takes in global.js file in [tmp] folder and minifies it to [build] folder</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://github.com/gruntjs/grunt-contrib-uglify">https://github.com/gruntjs/grunt-contrib-uglify</a>
              </li>
            </ul>



            <hr>



            <h4>Preventing render blocking of non-critical scripts</h4>
            <ul>
              <li>Asynchronous and deferred loading of non-critical scripts</li>
            </ul>

            <h5>Sources/documentation</h5>
            <ul>
              <li>
                <a href="https://developers.google.com/speed/docs/insights/BlockingJS">https://developers.google.com/speed/docs/insights/BlockingJS</a>
              </li>
              <li>
                <a href="https://varvy.com/pagespeed/render-blocking.html">https://varvy.com/pagespeed/render-blocking.html</a>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </div>
  </article>
</main>

<?
include 'base.php';
include 'footer.php';
?>