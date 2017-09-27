<template>
<div class="pagePath">
  <ul class="path-ul">
    <li class="path-li" v-for="item in path" @click="_path(item.path)">
      {{item.text}}
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      path:{
        type:Array
      }
    },
    methods:{
      _path(router){
        if(router===undefined||router===''){
          return false
        }
        this.$router.push(router)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "pagePath.styl"
</style>
