<?php
  include 'utilities/config.php';
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
    data-template="<?php echo $site_data['template']; ?>"
    data-uid="<?php echo $site_data['uid']; ?>">
    <h1>
      <?php echo $site_data['title']; ?> page
    </h1>
    <a href="/">
      go to home page
    </a>
  </main>
</div>

<?php snippet('layouts/foot'); ?>