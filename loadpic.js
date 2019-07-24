var superagent = require('superagent')
var fs = require('fs')
var cheerio = require('cheerio')
var async = require("async")
var request = require('request')


/**
 * 采集页面类
 * url 采集网址 box 图片集合  eachhref 图片src
 */
module.exports = function ImgPage(url, box, eachhref) {
	this.url = url
	this.box = box
	this.eachhref = eachhref
	this.dom = function ($) {
		var arr = []
		$(box).each(function (index, element) {
			var $eleItem = $(element)
			arr.push(
				{
					href: $eleItem.attr(eachhref),
					filename: $eleItem.attr('alt') != undefined ? $eleItem.attr('alt') : new Date().getTime()
				}
			);
		});
		return arr
	}
	this.load = () => start(this)

	/**
	 * 获取网页元素
	 * param 网址信息 如：http://www.qiumeimei.com/image/page/1
	 * elementFuction 回调方法带一个$,返回一个数组
	 */
	var getArr = async function (params, elementFuction) {
		return new Promise((resolve, reject) => {
			var arr = []
			superagent.get(params)//请求页面地址
				.end(function (err, sres) {//页面获取到的数据
					if (err) reject(err);
					var $ = cheerio.load(sres.text);//用cheerio解析页面数据
					arr = elementFuction($)
					resolve(arr)
				})
		})
	}

	/**unable to verify the first certificate
	 * 生成保存图片信息的方法
	 */
	var buildName = async function (arr) {
		let results = arr.splice(0, 90)
		async.each(results, function iteratee(item, callback) {
			setTimeout(() => {
				// 获取图片地址
			var urls = item.href;
			// 获取图片名字
			var objName = item.filename + (urls.indexOf("jpg") > 0 ? '.jpg' : ".gif");
			// 构建目标路径，到项目根目录下新建uploads文件夹，用来存放下载的图片
			var basePath = './' + new Date().toLocaleDateString() + "/";
			if (!fs.existsSync(basePath)) {
				fs.mkdirSync(basePath)
			}
			var targetPath = basePath + "/tmp";
			console.log(urls + "||" + item.filename)
			// 下载图片 
			_download(urls, basePath, objName)
			.then(s=>{
				console.log(s);
			}).catch(err=>{
				console.log(err);
			});
			}, 800);
			
		})
	}



	// 图片下载函数
	// uri：图片网络地址
	// dir：目标路径
	// filename：图片名字
	async function _download(uri, dir, filename) {
     return new Promise((resolve, reject) => {
		if (!fs.existsSync(dir + "/" + filename)) {			
			//采用request模块，向服务器发起一次请求，获取图片资源
			request.head(uri, function(err, res, body) {
				if (err) {
				  console.log("下载错误： "+err);
				}
			  });
			  request(uri).pipe(fs.createWriteStream(dir + "/" + filename))
			  .on('close', function() {
				resolve("下载成功: "+filename);
			  })
		} else {
			reject("已存在: " + filename);
		}
	 })
		
	};



	/**
	 * 启动方法
	 */
	async function start(page) {
		console.log("准备下载页面：\n" + page.url.join("\n"));
		async.each(page.url, function iteratee(item, callback) {
			getArr(item, page.dom)
				.then(arr => {
					buildName(arr)
				})
				.catch(err => {
					console.log("出错了：" + err);
				})
		})
	}
}
