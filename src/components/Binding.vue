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
    </div>
  </div>
</template>
<script>
import Gen from './com/generate'
import Scan from './com/scan'
import Binding from './com/binding'
import Log from './com/log'
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
    Log
  }
}
</script>
<style>
.bind-bg{
  background: #fff;
  width:80%;
  margin:20px auto;
  border-radius: 8px;
}
</style>

