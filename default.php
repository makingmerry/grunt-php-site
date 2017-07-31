<?php
  $page = 'default';
  $page_type = 'page';
  include 'snippets/header.php';
  include 'snippets/loader.php';
?>

<!-- structure -->
<div class="
  pos-relative z-1
  d-flex flx-dir-row flx-wp-wrap flx-ac-s-between
  h-100vh-min">
  <!-- top -->
  <div class="
    pos-relative z-1
    g12-12">
    <!-- view mast -->
    <div class="
      pos-relative z-2
      m-bottom-4">
      <?php include 'snippets/mast.php'; ?>
    </div>

    <!-- view -->
    <div class="pos-relative z-1" id="mainframe-wp">
      <main class="mainframe" data-namespace="<?php echo $page; ?>">
        default<br>
        <a href="/index.php">go to index page</a>
      </main>
    </div>
  </div>

  <!-- bottom -->
  <div class="
    pos-relative z-2
    g12-12">
    <!-- view base -->
    <div class="m-top-4">
      <?php include 'snippets/base.php'; ?>
    </div>
  </div>
</div>

<?php include 'snippets/footer.php'; ?>