<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    function __construct()
    {   
        $this->fields=['vnev','knev',  'email', 'telefon', 'uzenet'];
    }

    public function send(Request $request){
        /*
            vnev:
            knev: 
            email:
            telefon:
            uzenet:
        */
        //dd($request->all());
        $valid = Validator::make($request->all(), [
            'firstName'=>'required|max:30',
            'lastName'=>'required|max:30',
            'email'=>'required|email',
            'phone'=>'min:9|max:12|required',
            'message'=>'required|max:600'
        ]);

        
        if( $valid->fails() ){
            
            abort(403);

        } else {
            try{
            Mail::to('bsprog007@gmail.com')->send(new \App\Mail\ContactMail((object)$request->all()));

            print json_encode((object)['success'=>(object)['message'=>'Sikeres küldés! Munkatársunk hamarosan válaszolni fog!'] ]);

            }catch(\Exception $e){
            
                print json_encode((object)['errors'=>(object)['system'=>$e->getMessage()] ]);
            
            }

        }
    }
}
