define(function (require, exports, module) {
    
    var PolygonMaker = require("./lib/polygonmaker")
        , ShapeManager = require("./lib/shapemanager")
        , paper = window.paper = Raphael("canvas");
        
    var maker = new PolygonMaker(paper,{active:true}); // 负责生成各种多边形
    var manager = new ShapeManager(paper); // 负责管理多边形，建组啦，删除啦什么的

    var active = false;
    $("#a").click(function(){
        if(active){
            $(this).val("start");
            maker.stop();
        }else{
            $(this).val("stop");
            maker.start();
        }
        active = !active;
    })
});