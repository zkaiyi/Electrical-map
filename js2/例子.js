window.onload=function(){
    getMarkerAndSetLevel1();
    initMapLeftList();
    setOnclickListener();
    setOnclickListenerLeftList();
    set_Css();
    initView();
}
$(document).ready(function(){
});
var list_selected_width="";
$(window).resize(function(){
    initView();
})
//区域和地铁的点击效果
$(document).on('click','li.first-li',function(e){
    var parentEle = $(this).parent().parent();
    if($(this).hasClass('active')){
        parentEle.find('li.first-li').removeClass('active');
        parentEle.find('li.second-li').removeClass('active');

        // 判断是否是视网膜屏
        if(window.devicePixelRatio && window.devicePixelRatio > 1){
            parentEle.find('li.first-li img').attr("src",map_drop_down3x);
            parentEle.find('li.second-li img').attr("src",map_drop_down3x);

        }else{
            parentEle.find('li.first-li img').attr("src",map_drop_down);
            parentEle.find('li.second-li img').attr("src",map_drop_down);

        }

        parentEle.find('dl').css({'display':'none'});
    } else {
        parentEle.find('li.first-li').removeClass('active');
        parentEle.find('li.second-li').removeClass('active');
        // 判断是否是视网膜屏
        if(window.devicePixelRatio && window.devicePixelRatio > 1){
            parentEle.find('li.first-li img').attr("src",map_drop_down3x);
            parentEle.find('li.second-li img').attr("src",map_drop_down3x);
            $(this).find('img').attr("src",map_pull_up3x);

        }else{
            parentEle.find('li.first-li img').attr("src",map_drop_down);
            parentEle.find('li.second-li img').attr("src",map_drop_down);
            $(this).find('img').attr("src",map_pull_up);

        }
        $(this).addClass('active');
        parentEle.find('dl').css({'display':'none'});
        $(this).children('dl').css({'display':'block'});
    }
    return false;
});

