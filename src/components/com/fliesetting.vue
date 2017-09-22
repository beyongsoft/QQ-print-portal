<template>
  <form id="upLoadApp" action="" target="nm_iframe" method="post">
    <fieldset>
      <h3>Print Job</h3>
      <div class="form-group" :class="{'has-error':isclick}">
        <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_username">
          <span class="icon-youxiang iconfont"></span>PrintEmailId</label>
        <div class="col-sm-6 col-xs-6 col-md-6">
          <input class="form-control" id="ds_username" @blur="validator" type="text" placeholder="PrintEmailId" v-model="PrintEmailId_1"  required/>
        </div>
      </div>
      <div class="form-group">
        <label   class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
          <span class="icon-wenjian iconfont"></span>File Upload
        </label>
        <div class="col-sm-6 col-xs-6 col-md-6">
          <div class="file-container" style="display:inline-block;position:relative;overflow: hidden;vertical-align:middle;">
            <button class="btn fileinput-button" type="button" style="background: rgb(3, 138, 253);color:#fff;">Select file</button>
            <input type="file" name="file" @change="loadFile" style="position:absolute;top:0;left:0;font-size:34px; opacity:0">
          </div>
          <span id="filename" style="vertical-align: middle;">{{filename}}</span>
          <span id="filesize" style="vertical-align: middle;">{{fileSize}}</span>
        </div>
      </div>
      <div class="form-group">
        <label  class="col-sm-4 col-xs-4 text-left col-md-4 control-label">
          <span class="icon-dayin_zhizhangshezhi iconfont"></span>Job Settings
        </label>
        <div class="col-sm-7col-xs-7col-md-7" style="overflow:hidden;">
          <select v-model="selected.Plex">
            <option v-for="(opt,index) in options.Plex" :key="index" v-bind:value="opt.code">
              {{opt.value}}
            </option>
          </select>
          <select v-model="selected.MediaSize">
            <option v-for="(opt,index) in options.MediaSize" :key="index" v-bind:value="opt.code">
              {{opt.value}}
            </option>
          </select>
          <select v-model="selected.MediaType">
            <option v-for="(opt,index) in options.MediaType" :key="index" v-bind:value="opt.code">
              {{opt.value}}
            </option>
          </select>
          <select v-model="selected.Color">
            <option v-for="(opt,index) in options.Color" :key="index" v-bind:value="opt.code">
              {{opt.value}}
            </option>
          </select>
          <select v-model="selected.Quality">
            <option v-for="(opt,index) in options.Quality" :key="index" v-bind:value="opt.code">
              {{opt.value}}
            </option>
          </select>
          <div class="copies">
            <label class="control-label text-left">Copies</label>
            <div style="overflow:hidden;position: absolute;top: 0px;left: 60px;">
              <input class="form-control" type="text" placeholder="copies" v-model="selected.Copies" />
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" ></label>
        <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
          <button class="btn btn-default btn-primary" @click="step4" id="fileBth" :class="{'disabled':btnState}">Upload&Submit</button>
        </div>
      </div>
    </fieldset>
  </form>
