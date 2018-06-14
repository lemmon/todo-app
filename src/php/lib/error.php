<?php

namespace app;

function error(string $error, int $code = 404)
{
  // response code
  http_response_code($code);
  // response content
  switch (HTTP['accept']) {
    case 'application/json':
      json([
        'error' => $error,
      ]);
      exit;
    default:
      #header('Location: .');
      die($error);
      exit;
  }
}
