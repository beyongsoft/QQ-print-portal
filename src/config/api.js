var host = "http://10.10.56.33:8088"//后台联调接口
// var host="http://127.0.0.1:8088"//本地模拟服务接口
export default {
    url: function(path) {
        var url = host + "/" + path
        return url
    }
}
