"use strict";

$(function () {
	$("#top>span").click(function () {
		$("#top").hide();
	});

	$(".big>li").mouseenter(function () {
		$(this).children(".up").fadeIn().stop().animate({
			"top": 225
		}, 300).siblings().css({
			"top": "260px"
		});
	});
	$(".big>li").mouseleave(function () {
		$(this).children(".up").stop().animate({
			"top": 260
		}, 300);
	});

	$(".master").mouseenter(function () {
		$(this).addClass("hover").next().show().end().siblings().removeClass("hover");
	});
	$(".item").mouseleave(function () {

		$(this).children(".master").removeClass("hover").next().hide();
	});

	var i = 0;

	$(".in_slide li").eq(i).fadeIn().find("img").stop().animate({
		"left": 0
	}, 500);

	setInterval(function () {

		i++;

		if (i === $(".in_slide li").length) {
			i = 0;
		}

		$(".in_slide li").eq(i).show().find("img").stop().animate({
			"left": 1000 * i
		}, 500).end().siblings().hide().find("img").css({
			"left": 0
		});

		$(".inbg dd").eq(i).show().stop().animate({
			"left": 1600 * i
		}, 500).siblings().hide().css({
			"left": 0
		});

		$(".num>li").eq(i).addClass("select").siblings().removeClass("select");
	}, 3000);
});

//轮播