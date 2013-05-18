define(function(require, exports, module){
    require("jquery");
    module.exports = function(id){
        var paper = Raphael(id);
        paper.offset = $("#"+id).offset();
        return paper;
    }
})