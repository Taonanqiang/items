;(function ($) {

    class Car {
        constructor() {
            this.tbody = document.querySelector("tbody");
            this.url = "http://localhost/project/taocaixia/data/goods.json";

            this.load();
            this.addEvent();
        }
        addEvent() {
            var that = this;
            // D2.采用事件委托绑定删除的事件
            this.tbody.addEventListener("click", function (eve) {
                if (eve.target.className == "del") {
                    // D3.获取点击商品的id
                    that.id = eve.target.parentNode.getAttribute("index");
                    // D4.删除DOM元素
                    eve.target.parentNode.remove();
                    // D5.删除cookie中的数据
                    that.changeCookie(function (i) {
                        that.goods.splice(i, 1);
                    });
                    that.display();
                }
            });
            this.tbody.addEventListener("input", function (eve) {
                // U1.采用事件委托绑定修改数量的事件
                if (eve.target.className == "num") {
                    // U2.获取修改数量对应的商品的id
                    that.id = eve.target.parentNode.parentNode.getAttribute("index");
                    // U3.获取修改之后的实时数量
                    // that.num = eve.target.value;
                    // U4.修改cookie中的数据
                    that.changeCookie(function (i) {
                        that.goods[i].num = eve.target.value;
                    });
                    //                  console.log(eve.target)
                    //                  eve.target.parentNode.nextElementSibling.nextElementSibling.innerHTML
                    //                  =eve.target.value*eve.target.parentNode.nextElementSibling.innerHTML
                    that.display();
                }
            });
        }
        changeCookie(callback) {
            // 先遍历cookie中读取出来的数据
            var i = 0;
            this.goods.some((val, index) => {
                // 拿到与点击相同的数据，结束
                i = index;
                return val.id == this.id;
            });
            callback(i);
            // U5.最后要把操作之后的数据，再设置给cookie
            setCookie("goods", JSON.stringify(this.goods));
        }
        load() {
            var that = this;
            $.ajax({
                url: this.url,
                success: function (res) {
                    // 2.读取cookie
                    that.res = res;
                    that.getCookie();
                }
            });
        }
        getCookie() {
            //      	console.log(res)
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            // 3.开始比对数据，渲染页面
            this.display();
        }
        display() {
            var str = "";
            var cont = 0;
            // 遍历所有数据
            this.res.forEach(resVal => {
                // 遍历cookie中的数据
                this.goods.forEach(goodsVal => {
                    // 比较,一致,渲染对应数据
                    if (resVal.goodsId == goodsVal.id) {

                        var zong = resVal.price * goodsVal.num;
                        str += `<tr index="${resVal.goodsId}">
			                <td><img src="${resVal.url}"></td>
			                <td>${resVal.name}</td>
			                <td><input class="num" type="number" value="${goodsVal.num}" min=1></td>
			                <td>${resVal.price}</td>
			                <td calss="zong">${zong}</td>
			                <td class="del">删除</td>
			            </tr> `;
                        cont += zong;
                    }
                });
            });
            this.tbody.innerHTML = str;
            //          console.log(cont)
            $(".pay-c").children("i").html(cont);
        }
    }

    new Car();

    //  登录状态改变
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