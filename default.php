<?php
  $page = 'default';
  include 'snippets/header.php';
  include 'snippets/loader.php';
?>

<div class="d-flex fdr-row fwp-wrap ac-s-between frame">
  <div class="g-12-12 frame__top">
    <!-- mast -->
    <div class="m-bottom-4 frame__mast-wp">
      <?php include 'snippets/mast.php'; ?>
    </div>

    <!-- main -->
    <div class="frame__main-wp" id="mainframe-wp">
      <main class="mainframe" data-namespace="<?php echo $page; ?>">
        default<br>
        <a href="/">go to home page</a>
      </main>
    </div>
  </div>

  <!-- base -->
  <div class="g-12-12 frame__bot">
    <div class="m-top-4 frame__base-wp">
      <?php include 'snippets/base.php'; ?>
    </div>
  </div>
</div>

<?php include 'snippets/footer.php'; ?>