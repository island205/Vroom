
define(function (require, exports, module) {

    var paper = Raphael("canvas",1118,600);
    require("jquery");
    function renderObject(obj){
        if(obj.type == "circle")return;
        if(obj.attr.x == null)return;
        if(obj.attr.x == 0)return;
        var func = paper[obj.type];
        var data = obj.data || {};
        if(!func || typeof func != "function")return;
        var obj = func.call(paper).attr(obj.attr||{});
        // obj.data(data);
        for(var k in data){
            obj.data(k,data[k])
        }
    }

    function getData(cb){
        var data = $.getJSON("c6.json",function(json){
            cb(json);
            $("body").on("click",function(e){
                $("#canvas").show();
            });
            $("image").on("click",function(e){
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


    getData(function(json){
        json.forEach(renderObject);
    });

    
})
