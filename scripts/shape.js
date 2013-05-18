define(function(require,exports,module){
    require('jquery');

	function mix(a,b){
		for(var o in b){
			//merge prototype
			if(b.hasOwnProperty(o)){
				a[o] = b[o];
			}
		}
		return a;
	}

	var Shape = function(editor, stage,options){
		this.type = options.type;
		delete options.type
		this.options = options || {};
		this.stage = stage;
		this.editor = editor;
        this.rotateDeg = 0;
		this.init();
	}

	Shape.prototype = {
		init:function(){
		},
		render:function(x,y){
			var paper = this.stage;
			var elem = this.element = paper[this.type].call(paper).attr(this.options).attr({
				x:x,
				y:y
			});
			this._bind();
			this._createMask();
			return this;
		},
		scale:function(times){
			this.element.transform("S"+times);
		},
        remove: function () {
            this.element.remove();        
            this.mask.forEach(function (cicle) {
                cicle.remove();
            })
        },
        rotate:function (clockwise) {
            if (clockwise) {
                this.element.rotate(10);
                this.rotateDeg = this.rotateDeg + 10;
            } else {
                this.rotateDeg = this.rotateDeg - 10;
                this.element.rotate(-10);
            }
        },
		_bind:function(){
            var isCtrlDown = false
            $('body').keydown(function (evt) {
                console.log(evt.which)
                if (evt.which == 17) {
                    isCtrlDown = true;
                }
            })
            $('body').keyup(function (evt) {
                if (evt.which == 17) {
                    isCtrlDown = false;
                }
            })
			var targetX, targetY;
			var currentX,currentY,el = this.element;
			var self = this;
			el.drag(function (dx, dy, x, y, e) {
				//on move , dx and dy are relative to the START POINT  of this drag
				// e.stopPropagation();

				this._isDragging = true; //tag _isDragging ,so that not to fire click event
				targetX = dx + currentX;
				targetY = dy + currentY;
				console.log(this.type,targetX,targetY);
                if (!isCtrlDown) {
                    this.rotate(-self.rotateDeg);
				    this.attr({
				    	x:targetX,
				    	y:targetY
				    });
                    this.rotate(self.rotateDeg);
                }
			}, function (x, y, e) {
				//on start
				e.stopPropagation();
				//reset currentX,currentY to the node's current cx,cy
				currentX = el.attr("x");
				currentY = el.attr("y");
				this._isDragging =true;
			}, function (e) {
				e.stopPropagation();
                if (isCtrlDown) {
					self.editor.componentList.push(new Shape(self.editor, self.stage,{
						type:"image",
						src: self.element.attr('src'),
						width: self.element.attr('width'),
						height:self.element.attr('height')
					}).render(targetX, targetY));
                }
			});		

			el.click(function(e){
				//给e上加个属性 ， 表示select
				e.__select__ = self;
				self.select();
			});
		},
		select:function(){
			this._showMask();
			
		},
		unselect:function(){
			this._hideMask();
		},
		_createMask:function(){
			this.mask = this.stage.set();
			var el = this.element;
			var x = el.attr('x'); 
			var y = el.attr("y");
			var width = el.attr('width');
			var height = el.attr('height');
			var self = this;

			//4个圆点
			var r = 4;
			var offset = 4;
			var circle1 = this.stage.circle(x-offset,y-offset,r);
			var startX,startY,shapeStartX,shapeStartY,shapeWidth,shapeHeight;
			circle1.drag(function (dx, dy, x, y, e) {
				//on move , dx and dy are relative to the START POINT  of this drag
				e.stopPropagation();
				this._isDragging = true; //tag _isDragging ,so that not to fire click event
				this.attr({
					cx:dx + startX,
					cy:dy + startY
				});
				circle2.attr("cy",dy+startY)
				circle3.attr("cx",dx+startX)
				self.element.attr({
					x:shapeStartX + dx,
					y:shapeStartY + dy,
					width:shapeWidth - dx,
					height:shapeHeight - dy
				});

			}, function (x, y, e) {
				//on start
				e.stopPropagation();
				//reset currentX,currentY to the node's current cx,cy
				startX = this.attr("cx");
				startY = this.attr("cy");
				shapeStartX = self.element.attr('x');
				shapeStartY = self.element.attr('y');
				shapeWidth 	= self.element.attr('width');
				shapeHeight = self.element.attr('height');
				this._isDragging = true;
			}, function (e) {
				e.stopPropagation();
				this._isDragging  = false;
			});		
			this.mask.push(circle1);
			var circle2 = this.stage.circle(x+width+offset,y-offset,r);
			circle2.drag(function (dx, dy, x, y, e) {
				//on move , dx and dy are relative to the START POINT  of this drag
				e.stopPropagation();
				this._isDragging = true; //tag _isDragging ,so that not to fire click event
				this.attr({
					cx:dx + startX,
					cy:dy + startY
				});
				circle1.attr("cy",dy+startY)
				circle4.attr("cx",dx+startX)
				self.element.attr({
					y:shapeStartY + dy,
					width:shapeWidth + dx,
					height:shapeHeight - dy
				});

			}, function (x, y, e) {
				//on start
				e.stopPropagation();
				//reset currentX,currentY to the node's current cx,cy
				startX = this.attr("cx");
				startY = this.attr("cy");
				shapeStartX = self.element.attr('x');
				shapeStartY = self.element.attr('y');
				shapeWidth 	= self.element.attr('width');
				shapeHeight = self.element.attr('height');
				this._isDragging = true;
			}, function (e) {
				e.stopPropagation();
				this._isDragging  = false;
			});		
			this.mask.push(circle2);
			var circle3 = this.stage.circle(x-offset,y+height+offset,r);
			circle3.drag(function (dx, dy, x, y, e) {
				//on move , dx and dy are relative to the START POINT  of this drag
				e.stopPropagation();
				this._isDragging = true; //tag _isDragging ,so that not to fire click event
				this.attr({
					cx:dx + startX,
					cy:dy + startY
				});
				circle1.attr("cx",dx+startX)
				circle4.attr("cy",dy+startY)
				self.element.attr({
					x:shapeStartX + dx,
					width:shapeWidth - dx,
					height:shapeHeight + dy
				});

			}, function (x, y, e) {
				//on start
				e.stopPropagation();
				//reset currentX,currentY to the node's current cx,cy
				startX = this.attr("cx");
				startY = this.attr("cy");
				shapeStartX = self.element.attr('x');
				shapeStartY = self.element.attr('y');
				shapeWidth 	= self.element.attr('width');
				shapeHeight = self.element.attr('height');
				this._isDragging = true;
			}, function (e) {
				e.stopPropagation();
				this._isDragging  = false;
			});		
			this.mask.push(circle3);
			var circle4 = this.stage.circle(x+width+offset,y+height+offset,r);
			circle4.drag(function (dx, dy, x, y, e) {
				//on move , dx and dy are relative to the START POINT  of this drag
				e.stopPropagation();
				this._isDragging = true; //tag _isDragging ,so that not to fire click event
				this.attr({
					cx:dx + startX,
					cy:dy + startY
				});
				circle2.attr("cx",dx+startX)
				circle3.attr("cy",dy+startY)
				self.element.attr({
					width:shapeWidth + dx,
					height:shapeHeight + dy
				});

			}, function (x, y, e) {
				//on start
				e.stopPropagation();
				//reset currentX,currentY to the node's current cx,cy
				startX = this.attr("cx");
				startY = this.attr("cy");
				shapeStartX = self.element.attr('x');
				shapeStartY = self.element.attr('y');
				shapeWidth 	= self.element.attr('width');
				shapeHeight = self.element.attr('height');
				this._isDragging = true;
			}, function (e) {
				e.stopPropagation();
				this._isDragging  = false;
			});		
			this.mask.push(circle4);
			this.mask.attr("fill","#fff")


	//		this.mask.hide();
		},
		_showMask:function(){
			this.mask.show();
		},
		_hideMask:function(){
			this.mask.hide();
		}
	}

	module.exports = Shape;
});
