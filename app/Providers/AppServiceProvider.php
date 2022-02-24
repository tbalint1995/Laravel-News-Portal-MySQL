<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{

 
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $category_list=\App\Models\Category::where('parent_id',0)->get();

        View::share('category_list', $category_list);

        $banners=\App\Models\Banner::get();

        View::share('banners', $banners);
    }
}
