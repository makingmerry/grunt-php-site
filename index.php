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
    </ul>
  </nav>

  <article class="col col--m-8 col--l-9 pc-doc__article">
    <div class="pc-doc__article-core">
      <section class="pc-doc__section" id="introduction">
        <header class="pc-doc__section-header">
          <h2 class="title title--l pc-doc__section-title">Introduction</h2>
        </header>

        <div class="pc-doc__section-textarea">
          <p>Grunt taskrunner used for rapid deployment of static PHP websites. It is used for:</p>
          <ol>
            <li>Automating processes to meet basic optimisations in the current development standards</li>
            <li>Setting development conventions in the organisation</li>
          </ol>
        </div>
      </section>

      <section class="pc-doc__section" id="installation">
        <header class="pc-doc__section-header">
          <h2 class="title title--l pc-doc__section-title">Installation</h2>
        </header>

        <div class="pc-doc__section-textarea">
          <p>Under construction</p>
        </div>
      </section>
    </div>
  </article>
</main>

<?
include 'base.php';
include 'footer.php';
?>