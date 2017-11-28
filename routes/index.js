var stu=require('../mongoose-db');
var express = require('express');
var formidable=require('formidable');
var router = express.Router();
var util=require('util');
var nodemailer=require('nodemailer');
var pachong=require('../pachong.js');
var emailW="";

/*-------------get方式请求页面------------------*/

/* GET home page. */
router.get('/', function(req, res, next) {
	res.set({
        'Content-Type': 'text/html'
    });
    stu.MyMovie.find({},function(err,docs){
       // res.send({"movie":docs});
       stu.MyBanner.find({},function(err,docs2){
       	 res.render('index',{"movie":docs,"banner":docs2,"userInfo":req.userInfo});
       })
     

    })

});

//所有影片
router.get('/movies', function(req, res, next) {
	//初始化

	var type=req.query.type||'';
	
	var country=req.query.country||'';

	var time=req.query.time||'';
	
	var name=req.query.name||'';
	
	
	var perPage=16;
	
	var page=Number(req.query.page)||1;
	 res.set({
        'Content-Type': 'text/html'
    });
	
	if(time=="更早"){
		time=["2017","2016","2015","2014","2013","2012","2011"];
		stu.MyMovie.count({"type":{$regex:type},"releaseDate":{$nin:time},"country":{$regex:country}},function(err,count){
			
			var pageCount=0;
			if(page>Math.ceil(count/perPage)){
				page=Math.ceil(count/perPage);
				if(page==0){
					page=1;
				}
			}else if(page<1){
				page=1;
			}
			console.log(page)
			if(count<=perPage){
				pageCount=count;
			}else if(count>perPage&&(count-(page-1)*perPage)<perPage){
				pageCount=count-(page-1)*perPage
			}else{
				pageCount=perPage;
			}
			
			console.log(pageCount)
			stu.MyMovie.find({"type":{$regex:type},"releaseDate":{$nin:time},"country":{$regex:country}},function(err,docs){
	   			res.render('movies',{"movie":docs,"userInfo":req.userInfo,'count':count,'pageCount':pageCount,'page':page,'type':[type,time,country]});
		   	}).limit(pageCount).skip((page-1)*perPage).sort({"like":-1});
	   	
		})
		return;
		
	}
	
	if(country=="其他"){
		country=["大陆","美国","韩国","日本","英国","意大利","印度"];
		stu.MyMovie.count({"type":{$regex:type},"releaseDate":{$regex:time},"country":{$nin:country}},function(err,count){
			
			var pageCount=0;
			if(page>Math.ceil(count/perPage)){
				page=Math.ceil(count/perPage);
				if(page==0){
					page=1;
				}
			}else if(page<1){
				page=1;
			}
			console.log(page)
			if(count<=perPage){
				pageCount=count;
			}else if(count>perPage&&(count-(page-1)*perPage)<perPage){
				pageCount=count-(page-1)*perPage
			}else{
				pageCount=perPage;
			}
			
			console.log(pageCount)
			stu.MyMovie.find({"type":{$regex:type},"releaseDate":{$regex:time},"country":{$nin:country}},function(err,docs){
	   			res.render('movies',{"movie":docs,"userInfo":req.userInfo,'count':count,'pageCount':pageCount,'page':page,'type':[type,time,country]});
		   	}).limit(pageCount).skip((page-1)*perPage).sort({"like":-1});
	   	
		})
		return;
		
	}
	
	if(time=="更早"&&country=="其他"){
		time=["2017","2016","2015","2014","2013","2012","2011"];
		country=["大陆","美国","韩国","日本","英国","意大利","印度"];
		stu.MyMovie.count({"type":{$regex:type},"releaseDate":{$nin:time},"country":{$nin:country}},function(err,count){
			
			var pageCount=0;
			if(page>Math.ceil(count/perPage)){
				page=Math.ceil(count/perPage);
				if(page==0){
					page=1;
				}
			}else if(page<1){
				page=1;
			}
			console.log(page)
			if(count<=perPage){
				pageCount=count;
			}else if(count>perPage&&(count-(page-1)*perPage)<perPage){
				pageCount=count-(page-1)*perPage
			}else{
				pageCount=perPage;
			}
			
			console.log(pageCount)
			stu.MyMovie.find({"type":{$regex:type},"releaseDate":{$nin:time},"country":{$nin:country}},function(err,docs){
	   			res.render('movies',{"movie":docs,"userInfo":req.userInfo,'count':count,'pageCount':pageCount,'page':page,'type':[type,time,country]});
		   	}).limit(pageCount).skip((page-1)*perPage).sort({"like":-1});
	   	
		})
		return;
		
	}
	
	stu.MyMovie.count({"type":{$regex:type},"releaseDate":{$regex:time},"country":{$regex:country},"name":{$regex:name}},function(err,count){
			
			var pageCount=0;
			if(page>Math.ceil(count/perPage)){
				page=Math.ceil(count/perPage);
				if(page==0){
					page=1;
				}
			}else if(page<1){
				page=1;
			}
			console.log(page)
			if(count<=perPage){
				pageCount=count;
			}else if(count>perPage&&(count-(page-1)*perPage)<perPage){
				pageCount=count-(page-1)*perPage
			}else{
				pageCount=perPage;
			}
			
			console.log(pageCount+"嘻嘻")
			stu.MyMovie.find({"type":{$regex:type},"releaseDate":{$regex:time},"country":{$regex:country},"name":{$regex:name}},function(err,docs){
	   			res.render('movies',{"movie":docs,"userInfo":req.userInfo,'count':count,"name":name,'pageCount':pageCount,'page':page,'type':[type,time,country]});
		   	}).limit(pageCount).skip((page-1)*perPage).sort({"like":-1});
	   	
	})
   

});

