define(function(require, exports, module){
    var PolygonMaker = require("../maker/polygon")
    var maker = null
    
    exports.name = "polygon";
    exports.init = function(paper){
        maker = new PolygonMaker(paper, {active:true});
    }
    exports.start = function(){
        maker.start();
    }
    exports.stop = function(){
        maker.stop();
    }
});