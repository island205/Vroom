define(function(require, exports, module){
     
    var maker = null
    
    exports.name = "circle";
    exports.init = function(paper){
    }
    exports.start = function(){
        maker && maker.start();
    }
    exports.stop = function(){
        maker && maker.stop();
    }
});