//详情页
router.get('/singleMovie',function(req,res,next){
	var number=req.query.number||'000001';
	stu.MyMovie.find({"number":number},function(err,docs){
		res.render('singleMovie',{"movie":docs,"userInfo":req.userInfo});
	});
})

//blog页
router.get('/blog',function(req,res,next){
	var name="";
	var limit=4;
	if(!req.userInfo){
		name="";
		stu.MyBlog.find({},function(err,docs2){
				res.render('blog',{"likeBlog":docs2,"userInfo":req.userInfo});
		}).limit(limit).sort({_id:-1});
	
	}else{
		name=req.userInfo.name;
		stu.MyStudent.find({email:req.userInfo.email},function(err,docs){
			stu.MyBlog.find({},function(err,docs2){
				res.render('blog',{"likeMovie":docs,"likeBlog":docs2,"userInfo":req.userInfo});
			}).limit(limit).sort({_id:-1});
	
			
		});
	}
	
	//res.render('blog',{"userInfo":req.userInfo});
})

//每日一播
var arrM=[];
router.get('/playMovie',function(req,res,next){
	 function rnd(n, m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    }
console.log((new Date()).getDay()+"-------------")
	 
	//var num=rnd(1,40).toString();
	var num=(new Date()).getDate().toString();
	
	function check(){
		
		if(arrM.length==40){
			arrM=new Array();
		}
		
		if(arrM.length==0){
			arrM.push(num);
		}else{
			var len=arrM.length;
			for(var i=0;i<len;i++){
				if(num==arrM[i]){
					num=rnd(1,40);
					check();
				}else{
					console.log("你好")
					arrM.push(num);
					break;
				}
			}
		}
		
	}
	
	//check();
	console.log(arrM);
	var number="000001"
	if(num.length==1){
		number='00000'+num;
	}else if(num.length==2){
		number='0000'+num;
	}
	
	stu.MyMovie.find({"number":number},function(err,docs){
		
		res.render('playMovie',{docs:docs,"userInfo":req.userInfo});
	});
	
	
})

//关于
router.get('/about',function(req,res,next){
	res.render('about',{"userInfo":req.userInfo});
	
})


//个人中心

router.get('/person',function(req,res,next){
	var email="";
	if(req.userInfo){
		email=req.userInfo.email
	}
	stu.MyStudent.find({email:email},function(err,docs){
		res.render('person',{"userInfo":req.userInfo,"blogLike":docs});
	})
	
	
	
})
/*-----------首页中的点击叉号会返回所有影片--------------*/

