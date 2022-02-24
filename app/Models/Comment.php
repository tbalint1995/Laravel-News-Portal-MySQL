<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function article()
    {
        return $this->belongsTo(\App\Models\Article::class);
    }
}
