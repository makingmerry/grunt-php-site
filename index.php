<?php
$page    = 'index';
$preload = true;

include 'snippets/header.php';
include 'snippets/preloader.php';
include 'snippets/mast.php';
?>

<div class="main__wrap" id="barba-wrapper">
  <main class="main barba-container">
    <div style="background: pink;">
      index
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

      <div id="test-section" style="margin-top: 100vh;">
        test section
      </div>
    </div>
  </main>
</div>

<?php
include 'snippets/base.php';
include 'snippets/footer.php';
?>