//post请求所有影片
router.post('/', function(req, res, next) {
    if(req.body&&req.body.number){
        stu.MyMovie.find({},function(err,docs){
            res.send({"movie":docs});
        }).limit(Number(req.body.number))
    }else{
        stu.MyMovie.find({},function(err,docs){
            res.send({"movie":docs});
        })
    }



});


//所有影片
router.post('/movies', function(req, res, next) {
	//初始化

	var type=req.body.type||'';
	
	var country=req.body.country||'';

	var time=req.body.time||'';
	
	var name=req.body.name||'';
	if(type.trim()=="全部"){
		type=""
	}
	if(country.trim()=="全部"){
		country=""
	}
	if(time.trim()=="全部"){
		time=""
	}
	
	
	if(time=="更早"){
		time=["2017","2016","2015","2014","2013","2012","2011"];
		stu.MyMovie.count({"type":{$regex:type},"releaseDate":{$nin:time},"country":{$regex:country}},function(err,count){

			stu.MyMovie.find({"type":{$regex:type},"releaseDate":{$nin:time},"country":{$regex:country}},function(err,docs){
	   			res.send({"movie":docs,"userInfo":req.userInfo});
		   	}).sort({"like":-1});
	   	
		})
		return;
		
	}
	
	if(country=="其他"){
		country=["大陆","美国","韩国","日本","英国","意大利","印度"];
		stu.MyMovie.count({"type":{$regex:type},"releaseDate":{$regex:time},"country":{$nin:country}},function(err,count){
			
		
			stu.MyMovie.find({"type":{$regex:type},"releaseDate":{$regex:time},"country":{$nin:country}},function(err,docs){
	   			res.send({"movie":docs,"userInfo":req.userInfo});
		   	}).sort({"like":-1});
	   	
		})
		return;
		
	}
	
	if(time=="更早"&&country=="其他"){
		time=["2017","2016","2015","2014","2013","2012","2011"];
		country=["大陆","美国","韩国","日本","英国","意大利","印度"];
		stu.MyMovie.count({"type":{$regex:type},"releaseDate":{$nin:time},"country":{$nin:country}},function(err,count){
	
			stu.MyMovie.find({"type":{$regex:type},"releaseDate":{$nin:time},"country":{$nin:country}},function(err,docs){
	   			res.send({"movie":docs,"userInfo":req.userInfo});
		   	}).sort({"like":-1});
	   	
		})
		return;
		
	}
	
	stu.MyMovie.count({"type":{$regex:type},"releaseDate":{$regex:time},"country":{$regex:country},"name":{$regex:name}},function(err,count){
			
			stu.MyMovie.find({"type":{$regex:type},"releaseDate":{$regex:time},"country":{$regex:country},"name":{$regex:name}},function(err,docs){
	   			res.send({"movie":docs,"userInfo":req.userInfo});
		   	}).sort({"like":-1});
	   	
	})
   

});

//详情页
router.post('/singleMovie',function(req,res,next){
	var number=req.body.number||'000001';
	stu.MyMovie.find({"number":number},function(err,docs){
		res.send({"movie":docs,"userInfo":req.userInfo});
	});
})


/*-------------注册时发表验证码以及登陆注册用户退出--------------------*/

//发送验证码
router.post('/send', function(req, res, next) {
    var arr=[1,2,3,4,5,6,7,8,9,0];
    var str='';
    for(var i=0;i<8;i++){
        str+=arr[Math.round(Math.random()*9)];
    }
    var transporter=nodemailer.createTransport({
        service:'qq',
        auth:{
            user:'1768385508@qq.com',
            pass:'divgoazjfbfsdigh'
        }
    })
    var mailOptions={
        from:'1768385508@qq.com',
        to:req.body.email,
        subject:'小丑网验证码',
        html:'欢迎注册小丑网，请在验证码处输入以下验证码:<h2 style="color:#3B85C0;">'+str+'</h2>'
    }
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
            return;
        }
        console.log(req.body.email);
        res.send(str);
    });
    emailW=req.body.email;
});

//用户注册

router.post('/create',function(req,res,next){

    console.log('create函数');

    var beta=new stu.MyStudent({
        name:req.body.name,
        email:emailW,
        password:req.body.password
    });
    beta.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log('存入成功');
        }
    });
    res.send('存入成功');
});

//用户注册时是否已注册

