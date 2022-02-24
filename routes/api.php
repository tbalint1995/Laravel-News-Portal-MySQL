<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use App\Http\Resources\CategoriesResource;
use App\Models\Category;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/categories', function () {
    return CategoriesResource::collection(Category::all());
});



Route::get('/topmenu', [\App\Http\Controllers\MenuController::class, 'list']);

Route::get('/banners/{place}', [\App\Http\Controllers\BannersController::class, 'list']);


Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'send']);


Route::get('/search', function (Request $request) {

    return ArticleResource::collection(Article::where('title','like', '%'. $request->keyword.'%')->orwhere('description','like', '%'. $request->keyword.'%')->paginate(4)  );
});


Route::get('/category/{category_id}', function ($category_id, Request $request) {
    return ArticleResource::collection( 

        Article::where('category_id',$category_id)->where(
            
            function($query) use ($request){

            if( $request->keyword ){
                $query->where('title', 'like', '%'.$request->keyword.'%');
                $query->orwhere('description', 'like', '%'.$request->keyword.'%');
            }    

        })->paginate(2)->withQueryString() 
    );
});


  Route::get('/articles/{id}', function ($id) {
      return new ArticleResource(Article::findOrFail($id));
  });

// Route::get('/comments/{article_id}', function($article_id){
//     return new ArticleResource(Article::findOrFail($article_id));
// });

  Route::post('/articles/comments/add', function (Request  $request) {
      return ArticleResource::addComment($request);
  });

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/addfav', '\App\Http\Controllers\ArticleController@addfav');

  Route::get('/articles', function (Request $request) {
     return ArticleResource::collection(Article::where('title', 'like', '%'.$request->keyword.'%')->orwhere('description', 'like', '%'.$request->keyword.'%')->get());
  });
