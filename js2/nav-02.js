// 获取公司列表
// 初始状态
var QYDLidT = window.location.href.split("QYDLid=")[1];
console.log(QYDLidT);
if(QYDLidT){
    sessionStorage.setItem("QYDLidT",QYDLidT)
}else {
    QYDLidT = "";
    sessionStorage.setItem("QYDLidT","")
}


var fy_c_w = $(".fy-").length+1;
$(".fy-c").css("width",fy_c_w * 21  + 165 + "px");

sessionStorage.setItem("sellStart","");
sessionStorage.setItem("sellEnd","");
sessionStorage.setItem("payStart","");
sessionStorage.setItem("payEnd","");
GetCompanyList("1","","","","",QYDLidT);
function GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd,QYDLidT) {
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
    if(QYDLidT){
        json.QYDLidT=QYDLidT;
    }

    $.ajax({
        url:callurl + "Company/GetCompanyList",
        type:"post",
        data:json,
        success:function (res) {


            $(".fwnxx-span").html(res.amount);
            $(".fy-02").html(res.count);

            $(".fy-").removeClass("hide");
            $(".fy-f02").removeClass("fy-no");
            sessionStorage.setItem("bb","");


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
            $(".fy-").removeClass("hide");

            if(res.count == "1"){
                $(".fy-").eq(1).addClass("hide");
                $(".fy-").eq(2).addClass("hide");
                $(".fy-").eq(3).addClass("hide");
            }
            if(res.count =="2"){
                $(".fy-").eq(2).addClass("hide");
                $(".fy-").eq(3).addClass("hide");
            }
            if(res.count == "3"){
                $(".fy-").eq(3).addClass("hide");
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
       // GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd);

       var typeId = sessionStorage.getItem("typeId");

       if(sessionStorage.getItem("bb") == ""){
           GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd,QYDLidT);
       }
       if(sessionStorage.getItem("bb") == "yes01"){
           GetbbycList(currentPage,typeId);
       }
       if(sessionStorage.getItem("bb") == "yes02"){
           GetwwcbbList(currentPage,typeId)
       }



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
        // GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd);
        if(sessionStorage.getItem("bb") == ""){
            GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd,QYDLidT);
        }

        var typeId = sessionStorage.getItem("typeId");
        if(sessionStorage.getItem("bb") == "yes01"){
            GetbbycList(currentPage,typeId);
        }
        if(sessionStorage.getItem("bb") == "yes02"){
            GetwwcbbList(currentPage,typeId)
        }



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
        // GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd);

        if(sessionStorage.getItem("bb") == ""){
            GetCompanyList(currentPage,sellStart,sellEnd,payStart,payEnd,QYDLidT);
        }
        var typeId = sessionStorage.getItem("typeId");
        if(sessionStorage.getItem("bb") == "yes01"){
            GetbbycList(currentPage,typeId);
        }
        if(sessionStorage.getItem("bb") == "yes02"){
            GetwwcbbList(currentPage,typeId)
        }


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

        $(".fwnxx").removeClass("hide");
        $(this).siblings(".list-02-t-new").removeClass("list-02-t-new-a");


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

        GetCompanyList("1",sellStart,sellEnd,payStart,payEnd,QYDLidT);

        $(".fy-").eq(0).html("1").addClass("fy-a").siblings().removeClass("fy-a");
        $(".fy-").eq(1).html("2");
        $(".fy-").eq(2).html("3");
        $(".fy-").eq(3).html("4");
    }
});

// 纳税
$(".list-02-pay").on("click",".list-02-t",function () {

    $(this).siblings(".list-02-t-new").removeClass("list-02-t-new-a");


    $(".fwnxx").removeClass("hide");

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

    GetCompanyList("1",sellStart,sellEnd,payStart,payEnd,QYDLidT);


    $(".fy-").eq(0).html("1").addClass("fy-a").siblings().removeClass("fy-a");
    $(".fy-").eq(1).html("2");
    $(".fy-").eq(2).html("3");
    $(".fy-").eq(3).html("4");









});

