import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        sku: "", //输入的地址
        emailId: "", //打印机的email地址
        url: "http://192.168.54.11:8088", //请求的地址
        printerId: "", //获取到的打印机的Id
        newBing: true, //是否为新绑定的
        logMessage: "", //log日志
        notification: [], //上传日志
        codeSrc: "", //二维码的图片路径
        errorMessage: "",
        printerImg: "", //打印机的图片
        printerName: "", //打印机的名字
        Din: "Readonly input here… ", //din的value值
        Sn: "Readonly input here… ", //sn的value值
        Pid: "Readonly input here… ", //pid的value值
        isWarning: false, //是否出现警告框
        resultCode: null, //当是新绑定的时候的绑定的时候返回的结果
        warningContent: "", //出现警告框内容为空
        warningState: false

    },
    mutations: {
        newStep1(state, msg) {
            //第一步输入的基本信息
            state.sku = msg.sku;
            state.PrintEmailId = msg.PrintEmailId;
            console.log(msg)
        },
        newstep2(state, msg) {
            //第二步传入的参数
            state.sn = msg.sn;
            state.Din = msg.Din;
            state.pid = msg.pid;
            state.newBing = msg.newBing;
            state.isWarning = msg.isWarning;
        },
        log(state, msg) {
            state.logMessage = jsonFormat(msg)
        }
    }
});

function jsonFormat(txt, compress) {
    console.log(222)
    var indentChar = '';
    if (/^\s*$/.test(txt)) {
        console.log('数据为空,无法格式化! ');
        return;
    }
    try { var data = eval('(' + txt + ')'); } catch (e) {
        console.log('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
        return;
    };
    var draw = [],
        last = false,
        This = this,
        line = compress ? '' : '\n',
        nodeCount = 0,
        maxDepth = 0;
    var notify = function(name, value, isLast, indent /*缩进*/ , formObj) {
        nodeCount++; /*节点计数*/
        for (var i = 0, tab = ''; i < indent; i++) tab += indentChar; /* 缩进HTML */
        tab = compress ? '' : tab; /*压缩模式忽略缩进*/
        maxDepth = ++indent; /*缩进递增并记录*/
        if (value && value.constructor == Array) { /*处理数组*/
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line); /*缩进'[' 然后换行*/
            for (var i = 0; i < value.length; i++)
                notify(i, value[i], i == value.length - 1, indent, false);
            draw.push(tab + ']' + (isLast ? line : (',' + line))); /*缩进']'换行,若非尾元素则添加逗号*/
        } else if (value && typeof value == 'object') { /*处理对象*/
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line); /*缩进'{' 然后换行*/
            var len = 0,
                i = 0;
            for (var key in value) len++;
            for (var key in value) notify(key, value[key], ++i == len, indent, true);
            draw.push(tab + '}' + (isLast ? line : (',' + line))); /*缩进'}'换行,若非尾元素则添加逗号*/
        } else {
            if (typeof value == 'string') value = '"' + value + '"';
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
        };
    };
    var isLast = true,
        indent = 0;
    notify('', data, isLast, indent, false);
    return draw.join('');
}
export default store;