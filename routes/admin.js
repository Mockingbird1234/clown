
var stu=require('../mongoose-db.js');
var express = require('express');
var router = express.Router();

/*------------判断用户类型----------------*/
router.use(function(req,res,next){
	console.log(req.userInfo)
	if(req.userInfo==undefined){
		res.render("login",{});

		return;
	}else if(!req.userInfo.isAdmin){
		
		//如果当前是非管理员
		res.send('<h1>您不是管理员，可访问网站其他板块<a href="/">返回首页</a></h1>');
		return;
	}
	next();
})


/*------------------后台管理页面-----------------*/

router.get('/', function(req, res, next) {

	stu.MyMovie.count({},function(err,movieCount){
			stu.MyStudent.find({},function(err,docs){
			  res.render("admin",{"users":docs,"movieCount":movieCount,"userInfo":req.userInfo});
			});
	})
});

/*------------用户管理------------*/

//添加用户

router.post('/adduser', function(req, res, next) {
	
	var name=req.body.name;
	var email=req.body.email;
	var password=req.body.password;
	var isadmin=req.body.isadmin;
	console.log(isadmin.toUpperCase())
	if(isadmin.toUpperCase()=="Y"){
		console.log("管理员注册")
		var obj={
                "name":name,
                "email":email,
                "password":password,
                "isAdmin":true
         }
		var mov=new stu.MyStudent(obj);
		 mov.save(function(err){
			        if(err){
			            console.log(err);
			        }
			        res.send({});
	    });
		
	}else{
		var obj={
                "name":name,
                "email":email,
                "password":password,
                "isAdmin":false
         }
		var mov=new stu.MyStudent(obj);
		 mov.save(function(err){
			        if(err){
			            console.log(err);
			        }
			        res.send({});
	    });
	}
	
})

//判断用户是否存在
router.post('/adduserys',function(req,res,next){
	console.log("开始判断用户");
	var name=req.body.name;
	var email=req.body.email;
	var password=req.body.password;
	var isadmin=req.body.isadmin;
	

		//判断邮箱是否重复
		stu.MyStudent.findOne({
	        email:email
	    },function(err,docs){
	        console.log(docs);
	        if(docs==null){
	            console.log('可注册');
	            res.send({num:"1"});
	        }else if(docs.email===req.body.email){
	            res.send({num:"0"});
	            console.log('已注册');
	
	        }else if(docs.email!==req.body.email){
	            console.log('可注册');
	            res.send({num:"1"});
	
	        }else{
	            console.log('报错'+err)
	        }
	    })	
	
})

//删除用户


router.post('/delUser',function(req,res,next){

		stu.MyStudent.remove({email:req.body.delUser},function(err,docs){
			stu.MyBlog.remove({"email":req.body.delUser},function(err,docs2){
				res.send({});
		})
				
		})
	
})


/*-------------电影管理---------------*/


//单一电影选择

router.post('/singleMovie',function(req,res,next){
	console.log("开始查找影片");
	var name=req.body.name;
	
		//判断邮箱是否重复
		stu.MyMovie.findOne({
	        name:name
	    },function(err,docs){
	        console.log(docs);
	        if(docs==null){
	            console.log('没有电影');
	            res.send({num:"1"});
	        }else if(docs.name===req.body.name){
	            res.send(docs);
	            console.log('找到电影');
	
	        }else if(docs.email!==req.body.email){
	            console.log('没有电影');
	            res.send({num:"1"});
	
	        }else{
	            console.log('报错'+err)
	        }
	    })	
	
})


//电影修改
router.post('/revise', function(req, res, next) {
	
	var name="肖申克的救赎";
	if(req.body.name){
		name=req.body.name;
	}
	stu.MyMovie.find({"name":{$regex:name}},function(err,docs){
		res.send(docs);
	})
})

//电影排序

router.post('/sort', function(req, res, next) {

		stu.MyMovie.find({},function(err,docs){
			res.send(docs);
		}).sort({"like":-1});
			

	
	
})


/*------------博客管理---------------*/

//用户博客选择

