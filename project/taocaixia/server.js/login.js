;(function ($) {

	class Register {
		constructor() {
			this.url = "http://api.icodeilife.cn:81/user";
			this.user = $(".user1");
			this.email = $(".email");
			this.pass1 = $(".pass1");
			this.pass2 = $(".pass2");
			this.ff = $("#ff1");
			this.ff[0].checked = "checked";
			//		    console.log()
			this.zc = $(".zc");
			this.useronOff = this.emlonOff = this.passonOff = this.ckonOff = false;
			this.judge();
			this.addEvent();
		}
		judge() {
			var that = this;
			this.user.on("blur", function () {
				that.userReg();
			});
			this.email.on("blur", function () {
				that.emailReg();
			});
			this.pass1.on("blur", function () {
				that.passReg1();
			});
			this.pass2.on("blur", function () {
				that.passReg2();
			});
		}
		userReg() {
			let reg = /^[\u2E80-\u9FFF]{3,7}$/;
			if (reg.test(this.user.val())) {
				this.user.next("i").html("可以注册");
				this.useronOff = true;
			} else {
				this.user.next("i").html("请输入3-7位汉字");
				this.useronOff = false;
			}
		}
		emailReg() {
			let reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
			if (reg.test(this.email.val())) {
				this.email.next("i").html("可以注册");
				this.emlonOff = true;
			} else {
				this.email.next("i").html("请输入正确的邮箱");
				this.emlonOff = false;
			}
		}
		passReg1() {
			if (this.pass1.val().length >= 6) {
				this.pass1.next("i").html("可以注册");
				this.passonOff = true;
			} else {
				this.pass1.next("i").html("登录密码不能少于 6 个字符");
				this.passonOff = false;
			}
		}
		passReg2() {
			if (this.pass1.val() == this.pass2.val()) {
				this.pass2.next("i").html("可以注册");
				this.ckonOff = true;
			} else {
				this.pass2.next("i").html("密码不一致");
				this.ckonOff = false;
			}
		}
		addEvent() {
			var that = this;
			this.zc.on("click", function () {
				that.load();
			});
		}
		load() {

			if (this.useronOff && this.emlonOff && this.passonOff && this.ckonOff && this.ff[0].checked) {
				console.log(1);
				$.ajax({
					url: this.url,
					data: {
						type: "register",
						user: this.user.val(),
						pass: this.pass1.val(),
						email: this.email.val()
					},
					success: res => {
						console.log(res);
						this.res = JSON.parse(res);
						if (this.res.code == 0) {
							this.user.next("i").html("用户名重复，请重新注册");
						} else if (this.res.code == 1) {
							this.zc.next("b").html("您已注册成功！");
							this.user.val("");
							this.email.val("");
							this.pass1.val("");
							this.pass2.val("");
							this.user.next("i").html("*");
							this.pass1.next("i").html("*");
							this.pass2.next("i").html("*");
							this.email.next("i").html("*");
						}
					}
				});
			} else if (!this.ff[0].checked) {
				alert("请观看用户协议");
			}
		}
	}

	class Login {
		constructor() {
			this.url = "http://api.icodeilife.cn:81/user";
			this.user = $(".user");
			this.pass = $(".pass");
			this.ff = $("#ff");
			this.dl = $(".dl");
			this.state = $(".ss");
			this.user.value = getCookie("user");
			this.pass.value = getCookie("pass");
			this.addEvent();
		}
		addEvent() {
			var that = this;
			this.dl.on("click", function () {
				that.load();
			});
		}
		load() {
			if (!this.user.val() && !this.pass.val()) {
				alert("用户名不能为空" + "\n" + "登录密码不能为空");
			} else if (!this.user.val()) {
				alert("用户名不能为空");
			} else if (!this.pass.val()) {
				alert("登录密码不能为空");
			} else {
				$.ajax({
					url: this.url,
					data: {
						type: "login",
						user: this.user.val(),
						pass: this.pass.val()
					},
					success: res => {
						console.log(res);
						this.res = JSON.parse(res);
						if (this.res.code == 0) {
							alert("不存在此用户，请注册");
						} else if (this.res.code == 1) {
							if (this.ff[0].checked) {
								this.setState();
							}
							setCookie("user", this.user.val());
							setCookie("pass", this.pass.val());
							this.state.html("登录成功,5秒后跳转到<a href='index.html'>首页</a>");
							setTimeout(function () {
								location.href = "index.html";
							}, 5000);
							this.user.val("");
							this.pass.val("");
						} else if (this.res.code == 2) {
							alert("用户信息不匹配，请重新登录");
						}
					}
				});
			}
		}
		setState() {
			setCookie("user", this.user.val(), {
				expires: 7
			});
			setCookie("pass", this.pass.val, {
				expires: 7
			});
			//			localStorage.setItem("loginUser",JSON.stringify(this.res.msg))
		}
	}
	new Register();
	new Login();

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