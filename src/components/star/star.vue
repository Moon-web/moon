<template>
  <div class="evaluate">
    <ul class="evaluate-star">
      <li class="star-item emptyStar-item" v-for="(item,index) in emptyStar" v-if="index<5"></li>
      <li class="star-item fullStar-item" v-for="(item,index) in fullStar" v-if="index<5"></li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      star:{
        type:Number
      }
    },
    data(){
      return{
        emptyStar:'',
        fullStar:'',
      }
    },
    methods:{
      _getStar(){
        let starData=null;
        starData=this.star;
        if(starData>5){
          starData=5;
        }
        this.emptyStar=starData;
        this.fullStar=5-starData;
      }
    },
    created(){
      this._getStar();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "star.styl"
</style>
