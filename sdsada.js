const crypto = require('crypto');

const hash = crypto.createHash('md5');//crypto.createHmac('sha256', 'secret-key');//

var data = {
    by: 'relevancy',
    keyword: '%E9%9B%BB%E5%99%A8%E6%AB%83',
    limit: 50,
    newest: 0,
    order: 'desc',
    page_type: 'search'
}
var url="by=relevancy&keyword=%E9%9B%BB%E5%99%A8%E6%AB%83&limit=50&newest=0&order=desc&page_type=search"
// 可任意多次调用update():
hash.update(url);
//hash.update(JSON.stringify(data));
console.log(JSON.stringify(data));
var bidui='bf53d3338600bf7f393b458bde586a2e'
console.log(bidui.length+'------'+bidui);
var he=hash.digest('hex')
console.log(he.length+'------'+he); // 7e1977739c748beac0c0fd14fd26a544