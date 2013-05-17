define(function (require, exports, module) {
	var Editor = require("./editor");
	var Shape = require("./shape");

    require("jquery");


	var editor = new Editor("container",[{
		text:"沙发",
		src:"/design/single-couch.png"
	}]);

    var PolygonMaker = require("./lib/polygonmaker")
        , paper = window.paper = Raphael("container");
        
    var maker = new PolygonMaker(paper,{active:true}); // 负责生成各种多边形

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
