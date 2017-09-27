<template>
<div class="complain-wrapper">
  <div class="head-wrapper">
    <v-head></v-head>
  </div>
  <div class="nav-wrapper">
    <v-nav></v-nav>
  </div>
  <div class="complain-center center">
    <div class="title">
      <h3>问题反馈</h3>
    </div>
    <div class="center-left">
      <div class="title-text">
        <h3>提交问题</h3>
      </div>
      <div class="center-identity">
        <em>*</em><span>您的身份</span>
        <div class="identity">
         <input type="radio" name="radio" value="供应商" /> 供应商
         </div>
        <div class="identity">
          <input type="radio" name="radio" value="采购商" /> 采购商
        </div>
      </div>
      <div class="left-bottom">
          <em>*</em><span>问题描述</span>
          <div class="input-text">
              <input type="text">
          </div>
      </div>
      <div class="button">
        <input type="button" value="保存">
      </div>
    </div>
    <div class="center-right">
      <div class="title-text">
        <h3>我的反馈</h3>
        <div class="span-text">
          <span>建议您 <em>登陆</em> 后再提交反馈，否则无法查看您提交问题的反馈进度</span>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-wrapper">
    <v-footer></v-footer>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Nav from '@/components/nav/nav.vue'
  import Footer from '@/components/footer/footer.vue'
  import Router from '../../router/index.js'
  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "complain.styl"
</style>
