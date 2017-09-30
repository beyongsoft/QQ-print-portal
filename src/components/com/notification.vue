<template>
  <fieldset>
    <h3>Notification</h3>
    <div class="form-group">
      <div class="col-sm-12 col-md-12">
        <div class="notification">
          <div class="panel-group" id="accordion">
              <NotiCollapse v-for="(value,key) in notification" :item="value" :index="key" :key="key"></NotiCollapse>
          </div>
        </div>
      </div>
    </div>
  </fieldset>
</template>
<script>
import NotiCollapse from "./notiCollapse"
export default {
  name: 'notification',
  components:{
    NotiCollapse
  },
  data() {
    return {
    }
  },
  computed:{
    notification(){
      return this.$store.state.notification
    }
  }
}
</script>



