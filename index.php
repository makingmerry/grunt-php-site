<?php
  // Core utility modules:
  include 'config.php';
  include 'helpers.php';

  // Data:
  $site_data = [
    'template' => 'Value',
    'uid' => 'home',
    'title' => 'Home',
    'desc' => 'Home description',
  ];

  snippet('layouts/head', $site_data);
?>

<div class="pos-relative z-1" id="mainframe-wp">
  <main class="mainframe" data-template="<?php echo $site_data['template']; ?>" data-uid="<?php echo $site_data['uid']; ?>">
    <h1>
      <?php echo $site_data['title']; ?> page
    </h1>
    <a href="/page.php">
      go to default page
    </a>
  </main>
</div>

<?php snippet('layouts/foot'); ?>