
   var app=angular.module("myApp",[]);
    app.controller("paihang",function($scope,$http){
        var url="../res/paihang.json";
        $http.get(url).success(function(res){
            $scope.paihang=res;

        })


    })

	


$(document).ready(function(){
	
	$("#clownNav>ul>li").each(function(){
		$(this).removeClass("active");
		
	})
	$("#clownNav>ul>li").eq(0).addClass("active");
	
	
	//喜欢影片
	
	
	 $(document).on({click:function(e){
	        	if(this.className=="btn btn-danger likeMovie"){
	        		if(this.parentNode.className=="likeNo"){
	        			var wid=$(document.body).width();
	        			var top=$(document).scrollTop();
	        			$(".alert").css({"left":(wid-300)/2+"px","top":top+100+"px"}).css("display","block");
	        		}else if(this.parentNode.className=="likeYes"){
	        			var likeCount=Number($(this).text());
	        			var movieName=$(this).parent().parent().children("h3").text(); 
	        			var num=$(this).parent().parent().children("h3").children("a").attr("href");
	        			var numArr=num.split("=")[1];
	        			likeCount++;
	        			
	        			$(this).html('<span class="glyphicon glyphicon-heart"></span> '+likeCount);
	        			$(this).attr("disabled","disabled");
	        			$.ajax({
	        				type:"post",
	        				url:"/likeMovie",
	        				data:{
	        					movieName:movieName,
	        					numArr:numArr
	        				},
	        				success:function(data){
	        					
	        				},
	        				async:true
	        			});
	        			
	        		}
	        	}
	        }
        },"button")

    //不喜欢影片动画
        //初始化高度
    var arr=[];
    var clickNum=5;
		 $(document).on({click:function(e){
        	
	        	if(this.className=="btn btn-warning"){
	        		if(this.parentNode.className=="likeNo"){
	        			var wid=$(document.body).width();
	        			var top=$(document).scrollTop();
	        			$(".alert").css({"left":(wid-300)/2+"px","top":top+100+"px"}).css("display","block");
	        			
	        		}else{
		        	var mov= $(this).parent().parent().parent();
		        	
		        	var disMovieName=$(this).parent().parent().children("h3").text();  
		            clickNum++;
		            mov.css("transform","rotate(90deg)");
		            $.ajax({
		                type:"post",
		                url:"/",
		                data: {
		
		                },
		                dataType: "json",
		                success:function (data) {
		                    console.log(data.movie[0]);
		                    
		                    var str='<div class="thumbnail"><img src="'+data.movie[clickNum].imageUrl+'" alt="'+data.movie[clickNum].name+'"><div class="caption"><h3><a href="/singleMovie?number='+data.movie[clickNum].number+'">'+data.movie[clickNum].name+'</a></h3><p>'+ data.movie[clickNum].content+'</p> <p class="likeYes"> <button  class="btn btn-danger likeMovie" role="button"> <span class="glyphicon glyphicon-heart"></span>'+data.movie[clickNum].like+' </button> <button class="btn btn-warning" role="button"> <span class="glyphicon glyphicon-remove"></span> </button> </p> </div> </div>';
		                   setTimeout(function(){
		                   		$(str).appendTo( mov.parent());
		                       	mov.remove();
		                    },1100)
		
		                },
		                async:true
		
		            });
		            
		     
	        		}
	        	}
	        }
        },"button")

		$(".closeAlert").click(function(){
			$(".alert").css("display","none")
		})

})