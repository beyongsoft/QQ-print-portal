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
        dtoken: '',
        drefreshToken: '',
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
            state.logMessage = msg
        }
    }
});


export default store;