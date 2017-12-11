$(document).ready(function(){

	
	
	
	
	$(".sendLines").click(function(){
		var count=$(".panel-wrap").children().length;
		var line=$(".line").val();
		var movieName=$(".MovieName").text();
		if(line==''){
			alert("请填写评论")
		}else{
			
			$.ajax({
				type:"post",
				url:"./comment",
				data:{
					"name":movieName,
					"line":line
				},
				success:function(data){
					$(".line").val("");
					if($(".panel-wrap").children().eq(0).html().trim()=="您将是第一个评论者"){
						
						var str='<div class="panel-body"><div class="media"><div class="media-left"><span class="glyphicon glyphicon-hand-right"></span></div><div class="media-body"><h4 class="media-heading text-info">'+data.userInfo.name+'</h4>'+line+'</div></div></div>';
						$(str).appendTo($(".panel-wrap"));
						$(".panel-wrap").children().eq(0).remove();
					}else if(0<count&&count<3){
						var str='<div class="panel-body"><div class="media"><div class="media-left"><span class="glyphicon glyphicon-hand-right"></span></div><div class="media-body"><h4 class="media-heading text-info">'+data.userInfo.name+'</h4>'+line+'</div></div></div>';
						$(str).appendTo($(".panel-wrap"));
					}else{
						var str='<div class="panel-body"><div class="media"><div class="media-left"><span class="glyphicon glyphicon-hand-right"></span></div><div class="media-body"><h4 class="media-heading text-info">'+data.userInfo.name+'</h4>'+line+'</div></div></div>';
						$(str).appendTo($(".panel-wrap"));
						
					}
					
					
					//$(".panel-wrap").css("top","-"+top+"px");
				},
				async:true
			});
			
			
		}
	})
	
	
	$(".likeMovie").click(function(){
		if(!$(".userMan")){
			alert("此功能需要登录")
		}else{
			var likeCount=Number($(this).text());
			likeCount++;
			$(this).html('<span class="glyphicon glyphicon-heart"></span> '+likeCount);
			$(this).attr("disabled","disabled");
			$.ajax({
				type:"post",
				url:"/likeMovie",
				data:{
					numArr:getQueryString("number"),
					movieName:$(".MovieName").text().trim()
				},
				success:function(data){
					
				},
				async:true
			});
		}
	})
	
	
	
function getQueryString(name) {
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
var r = window.location.search.substr(1).match(reg);
if (r != null) return unescape(r[2]); return null;
} 
	
})
