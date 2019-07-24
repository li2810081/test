var tesseract = require('tesseract.js');
var path = require('path')
var request = require('request')
var fs = require('fs');
var superagent = require('superagent')

/**
 * 读取验证码 pa是path路径
 */
var ocr = (pa) => {
    return new Promise((resolve, reject) => {
        var myImage = path.resolve(__dirname, pa)
        tesseract.recognize(myImage)
            .then(data => {
                console.log('then text is :', data.text);
                return data.text
            })
            .then(d => {
                resolve(d)
            })
            .catch(err => {
                reject(err);
            })
            .finally(final => {
               ////console.log('all down !');
            })
    })

}

/**
 * 下载验证码
 */
var loadpic = async () => {
    /**
     * 获取cookie
     */
    function getCookie() {
        return new Promise((resolve, reject) => {
            superagent.get("*")
                .set({
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                    'Cache-Control': 'max-age=0',
                    'Connection': 'keep-alive',
                    'Host': 'www.sellersuniononline.com',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
                })
                .end((err, res) => {
                    if (err) {
                        reject("出错：" + err);
                    } else {
                        resolve(res.header["set-cookie"][0].split(";")[0]);
                        ////console.log(res.text);
                    }
                })
        })
    }
    /**
     * 通过cookie下载pic
     */
    function downloadpic(selfCookie) {
        return new Promise((resolve, reject) => {
            var src = {
                url: "*",
                headers: {
                    'Cookie': selfCookie
                }
            }
            var writeStream = fs.createWriteStream('./img/code.bmp');
            var readStream = request(src)
            readStream.pipe(writeStream);
            readStream.on('end', function () {
                ////console.log('文件下载成功');
                resolve('./img/code.bmp')
            });
            readStream.on('error', function () {
                ////console.log("错误信息:" + err)
                reject(err)
            })
            writeStream.on("finish", function () {
               // //console.log("文件写入成功");
                writeStream.end();
            });
        })
    }
    
   return new Promise((resolve, reject) => {
        var cook=""
        getCookie()
        .then(k => {
            cook=k
            return downloadpic(k)
        }).then(p => {
            return ocr(p)
        }).then(r => {
            ////console.log("识别结果：  " + r.text);
            resolve({
                cookie:cook,
                code: r.text
            })
            //resolve(cook+";"+r.text)
        }).catch(err=>{
            reject(err)
        })
    })

}




/**
 * 模拟登陆
 */

var login = (pwd,cookie,code) => {
    return new Promise((resolve, reject) => {
        superagent.post("*")
            .set("Cookie", cookie)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .send("username=grace&password="+pwd+"&checkcode="+code)
            .end(function (err, res) {
                if (err) {
                    ////console.log("出错：" + err);
                    
                } else {
                    ////console.log(res.text);
                    var json=JSON.parse(res.text)
                    if (json.success) {
                        resolve("正确密码："+pwd)
                    } else {
                        reject("")
                    }
                   
                }
            }
            )
    })

}


module.exports={"ocr":ocr, "login":login,'loadpic':loadpic}