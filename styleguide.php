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
      <table class="sg__swatch-table">
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

    <div class="sg__block">
      <h3 class="sg__block-title">Table:</h3>
      <table>
        <caption>Caption</caption>
        <thead>
          <tr>
            <th colspan="6" scope="col">Key</th>
            <th colspan="6" scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colspan="6" scope="row">Item</th>
            <td colspan="6">0000</td>
          </tr>
          <tr>
            <th colspan="6" scope="row">Item</th>
            <td colspan="6">0000</td>
          </tr>
          <tr>
            <th colspan="6" scope="row">Item</th>
            <td colspan="6">0000</td>
          </tr>
        </tbody>
      </table>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;table&gt;
  &lt;caption&gt;Caption&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th colspan=&quot;6&quot; scope=&quot;col&quot;&gt;Key&lt;/th&gt;
      &lt;th colspan=&quot;6&quot; scope=&quot;col&quot;&gt;Value&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th colspan=&quot;6&quot; scope=&quot;row&quot;&gt;Item&lt;/th&gt;
      &lt;td colspan=&quot;6&quot;&gt;0000&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th colspan=&quot;6&quot; scope=&quot;row&quot;&gt;Item&lt;/th&gt;
      &lt;td colspan=&quot;6&quot;&gt;0000&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th colspan=&quot;6&quot; scope=&quot;row&quot;&gt;Item&lt;/th&gt;
      &lt;td colspan=&quot;6&quot;&gt;0000&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</code></pre>
</div>
    </div>

    <div class="sg__block">
      <h3 class="sg__block-title">Form:</h3>
      <fieldset>
        <legend>Legend</legend>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;legend&gt;Legend&lt;/legend&gt;</code></pre>
</div>

      <h4 class="sg__block-unit-title">Textual inputs:</h4>
        <label class="block-label">
          Label for <strong>text</strong> input
          <input type="text" placeholder="e.g. John Doe" required>
        </label>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;label class=&quot;block-label&quot;&gt;
  Label for &lt;strong&gt;text&lt;/strong&gt; input
  &lt;input type=&quot;text&quot; placeholder=&quot;e.g. John Doe&quot; required&gt;
&lt;/label&gt;</code></pre>
</div>

        <label class="block-label">
          Label for <strong>email</strong> input
          <input type="email" placeholder="john@email.com" required>
        </label>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;label class=&quot;block-label&quot;&gt;
  Label for &lt;strong&gt;email&lt;/strong&gt; input
  &lt;input type=&quot;email&quot; placeholder=&quot;john@email.com&quot; required&gt;
&lt;/label&gt;</code></pre>
</div>

        <label class="block-label">
          Label for <strong>tel</strong> input
          <input type="tel" placeholder="98765432" required>
        </label>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;label class=&quot;block-label&quot;&gt;
  Label for &lt;strong&gt;tel&lt;/strong&gt; input
  &lt;input type=&quot;tel&quot; placeholder=&quot;98765432&quot; required&gt;
&lt;/label&gt;</code></pre>
</div>

        <label class="block-label">
          Label for <strong>date</strong> input
          <input type="date" required>
        </label>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;label class=&quot;block-label&quot;&gt;
  Label for &lt;strong&gt;date&lt;/strong&gt; input
  &lt;input type=&quot;date&quot; required&gt;
&lt;/label&gt;</code></pre>
</div>

        <label class="block-label">
          Label for <strong>textarea</strong>
          <textarea placeholder="I fucking love this band. They are the best band in the world. PERIOD."></textarea>
        </label>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;label class=&quot;block-label&quot;&gt;
  Label for &lt;strong&gt;textarea&lt;/strong&gt;
  &lt;textarea placeholder=&quot;I fucking love this band. They are the best band in the world. PERIOD.&quot;&gt;&lt;/textarea&gt;
&lt;/label&gt;</code></pre>
</div>
      </fieldset>

      <h4 class="sg__block-unit-title">Option inputs:</h4>
      <fieldset>
        <legend>legend</legend>
        <label class="block-label">
          Label for <strong>checkbox</strong> inputs
          <label class="option-label"><input type="checkbox" name="checkbox"> option</label>
          <label class="option-label"><input type="checkbox" name="checkbox"> option</label>
        </label>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;label class=&quot;block-label&quot;&gt;
  Label for &lt;strong&gt;checkbox&lt;/strong&gt; inputs
  &lt;label class=&quot;option-label&quot;&gt;&lt;input type=&quot;checkbox&quot; name=&quot;checkbox&quot;&gt; option&lt;/label&gt;
  &lt;label class=&quot;option-label&quot;&gt;&lt;input type=&quot;checkbox&quot; name=&quot;checkbox&quot;&gt; option&lt;/label&gt;
&lt;/label&gt;</code></pre>
</div>

        <label class="block-label">
          Label for <strong>radio</strong> inputs
          <label class="option-label"><input type="radio" name="radio"> option</label>
          <label class="option-label"><input type="radio" name="radio"> option</label>
        </label>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;label class=&quot;block-label&quot;&gt;
  Label for &lt;strong&gt;radio&lt;/strong&gt; inputs
  &lt;label class=&quot;option-label&quot;&gt;&lt;input type=&quot;radio&quot; name=&quot;radio&quot;&gt; option&lt;/label&gt;
  &lt;label class=&quot;option-label&quot;&gt;&lt;input type=&quot;radio&quot; name=&quot;radio&quot;&gt; option&lt;/label&gt;
&lt;/label&gt;</code></pre>
</div>

        <label class="block-label select-label">
          <span class="select-label__text">Label for <strong>select</strong> input</span>
          <select class="select">
            <option value="0">option</option>
            <option value="0">option</option>
          </select>
        </label>
<div class="sg__code-block">
<h5 class="sg__code-block-title">html:</h5>
<pre><code>&lt;label class=&quot;block-label select-label&quot;&gt;
  &lt;span class=&quot;select-label__text&quot;&gt;Label for &lt;strong&gt;select&lt;/strong&gt; input&lt;/span&gt;
  &lt;select class=&quot;select&quot;&gt;
    &lt;option value=&quot;0&quot;&gt;option&lt;/option&gt;
    &lt;option value=&quot;0&quot;&gt;option&lt;/option&gt;
  &lt;/select&gt;
&lt;/label&gt;</code></pre>
</div>
      </fieldset>
    </div>

    <!-- <div class="sg__block">
      <h3 class="sg__block-title">Item:</h3>
      <h4 class="sg__block-unit-title">Unit:</h4>
    </div> -->
  </section>

  <section class="sg__section">
    <h2 class="sg__section-title">Elements:</h2>

    <div class="sg__block">
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