router.post('/singleBlog',function(req,res,next){
	console.log("开始查找用户");
	var email=req.body.name;
	
		//判断邮箱是否重复
		stu.MyStudent.find({
	        email:email
	    },function(err,docs){
	        console.log(docs);
	        if((docs==null)||(docs.length==0)){
	            console.log('没有用户');
	            res.send({num:"1"});
	        }else{
	            res.send({docs:docs,userInfo:req.userInfo});
	            console.log('找到用户');
	
	        }
	    })	
	
})


//电影类型选择
router.post('/movieSele', function(req, res, next) {
	
	var type="动作";
	if(req.body.type){
		type=req.body.type;
	}
	stu.MyMovie.find({"type":{$regex:type}},function(err,docs){
		res.send(docs);
	}).sort({"like":-1})
})


//电影提交
router.post('/saveMovie', function(req, res, next) {
	stu.MyMovie.count({"number":req.body.number},function(err,docs){
		if(docs){
			res.send({"error":"0"});
			return false;
		}
		var obj={
           		"number": req.body.number,
                "name":req.body.name,
                "releaseDate":req.body.releaseDate,
                "director":req.body.director,
                "type":req.body.type,
                "country":req.body.country,
                "imageUrl":req.body.imageUrl,
                "directorUrl":req.body.directorUrl,
                "videoUrl":req.body.videoUrl,
                "content":req.body.content,
                "like":req.body.like,
                "old":req.body.old
          };
          var lineArray=(req.body.lineArray).split("&");
          
           var mov=new stu.MyMovie(obj);
	        mov.save(function(err){
			        if(err){
			            console.log(err);
			        }else{
			           stu.MyMovie.update({"number":req.body.number},{$addToSet:{lines:{$each:lineArray}}},function(err,docs){
		
						})
			        }
	    	});
	    	res.send({"success":"1"});
	    	return true;
		 
	})
	
})
  //电影修改
router.post('/reviseMovie', function(req, res, next) {
	stu.MyMovie.count({"number":req.body.number},function(err,docs){
		stu.MyMovie.remove({"number":req.body.number},function(err,docs){
			console.log("删除成功");
			var obj={
           		"number": req.body.number,
                "name":req.body.name,
                "releaseDate":req.body.releaseDate,
                "director":req.body.director,
                "type":req.body.type,
                "country":req.body.country,
                "imageUrl":req.body.imageUrl,
                "directorUrl":req.body.directorUrl,
                "videoUrl":req.body.videoUrl,
                "content":req.body.content,
                "like":req.body.like,
                "old":req.body.old
          };
          var lineArray=(req.body.lineArray).split("&");
          
           var mov=new stu.MyMovie(obj);
	        mov.save(function(err){
			        if(err){
			            console.log(err);
			        }else{
			           stu.MyMovie.update({"number":req.body.number},{$addToSet:{lines:{$each:lineArray}}},function(err,docs){
		
						})
			        }
	    	});
	    	res.send({"success":"1"});
	    	return true;
		})
		
		 
	})
	
})


/*--------------博客管理------------------*/

//博客管理
router.post('/blog', function(req, res, next) {

		stu.MyBlog.find({},function(err,docs){
			res.send(docs);
		}).sort({"time":-1});
			

	
	
})

//博客排序

router.post('/blogmo', function(req, res, next) {
		var type=req.body.type;
		
		if(type.trim()=="根据时间排序"){
			stu.MyBlog.find({},function(err,docs){
				res.send(docs);
			}).sort({"time":-1});
		}else if(type.trim()=="根据用户排序"){
			stu.MyBlog.find({},function(err,docs){
				res.send(docs);
			}).sort({"email":-1});
		}
		
			

	
	
})


//管理员删除博客


router.post('/delBlog',function(req,res,next){
	console.log("开始删除博客")
	stu.MyStudent.update({"email":req.body.delBlog},{"$pull":{blog:{blogLine:req.body.delContent}}},function(err,docs){
			stu.MyBlog.remove({"email":req.body.delBlog,"blogLine":req.body.delContent},function(err,docs2){
				res.send({});
			})
		
		
	})
	
	
})





module.exports = router;
