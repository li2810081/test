# 测试的一些例子

1. ```npm run downloadpic```用于下载网址图片并保存到本地

```javascript
   **
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

```

2. ```imgOcr.js```识别简单验证码

```javascript
    var imgocr=require("./iomgOcr")
    imgocr.ocr("图片路径/图片.jpg")
    .then(n=>{
       console.log(n)
    })

```
