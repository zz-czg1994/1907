"use strict";

$(function () {

	//请求数据
	$.get("http://47.104.244.134:8080/goodsbytid.do", {
		tid: 13,
		page: 1,
		limit: 11 }, function (data) {

		var str = "";
		var data = data.data;
		for (var i = 1; i < data.length; i++) {

			str += "\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a href=\"details.html?id=" + data[i].id + "\">\n\t\t\t\t\t\t\t<img src=\"" + data[i].picurl + "\">\n\t\t\t\t\t\t\t<p>" + data[i].name + "</p>\n\t\t\t\t\t\t\t<span>\uFFE5" + data[i].price + "</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\n\t\t\t\t\t";
		};

		$(".menu").html(str);
	});
});