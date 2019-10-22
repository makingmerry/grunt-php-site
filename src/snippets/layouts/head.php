<?php
  $template = $template ?? false;
  $title = $title ?? '';
  $desc = $desc ?? 'false';
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <?php // Meta tags: ?>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $title; ?></title>
    <meta name="description" content="<?php echo $desc; ?>">

    <?php // OpenGraph meta tags: ?>
    <meta property="og:title" content="<?php echo $title; ?>">
    <meta property="og:description" content="<?php echo $desc; ?>">
    <meta property="og:url" content="">
    <meta property="og:image" content="">

    <?php // CSS: ?>
    <?php if ($template): ?>
      <?php // Critical: ?>
      <?php if (file_exists(css('critical/'.$template, true))): ?>
        <?php
          // !Not writing in regular syntax to get around syntax highlighting issues with
          // wrapping PHP in style tags
          echo '<style type="text/css">';
          include css('critical/'.$template);
          echo '</style>';
        ?>
      <?php endif; ?>
    <?php endif; ?>

    <?php // Global: ?>
    <?php if (file_exists(css('style', true))): ?>
      <?php // Defer loading of site-wide CSS, paired with critical-path CSS to improve page render time ?>
      <noscript id="deferred-styles">
        <link href="<?php echo css('style'); ?>" rel="stylesheet" type="text/css">
      </noscript>
      <script>
        var loadDeferredStyles = function() {
          var addStylesNode = document.getElementById('deferred-styles');
          var replacement = document.createElement('div');
          replacement.innerHTML = addStylesNode.textContent;
          document.body.appendChild(replacement);
          addStylesNode.parentElement.removeChild(addStylesNode);
        };
        var raf = requestAnimationFrame || mozRequestAnimationFrame ||
            webkitRequestAnimationFrame || msRequestAnimationFrame;
        if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
        else window.addEventListener('load', loadDeferredStyles);
      </script>
    <?php endif; ?>

    <?php // Core JS: ?>
    <script>
      // Add class hook so UI dependent on javascript can be presented accordingly.
      if (document.documentElement.classList.length) {
        document.documentElement.className += ' js';
      } else {
        document.documentElement.className = ' js';
      }
      // <picture> element shiv.
      document.createElement('picture');
    </script>

    <?php // Favicons: ?>
    <?php $favicons = favicons('favicons', true); ?>
    <?php if ($favicons): ?>
      <?php include $favicons; ?>
    <?php endif; ?>
  </head>
  <body class="
    js-pos-relative js-of-hidden
    l-h-copy
    c-near-black">
      <div class="
        pos-fixed z-3
        w-100vw h-100vh pe-none
        loader__wrap--pre" id="pre-loader">
        <?php snippet('alerts/loader'); ?>
      </div>
      <div class="
        pos-relative z-2
        d-flex flx-dir-row flx-wp-wrap flx-ac-s-between
        h-100vh-min">
        <div class="
          pos-relative z-1
          g12-12">
          <?php // Header: ?>
          <div class="pos-relative z-3">
            <?php snippet('headers/head'); ?>
          </div>

          <?php // View transition loader: ?>
          <div class="
            pos-fixed z-2
            w-100vw h-100vh pe-none" id="view-loader">
            <?php snippet('alerts/loader'); ?>
          </div>