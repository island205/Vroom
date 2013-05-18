define(function(require, exports, module){
     
    var maker = null
    
    exports.name = "select";
    exports.init = function(paper){
        
    }
    exports.start = function(){
        // maker.start();
        maker && maker.start();
    }
    exports.stop = function(){
        maker && maker.stop();   
    }
});