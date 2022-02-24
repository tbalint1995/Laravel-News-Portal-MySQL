<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;

class IndexController extends Controller
{
    
    function index_view()
    {
            return view('index', [
                'include_file' => __FUNCTION__,
                'articles_list'=>Article::get()
            ]);
    }
 
}


