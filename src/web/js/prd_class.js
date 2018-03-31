
  var cate =`<div class="cate_item">
                <label>ID *</label>
                <input type="text" class="input ID" placeholder="请输入商品分类的ID"/>
            </div>
            <div class="cate_item">
                    <label>分类名 *</label>
                    <input type="text" class="input prd_class" placeholder="分类名称"/>
                </div>`;

 $.post(global.apiBaseUrl +'getcategory',{},function(res){
    if(!res.status){
        var opt='';
        res.map(function(item){
            opt +=`<li class="btn"><i class="glyphicon glyphicon-triangle-right"></i>${item.category}<ul class="prd_item"></ul></li>`
            return opt;
        });
      $('.class ul').append(opt)
    } else {
        alert(数据有误)
    }
})

var $paent_window = $(window.parent.document);

    // 给弹出层设置样式 
    $paent_window.find("#mydiv").css({
        'background':'#fff',
        'width':300,
        'height':230,
        'top':80,
        'left':'50%',
        'margin-left':-300
    });
   $paent_window.find(".mess").html(cate).find('.cate_item').css({
            width:300,
            height:45,
            float:'left'
        }).find('label').css({
            width:70,
            'line-height':'45px',
            color:'#333',
            float:'left',
            'text-align':'center'
        });


    $('.add_class').on('click',function(){
        parent.popit();

         var $p = $('<p class="title">添加分类</p>').css({
            position:'absolute',
            top:20,
            left:'50%',
            'margin-left':-35
        })

        $paent_window.find(".TITLE").html($p);

        $paent_window.find("#operate").html(`<p><button id="save">保存</button><button id="cancel">退出</button></p>`)

        // 保存
        $paent_window.find('#save').on('click',function(){

            var ID = $paent_window.find('.ID').val();
            var prd_class = $paent_window.find('.prd_class').val();
        
            if(ID =='' || prd_class == ''){
                alert('标为*号的不能为空！')
                return
            }

            $.post(global.apiBaseUrl+'insertcategory',{_id:ID,category:prd_class},function(res){
                if(!res.status){
                    $paent_window.find('#mydiv').css({display:'none'})
                    $paent_window.find('#coverdiv').css({display:'none'})
                    // 重置数据
                    $('.table tbody').html('');
                    // 获取商品数据
                    data()
                }else{
                    alert('aaa')
                }
            })
        })
        $paent_window.find('#cancel').on('click',function(){
            $paent_window.find('#mydiv').css({display:'none'})
            $paent_window.find('#coverdiv').css({display:'none'})
        })
        
    })

 $('.modi').on('click',function(){
        
        var checked = $('.checked:checkbox:checked').length;
        if(checked <1 ){
            alert('请选择需要修改的商品类型')
        }else if(checked >1 ){
            alert('不能同时修改多个')
        } else {
            parent.popit();
            var $p = $('<p class="title">修改商品的种类</p>').css({
                position:'absolute',
                top:20,
                left:'50%',
                'margin-left':-35
            })
            
            $paent_window.find(".TITLE").html($p);

            $paent_window.find("#operate").html(`<p><button id="save">保存</button><button id="cancel">退出</button></p>`);

             var eq = $('.checked:checkbox:checked').closest('tr').find('td').eq(1).html();

             console.log(eq)
            var updateID;
            $.post(global.apiBaseUrl +'getcategory',{_id:eq},function(res){
                if(!res.status){
                    // console.log(res)
                    updateID = res[0]._id;

                    $paent_window.find('.ID').attr({
                        disabled: 'disabled'
                    })
                    $paent_window.find('.ID').val(res[0]._id);
                    $paent_window.find('.prd_class').val(res[0].category);

                    $paent_window.find('#save').on('click',function(){
                               
                        var ID = $paent_window.find('.ID').val();
                        var category = $paent_window.find('.prd_class').val();
                        $.post(global.apiBaseUrl+'updatecategory',{updateID:updateID,_id:ID,category:category},function(res){
                            if(!res.status){

                                $paent_window.find('#mydiv').css({display:'none'})
                                $paent_window.find('#coverdiv').css({display:'none'})
                                // 重置数据
                                $('.table tbody').html('');
                                // 获取商品数据
                                data()
                            }else{
                                alert('aaa')
                            }
                        })
                    })

                $paent_window.find("#cancel").on('click',function(){
                    $paent_window.find('#mydiv').css({display:'none'})
                    $paent_window.find('#coverdiv').css({display:'none'})
                })

                } else {
                    alert('数据有误')
                }
            })
        }
        
    })

$('.del').on('click',function(){
        
    var checked = $('.checked:checkbox:checked');
    if(checked.length <1 ){
        alert('请选择需要删除的商品')
    }else if(checked.length >1 ){
        alert('不能同时删除多个商品')
    } else {
        var id = checked.closest('td').next('td').text()
        $.post(global.apiBaseUrl +'delcategory',{_id:id},function(res){
            if(!res.status){
                $('.table tbody').html('');
               data();

            } else {
                alert('数据有误')
            }
        })
    }
});

$('.Update').on('click',function(){
    $('.table tbody').html('');
    data();
})

function data(){
    // 获取商品数据
    $.post(global.apiBaseUrl +'getcategory',{},function(res){
        if(!res.status){
            var goods = res.map(function(item){
             return `<tr><td><input type="checkBox" class="checked"/></td><td>${item._id}</td><td>${item.category}</td>`
            });

            $('.table tbody').html(goods);
        } else {
            alert('数据有误')
        }
    })
   } 
data();

$('.glyphicon-search').on('click',function(){
    console.log( $('#search').val())
    var key = $('#search').val();
    // $('#search').val();
    $.post(global.apiBaseUrl +'getcategory',{category:key},function(res){
            if(!res.status){

                if(res == ''){
                    alert('没有搜索到匹配的数据')
                    return
                }
                $('.table tbody').html('');
                 var goods = res.map(function(item){
                 return `<tr><td><input type="checkBox" class="checked"/></td><td>${item._id}</td><td>${item.category}</td>`
                });

                $('.table tbody').html(goods);

            } else {
                alert('数据有误')
            }
        })
})

// $('.class').on('click','.btn',function(){
//     console.log($(this).text())
//     $.post(global.apiBaseUrl +'getproduct',{Category:$(this).text()},function(res){
//             if(!res.status){
//                 console.log(res)
//             } else {
//                 alert('数据有误')
//             }
//         })

// })

