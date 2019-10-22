<?php
  if(!defined('DS'))  define('DS', DIRECTORY_SEPARATOR);
  if(!defined('MB'))  define('MB', (int)function_exists('mb_get_info'));
  if(!defined('BOM')) define('BOM', "\xEF\xBB\xBF");

  // polyfill for new sort flag
  if(!defined('SORT_NATURAL')) define('SORT_NATURAL', 'SORT_NATURAL');

  // a super simple autoloader
  function auto_load($classmap, $base = null) {
    spl_autoload_register(function($class) use ($classmap, $base) {
      $class = strtolower($class);
      if(!isset($classmap[$class])) return false;
      if($base) {
        include($base . DS . $classmap[$class]);
      } else {
        include($classmap[$class]);
      }
    });
  };

  // auto-load all toolkit classes
  auto_load(array(
    // classes
    'silo' => __DIR__ . DS . 'lib' . DS . 'silo.php',
    'tpl'  => __DIR__ . DS . 'lib' . DS . 'tpl.php',
  ));
?>