var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs=require('ejs');
var stud=require('./mongoose-db');
var app = express();

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var chat = require('./routes/chat');
// view engine setup
app.set('views', path.join(__dirname, './views'));
app.engine('html',ejs.__express);
app.set('view engine', 'ejs');

//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    next();  
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//传递server
 app.ready=function(server){
  chat.prepareSocketIO(server);
};

 


//设置cookie
app.use(function(req,res,next){
	req.cookies=new Cookies(req,res);
	//解析登陆用户cookie
	var userInfo={};
	if(req.cookies.get('userInfo')){
		try{
			
			req.userInfo=JSON.parse(req.cookies.get('userInfo'));
			
			//获取当前用户登录的类型
			stud.MyStudent.findOne({"email":req.userInfo.email},function(err,docs){
				req.userInfo=docs;
				next();
			})
			
		}catch(e){
			
		}
	}else{
		next();
	}
	

})





app.use('/', index);
app.use('/users', users);
app.use('/chat', chat);	
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render('error');
});

module.exports = app;
