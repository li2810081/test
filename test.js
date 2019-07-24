var ImgPage = require("./loadpic")

          

//哈哈MX成人版 http://www.qiumeimei.com/image/page/1
// var haha = new ImgPage(
// 	(function () {
// 		var arrlist = []
// 		for (let index = 100; index < 105; index++) {
// 			arrlist.push("http://www.qiumeimei.com/image/page/" + index)
// 		}
// 		return arrlist
// 	})(),
// 	".panel.clearfix img",
// 	'data-lazy-src'
// )
// haha.load()



//85814图库 https://www.85814.com/meinv/sifangmeinv/
// var tu85814 = new ImgPage(
// 	(function () {
// 		var arrlist = ["https://www.85814.com/meinv/sifangmeinv/"]
// 		for (let index = 2; index < 5; index++) {
// 			arrlist.push("https://www.85814.com/meinv/sifangmeinv/index_" + index + ".html")
// 		}
// 		return arrlist
// 	})(),
// 	"#l a img",
// 	'src'
// )
// tu85814.load()


//美图录 https://www.meitulu.com/item/6062_3.html

var meitu = new ImgPage(
	(function () {
		var arrlist = ["https://www.meitulu.com/item/6062.html"]
		for (let index = 2; index < 10; index++) {
			arrlist.push("https://www.meitulu.com/item/6062_" + index+".html")
		}
		return arrlist
	})(),
	".content img",
	'src'
)
meitu.load()