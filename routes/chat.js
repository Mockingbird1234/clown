
/*//服务器及页面的响应部分
var express=require('express'),//引入express模块
	router = express.Router(),
	app=express();
	server=require('http').createServer(app),
	io=require('socket.io').listen(server),//引入socket.io模块并且绑定到服务器
	users=[];//保存所有在线用户的昵称
*/

/*var express = require('express');
var router = express.Router();
var socket_io = require('socket.io');*/
var express=require('express'),//引入express模块
	router = express.Router(),
	app=express();
	server=require('http').createServer(app),
	socket_io = require('socket.io'),
	users=[];

router.prepareSocketIO = function (server) {
	 var io = socket_io.listen(server);
	 io.on('connection',function(socket){

	//接收并处理客户端发送的login事件(昵称设置)
	socket.on('login',function(nickname){
			socket.userIndex=users.length;
			socket.nickname=nickname;
			users.push(nickname);
			io.sockets.emit('system',nickname,users.length,'login')//向所有连接到服务器的客户端发送刚登陆用户的昵称
		
	})
	
	//断开连接的时间
	socket.on('disconnect',function(){
		//将断开连接的用户从users删除
		users.splice(socket.userIndex,1);
		//通知除自己以外的所有人
		socket.broadcast.emit('system',socket.nickname,users.length,'loginout');
	})
	//接收新消息
	socket.on('postMsg',function(msg){
		//将消息发送到除自己外的其他用户
		socket.broadcast.emit('newMsg',socket.nickname,msg);
	})
	
})

}




module.exports = router;