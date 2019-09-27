<?php
  include 'config.php';
  include 'utilities/helpers.php';
  $site_data = [
    'template' => 'page',
    'uid' => 'page',
    'title' => 'Page',
    'desc' => 'Page description',
  ];
  snippet('layouts/head', $site_data);
?>

<div
  class="pos-relative z-1"
  id="mainframe-wp">
  <main
    class="mainframe"
    <?php echo $site_data['template'] ? 'data-template="'.$site_data['template'].'"' : ''; ?>
    <?php echo $site_data['uid'] ? 'data-uid="'.$site_data['uid'].'"' : ''; ?>>
    <h1>
      <?php echo $site_data['title']; ?> page
    </h1>
    <a href="/index.php">
      go to index page
    </a>
  </main>
</div>

<?php snippet('layouts/foot'); ?>