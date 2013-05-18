define(function(require, exports ,module){

    var MakerFactory = require("./makerfactory")

    var DataMaker = MakerFactory(function (paper){
        var self = this;
        this.paper = paper;
        paper.canvas.addEventListener("click",function(e){
            if(!self.active){return false;}
            var elem = paper.getElementByPoint(e.x,e.y)
                , data;
            if(elem){
                data = prompt("you data:");
                elem.data("data",data);
            }
        });
    });

    DataMaker.prototype.start = function(){
        this.active = true;
        return this;
    }

    DataMaker.prototype.stop = function(){
        this.active = false;
        return this;
    }


    return DataMaker
});