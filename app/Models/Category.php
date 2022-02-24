<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    function articles()
    {
        return $this->hasMany( \App\Models\Article::class );
    }

    function subcategories()
    {
        return $this->hasMany( \App\Models\Category::class , 'parent_id', 'id' );
    }

    function all_articles()
    {
        $subcategories = $this->subcategories()->pluck('id')->toArray();
       
        return Article::whereIn('category_id', $subcategories );
    }
}
