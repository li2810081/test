var getList = require('./getShopeeList')
var fenci=require('./splitword')
var fs = require('fs');

var pg = 0
var i = 0
var namestr=""

function sigle(pg) {
  getList("情趣内衣", pg, 0).then(arr => {
    arr.forEach(element => {
      i++
      fs.appendFileSync('./tool/txt.txt', element.name+'\n',err=>{
        if (err) {
          console.log(err);          
        }
      });
      console.log(i + ":" + element.name + '访问量' + element.view_count);
    });
    return pg
  }).then(v=>{
    if (pg<1) {
      pg++
      console.log(pg);      
      sigle(pg)
    }
  })
}

//sigle(0)

var fs = require('fs');
fs.readFile('./tool/txt.txt', function (err, data) {
  if (err) return console.error(err);
  fenci.fenci(data).then(d=>{
    d.forEach(element => {
      console.log(element.word+'----------------------------权重:'+element.weight);
    });
    
  })
});
