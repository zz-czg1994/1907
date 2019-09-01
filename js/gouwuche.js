$(function(){
	
	var token =JSON.parse(localStorage.getItem("token"))
	token = parseInt(token)

	$.get("http://47.104.244.134:8080/cartlist.do",{
		token:token
	},function(data){
		/* var data = data.goods */

		var str="";
		var sum =0;
		
		for( let i  in  data){
		str+=	`
			<li>
				<input  type="checkbox" class="radio" checked="checked">
				<img src="${data[i].goods.picurl}">
				<p>${data[i].goods.name}</p>
				<span class="dj">￥${data[i].goods.price}</span>
				<b>
					<input type="button" class="jian" value="-" />
					<input type="text" class="sl" value="${data[i].count}" />
					<input type="button" class="jia" value="+" />
				</b>
				<span class="zj">${data[i].goods.price*data[i].count}</span>
				<input type="button" class="delete" value="删除" data-id="$data[i].id"/>
			</li>
			`
			sum+=data[i].goods.price*data[i].count
			
		}
			
		$(".list_").html(str);
		$(".cartPrice").html(sum);
		
//总价	
		function QH (){
			var sum = 0
			for(let i=0; i<data.length;i++){
				if($(".radio").eq(i).is(":checked")){
					sum += parseInt($(".zj").eq(i).html());
				}
			}
			$(".cartPrice").html(sum);
		}

//封装 修改请求
		function set(id,gid,num){
			$.get("http://47.104.244.134:8080/cartupdate.do",{
				id:id,
				gid:gid,
				num:num,
				token:0
			},function(data){

			})
		}
//按钮
		var jia =$(".jia");
		var jian =$(".jian");
		var sl =$(".sl");
		var del =$(".delete");
		var dx = $(".radio");
		var all =$(".selectAll");
		var zj = $(".cartPrice");
		for(let i =0 ;i<data.length; i++){
			
			jia.eq(i).click(function(){
				sl.eq(i).val(parseInt(sl.eq(i).val())+1);
				$(".zj").eq(i).html(data[i].goods.price*sl.eq(i).val());
				set(data[i].id,data[i].gid,1);
				QH();
			})
			
			
			jian.eq(i).click(function(){
				if(sl.eq(i).val()<=1){
					sl.eq(i).val(1);
				}else{
					sl.eq(i).val(parseInt(sl.eq(i).val())-1);
					set(data[i].id,data[i].gid,-1);
				}
				$(".zj").eq(i).html(data[i].goods.price*sl.eq(i).val());
				QH();
			})
			
			sl.eq(i).on("change",function(){
				var coun = parseInt($(this).val())-parseInt(data[i].count);
				var brr=/[^1-9]/g;
				if(sl.eq(i).val()<1 || brr.test(sl.eq(i).val()) || sl.eq(i).val()=="" ){
					sl.eq(i).val(1);
				}
				
				$(".zj").eq(i).html(data[i].goods.price*sl.eq(i).val());
				set(data[i].id,data[i].gid,coun);
				QH();
			})
			
			
			
			del.eq(i).click(function(){
				set(data[i].id,data[i].gid,0);
				$(this).parent().remove();
				QH();
			})
			
			all.click(function(){
				for(let j=0;j<dx.length;j++){
					if(all.is(":checked")){
						dx.eq(j).prop("checked",true);
					}
					
					else{
						dx.eq(j).prop("checked",false);
					}
				} 
				
				QH();
			})
			
			
			dx.eq(i).click(function(){
				var coun =0;
				for(let j=0;j<dx.length;j++){
					if(dx[j].checked){
						coun++;
					}
				}
				
				if(coun != dx.length){
					all.prop("checked",false);
				}else{
					all.prop("checked",true);
				}
				QH();
			})
			
			
			
			
			
			
			
			
		}
		
	})
	
	

	
	
	
})