// 销售总额点击
$(".list-02-sell").on("click",".list-02-t-new",function () {
    $(".fwnxx").removeClass("hide");
    $(this).addClass("list-02-t-new-a");
    $(this).siblings().find(".span-01").removeClass("span-01a");

    sessionStorage.setItem("sellStart","0");
    sessionStorage.setItem("sellEnd","");
    var payStart = sessionStorage.getItem("payStart");
    var payEnd = sessionStorage.getItem("payEnd");
    GetCompanyList("1","0","",payStart,payEnd,QYDLidT);



    $(".fy-").eq(0).html("1").addClass("fy-a").siblings().removeClass("fy-a");
    $(".fy-").eq(1).html("2");
    $(".fy-").eq(2).html("3");
    $(".fy-").eq(3).html("4");

});

// 纳税
$(".list-02-pay").on("click",".list-02-t-new",function () {
    $(".fwnxx").removeClass("hide");
    $(this).addClass("list-02-t-new-a");
    $(this).siblings().find(".span-01").removeClass("span-01a");

    sessionStorage.setItem("payStart","0");
    sessionStorage.setItem("payEnd","");
    var sellStart = sessionStorage.getItem("sellStart");
    var sellEnd = sessionStorage.getItem("sellEnd");
    GetCompanyList("1",sellStart,sellEnd,"0","",QYDLidT);


    $(".fy-").eq(0).html("1").addClass("fy-a").siblings().removeClass("fy-a");
    $(".fy-").eq(1).html("2");
    $(".fy-").eq(2).html("3");
    $(".fy-").eq(3).html("4");

});


// 数据报表数量
$.ajax({
    type:"get",
    url:callurl +"Company/GetCompanyCountList",
    dataType: "json",
    success:function (res06) {
        var typeId = QYDLidT;

        // 获取报表异常
        $.ajax({
            type:"get",
            url:callurl +"Company/GetExceptionReportCount?qYDLId=" + typeId,
            success:function (res07) {
                console.log(res07);
                $(".bbyc").html(res07.reportErrorCount);
                $(".wwc").html(res07.reportUnFinishedCount);
                $("#bbyc").attr("data-id",typeId);
                $("#wwc").attr("data-id",typeId);
            }
        })



        $(document).on("click",".nav",function () {
            if($(this).index()>0){
                console.log($(this).index());
                window.location.href='nav-02.html?QYDLid=' + res06[$(this).index()-1].id
            }
        })





    },
    error:function () {

    }
});
// 点击报表异常方法
$(document).on("click","#bbyc",function () {
   var typeId = $(this).attr("data-id");
    if($(this).hasClass("type-a")){
        $(this).removeClass("type-a");

    }else {
        $(this).addClass("type-a");
        sessionStorage.setItem("typeId",typeId);
        GetbbycList("1",typeId);

        $(".fy-").eq(0).html("1").addClass("fy-a").siblings().removeClass("fy-a");
        $(".fy-").eq(1).html("2");
        $(".fy-").eq(2).html("3");
        $(".fy-").eq(3).html("4");

        $(".fwnxx").addClass("hide")


    }
});
$(document).on("click","#wwc",function () {
    var typeId = $(this).attr("data-id");

    if($(this).hasClass("type-a")){
        $(this).removeClass("type-a");
    }else {
        $(this).addClass("type-a");
        sessionStorage.setItem("typeId",typeId);
        GetwwcbbList("1",typeId);

        $(".fy-").eq(0).html("1").addClass("fy-a").siblings().removeClass("fy-a");
        $(".fy-").eq(1).html("2");
        $(".fy-").eq(2).html("3");
        $(".fy-").eq(3).html("4");

        $(".fwnxx").addClass("hide")

    }
});
// 数据报表异常列表
function GetbbycList(currentPage,typeId) {
    var json = {
        pageSize:"6",
        currentPage:currentPage
    };
    if(typeId){
        json.QYDLId=typeId;
    }

    $.ajax({
        url:callurl + "Company/GetExceptionReport",
        type:"post",
        data:json,
        success:function (res07) {

            $(".fy-02").html(res07.count);
            sessionStorage.setItem("bb","yes01");
            $(".fy-").removeClass("hide");
            $(".fy-f02").removeClass("fy-no")

            $(".span-01").removeClass("span-01a");
            sessionStorage.setItem("sellEnd","");
            sessionStorage.setItem("payEnd","");
            sessionStorage.setItem("payStart","");
            sessionStorage.setItem("sellEnd","");


            console.log(res07);
            var page = res07.count;
            sessionStorage.setItem("page",page);
            var list = res07.list;
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


            if(page == "1"){
                $(".fy-").eq(1).addClass("hide");
                $(".fy-").eq(2).addClass("hide");
                $(".fy-").eq(3).addClass("hide");
                $(".fy-f02").addClass("fy-no")
            }

            if(page =="2"){
                $(".fy-").eq(2).addClass("hide");
                $(".fy-").eq(3).addClass("hide");
            }
            if(page == "3"){
                $(".fy-").eq(3).addClass("hide");
            }









        },
        error:function (xml) {
            console.log(xml);
        }
    });



}

