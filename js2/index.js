// 商圈销售总额
var myChart01 = echarts.init(document.getElementById("table02"));
var app = {};
option01 = null;
app.title = '折柱混合';
option01 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
        }
    },
    legend: {
        data:['销售总额','纳税总额']
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '亿元',
            min: 0,
            // interval:200000,
            // max: 250,
            // interval: 50,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '亿元',
            min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: []
};
if (option01 && typeof option01 === "object") {
    myChart01.setOption(option01, true);
}
// 饼图
var myChart02 = echarts.init(document.getElementById("table03"));
var app = {};
option02 = null;
app.title = '环形图';
option02 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        x: 'center',
        top:"-1%"
        // type: 'scroll'
    },
    series: [
        {
            name:'税额占比',
            type:'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        }
    ]
};
if (option02 && typeof option02 === "object") {
    myChart02.setOption(option02, true);
}
// 获取商圈名字
$.ajax({
    type:"get",
    url:callurl +"Company/GetCompanyCountList",
    dataType: "json",
    contentType: 'application/json',
    success:function (res) {
        // console.log(res);
        for(var i = 0;i<res.length;i++ ){
            var classa = "";
            if(i == 0){
                classa = "Floating-title-01-a"
            }
            var html = ' <div class="Floating-title-01 fl '+classa+'" data-typeId="'+res[i].id+'">'+res[i].name+'<br>('+res[i].num+')</div>';
            $(".Floating-title").append(html);
        }
        var csyear = sessionStorage.getItem("csyear");
        GetReportData(res[0].id,csyear);

        sessionStorage.setItem("QYDLid-01",res[0].id);
        sessionStorage.setItem("QYDLid-02",res[1].id);
        sessionStorage.setItem("QYDLid-03",res[2].id);
        sessionStorage.setItem("QYDLid-04",res[3].id);
    },
    error:function (xml) {
        console.log(xml)
    }
});

// 浮窗标题
$(document).on("click",".Floating-title-01",function () {
    if($(this).hasClass("Floating-title-01-a")){

    }else {
        $(this).addClass("Floating-title-01-a").siblings().removeClass("Floating-title-01-a");
        var id  = $(this).attr("data-typeId");
        var csyear = sessionStorage.getItem("csyear");
        $(".area-table-down-fl").html(csyear + "年");
        $(".csyear").html(csyear + "年");
        GetReportData(id,csyear);
    }
});
// 图表分析01
function GetReportData(id,year) {
    var json66={
        id:id
    }
    if(year){
        json66.year = year;
    }

    $.ajax({
        type: "get",
        url: callurl + "Company/GetReportData",
        data:json66,
        dataType: "json",
        contentType: 'application/json',
        success: function (res02) {
            console.log(res02);
            var seriesList = [];
            var seriesList02 = [];
            var seriesList2 = [];
            var barList = res02.market.hjList;
            var barList02 = res02.market.lshjList;
            var pieList = res02.revenue;

            console.log(barList);
            for(var i = 0; i<barList.length;i++){
                var barListn =  barList[i];
                var barListn02 = barListn.split(".")[0];
                seriesList.push(barListn02);
            }
            console.log(seriesList);
            var temp=false;
            for(var i in seriesList){
                if(seriesList[i].length>4){
                    temp=true;
                    break;
                }
            }

            if(temp){
                for(var i in seriesList){
                    seriesList[i]=(seriesList[i]*0.0001).toFixed(2);
                }
            }

            for(var i = 0; i<barList02.length;i++){
                var barList02n =  barList02[i];
                var barList02n02 = barList02n.split(".")[0];
                seriesList02.push(barList02n02);
            }

            for(var i in seriesList02){
                if(seriesList02[i].length>4){
                    temp=true;
                    break;
                }
            }

            if(temp){
                for(var i in seriesList02){
                    seriesList02[i]=(seriesList02[i]*0.0001).toFixed(2);
                }
            }






            myChart01.setOption({
                xAxis: [
                    {
                        data: res02.market.names
                    }
                ],
                series:[
                    {
                        name:'销售总额',
                        type:'bar',
                        barWidth: '60%',
                        data:seriesList
                    },
                    {
                        name:'纳税总额',
                        type:'line',
                        yAxisIndex: 1,
                        data:seriesList02
                    }
                ]
            });


            for(var i=0;i<pieList.length;i++ ){
                var valueL3 = {};
                var value = pieList[i].data;
                var name = pieList[i].name;
                valueL3.value = value;
                valueL3.name = name;
                seriesList2.push(valueL3);
            }
            myChart02.setOption({
                series:[{
                    data:seriesList2,
                }]
            });
        },
        error:function (xml02) {
        }
    })
}
// 图表分析


// 商圈下拉年份
function sqdown(obj) {
    if($(obj).siblings().hasClass("hide")){
        $(obj).siblings().slideDown();
        $(obj).siblings().removeClass("hide");
    }else {
        $(obj).siblings().slideUp();
        $(obj).siblings().addClass("hide");
    }
}

// 年份下拉内容
var QYDLId = $(".Floating-title-01-a").attr("data-typeid");
$.ajax({
    url:callurl + "Company/GetCompanyTypeYears?QYDLId=" + QYDLId,
    type:"get",
    success:function (res) {
        $(".area-table-down-content").html("");

        for(var i = 0;i<res.length;i++){
            var  html = '<div class="area-table-down-content-01" data-year="'+res[i]+'" onclick="sqdownchoose(this)">'+res[i]+'</div>';
            $(".area-table-down-content").append(html);
            $(".csyear").html(res[0] + "年");
            $(".area-table-down-fl").html(res[0] + "年");

            sessionStorage.setItem("csyear",res[0])
        }
    },
    error:function (xml) {
        console.log(xml)
    }

});

// 选择了年份之后
function sqdownchoose(obj) {
    var QYDLId = $(".Floating-title-01-a").attr("data-typeid");

    var nf_vaule02 = $(obj).text();
    $(obj).parent().siblings().find(".area-table-down-fl").html(nf_vaule02  +"年");
     $(obj).parent().slideUp();
     $(obj).parent().addClass("hide");


    GetReportData(QYDLId,nf_vaule02);
   $(".csyear").html(nf_vaule02);



}


$.ajax({
    type:"get",
    url:callurl +"Company/GetCompanyCountList",
    dataType: "json",
    success:function (res06) {
        var typeId = res06[0].id;
        console.log(typeId);


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








