// 高度
var scren=document.documentElement.clientHeight;
$(".left-nav").css("height",scren - 60 + "px");
$(".main").css("height",scren - 60 + "px");
$(".Floating").css("height",scren*0.88 + "px");

var screnW = $(window).width();
$(".main").css("width",screnW - 101 + "px");


// 主要内容的宽高


// 监听屏幕大小改变
$(window).resize(function() {

    var scren=document.documentElement.clientHeight;
    $(".left-nav").css("height",scren - 60 + "px");
    $(".main").css("height",scren - 60 + "px");
    $(".Floating").css("height",scren*0.88 + "px");

    var screnW = $(window).width();
    $(".main").css("width",screnW - 101 + "px");

});




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


var cookie = {
    set: function (key, val, time) {//设置cookie方法
        var date = new Date(); //获取当前时间
        var expiresDays = time;  //将date设置为n天以后的时间
        date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
        // document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
        document.cookie = key + "=" + val + ";expires=" + date.toGMTString()+ "; path=/";  //设置cookie
    },
    get: function (key) {//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    },
    delete: function (key) { //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime() - 10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
    },
    deleteAll: function () { //删除cookie方法
        var date=new Date();
        date.setTime(date.getTime()-10000);
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i =  keys.length; i--;)
                document.cookie=keys[i]+"=0; expire="+date.toGMTString()+"; path=/";
        }

    },


};

cookie.set("personId","1111","3600");



var personId = cookie.get("personId");
if(personId){

}else {
    window.location.href='http://hsds.haishu.gov.cn/'
}



