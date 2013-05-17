define(function (require, exports, module) {
    
    var PolygonMaker = require("./lib/polygonmaker")
        , width = 1024
        , height = 500
        , paper = Raphael("canvas", width, height);
        


    
    new PolygonMaker(paper).done(function(polygon){
        console.log(polygon);
    });

});
