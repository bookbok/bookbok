@inject('webpack', 'App\Services\Webpack')
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <script src="{{ $webpack->get('vendor.js') }}" defer></script>
        <script src="{{ $webpack->get('app.js') }}" defer></script>
    </head>
    <body>
        <div id="app">
            <!-- TODO: noscriptな時や読み込みが遅いときの時のためのコンテンツをここに入れておく -->
        </div>
    </body>
</html>
