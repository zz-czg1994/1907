"use strict";

$(function () {
	var id = location.search.split("=")[1];
	$.get("http://47.104.244.134:8080/goodsbyid.do", {
		id: id

	}, function (data) {

		var str = "\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<img src=\"" + data.picurl + "\">\n\t\t\t\t\t</li>\n\t\t\t\t\t\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<p>" + data.name + "</p>\n\t\t\t\t\t\t<span class=\"jg\">\uFFE5" + data.price + "</span>\n\t\t\t\t\t\t<div class=\"show\">\n\t\t\t\t\t\t\t<input type=\"text\" value=\"1\" class=\"txt\">\n\t\t\t\t\t\t\t<span class=\"jj\">\n\t\t\t\t\t\t\t\t<input type=\"button\" value=\"+\" class=\"jia\">\n\t\t\t\t\t\t\t\t<input type=\"button\" value=\"-\" class=\"jian\">\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t<input type=\"button\" value=\"\u52A0\u5165\u8D2D\u7269\u8F66\" class=\"btn\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t";

		$(".menu").html(str);

		var jia = $(".jj>.jia");
		var jian = $(".jj>.jian");
		var txt = $(".show>.txt");
		var btn = $(".show>.btn");
		var zhi = $(".zhi");
		jia.click(function () {
			txt.val(parseInt(txt.val()) + 1);
		});

		jian.click(function () {
			if (txt.val() <= 1) {
				txt.val(1);
			} else {
				txt.val(parseInt(txt.val()) - 1);
			}
		});

		txt.on("input", function () {
			txt.val(txt.val());
			if (txt.val() == "") {
				txt.val(1);
			}
		});

		btn.click(function () {
			var num = parseInt(txt.val());
			console.log(num);
			var token = JSON.parse(localStorage.getItem("token"));
			$.get("http://47.104.244.134:8080/cartsave.do", {
				gid: id,
				token: token }, function (data) {

				var s = parseInt(parseInt(zhi.html()) + num);
				console.log(s);
				zhi.html(s);
			});
		});
	});
});