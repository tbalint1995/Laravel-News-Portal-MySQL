 {{--
 @foreach($articles_list as $row)

            <div class="col-12  col-md-4">
              <div class="card mb-4 box-shadow">
 
                <div style="width:100%; height:200px; {{ setup_lead_image( $row ) }}"></div>
                
                <div class="card-body">

                <h4 class="text-truncate" data-toggle="tooltip" title="{{ $row->title }}">{{ $row->title }}</h4>
                
                <div class="card-text">{!! mb_substr( $row->description, 0, 300, 'utf-8' ) !!} ...</div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a href="/articles/{{ $row->id }}" role="button" class="btn btn-sm btn-outline-secondary">Tovább olvasom</a>
               
                    </div>
                    <small class="text-muted"></small>
                  </div>
                </div>
              </div>
            </div>

  @endforeach  --}}


  <!-- React root DOM 
    <div id="indexcontent" class="row"></div>
-->

<div id="calc-container"></div>
    <!-- React JS -->
    <script src="{{ asset('js/app.js') }}"></script>  
