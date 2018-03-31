$(function($){
	var now = new Date().getTime();
	var time = new Date().toLocaleString();
	console.log(now)

	$('.num')[0].innerHTML = now;
	$('.time')[0].innerHTML = time;
	$.post(baseurl+"/show",function(res){
		console.log(res)
		var sum = 0;
        var str = '';
            $('.contents')[0].innerHTML = `<p class="time">日期：<span>${time}</span></p>
            		<p class="num">单号：<span>${now}</span></p>
                    <p>*******************************************</p>
                    <table>
                        <thead>
                            <th>商品名称</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>金额</th>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                    <p>*******************************************</p>
                    <p class="total">总金额：<span>5元</span></p>`;
            $('.contents table tbody')[0].innerHTML = res.data.map(function(item){
                sum += Number(item.total);
                str += `${item.name}   ${item.price}    ${item.qty}    ${item.total}\n`
                return `<tr>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td>${item.qty}</td>
                            <td>${item.total}</td>
                        </tr>`
            }).join("");
        $('.contents .total span')[0].innerHTML = sum+'元';

        $('#print').click(function(){
        	console.log(46)
			$.post("http://10.3.135.67:81/print",{text: `123超市收银系统\n\n-------------------------------------\n日期："${time}"\n\n单号："${now}"\n\n*************************************\n\n商品名称    单价   数量    金额\n\n${str}*************************************\n\n总金额：${sum}元\n`},function(res){
	            // console.log(JSON.parse(res))
	        })

            var socket = io.connect(baseio);
            var msg = '已付款'
            socket.emit("send", msg);


            $.post(baseurl+"/clear",function(res){
                console.log(res);
            })
		})
	});

	



})