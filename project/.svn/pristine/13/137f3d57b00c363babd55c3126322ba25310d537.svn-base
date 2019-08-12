;(function($){
//	登录状态改变
	var msg = getCookie("user");
	console.log(msg)
    if(msg){
        $(".deng").hide();
        $(".zhu").hide();
        $(".hello").show();
        $(".hello").find("span").html(msg);
    }else{
        $(".deng").show();
        $(".zhu").show();
        $(".hello").hide();
        $(".go li:nth-child(1)").find("a").attr("href","login.html")
    }
    
    $(".hello").find("a").click(function(){
       	removeCookie("user")
       	removeCookie("pass")
       	
       	$(".deng").show();
        $(".zhu").show();
        $(".hello").hide();
        location.reload()
    })
    
//  输入框
    var txt = document.querySelector(".txt")
		txt.value="请输入手表型号和品牌名称"
		txt.style.color="#888"
//		var a =123
		txt.onfocus=function(){
			if(txt.value=="请输入手表型号和品牌名称"){
				txt.value=""	
				txt.style.color="#000000"
			}else{				
				txt.value=txt.value	
				txt.style.color="#000000"
			}
			txt.onblur=function(){
				if(txt.value== ""){									
					txt.value="请输入手表型号和品牌名称"
		        txt.style.color="#888"
				}
			}
		}
})(jQuery);
