<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Certificate</title>
<style>
body { font-family: Arial, sans-serif; text-align: center; background-color: lightgray; }
.certificate { border: 10px solid gold; padding: 20px; background: white; margin: 50px auto; width: 80%; }
</style>
</head>
<body>
<div class="certificate">
<h2>EIE Spark Champion</h2>
<p>This</p>
<h2>Certificate of Recognition</h2>
<p>is Awarded to</p>
<h2>{{ $name }}</h2>
<p>as the Best in Communication and Presentation</p>
<p>among all the students in {{ $year_level }}</p>
<p>for the English Immersive Environment SPARK Program of the</p>
<p>University of Nueva Caceres in the {{ $department }}</p>
<p>for {{ $month }} in School Year {{ $current_year }}/{{ $next_year }}</p>
<p>MIA TIJAM</p>
<p>Director-ESL Champion</p>
<p>English Immersive Environment</p>

<p>{{ $dean_name }}</p>
<p>Dean, {{ $department }}</p>

<p>ROMEO M. SUMAYO, Jr., Ph.D.</p>
<p>Vice President for Academic Affairs</p>
</div>
</body>
</html>
