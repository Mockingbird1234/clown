

	window.onload=function(){
		//初始化top
	
		function moveSlice(){
			var top=$(".slice").eq(0).innerHeight();
			$(".slice").each(function(index,ele){
				$(this).bind("mouseover",function(){
					$(".hideSlice").eq(index).css("top","0");
				})
				
				$(this).bind("mouseout",function(){
					$(".hideSlice").eq(index).css("top",top+"px");
				})
			})
		}
		
		$("#clownNav>ul>li").each(function(){
			$(this).removeClass("active");
			
		})
		$("#clownNav>ul>li").eq(1).addClass("active")
		/*$(".slice").mouseover(function(index,ele){
			console.log(ele)
			timer=setInterval(function(){
				$(".hideSlice").css("top","-=5")
			},100)
			
		})*/
		setTimeout(moveSlice,100)
	
		window.onresize=function(){
			moveSlice();
		}
	
	//筛选电影
	
	/*$(".type button").each(function(index,ele){
		$(this).bind('click',function(){
			$(".type button").removeClass("active");
			$(this).addClass("active");
		})
	})*/
	var type='';
	var time='';
	var country='';
	var typeOn=true;
	var timeOn=true;
	var countryOn=true;
	$(".type button").bind('click',function(){
		if(typeOn){
			$(".type button").removeClass("active");
			$(this).addClass("active");
			type=$(this).text();
		}else{
			$(".type button").removeClass("active");
			type=''
		}
		typeOn=!typeOn;
	})
	$(".time button").bind('click',function(){
		if(timeOn){
			$(".time button").removeClass("active");
			$(this).addClass("active");
			time=$(this).text();	
		}else{
			$(".time button").removeClass("active");
			time='';
		}
		timeOn=!timeOn;
	})
	$(".country button").bind('click',function(){
		if(countryOn){
			$(".country button").removeClass("active");
			$(this).addClass("active");
			country=$(this).text();
		}else{
			$(".country button").removeClass("active");
			country='';
		}
		countryOn=!countryOn;
	});
	
	
	$(".btnOk").bind('click',function(){
		location.href="./movies?type="+type+"&time="+time+"&country="+country;
	})
	
	var pageW=$(".page").width();
	$(".page").css("width",pageW+"px").addClass("center-block");
	

	
}
	
	

