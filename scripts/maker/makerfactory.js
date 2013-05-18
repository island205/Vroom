define(function(require, exports, module){

    var util = require("util");
    var ev = require("event");


    return function(consctructor){
        var Maker = util.singleton(consctructor);
        ev.mixin(Maker);
        return Maker;
    }
})