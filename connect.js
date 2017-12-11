
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;//解决过期问题
mongoose.set('debug',true);
var db=mongoose.connect('mongodb://Mockingbird:liubin19940111@ds159330.mlab.com:59330/clownm');
//var db=mongoose.connect('mongodb://localhost/clownMovie');



db.connection.on('error',function(err){
    console.log('数据库连接失败'+err);
})

db.connection.on('open',function(){
    console.log('数据库连接成功');
})