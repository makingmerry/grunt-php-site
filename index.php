<?php
  $page = 'index';
  include 'snippets/header.php';
  include 'snippets/preloader.php';
?>

<div class="g-12 ac-s-between frame">
  <div class="cl-12-12 frame__top">
    <!-- mast -->
    <div class="m-bottom-4 frame__mast-wrap">
      <?php include 'snippets/mast.php'; ?>
    </div>

    <!-- main -->
    <div class="frame__main-wrap" id="mainframe-wrap">
      <main class="mainframe" data-namespace="<?php echo $page; ?>">
        index<br>
        <a href="/default.php">go to default page</a>
      </main>
    </div>
  </div>

  <!-- base -->
  <div class="cl-12-12 frame__bot">
    <div class="m-top-4 frame__base-wrap">
      <?php include 'snippets/base.php'; ?>
    </div>
  </div>
</div>

<?php include 'snippets/footer.php'; ?>