//租金类型户型特色的点击效果
$(document).on('click','li.second-li .option_bottom',function(){
    var parentEle = $(this).parent().parent().parent();
    if($(this).parent().hasClass('active')){
        parentEle.find('li.first-li').removeClass('active');
        parentEle.find('li.second-li').removeClass('active');
        parentEle.find('li.first-li img').attr("src",map_drop_down);
        parentEle.find('li.second-li img').attr("src",map_drop_down);
        parentEle.find('dl').css({'display':'none'});
    } else {
        parentEle.find('li.first-li').removeClass('active');
        parentEle.find('li.first-li img').attr("src",map_drop_down);
        parentEle.find('li.second-li').removeClass('active');
        parentEle.find('li.second-li img').attr("src",map_drop_down);
        $(this).parent().addClass('active');
        $(this).parent().find('img').attr("src",map_pull_up);
        parentEle.find('dl').css({'display':'none'});
        $(this).parent().children('dl').css({'display':'block'});
        if($(this).parent().attr('data-re') == 6){
            var left=$(this).parent().position().left+'px';
            var top=$(this).parent().offset.top+'px';
            $('#search_filter_tese').css({'position':'fixed','left':left,'top':top,'width':'150px','display':'block'});
        }
    }
    return false;
});
//租金类型户型特色的点击效果
$(document).on('click','.down-list',function(){
    return false;
});
//点击空白地方选项收起来
$('.search_line_bg').click(function(){
})
function hidenInlineDiv(obj){
    $(obj).find("div:first").css('display','none');
    $('#map-list').css({'overflow-x':' hidden','overflow-y':'auto'});
    return false;
}
//鼠标悬浮在区域上面 触发子元素的显示和位置的判断
function showInlineDiv(obj){
    var length=$(obj).find('li').length;
    var left = $(obj).position().left;
    var boxleft = -left+180;
    var height;
    var width;
    if(length<=18){
        width=155;
    }else if(19<=length && length<35){
        width=320;
    }else if(length>=35){
        width=490;
    }
    if(length<=16){
        height=472;
    }else if(19<=length && length<=35){
        height=505;
    }else if(length>35){
        height=505;
    }
    $(obj).find("div:first").css('display','block');
    var boxObj = $(obj).find(".down-list:first");
    boxObj.css('left', boxleft + 'px');
    var map_list_tab_top=$('.map-list-tab_top').offset().top+50+'px';
    boxObj.css({"position":'fixed','height':height+'px','width':width+'px','top':map_list_tab_top});
    //$('#map-list').css('overflow','visible');
    return false;

}
//鼠标悬浮在地铁上面 触发子元素的显示和位置的判断
function showInlineDiv_ditie(obj){
    var length=$(obj).find('li').length;
    var left = $(obj).position().left;
    var boxleft = -left+380;
    var height=430;
    if(length<15){
        var width=160;
    }else if(15<length && length<29){
        var width=330;
    }else{
        var width=480;
    }
    $(obj).find("div:first").css('display','block');

    var boxObj = $(obj).find(".down-list");
    boxObj.css('left', boxleft + 'px');
    var map_list_tab_top=$('.map-list-tab_top').offset().top+50+'px';
    boxObj.css({"position":'fixed','height':height+'px','width':width+'px','top':map_list_tab_top});
    //$('#map-list').css('overflow','visible');
    return false;
}
function stopEvent(event){
    var e=arguments.callee.caller.arguments[0] || event;//这里是因为除了IE有event其他浏览器没有所以要做兼容
    if(window.event){       //这是IE浏览器
        e.cancelBubble=true;//阻止冒泡事件
        e.returnValue=false;//阻止默认事件
    }else if(e && e.stopPropagation){     //这是其他浏览器
        e.stopPropagation();//阻止冒泡事件
        e.preventDefault();//阻止默认事件
    }
}
function initView(){
    $('#map-container2').css('position','absolute');
    $('#map-container2').width($(window).width());
    $('#map-container2').height($(window).height()-$('#map-container2').offset().top);
}
function initMapLeftList(){
    show_loading_div();
    var href = document.location.href;
    var searchparam = href.substring(href.indexOf('map')+4);
    var href = document.location.href;
    var searchparam = href.substring(href.indexOf('map')+4);
    $.ajax({ url:'/ajax/mapLeftList?searchparam='+searchparam+'&tab='+0,dataType:'html',async:true, success: function(result){
            $('#map-list').html('');
            $('#map-list').html(result);
            $('#map-list').css({'overflow-x':' hidden','overflow-y':'auto'});
            hide_loading_div();
        }});
}
function setOnclickListener(){
    $(document).on('click','#map-container-hireway-tab label', function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
        var tagArr = $('#map-container-hireway-tab label.active');
        var paramsArr = [];
        for (var i = 0; i < tagArr.length; i++) {
            paramsArr.push(tagArr[i].dataset.search.replace('c', ''))
        }
        var paramsStr = 'c' + paramsArr.join(',');
        var searchparam = sessionStorage.getItem('searchparam');
        var searchp='';
        var reg=/c([1-9]|,)+/;
        if(searchparam=='' || searchparam==null){
            searchp='/map/'+paramsStr;
        }else if(!reg.test(searchparam)){
            searchp='/map/'+paramsStr+searchparam.slice(5);
        }else if(reg.test(searchparam)){
            if(paramsStr=='c'){
                paramsStr='';
            }
            searchp=searchparam.replace(/c([1-9]|,)+/, paramsStr);
        }
        sessionStorage.setItem('searchparam', searchp);
        if(searchp != '' && searchp != undefined){
            ajaxGetMapLeftList(searchp);
            SearchConditionObj.doSearch();
        }
    });
}
/*获取左边栏列表数据*/
function ajaxGetMapLeftList(searchparam,xname){
    show_loading_div();
    var tab =  getActiveSearchTabId();
    if(xname == undefined){
        xname = SearchConditionObj.getXname();
    }
    $.ajax({ url:'/ajax/mapLeftList?searchparam='+searchparam+'&tab='+tab+'&xname='+xname,dataType:'html',async:false, success: function(result){
            GLOBAL_P.house_list_P = 1;
            $('#map-list').html('');
            $('#map-list').html(result);
            $('#map-list').css({'overflow-x':' hidden','overflow-y':'auto'});
            setOnclickListenerLeftList();
            hide_loading_div();
        }});
}
function getActiveSearchTabId(){
    var nowTab = $('li.first-li.active').attr('data-re');
    var nowTab1 = $('li.second-li.active').attr('data-re');

    if(nowTab != undefined) {
        return nowTab;
    }
    if(nowTab1 != undefined){
        return nowTab1;
    }
    return 1;
}
var mapObj = new AMap.Map('map-container2',{
    zoom: (GLOBAL_P.l1_ZOOM),
    center:GLOBAL_P.getMapCenter()
});

//过滤条件（区域 地铁）
$(document).on('click','.first-li dd ul li a', function(){
    getList_selected_width();
    var searchparam= $(this).attr('data-search');
    var level = $(this).attr('level');
    if(searchparam == undefined || searchparam == ''){
        return false;
    }

    ajaxGetMapLeftList(searchparam);

    /*区域 start*/
    if(level!=undefined){//点击了区域按钮
        if (level==0) {
            mapObj.setZoom(GLOBAL_P.l1_TO_l2_ZOOM-1);
        } else {
            var lat = $(this).attr('lat');
            var lon = $(this).attr('lon');
            mapObj.panTo(new AMap.LngLat(lon,lat));
            mapObj.setZoom(level==1?GLOBAL_P.l1_TO_l2_ZOOM+1:GLOBAL_P.l2_TO_l3_ZOOM);
        }

        return false;
    }
    /*区域 end*/

    /*地铁 start*/
    var lineName = $(this).attr('lineName');

    var line=$(this).attr('line');
    if (lineName!=undefined) {
        var lat = $(this).attr('lat');
        var lon = $(this).attr('lon');
        alreadyDrawLineSearchPos = 0;

        if(lat!=undefined && lon !=undefined){
            var lat = $(this).attr('lat');
            var lon = $(this).attr('lon');
            mapObj.panTo(new AMap.LngLat(lon,lat));
            mapObj.setZoom(GLOBAL_P.l2_TO_l3_ZOOM);
            alreadyDrawLineSearchPos = 1;
        }

        lineSearch(lineName,line);

        if(GLOBAL_P.city_id=='1' && lineName=='2号线'){
            lineSearch('2号线东延线',5000);
        }

        SearchConditionObj.doSearchNoJudge();

        if (lat!=undefined && lon !=undefined) {
            markCircle(lat,lon);
        }

        return false;
    }
    /*地铁 end*/

    SearchConditionObj.doSearch();
    return false;
});

