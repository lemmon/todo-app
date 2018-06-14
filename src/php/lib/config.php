<?php

namespace app;

$file = getcwd() . '/config.php';
if (!file_exists($file)) {
  error('Config not found.');
}

define('CONFIG', include $file);
