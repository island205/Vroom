define(function(require, exports, module){
     
    var RectangleMaker = require("../maker/rectangle");
    
    exports.name = "rectangle";
    exports.init = function(paper){
        maker = new RectangleMaker(paper);
    }
    exports.start = function(){
        // maker.start();
    }
    exports.stop = function(){
        // maker.stop();
    }
});