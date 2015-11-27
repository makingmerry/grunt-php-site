<?
$page = 'styleguide';
include 'header.php';
include 'mast.php';
?>
<main class="wrap">
  <section class="sg__section">
    <h2 class="sg__section-title">Base:</h2>
    <div class="sg__block">
      <h3 class="sg__block-title">Typography:</h3>
      <h4 class="sg__block-unit-title">Headlines:</h4>
      <h1>Headline<br>level 1</h1>
      <h2>Headline<br>level 2</h2>
      <h3>Headline<br>level 3</h3>
      <h4>Headline<br>level 4</h4>
      <h5>Headline<br>level 5 & 6</h5>
      <h4 class="sg__block-unit-title">Paragraph:</h4>
      <p>This is a paragraph. Quisque interdum ut <strong>strong text</strong> nunc et convallis. Aliquam pretium <em>emphasised text</em> et felis ac ultrices. Curabitur vel lacinia nisi. Aliquam quam erat, tincidunt nec orci sed <a href="#0">this is a link</a>, tempus egestas nisi.</p>
      <h4 class="sg__block-unit-title">Preamble:</h4>
      <div class="preamble">
        <p>This paragraph is a preamble. Pellentesque id vehicula tortor. Curabitur cursus massa semper, feugiat nulla at, viverra purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi fermentum purus sem, ac commodo augue varius sit amet. Morbi semper dui vel imperdiet congue. Vivamus lobortis justo non sapien efficitur pellentesque. Praesent mauris ipsum, iaculis sit amet orci quis, vehicula aliquam metus.</p>
      </div>
      <h4 class="sg__block-unit-title">List:</h4>
      <ul>
        <li>This is an unordered list</li>
        <li>full of list items</li>
      </ul>
      <ol>
        <li>This is an ordered list</li>
        <li>full of list items</li>
      </ol>
      <h4 class="sg__block-unit-title">Blockquote:</h4>
      <blockquote>This is a block quote. Quisque interdum ut nunc et convallis. Aliquam pretium et felis ac ultrices. Curabitur vel lacinia nisi. Aliquam quam erat, tincidunt nec orci sed, tempus egestas nisi.</blockquote>
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
        <tr>
          <td class="sg__swatch" style="background-color: #cbc3bd;">$warm-grey: #cbc3bd;</td>
          <td class="sg__swatch" style="background-color: #e5e1de;">$soft-grey: #e5e1de;</td>
        </tr>
        <tr>
          <td class="sg__swatch" style="background-color: #4b306b; color: #fff;">$purple: #4b306b;</td>
        </tr>
        <tr>
          <td class="sg__swatch" style="background-color: #f58c65;">$soft-orange: #f58c65;</td>
        </tr>
        <tr>
          <td class="sg__swatch" style="background-color: #c0f98f;">$soft-green: #c0f98f;</td>
        </tr>
        <tr>
          <td class="sg__swatch" style="background-color: #95d8f1;">$soft-blue: #95d8f1;</td>
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