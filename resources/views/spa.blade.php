@inject('webpack', 'App\Services\Webpack')
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ $meta->title }}</title>
        <meta name="description" content="{{ $meta->description }}">
        <link rel=”canonical” href="{{ $meta->canonical }}"/>
        <meta property="og:site_name" content="BookBok">
        <meta property="og:type" content="{{ $meta->ogType }}">
        <meta property="og:image" content="{{ $meta->ogImage }}">
        <meta property="og:title" content="{{ $meta->ogTitle }}">
        <meta property="og:description" content="{{ $meta->ogDescription }}">

        <script src="{{ $webpack->get('vendor.js') }}" defer></script>
        <script src="{{ $webpack->get('app.js') }}" defer></script>
    </head>
    <body>
        <div id="app">
            <!-- TODO: noscriptな時や読み込みが遅いときの時のためのコンテンツをここに入れておく -->
        </div>
    </body>
</html>