//过滤条件（租金 租房类型 户型 特色）
$(document).on('click','.second-li dd ul li a', function(){
    var searchparam = $(this).attr('data-search');
    $("#map-container-hireway-tab label").removeClass('active');
    selectedRight(searchparam);
    if(searchparam != '' && searchparam != undefined){
        ajaxGetMapLeftList(searchparam);
        SearchConditionObj.doSearch();
        sessionStorage.setItem('searchparam', searchparam);
    }
    return false;
});
//解析获取的参数然后对右上角的姗选框生效
function selectedRight(searchparam){
    var reg=/c([1-9]|,)+/;
    var num=searchparam.match(reg);
    if(num==null){
        $('#map-container-hireway-tab').children().removeClass('active')
    }else{
        var numSelect=searchparam.match(reg)[0];
        var arr=(numSelect.replace('c', '')).split(',');
        for (var i = 0; i < arr.length; i++) {
            $("#map-container-hireway-tab label:eq("+(arr[i]-1)+")").addClass('active')
        }
    }

};
//搜索按钮
$(document).on('click','#btn-searchmap',function(){
    var formObj = document.forms['form_searchdata'];
    var nowFormObj = document.forms['form_search'];
    var prefixUrl = formObj['prefixUrl'].value;
    var kw = nowFormObj['kw'].value;
    $("#map-container-hireway-tab label").removeClass('active')
    if(kw != '' && kw != undefined){
        var uri = prefixUrl + 'kw' + kw;
    }else{
        var uri = prefixUrl ;
    }
    sessionStorage.setItem('searchparam', uri);
    ajaxGetMapLeftList(uri);
    var formObj = document.forms['form_searchdata'];
    var searchResultFirstHouseLatlon = formObj['searchResultFirstHouseLatlon'].value;
    if(searchResultFirstHouseLatlon!=''){
        var latlonArr = searchResultFirstHouseLatlon.split(',');
        mapObj.panTo(new AMap.LngLat(latlonArr[1],latlonArr[0]));
        mapObj.setZoom(GLOBAL_P.l2_TO_l3_ZOOM);
    }

    return false;
});

//你已选择
$(document).on('click','.list-selected li a',function(){
    var searchparam = $(this).attr('data-search');
    $("#map-container-hireway-tab label").removeClass('active')
    selectedRight(searchparam);
    if(searchparam != undefined || searchparam != '') {
        ajaxGetMapLeftList(searchparam);
        SearchConditionObj.doSearch();
        sessionStorage.setItem('searchparam', searchparam);
    }
    return false;
});
//排序按钮
$(document).on('click','#map_clearfix li a', function(){
    var searchparam = $(this).attr('data-search');

    if(searchparam != undefined || searchparam != '') {
        ajaxGetMapLeftList(searchparam);
    }

    return false;
});
function setOnclickListenerLeftList(){
    $('#map-list').scroll(function(){
        var $this =$(this),
            viewH =$(this).height(),              //可见高度
            contentH =$(this).get(0).scrollHeight,//内容高度
            scrollTop = $(this).scrollTop();       //滚动高度
        if(scrollTop/(contentH -viewH)>=0.96){    //到达底部100px时,加载新内容
            houseListScrollBottom();
        }
        if(scrollTop > 80 && scrollTop <140){
            try{
                $('li.first-li').removeClass('active');
                $('li.second-li').removeClass('active');
                $('li.first-li img').attr("src",map_drop_down);
                $('li.second-li img').attr("src",map_drop_down);
                $('li.first-li').find('dl').css({'display':'none'});
                $('li.second-li').find('dl').css({'display':'none'});
            }catch(err){

            }
        }
    });
}

