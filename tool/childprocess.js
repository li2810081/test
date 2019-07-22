var api=require('../imgOcr.js')

process.on('message',(m,s,d)=>{
    console.time(process.pid+'线程开始测试密码:'+m)
    //ph.getkeyword(m)
    api.login(m,s,d)
	//api.get(m)
    .then(v=>{
        process.send(v);    
        console.timeEnd(process.pid+'线程测试密码结束:'+v);    
    })
    .then(()=>{
        process.exit(200);  
        console.log(process.pid+'线程测试密码正常退出:');          
    })
    .catch(e=>{
        process.exit(404);   
        console.log(process.pid+'>>线程测试密码异常退出:'+e);
    })
})