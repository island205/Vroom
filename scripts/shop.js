define(function (require, exports, module) {
	var Editor = require("./editor");
	var Shape = require("./shape");
    var Stage = require("./stage");

    require("jquery");

    var paper = Stage("canvas");
    
	var editor = new Editor(paper,[{
		text:"沙发",
		src:"/design/single-couch.png"
	}]);

    var PolygonMaker = require("./lib/polygonmaker")
        , Toolbox = require("./toolbox");


    var maker = new PolygonMaker(paper, {active:true}); // 负责生成各种多边形
    var toolbox = new Toolbox(paper, {})
    var active = false;
    $("#a").click(function(){
        if(active){
            $(this).val("start");
            maker.stop();
        }else{
            $(this).val("stop");
            maker.start();
        }
        active = !active;
    })
});
