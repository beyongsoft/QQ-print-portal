import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isWarning: false, //是否出现警告框
        warningContent: "", //出现警告框内容为空
        warningState: false,
        addPrinterObj:{},
        logMessage:'',
        tipContent: '', //成功之后的提示框
        tipState: false, //提示框是否出现
        loading:false
    },
    mutations: {
        newStep1(state, msg) {
            //第一步输入的基本信息
            state.sku = msg.sku;
            state.PrintEmailId = msg.emailId;
            state.deviceId = msg.deviceId;
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
