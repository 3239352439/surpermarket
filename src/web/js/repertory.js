/* 
* @Author: Marte
* @Date:   2017-11-27 15:07:31
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-29 20:24:17
*/
   ;(function($){
            var data;
            var tHtml;
           
            
            //时间条件查询,点击刷新后按条件
            
             //进页面查询所有,并生成结构到页面
            
            var idx=$('.atv').index();
            $('.prd').eq(idx).css({
                display:'block'
            }).siblings('.prd').css({
                display:"none"
            });
            if(idx == 0){
                page1();
                
            }
            //tab切换
            $('.title>ul>li').click(function(){
                $(this).addClass('atv').siblings('li').removeClass('atv');

                var idx=$(this).index();
                    $('.prd').eq(idx).css({
                        display:'block'
                    }).siblings('.prd').css({
                        display:"none"
                    });
                 
                   if(idx==0){
                       
                        create1();
                     
                    }else if(idx==1){
                        
                        page2();
                     
                        idx2();
                    }else if(idx==2){
                        $('.modal-body').html(`<ul id="repertory">
                        <li><label>*仓库名称：</label><input type="text" placeholder=""/></li>
                        <li><label>仓库编码：</label><input type="text" placeholder=""/></li>
                        <li><label>联系电话:</label><input type="text" placeholder=""/></li>
                        <li><label>管 理 员：</label><input type="text" placeholder=""/></li>
                        <li><label>仓库地址：</label><input type="text" placeholder=""/></li>
                        <li><label>仓库状态：</label><input type="text" placeholder=""/></li>
                        <li><label>备注信息：</label><input type="text" placeholder=""/></li>
                       
                           </ul>`);
                    }else if(idx==3){
                        $('.modal-body').html(``);
                    }
          })
           
           $('#reo').click(function(){
                page2();
           })



           //进页面以及第一页生成 
        function page1(){
                 create1();
                //页码切换
                $('.pagination').on('click','li',function(){
                    var num = $(this).index()-1;
                    $('.table').html(`<tr>
                            <th><label>单据编号</label></th>
                            <th>供应商</th>
                            <th>商品名称</th>
                            <th>单位</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>合计</th>
                            <th>实收</th>
                            <th>支付方式</th>
                            <th>入库状态</th>
                            <th>进货日期</th>
                            <th>操作</th>
                        </tr>`);
                    $('.table')[0].innerHTML+=data.slice(num*5,num*5+5).map(function(item){
                            return` <tr>
                                <td><input type="checkBox" />${item._id}</td>
                                <td>${item._supplier}</td>
                                <td>${item._goodsname}</td>
                                <td>${item._unit}</td>
                                <td>${item._price}</td>
                                <td>${item._count}</td>
                                <td>${item._total}</td>
                                <td>${item.realPay}</td>
                                <td>${item.payment}</td>
                                <td>${item.status}</td>
                                <td>${item.date}</td>
                                <td><span>打印</span><span>详情</span><span>退货</span></td>
                            </tr>
                            `      
                        }).join('');

                })
                
                   //库存修改
                $('#changeGoods').click(function() {
                    $('#myModalLabel').html('修改信息');
                    $('.modal-body').html(`
                        <ul id="repertory">
                        <li><label>单据编号:</label><input type="text" /></li>
                        <li><label>供应商:</label><input type="text" /></li>
                        <li><label>商品名称:</label><input type="text" /></li>
                        <li><label>单位:</label><input type="text" /></li>
                        <li><label>单价:</label><input type="text" /></li>
                        <li><label>数量:</label><input type="text" /></li>
                        <li><label>实收:</label><input type="text" /></li>
                        <li><label>支付方式:</label><input type="text" /></li>
                        <li><label>入库状态:</label><input type="text" /></li>
                        <li><label>进货日期:</label><input type="text" /></li>
                        <span id="addErr" style="color:red;display:block;float:right;"></span>
                           </ul>
                     `); 
                    //选择后修改
                        var id =$("input[type='checkbox']:checked").parent().text()*1;
                    
                        $.post('http://localhost:88/purchase',{},function(res){
                            res.data.map(function(item){

                                if(item._id == id){
                                    $('#repertory li input').eq(0).val(item._id);
                                    $('#repertory li input').eq(1).val(item._supplier);
                                    $('#repertory li input').eq(2).val(item._goodsname);
                                    $('#repertory li input').eq(3).val(item._unit);
                                    $('#repertory li input').eq(4).val(item._price);
                                    $('#repertory li input').eq(5).val(item._count);
                                    $('#repertory li input').eq(6).val(item.realPay);
                                    $('#repertory li input').eq(7).val(item.payment);
                                    $('#repertory li input').eq(8).val(item.status);
                                    $('#repertory li input').eq(9).val(item.date);
                                    return;
                                }
                            })
                        })
                    var yon =$('#repertory li input').length;
                    
                            $('.btn-primary').click(function(){
                                if(yon ==10){
                                console.log(666)
                                $.post('http://localhost:88/updatepurchase',{
                                    _id: $('#repertory li input').eq(0).val()*1,
                                    _supplier:$('#repertory li input').eq(1).val(),
                                    _goodsname:$('#repertory li input').eq(2).val(),
                                    _unit:$('#repertory li input').eq(3).val(),
                                    _price:$('#repertory li input').eq(4).val(),
                                    _count:$('#repertory li input').eq(5).val(),
                                    _total:$('#repertory li input').eq(4).val()*$('#repertory li input').eq(5).val(),
                                    realPay:$('#repertory li input').eq(6).val(),
                                    payment:$('#repertory li input').eq(7).val(),
                                    status:$('#repertory li input').eq(8).val(),
                                    date:$('#repertory li input').eq(9).val()

                                },function(res){
                                    console.log(res);
                                    create1();
                                })
                                
                             }
                            })
                   
                 });
               
                //库存新增
                $('#jinhuo').click(function() {
                        $('#myModalLabel').html('新增入库');
                        $('.modal-body').html(`
                        <ul id="repertory">
                        <li><label>单据编号:</label><input type="text" /></li>
                        <li><label>供应商:</label><input type="text" /></li>
                        <li><label>商品名称:</label><input type="text" /></li>
                        <li><label>单位:</label><input type="text" /></li>
                        <li><label>单价:</label><input type="text" /></li>
                        <li><label>数量:</label><input type="text" /></li>
                        <li><label>实收:</label><input type="text" /></li>
                        <li><label>支付方式:</label><input type="text" /></li>
                        <li><label>入库状态:</label><input type="text" /></li>
                        <li><label>进货日期:</label><input type="text" /></li>
                        <span id="addErr" style="color:red;display:block;float:right;"></span>
                           </ul>
                     `); 
                        $('#addErr').text('');
                        $('.btn-primary').click(function(){

                            var len = $('#repertory li input').length;
                            var a=[];
                            for(var i=0;i<len;i++){
                                b=$('#repertory li input').eq(i).val();
                                a.push(b);
                            }
                            var pd=true;
                            a.forEach(function(item){
                                if(item ===""){
                                    $('#addErr').text('输入框不能为空');
                                    return pd=false;
                                }else if(!/^[0-9]+$/.test(a[0])){
                                    $('#addErr').text('id必须是数字');
                                     return pd=false;
                                }else{
                                    $('#addErr').text('');
                                }
                            })
                            if(pd == true){
                                    $.ajax({
                                    url:'http://localhost:88/addpurchase',
                                    type:'get',
                                    dataType:'json',
                                    data:{ _id:a[0],_supplier:a[1],_goodsname:a[2],_unit:a[3],_price:a[4],_count:a[5],_total:a[4]*a[5],realPay:a[6],payment:a[7],status:a[8],date:a[9]},
                                    success:function(res){  
                                        create1();        
                                    }
                                })
                                    
                            }
                            
                        })
                 });
                //库存删除
                $('#delete').click(function() {
                   var id =$("input[type='checkbox']:checked").parent().text()*1;
                   $.post('http://localhost:88/deletepurchase',{_id:id},function(res){
                        console.log(res);create1();
                   }) 
                   
                });
                  
        }
          function page2(){
                create();
                //页码切换
            $('.pagination').on('click','li',function(){
                var num = $(this).index()-1;
                $('.table').eq(1).html('');
                $('.table')[1].innerHTML+=data.slice(num*5,num*5+5).map(function(item){
                       return` <tr>
                                <td class="firstTd">
                                <input type="checkbox" />${item._supplier}</td>
                                <td>${item._man}</td>
                                <td>${item._phone}</td>
                                <td>${item._qq}</td>
                                <td>${item._worker}</td>
                                <td>${item._address}</td>
                                <td>${item._remark}</td>
                            </tr>
                            `      
                    }).join('');

            })
              $('.modal-body').html(`<ul id="repertory">
                    <li><label>* 供 应 商：</label><input type="text" placeholder=""/></li>
                    <li><label>* 联 系 人：</label><input type="text" placeholder=""/></li>
                    <li><label>*联系电话：</label><input type="text" placeholder=""/></li>
                    <li><label>QQ号码：</label><input type="text" placeholder=""/></li>
                    <li><label>操作人员：</label><input type="text" placeholder=""/></li>
                    <li><label>客户地址：</label><input type="text" placeholder=""/></li>
                    <li><label>备注信息</label><input type="text" placeholder=""/></li>
                       </ul>`);
                //供应商新增
                $('#supplier').click(function() {
                        $('#myModalLabel').html('新增供应商');
                        $('#addErr').text('');
                        $('.btn-primary').click(function(){

                                var len = $('#repertory li input').length;
                                var a=[];
                                for(var i=0;i<len;i++){
                                    var b=$('#repertory li input').eq(i).val();
                                    a.push(b);
                                }
                                var pd=true;
                                a.forEach(function(item){
                                    if(item ===""){
                                        $('#addErr').text('输入框不能为空');
                                        return pd=false;
                                    }else{
                                        $('#addErr').text('');
                                    }
                                })
                                if(pd == true){
                                        $.ajax({
                                        url:'http://localhost:88/addSupplier',
                                        type:'get',
                                        dataType:'json',
                                        data:{ _supplier:a[0],_man:a[1],_phone:a[2],_qq:a[3],_worker:a[4],_address:a[5],_remark:a[6]},
                                        success:function(res){
                                                  create();     
                                        }
                                    })
                                      
                                }
                                 create();
                            })
                    
                 });
     
        }
        function idx2(){
            //删除
                $('#sudel').click(function() {
                   var name =$("input[type='checkbox']:checked").parent().text().trim();
                       
                        $.post('http://localhost:88/supplier',{},function(res){
                            var id;
                            res.data.map(function(item){
                                
                                if(item._supplier == name){
                                    id=item._id;
                                }
                            })
                            $.post('http://localhost:88/deleteSupplier',{_id:id},function(res){
                                 console.log(res); create();
                            }) 
                             
                        })
                   
                       
                });
                 $('#supChange').click(function() {
                        $('#myModalLabel').html('修改信息');
                        //选择后修改
                        var name =$("input[type='checkbox']:checked").parent().text().trim();
                       
                        $.post('http://localhost:88/supplier',{},function(res){
                            var id;
                            res.data.map(function(item){
                                
                                if(item._supplier == name){
                                    id=item._id;
                                    $('#repertory li input').eq(0).val(item._supplier);
                                    $('#repertory li input').eq(1).val(item._man);
                                    $('#repertory li input').eq(2).val(item._phone);
                                    $('#repertory li input').eq(3).val(item._qq);
                                    $('#repertory li input').eq(4).val(item._worker);
                                    $('#repertory li input').eq(5).val(item._address);
                                    $('#repertory li input').eq(6).val(item._remark);
                                    return;
                                }
                            });
                             $('.btn-primary').click(function(){
                                    
                                    $.post('http://localhost:88/updateSupplier',{
                                        _id:id,
                                        _supplier: $('#repertory li input').eq(0).val(),
                                        _man:$('#repertory li input').eq(1).val(),
                                        _phone:$('#repertory li input').eq(2).val(),
                                        _qq:$('#repertory li input').eq(3).val(),
                                        _worker:$('#repertory li input').eq(4).val(),
                                        _address:$('#repertory li input').eq(5).val(),
                                        _remark:$('#repertory li input').eq(6).val()
                                    },function(res){
                                        console.log(res);
                                        create();
                                    })
                                     
                             })
                            
                        })
               

             });
           
        }
        function create(){
             $.ajax({
                    url: 'http://localhost:88/supplier',
                    dataType: 'json',
                    type:"post",
                    success:function(res){
                        
                        data=res.data;
                        var len = res.data.length;
                        //生成页码
                        var ul = $('.pagination')[0];
                        ul.innerHTML=`<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`; 
                        for(var i=0;i<len/5;i++){
                            ul.innerHTML+=`<li><a href="#">${(i+1)}</a></li>`;
                        }
                        ul.innerHTML+=`<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`;

                        var tr=$('.table')[1];
                        //渲染进货管理
                        tr.innerHTML=`<tr>
                            <th><label><input type="checkBox" />供应商</label></th>
                            <th>联系人</th>
                            <th>联系电话</th>
                            <th>QQ号码</th>
                            <th>操作人员</th>
                            <th>客户地址</th>
                            <th>备注</th>
                        </tr>`;
                        tr.innerHTML+=data.slice(0,5).map(function(item){
                            return` <tr>
                                <td class="firstTd">
                                <input type="checkbox" />${item._supplier}</td>
                                <td>${item._man}</td>
                                <td>${item._phone}</td>
                                <td>${item._qq}</td>
                                <td>${item._worker}</td>
                                <td>${item._address}</td>
                                <td>${item._remark}</td>
                                
                            </tr>
                            `      
                        }).join('');
                   } 
                })
        }
        function create1(){
            var inputlen;
                $.ajax({
                    url: 'http://localhost:88/purchase',
                    dataType: 'json',
                    type:"post",
                    success:function(res){
                        //console.log(res.data);
                        data=res.data;
                         var len = res.data.length;
                        //生成页码
                        var ul = $('.pagination')[0];
                        ul.innerHTML=`<li><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`; 
                        for(var i=0;i<len/5;i++){
                            ul.innerHTML+=`<li><a href="#">${(i+1)}</a></li>`;
                        }
                        ul.innerHTML+=`<li><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`;

                        var tr=$('.table')[0];
                        //渲染进货管理
                        tr.innerHTML=`<tr>
                            <th><label>单据编号</label></th>
                            <th>供应商</th>
                            <th>商品名称</th>
                            <th>单位</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>合计</th>
                            <th>实收</th>
                            <th>支付方式</th>
                            <th>入库状态</th>
                            <th>进货日期</th>
                            <th>操作</th>
                        </tr>`;
                        tr.innerHTML+=data.slice(0,5).map(function(item,idx){
                            return` <tr>
                                <td class="firstTd"><input type="checkbox" />${item._id}</td>
                                <td>${item._supplier}</td>
                                <td>${item._goodsname}</td>
                                <td>${item._unit}</td>
                                <td>${item._price}</td>
                                <td>${item._count}</td>
                                <td>${item._total}</td>
                                <td>${item.realPay}</td>
                                <td>${item.payment}</td>
                                <td>${item.status}</td>
                                <td>${item.date}</td>
                                <td><span>打印</span><span>详情</span><span>退货</span></td>
                            </tr>
                            `      
                        }).join('');
                   } 
                })
        }
        })(jQuery)