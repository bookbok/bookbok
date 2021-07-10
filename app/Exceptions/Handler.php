<?php

namespace App\Exceptions;

use App\Http\ViewModel\HtmlMeta;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        // TODO: 多分、カスタム例外に置き換えてrenderメソッドを例外ごとに定義する方法のほうがきれいになる。
        $this->renderable(function (NotFoundHttpException $e, Request $request): Response {
            if ($request->is('api/*')) {
                return response()->json(['message' => 'not found'], 404);
            }
            return response()->view(
                'spa',
                [
                    'meta' => new HtmlMeta(
                        'https://www.bookbok.net/',
                        'Not Found | BookBok',
                        'ページがないよ。'
                    ),
                    'httpStatus' => 404,
                ],
                404
            );
        });
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
