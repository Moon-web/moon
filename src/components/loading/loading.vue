<template>
  <div class="loading" v-show="state">
    <div class="loading-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      state:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "loading.styl"
</style>
