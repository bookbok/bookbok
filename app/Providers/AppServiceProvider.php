<?php

namespace App\Providers;

use App\Services\Webpack;
use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Webpack::class, function (Application $app) {
            return new Webpack($app->publicPath(), 'bundle', 'manifest.json');
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
