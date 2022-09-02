<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title >{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <!-- Styles -->
        <link href="{{ mix('css/index.css') }}" rel="stylesheet">
        <!-- Scripts -->
        <script src="{{ mix('js/index.js') }}" defer></script>
    </head>
    <body >
    <div id="root"></div>
    </body>
</html>
