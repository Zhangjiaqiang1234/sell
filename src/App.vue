<template>
  <div>
      <v-header :seller="seller"></v-header>
      <div class="tab">

          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
          <div class="tab-item">
              <router-link to="/goods">商品</router-link>
          </div>
          <div class="tab-item">
              <router-link to="/ratings">评论</router-link>
          </div>
          <div class="tab-item">
              <router-link to="/seller">商家</router-link>
          </div>
      </div>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header';

  const ERR_OK = 0;

export default {
  data () {
      return {
          seller: {}
      };
  },
  created () {
      this.$http.get('/api/seller').then((res) => {
          // ajax 成功时的回调函数
          res = res.body;
          if (res.errno === ERR_OK) {
              this.seller = res.data;
          } else {
              console.log('res.errno !== ERR_OK !');
          }
      }, () => {
          // ajax 失败时的回调函数
          console.log('ajax 请求seller数据失败 url = /api/seller');
      });
  },
  components: {
      'v-header': header
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
@import './common/stylus/index.styl';
body
    min-height:100vh
.tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
        flex:1
        text-align:center
        & > a
            display: block
            font-size: 14px
            color: rgb(77,85,93)
            &.active
                color: rgb(240,20,20)

</style>
