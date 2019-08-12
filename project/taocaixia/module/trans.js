define(function(){
	class trans{
		constructor(options,fn) {
			this.tu = options.tu
			this.nm = options.nm
			this.cankao = options.cankao
			this.tips=options.tips
			this.price=options.price
			this.url=options.url
			this.fn = fn;
		    this.load()
		}
		load(){
			var result = decodeURIComponent(location.search)
			this.result = result.substring(1)
				var that=this;
				$.ajax({
					type:"get",
					url:this.url,
					success:function(res){
						that.res= res
						that.display()
						that.fn();
					}
				})
			}
			
		
		display(){
			var str1="";
			var str2="";
			var str3="";
			var str4="";
			var str5="";
			for(var i=0;i<this.res.length;i++){
				if(this.result == this.res[i].goodsId){
					console.log(this.res[i].goodsId)
					str1=`<div class="sbox">
							<img src="${this.res[i].url}" class="simg"/>
						</div>
						<div class="da  b_box">
							<img src="${this.res[i].url}"/>
						</div>
						<div class="tu-c" >
							<b></b>
							<div class="tu-c-c ">
								<img src="${this.res[i].url}"/>
							</div>
							
							<b></b>
						</div>`
					str2 = this.res[i].name
					var price2=parseInt(this.res[i].price/.6)
					str3 =`参考价：<span class="hua">￥${this.res[i].price}</span>`
					str4 =`商品编号：<span>${this.res[i].tip}</span>`
					str5 =`宾伦价：<span class="te">￥${this.res[i].price}</span>`
				}
				
			}
			this.tu.html(str1)
			this.nm.html(str2)
			this.cankao.html(str3)
			this.tips.html(str4)
			this.price.html(str5)
		}
	}
	
	return trans
	
})