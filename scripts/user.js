
define(function (require, exports, module) {

    var paperC5 = Raphael("canvas-c5",1118,600);
    var paperFlyHorse = Raphael("canvas-fly-horse",1118,600);
    require("jquery");

    $('body').keydown(function (evt) {
        if (evt.which == 27) {
            $("#canvas-c5").hide();
            $("#canvas-fly-horse").hide();
        }
    })

    function getDataC5(cb){
        var data = $.getJSON("c5.json",function(json){
            cb(json);
            $(".mark-c5").on("click",function(e){
                $("#canvas-c5").show();
                $("#canvas-fly-horse").hide();
            });
            $("#canvas-c5 image").on("click",function(e){
                if(this.attributes.href.value == "/design/artificial-learning-chair.png"){
                    var random = new Date().getTime()%10;
                    switch(random){
                        case 0:
                            alert("我是：Figo，我的电话：18800000000.");
                            break;
                        case 1:
                            alert("我是：闻捷，我的电话：18810000000.");
                            break;
                        case 2:
                            alert("我是：黄金，我的电话：18820000000.");
                            break;
                        case 3:
                            alert("我是：唐老师，我的电话：18830000000.");
                            break;
                        case 4:
                            alert("我是：Simon，我的电话：18840000000.");
                            break;
                        case 5:
                            alert("我是：刘教练，我的电话：18850000000.");
                            break;
                        case 6:
                            alert("我是：王师傅，我的电话：18860000000.");
                            break;
                        case 7:
                            alert("我是：毛帝，我的电话：18870000000.");
                            break;
                        case 8:
                            alert("我是：毛哥，我的电话：18880000000.");
                            break;
                        case 9:
                            alert("我是：小叮当，我的电话：18890000000.");
                            break;
                        default:
                            break;
                    }
                    
                }
                else{
                    alert("我只是家具，别摸我！")
                }
            });
        });
    }


    getDataC5(function(json){
        json.forEach(function (obj) {
            if(obj.type == "circle")return;
            if(obj.attr.x == null)return;
            if(obj.attr.x == 0)return;
            var func = paperC5[obj.type];
            var data = obj.data || {};
            if(!func || typeof func != "function")return;
            var obj = func.call(paperC5).attr(obj.attr||{});
            // obj.data(data);
            for(var k in data){
                obj.data(k,data[k])
            }
        });
    });

    function getDataFH(cb){
        var data = $.getJSON("c6.json",function(json){
            cb(json);
            $(".mark-fly-horse").on("click",function(e){
                $("#canvas-c5").hide();
                $("#canvas-fly-horse").show();
            });
            $("#canvas-fly-horse image").on("click",function(e){
                if(this.attributes.href.value == "/design/round-corner-table.png"){
                    var random = new Date().getTime()%3;
                    switch(random){
                        case 0:
                            alert("你好，已经被预订了");
                            break;
                        case 1:
                            alert("您好，6人桌，需要预定请拨打电话：88001100");
                            break;
                        case 2:
                            alert("您好，您已预定，如需退订，请拨打：88002200");
                            break;
                        default:
                            break;
                    }
                    
                }
                else if(this.attributes.href.value == "/design/round-table.png"){
                    var random2 = new Date().getTime()%3;
                    switch(random2){
                        case 0:
                            alert("你好，已经被预订了");
                            break;
                        case 1:
                            alert("您好，4人桌，需要预定请拨打电话：88001100");
                            break;
                        case 2:
                            alert("您好，您已预定，如需退订，请拨打：88002200");
                            break;
                        default:
                            break;
                    }
                }
                else{
                    alert("请点桌子预定")
                }
            });
        });
    }

    getDataFH(function(json){
        json.forEach(function (obj) {
            if(obj.type == "circle")return;
            if(obj.attr.x == null)return;
            if(obj.attr.x == 0)return;
            var func =paperFlyHorse[obj.type];
            var data = obj.data || {};
            if(!func || typeof func != "function")return;
            var obj = func.call(paperFlyHorse).attr(obj.attr||{});
            // obj.data(data);
            for(var k in data){
                obj.data(k,data[k])
            }
        });
    });
})
