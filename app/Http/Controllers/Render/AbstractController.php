<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Http\ViewModel\HtmlMeta;
use Illuminate\Http\Response;

abstract class AbstractController extends Controller
{
    protected function spa(HtmlMeta $meta): Response
    {
        return response()->view('spa', ['meta' => $meta], 200);
    }
}
