<?php
  $page    = 'index';
  $preload = true;

  include 'snippets/header.php';
  include 'snippets/preloader.php';
?>

<div class="frame">
  <div class="frame__top">
    <!-- mast -->
    <div class="frame__mast-wrap">
      <?php include 'snippets/mast.php'; ?>
    </div>

    <!-- frame transitions -->
    <div class="frame__tx frame__tx--fade"></div>

    <!-- main -->
    <div class="frame__main-wrap" id="barba-wrapper">
      <main class="barba-container">
        <ul>
          <li><a href="/test.php">TEST: Relative internal link</a></li>
          <li><a href="http://localhost:8888/test.php">TEST: Absolute internal link</a></li>
          <li><a href="/test.php" target="_blank">TEST: Relative internal link -- new tab</a></li>
          <li><a href="http://localhost:8888/test.php" target="_blank">TEST: Absolute internal link -- new tab</a></li>
          <li><a href="https://www.google.com.sg/">TEST: External link</a></li>
          <li><a href="https://www.google.com.sg/" target="_blank">TEST: External link -- new tab</a></li>
          <li><a href="#test-section">TEST: Section link</a></li>
          <li><a href="mailto:neilson@pettycache.info">TEST: Mailto: link</a></li>
          <li><a href="tel:63543006">TEST: Tel: link</a></li>
        </ul>
      </main>
    </div>
  </div>

  <!-- base -->
  <div class="frame__bot">
    <div class="frame__base-wrap">
      <?php include 'snippets/base.php'; ?>
    </div>
  </div>
</div>

<?php include 'snippets/footer.php'; ?>