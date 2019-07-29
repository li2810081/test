var ImgPage = require("./loadpic")

          

//哈哈MX成人版 http://www.qiumeimei.com/image/page/1
// var haha = new ImgPage(
// 	(function () {
// 		var arrlist = []
// 		for (let index = 1; index < 15; index++) {
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

// var meitu = new ImgPage(
// 	(function () {
// 		var arrlist = ["https://www.meitulu.com/item/6062.html"]
// 		for (let index = 2; index < 10; index++) {
// 			arrlist.push("https://www.meitulu.com/item/6062_" + index+".html")
// 		}
// 		return arrlist
// 	})(),
// 	".content img",
// 	'src'
// )
// meitu.load()

//绝美网
// const test = new ImgPage(["http://www.juemei.com/mm/sfz/"],
// ".cell.item a"
// ,"href");

// test.getarr("http://www.juemei.com/mm/sfz/")
// .then(v=>{
// 	new ImgPage(
// 			(function () {
// 				var arr=[]
// 				v.splice(0,10).forEach(element => {
// 					arr.push("http://www.juemei.com"+element.href)
// 					for (let index = 2; index < 15; index++){
// 						arr.push(("http://www.juemei.com"+element.href).replace(".html","_"+index+".html"))
// 					}
// 				});
// 				return arr
// 			})(),
// 			".wrap img",
// 			'src'
// 		).load()
// })

//7160
const test = new ImgPage(["https://m.7160.com/"],
".libox  a"
,"href");

test.getarr("https://m.7160.com/")
.then(v=>{
	new ImgPage(
			(function () {
				var arr=[]
				v.splice(0,30).forEach((element,i) => {
					if (!i%2) {
						arr.push("https://m.7160.com/"+element.href)
						for (let index = 2; index < 5; index++){
							arr.push("https://m.7160.com/"+element.href+"index_"+index+".html")
						}
					}
				});
				return arr
			})(),
			".arcmain img",
			'src'
		).load()
})

// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// eventEmitter.on('my_event', (s) => {
//   console.log(s+'data received succesfully.');
// });
// for (let index = 0; index < 100; index++) {
// 	eventEmitter.emit('my_event',"老漂亮了"+index);
	
// }