function searchMonthRentRandom(){
    var formObj = document.forms['form_monthrent'];
    var prefixUrl = formObj['prefixUrl'].value;
    var rent_begin = formObj['rent_start'].value;
    var rent_end = formObj['rent_end'].value;

    if(rent_begin != '' || rent_end != ''){
        if(rent_begin == ''){
            rent_begin = 0;
        }
        if(rent_end == ''){
            rent_end = 50000;
        }
        var pos = prefixUrl.lastIndexOf('kw');

        if(pos< 0){
            var uri = prefixUrl + 'z'+rent_begin + ','+ rent_end ;
        }else{
            var pre = prefixUrl.substr(0,pos);
            var last = prefixUrl.substr(pos,prefixUrl.length);
            var uri = pre + 'z'+rent_begin+','+ rent_end + last;
        }

    }else{
        var uri = prefixUrl;
    }
    ajaxGetMapLeftList(uri);
    SearchConditionObj.doSearch();
    return false;
}
var SearchConditionObj = {
    kw : '',//关键字
    quyu : '',//区域
    d : '',//地铁
    m : '',//租金
    c : '',//租房类型
    h : '',//户型
    t : '',//特色
    s : 0,//排序
    hireWayTab:0,
    parseParam:function(param_str){
    },
    getXname:function(){
        var formObj = document.forms['form_searchdata'];
        return formObj['xname'].value;
    },
    getConditions:function(){
        var formObj = document.forms['form_searchdata'];
        return formObj['fullPrefixUrl'].value;
    },
    getRecommd:function(){
        var formObj = document.forms['form_searchdata'];
        return formObj['isrec'].value;
    },
    getConditionsNoX:function(){
        var formObj = document.forms['form_searchdata'];
        var prefixUrlNoX = formObj['prefixUrlNoX'].value;
        if(prefixUrlNoX.indexOf('/map')>=0){
            prefixUrlNoX = prefixUrlNoX.substring(prefixUrlNoX.indexOf('/map')+5);
            /*   var last = prefixUrlNoX.substring(prefixUrlNoX.length-1);
               if(last == '/'){
                   prefixUrlNoX = prefixUrlNoX.substring(0,prefixUrlNoX.length-1);
               }*/
        }
        return prefixUrlNoX;
    },
    doSearch:function(){
        var cur_zoom = mapObj.getZoom();
        var level =zoom_level(cur_zoom);

        if (level==1) {
            return;
        }
        mapObj.clearMap();
        cur_level_2_marker = [];
        cur_level_3_marker = [];
        if (level == 1) {
            getMarkerAndSetLevel1();
        } else if (level == 2) {
            getMarkerAndSetLevel2(true);
        }else if(level == 3){
            getMarkerAndSetLevel3(true);
        }
    },

    doSearchNoJudge:function(){
        var cur_zoom = mapObj.getZoom();
        var level =zoom_level(cur_zoom);
        mapObj.clearMap();
        cur_level_2_marker = [];
        cur_level_3_marker = [];

        if(level == 1){
            getMarkerAndSetLevel1();
        }else if(level == 2){
            getMarkerAndSetLevel2(true);
        }else if(level == 3){
            getMarkerAndSetLevel3(true);
        }
    }
};

function set_Css(){
    $('.isolation_line').css({'width':1+'px','height':15+'px','float':'left','background':'#ededed','line-height':15+'px',"margin-top":10+'px'})
    $('.isolation_line1').css({'width':1+'px','height':15+'px','float':'left','background':'#ededed','line-height':15+'px',"margin-top":19+'px'})
}

function getList_selected_width(){
    var list_selected_width=$(window).width()-400;
    $('#list-selected').css({'position': 'absolute','left':400+'px','top':0+'px','z-index': '1000','width':list_selected_width+'px'});
}
function is_level_change(new_zoom){
    return zoom_level(new_zoom) != zoom_level(GLOBAL_P.old_zoom);
}

function zoom_level(zoom){
    return zoom<GLOBAL_P.l1_TO_l2_ZOOM?1:(zoom<GLOBAL_P.l2_TO_l3_ZOOM?2:3);
}

/*显示加载图*/
function show_loading_div(){
    $('#spinner').show();
}

/*隐藏加载图*/
function hide_loading_div(){
    $('#spinner').hide();
}
/*点击 一级 或 二级 marker时放大zoom*/
function marker_click(lon,lat,level){
    clearRegionBorder();//清除地图轮廓线式样。
    mapObj.panTo(new AMap.LngLat(lon, lat));
    var zoom = level==1?GLOBAL_P.l1_TO_l2_ZOOM:GLOBAL_P.l2_TO_l3_ZOOM;
    mapObj.setZoom(zoom);
}
/*点击小区的marker时*/
function choose_subdistrict(el,subdistrict_id,lon,lat,amount,name){
    //$('.room-numble-c2').addClass('active');
    //$('.room-numble-c2').removeClass('room-numble-c2');
    //$('.icon-bot-c2').addClass('icon-bot-c3');
    //$('.icon-bot-c2').removeClass('icon-bot-c2');
    // $(el).children(0).removeClass('room-numble-c1');
    // $(el).children(0).removeClass('room-numble-c3');
    $(el).children(0).addClass('room-numble-g');
    // $(el).children(0).children(0).children(0).removeClass('icon-bot-c1');
    // $(el).children(0).children(0).children(0).removeClass('icon-bot-c3');
    // $(el).children(0).children(0).children(0).addClass('icon-bot-c2');
    cur_click_marker_id = subdistrict_id;
    clickL3Marker(subdistrict_id,name);
}

function generate_one_house_item_div(house){
    var labels = '';
    for(var i in house.labels){
        labels += '<span>'+house.labels[i]+'</span>';
    }
    return '<li>' +
        '       <a href="'+(house.link)+'">' +
        '        <div class="pro-pic pro-img"><img src="'+house.main_pic+'" /></div>' +
        '        <div class="list-pic-title">' +
        '            <h3 class="list_pic_title_name">'+house.title+'</h3>' +
        '        </div>' +
        '        <div class="list-pic-title list-pic-title_marginL">' +
        '            <h3 class="price list_pic_title_price"><em>￥</em>'+house.month_rent+'</h3>' +
        '        </div>' +
        '        <div class="list-pic-title">' +
        '            <h5 class="list-pic-ps list-pic-ps-h51">'+house.area_data+'</h5>' +
        '        </div>' +
        '        <div class="list-pic-title">' +
        '            <h5 class="list-pic-ps list-pic-ps-h52">'+house.desc+'</h5>' +
        '        </div>' +
        '        </a>' +
        ' </li>';
}

