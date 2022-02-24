$(function(){

    /**
     * 
     *  tooltip
     * 
     * **/
    $('[data-toggle="tooltip"]').tooltip();


    /**
     * 
     * keresés lista mentés
     * 
     * 
     * **/
   
    $('.save-search-result').click(function (e) {

        let keyword = $(this).data('keyword');
        let token = $(this).data('token');

        $.post('/save-search-result', {
            _token: token,
            keyword: keyword
        }, function (data, status) {
            if (!data) return;
            let obj = jQuery.parseJSON(data);
            $('.fa-layers-counter').text(obj.length).fadeIn()
            $('.show_on_data').fadeIn() 
        
        })
        e.preventDefault();

    })

    /**
     * 
     *  mentett keresési lista számának aktualizálása oldalbetöltésre
     * 
     * 

     $.get('/save-search-result', {
        
    }, function (data, status) {
         if (!data) return;
        let obj = jQuery.parseJSON(data);
         $('.fa-layers-counter').text(obj.length)
         
        if( obj.length > 0 ) 
        $('.show_on_data').fadeIn() 
    
    })
*/

    //
    
    $('.select-keyword').click(function () {

        let show = false;

        $('.select-keyword').each(function () {
            
            let item = $(this);
            console.log(item)
            
            if (item.is(':checked'))
            {
                show = true;
           
            }
        } )
   
        if (show)
            {
                $('#search_result_operation_container').removeClass('d-none');
            }
        else
                $('#search_result_operation_container').addClass('d-none');
        
    })
   
})