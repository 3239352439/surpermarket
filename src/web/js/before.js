jQuery(function($){
	var now = new Date().getTime();

	var year = new Date().getFullYear();
	var month = new Date().getMonth()+1;
	var date = new Date().getDate();
	var hour = new Date().getHours();
	var min = new Date().getMinutes();
	var sec = new Date().getSeconds();
	//订单号
	$('.num')[0].innerHTML = now;
	//时间
	$('.time')[0].innerHTML = year + '年' + month + '月' + date + '日' + hour + ':' + min + ':' + sec;

	$('.ser').focus();
	//回车事件
	$(document).keyup(function(e){
		if(e.keyCode == 13){
			$('.search').trigger('click')
		}
	});
	

	$('.search').click(function(){
		var msg = $('.ser').val();
		$.post(baseurl+"/find",{barCode:msg},function(res){

			console.log(res);
			$.post(baseurl+"/show",function(res){
				$('tbody')[0].innerHTML = res.data.map(function(item){
            	return `
                		<tr>
							<td class="code">${item.barCode}</td>
							<td class="name">${item.name}</td>
							<td class="price">${item.price}</td>
							<td class="number">${item.qty}</td>
							<td class="total">${item.total}</td>
						</tr>
					`
            }).join('');
				$(".ser").val("");
				console.log($('.goods tr'));
				var arr = [];
		        for(var i=0; i<$(".total").length; i++){
		        	arr[i] = ($(".total")[i].innerHTML);
		        }
		        
				console.log(arr);

		        var total = 0 ;
		        for (var i = 0; i < arr.length; i++) {
			    	total += arr[i]*1;	
			    }
			    

			    $(".sum")[0].innerHTML = total;
			    $(".alltotal")[0].innerHTML = parseInt(total) ;
			})
            
		})

	});

	

	//
	$('._rebate').click(function(){
		$(".rebate")[0].innerHTML = $('#reba').val()+'%' ;
		console.log($(".sum")[0].innerHTML*$('#reba').val()/100);a

		$(".alltotal")[0].innerHTML = ($(".sum")[0].innerHTML*$('#reba').val())/100;
    });

	//
	$('._member').click(function(){
		$(".member")[0].innerHTML = $('#memb').val();
	});


	//删除
	$('._del').click(function(){
		confirm("已删除");
		window.location.reload();
		$.post(baseurl+"/clear",function(res){
			
		});
	});

	$('._save').click(function(){
		confirm("已挂单");
		$('.goods').remove();
		window.location.reload();
	});

	$('._out').click(function(){
		$.post(baseurl+"/show",function(res){
			$('tbody')[0].innerHTML = res.data.map(function(item){
        	return `
            		<tr>
						<td class="code">${item.barCode}</td>
						<td class="name">${item.name}</td>
						<td class="price">${item.price}</td>
						<td class="number">${item.qty}</td>
						<td class="total">${item.total}</td>
					</tr>
				`
        }).join('');
			$(".ser").val("");
			console.log($('.goods tr'));
			var arr = [];
	        for(var i=0; i<$(".total").length; i++){
	        	arr[i] = ($(".total")[i].innerHTML);
	        }
	        
			console.log(arr);

	        var total = 0 ;
	        for (var i = 0; i < arr.length; i++) {
		    	total += arr[i]*1;	
		    }
		    

		    $(".sum")[0].innerHTML = total;
		    $(".alltotal")[0].innerHTML = parseInt(total) ;
		})
	});

	//结算
	$('.btnover').click(function(){
		$('#er').modal({show: false});
		$('#er').modal('toggle');
		//二维码
		var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width : 177,//设置宽高
                    height : 177
                });
                qrcode.makeCode(baseurl+"/html/order.html");

	})
	//socket.io
	var socket = io.connect(baseio);
	socket.on("get",function(msg){
		console.log(msg);
		$('.onmsg')[0].innerHTML = '支付成功';
	});

})