/*根据小区id获取数据填充 house_div*/
function appendHouseDiv(condition,P){
    var isrec = SearchConditionObj.getRecommd();
    if(isrec == undefined || isrec == ''){
        var url = '/Ajax/getSubHouseList?searchparam='+condition+'&p='+P;
    }else{
        var url = '/Ajax/getSubHouseList?searchparam='+condition+'&p='+P+'&isrec='+isrec;
    }

    //条件下没有房源
    if(GLOBAL_P.NO_RESULT_Condition_P[condition] != undefined && GLOBAL_P.house_list_P>=GLOBAL_P.NO_RESULT_Condition_P[condition]){
        return;
    }
    show_loading_div();
    GLOBAL_P.append_house_div_requesting = 1;
    $.getJSON(url, function (result){
        var house_item_divs_html = '';

        if (GLOBAL_P.house_list_P==1) {
            $('#house_container').html('');
        }

        for(var i in result){
            house_item_divs_html += generate_one_house_item_div(result[i]);
        }

        $('#house_container').append(house_item_divs_html);
        hide_loading_div();
        GLOBAL_P.append_house_div_requesting=0;

        if (result.length==0) {
            GLOBAL_P.NO_RESULT_Condition_P[condition] = GLOBAL_P.house_list_P;
        }
    });
}
//点击了三级小区的marker
function clickL3Marker(id,name){
    GLOBAL_P.house_list_P = 1;
    GLOBAL_P.cur_subdistrict_id = id;
    var condition = SearchConditionObj.getConditionsNoX();
    condition = 'x'+id + condition;
    ajaxGetMapLeftList(condition,name);
}
//左侧房源列表滚动到最底
var houseListScrollBottomRequesting = 0;
function houseListScrollBottom(){
    if(GLOBAL_P.append_house_div_requesting){
        return;
    }

    GLOBAL_P.house_list_P+=1;
    var condition = SearchConditionObj.getConditions();
    appendHouseDiv(condition,GLOBAL_P.house_list_P);
}


function append_house_div(subdistrict_id,fresh){
    if(GLOBAL_P.append_house_div_requesting){
        return true;
    }

    if (fresh) {
        GLOBAL_P.house_list_P = 1;
        GLOBAL_P.cur_subdistrict_id = subdistrict_id;
    } else {
        subdistrict_id = GLOBAL_P.cur_subdistrict_id;
    }
    var freshLeftList = 0;

    if (subdistrict_id==0) {
        if(GLOBAL_P.house_list_P==1){
            GLOBAL_P.house_list_P=2;
        }
        var condition = SearchConditionObj.getConditions();
    } else {
        freshLeftList = 1;
        var condition = 'x'+subdistrict_id;
    }

    var isrec = SearchConditionObj.getRecommd();

    if(isrec == undefined || isrec == ''){
        var url = '/Ajax/getSubHouseList?searchparam='+condition+'&p='+GLOBAL_P.house_list_P;
    }else{
        var url = '/Ajax/getSubHouseList?searchparam='+condition+'&p='+GLOBAL_P.house_list_P+'&isrec='+isrec;
    }

    if(GLOBAL_P.NO_RESULT_Condition_P[condition] != undefined && GLOBAL_P.house_list_P>=GLOBAL_P.NO_RESULT_Condition_P[condition]){
        return;
    }

    show_loading_div();
    GLOBAL_P.append_house_div_requesting = 1;

    if(freshLeftList){
        ajaxGetMapLeftList();
    }

    $.getJSON(url, function (result){
        var house_item_divs_html = '';

        if(GLOBAL_P.house_list_P==1){
            $('#house_container').html('');
        }

        for(var i in result){
            house_item_divs_html += generate_one_house_item_div(result[i]);
        }

        $('#house_container').append(house_item_divs_html);
        GLOBAL_P.house_list_P+=1;
        show_house_div();
        hide_loading_div();
        GLOBAL_P.append_house_div_requesting=0;

        if(result.length==0){
            GLOBAL_P.NO_RESULT_Condition_P[condition] = GLOBAL_P.house_list_P;
        }
    });
}
function showRegionBorder(thiss,levei){
    $(thiss).css('background','red');
    if(levei == 1){
        var name = $(thiss).find('.marker_content_l1').text();
        showDistrictBound(name,2);
    }
}
function hideRegionBorder(thiss,levei){
    $(thiss).css('background','#09a2cc');
    clearRegionBorder();
}
/*大区域*/
function getMarkerAndSetLevel1(){
    show_loading_div();
    $.each(GLOBAL_P.dd_area_obj,function(k,v){
        var amount = v.amount;
        cur_map_marker.push(new AMap.Marker({
            map: mapObj,
            icon:"http://api.amap.com/webapi/static/Images/0.png",
            content:'<div onclick="marker_click('+v.lon+','+v.lat+',1)" class="marker_circle_l1" onmouseover="javascript:showRegionBorder(this,1)" onmouseout="javascript:hideRegionBorder(this,1)" data-re="1"><div class="top">'+v.amount+'套</div><div class="marker_content_l1">'+v.name+'</div></div>',
            position: new AMap.LngLat(v.lon, v.lat),
            offset: new AMap.Pixel(-10, -35)
        }));
    });
    hide_loading_div();
    return true;
}

