<?php
  define('__ROOT__', __DIR__);
  $templates = __ROOT__.'/templates';

  if (file_exists(__ROOT__.'/'.$_SERVER['SCRIPT_NAME'])) {
    return false; // serve the requested resource as-is.
  }

  $_SERVER['SCRIPT_NAME'] = str_replace($_SERVER['DOCUMENT_ROOT'], '', $template = $templates . $_SERVER['SCRIPT_NAME']);

  include $template;
?>