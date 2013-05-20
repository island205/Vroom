define(function(require, exports, module){
     
    var CircleMaker = require("../maker/circle");
    var maker = null
    
    exports.name = "circle";
    exports.init = function(paper){
        maker = new CircleMaker(paper);
    }
    exports.start = function(){
        maker && maker.start();
    }
    exports.stop = function(){
        maker && maker.stop();
    }
});