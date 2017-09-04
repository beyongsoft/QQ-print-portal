<template>
  <div class="bind-progress">
    <div class="row bind-bg">
      <Gen></Gen>
      <Scan></Scan>
      <Binding></Binding>
    </div>
  </div>
</template>
<script>
import Gen from './com/generate'
import Scan from './com/scan'
import Binding from './com/binding'
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

