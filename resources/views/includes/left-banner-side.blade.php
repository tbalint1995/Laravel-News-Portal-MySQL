@foreach( $banners as $banner )

              @if( $banner->type=='image' )

                @if( $banner->url )
                    <a  href="{{$banner->url}}" 
                        target="_blank" 
                        title="{{$banner->title}}" 
                        alt="{{$banner->alt}}"> 
                @endif
                
                <img src="{{ $banner->file }}" class="add-banner1">
                
                @if( $banner->url )
                    </a> 
                @endif

              @elseif( $banner->type=='code' )  
                  {!! $banner->code !!}
              @endif

@endforeach