<?php
  // Define root path variables
  if (!defined('__ROOT__')) {
    define('__ROOT__', __DIR__);
  }

  // Define requested file variables
  $ext = pathinfo($_SERVER['SCRIPT_NAME'], PATHINFO_EXTENSION);
  $req_path = __ROOT__ . $_SERVER['SCRIPT_NAME'];

  // If requested file exists, don't route
  if (file_exists($req_path)) {
    return false;
  }

  // If requested file is a template file, route to templates
  if ($ext === 'php' || $ext === 'html') {
    $tpl_req_path = __ROOT__ . '/templates' . $_SERVER['SCRIPT_NAME'];
    if (file_exists($tpl_req_path)) {
      include __ROOT__ . '/templates' . $_SERVER['SCRIPT_NAME'];
      return;
    }
  }

  // Handle file not found
  print "File does not exist";
?>