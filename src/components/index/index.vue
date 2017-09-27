<template>
  <div class="index">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="child-wrapper">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Footer from '@/components/footer/footer.vue'
  import Nav from '@/components/nav/nav.vue'
  export default {
    components: {
      'v-head': Head,
      'v-footer': Footer,
      'v-nav': Nav
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "index.styl"
</style>
