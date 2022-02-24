            <div class="col-12   ">
              <div class="card mb-4 box-shadow p-4 text-justify d-block saved_keyword">
              <form action="" method="post">
              {{@csrf_field()}}
              <div class="float-right d-none" id="search_result_operation_container">
              <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
              </div>

              

                    @foreach( $list as $kw )
                        <a href="/search?keyword={{ $kw }}" class="btn btn-info py-1">{{ $kw }} <input type="checkbox" class="select-keyword" name="selected_item[{{ $kw }}]" value="on"></a>
                    @endforeach

                 </form>   
              </div>
            </div>  
 