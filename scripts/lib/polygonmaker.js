define(function(require, exports ,module){

    var util = require("./util");

    function Polygon(){
        this.points = [];
    }

    function PolygonMaker(paper){
        var self = this;
        if(PolygonMaker.instance){
            return PolygonMaker.instance;
        }

        self.points = [];
        self.curline = null;
        self.paper = paper;

        Raphael.el.click(function(e){
            self.clickHandler(e);
        });
        PolygonMaker.instance = this;
    }


    PolygonMaker.prototype.clickHandler = function(e){
        var paper = this.paper;
        if(this.points.length > 2 && this.near(e)){
            this.points.push(this.points[0]);
            this.done(paper.path(util.translate(this.points)).attr({
                fill:"#b1c9ed"
            }));
            this.points.length = 0;
        }else{
            this.points.push([e.x,e.y]);
            this.curline && this.curline.remove();
            this.curline = paper.path(util.translate(this.points),{
                stroke:"#333"
            })
        }
    }

    PolygonMaker.prototype.near = function(e){
        var p1 = this.points[0];
        var p2 = [e.x,e.y];

        if(!p1){
            return false;
        }

        return util.distance(p1,p2) < 50;
    }

    PolygonMaker.prototype.start = function(){
        return this;
    }

    PolygonMaker.prototype.cancel = function(){
        return this;
    }

    PolygonMaker.prototype.done = function(shape){
        return ;
    }


    return PolygonMaker
});