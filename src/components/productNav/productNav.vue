<template>
  <div class="products-nav" v-show="show">
    <div class="nav-wrapper">
      <div class="nav-item"
           v-for="(item,index) in navData"
           @mouseenter="_hover(index)===index?item.iconFocus=true:''"
           @mouseleave="item.iconFocus=false"
           @click="_linkPage(item.path)"
           :class="item.iconFocus===true?'focus':''">
        <div class="nav-item-icon" :class="item.className">
          <i class="icon" :class="item.iconFocus===true?'focus':'normal'"></i>
        </div>
        <div class="nav-item-content">
          <span class="large-title">{{item.title}}</span>
          <span class="little-title">
            <i class="little-tag" v-for="items in item.tag">{{items}}</i>
          </span>
        </div>
      </div>
      <transition name="fade" enter-active-class="animated fadeInLeft">
        <div
          v-show="searchGoods"
          @mouseleave="searchGoods = false"
          class="searchGoods-wrapper">
          <h3 class="searchGoods-title">
            热门产品：
          </h3>
          <span class="goodsName-item">
            木材
          </span>
          <span class="goodsName-item">
            木材
          </span>
          <span class="goodsName-item">
            木材
          </span><span class="goodsName-item">
            木材
          </span>
          <span class="goodsName-item">
            木材
          </span><span class="goodsName-item">
            木材
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default{
  props:{
    show:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      navHook:null,
      searchGoods:false,
      navData:[
        {
          iconFocus:false,
          title:'搜现货',
          path:'',
          className:'first',
          tag:[
            '木材',
            '实木板'
          ]
        },{
          iconFocus:false,
          title:'找物流',
          path:'/logistics',
          className:'second',
          tag:[
            '找车队',
            '查订单'
          ]
        },{
          iconFocus:false,
          title:'打白条',
          path:'/finance',
          className:'third',
          tag:[
            '融资',
            '理财',
            '投资'
          ]
        }
      ]
    }
  },
  methods:{
    _linkPage(path){
      if(path===''){
        return false
      }
      this.$router.push(path)
    },
    _hover(index){
      let hook = index;
      if(this.navHook!==index){
        this.navHook = index
      }
      if(index===0){
        this.searchGoods = true
      }else{
        this.searchGoods = false
      }
      return hook;
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "productNav.styl"
</style>
