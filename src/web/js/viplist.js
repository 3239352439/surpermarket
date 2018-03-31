jQuery(function($){

    // var token = getToken();
    // verify();
    // if(token.root!=4 && token.root!=1){
    //     alert('没有访问权限');
    //     return;
    // }




    // post请求,生成结构
    // $.post(global.apiBaseUrl+'vip',function(res){
    //     var list = $.map(res,function(item,idx){
    //         // console.log(list)
    //         return `<tr>
    //             <td class="id_vip"><input type="checkbox" class="checked" />${item._id}</td>
    //             <td class="name_vip">${item.name}</td>
    //             <td class="tel_vip">${item.tel}</td>
    //             <td class="level_vip">${item.level}</td>
    //             <td class="points_vip">${item.points}</td>
    //             <td class="store_vip">${item.store}</td>
    //             <td class="source_vip">${item.source}</td>
    //         </tr>`
    //     }).join('');
    //     $('.tbody').html(list);
        // html();
    // })

    // 生成结构函数
    function html(){
        $.post(global.apiBaseUrl+'vip',function(res){
            var list = $.map(res,function(item,idx){
                return `<tr>
                    <td class="id_vip"><input type="checkbox" class="checked" />${item._id}</td>
                    <td class="name_vip">${item.name}</td>
                    <td class="tel_vip">${item.tel}</td>
                    <td class="level_vip">${item.level}</td>
                    <td class="points_vip">${item.points}</td>
                    <td class="store_vip">${item.store}</td>
                    <td class="source_vip">${item.source}</td>
                </tr>`
            }).join('');
            $('.tbody').html(list);
        })
    }
    // 分页结构
    function html1(data){
             $.post(global.apiBaseUrl+'vip',function(res){
            var list = $.map(data,function(item,idx){
                return `<tr>
                    <td class="id_vip"><input type="checkbox" class="checked" />${item._id}</td>
                    <td class="name_vip">${item.name}</td>
                    <td class="tel_vip">${item.tel}</td>
                    <td class="level_vip">${item.level}</td>
                    <td class="points_vip">${item.points}</td>
                    <td class="store_vip">${item.store}</td>
                    <td class="source_vip">${item.source}</td>
                </tr>`
            }).join('');
            $('.tbody').html(list);
        })
    }

    // 添加会员
    $('#saveadd_vip').click(function(){
        $.post(global.apiBaseUrl + 'addvip',{
            _id:$('#id_vip').val(),
            name:$('#name_vip').val(),
            tel:$('#tel_vip').val(),
            level:$('#level_vip').val(),
            points:$('#points_vip').val(),
            store:$('#store_vip').val(),
            source:$('#source_vip').val()
        },function(res){
            // console.log(res)
            if(res.status){
                alert('保存成功')
                html();
            }else{
                console.log(res.status)

            }
        })
    });
    // 删除会员
    $('.btndel_vip').click(function(){
        var $checkbox = $("input[type='checkbox']:checked");
        var $currentTr = $checkbox.parent().parent()[0];
        var id = $currentTr.getElementsByClassName('id_vip')[0].innerText;
        // var id = $currentTr.text();
        // console.log($checkbox.length)
        if($checkbox.length=='1'){
            if(confirm('确认删除该会员?')){
                $.post(global.apiBaseUrl+'delvip',{_id:id},function(res){

                })
                $currentTr.remove();
            }  
        }else{
            alert('不能选择多个!');
        }
            
    });

    // 刷新
    $('.btnRefresh_vip').click(function(){
        $.post(global.apiBaseUrl+'vip',function(res){
            var $qty = 9;
            var data = res.slice(0, $qty);
            html();
        })
    });
    $('.tbody').on('mouseover','tr',function(){
        $(this).siblings().css({'background':'#fff'});
        $(this).css({'background':'#eee'})
    })
    $('tbody').on('mouseout','tr',function(){
        $(this).css({'background':'#fff'})
    })

    // 更改会员(有问题)
    $('.btnup_vip').click(function(){
        // console.log('up')
        var $checkbox = $("input[type='checkbox']:checked");
        var $currentTr = $checkbox.parent().parent()[0];
        var id = $currentTr.getElementsByClassName('id_vip')[0].innerText;
        var td = $currentTr.children;
            // console.log(td.length)
            for(var i=0;i<td.length;i++){
                // console.log(td[0])
                $('#idup_vip').val(td[0].innerText);
                $('#nameup_vip').val(td[1].innerText);
                $('#telup_vip').val(td[2].innerText);
                $('#levelup_vip').val(td[3].innerText);
                $('#pointsup_vip').val(td[4].innerText);
                $('#storeup_vip').val(td[5].innerText);
                $('#sourceup_vip').val(td[6].innerText);
            }
        
        $('#upadd_vip').click(function(){
            $.post(global.apiBaseUrl+'updatevip',
                {
                id:$('#idup_vip').val(),
                name:$('#nameup_vip').val(),
                tel:$('#telup_vip').val(),
                level:$('#levelup_vip').val(),
                points:$('#pointsup_vip').val(),
                store:$('#storeup_vip').val(),
                source:$('#sourceup_vip').val()
            },function(res){
                console.log(res.data);
                if(res.status){
                    alert('会员更改成功')
                }else{
                    console.log(res.status)
                }
            })
        });

        // $('#upadd_vip').click(function(){
        //     $.post(global.apiBaseUrl + 'addvip',{
        //         _id:$('#idup_vip').val(),
        //         name:$('#nameup_vip').val(),
        //         tel:$('#telup_vip').val(),
        //         level:$('#levelup_vip').val(),
        //         points:$('#pointsup_vip').val(),
        //         store:$('#storeup_vip').val(),
        //         source:$('#sourceup_vip').val()
        //     },function(res){
        //         console.log(res)
        //         if(res.state){
        //             alert('会员更改成功!')
        //             // html();
        //         }else{
        //             console.log(res.state)
        //         }
        //     })
        // });  
    });
    

    // 分页
    // function pageList(){
        // 当前分页
        // 每页显示数量
        $.post(global.apiBaseUrl+'vip',function(res){
            // var pageNo = 1;
            var $qty = 9;
            var pageNo = Math.ceil(res.length/$qty);
            var data = res.slice(0, $qty);
            html1(data);
            // console.log(data);
            
            for(var i=1;i<pageNo+1;i++){
                // console.log(i);
                var $span = $('<span>'+ i +'</span>');
                $('.pagination').append($span);
                $('.pagination').css({
                    'float':'right'
                });
                $span.css({
                    'display':'inline-block',
                    'width':'25px',
                    'height':'25px',
                    'cursor':'pointer',
                    'border':'1px solid #ccc',
                    'text-align':'center'
                })
            }
            // 页码点击
            $('.pagination').on('click','span',function(){
                var num= $(this).html();
                var pageLen = $('.pagination').children('span');
                // console.log(pageLen)
                for(var i=0;i<pageLen.length;i++){

                }
                data = res.slice((num-1)*$qty,num*$qty);
                html1(data);

            })
        })

    // 查询
    $('.vip_search').blur(function(){
        var $valSearch = $('.vip_search').val();      
        console.log($valSearch);
        if($valSearch==='普通会员'){
            $.post(global.apiBaseUrl+'vip',{level:$valSearch},function(res){
                $('.tbody').html('');
                var searchHtml = $.map(res,function(item,idx){
                return `<tr>
                    <td class="id_vip"><input type="checkbox" class="checked" />${item._id}</td>
                    <td class="name_vip">${item.name}</td>
                    <td class="tel_vip">${item.tel}</td>
                    <td class="level_vip">${item.level}</td>
                    <td class="points_vip">${item.points}</td>
                    <td class="store_vip">${item.store}</td>
                    <td class="source_vip">${item.source}</td>
                    </tr>`
                }).join('');
                $('.tbody').html(searchHtml);
                // console.log(res)
            })
        }
        if($valSearch==='钻石卡'){
            $.post(global.apiBaseUrl+'vip',{level:$valSearch},function(res){
                $('.tbody').html('');
                var searchHtml = $.map(res,function(item,idx){
                return `<tr>
                    <td class="id_vip"><input type="checkbox" class="checked" />${item._id}</td>
                    <td class="name_vip">${item.name}</td>
                    <td class="tel_vip">${item.tel}</td>
                    <td class="level_vip">${item.level}</td>
                    <td class="points_vip">${item.points}</td>
                    <td class="store_vip">${item.store}</td>
                    <td class="source_vip">${item.source}</td>
                    </tr>`
                }).join('');
                $('.tbody').html(searchHtml);
                // console.log(res)
            })
        }
        if($valSearch==='金卡'){
            $.post(global.apiBaseUrl+'vip',{level:$valSearch},function(res){
                $('.tbody').html('');
                var searchHtml = $.map(res,function(item,idx){
                return `<tr>
                    <td class="id_vip"><input type="checkbox" class="checked" />${item._id}</td>
                    <td class="name_vip">${item.name}</td>
                    <td class="tel_vip">${item.tel}</td>
                    <td class="level_vip">${item.level}</td>
                    <td class="points_vip">${item.points}</td>
                    <td class="store_vip">${item.store}</td>
                    <td class="source_vip">${item.source}</td>
                    </tr>`
                }).join('');
                $('.tbody').html(searchHtml);
                // console.log(res)
            })
        }
        if($valSearch==='线下'){
            $.post(global.apiBaseUrl+'vip',{source:$valSearch},function(res){
                $('.tbody').html('');
                var searchHtml = $.map(res,function(item,idx){
                return `<tr>
                    <td class="id_vip"><input type="checkbox" class="checked" />${item._id}</td>
                    <td class="name_vip">${item.name}</td>
                    <td class="tel_vip">${item.tel}</td>
                    <td class="level_vip">${item.level}</td>
                    <td class="points_vip">${item.points}</td>
                    <td class="store_vip">${item.store}</td>
                    <td class="source_vip">${item.source}</td>
                    </tr>`
                }).join('');
                $('.tbody').html(searchHtml);
                // console.log(res)
            })
        }
        if($valSearch==='微信'){
            $.post(global.apiBaseUrl+'vip',{source:$valSearch},function(res){
                $('.tbody').html('');
                var searchHtml = $.map(res,function(item,idx){
                return `<tr>
                    <td class="id_vip"><input type="checkbox" class="checked" />${item._id}</td>
                    <td class="name_vip">${item.name}</td>
                    <td class="tel_vip">${item.tel}</td>
                    <td class="level_vip">${item.level}</td>
                    <td class="points_vip">${item.points}</td>
                    <td class="store_vip">${item.store}</td>
                    <td class="source_vip">${item.source}</td>
                    </tr>`
                }).join('');
                $('.tbody').html(searchHtml);
                // console.log(res)
            })
        }
    });
});

