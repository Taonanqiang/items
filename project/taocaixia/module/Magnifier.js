define(function(){
	class Magnifier{
		constructor(options){
			this.sBox = options.sBox;
			this.bBox = options.bBox;
			this.bImg = options.bImg;
			this.addEvent()
			console.log(this.sBox)
		}
		addEvent(){
			var that = this;
				this.sBox.on("mouseenter",function(){
					that.show()
				})
				this.sBox.on("mouseleave",function(){
					that.hide()	
				})
				this.sBox.on("mousemove",function(eve){
					var e = eve || window.event
					that.move(e);
				})
		}
		show(){
			this.bBox.css({display:"block"})
				if(!this.span){
					this.span = $("<span>");
					var w = this.bBox.outerWidth() / this.bImg.outerWidth() * this.sBox.outerWidth();
					var h = this.bBox.outerHeight() / this.bImg.outerHeight() * this.sBox.outerHeight();
					this.span.css({
						width:w,
						height:h,
						background:"rgba(200,200,200,0.6)",
						position:"absolute",
						left:0,
						top:0
					})
					this.sBox.append(this.span);
				}
				this.span.css({display:"block"});
				console.log(this.span)
		}
		hide(){
			this.span.css({display:"none"});
			this.bBox.css({display:"none"});
		}
		move(e){
			var l = e.pageX - this.sBox.offset().left - this.span.outerWidth()/2;
				var t = e.pageY - this.sBox.offset().top - this.span.outerHeight()/2;
				if(l < 0) l=0;
				if(t < 0) t=0;
				if(l > this.sBox.outerWidth() - this.span.outerWidth()){
					l = this.sBox.outerWidth() - this.span.outerWidth()
				}
				if(t > this.sBox.outerHeight() - this.span.outerHeight()){
					t = this.sBox.outerHeight() - this.span.outerHeight()
				}
				this.span.css({
					left : l 
				});
				this.span.css({
					top : t
				});
				var x = l / (this.sBox.outerWidth() - this.span.outerWidth());
				var y = t / (this.sBox.outerHeight() - this.span.outerHeight());
				this.bImg.css({left : -x * (this.bImg.outerWidth() - this.bBox.outerWidth())}) ;
				this.bImg.css({top : -y * (this.bImg.outerHeight() - this.bBox.outerHeight())}) ;
		}
	}
	
	return Magnifier
})