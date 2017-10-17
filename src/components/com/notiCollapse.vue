<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title text-left">
        <a class="changeStyle" data-toggle="collapse" data-parent="#accordion" :href="'#collapse'+index" @click.prevent="changeNum" @contextmenu.prevent>
          <dl>
            <dt>
              <i class="iconfont" v-bind:class="[item.isimage ? 'icon-tupian1': 'icon-wenben']" style="font-size:32px;"></i>
            </dt>
            <dd>
              <p>
                <span>{{item.fileName}}</span>
                <span>{{item.jobNum}}</span>
              </p>
              <p>
                <span style="font-size:12px; color:#666;" v-if="item.msg!=''">{{item.msg[item.msg.length-1].helpTitle}}</span>
              </p>
            </dd>
          </dl>
          <div class="messageNum"  v-if="item.num!=0" v-html="item.num"></div>
        </a>
      </h4>
    </div>
    <div :id="'collapse'+index" class="panel-collapse collapse">
      <div class="panel-body">
        <p class="text-left" style="color:#333;"><span>{{item.fileName}}</span>&nbsp;&nbsp;<span>{{item.jobNum}}</span></p>
        <div class="printe-result" v-for="(value,index) in item.msg" :key="index">
          <p class="text-left">{{value.helpTitle}}
            <span class="text-right" style="display:none;" v-show="value.result==0">{{value.time}}</span>
          </p>
          <div class="last-result" style="display:none;" v-show="value.resultCode==2">
            <img :src="value.helpCoverurl" />
            <p v-html="value.helpDigest" style="text-align: left;margin: 1rem 0;font-size: 0.9rem;color: #999;"></p>
            <p class="JDlink text-left">
              <a :href="value.helpUrl" target='_brank'>查看详情</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'notiCollapse',
  data() {
    return {
      idName: "",
      href: "",
      state: false,
      unreadState: true,//有新消息的num
      num:0
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    changeNum() {
      this.item.num = 0
    }
  }
}
</script>
<style lang="less" scoped>
.printe-result {
  color: #333;
  h3 {
    color: #000;
    font-size: 1rem;
    font-weight: bold;
    margin: 10px;
  }
  img {
    width: 100%;
    height: 90%;
    border: none;
  }
  .JDlink {
    margin: 5%;
  }
}
.panel-heading{
  background: #fff;
  color:#333;
}
.changeStyle {
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  dd,
  dt {
    float: left;
    padding: 4px;
    span {
      margin-left: 5px;
      width:200px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }
  }
  .messageNum {
    background: rgba(0, 168, 249, 0.56);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    margin-top: 20px;
  }
}

.changeStyle:hover {
  color: #337ab7
}
</style>

