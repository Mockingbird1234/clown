$(document).ready(function(){
	$(".blogWell").each(function(index,ele){
		$(this).mouseover(function(){
				$(".del").css("visibility","hidden");
				//alert(123)
				
				
				
				$(this).find("button").eq(0).css("visibility","visible");
				$(this).find("button").eq(0).click(function(){
					that=$(this);
					$.ajax({
						type:"post",
						url:"/delBlog",
						data:{
							name:$(".userMan strong").text(),
							"del":$(".delblog").html()
						},beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%");
	        				$(".load").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+200+"px"});
						},
						success:function(data){
							$(".load").css("display","none");
							that.parent().css("display","none");
						},
						async:true
					});
				})
		})
		
	})
})
