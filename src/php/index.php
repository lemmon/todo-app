<?php

namespace app;

require __DIR__ . '/lib/http.php';
require __DIR__ . '/lib/error.php';
require __DIR__ . '/lib/config.php';
require __DIR__ . '/lib/json.php';

// validate store dir
if (empty(CONFIG['store']) or !is_dir(CONFIG['store']) or !is_writable(CONFIG['store'])) {
  error('Store directory not found or not writable.');
}

// check for ID
$id = $_SERVER['QUERY_STRING'];

// generate new ID if none provided
if (empty($id)) {
  do {
    $id = bin2hex(random_bytes(16));
    $file = CONFIG['store'] . '/' . $id . '.json';
    if (!file_exists(CONFIG['store'] . '/' . $id . '.json')) {
      file_put_contents($file, '{}');
      header('Location: ' . $id);
      exit;
    }
  } while (TRUE);
}

// check if the list exists
$file = CONFIG['store'] . '/' . $id . '.json';
if (!file_exists($file)) {
  error('List not found.');
}

// load the list
$json = file_get_contents($file);
$data = json_decode($json, TRUE);

// save list
switch (HTTP['method']) {
  case 'POST':
    $list = json_decode(file_get_contents('php://input'), TRUE);
    file_put_contents($file, json_encode(array_filter(array_replace($data, [
      'name' => $list['name'] ?? NULL,
      'entries' => $list['entries'] ?? NULL,
      'list' => NULL,
    ])), JSON_PRETTY_PRINT));
    ok($list);
}

// return data
$list = array_intersect_key($data, [
  'name' => TRUE,
  'entries' => TRUE,
]);
if (isset($data['list']) and empty($data['entries'])) { // legacy store
  $list['entries'] = $data['list'];
}
switch (HTTP['accept']) {
  case 'application/json':
    json($list);
    exit;
  default:
    include __DIR__ . '/views/index.php';
    exit;
}

// okay
function ok($data = NULL)
{
  json([
    'success' => TRUE,
    #'data' => $data,
  ]);
  exit;
}

//
function dump($data)
{
  echo '<pre>' . print_r($data, TRUE) . '</pre>';
}
