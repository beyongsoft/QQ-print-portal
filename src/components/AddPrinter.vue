<!--这是绑定printerId的页面-->
<template>
  <div class="bind-progress">
    <div class="submitPrinterBox">
      <button class="btn submitPrinter">提交</button>
    </div>
    <div class="row">
      <div class="col-md-5 col-padding">
        <Gen></Gen>
        <ImgsAndFiles></ImgsAndFiles>
      </div>
      <div class="col-md-6 col-padding">
        <PrintSetting></PrintSetting>
        <PushMessage></PushMessage>
      </div>
      <Loading v-show="showLoading"></Loading>
    </div>
  </div>
</template>
<script>
import Gen from './com/generate'
import ImgsAndFiles from './com/imgsAndFiles'
import PrintSetting from './com/printSetting'
import PushMessage from './com/pushMessage'
import Loading from "./com/loading"
// import Submit from './com/submit'
export default {
  name: 'bind',
  data() {
    return {

    }
  },
  components: {
    Gen,
    ImgsAndFiles,
    PrintSetting,
    PushMessage,
    Loading
  },
  computed: {
    showLoading() {
      return this.$store.state.loading
    }
  }
}

</script>
<style lang="less" scoped>
* {
  color: black;
}

.submitPrinterBox {
  overflow: hidden;
  margin-bottom: 20px;
  margin-top: 20px;
}

.submitPrinter {
  background: #2e6da4;
  color: white;
  float: right;
  width: 80px;
}

</style>
