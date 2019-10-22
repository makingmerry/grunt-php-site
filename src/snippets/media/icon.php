<?php
  $icon = $icon ?? false;
?>

<?php if ($icon): ?>
  <i>
    <svg class="d-block icon">
      <use xlink:href="assets/icons/build/icons.svg#<?php echo $icon; ?>"></use>
    </svg>
  </i>
<?php endif; ?>
