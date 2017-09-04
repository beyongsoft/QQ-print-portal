<template>
  <fieldset>
    <h3>Log</h3>
    <div class="form-group">
      <div class="col-sm-12 col-md-12">
        <div ><pre v-html="logMessage"></pre></div>
      </div>
    </div>
  </fieldset>
</template>
<script>
export default {
  name: 'log',
  data() {
    return {
    }
  },
  computed:{
    logMessage(){
      return this.$store.state.logMessage
    }
  }
}
</script>
<style scoped>
pre {
  max-height: 500px;
  min-height: 100px;
}
</style>


