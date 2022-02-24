<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Session;

class SearchController extends Controller
{
    
    function simple_list(Request $request)
    {
        
        
        $result = Validator::make(
               $request->all(),
               [
                  'keyword'=>'required|max:'.config('inputs.keyword_max').'|min:'.config('inputs.keyword_min')  
               ] 
        );

        if( $result ->fails() )
        {
            return redirect()->to('/')->with('message', ['danger', $result ->errors()->first() ]);
        }

        $keyword = $request->keyword;
        /*
        $list = Article::where('title', 'like', '%'.$keyword.'%')
                            ->orwhere('description','like', '%'.$keyword.'%')->get();   
        */
        $list = Article::where( function($query) use ($keyword){

            $query->where('title', 'like', '%'.$keyword.'%');
            $query->orwhere('description','like', '%'.$keyword.'%');

        } ) -> where('created_at', '>', '2000-12-31 01:11:22')->paginate();


        return view('index', [
            'include_file' => 'category_articles_list',
            'articles'=>$list,
            'title' => 'A(z) <i>"'.$keyword.'"</i> kulcsszó találatai',
            'description' => 'Összesen '.$list->total().' találat. Ha menteni szeretnéd a találati listát <a href="" class="save-search-result btn btn-light" data-keyword="'.$request->keyword.'"  data-token="'.csrf_token().'">kattints ide <i class="fa fa-save"></i></a>'
        ]);

    }

    function save_search_result(Request $request)
    { 
        if( $request->has('keyword') 
            && !in_array( 
                $request->keyword, (array)$request->session()->get('save_search_result') ) )
            {
                $request->session()->push(
                        'save_search_result', $request->keyword);
            }    
        return json_encode( $request->session()->get('save_search_result' )  );
    }


    function saved_search_keywords(Request $request)
    {
        $result = json_decode( $this->save_search_result( $request ) );

        if( count(  $result  ) == 0 )
        {
            return redirect()->to('/');
        }


        return view('index',[
            'include_file'=>'saved_search_keywords',
            'list'=> $result,
            'title'=>'Mentett keresési feltételek',
            'description'=>'Az adott keresési feltételnek megfelelő lista megjelenítéséhez kattints az adott elemre.'
        ]);
    }

    function delete_search_keywords(Request $request)
    {
        $saved = Session::get('save_search_result');
        
        foreach( $request->selected_item as $kw => $value )
        {


        $index = array_search($kw, Session::get('save_search_result'));
        
             unset(  $saved[$index] );    

        } 
   
        Session::put('save_search_result', $saved) ;
        
        return redirect()->back();
        

    }
}


