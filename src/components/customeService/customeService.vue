<template>
  <div class="custom-service">
    <ul class="custom-ul">
      <li class="custom-list first" @mouseenter="_enter">
        <span class="icon"></span>
        <span class="tCode"></span>
        <span class="text">公众号</span>
      </li>
      <li class="custom-list second" @mouseenter="_enter" @click="together">
        <span class="icon"></span>
        <span class="text">热线咨询</span>
      </li>
      <li class="custom-list third" @click="_scrollTop">
        <span class="icon"></span>
      </li>
    </ul>
    <transition name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <div class="custom-wrapper" v-show="show">
        <div class="close-head">
          <i class="close-button" @click="together"></i>
        </div>
        <ul class="custom-wrapper-ul">
          <li class="custom-wrapper-li" v-for="item in fetchData">
            <a class="qq" :href="'tencent://message/?Menu=yes&uin='+item.desc" target="_blank" >
              <span class="qq-logo"></span>
              <span class="qq-name">{{item.dicName}}</span>
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      show:{
        type:Boolean,
        default:false
      },
      together:{
        type:Function
      }
    },
    data(){
      return{
        hook:'',
        url:'/web/qq/list',
        fetchData:[]
      }
    },
    methods:{
      _enter(index){
        this.hook = index;
      },
      _leave(){
        this.hook = ''
      },
      _scrollTop(){
        this.$root.$el.offsetParent.scrollTop = 0;
      },
      _getQQ(){
        this.$http.get(this.url).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.fetchData = response.data;
          }
        })
      }
    },
    created(){
      this._getQQ();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "customeService.styl"
</style>
