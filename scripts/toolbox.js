define(function(require, exports, module){

    var util = require("./lib/util");
    require("jquery");

    var Toolbox = util.singleton(function(paper,tools){
        var container = $("<div id='toolbox' />")
            , ul = $("<ul />")
            , headline = $("<div class='headline' />");

        this.setPaper(paper);

        $("body").append(container);

        container.append(headline);
        container.append(ul);


        tools.forEach(function(tool){
            var li = $("<li />")
                , active = false
                , ACTIVE = "active";

            li.html(tool.name[0].toUpperCase())
            li.addClass("tool").addClass(tool.name);
            ul.append(li);
            tool.init(paper);
            li.click(function(){
                if(!active){
                    li.addClass(ACTIVE)
                    tool.start()
                }else{
                    li.removeClass(ACTIVE)
                    tool.stop()
                }
                
                active = !active;
            });
            return false;
        });
    });

    Toolbox.prototype.setPaper = function(paper){
        this.paper = paper;
    }

    return Toolbox;

});