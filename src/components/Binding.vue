<!--这是绑定printerId的页面-->
<template>
  <div class="bind-progress">
    <div class="row">
      <div class="col-md-5 col-padding">
      <Gen></Gen>
      <Scan></Scan>
      <Binding></Binding>
      </div>
      <div class="col-md-6 col-padding">
        <Log></Log>
      </div>
      <Loading v-show="showLoading"></Loading>
    </div>
  </div>
</template>
<script>
import Gen from './com/generate'
import Scan from './com/scan'
import Binding from './com/binding'
import Log from './com/log'
import Loading from "./com/loading";
export default {
  name: 'bind',
  data() {
    return {

    }
  },
  components: {
    Gen,
    Scan,
    Binding,
    Log,
    Loading
  },
  computed:{
      showLoading(){
          return this.$store.state.loading
      }
  }
}
</script>


