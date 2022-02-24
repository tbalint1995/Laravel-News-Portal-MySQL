<?php

function ago( $date )
{
    
}

function setup_lead_image( $obj )
{
        if( $obj->lead_image )
        {
            $img = $obj->lead_image;
        }
        else 
        {    $img = 'https://freepikpsd.com/media/2019/10/no-image-png-5-Transparent-Images.png';
        }    

          return '  
              background:url('.$img.');  
              background-size:'. ((strlen($obj->lead_image) > 0 )? 'cover' : 'contain').'; '. 
              'background-position: center '. 
              ((strlen($obj->lead_image) > 0 )? 'center' : '3px').';background-repeat: no-repeat;';
}


function is_active_subcategory($category, $sub)
{
    return  is_object($category) 
            && $sub->id==$category->id ? ' active':null;
}

function is_active_maincategory($category, $row, $all_selected)
{
    if( !is_object($category) || $all_selected==false ) return null;   

    if( $category->parent_id == 0  )
    {
        if( $category->id  == $row->id )
            {
                return ' active';
            }
        } 
        else
        {
            if( $category->parent_id == $row->id )
            {
                return ' active';
            }
        }
}