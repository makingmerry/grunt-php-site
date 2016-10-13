<?
$page = 'index';
include 'header.php';
include 'mast.php';
?>

<!-- <main>
  <header class="row">
    <div class="col col--s-12 col--m-8 col--l-9">
      <div class="col__core">
        <h1 class="title title--xl">Task runner</h1>
      </div>
    </div>
  </header>


  <div class="row row--m">
    <nav class="col col--m-4 col--l-3">
      <div class="col__core">
        <ol>
          <li>
            <a href="#introduction">Introduction</a>
          </li>
          <li>
            <a href="#installation">Installation</a>
          </li>
          <li>
            <a href="#configuration">Configuration</a>
          </li>
          <li>
            <a href="#features">Features</a>
            <ol>
              <li>
                <a href="#0">Scalable Vector Graphics (SVG)</a>
              </li>
              <li>
                <a href="#0">Favicons</a>
              </li>
              <li>
                <a href="#0">Static Images</a>
              </li>
              <li>
                <a href="#0">Cascading Stylesheets (CSS)</a>
              </li>
              <li>
                <a href="#0">Javascripts (JS)</a>
              </li>
            </ol>
          </li>
          <li>
            <a href="#tasks">Tasks</a>
          </li>
        </ol>
      </div>
    </nav>



    <article class="col col--m-8 col--l-9">
      <div class="col__core">
        <section id="introduction">
          <h2 class="title title--l">Introduction</h2>

          <div>
            <p>Grunt task runner for rapid deployment of static PHP websites by:</p>
            <ol>
              <li>Automating processes to meet basic optimisations in current development standards</li>
              <li>Setting development conventions in the organisation</li>
            </ol>
          </div>
        </section>



        <section id="installation">
          <h2 class="title title--l">Installation</h2>

          <div>
            <ol>
              <li>Install <a href="https://docs.npmjs.com/getting-started/installing-node">Node.js</a> and update npm</li>
              <li>Install <a href="http://gruntjs.com/getting-started">Grunt</a></li>
              <li>Install <a href="http://www.ruby-lang.org/en/documentation/installation/">Ruby</a></li>
              <li>Install <a href="http://sass-lang.com/install">Sass</a></li>
              <li>Install <a href="http://brew.sh/">Brew</a> and <a href="https://github.com/gleero/grunt-favicons">ImageMagick</a> for <em>grunt-favicons</em> module</li>
              <li>Install LiveReload (optional), preferably Chrome's <a href="https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en">LiveReload browser extension</a> if developing on Chrome.</li>
              <li>Add <em>base-site</em> (rename to preference) to folder</li>
              <li>Change directory to deployment on Terminal(Mac) and run 'npm install'</li>
            </ol>
          </div>
        </section>



        <section id="configuration">
          <h2 class="title title--l">Configuration</h2>

          <div>
            <table>
              <caption>Folder structure</caption>
              <thead>
                <tr>
                  <th colspan="3">Property name</th>
                  <th colspan="2">Default value</th>
                  <th colspan="7">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colspan="12">General</th>
                </tr>
                <tr>
                  <td colspan="3">siteFullPath</td>
                  <td colspan="2"><em>null</em></td>
                  <td colspan="7">Full path to the project folder</td>
                </tr>
                <tr>
                  <td colspan="3">src</td>
                  <td colspan="2">'src'</td>
                  <td colspan="7">Source folder name. Source folders store initial assets before build processing.</td>
                </tr>
                <tr>
                  <td colspan="3">tmp</td>
                  <td colspan="2">'tmp'</td>
                  <td colspan="7">Temporary folder name. Temporary folders stored by-products generated during build processes.</td>
                </tr>
                <tr>
                  <td colspan="3">build</td>
                  <td colspan="2">'build'</td>
                  <td colspan="7">Build folder name. Build folders store the output of build processes.</td>
                </tr>
                <tr>
                  <th colspan="12">Media</th>
                </tr>
                <tr>
                  <td colspan="3">svgDir</td>
                  <td colspan="2">'svgs'</td>
                  <td colspan="7">Folder storing SVG icon assets</td>
                </tr>
                <tr>
                  <td colspan="3">faviDir</td>
                  <td colspan="2">'favicons'</td>
                  <td colspan="7">Folder storing Favicon assets</td>
                </tr>
                <tr>
                  <td colspan="3">imgDir</td>
                  <td colspan="2">'images'</td>
                  <td colspan="7">Folder storing static images</td>
                </tr>
                <tr>
                  <th colspan="12">Stylesheets</th>
                </tr>
                <tr>
                  <td colspan="3">sassDir</td>
                  <td colspan="2">'sass'</td>
                  <td colspan="7">Folder storing Sass assets</td>
                </tr>
                <tr>
                  <td colspan="3">cssDir</td>
                  <td colspan="2">'stylesheets'</td>
                  <td colspan="7">Folder storing generated css assets</td>
                </tr>
                <tr>
                  <th colspan="12">Javascripts</th>
                </tr>
                <tr>
                  <td colspan="3">jsDir</td>
                  <td colspan="2">'javascripts'</td>
                  <td colspan="7">Folder storing javascript assets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>



        <section id="features">
          <h2 class="title title--l">Features</h2>

          <section id="scalable-vector-graphics-svg">
            <h3 class="title title--m">Scalable Vector Graphics (SVG)</h3>

            <div>
              <h4>Clean SVGs</h4>
              <ul>
                <li>Change <em>classes</em> and <em>ids</em> to lowercase</li>
                <li>Change <em>ids</em> of SVG groups to <em>classes</em> (name paths/layers: "class="{class name}"")</li>
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
              <h4>Concatenating SVGs into spritesheet</h4>
              <ul>
                <li>Injects individual shape with <em>ids</em> with 'shape-' prefix (shape reference: '#shape-' + {name of file})</li>
                <li>Generates spritesheet in build sub-folder (file reference: svg-defs.svg)</li>
                <li>Generates image fallbacks (file reference: {name of file}.png)</li>
                <li>Compression of generated fallback images</li>
              </ul>
              <h5>Issues/Milestones</h5>
              <ol>
                <li>Generate Sass spritesheet partial</li>
                <li>Generate HTML demo file</li>
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
                <li>
                  <a href="https://github.com/dbushell/grunt-svg2png">https://github.com/dbushell/grunt-svg2png</a>
                </li>
                <li>
                  <a href="https://github.com/gruntjs/grunt-contrib-imagemin">https://github.com/gruntjs/grunt-contrib-imagemin</a>
                </li>
              </ul>
            </div>
          </section>



          <section id="favicon">
            <h3 class="title title--m">Favicons</h3>

            <div>
              <h4>Generating favicon versions</h4>
              <ul>
                <li>Accepts favicon.png</li>
                <li>Recommended size for base image is 640 * 640px</li>
                <li>HTML is generated into page header</li>
                <li>Compression of generated favicon images</li>
              </ul>
              <h5>Issues/Milestones</h5>
              <ol>
                <li>Subsequent favicon generation creates blank lines</li>
              </ol>
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



          <section id="static-images">
            <h3 class="title title--m">Static Images</h3>

            <div>
              <h4>Compressing static images</h4>
              <ul>
                <li>Accepts .png, .jpg, .gif image formats</li>
              </ul>
              <h5>Sources/documentation</h5>
              <ul>
                <li>
                  <a href="https://github.com/gruntjs/grunt-contrib-imagemin">https://github.com/gruntjs/grunt-contrib-imagemin</a>
                </li>
              </ul>
            </div>
          </section>



          <section id="cascading-stylesheets-css">
            <h3 class="title title--m">Cascading Stylesheets (CSS)</h3>

            <div>
              <h4>Compiling Sass into CSS</h4>
              <ul>
                <li>Automated prefixing for CSS properties</li>
                <li>Automated <em>px</em> fallback values provided for <em>rem</em> values</li>
              </ul>
              <h5>Sources/documentation</h5>
              <ul>
                <li>
                  <a href="https://github.com/gruntjs/grunt-contrib-sass">https://github.com/gruntjs/grunt-contrib-sass</a>
                </li>
              </ul>
              <hr>
              <h4>Prevent render blocking of non-critical CSS</h4>
              <ul>
                <li>Critical CSS is called into page header</li>
                <li>Asynchronous and deferred loading of non-critical CSS</li>
                <li>* Manual listing of template pages in Gruntfile</li>
              </ul>
              <h5>Sources/documentation</h5>
              <ul>
                <li>
                  <a href="https://github.com/filamentgroup/grunt-criticalcss">https://github.com/filamentgroup/grunt-criticalcss</a>
                </li>
                <li>
                  <a href="https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery">https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery</a>
                </li>
                <li>
                  <a href="https://varvy.com/pagespeed/render-blocking-css.html">https://varvy.com/pagespeed/render-blocking-css.html</a>
                </li>
              </ul>
            </div>
          </section>



          <section id="javascripts-js">
            <h3 class="title title--m">Javascripts (JS)</h3>

            <div>
              <h4>Ensuring code quality and consistency</h4>
              <ul>
                <li>Lint logs errors, bad practices and inconsistencies in terminal</li>
              </ul>
              <h5>Sources/documentation</h5>
              <ul>
                <li>
                  <a href="https://github.com/gruntjs/grunt-contrib-jshint">https://github.com/gruntjs/grunt-contrib-jshint</a>
                </li>
              </ul>
              <hr>
              <h4>Concatenating scripts into a global script</h4>
              <ul>
                <li>Generates global script in build sub-folder (file reference: global.min.js</li>
                <li>* Manual ordered listing of script files in Gruntfile</li>
              </ul>
              <h5>Sources/documentation</h5>
              <ul>
                <li>
                  <a href="https://github.com/gruntjs/grunt-contrib-concat">https://github.com/gruntjs/grunt-contrib-concat</a>
                </li>
                <li>
                  <a href="https://github.com/gruntjs/grunt-contrib-uglify">https://github.com/gruntjs/grunt-contrib-uglify</a>
                </li>
              </ul>
              <hr>
              <h4>Prevent render blocking of non-critical scripts</h4>
              <ul>
                <li>Asynchronous and deferred loading of non-critical scripts</li>
                <li>* Manual adding of critical scripts</li>
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



          <section id="layout">
            <h3 class="title title--m">Layout</h3>

            <div>
              <h4>Basic grid system</h4>
              <ul>
                <li>Flex-box based row and column grid system (file references: base/_grid.scss)</li>
              </ul>
              <h5>Sources/documentation</h5>
              <ul>
                <li><a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">https://css-tricks.com/snippets/css/a-guide-to-flexbox/</a></li>
              </ul>
            </div>
          </section>
        </section>



        <section id="tasks">
          <h2 class="title title--l">Tasks</h2>

          <div>
            <h3>grunt watch</h3>
            <p>Watches for changes to specific scopes:</p>
            <ul>
              <li>Template files</li>
              <li>Static images</li>
              <li>SVG files</li>
              <li>Sass files</li>
              <li>Project script (file reference: main.js)</li>
            </ul>
            <p>and runs scope specific processes, fires LiveReload if available.</p>
            <hr>
            <h3>grunt build-favicons</h3>
            <p>Generate favicon images and HTML.<br>
            * Subsequent generations create blank lines in place of previously generated HTML, refactor as required.</p>
            <hr>
            <h3>grunt build-critical-css</h3>
            <p>Generate critical CSS for various template files.<br>
            * Not included in watch due to manual aspect of listing template files and long processing time for generating critical styles.</p>
            <hr>
            <h3>grunt</h3>
            <p>Full build of site, useful for initial deployment.</p>
          </div>
        </section>
      </div>
    </article>
  </div>
</main> -->

<button class="test-btn">TOGGLE</button>

<div class="test-mast">
  <a href="#0">Mast Link</a>
</div>

<div class="test-shell">
  <div class="test-main">
    <a href="#0">Main Link</a>
  </div>

  <div class="test-foot">
    <div class="test-foot__content">
      <a href="#0">Foot Link</a>
    </div>
  </div>
</div>

<?
include 'base.php';
include 'footer.php';
?>