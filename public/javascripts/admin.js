
$(document).ready(function(){
	//初始化
	$(".bl").hide();
	$(".bl").eq(0).show();
	$(".nav-tabs").children("li").eq(2).click(function(){
		$(".movieUpdata input").val("");
		$('.movieUpdata input[name="number"]').removeAttr("disabled");
		$(".movieUpdata .sub").text("提交");
	})
	$(".nav-tabs").children("li").each(function(index,ele){
		
		$(this).click(function(){
			$(".nav-tabs").children("li").removeClass("active");
			$(this).addClass("active");
			$(".bl").hide();
			$(".bl").eq(index).show();
			if(index==0){
				location.reload();
			}else if(index==1){
				$(".movieMaseger button").removeClass("active");
				$(".movieMaseger button").eq(0).addClass("active")
				$(".movieMaseger tr").not(".movieMaseger tr:nth-child(1)").remove();
				$.ajax({
					type:"post",
					url:"./admin/movieSele",
					data: {
		                
		            },
		            dataType: "json",
		            beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
		            success:function (data) {
		            	$(".load").css("display","none");
		            	var str="";
		            	
		            	for(var i=0;i<data.length;i++){
		            		str+='<tr><td class="revise text-info">'+data[i].name+'</td><td>'+data[i].type+'</td><td>'+data[i].country+'</td><td>'+data[i].director+'</td><td>'+data[i].like+'</td></tr>';
		            	}
		            	$(str).appendTo(".movieMaseger .table");
		            	revise();
		            },
		            error:function(data){
		            	$(".movieMaseger .table").html("未找到影片");
		            },
					async:true
				});
			}else if(index==3){
				$.ajax({
					type:"post",
					url:"/admin/blog",
					data:{
						
					},
					beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
					success:function(data){
						$(".load").css("display","none");
						var str="";
		            	$(".blogMana tr").not(".blogMana tr:nth-child(1)").remove();
		            	for(var i=0;i<data.length;i++){
		            		str+='<tr class="trBlog"><td class="text-info">'+data[i].name+'</td><td class="emailb">'+data[i].email+'</td><td class="delContent">'+data[i].blogLine+'</td><td class="time">'+(new Date( data[i].time)).toString().slice(0,-9)+'</td><td class="delBlog text-info">删除</td></tr>';
		            	}
		            	$(str).appendTo(".blogMana .table");
		            	
		            	
		            	del();
		            	
					},
					async:true
				});
			}
		})
	})
	/*------------用户管理--------------*/
	//删除用户
	delUserN();
	//查找用户
	$(".searchUser").click(function(){
		$.ajax({
			type:"post",
			url:"/admin/singleBlog",
			data:{
				"name":$(".userName").val()
			},
			beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
			success:function(data){
				if(data.num=="1"){
					alert("没有该用户");
					$(".load").css("display","none");
				}else{
					//alert(data[0].blog.length)
					$(".load").css("display","none");
					$(".user tr").not(".user tr:nth-child(1)").remove();
					var str="";
					
					if(date.userInfo.isSuperAdmin){
						if(data.docs[0].isAdmin&&data.docs[0].isSuperAdmin){
							str='<tr class="delTr"><td>'+data.docs[0]._id+'</td><td>'+data.docs[0].name+'</td><td>'+data.docs[0].email+'</td><td>'+data.docs[0].password+'</td><td>'+data.docs[0].isAdmin+'</td><td><span>不可删除</span></td></tr>';
		           				
						}else{
							str='<tr class="delTr"><td>'+data.docs[0]._id+'</td><td>'+data.docs[0].name+'</td><td>'+data.docs[0].email+'</td><td>'+data.docs[0].password+'</td><td>'+data.docs[0].isAdmin+'</td><td class="delUser"><span>删除</span></td></tr>';
		           				
						}
					}else{
						if(data.docs[0].isAdmin){
							str='<tr class="delTr"><td>'+data.docs[0]._id+'</td><td>'+data.docs[0].name+'</td><td>'+data.docs[0].email+'</td><td>'+data.docs[0].password+'</td><td>'+data.docs[0].isAdmin+'</td><td><span>不可删除</span></td></tr>';
		           				
						}else{
							str='<tr class="delTr"><td>'+data.docs[0]._id+'</td><td>'+data.docs[0].name+'</td><td>'+data.docs[0].email+'</td><td>'+data.docs[0].password+'</td><td>'+data.docs[0].isAdmin+'</td><td class="delUser"><span>删除</span></td></tr>';
		           				
						}
					}
					
					
					$(str).appendTo(".user .table");
					delUserN();
				}
				
				
			},
			async:true
		});
	})

	
	
	
	/*------------电影管理---------------*/
	//电影类型筛选
	
	$(".movieMaseger button").not(".sort").each(function(index,ele){
		
		$(this).click(function(){
			$(".movieMaseger button").removeClass("active");
			$(this).addClass("active");
			$(".movieMaseger tr").not(".movieMaseger tr:nth-child(1)").remove();
			$.ajax({
					type:"post",
					url:"./admin/movieSele",
					data: {
		                "type":$(this).text()
		            },
		            dataType: "json",
		            beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
		            success:function (data) {
		            	$(".load").css("display","none");
		            	var str="";
		            	
		            	for(var i=0;i<data.length;i++){
		            		str+='<tr><td class="revise text-info">'+data[i].name+'</td><td>'+data[i].type+'</td><td>'+data[i].country+'</td><td>'+data[i].director+'</td><td>'+data[i].like+'</td></tr>';
		            	}
		            	$(str).appendTo(".movieMaseger .table");
		            	revise();
		            	
		            },
		            error:function(data){
		            	$(".movieMaseger .table").html("未找到影片");
		            },
					async:true
				});
		})
	})
	
	
	//管理界面电影查找
	
	$(".searchMovie").click(function(){
		
		$.ajax({
			type:"post",
			url:"./admin/singleMovie",
			data:{
				"name":$(".movieN").val()
			},
			beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
			success:function(data){
				if(data.num=="1"){
					alert("没有找到该影片");
					$(".load").css("display","none");
				}else{
					$(".load").css("display","none");
					$(".movieMaseger tr").not(".movieMaseger tr:nth-child(1)").remove();
					var str="";
			        str='<tr><td class="revise text-info">'+data.name+'</td><td>'+data.type+'</td><td>'+data.country+'</td><td>'+data.director+'</td><td>'+data.like+'</td></tr>';
	            	$(str).appendTo(".movieMaseger .table");
	            	revise();
				}
				
				
			},
			async:true
		});
	})
	//根据喜好电影数目进行排序
	
	$(".sort").click(function(){
		$(".movieMaseger button").removeClass("active");
			$(this).addClass("active");
			$(".movieMaseger tr").not(".movieMaseger tr:nth-child(1)").remove();
		$.ajax({
			type:"post",
			url:"./admin/sort",
			beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
			success:function(data){
				$(".load").css("display","none");
					var str="";
		            	
		            	for(var i=0;i<data.length;i++){
		            		str+='<tr><td class="revise text-info">'+data[i].name+'</td><td>'+data[i].type+'</td><td>'+data[i].country+'</td><td>'+data[i].director+'</td><td>'+data[i].like+'</td></tr>';
		            	}
		            	$(str).appendTo(".movieMaseger .table");
		            	revise();
			},
			async:true
		});
			
	})
	
	/*--------------电影录入-----------------*/
	
	//提交电影
	
	$(".movieUpdata .sub").click(function(){
		if($(".movieUpdata input").val()==""){
			alert("不能为空");
			return;
		}else{
			
			if($(this).text().trim()=="提交"){
				var line=[$("input[name='one']").val(),$("input[name='two']").val(),$("input[name='three']").val(),$("input[name='four']").val(),$("input[name='five']").val(),$("input[name='six']").val()];
				var lineStr=line.join("&");
				$.ajax({
						type:"post",
						url:"./admin/saveMovie",
						data: {
			                "number": $("input[name='number']").val(),
			                "name":$("input[name='name']").val(),
			                "releaseDate":$("input[name='releaseDate']").val(),
			                "director":$("input[name='director']").val(),
			                "type":$("input[name='type']").val(),
			                "country":$("input[name='country']").val(),
			                "imageUrl":$("input[name='imageUrl']").val(),
			                "directorUrl":$("input[name='directorUrl']").val(),
			                "videoUrl":$("input[name='videoUrl']").val(),
			                "content":$("input[name='content']").val(),
			                "like":$("input[name='like']").val(),
			                "old":$("input[name='old']").val(),
			                "lineArray":lineStr
			           		
						},
			            dataType: "json",
			            beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
			            success:function (data) {
			            $(".load").css("display","none");
			            	if(data.error=="0"){
			            		alert("存入失败")
			            	}
			            	if(data.success=="1"){
			            		alert("存入成功")
			            		$("input").not(".search").val("");
			            	}
			            	
			            },
			            error:function(data){
			            	$(".movieMaseger .table").html("未找到影片");
			            },
						async:true
					});
			}else if($(this).text().trim()=="修改"){
				var line=[$("input[name='one']").val(),$("input[name='two']").val(),$("input[name='three']").val(),$("input[name='four']").val(),$("input[name='five']").val(),$("input[name='six']").val()];
				var lineStr=line.join("&");
				$.ajax({
						type:"post",
						url:"./admin/reviseMovie",
						data: {
			                "number": $("input[name='number']").val(),
			                "name":$("input[name='name']").val(),
			                "releaseDate":$("input[name='releaseDate']").val(),
			                "director":$("input[name='director']").val(),
			                "type":$("input[name='type']").val(),
			                "country":$("input[name='country']").val(),
			                "imageUrl":$("input[name='imageUrl']").val(),
			                "directorUrl":$("input[name='directorUrl']").val(),
			                "videoUrl":$("input[name='videoUrl']").val(),
			                "content":$("input[name='content']").val(),
			                "like":$("input[name='like']").val(),
			                "old":$("input[name='old']").val(),
			                "lineArray":lineStr
			           		
						},
			            dataType: "json",
			            beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
			            success:function (data) {
			            	$(".load").css("display","none");
			            	if(data.success=="1"){
			            		alert("修改成功")
			            		$("input").not(".search").val("");
			            	}
			            	
			            },
			            error:function(data){
			            	$(".movieMaseger .table").html("未找到影片");
			            },
						async:true
					});
			}
			
			
		
		}
		
		
	})
	
	/*---------------博客管理----------------*/
		
	//发表博客按照用户排序
	
	$(".blogMana button").each(function(index,ele){
		$(this).click(function(){
			$(".blogMana button").removeClass("active");
			$(this).addClass("active");
			$.ajax({
				type:"post",
				url:"/admin/blogmo",
				data:{
					"type":$(this).text()
				},
				beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
				success:function(data){
						$(".load").css("display","none");
						var str="";
		            	$(".blogMana tr").not(".blogMana tr:nth-child(1)").remove();
		            	for(var i=0;i<data.length;i++){
		            		str+='<tr class="trBlog"><td class="text-info">'+data[i].name+'</td><td class="emailb">'+data[i].email+'</td><td class="delContent">'+data[i].blogLine+'</td><td class="time">'+data[i].time.toString().slice(0,-5).split("T").join(" ")+'</td><td class="delBlog text-info">删除</td></tr>';
		            	}
		            	$(str).appendTo(".blogMana .table");
						del()
				},
				async:true
			});
		})
	})
	//博客板块查找用户
	
	$(".searchBlog").click(function(){
		
		$.ajax({
			type:"post",
			url:"./admin/singleBlog",
			data:{
				"name":$(".blogN").val()
			},
			beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
			success:function(data){
				if(data.num=="1"){
					alert("没有该用户");
					$(".load").css("display","none");
				}else{
					//alert(data[0].blog.length)
					$(".load").css("display","none");
					$(".blogMana tr").not(".blogMana tr:nth-child(1)").remove();
					var str="";
	            	for(var i=0;i<data[0].blog.length;i++){
	            		str+='<tr class="trBlog"><td class="text-info">'+data.docs[0].blog[i].name+'</td><td class="emailb">'+data.docs[0].email+'</td><td class="delContent">'+data.docs[0].blog[i].blogLine+'</td><td class="time">'+(data.docs[0].blog[i].time)+'</td><td class="delBlog text-info">删除</td></tr>';
	            	}
	            	//alert(str)
	            	$(str).appendTo(".blogMana .table");
	            	del();
				}
				
			},
			async:true
		});
	})
	
	
	//删除用户
	function delUserN(){
			$(".delUser").each(function(index,ele){
		$(this).click(function(){
			//alert($(this).siblings(".email").eq(0).html());
					$.ajax({
						type:"post",
						url:"/admin/delUser",
						data:{
							name:$(".userMan strong").text(),
							"delUser":$(this).siblings(".email").eq(0).html()
						},
						beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
						success:function(data){
							$(".load").css("display","none");
							$(".delTr").eq(index).css("display","none");
						},
						async:true
					});
			
			
			
		})
	})
	}
	


	
	
	
	
	//删除博客
	function del(){
		$(".delBlog").each(function(index,ele){
		$(this).click(function(){
			//alert("1111")
			//alert($(this).siblings(".email").eq(0).html());
					$.ajax({
						type:"post",
						url:"/admin/delBlog",
						data:{
							name:$(".userMan strong").text(),
							"delBlog":$(this).siblings(".emailb").eq(0).html(),
							"delContent":$(this).siblings(".delContent").eq(0).html()
						},
						beforeSend:function(){
							var wid=$(document.body).width();
	        				var top=$(document).scrollTop();
	        				$(".load").css("width","100%").css("height","100%").css("display","block");
	        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
						},
						success:function(data){
							$(".load").css("display","none");
							$(".trBlog").eq(index).css("display","none");
						},
						async:true
					});
			
			
			
		})
	})
	}
	
	//添加用户
	var a=true;
	$(".adduser").click(function(){
		if(a){
			$(".userTable").removeClass("hide").addClass("show");
		}else{
			$(".userTable").removeClass("show").addClass("hide");
		}
		
		a=!a;
	})
	
	
	$(".add").click(function(){
        //邮箱
        var str2 = $("input[name='email']").val();
        var ret2 = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
      
        
        if(!ret2.test(str2)){
        	alert("输入正确的邮箱");
        	return false;
        }
        
		
			if($(".userTable input").eq(0).val().trim()==""){
				alert("请输入用户名");
				return;
			}
			if($(".userTable input").eq(1).val().trim()==""){
				alert("请输入邮箱");
				return;
			}
			if($(".userTable input").eq(2).val().trim()==""){
				alert("请输入密码");
				return;
			}
			if($(".userTable input").eq(3).val().trim()==""){
				alert("请输入Y/N");
				return;
			}
			
			$.ajax({
				type:"post",
				url:"/admin/adduserys",
				data:{
					"name":$("input[name='username']").val(),
					"email":$("input[name='email']").val(),
					"password":$("input[name='password']").val(),
					"isadmin":$("input[name='admin']").val()
				},
				success:function(data){
					//alert(data.num);
					if(data.num=="0"){
						alert("该邮箱已存在");
						
						return false;
					}else{
						$.ajax({
							type:"post",
							url:"/admin/adduser",
							data:{
								"name":$("input[name='username']").val(),
								"email":$("input[name='email']").val(),
								"password":$("input[name='password']").val(),
								"isadmin":$("input[name='admin']").val()
							},
							beforeSend:function(){
								var wid=$(document.body).width();
		        				var top=$(document).scrollTop();
		        				$(".load").css("width","100%").css("height","100%").css("display","block");
		        				$(".load img").css({"left":(wid-300)/2+"px","top":top+100+"px"});
							},
							success:function(data){
								$(".load").css("display","none");
								alert("添加成功");
							},
							async:true
						});
					}
				},
				async:true
			});
			
	})
	
	
	
	function revise(){
		$(".revise").each(function(index,ele){
			$(this).click(function(){
				var movieName=$(this).text();
				
				$.ajax({
					type:"post",
					url:"./admin/revise",
					data: {
		                "name":movieName
		            },
		            dataType: "json",
		            success:function (data) {
		            	$('.movieUpdata input[name="number"]').attr("disabled","disabled");
		            	 $("input[name='number']").val(data[0].number);
		       			$("input[name='name']").val(data[0].name);
		                $("input[name='releaseDate']").val(data[0].releaseDate);
		                $("input[name='director']").val(data[0].director);
		                $("input[name='type']").val(data[0].type);
		                $("input[name='country']").val(data[0].country);
		                $("input[name='imageUrl']").val(data[0].imageUrl);
		                $("input[name='directorUrl']").val(data[0].directorUrl);
		                $("input[name='videoUrl']").val(data[0].videoUrl);
		                $("input[name='content']").val(data[0].content);
		                $("input[name='like']").val(data[0].like);
		                $("input[name='old']").val(data[0].old);
		            	$("input[name='one']").val(data[0].lines[0]);
		            	$("input[name='two']").val(data[0].lines[1]);
		            	$("input[name='three']").val(data[0].lines[2]);
		            	$("input[name='four']").val(data[0].lines[3]);
		            	$("input[name='five']").val(data[0].lines[4]);
		            	$("input[name='six']").val(data[0].lines[5]);
		            	$(".movieUpdata .sub").text("修改");
		            	$(".nav-tabs").children("li").removeClass("active").eq(2).addClass("active");
						$(".bl").hide();
						$(".bl").eq(2).show();
		            },
		            error:function(data){
		            	
		            },
					async:true
				});
				
			})
		})
	}
	
})
