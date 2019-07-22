const cp = require('child_process');
const webelse = require('../imgOcr.js')
const fs = require('fs')
var request = require('request')

async function start() {
    var totolpid = 3 //几线程
    var ncount = 0
    

    var ser = async (str) => {
        ncount++
        var n = cp.fork('./tool/childprocess.js');
        n.send(str, cookie, code)
        n.on('message', function (m) {
            console.timeEnd(ncount, str, '接受正常回传信息:');
            console.log(typeof (JSON.parse(m)))
        })
        n.on('close', function (m) {
            var infostr = m == 200 ? "正常" : "异常"
            console.timeEnd(ncount + str + '子进程已' + infostr + '退出 ');
            ncount--
            dospider()
        })
    }

    var dospider = async (waitstr) => {
        if (ncount < totolpid && waitstr.length > 0) {
            ser(waitstr.shift(), dt.cookie, dt.code)
            dospider()
        } else if (waitstr.length == 0 && ncount == 0) {
            console.log("--------all done---------");
        } else {
            console.log("等待线程释放");
        }
    }


  
   
    var waitstr=await  fs.readFileSync('../test/pwd.txt').toString().split("\r\n");;
    var dt = await webelse.loadpic()
    dospider(waitstr)
}

start()