<template>
  <fieldset>
    <h3>Log</h3>
    <div class="form-group">
      <div class="col-sm-12 col-md-12">
        <div style="text-align: left; max-height: 1000px; overflow: auto;">
      <tree-view :data="logMessage" :options="{maxDepth: 4,modifiable:false}"></tree-view>
        </div>
      </div>
    </div>
  </fieldset>
</template>
<script>

export default {
    name: 'log',
    data() {
        return {}
    },
    computed: {
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



