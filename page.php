<?php
  // Core utility modules:
  include 'config.php';
  include 'helpers.php';

  // Data:
  $data = [
    'template' => 'Value',
    'uid' => 'home',
    'title' => 'Home',
    'desc' => 'Home description',
  ];

  snippet('layouts/head', $data);
?>

<div class="pos-relative z-1" id="mainframe-wp">
  <main class="mainframe" data-template="<?php echo $data['template']; ?>" data-uid="<?php echo $data['uid']; ?>">
    <h1>
      <?php echo $data[title]; ?> page
    </h1>
    <a href="/index.php">
      go to home page
    </a>
  </main>
</div>

<?php snippet('layouts/foot'); ?>