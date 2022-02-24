<?php

namespace App\Http\Resources;

use GuzzleHttp\Psr7\Request;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Http\Resources\Json\JsonResource;
 
class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {   
        return [
            'id' => $this->id,
            'category_id'=>$this->category_id,
            'title' => $this->title,
            'description'=>$this->description,
            'lead_image'=>$this->lead_image,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'visited'=>$this->visited,
            'comments'=>$this->comments()->orderby('id', 'desc')->paginate(5)
             
        ];
    }

    public static function addComment(HttpRequest $request){
        
        $valid = Validator(
            $request->all(),
            [
                'guest_name'=>'min:10|required',
                'guest_email'=>'required|email',
                'content'=>'required|min:10',
                'article_id'=>'required'
            ]
    );

        if( $valid->fails() ){

            abort(403);
        }
        else {

            \App\Models\Comment::create($request->all());
            
            return response( ['type'=>'success', 'body'=>'Sikeres beillesztés!'] );        
        }
        
    }
}
