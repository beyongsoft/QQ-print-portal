<template>
  <div class="alert alert-warning warning-message" v-if="warningState">
    <a  class="close" @click="hidden">
        &times;
    </a>
    <strong>Warning！</strong>{{warningContent}}
</div>
</template>
<script>
export default {
  name:'warning',
  data(){
    return{
    }
  },
  computed:{
    warningContent(){
      return this.$store.state.warningContent
    },
    warningState(){
      return this.$store.state.warningState
    }
  },
  methods:{
    hidden(){
      this.$store.state.warningState = false
    }
  }
}
</script>
<style lang="less" scoped>
  .warning-message{
    position: fixed;
    right: 50%;
    bottom: 50%;
    width: 30%;
    margin-right: -15%;
    margin-bottom: 1%;
  }
</style>


