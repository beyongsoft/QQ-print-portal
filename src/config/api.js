var host = "http://192.168.54.12:8088"//后台联调端口
// var host="http://localhost:3000"//mock数据的端口
export default {
    url: function(path) {
        var url =host+"/" + path
        return url
    }
}
