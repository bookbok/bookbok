@inject('webpack', 'App\Services\Webpack')
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ $meta->title }}</title>
        <link rel="canonical" href="{{ $meta->canonical }}" data-react-helmet />
        <meta name="description" content="{{ $meta->description }}" data-react-helmet>
        <meta property="og:site_name" content="BookBok" data-react-helmet>
        <meta property="og:type" content="{{ $meta->ogType }}" data-react-helmet>
        <meta property="og:image" content="{{ $meta->ogImage }}" data-react-helmet>
        <meta property="og:title" content="{{ $meta->ogTitle }}" data-react-helmet>
        <meta property="og:description" content="{{ $meta->ogDescription }}" data-react-helmet>

        <script src="{{ $webpack->get('vendor.js') }}" defer></script>
        <script src="{{ $webpack->get('app.js') }}" defer></script>
    </head>
    <body>
        <div id="app" @if(isset($httpStatus)) data-state="{{$httpStatus}}" @endif>
            <!-- TODO: noscriptな時や読み込みが遅いときの時のためのコンテンツをここに入れておく -->
        </div>
    </body>
</html>
