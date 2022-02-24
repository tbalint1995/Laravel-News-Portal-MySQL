<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ \App\Http\Controllers\IndexController::class, 'index_view'] );

Route::get('/category/{category}', [ \App\Http\Controllers\CategoryController::class, 'category_articles_list'] );


Route::get('/articles/{articles}', [ \App\Http\Controllers\ArticleController::class, 'article_details'] );


Route::get('/search', [ \App\Http\Controllers\SearchController::class, 'simple_list'] );


Route::match(['post','get'],'/save-search-result', [ \App\Http\Controllers\SearchController::class, 'save_search_result'] );

Route::get('/saved-search-keywords', [ \App\Http\Controllers\SearchController::class, 'saved_search_keywords'] );

Route::post('/saved-search-keywords', [ \App\Http\Controllers\SearchController::class, 'delete_search_keywords'] );

Route::post('/articles/{id}/addcomment', [ \App\Http\Controllers\CommentController::class, 'addcomment'] );


