<template>
  <form id="upLoadApp" action="" target="nm_iframe" method="post">
    <fieldset>
      <h3>Printer Job</h3>
      <div class="form-group">
        <label class="col-sm-4 col-md-4 col-xs-4 control-label text-left" for="ds_username">
          <span class="icon-youxiang iconfont"></span>PrintEmailId</label>
        <div class="col-sm-6 col-xs-6 col-md-6">
          <input class="form-control" id="ds_username" type="text" placeholder="PrintEmailId" v-model="PrintEmailId_1" />
        </div>
      </div>
      <div class="form-group">
        <label for="disabledSelect" class="col-sm-4 col-xs-4 col-md-4 text-left control-label">
          <span class="icon-wenjian iconfont"></span>File Upload
        </label>
        <div class="col-sm-6 col-xs-6 col-md-6">
          <div class="file-container" style="display:inline-block;position:relative;overflow: hidden;vertical-align:middle;">
            <button class="btn fileinput-button" type="button" style="background: rgb(3, 138, 253);color:#fff;">Select file</button>
            <input type="file" name="file" @change="loadFile" style="position:absolute;top:0;left:0;font-size:34px; opacity:0">
          </div>
          <span id="filename" style="vertical-align: middle">{{filename}}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="disabledSelect " class="col-sm-4 col-xs-4 text-left col-md-4 control-label">
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
        <label class="col-sm-4 col-xs-4 col-md-4 text-left control-label" for="ds_password"></label>
        <div class="col-sm-6 col-xs-6 col-md-6 bth-style">
          <button class="btn btn-default btn-primary" @click="step4" data-loading-text="Uploading....">Upload&Submit</button>
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
      PrintEmailId_1: '',
      selected: {
        Plex: 1,
        MediaSize: 1,
        MediaType: 1,
        Color: 1,
        Quality: 2,
        Copies: 1
      },
      options: {
        Plex: [],
        MediaSize: [],
        MediaType: [],
        Color: [],
        Quality: [],
      },
      din: "",
      clearId: 0,//清除定时器的id
      intervalObj: {},
      name: 'timer_',
    }
  },
  beforeCreate() {
    const vm = this
    vm.$http.get(vm.$store.state.url + "/printerJob/getPrintJobConfig").then(function(data) {
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
      vm.$store.state.PrintEmailId = vm.PrintEmailId_1;
      var jobCfg = '{Plex:' + vm.selected.Plex + ';MediaSize:' + vm.selected.MediaSize + ';MediaType:' + vm.selected.MediaType + ';Color:' + vm.selected.Color + ';Quality:' + vm.selected.Quality + ';Copies:' + vm.selected.Copies + '}';
      var jobCfg1 = encodeURIComponent(jobCfg)
      var data = new FormData($('#upLoadApp')[0])
      vm.$http.post(vm.$store.state.url + "/printerJob/submitPrintJob?printerEmailId=" + vm.$store.state.PrintEmailId + "&jobCfg=" + jobCfg1, data, { emulateJSON: true }).then((data) => {
        if (data.body.result == 0) {
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
          vm.din = data.body.din;
          vm.$store.commit('log', JSON.stringify(data.body.log))//提交的日志
          vm.intervalObj[vm.name + job_num] = setInterval(function() {//设置定时器去获取
            vm.ajax(vm, job_num, stateObj, degree, vm.index)
          }, 10 * 1000)
          console.log(vm.intervalObj)
        }
        vm.$store.state.notification.unshift(json)//json文件存入notification中
      });
    },
    loadFile: function(e) {//显示上传文件名
      this.filename = e.target.files[0].name;
    },
    ajax: function(vm, job_num, stateObj, degree) {//定时去请求数据，直到得到最后的结果
      vm.$http.get(vm.$store.state.url + "/printJobStatus/latest?din=" + vm.din + "&jobNum=" + job_num).then((data) => {
        var resultMsg = "";

        if (data.body.length == 0) {
          degree += 1
          if (degree <= 1) {
            resultMsg = { "helpTitle": "该用户未绑定或绑定失效", "result": -1 }
            for (var i = 0; i < vm.$store.state.notification.length; i++) {
              if (vm.$store.state.notification[i].job_num == job_num) {
                vm.$store.state.notification[i].msg.push(resultMsg)
              }
            }
          }
        } else {
          stateObj.nowstate = data.body.id;
          if (data.body.result == 0) {//除了result为0时还是在查询，除0以外均会跳出循环
            if (stateObj.nowstate != stateObj.beforestate) {
              stateObj.beforestate = stateObj.nowstate
              for (var i = 0; i < vm.$store.state.notification.length; i++) {
                if (vm.$store.state.notification[i].job_num == job_num) {
                  var timeStamp = new Date();//时间戳
                  resultMsg = {
                    "time": timeStamp.toLocaleString(),
                    "helpTitle": ' padding.....',
                    "result": data.body.result,
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
                resultMsg = {//成功之后返回的数据
                  "helpTitle": data.body.helpTitle,
                  "helpDigest": data.body.helpDigest,
                  "helpCoverurl": data.body.helpCoverurl,
                  "helpUrl": data.body.helpUrl,
                  "result": data.body.result,
                }
                vm.$store.state.notification[i].num += 1
                vm.$store.state.notification[i].msg.push(resultMsg)
                clearInterval(vm.intervalObj[vm.name + job_num])//清除定时器
                console.log(vm.intervalObj[vm.name + job_num] + '已被清除')
                return false
              }
            }
          }
        }
      })
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


