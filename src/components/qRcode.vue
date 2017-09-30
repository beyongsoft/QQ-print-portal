<!--打印页面-->
<template>
  <div class="print-process">
    <div class="row">
      <div class="col-md-5 col-padding">
        <UploadFile></UploadFile>
        <Log></Log>
        <iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>
      </div>
      <div class="col-md-6 col-padding">
        <Notification></Notification>
      </div>
    </div>
  </div>
</template>


<script>
import UploadFile from './com/fliesetting'
import Log from './com/log'
import Notification from './com/notification'
export default {
  name: 'qRcode',
  data() {
    return {
    }
  },
  components: {
    UploadFile,
    Log,
    Notification
  },
    beforeRouteEnter(to,from,next){//路由传入参数的时候，修改全局的printeEmailId
        if(to.params){
            next(vm=>{
                vm.$store.state.PrintEmailId = to.params.emailId
            })
        }
    },

}
</script>



