


$(function() {
	var id = location.search.split("=")[1];
	$.get("http://47.104.244.134:8080/goodsbyid.do", {
		id: id

	}, function(data) {


		var str =`
					<li>
						<img src="${data.picurl}">
					</li>
					
					<li>
						<p>${data.name}</p>
						<span class="jg">￥${data.price}</span>
						<div class="show">
							<input type="text" value="1" class="txt">
							<span class="jj">
								<input type="button" value="+" class="jia">
								<input type="button" value="-" class="jian">
							</span>
							<input type="button" value="加入购物车" class="btn">
						</div>
					</li>
					`;
			
					

		$(".menu").html(str);
		
		
		var jia =$(".jj>.jia");
		var jian =$(".jj>.jian");
		var txt =$(".show>.txt");
		var btn =$(".show>.btn");
		var zhi = $(".zhi");
		jia.click(function(){
			txt.val(parseInt(txt.val())+1);
		})
		
		jian.click(function(){
			if(txt.val()<=1){
				txt.val(1) ;
			}else{
				txt.val(parseInt(txt.val())-1);
			}
		})
			
		txt.on("input",function(){
			txt.val(txt.val()); 
			if(txt.val()==""){
				txt.val(1);
			}
			
		})
		
		btn.click(function(){
			var  num = parseInt(txt.val());
			console.log(num);
			var token =JSON.parse(localStorage.getItem("token"))
			$.get("http://47.104.244.134:8080/cartsave.do",{
				gid:id,
				token:token},function(data){
					
					var s = parseInt(parseInt(zhi.html())+num)
					console.log(s);
					zhi.html(s);
				})
		})	
			
		
		

	})

					
					
		
})

















