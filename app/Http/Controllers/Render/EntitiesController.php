<?php

namespace App\Http\Controllers\Render;

use App\Http\ViewModel\HtmlMeta;
use Illuminate\Http\Response;

/**
 * TODO: canonicalのリバースルーター対応（パラメータの順番等に気を付けないとクローラ等で不利）
 */
class EntitiesController extends AbstractController
{
    public function index(): Response
    {
        return $this->spa(new HtmlMeta(
            'https://www.bookbok.net/entities',
            'Entities | BookBok',
            'BookBokについて説明'
        ));
    }

    /**
     * @phpstan-param positive-int $id
     */
    public function show(int $id): Response
    {
        if ($id !== 1) {
            $this->throwNotFound();
        }

        return $this->spa(new HtmlMeta(
            'https://www.bookbok.net/entities/1',
            '要素1のページ | BookBok',
            '要素1のページです。'
        ));
    }
}