/*二级区域*/
function getMarkerAndSetLevel2(noX){
    show_loading_div();
    var cur_bounds = mapObj.getBounds();
    var southwest = cur_bounds.southwest.lat+','+cur_bounds.southwest.lng;
    var northeast = cur_bounds.northeast.lat+','+cur_bounds.northeast.lng;
    var conditions = SearchConditionObj.getConditions();
    var xname = SearchConditionObj.getXname();
    if(noX!=undefined){
        conditions = SearchConditionObj.getConditionsNoX();
    }
    if (xname!='') {
        conditions += '&xname='+name;
    }
    var uri = '/ajax/getMapData?level=2&southwest='+southwest+'&northeast='+northeast+'&searchparam='+conditions; /*lat,lon格式*/
    $.getJSON(uri, function (data){
        if(data.level != zoom_level(GLOBAL_P.old_zoom)){
            return true;
        }

        var marker_info_arr = data.marker_list;

        for (var i = 0; i < marker_info_arr.length; i++) {
            var v = marker_info_arr[i];
            if(!v.lon){continue;}
            if(!v.lat) {continue;}
            if(!v.name) {continue;}
            var amount = v.amount;

            if(cur_level_2_marker[v.id] == undefined){
                cur_level_2_marker[v.id] = 1;
                cur_map_marker.push(new AMap.Marker({
                    map: mapObj,
                    icon:"http://api.amap.com/webapi/static/Images/0.png",
                    content:'<div onclick="marker_click('+v.lon+','+v.lat+',2)" class="marker_circle_l2" onmouseover="javascript:showRegionBorder(this,2)" onmouseout="javascript:hideRegionBorder(this,2)" data-re="2"><div class="top">'+amount+'套</div><div class="marker_content_l2">'+v.name+'</div></div>',
                    position: new AMap.LngLat(v.lon, v.lat),
                    offset: new AMap.Pixel(-10, -35)
                }));
            }
        }
        hide_loading_div();
    });
    return true;
}

function getMarkerAndSetLevel3(noX){
    show_loading_div();
    var cur_bounds = mapObj.getBounds();
    var southwest = cur_bounds.southwest.lat+','+cur_bounds.southwest.lng;
    var northeast = cur_bounds.northeast.lat+','+cur_bounds.northeast.lng;
    var conditions = SearchConditionObj.getConditions();
    var xname = SearchConditionObj.getXname();

    if(noX!=undefined){
        conditions = SearchConditionObj.getConditionsNoX();
    }

    if(xname!=''){
        conditions  += '&xname='+name;
    }

    var uri = '/ajax/getMapData?level=3&southwest='+southwest+'&northeast='+northeast+'&searchparam='+conditions;/*lat,lon格式*/
    var subdistrict_ids = '';

    $.getJSON(uri, function (data){
        if(data.level != zoom_level(GLOBAL_P.old_zoom)){return;}
        var marker_info_arr = data.marker_list;

        for (var i = 0; i < marker_info_arr.length; i++) {
            var v = marker_info_arr[i];
            if(!v.lon) continue;
            if(!v.lat) continue;
            if(!v.name) continue;
            var amount = v.amount;

            if(SearchConditionObj.hireWayTab){
                if(SearchConditionObj.hireWayTab==1){
                    if(v.zhengzu==0) continue;
                    amount =v.zhengzu;
                }else if(SearchConditionObj.hireWayTab==2){
                    if(v.hezu==0) continue;
                    amount =v.hezu;
                }else if(SearchConditionObj.hireWayTab==3){
                    if(v.department==0) continue;
                    amount =v.department;
                }
            }

            subdistrict_ids+= v.id+',';

            if(cur_level_3_marker[v.id] == undefined){
                cur_level_3_marker[v.id] = 1;
                var highlight_flag = v.highlight_flag=='1'?'style="background: red;"':'';
                var nam_num_count = getNumCount(v.name);
                var div_width = 13*(v.name.length-nam_num_count) + 8*((amount+'').length+nam_num_count) + 45;

                if(v.name.indexOf('魔方公寓') != -1) {
                    //存在魔方公寓的时候
                    cur_map_marker.push(new AMap.Marker({ //小区中心点位置
                        map: mapObj,
                        icon:"http://api.amap.com/webapi/static/Images/0.png",
                        content:'<div class="pos-landmark" onclick="choose_subdistrict(this,'+ v.id+','+ v.lon+','+ v.lat+','+ amount+',\''+v.name+'\')"'+' style="font-size: 0.9em;width:'+div_width+'px">' +
                        '<div class="room-numble_gy">' +
                        // +amount+'间' +
                        '<span class="gy_bg">'+amount+'间'+'</span>'+
                        '<div class="pos-r">' +
                        '<i class="icon_gy icon-bot-c1_gy"></i>' +
                        '</div>' +
                        '<div class="pos-r">' +
                        '<span class="sub-name_gy">'+ '魔方公寓' +'</sapn>' +
                        '</div>' +
                        '</div>',
                        position: new AMap.LngLat(v.lon, v.lat),
                        offset: new AMap.Pixel(-20, -46)
                    }));
                } else {
                    //不存在魔方公寓的时候
                    cur_map_marker.push(new AMap.Marker({ //小区中心点位置
                        map: mapObj,
                        icon:"http://api.amap.com/webapi/static/Images/0.png",
                        content:'<div class="pos-landmark" onclick="choose_subdistrict(this,'+ v.id+','+ v.lon+','+ v.lat+','+ amount+',\''+v.name+'\')"'+' style="font-size: 0.9em;width:'+div_width+'px">' +
                        '<div class="room-numble">' +
                        +amount+'间' +
                        '<div class="pos-r">' +
                        '<i class="icon icon-bot-c1"></i>' +
                        '</div>' +
                        '<div class="pos-r">' +
                        '<span class="sub-name">'+ v.name +'</sapn>' +
                        '</div>' +
                        '</div>',
                        position: new AMap.LngLat(v.lon, v.lat),
                        offset: new AMap.Pixel(-20, -46)
                    }));

                }
            }
        }

        hide_loading_div();
    });
}

