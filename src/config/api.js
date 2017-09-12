var root = process.env.API_ROOT;
export default {
    url: function(path) {
        var url = root + '/' + path
        return url
    }
}