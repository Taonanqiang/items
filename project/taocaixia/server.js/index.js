;(function ($) {

	//轮播图功能
	$("#banner .ban").banner({
		items: $(".ban").find("img"), //必传
		list: true,
		index: 0 //可选，默认0
	});

	//楼梯功能
	$(".floor1").children("i").click(function () {
		$("html").stop().animate({
			scrollTop: $('.f1').eq($(this).index()).offset().top
		});
	});

	$(".floor2").children(".i6").click(function () {
		$("html").stop().animate({
			scrollTop: 0
		});
	});

	//选项卡
	$(function () {
		$('.xuan').find(".tab").children("li").click(function () {
			$(this).siblings().css({
				background: "#f5f5f5",
				color: "#000"
			});
			$(this).css({
				background: "red",
				color: "#fff"
			});
			$('.xuan').find(".sh").find("ul").css('display', 'none');
			$('.xuan').find(".sh").find("ul").eq($(this).index()).css('display', 'block');
		});
	});

	//三级菜单
	$(function () {
		$("#dao").find("dd").mouseover(function () {
			//		$(this)..css({display:"none"})
			$(this).find(".cd2").css({ display: "block" });
		});
		$("#dao").find("dd").mouseout(function () {
			//		$(this)..css({display:"none"})
			$(this).find(".cd2").css({ display: "none" });
		});
	});

	//登陆后状态改变
	var msg = getCookie("user");
	//	console.log(msg)
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

	//懒加载
	var aimg = document.querySelectorAll("img");
	var arr = Array.from(aimg);
	var t;

	onload = onscroll = function () {
		clearTimeout(t);
		t = setTimeout(function () {
			fn();
		}, 100);
	};
	function fn() {
		var scrollT = document.documentElement.scrollTop;
		var clientH = document.documentElement.clientHeight;

		for (var i = 0; i < arr.length; i++) {
			//          console.log(`i:${i}`);
			if (arr[i].offsetTop - scrollT < clientH) {
				arr[i].src = arr[i].getAttribute("ljz");
				arr.splice(i, 1);
			}
		}
	}

	//推荐活动
	$(".tuijian").find("a").mouseover(function () {

		$(this).siblings("a").find("p").css({
			display: "block"
		});
	});
	$(".tuijian").find("a").mouseout(function () {
		$(this).siblings("a").find("p").css({
			display: "none"
		});
	});

	//	输入框
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

	//滑动
	$(".list1").find("dt").mouseover(function () {
		$(this).next("dd").css("display", "block").parent("dt").siblings("dt").next("dd").css("display", "none");
	});
})(jQuery);