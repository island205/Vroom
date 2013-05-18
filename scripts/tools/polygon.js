define(function(require, exports, module){
    var PolygonMaker = require("../maker/polygon")
    var maker = null
    
    exports.name = "polygon";
    exports.init = function(paper){
        // 初始化工具
        maker = new PolygonMaker(paper, {active:false});
    }
    exports.start = function(){
        // 激活工具
        maker.start();
    }
    exports.stop = function(){
        // 
        maker.stop();
    }
});