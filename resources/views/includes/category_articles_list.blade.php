 
{{--
           @foreach($articles as $row) 
      

            <div class="col-12">
              <div class="row mb-4 box-shadow ">
 
                <div class="col-4" 
                style=" height:200px; {{ setup_lead_image( $row ) }} "></div>
                
                <div class="col-8">
                <h4 class="text-truncate">{{ $row->title }}</h4>
                  <div class="card-text" style="height:auto;">{!! substr( $row->description, 0,300 ) !!} ...</div>
                  <div class="d-flex justify-content-between align-items-center  mt-4">
                    <div class="btn-group">
                      <a role="button" href="/articles/{{$row->id}}" class="btn btn-sm btn-outline-secondary">Tovább olvasom</a>
                       
                    </div>
                    <small class="text-muted">{{ ago( $row->created_at ) }}</small>
                  </div>
                </div>
              </div>
            </div>

  @endforeach  --}}
@if(Request::get('keyword'))
    <div id="search_list"></div>
@elseif( isset($category->id) ) 
    <div id="category_list"></div>
@endif 

 <script>
  const keyword = '{{ Request::get('keyword') }}';
  const category_id = '{{ $category->id??'' }}';
 </script>

<script src="/js/app.js"></script>
 