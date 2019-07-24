var superagent = require('superagent')
var fs = require('fs')
var cheerio = require('cheerio')
var async = require("async")
var request = require('request')
var download = require('download')

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

/**
 * 生成保存图片信息的方法
 */
var buildName = async function (arr) {
	let results = arr.splice(0, 90)
	async.each(results, function iteratee(item, callback) {
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
		_download(urls, basePath, objName);
	})
}



// 图片下载函数
// uri：图片网络地址
// dir：目标路径
// filename：图片名字
async function _download(uri, dir, filename) {
	if (!fs.existsSync(dir + "/" + filename)) {
		var data = await download(uri)
		fs.writeFileSync(dir + "/" + filename, data);
	} else {
		console.log("已存在:" + filename);

	}
};


/**
 * 启动方法
 */
(async function () {
	/**
	 * 以下编辑
	 */
	//请求网址
	var URL = "http://www.qiumeimei.com/image/page/"
	//提取的页数
	var PAGE = 2
	//页面dom处理
	var dompic= function ($) {
		var arr = []

		// 下面就是通过cheerio去找html网页中的数据，并存放到arr中
		$(".panel.clearfix img").each(function (index, element) {
			//console.log(element)
			var $eleItem = $(element)
			arr.push(
				{
					href: $eleItem.attr('data-lazy-src'),
					filename: $eleItem.attr('alt') != undefined ? $eleItem.attr('alt') : new Date().getTime()
				}
			);
		});

		return arr
	}
    /**
	 * 编辑结束
	 */
	//生成到指定页数数组的方法
	var f = length => Array.from({ length }).map((v, k) => k);
	async.each(f(PAGE), function iteratee(item, callback) {
		getArr(URL + (item + 1),dompic($))
			.then(arr => {
				buildName(arr)
			})
	})
})()
