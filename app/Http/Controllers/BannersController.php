<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BannersController extends Controller
{
   function list($place){
       return response( \App\Models\Banner::where('position', $place)->take(3)->get(), 200 );
   }
}
