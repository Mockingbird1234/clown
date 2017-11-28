require('./connect');
var mongoose=require('mongoose');

var Schema=mongoose.Schema;
//定义模式


//电影模式
var Movie_Schema=new Schema({
   				"number": String,
                "name":String,
                "releaseDate":String,
                "director":String,
                "type":String,
                "country":String,
                "imageUrl":String,
                "directorUrl":String,
                "videoUrl":String,
                "content":String,
                "like":Number,
                "old":String,
                "comment":Array,
                "lines":Array
},{
    versionKey:false
});

//用户模式

var User_Schema=new Schema({
    name:String,
    email:String,
    password:String,
    like:Array,
    blog:Array,
    time:{
        type: Date,
        default:new Date()
    },
    logoUrl:String,
    //是否是管理员
    isAdmin:{
    	type:Boolean,
    	default:false
    },
    isSuperAdmin:{
    	type:Boolean,
    	default:false
    }
},{
    versionKey:false
});
//首页中的banner
var Banner_Schema=new Schema({
    name:String,
    content:String
},{
    versionKey:false
});
//博客
var Blog_Schema=new Schema({
	email:String,
    name:String,
    blogLine:String,
    time:{
        type: Date,
        default:new Date()
    },
    logoUrl:String
},{
    versionKey:false
});


//定义模型User,数据库存的是users
var MyMovie=mongoose.model('Movie',Movie_Schema);
var MyStudent=mongoose.model('User',User_Schema);
var MyBanner=mongoose.model('Banner',Banner_Schema);
var MyBlog=mongoose.model('Blog',Blog_Schema);
exports.MyStudent=MyStudent;
exports.MyMovie=MyMovie;
exports.MyBanner=MyBanner;
exports.MyBlog=MyBlog;