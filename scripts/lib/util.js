define(function(require, exports, module){

    exports.translate = function(points){
        var ret = ""
        for(var i = 0; i< points.length; i++){
            ret+=i==0?"M":"L";
            ret+=points[i].join(",")
        }
        return ret;
    }

    exports.singleton = function(constructor){
        function s(){
            if(s.instance){return s.instance}
            constructor.apply(this,arguments);
            s.instance = this;
        }

        return s;
    }

    exports.distance = function(p1,p2,distance){
        return distance = Math.sqrt( Math.pow(p2[0] - p1[0],2) + Math.pow(p2[1] - p1[1],2));
    }
});