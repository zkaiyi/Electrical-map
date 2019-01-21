// 高度
var scren=document.documentElement.clientHeight;
$(".left-nav").css("height",scren - 60 + "px");
$(".main").css("height",scren - 60 + "px");
// $(".Floating").css("height",scren - 60 - 13 -40 + "px");
$(".Floating").css("height",scren*0.88 + "px");
// 主要内容的宽高

// 鼠标滑过左边框
$(".nav").hover(function () {
    if($(this).hasClass("nav-a1")){
        $(this).removeClass("nav-a1");
        var navImg = $(this).children().find("img").attr("src");
        var arr02= navImg.split("images/")[1];
        var arr03= arr02.split(".png")[0];
        var arr04 = arr03.split("-a")[0];
        var navAUrl = new Array("images/" + arr04 + ".png");
        var newnavAUrl = navAUrl.join("");
        $(this).children().find("img").attr("src",newnavAUrl);
    }else {
        $(this).addClass("nav-a1");
        var navImg = $(this).children().find("img").attr("src");
        var arr02= navImg.split("images/")[1];
        var arr03= arr02.split(".png")[0];
        var navAUrl = new Array("images/" + arr03 +"-a.png");
        var newnavAUrl = navAUrl.join("");
        $(this).children().find("img").attr("src",newnavAUrl);
    }

    if($(this).hasClass("nav-a")){
        var navImg = $(this).children().find("img").attr("src");
        var arr02= navImg.split("images/")[1];
        var arr03= arr02.split(".png")[0];
        var navAUrl = new Array("images/" + arr03 +"-a.png");
        var newnavAUrl = navAUrl.join("");
        $(this).children().find("img").attr("src",newnavAUrl);
    }

},function () {
    if($(this).hasClass("nav-a1")){
        $(this).removeClass("nav-a1");
        var navImg = $(this).children().find("img").attr("src");
        var arr02= navImg.split("images/")[1];
        var arr03= arr02.split(".png")[0];
        var arr04 = arr03.split("-a")[0];
        var navAUrl = new Array("images/" + arr04 + ".png");
        var newnavAUrl = navAUrl.join("");
        $(this).children().find("img").attr("src",newnavAUrl);
    }else {
        $(this).addClass("nav-a1");
        var navImg = $(this).children().find("img").attr("src");
        var arr02= navImg.split("images/")[1];
        var arr03= arr02.split(".png")[0];
        var navAUrl = new Array("images/" + arr03 +"-a.png");
        var newnavAUrl = navAUrl.join("");
        $(this).children().find("img").attr("src",newnavAUrl);
    }
    if($(this).hasClass("nav-a")){
        var navImg = $(this).children().find("img").attr("src");
        var arr02= navImg.split("images/")[1];
        var arr03= arr02.split(".png")[0];
        var arr04 = arr03.split("-a")[0];
        var navAUrl = new Array("images/" + arr04 + "-a.png");
        var newnavAUrl = navAUrl.join("");
        $(this).children().find("img").attr("src",newnavAUrl);
    }
});
$(document).on("click","#close",function () {
    window.opener=null;
    window.open('','_self');
    window.close();
});

// var personId = sessionStorage.getItem("personalId");
// if(personId){
//
// }else {
//     window.location.href='http://hsds.haishu.gov.cn/'
// }
