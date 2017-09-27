<template>
  <div class="nothing" v-if="show">
    <span class="nothing-picture"></span>
    <span class="nothing-text">
      ヾ(◍°∇°◍)ﾉﾞ抱歉，没有搜索到任何产品！
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      show:{
        type:Boolean,
        default:true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "nothing.styl"
</style>
