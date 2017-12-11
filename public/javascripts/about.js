$(document).ready(function(){
	var arr=[
		"电影，也称映画。是由活动照相术和幻灯放映术结合发展起来的一种现代艺术。是一门可以容纳文学戏剧、摄影、绘画、音乐、舞蹈、文字、雕塑、建筑等多种艺术的综合艺术，但它又具有独自的艺术特征。电影在艺术表现力上不但具有其它各种艺术的特征，又因可以运用蒙太奇这种艺术性极强的电影组接技巧，具有超越其它一切艺术的表现手段，而且影片可以大量复制放映。",
		" 小丑网创建于2017年，是一家用来展示电影的网站，并不是一家可在线观看电影资源的网站，正版电影请到授权网站观看（支持正版(●'◡'●)），网站上的短视频资源来自bilibili。网站作者是一个即将毕业（可能你看到已经毕业了）的学生，如果您对哪部电影感兴趣可以注册我们的网站参与评论，也可以联系我一起交流讨论(●'◡'●)。",
		"一个对前端感兴趣并想以此作为职业的应届毕业生，大三上半年开始接触web，熟悉html，css，js，ps切图，了解jquery,bootstrap，AngularJS，小丑网用到express框架，所以对express和mvc框架有一定了解，了解xss跨站脚本方面的知识，现阶段正深入学习js和nodejs。喜欢足球，看电影。"
		];
	var imgArr=[
		"./images/about/clown.jpeg",
		"./images/about/bg.jpg",
		"./images/timg.jpg"
		]
	$(".list-li li").each(function(index,ele){
		$(this).click(function(){
			$(".list-li li").removeClass("active");
			$(this).addClass("active");
			$(".disp img").attr("src",imgArr[index]);
			$(".disp p").text(arr[index]);
		})
	})
})
