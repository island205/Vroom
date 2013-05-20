
define(function (require, exports, module) {

    var paper = Raphael("canvas",1000,800);
    require("jquery");
    function renderObject(obj){
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
        });
    }


    getData(function(json){
        json.forEach(renderObject);
    });
    
})
