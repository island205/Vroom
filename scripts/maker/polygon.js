define(function(require, exports ,module){

    var Maker = require("./makerfactory");
    var util = require("util");

    var PolygonMaker = Maker(function (paper, opt){
        var self = this;
        
        self.points = [];
        self.curline = null;
        self.active = opt.active;
        self.paper = paper;

        paper.canvas.addEventListener("click",function(e){
            e.stopPropagation();
            self.clickHandler(e);
            return false;
        });
    });


    PolygonMaker.prototype.clickHandler = function(e){
        var paper = this.paper;
        var curElem = paper.getElementByPoint(e.offsetX, e.offsetY);
        if(curElem || !this.active){
            return;
        }
        
        if(this.points.length > 2 && this.near(e)){
            this.points.push(this.points[0]);
            this.curline && this.curline.remove();
            this.fire("done",paper.path().attr({
                path:util.translate(this.points),
                stroke:"#333",
                fill:"#b1c9ed"
            }));
            this.points.length = 0;
        }else{
            this.points.push([e.offsetX,e.offsetY]);
            this.curline && this.curline.remove();
            this.curline = paper.path(util.translate(this.points),{
                stroke:"#333"
            })
        }
    }


    PolygonMaker.prototype.near = function(e){
        var p1 = this.points[0];
        var p2 = [e.offsetX,e.offsetY];

        if(!p1){
            return false;
        }

        return util.distance(p1,p2) < 50;
    }

    PolygonMaker.prototype.start = function(){
        this.active = true;
        return this;
    }

    PolygonMaker.prototype.stop = function(){
        this.curline && this.curline.remove();
        this.points.length = 0;
        this.active = false;
        return this;
    }


    return PolygonMaker
});