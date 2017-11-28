$(document).ready(function(){
		//blog
	$("#clownNav>ul>li").each(function(){
			$(this).removeClass("active");
			
		})
	$("#clownNav>ul>li").eq(2).addClass("active");
	
	
	//console.log($(".logoUser")[0].href)
	
	$(".sendLine").click(function(){
		
		
		var str=$(".textArea").val().trim();
		if(str==""){
			$(".textArea").parent().addClass("has-warning");
			return false;
		}
		 var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    //显示当前时间
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    //alert($(".logoUser").eq(0).attr("src"))
		$.ajax({
			type:"post",
			url:"/sendBlog",
			data:{
				blogLine:str,
				name:$(".userMan strong").text(),
				time:currentdate,
				logoUrl:$(".logoUser").eq(0).attr("src")
			},
			success:function(data){
				$("#myModal").modal('hide'); 
				location.href="./blog";
			},
			error:function(){
				
			},
			async:true
		});
	})
	
	//加载更多blog
	var count=0;
	$(".slideDown").click(function(){
		count++;
		$.ajax({
			type:"post",
			url:"/moreBlog",
			data:{
				count:count
			},
			success:function(data){
				
				if(data.hasBlog=="no"){
					var str='';
					
					for(var i=0;i<data.blog.length;i++){
						timeBlog=data.blog[i].time.toString().slice(0,-5).split("T").join(" ");
						str+='<div class="media blogImg"><div class="media-left"><a href="#"><img class="media-object" src="'+data.blog[i].logoUrl+'" alt="头像"></a></div><div class="media-body"><h4 class="media-heading text-primary">'+data.blog[i].name+'</h4><p class="text-default"><span class="">'+data.blog[i].blogLine+'</span><span class="pull-right text-muted">'+timeBlog+'</span></p></div></div>';
					}
					
					$(str).appendTo($(".blogWrap"));
					$(".slideSpan").removeClass("glyphicon glyphicon-chevron-down").addClass("text-muted").html("已加载全部");
				}else{
					var str='';
					
					for(var i=0;i<data.blog.length;i++){
						timeBlog=data.blog[i].time.toString().slice(0,-5).split("T").join(" ");
						str+='<div class="media blogImg"><div class="media-left"><a href="#"><img class="media-object" src="'+data.blog[i].logoUrl+'" alt="头像"></a></div><div class="media-body"><h4 class="media-heading text-primary">'+data.blog[i].name+'</h4><p class="text-default"><span class="">'+data.blog[i].blogLine+'</span><span class="pull-right text-muted">'+timeBlog+'</span></p></div></div>';
					}
					
					$(str).appendTo($(".blogWrap"));
				}
				
				
				
	
			},
			async:true
		});
	})
	
})
