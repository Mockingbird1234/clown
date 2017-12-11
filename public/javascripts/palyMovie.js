$(document).ready(function(){
		$("#clownNav>ul>li").each(function(){
			$(this).removeClass("active");
			
		})
	$("#clownNav>ul>li").eq(3).addClass("active");
	
	
	
	
	
	
	if($(".userMan strong.text-info").text().trim()!==""){
		//定义Hichat类
			var HiChat=function(){
				this.socket=null;
			}
			
			//向原型添加方法
			HiChat.prototype={
				init:function(){//初始化程序
					var that=this;
					//建立到服务器的socket连接
					this.socket=io.connect();
					//监听socket的connect事件，此事件表示连接已建立
					this.socket.on('connect',function(){
					
					})
					//昵称设置确定按钮
					var nickName=$(".userMan strong.text-info").text();
					that.socket.emit('login',nickName);
					
					document.getElementById("sendBtn").addEventListener('click',function(){
						var messageInput=document.getElementById("messageInput"),
							msg=messageInput.value;
							//color=document.getElementById("colorStyle").value;
						messageInput.value='';
						messageInput.focus();
						if(msg.trim().length!=0){
							that.socket.emit('postMsg',msg,'green');
							that.displayNewMsg('me',msg,'green');
						}
					},false);
					
					document.getElementById("messageInput").addEventListener('keyup',function(e){
						var messageInput=document.getElementById("messageInput"),
							msg=messageInput.value;
						if(e.keyCode==13&&msg.trim().length!=0){
							messageInput.value='';
							that.socket.emit('postMsg',msg,'green');
							that.displayNewMsg('me',msg,'green');
						}
					},false);
				
					this.socket.on('loginSuccess',function(){
						document.getElementById("messageInput").focus();//让输入框获得焦点
					})
					this.socket.on('system',function(nickName,userCount,type){
						//判断用户是连接还是离开已显示不同的信息
						var msg=nickName+' - '+(type=='login'?'加入':'离开');
						that.displayNewMsg('小丑网',msg,'#191970');
						//将在线人数显示到页面底部
						document.getElementById("status").textContent=userCount+'名用户在线';
					})
					this.socket.on('newMsg',function(user,msg,color){
						that.displayNewMsg(user,msg,'#008B8B');
					})
				
				},
				displayNewMsg:function(user,msg,color){
					var container=document.getElementById("historyMsg"),
						msgToDisplay=document.createElement("p"),
						date=new Date().toTimeString().substr(0,8);
						//将消息中的表情转化成图片
						//msg=this.showEmoji(msg);
					msgToDisplay.style.color=color||'#000';
					msgToDisplay.innerHTML=user+'<span class="timespan">('+date+'):</span>'+msg;
					container.appendChild(msgToDisplay);
					container.scrollTop=container.scrollHeight;
				}
}
			
				//实例并初始化HiChat程序
				var hichat=new HiChat();
				hichat.init();

		
	}
			
})

