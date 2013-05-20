
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
        var data = $.getJSON("c5.json",function(json){
            cb(json);
            $("body").on("click",function(e){
                $("#canvas").show();
            });
            $("image").on("click",function(e){
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


    getData(function(json){
        json.forEach(renderObject);
    });

    
})
