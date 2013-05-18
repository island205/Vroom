define(function(require, exports, module){
    
    var util = require("util");

    var Saver = util.singleton(function(paper){
        this.setPaper(paper);
    });

    Saver.prototype.setPaper = function(paper){
        this.paper = paper;
    }
    Saver.prototype.save = function(cb){
        var data = []
        this.paper.forEach(function(el){
            data.push({
                type:el.type,
                attr:el.attr(),
                data:el.data("data")
            });
        });
        cb(data);
    }

    module.exports = Saver;
})