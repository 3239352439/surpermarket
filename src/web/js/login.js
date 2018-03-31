// 0:收银员
// 1:会员管理员
// 2:商品管理员
// 3:库存管理员
// 4：超级管理员

$(function(){
    $('#btnLogin').click(function(){
        $.post(global.apiBaseUrl + 'login', {username: $('#username').val(), password: $('#password').val()}, function(res){
            if(res.status){
                window.localStorage.setItem('token', JSON.stringify({token:res.data.token,root:res.data.root}));
                window.location.href = '../index.html'; 
            } else {
                $('#isRight').text('用户名或密码输入不正确！');
            }
        })
    })
})