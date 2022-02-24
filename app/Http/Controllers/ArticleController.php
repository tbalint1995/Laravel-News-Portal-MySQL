<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Article;
use Illuminate\Support\Facades\Session;

class ArticleController extends Controller
{
 


    function article_details( Article $articles, Request $request )
    {
         //dd( $articles->comments()->paginate(10) );
        //dd( \App\Models\Comment::find(1)->article );

        if( (int)$request->session()->get('article_'.$articles->id) < ( time() - (60*1) ) )
        {
            $articles->visited = $articles->visited + 1;
            $articles->save();

            $request->session()->put('article_'.$articles->id , time() );
        }

        return view('index', [
            'article' => $articles,
            'include_file'=>__FUNCTION__,
            'comments'=> $articles->comments()->orderby('created_at', 'desc')->paginate(10)
        ]);
    }

function addfav(Request $request){

   //Session::forget('favorites');
   
    $id = $request->id;

    // $tomb = array_merge( (array)Session::get('favorites'), [$id=>$id]);
 
    // Session::put('favorites', $tomb);
   
    Session::put('favorites.article_'.$id, $id);

    //print $_SERVER["HTTP_USER_AGENT"];

    return response(Session::get('favorites'), 200);
    

}


}
