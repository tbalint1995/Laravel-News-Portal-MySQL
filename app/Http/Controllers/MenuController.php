<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MenuController extends Controller
{
    function list(){

       // dd( \App\Models\Category::find(1)->with( ['subcategories'] ));

        return response(\App\Models\Category::where('parent_id', 0)->with( ['subcategories'] )->get(),200);
    }
}
