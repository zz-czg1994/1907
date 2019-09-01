$(function() {
	$("#w1").change(function() {
		let reg = /[a-zA-Z]\w{4,16}/;
		let $username = $("#w1").val();
		if ($username == "") {
			alert("用户名不能为空");
		} else if (!reg.test($username)) {
			alert("请输入以字母开头5-16位包含数字字母下划线的用户名")
		} else {
			$.get("http://47.104.244.134:8080/username.do", {
					username: $username
				},
				function(data) {
					//console.log(data)
					if (data.code == 0) {
						alert("用户名重复");
					} 
				})
		}

	})
	
	$("#w2").change(function() {
		let reg = /^\w{4,10}$/;
		let $password = $("#w2").val();
		if ($password == "") {
			alert("密码不能为空");
		} else if (!reg.test($password)) {
			alert("请输入4-10位的密码");
		}
	})
	
	
	$("#w3").change(function() {
		let $email = $("#w3").val();
		let reg = /^\w+@\w+(\.\w+)+$/;
		if ($email == "") {
			alert("邮箱不能为空");
		} else if (!reg.test($email)) {
			alert("请输入如:abc@sina.com样式的邮箱")
		} else {
			$.get("http://47.104.244.134:8080/useremail.do", {
				email: $email
			}, function(data) {
				// console.log(data)
				if (data.code == 0) {
					alert("邮箱重复");
				}
			})
		}
	})
	
	$("#w5").click(function() {
		let $username = $("#w1").val();
		let $password = $("#w2").val();
		let $email = $("#w3").val();
		let val = $('input:radio[name="sex"]:checked').val();
		let val0 = $('input:radio[name="xieyi"]:checked').val();
		let $sex;
		if (val == null) {
			alert("请选择性别");
		} else {
			$sex = val;
		}
		if (val0 == null) {
			alert("请阅读并同意协议");
		}
		
		$.post("http://47.104.244.134:8080/usersave.do", {
		            username: $username,
		            password: $password,
		            email: $email,
		            sex: $sex
		        }, function (data) {                       
		                location = "denglu.html"           
		        })
		        return false;
	})
	
	
})



