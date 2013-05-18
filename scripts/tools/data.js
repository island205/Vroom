define(function(require, exports, module){
     
    var DataMaker = require("../maker/data");
    
    exports.name = "data";

    exports.init = function(paper){
        maker = new DataMaker(paper);
    }

    exports.start = function(){
        maker && maker.start();
    }
    exports.stop = function(){
        maker && maker.stop();
    }
});