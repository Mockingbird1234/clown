$(document).ready(function(){
	
	
	
	//搜索影片
	
	
	$(".search-btn").eq(0).click(function(){
		var name=$(".search").val();
		$.ajax({
			type:"post",
			url:"/search",
			data:{"name":name},
			success:function(data){
				location.href="./movies?name="+data.name;
			},
			async:true
		});
	})
	
	
	
	
	var str="";
    //发送验证码
    var off=false;
    $(".send").click(function(){
        if(off){
            return false;
        }else{

            $.ajax({
                type:"POST",
                url:"/readOne",
                data: { name:$("#register #userN").val(),
                    email:$("#register #email").val(),
                    password:$("#register #userP").val()
                },
                dataType: "json",
                success: function (data) {

                    if(data==='1'){
                       $.ajax({
                            url: "/send",              //请求地址
                           type: "post",                       //请求方式
                            data: { email:$("#register #email").val()},        //请求参数
                            dataType: "json",
                            success: function (data) {
                                var num=90;
                                var timer=null;
                                off=true;
                                $(".send").attr("disabled","disabled");
                                timer=setInterval(function(){
                                    $(".send").html("已发送"+num+"S");
                                    num--;
                                    if(num==-1){
                                        clearInterval(timer);
                                        $(".send").html('发送验证码');
                                        off=false;
                                        $(".send").removeAttr("disabled");
                                    }
                                },1000)


                                str=data+"";
                            },

                            async:true
                        });
                    }else if(data==='0'){
                        console.log(data);
                            $("#email").parent().append($('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>')).parent().addClass("has-warning has-feedback");


                    }

                },
                async:true

            })
        }
    })

    //表单操作
    $(".LogRe .form-control").focus(function(){
        $(this).keyup(function(){
            if($(this).val().trim()==""){
                $(this).siblings().remove();
                $(this).parent().parent().removeClass("has-warning has-feedback");
            }
        })

    })
    //注册表单验证



    $(".register").click(function(){
        //用户名
        var str1 = $("#userN").val();
        var ret1 = /^[a-zA-Z][a-zA-Z0-9_]{5,11}$/;
        //邮箱
        var str2 = $("#email").val();
        var ret2 = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        //密码
        var str3 = $("#userP").val();
        var ret3 = /^[a-zA-Z][a-zA-Z0-9_]{5,11}$/;

        var str4 = $("#rUserP").val();
       // var ret4 = /^[a-zA-Z][a-zA-Z0-9_]{5,20}$/;
        //验证码
        var str5=$("#idCode").val();

        if(ret1.test(str1)){
            $("#userN").siblings().remove();
            $("#userN").parent().parent().removeClass("has-warning has-feedback");
        }else{
            $("#userN").parent().append($('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>')).parent().addClass("has-warning has-feedback");
            return false;
        }
        if(ret2.test(str2)){
            $("#email").siblings().remove();
            $("#email").parent().parent().removeClass("has-warning has-feedback");
        }else{
            $("#email").parent().append($('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>')).parent().addClass("has-warning has-feedback");
            return false;
        }
        if(ret3.test(str3)){
            $("#userP").siblings().remove();
            $("#userP").parent().parent().removeClass("has-warning has-feedback");
        }else{
            $("#userP").parent().append($('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>')).parent().addClass("has-warning has-feedback");
            return false;
        }
        if(str3!==str4){
            $("#rUserP").parent().append($('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>')).parent().addClass("has-warning has-feedback");
            return false;
        }else{
            $("#rUserP").siblings().remove();
            $("#rUserP").parent().parent().removeClass("has-warning has-feedback");
        }
        if(str===str5&&str!==""){
            str="";
            $(this).attr("disabled","disabled");
            $("#idCode").siblings().remove();
            $("#idCode").parent().parent().removeClass("has-warning has-feedback");
            $('#register').modal('hide');
            $(this).removeAttr("disabled");
            $('#logIn').modal('show');
            $.ajax({
                type:"POST",
                url:"/create",
                data: { name:$("#register #userN").val(),
                    email:$("#register #email").val(),
                    password:$("#register #userP").val(),
                    logoUrl:"images/timg.jpg"
                },
                dataType: "json",
                success: function (data) {
                	
                    console.log("注册成功");

                },
                async:true

                })

        }else{
            $("#idCode").parent().append($('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>')).parent().addClass("has-warning has-feedback");
            return false;
        }

    })




    $("#logIn .form-control").focus(function(){
        $(this).keyup(function(){
            if($(this).val().trim()==""){
                $(this).siblings().remove();
                $(this).parent().parent().removeClass("has-warning has-feedback");
            }
        })

    })
    $(".logIn").click(function(){
        $.ajax({
            type:"POST",
            url:"/readEP",
            data: {
                email:$("#userName").val(),
                password:$("#userPassword").val()
            },
            dataType: "json",
            success:function (data) {

               if(data=="0"){
                   $("#userName").parent().append($('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>')).parent().addClass("has-warning has-feedback");
                   $("#userPassword").parent().append($('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>')).parent().addClass("has-warning has-feedback");

               }else if(data.email==$("#userName").val()){
               	
     				location.reload();
             
                   /* $('#logIn').modal('hide');
                   $("body").removeClass("modal-open").css("padding-right","0");

                   $(".modal-backdrop").remove();
                   $("ul.navbar-right").children().remove();

                   $("ul.navbar-right").append($("<li class='userMan'><a href='javascript:;'>欢迎你：<strong class='text-info'>"+data.name+"</strong></a><li>"))*/
               }
            },
            async:true

        })
    })
    //退出登录
    
    $(".logOut").bind("click",function(){
    	$.ajax({
    		type:"POST",
    		url:"/logOut",
    
    		success:function(data){
    			location.reload();
    		},
    		error:function(data){
    			
    		},
    		async:true
    	});
    })

})
