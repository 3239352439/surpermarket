// var baseUrl = "http://localhost:88";
var baseurl = "http://10.3.135.25:88";
var baseio  = "ws://10.3.135.25:99";


function verify(){
    var token = window.localStorage.getItem('token');
    token = JSON.parse(token);
    if(token){
        $.post(global.apiBaseUrl + 'loginVerify',{token:token.token},function(res){
            if(res == 'y'){
                // window.location.href = 'employee.html'; 
            }else if(res == 'n'){
                alert('请重新登录！');
                window.location.href = 'login.html'; 
            }
        });
    }
}

function getToken(){
    var token = window.localStorage.getItem('token');
    token = JSON.parse(token);
    return token;
}