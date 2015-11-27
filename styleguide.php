<?
$page = 'styleguide';
include 'header.php';
include 'mast.php';
?>
<main class="sg">
  <section class="sg__section">
    <h2 class="sg__section-title">Base:</h2>

    <div class="sg__block">
      <h3 class="sg__block-title">Typography:</h3>
      <h4 class="sg__block-unit-title">Headlines:</h4>
      <h1>Headline<br>level 1</h1>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;h1&gt;&lt;/h1&gt;</code></pre>
</div>

      <h2>Headline<br>level 2</h2>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;h2&gt;&lt;/h2&gt;</code></pre>
</div>

      <h3>Headline<br>level 3</h3>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;h3&gt;&lt;/h3&gt;</code></pre>
</div>

      <h4>Headline<br>level 4</h4>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;h4&gt;&lt;/h4&gt;</code></pre>
</div>

      <h5>Headline<br>level 5 & 6</h5>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;h5&gt;&lt;/h5&gt;
&lt;h6&gt;&lt;/h6&gt;</code></pre>
</div>

      <h4 class="sg__block-unit-title">Paragraph:</h4>
      <p>This is a paragraph.<sup>1</sup> Quisque interdum ut <strong>strong text</strong><sup>2</sup> nunc et convallis. Aliquam pretium <em>emphasised text</em><sup>3</sup> et felis ac ultrices. Curabitur vel lacinia nisi. Aliquam quam erat, tincidunt nec orci sed <a href="#0">this is a link</a><sup>4</sup>, tempus egestas nisi.</p>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code><sup>1</sup>&lt;p&gt;&lt;/p&gt;
<sup>2</sup>&lt;strong&gt;&lt;/strong&gt;
<sup>3</sup>&lt;em&gt;&lt;/em&gt;
<sup>4</sup>&lt;a href=&quot;#0&quot;&gt;&lt;/a&gt;
</code></pre>
</div>

      <h4 class="sg__block-unit-title">Blockquote:</h4>
      <blockquote>This is a block quote. Quisque interdum ut nunc et convallis. Aliquam pretium et felis ac ultrices. Curabitur vel lacinia nisi. Aliquam quam erat, tincidunt nec orci sed, tempus egestas nisi.</blockquote>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;blockquote&gt;&lt;/blockquote&gt;</code></pre>
</div>
    </div>

    <div class="sg__block">
      <h3 class="sg__block-title">List:</h3>
      <h4 class="sg__block-unit-title">Unordered list:</h4>
      <ul>
        <li>This is an unordered list</li>
        <li>full of list items</li>
      </ul>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;ul&gt;
  &lt;li&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>
</div>
  
      <h4 class="sg__block-unit-title">Ordered list:</h4>
      <ol>
        <li>This is an ordered list</li>
        <li>full of list items</li>
      </ol>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;ol&gt;
  &lt;li&gt;&lt;/li&gt;
&lt;/ol&gt;</code></pre>
</div>

      <h4 class="sg__block-unit-title">Detail list:</h4>
      <dl>
        <dt>Detail Term</dt>
        <dd>Detail definition</dd>
      </dl>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;dl&gt;
  &lt;dt&gt;&lt;/dt&gt;
  &lt;dd&gt;&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
</div>
    </div>

    <div class="sg__block">
      <h3 class="sg__block-title">Color swatches:</h3>
      <table>
        <tr>
          <td class="sg__swatch" style="background-color: #111; color: #fff;">$black : #111;</td>
          <td class="sg__swatch" style="background-color: #333; color: #fff;">$base: #333;</td>
          <td class="sg__swatch" style="background-color: #666; color: #fff;">$neutral-1: #666;</td>
          <td class="sg__swatch" style="background-color: #999; color: #fff;">$neutral-2: #999;</td>
        </tr>
        <tr>
          <td class="sg__swatch" style="background-color: #ccc;">$neutral-3: #ccc;</td>
          <td class="sg__swatch" style="background-color: #eee;">$neutral-4: #eee;</td>
          <td class="sg__swatch" style="background-color: #fff;">$white: #fff;</td>
        </tr>
      </table>
    </div>

    <!-- <div class="sg__block">
      <h3 class="sg__block-title">Item:</h3>
      <h4 class="sg__block-unit-title">Unit:</h4>
    </div> -->
  </section>

  <section class="sg__section">
    <h2 class="sg__section-title">Elements:</h2>

    <h3 class="sg__block-title">Basic list:</h3>
    <ul class="basic-list">
      <li class="basic-item">Item #1</li>
      <li class="basic-item">Item #2</li>
    </ul>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;ul class="basic-list"&gt;
  &lt;li class="basic-item"&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>
</div>


    <!-- REMOVE -->

    <h3 class="sg__block-title">Preamble:</h3>
    <div class="preamble">
      <p>This paragraph is a preamble. Pellentesque id vehicula tortor. Curabitur cursus massa semper, feugiat nulla at, viverra purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi fermentum purus sem, ac commodo augue varius sit amet. Morbi semper dui vel imperdiet congue. Vivamus lobortis justo non sapien efficitur pellentesque. Praesent mauris ipsum, iaculis sit amet orci quis, vehicula aliquam metus.</p>
    </div>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;div class=&quot;preamble&quot;&gt;
  &lt;p&gt;&lt;/p&gt;
&lt;/div&gt;</code></pre>
</div>

    <!-- <div class="sg__block">
      <h3 class="sg__block-title">Item:</h3>
      <h4 class="sg__block-unit-title">Unit:</h4>
    </div> -->
  </section>

  <section class="sg__section">
    <h2 class="sg__section-title">Components:</h2>

    <!-- <div class="sg__block">
      <h3 class="sg__block-title">Item:</h3>
      <h4 class="sg__block-unit-title">Unit:</h4>
    </div> -->
  </section>

  <section class="sg__section">
    <h2 class="sg__section-title">Compositions:</h2>

    <!-- <div class="sg__block">
      <h3 class="sg__block-title">Item:</h3>
      <h4 class="sg__block-unit-title">Unit:</h4>
    </div> -->
  </section>

  <section class="sg__section">
    <h2 class="sg__section-title">Pages:</h2>

    <!-- <div class="sg__block">
      <h3 class="sg__block-title">Item:</h3>
      <h4 class="sg__block-unit-title">Unit:</h4>
    </div> -->
  </section>
</main>
<?
include 'footer.php';
?>