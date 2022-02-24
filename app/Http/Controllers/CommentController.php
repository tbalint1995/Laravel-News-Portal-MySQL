<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CommentStoreRequest;
use App\Models\Comment;

class CommentController extends Controller
{
    function addcomment($id, CommentStoreRequest $request)
    {
        $request->validated();

        $comment = Comment::create( 
            array_merge( 
                $request->all(), [
                        'article_id' => $id 
                        ]
                    )
                );

        $comment = Comment::findOrFail(  $comment->id  );  

        return redirect()->back()->with('message', [
                'success' , 'Kedves '.$comment->guest_name.', a '.$comment->created_at.'-kor rögzített kommentedet sikeresen közzétettük!']);    
    }
}
