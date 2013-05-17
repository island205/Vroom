define(function(require, exports, module){
    var util = require("./util");
    var ev = require("./event");
    
    ShapeManager = util.singleton(function(){

    });


    ev.mixin(ShapeManager);

    ShapeManager.fn = ShapeManager()

    return ShapeManager

});