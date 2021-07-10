<?php

namespace App\Http\Controllers\Render;

use App\Http\ViewModel\HtmlMeta;
use Illuminate\Http\Response;

/**
 * TODO: canonicalのリバースルーター対応（パラメータの順番等に気を付けないとクローラ等で不利）
 */
class IndexController extends AbstractController
{
    public function index(): Response
    {
        return $this->spa(new HtmlMeta(
            'https://www.bookbok.net/',
            'BookBok'
        ));
    }
}
