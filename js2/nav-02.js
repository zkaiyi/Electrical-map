// 获取公司列表
// 初始状态
sessionStorage.setItem("sellStart","");
sessionStorage.setItem("sellEnd","");
sessionStorage.setItem("payStart","");
sessionStorage.setItem("payEnd","");
GetCompanyList("1");
function GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd) {
    var json = {
        pageSize:"6",
        currentPage:currentPage
    };
    if(sellStart){
        json.sellStart=sellStart;
    }
    if(sellEnd){
        json.sellEnd=sellEnd;
    }
    if(payStart){
        json.payStart=payStart;
    }
    if(payEnd){
        json.payEnd=payEnd;
    }

    $.ajax({
        url:callurl + "Company/GetCompanyList",
        type:"post",
        data:json,
        success:function (res) {
            console.log(res);
            var page = res.count;
            sessionStorage.setItem("page",page);
            var list = res.list;
            $(".fy-top").html("");
            for(i = 0;i<list.length;i++){
                var html = '<div class="fy-top-list clearfix" data-listId="'+list[i].id+'"   data-long="'+list[i].xzb+'"  data-lat="'+list[i].yzb+'" >\n' +
                    '                            <div class="fy-top-list-fl fl">'+parseInt(i + 1)+'</div>\n' +
                    '                            <div class="fy-top-list-fr fr">\n' +
                    '                                <div class="fy-top-list-fr-01" title="'+list[i].name+'">'+list[i].name+'</div>\n' +
                    '                                <div class="fy-top-list-fr-02" title="'+list[i].address+'" >'+list[i].address+'</div>\n' +
                    '                            </div>\n' +
                    '                        </div>';
                $(".fy-top").append(html)
            }

        },
        error:function (xml) {
            console.log(xml);
        }
    });



}

// 翻页
$(document).on("click",".fy-",function () {
   if($(this).hasClass("fy-a")) {
   }else {
       $(this).addClass("fy-a").siblings().removeClass("fy-a");
       var currentPage = $(this).text();

       var sellStart = sessionStorage.getItem("sellStart");
       var sellEnd = sessionStorage.getItem("sellEnd");
       var payStart = sessionStorage.getItem("payStart");
       var payEnd = sessionStorage.getItem("payEnd");
       GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd);
   }
});
// 点击下一页
$(document).on("click",".fy-f02",function () {
    var page = sessionStorage.getItem("page");
    var page_now =  $(".fy-a").text();
    var page_next =parseInt(page_now) +1;
    var page_now_index = $(".fy-a").index();
    $(".fy-").eq(page_now_index).addClass("fy-a").siblings().removeClass("fy-a");
    console.log("当前页：" + page_now);
    console.log("下一页："+ page_next);
    console.log("下标："+ page_now_index);
    if(page_now_index == "4"){
        $(".fy-").eq(3).html(page_next);
        $(".fy-").eq(2).html(page_now);
        $(".fy-").eq(1).html(page_now-1);
        $(".fy-").eq(0).html(page_now-2);
    }
    if(page_next > 4 ){
        $(".fy-f01").removeClass("fy-no");
        $(".fy-f01").addClass("fy-f01-c");
    }
    setTimeout(function () {

        var currentPage = $(".fy-a").text();


        var sellStart = sessionStorage.getItem("sellStart");
        var sellEnd = sessionStorage.getItem("sellEnd");
        var payStart = sessionStorage.getItem("payStart");
        var payEnd = sessionStorage.getItem("payEnd");
        GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd);



    },10);

    if(page_now == page - 1){
        $(".fy-f02").removeClass("fy-f02").addClass("fy-no")
    }





});
// 点击上一页
$(document).on("click",".fy-f01-c",function () {
    var page = sessionStorage.getItem("page");

    var page_now =  $(".fy-a").text();
    var page_prev =parseInt(page_now) - 1 ;
    var page_now_index = $(".fy-a").index();
    $(".fy-").eq(page_now_index-2).addClass("fy-a").siblings().removeClass("fy-a");
    console.log("当前页：" + page_now);
    console.log("上一页："+ page_prev);
    console.log("下标："+ page_now_index);
    if(page_now_index == "1"){
        $(".fy-").eq(0).html(page_prev);
        $(".fy-").eq(1).html(page_now);
        $(".fy-").eq(2).html(parseInt(page_now)+1);
        $(".fy-").eq(3).html(parseInt(page_now)+2);
        $(".fy-").eq(0).addClass("fy-a").siblings().removeClass("fy-a");
    }
    setTimeout(function () {
        var currentPage = $(".fy-a").text();



        var sellStart = sessionStorage.getItem("sellStart");
        var sellEnd = sessionStorage.getItem("sellEnd");
        var payStart = sessionStorage.getItem("payStart");
        var payEnd = sessionStorage.getItem("payEnd");
        GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd);


    },10);
    if(page_now == "2"){
        $(".fy-f01").removeClass("fy-f01-c");
        $(".fy-f01").addClass("fy-no");
    }


});

// 销售总额点击
$(".list-02-sell").on("click",".list-02-t",function () {
    if($(this).find(".span-01").hasClass("span-01a")){

    }else {
        // $(this).find(".span-01").addClass("span-01a").siblings().removeClass("span-01a");


        $(this).find(".span-01").addClass("span-01a");
        $(this).siblings().find(".span-01").removeClass("span-01a");

        var sellStart = $(this).find(".span-01").find(".sellStart").text();
        var sellEnd = $(this).find(".span-01").find(".sellEnd").text();
        console.log(sellStart);
        console.log(sellEnd);
        sessionStorage.setItem("sellStart",sellStart);
        sessionStorage.setItem("sellEnd",sellEnd);

        var payStart = sessionStorage.getItem("payStart");
        var payEnd = sessionStorage.getItem("payEnd");

        GetCompanyList("1",sellStart,sellEnd,payStart,payEnd);



    }
});

// 纳税
$(".list-02-pay").on("click",".list-02-t",function () {

    $(this).find(".span-01").addClass("span-01a");
    $(this).siblings().find(".span-01").removeClass("span-01a");


    // $(this).find(".span-01").addClass("span-01a");
    // $(this).siblings().find(".span-01").removeClass("span-01a");


    var payStart = $(this).find(".span-01").find(".payStart").text();
    var payEnd = $(this).find(".span-01").find(".payEnd").text();
    console.log(payStart);
    console.log(payEnd);
    sessionStorage.setItem("payStart",payStart);
    sessionStorage.setItem("payEnd",payEnd);

    var sellStart = sessionStorage.getItem("sellStart");
    var sellEnd = sessionStorage.getItem("sellEnd");

    GetCompanyList("1",sellStart,sellEnd,payStart,payEnd);







});