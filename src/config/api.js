// var host = "http://192.168.54.54:8088"
var host="http://localhost:3000"
export default {
    url: function(path) {
        var url = host+"/" + path
        return url
    }
}
