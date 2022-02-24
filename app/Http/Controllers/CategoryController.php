<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{

    function  category_articles_list( Category $category )
    {
        if( $category->parent_id == 0 )
            $result_list = $category->all_articles()->get();
        else 
            $result_list = $category->articles;    


        return view('index',  [
            'articles' =>  $result_list,
            'include_file' => __FUNCTION__,
            'category'=>$category
         ] );         
    }
}

 