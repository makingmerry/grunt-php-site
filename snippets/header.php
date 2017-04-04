<!DOCTYPE html>
<html lang="en-us">
<head>
  <!-- # meta tags -->
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <title><?php echo $page; ?></title>

  <!-- # og tags -->
  <meta property="og:url" content="">
  <meta property="og:title" content="">
  <meta property="og:description" content="">
  <meta property="og:image" content="">

  <!-- # styles -->
  <!-- load critical inline styles -->
  <style type="text/css">
    <?php
    $file = 'stylesheets/build/critical/'.$page.'.css';
    file_exists($file) AND include $file;
    ?>
  </style>

  <!-- defer loading of non-critical styles -->
  <noscript id="deferred-styles">
    <link href="stylesheets/build/style.css" rel="stylesheet" type="text/css">
  </noscript>

  <!-- hide preloader if javascript is disabled -->
  <noscript>
    <style type="text/css">
      .preloader {
        display: none;
        visibility: hidden;
        opacity: 0;
      }
    </style>
  </noscript>

  <!-- load non-critical styles -->
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

  <!-- # load critical scripts -->
  <script>
    // javascript hook
    if (document.documentElement.classList.length) {
      document.documentElement.className += ' js';
    } else {
      document.documentElement.className = ' js';
    }
    // picture element HTML5 shiv
    document.createElement('picture');
  </script>

  <!-- # favicons -->
</head>
<body>