define(function(require, exports, module){

    var util = require("./lib/util");
    require("jquery");

    var Toolbox = util.singleton(function(paper,tools){
        var container = $("<div id='toolbox' />")
            , ul = $("<ul />")
            , headline = $("<div class='headline' />")
            , ACTIVE = "active";

        this.setPaper(paper);

        $("body").append(container);

        container.append(headline);
        container.append(ul);


        function activeTool(tool){
            tool.active = true;
            tool.btn.addClass(ACTIVE)
            tool.start();
        }

        function deactiveTool(tool){
            tool.active = false;
            tool.btn.removeClass(ACTIVE)
            tool.stop();
        }

        tools.forEach(function(tool){
            var li = $("<li />")

            li.attr("title",tool.name);
            li.html(tool.name[0].toUpperCase())
            li.addClass("tool").addClass(tool.name);
            ul.append(li);
            tool.init(paper);
            tool.btn = li;
            tool.active = false;

            li.click(function(){
                if(!tool.active){
                    tools.forEach(deactiveTool);
                    activeTool(tool);
                }else{
                    deactiveTool(tool);
                }
            });
            return false;
        });
    });

    Toolbox.prototype.setPaper = function(paper){
        this.paper = paper;
    }

    return Toolbox;

});