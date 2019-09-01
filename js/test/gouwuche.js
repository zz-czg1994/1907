"use strict";

$(function () {

	var token = JSON.parse(localStorage.getItem("token"));
	token = parseInt(token);

	$.get("http://47.104.244.134:8080/cartlist.do", {
		token: token
	}, function (data) {
		/* var data = data.goods */

		var str = "";
		var sum = 0;

		for (var i in data) {
			str += "\n\t\t\t<li>\n\t\t\t\t<input  type=\"checkbox\" class=\"radio\" checked=\"checked\">\n\t\t\t\t<img src=\"" + data[i].goods.picurl + "\">\n\t\t\t\t<p>" + data[i].goods.name + "</p>\n\t\t\t\t<span class=\"dj\">\uFFE5" + data[i].goods.price + "</span>\n\t\t\t\t<b>\n\t\t\t\t\t<input type=\"button\" class=\"jian\" value=\"-\" />\n\t\t\t\t\t<input type=\"text\" class=\"sl\" value=\"" + data[i].count + "\" />\n\t\t\t\t\t<input type=\"button\" class=\"jia\" value=\"+\" />\n\t\t\t\t</b>\n\t\t\t\t<span class=\"zj\">" + data[i].goods.price * data[i].count + "</span>\n\t\t\t\t<input type=\"button\" class=\"delete\" value=\"\u5220\u9664\" data-id=\"$data[i].id\"/>\n\t\t\t</li>\n\t\t\t";
			sum += data[i].goods.price * data[i].count;
		}

		$(".list_").html(str);
		$(".cartPrice").html(sum);

		//总价	
		function QH() {
			var sum = 0;
			for (var _i = 0; _i < data.length; _i++) {
				if ($(".radio").eq(_i).is(":checked")) {
					sum += parseInt($(".zj").eq(_i).html());
				}
			}
			$(".cartPrice").html(sum);
		}

		//封装 修改请求
		function set(id, gid, num) {
			$.get("http://47.104.244.134:8080/cartupdate.do", {
				id: id,
				gid: gid,
				num: num,
				token: 0
			}, function (data) {
				console.log("赵猛");
			});
		}
		//按钮
		var jia = $(".jia");
		var jian = $(".jian");
		var sl = $(".sl");
		var del = $(".delete");
		var dx = $(".radio");
		var all = $(".selectAll");
		var zj = $(".cartPrice");

		var _loop = function _loop(_i2) {

			jia.eq(_i2).click(function () {
				sl.eq(_i2).val(parseInt(sl.eq(_i2).val()) + 1);
				$(".zj").eq(_i2).html(data[_i2].goods.price * sl.eq(_i2).val());
				set(data[_i2].id, data[_i2].gid, 1);
				QH();
			});

			jian.eq(_i2).click(function () {
				if (sl.eq(_i2).val() <= 1) {
					sl.eq(_i2).val(1);
				} else {
					sl.eq(_i2).val(parseInt(sl.eq(_i2).val()) - 1);
					set(data[_i2].id, data[_i2].gid, -1);
				}
				$(".zj").eq(_i2).html(data[_i2].goods.price * sl.eq(_i2).val());
				QH();
			});

			sl.eq(_i2).on("change", function () {
				var coun = parseInt($(this).val()) - parseInt(data[_i2].count);
				var brr = /[^1-9]/g;
				if (sl.eq(_i2).val() < 1 || brr.test(sl.eq(_i2).val()) || sl.eq(_i2).val() == "") {
					sl.eq(_i2).val(1);
				}

				$(".zj").eq(_i2).html(data[_i2].goods.price * sl.eq(_i2).val());
				set(data[_i2].id, data[_i2].gid, coun);
				QH();
			});

			del.eq(_i2).click(function () {
				set(data[_i2].id, data[_i2].gid, 0);
				$(this).parent().remove();
				QH();
			});

			all.click(function () {
				for (var j = 0; j < dx.length; j++) {
					if (all.is(":checked")) {
						dx.eq(j).prop("checked", true);
					} else {
						dx.eq(j).prop("checked", false);
					}
				}

				QH();
			});

			dx.eq(_i2).click(function () {
				var coun = 0;
				for (var j = 0; j < dx.length; j++) {
					if (dx[j].checked) {
						coun++;
					}
				}

				if (coun != dx.length) {
					all.prop("checked", false);
				} else {
					all.prop("checked", true);
				}
				QH();
			});
		};

		for (var _i2 = 0; _i2 < data.length; _i2++) {
			_loop(_i2);
		}
	});
});