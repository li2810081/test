var request=require("request")
var cheerio=require("cheerio")


request.get("http://www.qiumeimei.com/page/1",(err,doc)=>{
	var $=cheerio.load(doc.body)
	var arr=$(".panel.clearfix img").attr("src")
})