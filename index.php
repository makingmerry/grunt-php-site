<?php
  $template = 'index';
  $uid = 'index';
  $title = 'Index';
  include 'config.php';
  include 'snippets/head.php';
?>

<!-- view -->
<div class="pos-relative z-1" id="mainframe-wp">
  <main class="mainframe" data-template="<?php echo $template; ?>" data-uid="<?php echo $uid; ?>">
    <h1>
      <?php echo $title; ?> page
    </h1>
    <a href="/page.php">
      go to default page
    </a>
  </main>
</div>
<!-- view: end -->

<?php include 'snippets/foot.php'; ?>