// 报表未完成
function GetwwcbbList(currentPage,typeId) {
    var json = {
        pageSize:"6",
        currentPage:currentPage
    };
    if(typeId){
        json.QYDLId=typeId;
    }

    $.ajax({
        url:callurl + "Company/GetReportUnfinishedCompanyList",
        type:"post",
        data:json,
        success:function (res07) {

            $(".fy-02").html(res07.count);


            $(".fy-").removeClass("hide");
            $(".fy-f02").removeClass("fy-no");
            sessionStorage.setItem("bb","yes02");

            $(".span-01").removeClass("span-01a");
            sessionStorage.setItem("sellEnd","");
            sessionStorage.setItem("payEnd","");
            sessionStorage.setItem("payStart","");
            sessionStorage.setItem("sellEnd","");


            console.log(res07);
            var page = res07.count;
            sessionStorage.setItem("page",page);
            var list = res07.list;
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

            if(page == "1"){
                $(".fy-").eq(1).addClass("hide");
                $(".fy-").eq(2).addClass("hide");
                $(".fy-").eq(3).addClass("hide");
                $(".fy-f02").addClass("fy-no")
            }

            if(page =="2"){
                $(".fy-").eq(2).addClass("hide");
                $(".fy-").eq(3).addClass("hide");
            }
            if(page == "3"){
                $(".fy-").eq(3).addClass("hide");
            }







        },
        error:function (xml) {
            console.log(xml);
        }
    });



}


// 搜索


$(".search_all_fl02_int").keyup(function () {
    var keyword = $(this).val();
    console.log(keyword);
    var jsonk = {
        keyword:keyword,
        top:"16"
    };
    $.ajax({
        url:callurl + "Company/GetCompanyListByKeyword",
        type:"post",
        data:jsonk,
        success:function (res) {
            $(".search_all-down").removeClass("hide");

            $(".search_all-down").html("");
            console.log(res);
            for(var i = 0;i<res.length;i++){
                var html = ' <div class="search_all-down-text" data-listid="'+res[i].id+'"  data-long="'+res[i].xzb+'"  data-lat="'+res[i].yzb+'" >'+res[i].name+'</div>';
                $(".search_all-down").prepend(html);

            }

            setTimeout(function () {
                $('.search_all-down').overlayScrollbars({
                    className : "os-theme-dark",
                    sizeAutoCapable : true,
                    paddingAbsolute : true
                });
            },10)
        },
        error:function (xml) {
            console.log(xml)
        }

    });


    $(".search_all_fl03").addClass("search_all_fl03_add");
    if($(this).val() == ""){
        $(".search_all_fl03").removeClass("search_all_fl03_add");
    }
});

$(document).on("click",".search_all-down-text",function () {
    var kew = $(this).html();
    $(".search_all_fl02_int").val(kew);
    $(".search_all-down").addClass("hide");



    // 清除点
    map.clearOverlays();
    var long = $(this).attr("data-long");
    var lat = $(this).attr("data-lat");
    var id = $(this).attr("data-listid");
    var marker = new BMap.Marker(new BMap.Point(long,lat));
    map.addOverlay(marker);                     // 将标注添加到地图中
    map.centerAndZoom(new BMap.Point(long,lat), 12);
    openwin(id)


    $(".search_all_fl03").attr("data-listid",id);
    $(".search_all_fl03").attr("data-long",long);
    $(".search_all_fl03").attr("data-lat",lat);
});

// $(document).on("click",".search_all_fl03_add",function () {
//
//     map.clearOverlays();
//     var long = $(this).attr("data-long");
//     var lat = $(this).attr("data-lat");
//     var id = $(this).attr("data-listid");
//     var marker = new BMap.Marker(new BMap.Point(long,lat));
//     map.addOverlay(marker);                     // 将标注添加到地图中
//     map.centerAndZoom(new BMap.Point(long,lat), 12);
//     openwin(id)
//
//
// });
