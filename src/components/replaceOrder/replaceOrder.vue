<template>
  <div class="replace-wrapper">
    <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="replaceOrder-box" v-show="state">
        <div class="replaceOrder">
          <p class="close" @click="close"></p>
          <p class="item">欢迎来到众农联平台，若想购买请咨询众农联</p>
          <p class="item">平台热线：021-8012 5325
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      state: {
        type: Boolean,
        default: false
      },
      close:{
        type:Function
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "replaceOrder.styl"
</style>