function showDistrictBound (name,levei) {
    if(levei == 2){
        if(name == "浦东"){
            name = "浦东新区";
        } else{
            name = name+"区";
        }
    }
    //加载行政区划插件
    AMap.service('AMap.DistrictSearch', function() {
        var me = this;
        var opts = {
            subdistrict: 1,         //返回下一级行政区
            extensions: 'all',      //返回行政区边界坐标组等具体信息
            level: 'biz_area'       //查询行政级别为 市
        };
        district = new AMap.DistrictSearch(opts);  //实例化DistrictSearch
        district.setLevel('district');
        district.search(name, function(status, result) {  //行政区查询
            if( status == 'complete'){
                var bounds = result.districtList[0].boundaries;
                var polygons = [];
                if (bounds) {
                    clearRegionBorder();
                    for (var i = 0, l = bounds.length; i < l; i++) {
                        //生成行政区划polygon
                        var polygon = new AMap.Polygon({
                            map: mapObj,
                            strokeWeight: 2,
                            path: bounds[i],
                            fillOpacity: 0,
                            strokeColor: '#ff0000'
                        });
                        polygons.push(polygon);
                    }
                    cur_map_polygon = polygons;
                }
            }
        });
    });
}

function getNumCount(str){
    var arr = str.match(/\d+/g);
    var length = 0;
    for(var i in arr){
        length += arr[i].length;
    }
    return length;
}

/*zoom变化时*/
AMap.event.addListener(mapObj,'zoomend',function(){
    var cur_zoom = mapObj.getZoom();
    if(cur_zoom<GLOBAL_P.l1_TO_l2_ZOOM){  /*一级 区*/
        if(is_level_change(cur_zoom)){
            /*清数据*/
            /*mapObj.clearMap();
             cur_level_2_marker = [];
             cur_level_3_marker = [];*/
            clearMap(0);
            $('#map-container-hireway-tab').hide();
            getMarkerAndSetLevel1();
        }
    } else if(cur_zoom<GLOBAL_P.l2_TO_l3_ZOOM){ //二级 商圈 二级 清数据
        if(is_level_change(cur_zoom)){
            /*mapObj.clearMap();
             cur_level_2_marker = [];
             cur_level_3_marker = [];*/
            clearMap(0);
            $('#map-container-hireway-tab').hide();
        }
        getMarkerAndSetLevel2(true);
    } else {/*清数据 三级-zoom变化时*//*三级 小区*/
        if(is_level_change(cur_zoom)){
            /*mapObj.clearMap();
             cur_level_2_marker = [];
             cur_level_3_marker = [];*/
            clearMap(0);
            $('#map-container-hireway-tab').show();
        }
        getMarkerAndSetLevel3(true);
    }
    GLOBAL_P.old_zoom = cur_zoom;
});

/*平移时  13 14  level2; 15 16 17 18 level3 */
AMap.event.addListener(mapObj,'moveend',function(){
    var cur_zoom = mapObj.getZoom();
    if(cur_zoom < GLOBAL_P.l1_TO_l2_ZOOM){ /*一级 区*/
        /*mapObj.clearMap();
        getMarkerAndSet(1);*/
    } else if(cur_zoom < GLOBAL_P.l2_TO_l3_ZOOM) {  /*二级 商圈*//*清数据*/
        if(is_level_change(cur_zoom)){
            mapObj.clearMap();
            cur_level_2_marker = [];
            cur_level_3_marker = [];
        }
        getMarkerAndSetLevel2(true);
    } else {/*三级 小区*/   /*清数据 三级-平移时*/
        if(is_level_change(cur_zoom)){
            mapObj.clearMap();
            cur_level_2_marker = [];
            cur_level_3_marker = [];
        }
        getMarkerAndSetLevel3(true);
    }

    GLOBAL_P.old_zoom = cur_zoom;
});

