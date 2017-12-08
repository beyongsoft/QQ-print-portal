<!--这是绑定printerId的页面-->
<template>
  <form class="bind-progress">
    <div class="submitPrinterBox">
      <button class="btn submitPrinter">submit</button>
    </div>
    <div class="row">
      <div class="col-md-5 col-padding">
        <Gen></Gen>
        <PushMessage></PushMessage>
      </div>
      <div class="col-md-6 col-padding">
        <ImgsAndFiles></ImgsAndFiles>
        <PrintSetting></PrintSetting>
        <PrinterDescription></PrinterDescription>
      </div>
      <Loading v-show="showLoading"></Loading>
    </div>
  </form>
</template>
<script>
import Gen from './com/generate'
import ImgsAndFiles from './com/imgsAndFiles'
import PrintSetting from './com/printSetting'
import PushMessage from './com/pushMessage'
import PrinterDescription from './com/printerDescription'
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
    PrinterDescription,
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
