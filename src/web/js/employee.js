/* 
* @Author: Marte
* @Date:   2017-11-25 16:22:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-30 09:12:22
*/

$(function(){
    var pageNo =1;
    var qty = 3;
    var token = getToken();
   
    verify();

    
    
    // $('#employee').on('click',function(){
        $('#keyword').val('');
        verify();
        if(token.root!=4){
            alert('没有访问权限');
            return;
        }
        $('.header').css({'display':'block'});
        $.post(global.apiBaseUrl + 'sel?pageNo=' + pageNo + '&qty=' + qty,function(res){
            $('.table').get(0).innerHTML = '<thead><tr><th>工号</th><th>账号</th><th>密码</th><th>权限</th><th>手机号</th><th>编辑</th></tr></thead><tbody></tbody>';
            $('.table tbody').get(0).innerHTML = '';
            $('.table tbody').get(0).innerHTML +=  res.data.dataArray.map(function(employee){
                return `
                        <tr data-id="${employee._id}">
                            <td>${employee.id_em}</td>
                            <td>${employee.username}</td>
                            <td><input type="password" value="${employee.password}" disabled/></td>
                            <td>${employee.root}</td>
                            <td>${employee.phone}</td>
                            <td>
                                <input type="button" value="修改" id="modify"/>
                                <input type="button" value="删除" id="delete"/>
                            </td>
                        </tr>
                `;
            }).join('');


            // 分页
            var page_len = Math.ceil(Number(res.data.totle)/qty);
            $('#page').get(0).innerHTML = '';
            for(var i=0;i<page_len;i++){
                var span = $('<span/>').get(0);
                span.innerText = i + 1;
                if(pageNo == i+1){
                    span.className = 'active';
                }
                $('#page').get(0).appendChild(span);
            }


            // 删除
            $('.table tbody').on('click','#delete',function(){
                var idx = $(this).closest('tr').index();
                // var id = $(this).closest('tr').find('td').get(0).innerText;
                // if($(this).closest('tr').find('td').get(3).innerText = '4'){
                //     alert('超级管理员无法删除');
                //     return;
                // }
                var id = $(this).closest('tr').attr('data-id');
                $.post(global.apiBaseUrl + 'delete',{_id:id},function(res){
                    // console.log(res);
                });
                $(this).closest('tr').remove();
                location.href = 'employee.html';
            });

            // 修改
            $('.table tbody').on('click','#modify',function(){
                $('.modify').css({'display':'block'});
                $('.em_id').attr({'disabled':'true'});
                var idx = $(this).closest('tr').index();
                $('.em_id').get(0).value = $(this).closest('tr').find('td').get(0).innerText;
                $('.em_username').get(0).value = $(this).closest('tr').find('td').get(1).innerText;
                $('.em_pwd').get(0).value = $(this).closest('tr').find('td').get(2).children[0].value;
                if($(this).closest('tr').find('td').get(3).innerText == '4'){
                    $('.em_root').attr('disabled','true');
                }else{
                    $('.em_root').removeAttr('disabled');
                }
                console.log($(this).closest('tr').find('td').get(3).innerText);
                $('.em_root').get(0).value = $(this).closest('tr').find('td').get(3).innerText;
                $('.em_phone').get(0).value = $(this).closest('tr').find('td').get(4).innerText;

                // 保存修改
                $('#save').off().on('click',function(){
                    $('.table tbody').find('tr').get(idx).children[1].innerText = $('.em_username').get(0).value;
                    $('.table tbody').find('tr').get(idx).children[2].children[0].value = $('.em_pwd').get(0).value;
                    $('.table tbody').find('tr').get(idx).children[3].innerText = $('.em_root').get(0).value;
                    $('.table tbody').find('tr').get(idx).children[4].innerText = $('.em_phone').get(0).value;
                    $('.modify').css({'display':'none'});
                    var _id = $('.table tbody').find('tr').get(idx).getAttribute('data-id');
                    var id_em = $('.table tbody').find('tr').get(idx).children[0].innerText;
                    var username = $('.table tbody').find('tr').get(idx).children[1].innerText;
                    var pwd = $('.table tbody').find('tr').get(idx).children[2].children[0].value;
                    var root = $('.table tbody').find('tr').get(idx).children[3].innerText;
                    var phone = $('.table tbody').find('tr').get(idx).children[4].innerText;
                    console.log(_id,id_em,username);
                    $.post(global.apiBaseUrl + 'update',{_id:_id,id_em:id_em,username:username,password:pwd,root:root,phone:phone},function(res){
                    // console.log(res);
                    });
                });
            });
        
        });
    // });
    
    $('#page').on('click','span',function(){
        verify();
        $(this).addClass('active').siblings().removeClass('active');
        pageNo = $(this).text();
        $.post(global.apiBaseUrl + 'sel?pageNo=' + pageNo + '&qty=' + qty,function(res){
            $('.table tbody').get(0).innerHTML = '';
            $('.table tbody').get(0).innerHTML +=  res.data.dataArray.map(function(employee){
                return `
                        <tr data-id="${employee._id}">
                            <td>${employee.id_em}</td>
                            <td>${employee.username}</td>
                            <td><input type="password" value="${employee.password}" disabled/></td>
                            <td>${employee.root}</td>
                            <td>${employee.phone}</td>
                            <td>
                                <input type="button" value="修改" id="modify"/>
                                <input type="button" value="删除" id="delete"/>
                            </td>
                        </tr>
                `;
            }).join('');
        });
    })

    // 添加
    $('#add_em').on('click',function(){
        verify();
        $('.modify').css({'display':'block'});
        $('.em_id').val('').removeAttr('disabled');
        $('.em_username').val('');
        $('.em_pwd').val('');
        $('.em_phone').val('');
        $('#save').off().on('click',function(){
            var id_em = $('.em_id').get(0).value;
            var username = $('.em_username').get(0).value;
            var password = $('.em_pwd').get(0).value;
            var root = $('.em_root').get(0).value;
            var phone = $('.em_phone').get(0).value;
            var tr = $('<tr/>').get(0);          
            tr.innerHTML = `
                        <td>${id_em}</td>
                        <td>${username}</td>
                        <td><input type="password" value="${password}" disabled/></td>
                        <td>${root}</td>
                        <td>${phone}</td>
                        <td>
                            <input type="button" value="修改" id="modify"/>
                            <input type="button" value="删除" id="delete"/>
                        </td>
            `;
            $('.table tbody').get(0).appendChild(tr);
            $.post(global.apiBaseUrl + 'insert',{id_em:id_em,username:username,password:password,root:root,phone:phone},function(res){
                // console.log(res);
            });
            $('.modify').css({'display':'none'});
        });
    });

    // 搜索
    $('#search').on('click',function(){
        verify();
        $.post(global.apiBaseUrl + 'ser',{id_em:$('#keyword').val()},function(res){
            $('.table tbody').get(0).innerHTML = '';
            $('.table tbody').get(0).innerHTML +=  res.data.map(function(employee){
                return `
                        <tr data-id="${employee._id}">
                            <td>${employee.id_em}</td>
                            <td>${employee.username}</td>
                            <td><input type="password" value="${employee.password}" disabled/></td>
                            <td>${employee.root}</td>
                            <td>${employee.phone}</td>
                            <td>
                                <input type="button" value="修改" id="modify"/>
                                <input type="button" value="删除" id="delete"/>
                            </td>
                        </tr>
                `;
            }).join('');
            $('#page').css({'display':'none'});

        })

    });
})