</template>
<script>
export default {
  name: 'uploadFile',
  data() {
    return {
      filename: "未上传文件",//显示上传的是哪个文件
      fileSize: "",//显示上传文件的大小
      PrintEmailId_1: this.$store.state.PrintEmailId,//输入的printeEmailId
      btnState: false,//设置按钮的默认状态
      isclick:false,
      selected: {//默认选中的参数
        Plex: 1,
        MediaSize: 1,
        MediaType: 1,
        Color: 1,
        Quality: 2,
        Copies: 1
      },
      options: {//各个参数的列表
        Plex: [],
        MediaSize: [],
        MediaType: [],
        Color: [],
        Quality: [],
      },
      din: "",
      clearId: 0,//清除定时器的id
      intervalObj: {},//所有定时器的集合
      name: 'timer_',//获取打印结果的定时器命名
      warnName: 'timer1_',//获取打印机异常的定时器命名
      clearInterTime:{},
    }
  },
  beforeCreate() {
    let vm = this;
    vm.$http.get(vm.$api.url("printerJob/getPrintJobConfig")).then(function(data) {
      var obj = data.body;
      var opt = vm.options;
      for (var i in obj.Plex) {
        opt.Plex.push({ code: i, value: obj.Plex[i] })
      }
      for (var i in obj.MediaSize) {
        opt.MediaSize.push({ code: i, value: obj.MediaSize[i] })
      }
      for (var i in obj.MediaType) {
        opt.MediaType.push({ code: i, value: obj.MediaType[i] })
      }
      for (var i in obj.Color) {
        opt.Color.push({ code: i, value: obj.Color[i] })
      }
      for (var i in obj.Quality) {
        opt.Quality.push({ code: i, value: obj.Quality[i] })
      }
    })
  },
  methods: {
    step4: function() {//当上传需要打印的文件上传好之后，将结果返回给后台时做的操作
      var vm = this;
      let str="";
      vm.validator()
      vm.btnState = true;
      setTimeout(function() {//每次按下之后，将按钮禁用5秒
        vm.btnState = false
      }, 5 * 1000)
      vm.$store.state.PrintEmailId = vm.PrintEmailId_1;
      var jobCfg = '{Plex:' + vm.selected.Plex + ';MediaSize:' + vm.selected.MediaSize + ';MediaType:' + vm.selected.MediaType + ';Color:' + vm.selected.Color + ';Quality:' + vm.selected.Quality + ';Copies:' + vm.selected.Copies + '}';//打印参数
      var jobCfg1 = encodeURIComponent(jobCfg)
      var data = new FormData($('#upLoadApp')[0])
      vm.$http.post(vm.$api.url("printerJob/submitPrintJob?printerEmailId=" + vm.$store.state.PrintEmailId + "&jobCfg=" + jobCfg1) , data, { emulateJSON: true }).then((data) => {//文件上传
        if (data.body == "") {
          str = "The server did not return data"
          vm.showWarining(str)
        } else if (data.body.result == 1) {//文件上传失败
          str = data.body.msg
          vm.showWarining(str)
        } else {//提交打印成功
            str = " Successful Upload"
            vm.showSuccess(str)
            let stateObj = {//只有是引用类型传进去的参数，函数内部才可以修改函数外部的值
              nowstate: 0,//每次定时去取数据时的取到的当时状态
              beforestate: 0//每次定时去取数据时的取到的上一次状态
            }
            var degree = 0;//请求为空的次数
            var job_num = data.body.jobNum;//获取到的jobNum
            var json = {//存入notification的数据
              "job_num": job_num,
              "PrintEmailId": data.body.printerEmail,
              "fileName": vm.filename,
              "msg": [],
              "num": 0
            }
            vm.clearInterTime[job_num]={n:0}
            vm.$store.commit('log', JSON.parse(JSON.stringify(data.body.log)))//提交的日志
            vm.$store.state.notification.unshift(json)//json文件存入notification中
            vm.intervalObj[vm.name + job_num] = setInterval(function() {//设置定时器去获取
              vm.getMessage(vm, job_num, stateObj, degree)
            }, 10 * 1000)
            vm.intervalObj[vm.warnName + job_num] = setInterval(function() {//设置定时器去获取打印机异常
              vm.getWarning(vm, job_num)
            }, 20 * 1000)
          }
      }, (err) => {
        if (err.status == 500) {//判断调用后台接口传来的错误
          str = "Server error"
          vm.showWarining(str)
        } else if (err.status == 404) {
          str = "No resource found"
          vm.showWarining(str)
        } else {
          str = "Server exception"
          vm.showWarining(str)
        }
      });
    },
    loadFile: function(e) {//显示上传文件名和上传文件大小
      this.filename = e.target.files[0].name;
      var byte = e.target.files[0].size;//获取到文件的字节
      if (Math.floor(byte / (1024 * 1024)) > 0) {
        this.fileSize = Math.floor(byte / (1024 * 1024)) + "." + byte % (1024 * 1024) + "M"
      } else {
        this.fileSize = Math.floor(byte / 1024) + "." + byte % 1024 + "KB"
      }
    },
    getMessage: function(vm, job_num, stateObj, degree) {//定时去请求数据，直到得到最后的结果
      vm.$http.get(vm.$api.url("printJobStatus/latest?printerEmailId=" + vm.$store.state.PrintEmailId + "&jobNum=" + job_num)).then((data) => {
        var resultMsg = "";
        if (data.body.length == 0) {
            console.log('没有消息')
        } else {
          stateObj.nowstate = data.body.id;
          if (data.body.result == 0) {//除了result为0时还是在查询，除0以外均会跳出循环
            if (stateObj.nowstate != stateObj.beforestate) {
              stateObj.beforestate = stateObj.nowstate
              for (var i = 0; i < vm.$store.state.notification.length; i++) {
                if (vm.$store.state.notification[i].job_num == job_num) {
                  if(data.body.state==50){
                    resultMsg = {
                    "helpTitle": 'Pending.....',
                    "result": data.body.result,
                  }
                  }else{
                    resultMsg = {//成功之后返回的数据
                    "helpTitle": data.body.helpTitle,
                    "helpDigest": data.body.helpDigest,
                    "helpCoverurl": data.body.helpCoverurl,
                    "helpUrl": data.body.helpUrl,
                    "result": 2,
                }
                  }
                  vm.$store.state.notification[i].num += 1
                  vm.$store.state.notification[i].msg.push(resultMsg)
                  return false
                }
              }
            }
          } else {
            for (var i = 0; i < vm.$store.state.notification.length; i++) {
              if (vm.$store.state.notification[i].job_num == job_num) {
                if(data.body.result==1){
                   resultMsg = {
                    "helpTitle": 'Print Successful',
                    "result": data.body.result,
                  }
                }else{
                   resultMsg = {//成功之后返回的数据
                  "helpTitle": data.body.helpTitle,
                  "helpCoverurl": data.body.helpCoverurl,
                  "helpUrl": data.body.helpUrl,
                  "result": data.body.result,
                }
                }
                vm.$store.state.notification[i].num += 1
                vm.$store.state.notification[i].msg.push(resultMsg)
                clearInterval(vm.intervalObj[vm.name + job_num])//清除定时器
                return false
              }
            }
          }
        }
      }, (err) => {
        if (err.status == 500) {
          str = "Server error"
          vm.showWarining(str)
        } else if (err.status == 404) {
          str = "No resource found"
          vm.showWarining(str)
        } else {
          str = "Server exception"
          vm.showWarining(str)
        }
      })
    },
    getWarning: function(vm, job_num) {//获取打印机异常
      vm.$http.get(vm.$api.url( "getInkAlert/message?printerEmailId=" + vm.$store.state.PrintEmailId + "&jobNum=" + job_num)).then((data) => {
        if (data.body != '') {
          if (data.body.helpTitle != "") {
            for (var i = 0; i < vm.$store.state.notification.length; i++) {
              if (vm.$store.state.notification[i].job_num == job_num) {
                var resultMsg = {//成功之后返回的数据,打印机的异常
                  "helpTitle": data.body.helpTitle,
                  "helpDigest": data.body.helpDigest,
                  "helpCoverurl": data.body.helpCoverurl,
                  "helpUrl": data.body.helpUrl,
                  "subType": data.body.subType
                }
                vm.$store.state.notification[i].msg.push(resultMsg)
                clearInterval(vm.intervalObj[vm.warnName + job_num])//清除定时器
                return false
              }
            }
          }
        }
        vm.clearInterTime[job_num].n++
        if(vm.clearInterTime[job_num].n>=30){//十分钟之后清除查询异常的定时器
            clearInterval(vm.intervalObj[vm.warnName + job_num])
        }
      })
    },
     validator: function(){//验证printeremailid是否存在
      if(this.PrintEmailId_1==""){
        this.isclick=true
        this.btnState = true
      }else{
        this.isclick = false
        this.btnState = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
select {
  float: left;
  width: 132px;
  margin: 5px 4px;
}

.copies {
  float: left;
  position: relative;
  input {
    width: 72px;
    height: 24px;
  }
}
</style>


