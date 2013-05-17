define(function(require,module,exports){
    
    function Polygon(){

    }

    function PolygonMaker(paper){
        paper.on("click",this.clickHandler);
    }


    PolygonMaker.prototype.clickHandler = function(e){
        console.log(e);
    }

    PolygonMaker.prototype.start = function(){
        return this;
    }

    PolygonMaker.prototype.cancel = function(){
        return this;
    }

    PolygonMaker.prototype.done = function(){
        return ;
    }


    return PolygonMaker
});