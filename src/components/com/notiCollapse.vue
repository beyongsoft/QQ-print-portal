<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title text-left">
        <a class="changeStyle" data-toggle="collapse" data-parent="#accordion" :href="'#collapse'+index" @click="changeNum">
          <dl>
            <dt>
              <i class="iconfont" v-bind:class="[isimg ? 'icon-tupian1': 'icon-wenben']"  style="font-size:32px;"></i>
            </dt>
            <dd>
              <p>
                <span>{{item.fileName}}</span>
                <span>{{item.job_num}}</span>
              </p>
              <p>
                <span style="font-size:12px; color:#666;" v-if="item.msg!=''">{{item.msg[item.msg.length-1].helpTitle}}</span>
              </p>
            </dd>
          </dl>
          <div class="messageNum" v-if="item.num!=0" v-html="item.num"></div>
        </a>
      </h4>
    </div>
    <div :id="'collapse'+index" class="panel-collapse collapse">
      <div class="panel-body">
        <div class="printe-result" v-for="(value,index) in item.msg" :key="index">
          <p class="text-left">{{value.helpTitle}}
            <span class="text-right" style="display:none;" v-show="value.result==0">{{value.time}}</span>
          </p>
          <div class="last-result" style="display:none;" v-show="value.result==2">
            <img :src="value.helpCoverurl" />
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
      num:0,
      isimg:false
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
  created(){
      var imageArr=["jpg","png","gif","jpeg","bmp"]
      if(imageArr.indexOf(this.item.fileName.split(".")[1])!=-1){
        this.isimg=true
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
    font-size: 16px;
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
    padding: 5px;
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
    width: 20ox;
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

