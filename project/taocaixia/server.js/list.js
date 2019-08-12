;(function ($) {
	class List {
		constructor(options) {
			this.left = options.left;
			this.right = options.right;
			this.pageCont = options.pageCont;
			this.index = options.index;
			this.cont = $(".cont");
			this.num = options.num;
			this.url = "http://localhost/project/taocaixia/data/goods.json";
			this.load();
			this.addEvent();
			this.shu = options.shu;
			this.addEvent1();
			this.jump();
			console.log(this.num);
		}
		jump() {
			var that = this;
			this.cont[0].addEventListener("click", function (eve) {
				if (eve.target.className == "tiao") {
					that.id = eve.target.parentNode.getAttribute("qwe");
					//					var msg=getCookie("goods")
					that.res.some(resVal => {
						this.str = "";
						if (that.id == resVal.goodsId) {
							this.str = resVal.goodsId;
						}
						return this.str;
					});
					document.location.href = 'detail.html?' + this.str;
				}
			});
		}
		addEvent1() {
			var that = this;
			this.cont[0].addEventListener("click", function (eve) {
				if (eve.target.className == "btn") {
					that.id = eve.target.parentNode.getAttribute("qwe");
					that.setCookie();
				}
			});
		}
		setCookie() {
			console.log(this.id);
			this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
			this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
			console.log(this.goods);
			console.log(this.goods.length);
			if (this.goods.length == 0) {
				console.log(1);
				this.goods.push({
					id: this.id,
					num: 1
				});
			} else {
				var i = 0;
				var onoff = this.goods.some((value, index) => {
					i = index;
					return value.id == this.id;
				});
				if (onoff) {
					this.goods[i].num++;
				} else {
					this.goods.push({
						id: this.id,
						num: 1
					});
				}
			}
			setCookie("goods", JSON.stringify(this.goods));
		}
		load() {
			var that = this;
			$.ajax({
				type: "post",
				url: this.url,
				success: function (res) {
					that.shu.innerHTML = res.length;
					that.res = res;
					that.display();
					that.createPage();
				}
			});
		}
		display() {
			//				console.log(this.res)
			var str = "";
			for (var i = this.index * this.num; i < (this.index + 1) * this.num; i++) {
				//					console.log(1)
				if (i < this.res.length) {
					str += `<li class="box" qwe="${this.res[i].goodsId}">
								<img src="${this.res[i].url}" class="tiao"/>
								<span class="tiao">${this.res[i].name}</span>
								<p class="tiao"><i class="tiao">价格：</i>￥${this.res[i].price}</p>
								<u class="btn">加入购物车</u><b>关注</b>
							</li>`;
				}
			}
			this.cont[0].innerHTML = str;
		}
		createPage() {
			this.maxNum = Math.ceil(this.res.length / this.num);
			var str = "";
			for (var i = 0; i < this.maxNum; i++) {
				str += `<li>${i + 1}</li>`;
			}
			this.pageCont.innerHTML = str;
			//				console.log(this.pageCont)
			this.setActive();
		}
		setActive() {
			for (var i = 0; i < this.maxNum; i++) {
				this.pageCont.children[i].className = "";
			}
			this.pageCont.children[this.index].className = "active";
		}
		addEvent() {
			var that = this;
			this.left.onclick = function () {
				that.changeIndex(0);
			};
			this.right.onclick = function () {
				that.changeIndex(1);
			};
		}
		changeIndex(type) {
			if (type == 0) {
				if (this.index == 0) {
					this.index = this.maxNum - 1;
				} else {
					this.index--;
				}
			} else {
				if (this.index == this.maxNum - 1) {
					this.index = 0;
				} else {
					this.index++;
				}
			}
			this.setActive();
			this.display();
		}
	}
	new List({
		left: document.querySelector("#btnL"),
		right: document.querySelector("#btnR"),
		pageCont: document.querySelector("#page"),
		index: 0,
		num: 10,
		shu: document.querySelector(".shu")
	});

	//		列表收起隐藏功能
	$(".shou").on("click", function () {
		if ($(this).html() == "收起列表↑") {
			$(".lb").stop().slideUp(500);
			$(this).html("放下列表↓");
		} else {
			$(".lb").stop().slideDown(500);
			$(this).html("收起列表↑");
		}
	});

	//		登陆后状态改变
	var msg = getCookie("user");
	console.log(msg);
	if (msg) {
		$(".deng").hide();
		$(".zhu").hide();
		$(".hello").show();
		$(".hello").find("span").html(msg);
	} else {
		$(".deng").show();
		$(".zhu").show();
		$(".hello").hide();
		$(".go li:nth-child(1)").find("a").attr("href", "login.html");
	}

	$(".hello").find("a").click(function () {
		removeCookie("user");
		removeCookie("pass");

		$(".deng").show();
		$(".zhu").show();
		$(".hello").hide();
		location.reload();
	});

	//输入框
	var txt = document.querySelector(".txt");
	txt.value = "请输入手表型号和品牌名称";
	txt.style.color = "#888";
	//		var a =123
	txt.onfocus = function () {
		if (txt.value == "请输入手表型号和品牌名称") {
			txt.value = "";
			txt.style.color = "#000000";
		} else {
			txt.value = txt.value;
			txt.style.color = "#000000";
		}
		txt.onblur = function () {
			if (txt.value == "") {
				txt.value = "请输入手表型号和品牌名称";
				txt.style.color = "#888";
			}
		};
	};
})(jQuery);