/*公交线路查询*/
var alreadyDrawLineSearchPos = 0;
function lineSearch(line,lined) {
    //实例化公交线路查询类，只取回一条路线
    var linesearch = new AMap.LineSearch({
        pageIndex: 1,
        city:GLOBAL_P.getCityNum(),
        pageSize: 4,
        extensions: 'all'
    });
    linesearch.search(line, function(status, result) { //搜索相关公交线路
        if (status === 'complete' && result.info === 'OK') {
            var mapData = 'city='+GLOBAL_P.city_id+'&data='+JSON.stringify(result)+'&line='+lined;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/ajax/dealMapData');
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=UTF-8');
            xhr.send(mapData);
            xhr.onreadystatechange = function(){
                var DONE = 4;
                var OK = 200;
                if(xhr.readyState === DONE){
                    if(xhr.status === OK){
                        var res = JSON.parse(xhr.responseText);
                        if(res.code==1){
                            lineSearch_Callback(res.result);
                        }
                    }
                }
            }
        } else {
            //alert(result);
        }
    });
}
var lon_pos_subway = 0;
var lat_pos_subway = 0;
function choose_subway(ei){
    var lon = $(ei).attr('lng');
    var lat = $(ei).attr('lat');
    var isdraft = $(ei).attr('isdraft');
    if(lon_pos_subway == lon && lat_pos_subway == lat){
        if(subway_maker_arr.length > 0){
            mapObj.remove(subway_maker_arr);
            lon_pos_subway = 0;
            lat_pos_subway = 0;
        }
    }else{
        if(lon !=undefined && lon !='' && lat !=undefined && lat !=''){
            markCircle(lat,lon);
            marker_click(lon,lat,3);
            lon_pos_subway = lon;
            lat_pos_subway = lat;
            GLOBAL_P.old_zoom = mapObj.getZoom();
        }
    }
}
/*公交路线查询服务返回数据解析概况*/
function lineSearch_Callback(data) {
    var lineArr = data.lineInfo;
    var lineNum = data.lineInfo.length;
    if (lineNum == 0) {
    } else {
        for (var i = 0; i < lineNum; i++) {
            var pathArr = lineArr[i].path;
            var stops = lineArr[i].via_stops;
            for(var j =0;j<stops.length;j++){
                var pos = stops[j];
                var width = (pos.name.length*18) +'px';
                new AMap.Marker({
                    map: mapObj,
                    offset: new AMap.Pixel(0-(((pos.name.length*18)+24)/2), -52),
                    position: [pos.location.lng, pos.location.lat], //基点位置
//                  icon: "http://webapi.amap.com/theme/v1.3/markers/n/start.png",
                    content:'<div class="subway_pos" onclick="choose_subway(this)" isdraft="0" lng="'+pos.location.lng+'" lat="'+pos.location.lat+'" style="width: '+width+'">'+pos.name+'<div style="margin-top: 6px;" class="pos-r"><i class="icon icon-bot-cSubway"></i></div></div>',
                    zIndex: 10
                });
            }
            var startPot = stops[0].location;
            var endPot = stops[stops.length - 1].location;
            if (i == 0){
                drawbusLine(startPot, endPot, pathArr);
            }
            if(alreadyDrawLineSearchPos == 0){
                mapObj.panTo(new AMap.LngLat(startPot.lng,startPot.lat));
            }
        }
    }
}
//绘制乘车的路线
function drawbusLine(startPot, endPot, BusArr) {
    busPolyline = new AMap.Polyline({
        map: mapObj,
        path: BusArr,
        strokeColor: "#ff6b20",//线颜色
        strokeOpacity: 0.8,//线透明度
        strokeWeight: 6//线宽
    });
}
var subway_maker_arr = [];
/*画圆*/
function markCircle(lat,lon){
    if(subway_maker_arr.length>0){
        mapObj.remove(subway_maker_arr);
    }
    subway_maker_arr.push(new AMap.Circle({
        map: mapObj,
        center:new AMap.LngLat(lon,lat),
        radius:1000,
        strokeColor: "#1996d7",
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: "#1fb1ff",
        fillOpacity: 0.25}));
}
/*清空边界*/
function clearRegionBorder(){
    if(cur_map_polygon.length > 0){
        var data = mapObj.remove(cur_map_polygon);
        cur_map_polygon = [];
    }
}
/*清空图层*/
function clearMap(clearAll){
    if(clearAll){
        mapObj.clearMap();
    }else{
        mapObj.remove(cur_map_marker);
    }
    cur_level_2_marker = [];
    cur_level_3_marker = [];
    cur_map_marker = [];
}

$(document).on('mouseover','.room-numble',function(){
    $(this).parents(".amap-marker").css("z-index",101);
});
$(document).on('mouseout','.room-numble',function(){
    $(this).parents(".amap-marker").css("z-index",100);
});