router.post('/readOne',function(req,res,next){
    console.log('读取单值函数');
    stu.MyStudent.findOne({
        email:req.body.email
    },function(err,docs){
        console.log(docs);
        if(docs==null){
            console.log('可注册');
            res.send('"1"');
        }else if(docs.email===req.body.email){
            res.send('"0"');
            console.log('已注册');

        }else if(docs.email!==req.body.email){
            console.log('可注册');
            res.send('"1"');

        }else{
            console.log('报错'+err)
        }
    })
});






//用户退出

router.post('/logOut',function(req,res,next){
	req.cookies.set("userInfo",'');
	res.send({});
})

//用户登陆

router.post('/readEP',function(req,res,next){
    console.log('读取账号密码');
    stu.MyStudent.findOne({
        email:req.body.email,
        password:req.body.password
    },function(err,docs){
        if(docs==null){
            console.log('账号密码错误');
            res.send('"0" ');
        }else if((docs.email===req.body.email)&&(docs.password===req.body.password)){
			req.cookies.set("userInfo",JSON.stringify({"name":docs.name,"email":docs.email,"password":docs.password}));
            res.send({"name":docs.name,"email":docs.email,"password":docs.password});
            
            console.log('登陆成功了');
        }else{
            console.log('报错'+err)
        }
    })
})

//首页中喜欢影片

router.post('/likeMovie',function(req,res,next){
	stu.MyStudent.update({"email":req.userInfo.email},{$addToSet:{like:{name:req.body.movieName,num:req.body.numArr}}},function(err,docs){
		
	})
	stu.MyMovie.update({"name":req.body.movieName},{$inc:{'like':1}},function(err,docs){
		console.log(docs+"1111111111111")
	})
	
})


/*---------header中的搜索-------------*/

//搜索影片
router.post('/search', function(req, res, next) {
	//初始化
	var name=req.body.name||'';
	res.send({"name":name});

});


/*--------------更改头像以及用户评论------------------*/
//更改头像

router.post('/logoUser', function(req, res, next) {
   
	stu.MyStudent.update({"email":req.userInfo.email},{"$set":{logoUrl:req.body.logoUrl}},{multi:true},function(err,docs){
		stu.MyBlog.update({"email":req.userInfo.email},{"$set":{logoUrl:req.body.logoUrl}},{multi:true},function(err,docs2){
				console.log(docs2)
		})
	})
});

//提交评论

router.post('/comment',function(req,res,next){
	var userName=req.userInfo.name;
	stu.MyMovie.update({"name":req.body.name},{$addToSet:{comment:{name:userName,line:req.body.line}}},function(err,docs){
		res.send({"userInfo":req.userInfo});
	})
	
})

/*-----------博客------------*/
//发表博客

router.post('/sendBlog',function(req,res,next){
	var beta=new stu.MyBlog({
        name:req.body.name,
        blogLine:req.body.blogLine,
        logoUrl:req.body.logoUrl,
        email:req.userInfo.email
    });
    beta.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log('存入成功');
        }
    });
    
    stu.MyStudent.update({"email":req.userInfo.email},{$addToSet:{blog:{name:req.body.name,blogLine:req.body.blogLine,time:req.body.time}}},function(err,docs){
		res.send({num:1})
	})
    
    
    
})

//加载更多blog
router.post("/moreBlog",function(req,res,next){
	var count=req.body.count||0;
	var limit=3;
	stu.MyBlog.find({},function(err,docs){
		if(docs.length<limit){
			res.send({"blog":docs,"hasBlog":"no"});
		}else{
			res.send({"blog":docs,"hasBlog":"yes"});
		}
			
	}).limit(limit).skip(count*limit).sort({_id:-1});
	
	
})

//删除博客

router.post('/delBlog',function(req,res,next){
	console.log(req.body.del+"324234324")
	stu.MyStudent.update({"email":req.userInfo.email},{"$pull":{blog:{blogLine:req.body.del}}},function(err,docs){
		
		stu.MyBlog.find({"email":req.userInfo.email},function(err,docs){
			stu.MyBlog.remove({blogLine:req.body.del},function(err,docs){
				res.send({});	
			})
		})
		
		
	})
})







module.exports = router;

