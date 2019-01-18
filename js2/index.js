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
        // data:['蒸发量','降水量','平均温度']
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
            name: '',
            min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '',
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
        GetReportData(res[0].id);
    },
    error:function (xml) {
        console.log(xml)
    }
});

// 浮窗标题
$(document).on("click",".Floating-title-01",function () {
    if($(this).hasClass("Floating-title-01-a")){

    }else {
        $(this).addClass("Floating-title-01-a").siblings().removeClass("Floating-title-01-a")
        var id  = $(this).attr("data-typeId");
        GetReportData(id);
    }
});
// 图表分析01
function GetReportData(id) {
    $.ajax({
        type: "get",
        url: callurl + "/Company/GetReportData/" + id,
        dataType: "json",
        contentType: 'application/json',
        success: function (res02) {
            console.log(res02);
            var seriesList = [];
            var seriesList2 = [];
            var barList = res02.market.hjList;
            var barList02 = res02.market.lshjList;
            var pieList = res02.revenue;
            // console.log(pieList);

            myChart01.setOption({
                xAxis: [
                    {
                        data: res02.market.names
                    }
                ],
                series:[
                    {
                        // name:'销售额',
                        type:'bar',
                        barWidth: '60%',
                        data:barList
                    },
                    {
                        // name:'税额',
                        type:'line',
                        data:barList02
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
            // console.log(seriesList2);

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




