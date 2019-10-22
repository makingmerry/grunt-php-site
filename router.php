<?php
  // Define root path variables
  if (!defined('__ROOT__')) {
    define('__ROOT__', __DIR__);
  }
  if (!defined('__SRC__')) {
    define ('__SRC__', __ROOT__.'/src');
  }

  // If requested file is a .php or .html file, look at templates folder
  // Locate and return requested file if exists

  // if (file_exists($templates.$_SERVER['SCRIPT_NAME'])) {
  //   include $templates.$_SERVER['SCRIPT_NAME'];
  // } else {
  //   $_SERVER['SCRIPT_NAME'] = str_replace($_SERVER['DOCUMENT_ROOT'], '', $template = $templates . '/templates' . $_SERVER['SCRIPT_NAME']);

  //   include $template;

  // }
?>