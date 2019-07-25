# 测试的一些例子

1. ```loadpic.js```用于下载网址图片并保存到本地

```javascript

/**
 * 采集页面类
 * url 采集网址 box 图片集合  eachhref 图片src
 * 
 * 图片保存在当前目录下(xxxx-xx-xx)文件内
 */
var ImgPage=require("./loadpic")

//哈哈MX成人版 http://www.qiumeimei.com/image/page/1
var haha = new ImgPage()
	(function () {
		var arrlist = []
		for (let index = 1; index < 3; index++) {
			arrlist.push("http://www.qiumeimei.com/image/page/" + index)
		}
		return arrlist
	})(),//url
	".panel.clearfix img",//box
	'data-lazy-src'//eachhref
)
  haha.load()//启动指令

```

2. ```imgOcr.js```识别简单验证码

```javascript
    var imgocr=require("./iomgOcr")
    imgocr.ocr("图片路径/图片.jpg")
    .then(n=>{
       console.log(n)
    })

```
