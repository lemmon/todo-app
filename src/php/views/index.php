<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>todo</title>
  <link rel="stylesheet" href="app.css">
  <link rel="stylesheet" href="https://unpkg.com/abrusco@0.6.3/css/abrusco.min.css">
  <script>
  window.list = <?= json_encode($list) ?>;
  </script>
  <script src="app.js" async defer></script>
</head>
<body class="col justify-center items-center">

  <div>Loading&hellip;</div>

</body>
</html>
