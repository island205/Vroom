define(function (require, exports, module) {
	var Editor = require("./editor");
    var Stage = require("./stage");

    require("jquery");

    var paper = Stage("canvas",500,500);
    var Saver = require("./saver");
    var saver = new Saver(paper);

	var editor = new Editor(paper,[{
		text:"沙发",
		src:"/design/single-couch.png"
	}]);

    var Toolbox = require("./toolbox");


    var toolbox = new Toolbox(paper, [
        require("./tools/select"),
        require("./tools/rectangle"),
        require("./tools/circle"),
        require("./tools/polygon"),
        require("./tools/data")
    ]);

    $("#save").click(function(){
        saver.save(function(data){
            localStorage["data"] = JSON.stringify(data)
        });
    });
});
