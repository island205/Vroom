define(function(require, exports ,module){

    var MakerFactory = require("./makerfactory")

    var CircleMaker = MakerFactory(function (paper, opt){
        var self = this;
        opt = opt || {};

        self.active = opt.active;
        self.startpoint = null;
        self.paper = paper;
        self.current = null;

        paper.canvas.addEventListener("mousedown",function(e){
            if(!self.active){return false;}

            self.startpoint = [e.layerX,e.layerY];
        });

        paper.canvas.addEventListener("mousemove",function(e){
            var start = self.startpoint
                , curtmp = null;

            if(!self.active){return false;}
            if(!self.startpoint){return false;}
            if(self.current){curtmp = self.current;}
            
            var p1x = start[0]
                , p1y = start[1]
                , p2x = e.layerX
                , p2y = e.layerY;


            self.current = paper.circle((p2x+p1x)/2, (p2y+p1y)/2, Math.max(Math.abs(p1x-p2x),Math.abs(p1y-p2y))/2).attr({
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

    CircleMaker.prototype.start = function(){
        this.active = true;
        return this;
    }

    CircleMaker.prototype.stop = function(){
        this.active = false;
        this.startpoint = null;
        return this;
    }


    return CircleMaker
});