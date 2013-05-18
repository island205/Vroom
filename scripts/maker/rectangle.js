define(function(require, exports ,module){

    var MakerFactory = require("./makerfactory")

    var RectangleMaker = MakerFactory(function (paper, opt){
        var self = this;
        opt = opt || {};

        self.active = opt.active;
        self.startpoint = null;
        self.paper = paper;
        self.current = null;

        paper.canvas.addEventListener("click",function(e){
            console.log(e)
        });

        paper.canvas.addEventListener("mousedown",function(e){
            if(!self.active){return false;}

            self.startpoint = [e.layerX,e.layerY];
        });

        paper.canvas.addEventListener("mousemove",function(e){
            var start = self.startpoint
                , curtmp = null
                , p1x = start[0]
                , p1y = start[1]
                , p2x = e.layerX
                , p2y = e.layerY;
                
            if(!self.active){return false;}
            if(!self.startpoint){return false;}
            if(self.current){curtmp = self.current;}
            

            console.log(p1x,p1y,p2x,p2y,e);
            self.current = paper.rect(Math.min(p1x,p2x), Math.min(p1y,p2y), Math.abs(p1x-p2x), Math.abs(p1y-p2y)).attr({
                stroke:"#333",
                fill:"#b1c9ed"
            });
            curtmp.remove();
        });

        paper.canvas.addEventListener("mouseup",function(e){
            if(!self.active){return false;}
            self.startpoint = null;
            self.current = null;
        });
    });

    RectangleMaker.prototype.start = function(){
        this.active = true;
        return this;
    }

    RectangleMaker.prototype.stop = function(){
        this.active = false;
        start = null;
        return this;
    }


    return RectangleMaker
});