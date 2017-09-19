const jsonServer = require("json-server")
const server = jsonServer.create()

const middleware = jsonServer.defaults()
server.use(middleware)

//支持多个db json文件
const _ =require("underscore")
const  path = require("path")
const  fs = require("fs")
const  mockDir = path.join(__dirname,'data')
const  base = {}
const files = fs.readdirSync(mockDir)
const  rules = require("./routes")
files.forEach(function (file) {
    _.extend(base,require(path.resolve(mockDir,file)))
})
const router = jsonServer.router(base)

server.use(jsonServer.rewriter(rules));
server.use(router)

router.post("/bindPrinter/bindInfo",(req,res,next)=>{
    console.log(111)
    if(req.body!=""){
        res.send(res.locals.data)
    }
})
//返回自定义格式数据
router.render = (req,res) =>{
    if(req.originalMethod=="POST"){
        console.log(res)
    }
    res.jsonp(res.locals.data)
}

server.listen(3000,() =>{
    console.log('JSON server is running')
})

