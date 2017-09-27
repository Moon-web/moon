<template>
  <div class="nav">
    <div class="nav-center">
      <div class="nav-top">
        <div class="logo" @click="_linkIndex"></div>
        <div class="search">
          <div class="search-input">
           <!-- <span class="tag" @mouseenter="showChoiceList" @mouseleave="showChoiceList">
              <span class="tag-target">{{searchText.text}}</span>
              <span class="tag-choice" v-if="searchTypeShow">
                <i class="choice-list" v-for="item in searchType" @click="changeSearch(item.text)">{{item.text}}</i>
              </span>
            </span>-->
            <span class="input">
              <input type="text"
                     v-model="searchVal"
                     placeholder="请输入您所需的产品"
                     autofocus
                     @keyup.enter="_search(searchVal)">
            </span>
            <span class="search-input-title">
              <span class="item" :class="searchTitle===true?'active':''" @click="searchTitle=true">找产品</span>
              <!--<span class="item" :class="searchTitle===false?'active':''" @click="searchTitle=false">找公司</span>-->
            </span>
          </div>
          <div class="search-button" @click="_search(searchVal)">
            搜索
          </div>
        </div>
      </div>
      <div class="nav-bot">
        <div class="product-nav">
          <i class="operation-wrapper" @click="operationNavShow">商品分类</i>
          <div class="product-nav-wrapper">
            <v-productNav :show="navShow"></v-productNav>
          </div>
        </div>
        <div class="page-nav">
          <ul class="nav-box">
            <li class="item">
              <router-link to="/index">首页</router-link>
            </li>

            <li class="item" @mouseenter="provincialNavIsShow=true" @mouseleave="provincialNavIsShow=false">
              <router-link :to="{path:'/provincial',query:{provinceMuseumId:this.ProvinceMuseumData.provinceMuseumId,provinceName:'山西馆'}}">省级馆</router-link>
              <span class="hot"></span>
              <span class="biao" v-show="provincialNavIsShow" v-if="ProvinceMuseumData.ProvinceMuseum.length>0"></span>
              <div class="provincialNav" v-show="provincialNavIsShow" v-if="ProvinceMuseumData.ProvinceMuseum.length>0">
                <div class="secondNav-wrapper">
                  <div class="secondNav-container">
                    <ul class="secondNav-box">
                      <li class="secontNav-item"
                          @click="_choiceProvinceMuseum(item.provinceMuseumId,item.provinceMuseumName)"
                          v-for="(item,index) in ProvinceMuseumData.ProvinceMuseum" v-if="index<11">
                        <span class="item" :class="ProvinceMuseumData.activeIndex==item.provinceMuseumId?'active':''">{{item.provinceMuseumName}}</span>
                      </li>
                    </ul>
                    <span class="province-more" v-if="len>11" @click="markShow=true">更多</span>
                  </div>
                </div>
              </div>
            </li>
            <li class="item">
              <router-link to="/logistics">物流中心</router-link>
            </li>
            <li class="item">
              <router-link to="/finance">金融中心</router-link>
            </li>
            <li class="item">
              <router-link to="/bidList">众农竞拍</router-link>
            </li>
            <li class="item">
              <router-link to="/service">服务中心</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="provincial-mark-wrapper" v-show="markShow">
      <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="provincial-mark">
          <h3 class="provincial-mark-title">
            <span class="provincial-mark-title-con">众农联省级馆</span>
            <span class="provincial-mark-close" @click="markShow=false"></span>
          </h3>
          <div class="provincial-mark-content">
            <ul class="provincial-mark-content-list">
              <li class="provincial-mark-content-item"
                  @click="_choiceProvinceMuseum(item.provinceMuseumId,item.provinceMuseumName)"
                  v-for="(item,index) in ProvinceMuseumData.ProvinceMuseum"
                  :class="ProvinceMuseumData.activeIndex==item.provinceMuseumId?'provincial-mark-content-item-active':''">
                    {{item.provinceMuseumName}}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  import Event from '../../common/emit'
  import ProductNav from '@/components/productKind/productKind.vue'

  const telRge = /^0?1[0-9][0-9]\d{8}$/;
  export default {
    components:{
      'v-productNav':ProductNav,
    },
    data(){
      return{
        provincialNavIsShow:false,
        searchTitle:true,
        searchVal:'',
        navShow:false,
        markShow:false,
        searchText:{
          text:'产品'
        },
        searchTypeShow:false,
        searchType:[
          {
            type:1,
            text:'产品'
          },{
            type:2,
            text:'商家'
          }
        ],
        askBill:{
          show:false,
          url:'/web/consult/addConsult',
          contentLength:0,
          data:{
            contact:'',
            mobile:'',
            content:''
          }
        },
        ProvinceMuseumData:{
          url:'/web/provinceMuseum/listProvinceMuseum',
          ProvinceMuseum:[],
          activeIndex:'',
          provinceMuseumId:''
        },
        len:''
      }
    },
    methods:{
      _search(name){
        Router.push('/search?productName='+name);
      },
      _linkIndex(){
        Router.push('/index')
      },
      changeSearch(text){
        this.searchText.text = text;
        this.searchTypeShow = false;
      },
      showProvincialNav(){
        this.provincialNavIsShow = !this.provincialNavIsShow;
      },
      getNavShow(){
       if(this.$router.history.current.path==='/index'){
         this.navShow = true;
       }else{
         this.navShow = false;
       }
      },
      operationNavShow(){
        this.navShow = !this.navShow;
      },
      _getProvinceMuseum(){
        this.$http.get(this.ProvinceMuseumData.url).then((resp) => {
          let response = resp.body
          if(response.code === 200){
            this.ProvinceMuseumData.activeIndex =Router.history.current.query.provinceMuseumId || response.data.provinceMuseums[0].provinceMuseumId
            this.ProvinceMuseumData.provinceMuseumId = response.data.provinceMuseums[0].provinceMuseumId
            this.ProvinceMuseumData.ProvinceMuseum = response.data.provinceMuseums
            this.len = this.ProvinceMuseumData.ProvinceMuseum.length;
          }
        },(resp) => {
          alert("省级馆接口调用失败")
        })
      },
      _choiceProvinceMuseum(id,province){
        this.ProvinceMuseumData.activeIndex = id;
        this.markShow = false;
        Router.push({path:'/provincial',query:{
          provinceMuseumId:id,
          provinceName:province
        }});
        return false
      },
      _watchRouter(){
        this.$watch('$route', function (n, o) {
          if (n.path !== '/provincial') {
            return false
          } else {
            this.ProvinceMuseumData.activeIndex = Router.history.current.query.provinceMuseumId;
          }
        })
      },
    },
    watch:{
      '$route':'getNavShow'
    },
    created(){
      this.getNavShow();
    },
    mounted(){
      this._getProvinceMuseum();
      this._watchRouter();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "nav.styl"
</style>
