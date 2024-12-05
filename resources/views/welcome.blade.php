<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap" rel="stylesheet">
  @vite('resources/css/app.css')
  <title>EIEPIMS</title>
</head>
<body>
  <div id="root"></div>
  
  <!-- Include React Refresh and JS entry point -->
  @vite('resources/js/app.jsx')


  <!-- Inline script for environment variables -->
  <script>
    window.env = {
      API_BASE_URL: '{{ env("API_BASE_URL") }}'
    };
  </script>
</body>
</html>
