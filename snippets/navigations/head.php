<?php
  $links = $links ?? false;
?>

<?php if ($links): ?>
  <ul class="list">
    <?php foreach($links as $link): ?>
      <?php
        $href = $link['href'] ?? false;
        $label = $link['label'] ?? false;
        $controls = $link['controls'] ?? false;
      ?>
      <li class="d-i-block">
        <a
          class="nav__a"
          <?php echo $href ? 'href="'.$href.'"' : '' ?>
          <?php echo $controls ? 'data-controls-uid="'.$controls.'"' : '' ?>>
          <span class="nav__a-label"><?php echo $label ? $label : '' ?></span>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>
<?php endif; ?>
