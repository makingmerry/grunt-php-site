<?php
  require_once('scoped_include/index.php');

  // Include snippet with scoped data.
  function snippet($name, $data = [], $return = false) {
    return tpl::load_file(SITE_ROOT . '/snippets/' . $name . '.php', $data, $return);
  };
?>