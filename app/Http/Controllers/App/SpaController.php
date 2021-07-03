<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Lib\HtmlMeta;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;

/**
 * TODO: canonicalのリバースルーター対応（パラメータの順番等に気を付けないとクローラ等で不利）
 */
class SpaController extends Controller
{
    public function top(): View|Factory
    {
        return $this->spa(new HtmlMeta(
            'https://www.bookbok.net/',
            'BookBok'
        ));
    }

    public function about(): View|Factory
    {
        return $this->spa(new HtmlMeta(
            'https://www.bookbok.net/about',
            'About | BookBok',
            'BookBokについて説明'
        ));
    }

    private function spa(HtmlMeta $meta): View|Factory
    {
        return view('spa', ['meta' => $meta]);
    }
}
