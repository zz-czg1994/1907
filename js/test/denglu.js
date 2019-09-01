"use strict";

$(function () {
    $(".lgn").click(function () {
        // http://47.104.244.134:8080/
        var $name = $(".zh").val();
        var $password = $(".mm").val();
        if ($name == "") {
            alert("请输入用户名");
        } else if ($password == "") {
            alert("请输入密码");
        }
        $.post("http://47.104.244.134:8080/userlogin.do", {
            name: $name,
            password: $password
        }, function (data) {

            if (data.code == 1) {
                alert("用户名或密码错误请重新输入");
            } else {
                alert("登陆成功");
                localStorage.setItem("token", JSON.stringify(data.data.token));
                location = "shouye.html";
            }
            return false;
        });
    });
});