
define(function (require, exports, module) {

    var paper = window.paper = Raphael("canvas");

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

    $.getJSON("data.json",function(json){
        json.forEach(renderObject);
    });

})
