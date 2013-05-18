define(function (require, exports, module) {
	var Editor = require("./editor");
	var Shape = require("./shape");

    var paper = window.paper = Raphael("canvas");

	var editor = new Editor(paper,[{
		text:"沙发",
		src:"/design/single-couch.png"
	}]);
})
