define(function(require, exports ,module){

    var MakerFactory = require("./makerfactory")

    var RectangleMaker = MakerFactory(function (paper, opt){
        var self = this;
        opt = opt || {};
        
        self.active = opt.active;
        self.startpoint = null;
        self.paper = paper;
        self.current = null;

        paper.canvas.addEventListener("mousedown",function(e){
            if(!self.active){return false;}

            self.startpoint = [e.offsetX,e.offsetY];
        });

        paper.canvas.addEventListener("mousemove",function(e){
            if(!self.active){return false;}
            if(!self.startpoint){return false;}
            if(self.current){self.current.remove();}
            self.current = paper.rect(start[0], start[1], e.offsetX - start[0], e.offsetY - start[1]);
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