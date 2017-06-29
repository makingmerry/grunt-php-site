<?php
  $page = 'default';
  include 'snippets/header.php';
  include 'snippets/preloader.php';
?>

<div class="g-12 g-ac-s-between frame">
  <div class="c-12-12 frame__top">
    <!-- mast -->
    <div class="mb-4 frame__mast-wrap">
      <?php include 'snippets/mast.php'; ?>
    </div>

    <!-- main -->
    <div class="frame__main-wrap" id="mainframe-wrap">
      <main class="mainframe" data-namespace="<?php echo $page; ?>">
        default<br>
        <a href="/">go to home page</a>
      </main>
    </div>
  </div>

  <!-- base -->
  <div class="c-12-12 frame__bot">
    <div class="mt-4 frame__base-wrap">
      <?php include 'snippets/base.php'; ?>
    </div>
  </div>
</div>

<?php include 'snippets/footer.php'; ?>