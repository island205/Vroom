define(function(require,exports,module){
	var Shape = require("shape")
	var Editor = function(paper,components){
		//container : id of div
		//components: list of shapes ;
		//example:[{text:"沙发",src:"couch.png"}]
		
		this.stage = paper;
		this.components = components;
		this.componentList = [];

		this._editSize = .8;

		this._initRule();
		this._initComponents();

		this._bind();

	}

	Editor.prototype = {
		_initRule:function(){
			var width = this.stage.width * this._editSize;
			var xMax = 1000;
			var scale = width/xMax;
			var step = 100;
			var stepLength = step * scale;
			var smallStep = 10;
			var smallStepLength = smallStep * scale;
			var current = 0;
			var tickHeight = 5;
			var pathStr = ["M",0,0,'v',tickHeight*2,'m',0,-tickHeight*2];
			while(current<= xMax/smallStep){
				//x rule
				if(current != xMax/smallStep){
					var height = current%(step/smallStep)===(step/smallStep-1)? tickHeight * 2 : tickHeight;
					pathStr.push('h',smallStepLength,'v',height,'m',0,-height);
				}
				if(current % (step/smallStep)==0){
					this.stage.text( current * smallStepLength, 20 , current * smallStep )
				}
				current++;
			}
			this.stage.path(pathStr);
			this._ruleScale = scale;

		},
		_initComponents:function(){
			//list all components on right
			var left = this.stage.width * this._editSize;
			var marginTop = 100;
            var height = 40;
            var width = 100;
			var self = this;
			this.components.forEach(function(c,i){
				var startY = i* height + marginTop;
				var el = self.stage.rect(left,startY,width,height).attr("fill","#ccc");
				self.stage.text(left+width/2,startY+height/2,c.text);
				var startX,startY;
				var currentX,currentY;

				el.drag(function (dx, dy, x, y, e) {
					//on move , dx and dy are relative to the START POINT  of this drag
					e.stopPropagation();
					this._isDragging = true; //tag _isDragging ,so that not to fire click event
					currentX = dx + startX;
					currentY = dy + startY;
				}, function (x, y, e) {
					//on start
					e.stopPropagation();
					//reset currentX,currentY to the node's current cx,cy
					startX = x;
					startY = y;
				}, function (e) {
					self.componentList.push(new Shape(self, self.stage,{
						type:"image",
						src:c.src,
						width:self.getActualLength(c.size.width),
						height:self.getActualLength(c.size.height)
					}).render(currentX,currentY));
					this._isDragging = false;
				});		


			});
		},
		_bind:function(){
			var self = this;
			this.stage.canvas.addEventListener('click',function(e){
				self.selectElement && self.selectElement.unselect();
				self.selectElement = e.__select__;
				
			});
            $('body').keydown(function (evt) {
                console.log(evt);
                if (evt.keyCode == 38) { // Down key
                    self.selectElement && self.selectElement.rotate(true);
                } else if (evt.keyCode == 40) { // Up key
                    self.selectElement && self.selectElement.rotate(false);
                }else if (evt.keyCode == 46) { //delete shape
                    self.selectElement && self.selectElement.remove();
                }
            })
		},
		getActualLength:function(w){
			return w * this._ruleScale;
		}
	}


	module.exports = Editor;
});
