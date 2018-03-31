jQuery(function($){
    $('.add_vip').click(function(){
        $.post(global.apiBaseUrl+'vip',function(res){
            // console.log(res.data)
        })
    });
    $('.list_vip').click(function(){
        console.log('list_vip')
    });
});