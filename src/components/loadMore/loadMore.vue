<template>
  <div class="load" :class="loadClass">
    {{loadText}}
    <div class="loading" v-show="state">
      加载中...
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      end:{
        type:Boolean
      },
      state:{//加载状态
        type:Boolean
      }
    },
    data(){
      return{
        loadText:'加载更多',
        loadClass:''//loadOver
      }
    },
    methods:{
      _watchLoadingState(){
        if(this.state===false&&this.end===true){
          this.loadText = '已加载全部';
          this.loadClass = 'loadOver';
        }else{
          this.loadText = '加载更多';
          this.loadClass = '';
        }
      }
    },
    watch:{
      'end':'_watchLoadingState'
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "loadMore.styl";
</style>
