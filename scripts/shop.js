define(function (require, exports, module) {
    var Editor = require("./editor");
    var Stage = require("./stage");

    require("jquery");

    var paper = Stage("canvas",500,500);
    var Saver = require("./saver");
    var saver = new Saver(paper);

    var editor = new Editor(paper, [{
        text: "沙发",
        src: "  ./design/single-couch.png",
        size: {
            width: 100,
            height: 100
        }
    },
    {
        text: "双人沙发",
        src: "./design/double-couch.png",
        size: {
            width: 81,
            height: 50
        }
    },
    {
        text: "三人沙发",
        src: "./design/triple-couch.png",
        size: {
            width: 114,
            height: 50
        }
    },
    {
        text: "多人沙发",
        src: "./design/long-couch.png",
        size: {
            width: 221,
            height: 50
        }
    },
    {
        text: "圆凳",
        src: "./design/round-stool.png",
        size: {
            width: 20,
            height: 20
        }
    },
    {
        text: "圆桌",
        src: "./design/round-table.png",
        size: {
            width: 50,
            height: 50
        }
    },
    {
        text: "有隔的长桌",
        src: "./design/long-table-with-separate.png",
        size: {
            width: 50,
            height: 100
        }
    },
    {
        text: "长桌",
        src: "./design/long-table.png",
        size: {
            width: 50,
            height: 100
        }
    },
    {
        text: "人工学椅",
        src: "./design/artificial-learning-chair.png",
        size: {
            width: 50,
            height: 50
        }
    },
    {
        text: "圆角桌",
        src: "./design/round-corner-table.png",
        size: {
            width: 70,
            height: 50
        }
    },
    {
        text: "方桌",
        src: "./design/table.png",
        size: {
            width: 70,
            height: 50
        }
    },
    
    ]);

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

