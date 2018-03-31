 $(function(){
    // var token = getToken();
    // verify();
    // if(token.root!=4 && token.root!=2){
    //     alert('没有访问权限');
    //     return;
    // }




    var cate = `<div class="cate_item">
                    <label>商品ID *</label>
                    <input type="text" class="input ID" placeholder="请输入商品ID"/>
                </div>
                <div class="cate_item">
                    <label for="cat">分类</label>
                    <select id="cat" class="input">
                        <option value="1" disabled selected>请选择分类</option></select>
                </div>
                <div class="cate_item">
                    <label for="codeBar">商品条码 *</label>
                    <input type="text" class="input prdCodeBar" placeholder="请输入商品条码"/>
                </div>
                <div class="cate_item">
                    <label>商品名称 *</label>
                    <input type="text" class="input prdName" placeholder="请输入名称"/>
                </div>
                <div class="cate_item">
                    <label>助词码</label>
                    <input type="text" class="input prdCode" placeholder="请输入助词码"/>
                </div>
                <div class="cate_item">
                    <label>参考进价</label>
                    <input type="text" class="input prdInPrice" placeholder="请输入参考进价"/>
                </div>
                <div class="cate_item">
                    <label>销售单价 *</label>
                    <input type="text" class="input prdItemPrice" placeholder="请输入销售单价"/>
                </div>
                <div class="cate_item">
                    <label>会员售价</label>
                    <input type="text" class="input prdVIPPrice" placeholder="请输入会员售价"/>
                </div>
                <div class="cate_item">
                    <label>初始库存 *</label>
                    <input type="text" class="input prdKC" placeholder="请输入初始库存"/>
                </div>
                <div class="cate_item">
                    <label>备注</label>
                    <input type="text" class="input prdBZ" placeholder="备注"/>
                </div>`

    var $paent_window = $(window.parent.document);
        // 给弹出层设置样式 
   
     // 子页面在父级页面的弹出层
    $('.add_prd').on('click',function(){
         $paent_window.find("#mydiv").css({
            'background':'#fff',
            'width':650,
            'height':400,
            'top':80,
            'left':'50%',
            'margin-left':-300
        });
    
        $paent_window.find(".mess").html("").html(cate).find('.cate_item').css({
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

        parent.popit();

        var $p = $('<p class="title">添加商品</p>').css({
            position:'absolute',
            top:20,
            left:'50%',
            'margin-left':-35
        })
        
        $paent_window.find(".TITLE").html($p);

        $paent_window.find("#operate").html(`<p><button id="save">保存</button><button id="save_ctn">保存并继续操作</button><button id="cancel">取消</button></p>`)
        var opt="";
        $.post(global.apiBaseUrl +'getcategory',{},function(res){
            if(!res.state){
                res.map(function(item){
                    opt +=`<option value="${item.category}">${item.category}</option>`
                    return opt;
                });
               $(window.parent.document).find('#cat').append(opt)
            } else {
                alert(数据有误)
            }
        })
        
        var category = $paent_window.find('#cat').val();
       $paent_window.find('#cat').change(function(event) {
            category=$paent_window.find('#cat').val()
        });

        $paent_window.find('#save').on('click',function(){

            var ID = $paent_window.find('.ID').val()*1;
            var prdCodeBar = $paent_window.find('.prdCodeBar').val();
            var prdName = $paent_window.find('.prdName').val();
            var prdCode = $paent_window.find('.prdCode').val();
            var prdInPrice = $paent_window.find('.prdInPrice').val();
            var prdItemPrice = $paent_window.find('.prdItemPrice').val();
            var prdVIPPrice = $paent_window.find('.prdVIPPrice').val();
            var prdKC = $paent_window.find('.prdKC').val();
            var prdBZ = $paent_window.find('.prdBZ').val();

            if(prdCodeBar=='' || prdName == '' || prdItemPrice=='' || prdKC =='' || category == ''){
                alert('标为*号的不能为空！')
                return
            }

            $.post(global.apiBaseUrl+'insertproduct',{_id:ID,name:prdName,Category:category,barCode:prdCodeBar,prdCode:prdCode,prdInPrice:prdInPrice,price:prdItemPrice,prdVIPPrice:prdVIPPrice,inventory:prdKC,prdBZ:prdBZ},function(res){
                if(!res.state){
                    console.log(res)
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
        // 取消
        $paent_window.find('#cancel').on('click',function(){

            $paent_window.find('#mydiv').css({display:'none'})
            $paent_window.find('#coverdiv').css({display:'none'})
        })
        // 保存并继续操作
        $paent_window.find('#save_ctn').on('click',function(){
            var ID = $paent_window.find('.ID').val()*1;
            var prdCodeBar = $paent_window.find('.prdCodeBar').val();
            var prdName = $paent_window.find('.prdName').val();
            var prdCode = $paent_window.find('.prdCode').val();
            var prdInPrice = $paent_window.find('.prdInPrice').val();
            var prdItemPrice = $paent_window.find('.prdItemPrice').val();
            var prdVIPPrice = $paent_window.find('.prdVIPPrice').val();
            var prdKC = $paent_window.find('.prdKC').val();
            var prdBZ = $paent_window.find('.prdBZ').val();

            if(prdCodeBar=='' || prdName == '' || prdItemPrice=='' || prdKC =='' || category == ''){
                alert('标为*号的不能为空！')
                return
            }

            $.post(global.apiBaseUrl+'insertproduct',{_id:ID,name:prdName,Category:category,barCode:prdCodeBar,prdCode:prdCode,prdInPrice:prdInPrice,price:prdItemPrice,prdVIPPrice:prdVIPPrice,inventory:prdKC,prdBZ:prdBZ},function(res){
                if(!res.state){
                    console.log(res)

                    $paent_window.find('#mydiv').css({display:'none'})
                    $paent_window.find('#coverdiv').css({display:'none'})
                    // 重置数据
                    $('.table tbody').html('');
                    // 获取商品数据
                    data()
                    setTimeout(function(){
                         parent.popit();
                        // $paent_window.find('#mydiv').css({display:'block'})
                        // $paent_window.find('#coverdiv').css({display:'block'})
                        $paent_window.find('.ID').val("");
                        $paent_window.find('.prdCodeBar').val("");
                        $paent_window.find('.prdName').val("");
                        $paent_window.find('.prdCode').val("");
                        $paent_window.find('.prdInPrice').val("");
                        $paent_window.find('.prdItemPrice').val("");
                        $paent_window.find('.prdVIPPrice').val("");
                        $paent_window.find('.prdKC').val("");
                        $paent_window.find('.prdBZ').val("");
                    },500)
                   
                }else{
                    alert('aaa')
                }
            })
         })

    })

        $('.upload').on('click',function(){
             $paent_window.find("#mydiv").css({
                'background':'#fff',
                'width':400,
                'height':200,
                'top':80,
                'left':'50%',
                'margin-left':-300
            });

        $paent_window.find(".mess").html("").html(`<form id="form"><input type="file" name="myfile" /></form>`)
        parent.popit();

        var $p = $('<p class="title">导入商品数据(后缀名必须是csv文件)</p>').css({
            position:'absolute',
            top:20,
            left:'50%',
            'margin-left':-100
        })
        
        $paent_window.find(".TITLE").html($p);

        $paent_window.find("#operate").html(`<p><button id="save">导入</button><button id="cancel">取消</button></p>`)

        // 导入
        $paent_window.find('#save').on('click',function(){
            // console.log($('#form'))
            $paent_window.find('#form').ajaxSubmit({
                url: global.apiBaseUrl +'upload',
                type: 'post',
                success: function(res){
                    // console.log(res)
                    $paent_window.find('#mydiv').css({display:'none'})
                    $paent_window.find('#coverdiv').css({display:'none'})
                    data();
                }
            })      
        })

        // 取消
        $paent_window.find('#cancel').on('click',function(){

            $paent_window.find('#mydiv').css({display:'none'})
            $paent_window.find('#coverdiv').css({display:'none'})
        })
    })

    // 修改
    $('.modi').on('click',function(){
        
        var checked = $('.checked:checkbox:checked').length;
        if(checked <1 ){
            alert('请选择需要修改的商品')
        }else if(checked >1 ){
            alert('不能同时修改多个商品')
        } else {
            parent.popit();
            var $p = $('<p class="title">修改商品</p>').css({
                position:'absolute',
                top:20,
                left:'50%',
                'margin-left':-35
            })
            
            $paent_window.find(".TITLE").html($p);

            $paent_window.find("#operate").html(`<p><button id="save">保存</button><button id="cancel">取消</button></p>`);

            // console.log()
            var eq = $('.checked:checkbox:checked').closest('tr').find('td').eq(1).html();
            var updateID;
            var cate='';
            $.post(global.apiBaseUrl +'getproduct',{_id:eq},function(res){
                if(!res.state){
                    updateID = res[0]._id;

                    $paent_window.find('.ID').attr({
                        disabled: 'disabled'
                    })
                    $paent_window.find('.ID').val(res[0]._id);
                    // $paent_window.find('.prdCodeBar').val();
                    $paent_window.find('.prdName').val(res[0].name);
                    $paent_window.find('.prdCode').val(res[0].prdCode);
                    $paent_window.find('.prdCodeBar').val(res[0].barCode);
                    $paent_window.find('.prdInPrice').val(res[0].prdInPrice);
                    $paent_window.find('.prdItemPrice').val(res[0].price);
                    $paent_window.find('.prdVIPPrice').val(res[0].prdVIPPrice);
                    $paent_window.find('.prdKC').val(res[0].inventory);
                    $paent_window.find('.prdBZ').val(res[0].prdBZ);
                    cate = res[0].Category
                    var opt="";
                    $paent_window.find('#cat').html('')
                    $.post(global.apiBaseUrl +'getcategory',{},function(res){
                        if(!res.state){
                            res.map(function(item){
                                if(item.category == cate){
                                    opt +=`<option value="${item.category}" selected>${item.category}</option>`
                                }
                                opt +=`<option value="${item.category}">${item.category}</option>`
                                return opt;
                            });
                           $paent_window.find('#cat').append(opt);


                           var category= $paent_window.find('#cat option:selected').text();
                    
                                $paent_window.find('#cat').change(function(event) {
                                    category=$paent_window.find('#cat').val()
                                });

                                $paent_window.find('#save').on('click',function(){
                                   
                                    var ID = $paent_window.find('.ID').val();
                                    var prdCodeBar = $paent_window.find('.prdCodeBar').val();
                                    var prdName = $paent_window.find('.prdName').val();
                                    var prdCode = $paent_window.find('.prdCode').val();
                                    var prdInPrice = $paent_window.find('.prdInPrice').val();
                                    var prdItemPrice = $paent_window.find('.prdItemPrice').val();
                                    var prdVIPPrice = $paent_window.find('.prdVIPPrice').val() ;
                                    var prdKC = $paent_window.find('.prdKC').val();
                                    var prdBZ = $paent_window.find('.prdBZ').val();

                                    var arr1 = updateID;
                                $.post(global.apiBaseUrl+'updateproduct',{updateID:updateID,_id:ID,name:prdName,Category:category,barCode:prdCodeBar,prdCode:prdCode,prdInPrice:prdInPrice,price:prdItemPrice,prdVIPPrice:prdVIPPrice,inventory:prdKC,prdBZ:prdBZ},function(res){
                                    if(!res.state){

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
                            alert(数据有误)
                        }
                    })

                } else {
                alert('数据有误')
            }
        })
            
        }
        
    })
    // 删除
    $('.del').on('click',function(){
            
            var checked = $('.checked:checkbox:checked');
            if(checked.length <1 ){
                alert('请选择需要删除的商品')
            }else if(checked.length >1 ){
                alert('不能同时删除多个商品')
            } else {
                var id = checked.closest('td').next('td').text()
                console.log(id)
                $.post(global.apiBaseUrl +'delproduct',{_id:id},function(res){
                    if(!res.state){
                        $('.table tbody').html('');
                       data();

                    } else {
                        alert('数据有误')
                    }
                })
            }
    });
    // 更新
    $('.Update').on('click',function(){
        $('.table tbody').html('');
        data();
    })
    data();
    var pageNo = 1;
    var qty = 20;
    function data(){
        // 获取商品数据
        $.post(global.apiBaseUrl +'getproduct',{},function(res){
            if(!res.state){
                // console.log(res);
                var goods = res.map(function(item){
                 return `<tr><td><input type="checkBox" class="checked"/></td><td>${item._id}</td><td>${item.Category}</td><td>${item.name}</td><td>${item.barCode}</td><th>${item.prdInPrice}元</th><td>${item.price}元</td><td>${item.prdVIPPrice}元</td><td>${item.inventory}</td>><td${item.prdBZ}</td></tr>`
                });

                $('.table tbody').html(goods);
            } else {
                alert('数据有误')
            }
        })
   } 
    
})
$('.glyphicon-search').on('click',function(){
    console.log( $('#search').val())
    var key = $('#search').val();
    // $('#search').val();
    $.post(global.apiBaseUrl +'getproduct',{name:key},function(res){
            if(!res.state){

                if(res == ''){
                    alert('没有搜索到匹配的数据')
                    return
                }
                // console.log(goods)
                $('.table tbody').html('');
                var goods = res.map(function(item){
                    return `<tr><td><input type="checkBox" class="checked"/></td><td>${item._id}</td><td>${item.Category}</td><td>${item.name}</td><td>${item.barCode}</td><th>${item.prdInPrice}元</th><td>${item.price}元</td><td>${item.prdVIPPrice}元</td><td>${item.inventory}</td></tr><td>${item.prdBZ}</td>`
                });

                $('.table tbody').html(goods);

            } else {
                alert('数据有误')
            }
        })
})

