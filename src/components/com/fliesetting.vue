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
      PrintEmailId_1: this.$route.params.emailId,//输入的printeEmailId
      btnState: false,//设置按钮的默认状态
      isclick:false,
      isimage:false,//判断文件是否为图片
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
      fileTypeArr:["doc","docx","rtf","xls","xlsx","ppt","pptx","jpeg","jpg","png","gif","bmp","txt","html","pdf"],
    }
  },

  beforeCreate() {
    let vm = this;
    vm.$http.get(vm.$api.url("printerJob/getPrintJobConfig")).then(function(data) {
      this.btnState = false
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
    },err=> {
        this.btnState = true
        let str = "The print parameter was not reached"
        vm.showWarining(str)
    })
  },
  methods: {
      step4: function () {//当上传需要打印的文件上传好之后，将结果返回给后台时做的操作
          var vm = this;
          let str = "";
          var sureResult = vm.validator()
          if (!sureResult) {
          } else if (vm.fileSize == "") {
              str = "Please upload the file"
              vm.showWarining(str)
          } else {
              vm.btnState = true;
              setTimeout(function () {//每次按下之后，将按钮禁用5秒
                  vm.btnState = false
              }, 5 * 1000)
              vm.$store.state.PrintEmailId = $.trim(vm.PrintEmailId_1);
              console.log(vm.$store.state.PrintEmailId)
              var jobCfg = '{Plex:' + vm.selected.Plex + ';MediaSize:' + vm.selected.MediaSize + ';MediaType:' + vm.selected.MediaType + ';Color:' + vm.selected.Color + ';Quality:' + vm.selected.Quality + ';Copies:' + vm.selected.Copies + '}';//打印参数
              var jobCfg1 = encodeURIComponent(jobCfg)
              var data = new FormData($('#upLoadApp')[0])
              vm.$http.post(vm.$api.url("printerJob/submitPrintJob?printerEmailId=" + vm.$store.state.PrintEmailId + "&jobCfg=" + jobCfg1), data, {emulateJSON: true}).then((data) => {//文件上传
                  if (data.body == "") {
                      str = "The server did not return data"
                      vm.showWarining(str)
                  } else if (data.body.result == 1) {//文件上传失败
                      str = data.body.msg
                      vm.showWarining(str)
                  } else {//提交打印成功
                      str = "Submitted Successfully"
                      vm.showSuccess(str)
                      var job_num = data.body.jobNum;//获取到的jobNum
                      var json = {//存入notification的数据
                          "jobNum": job_num,
                          "PrintEmailId": data.body.printerEmail,
                          "fileName": vm.filename,
                          "isimage": vm.isimage,
                          "msg": [],
                          "num": 0
                      }
                      let lenObj = {nowLen: 0, beforeLen: 0}
                      vm.clearInterTime[job_num] = {n: 0}
                      vm.$store.commit('log', JSON.parse(JSON.stringify(data.body.log)))//提交的日志
                      vm.$store.state.notification.unshift(json)//json文件存入notification中
                      vm.intervalObj[vm.name + job_num] = setInterval(function () {//设置定时器去获取
                          vm.getMessage(vm, job_num, lenObj)
                      }, 10 * 1000)
                      vm.intervalObj[vm.warnName + job_num] = setInterval(function () {//设置定时器去获取打印机异常
                          vm.getWarning(vm, job_num, lenObj)
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
          }
      },
      loadFile: function (e) {//显示上传文件名和上传文件大小
          if (typeof (e.target.files[0]) !== "undefined") {
              this.filename = e.target.files[0].name;
              let imageArr = ["jpg", "png", "gif", "jpeg", "bmp"]
              if (imageArr.indexOf(this.filename.split(".")[1]) != -1) {//判断该上传文件的类型
                  this.isimage = true
              } else {
                  this.isimage = false
              }
              let byte = e.target.files[0].size;//获取到文件的字节
              if (Math.floor(byte / (1024 * 1024)) > 0) {
                  this.fileSize = Math.floor(byte / (1024 * 1024)) + "." + byte % (1024 * 1024) + "M"
              } else {
                  this.fileSize = Math.floor(byte / 1024) + "." + byte % 1024 + "KB"
              }
              this.validFile()//调用函数检查上传文件是否为可支持的文件类型和文件大小
          }
      },
      getMessage: function (vm, job_num, lenObj) {//定时去请求数据，直到得到最后的结果
          vm.$http.get(vm.$api.url("printJobStatus/allLatest?printerEmailId=" + vm.$store.state.PrintEmailId + "&jobNum=" + job_num)).then((data) => {
              let arr = data.body
              let obj
              let compaRes
              if (arr.length != "") {
                  for (var i in arr) {//循环data，将data数据改变
                      (function (item, index) {
                          for (let j = 0; j < vm.$store.state.notification.length; j++) {//将处理好的数据插入到显示的上面
                              if (vm.$store.state.notification[j].jobNum == job_num) {
                                  compaRes = vm.findIndexOf(item,vm.$store.state.notification[j].msg,'state')
                                  if(compaRes){
                                  vm.$store.state.notification[j].num += 1
                                  if (item.result == 0 && item.state == 50) {//打印未有返回结果
                                      obj = {
                                          "helpTitle": 'Pending.....',
                                          "resultCode": item.result,
                                          "state": item.state,
                                      }
                                      vm.$store.state.notification[j].msg.unshift(obj)

                                  } else if (item.result == 0 && item.state == 9001) {//打印超过5分钟
                                      obj = {//成功之后返回的数据
                                          "helpTitle": item.helpTitle,
                                          "helpDigest": item.helpDigest,
                                          "helpCoverurl": item.helpCoverurl,
                                          "helpUrl": item.helpUrl,
                                          "state": item.state,
                                          "resultCode": 2,
                                      }
                                      vm.$store.state.notification[j].msg.unshift(obj)
                                  } else if (item.result == 1) {//打印成功
                                      obj = {
                                          "helpTitle": 'Print Successful',
                                          "state": item.state,
                                          "resultCode": item.result,
                                      }
                                      vm.$store.state.notification[j].msg.unshift(obj)
                                  } else if (item.result == 2) {//返回打印错误信息
                                      obj = {//成功之后返回的数据
                                          "helpTitle": item.helpTitle,
                                          "helpDigest": item.helpDigest,
                                          "helpCoverurl": item.helpCoverurl,
                                          "helpUrl": item.helpUrl,
                                          "state": item.state,
                                          "resultCode": item.result,
                                      }
                                      vm.$store.state.notification[j].msg.unshift(obj)
                                  }
                              }
                             }
                          }
                      })(arr[i], i)
                      if (arr[0].result != 0) {
                          clearInterval(vm.intervalObj[vm.name + job_num])//清除定时器
                      }
                  }
              }
          }, (err) => {
              let str
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
      getWarning: function (vm, job_num) {//获取打印机异常
          vm.$http.get(vm.$api.url("getInkAlert/allMessage?printerEmailId=" + vm.$store.state.PrintEmailId + "&jobNum=" + job_num)).then((data) => {
              if (data.body != '') {
                  let resultMsg
                  for (var j in data.body) {
                      (function (item) {
                          if (item.helpTitle != "") {
                              for (var i = 0; i < vm.$store.state.notification.length; i++) {
                                  if (vm.$store.state.notification[i].jobNum == job_num) {
                                      compaRes = vm.findIndexOf(item, vm.$store.state.notification[j].msg, 'helpTitle')
                                      if (compaRes) {
                                          vm.$store.state.notification[i].num += 1
                                          resultMsg = {
                                              "helpTitle": item.helpTitle,
                                              "helpDigest": item.helpDigest,
                                              "helpCoverurl": item.helpCoverurl,
                                              "helpUrl": item.helpUrl,
                                              "subType": item.subType,
                                              "state": item.state,
                                              "resultCode": 2
                                          }
                                          vm.$store.state.notification[i].msg.push(resultMsg)
                                      }
                                  }
                              }
                          }
                      })(data.body[j])
                  }
              }
              vm.clearInterTime[job_num].n++
              if (vm.clearInterTime[job_num].n >= 90) {//十分钟之后清除查询异常的定时器
                  clearInterval(vm.intervalObj[vm.warnName + job_num])
              }
          })
      },
      validator: function () {//验证printeremailid是否正确
          var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
          var flag = reg.test(this.PrintEmailId_1)//验证邮箱的正则表达式
          this.isclick = !flag
          this.btnState = !flag
          this.$store.state.newBing = flag//判断是否需要绑定
          if (!flag) {
              var str = "Please enter the correct PrintEmailId"
              this.showWarining(str)
          }
          return flag
      },
      validFile: function (file) {//对上传文件做一个判断
          let str
          if (!this.fileTypeArr.includes(this.filename.split(".")[1].toLowerCase())) {//判断文件类型是否支持
              this.btnState = true
              str = "This file type is not supported"
              this.showWarining(str)
          } else {
              this.btnState = false
          }
      },
      findIndexOf: function (obj, array,opt) {//判断数组的对象是否一致
          let result
          if(array.length!=0){
             result=array.every(function (ele) {
                    return ele[opt]!=obj[opt]
              })
          }else{
              result= true
          }
          return result

      }
  }
}
</script>
<style lang="less" scoped>
select {
  float: left;
  width: 6.2rem;
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

