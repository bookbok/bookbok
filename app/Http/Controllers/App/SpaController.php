<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Lib\HtmlMeta;

class SpaController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
     */
    public function top()
    {
        return $this->spa(new HtmlMeta(
            'https://www.bookbok.net/',
            'BookBok'
        ));
    }

    /**
     * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
     */
    public function about()
    {
        return $this->spa(new HtmlMeta(
            'https://www.bookbok.net/about',
            'About | BookBok',
            'BookBokについて説明'
        ));
    }

    /**
     * TODO: canonicalのリバースルーター対応（パラメータの順番等に気を付けないとクローラ等で不利）
     *
     * @return \Illuminate\Contracts\View\View|\Illuminate\Contracts\View\Factory
     */
    private function spa(HtmlMeta $meta)
    {
        return view('spa', ['meta' => $meta]);
    }
}
