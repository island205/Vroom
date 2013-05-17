define(function (require, exports, module) {
    
    var PolygonMaker = require("./lib/polygonmaker")
        , ShapeManager = require("./lib/shapemanager")
        , paper = Raphael("canvas", 1024, 500);
        
    var maker = new PolygonMaker(paper); // 负责生成各种多边形
    var manager = new ShapeManager(paper); // 负责管理多边形，建组啦，删除啦什么的

});
