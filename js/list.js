
$(function() {

	
	//请求数据
	$.get("http://47.104.244.134:8080/goodsbytid.do",
		{
			tid:13,
			page:1,
			limit:11},
		function(data){

			var str ="";
			var data= data.data;
			for (let i = 1; i<data.length;i++){

				str+=
					`
					<li>
						<a href="details.html?id=${data[i].id}">
							<img src="${data[i].picurl}">
							<p>${data[i].name}</p>
							<span>￥${data[i].price}</span>
						</a>
					</li>
							
					`;
			};

			
			$(".menu").html(str);
		})
		
		
			
		
	
})	
	

