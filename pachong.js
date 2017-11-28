var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var url = "http://www.1905.com/mdb/film/?fr=homepc_menu_mdb";
var url2 = "http://www.1905.com"
//初始url

function fetchPage(x) {     //封装了一层函数
    startRequest(x);
}


function startRequest(x) {
    //采用http模块向服务器发起一次get请求
    http.get(x, function (res) {
        var html = '';        //用来存储请求网页的整个html内容
        var titles = [];
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {

            var $ = cheerio.load(html); //采用cheerio模块解析html
            var arr=[];
            var arr2=[];
            var arr3=[];
            var len=$('.switchable a').length;
          for(var i=0;i<len;i++){
              arr.push($('.switchable a').eq(i).text().trim());
              arr2.push($('.switchable span').eq(i).text().trim());
              arr3.push($('.switchable a').eq(i).attr("href"));
          }

            var bigArr=[];
            var len2=parseInt(len/3);
            var neidi=[];
            var xianggang=[];
            var beimei=[];
            for(var i=0;i<len2;i++){
                neidi.push({
                        "name": arr[i],
                        "money": arr2[i],
                        "href":url2+arr3[i]
                    }
                )
                xianggang.push({
                        "name": arr[i + len2],
                        "money": arr2[i + len2],
                        "href":url2+arr3[i + len2]
                    }
                )
                beimei.push({
                        "name": arr[i + 2 * len2],
                        "money": arr2[i + 2 * len2],
                        "href":url2+arr3[i + 2 * len2]
                    }
                )

            }
            bigArr=[{"neidi":neidi},{"xianggang":xianggang},{"beimei":beimei}];

            str=JSON.stringify(bigArr);

            savedContent($,bigArr);  //存储每篇文章的内容及文章标题




        });

    }).on('error', function (err) {
        console.log(err);
    });

}
//该函数的作用：在本地存储所爬取的电影内容资源
function savedContent($, news_item) {
    fs.writeFile(  './public/res/paihang.json',str , function (err) {
        if (err) {
            console.log(err);
        }
    });
}

fetchPage(url);      //主程序开始运行