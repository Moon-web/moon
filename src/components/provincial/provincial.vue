<template>
  <div class="provincial-wrapper">
    <div class="finance-banner">
      <div class="swiper-wrapper">
        <div class="banner-wrapper">
          <div class="banner-content">
            <div class="banner-box">
              <div class="banner-contentBox">
                <el-carousel height="960px">
                  <el-carousel-item v-for="(item,index) in financeBanner.fetchFinance.banner" :key="index">
                    <span class="background-item" v-lazy:background-image="item.adpicturePath" lazy="loading"></span>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--内容部分-->
    <div class="provincial-container">
      <!--头部-->
      <div class="center-title">
        <div class="title-header">
          <span class="title-text product"></span>
          <span class="title-more" @click="moreHot"></span>
        </div>
      </div>
      <!--图片 名称 产地 公司 价格-->
      <div class="provincial-box">
        <ul class="provincial-banned">
          <li class="banned" v-for="(item,index) in ProvinceMuseumData.ProvinceMuseum" v-if="index<5">
            <div class="banned-center">
              <div class="brand-itemBox" @click="_linkDetail(item.productId)" v-lazy:background-image="item.mainproductImgpath">
              </div>
              <div class="brand-itemTitle">
                <div class="itemTitle-Name">
                  {{item.productName}}
                </div>
                <div class="itemTitle-adr">
                  <span class="brand-itemAdd">产地：{{item.dispatchAddress || '众农联'}}</span>
                </div>
                <div class="itemTitle-company">
                  {{item.corporateName}}
                </div>
                <div class="itemTitle-price">
                  <span class="brand-Price">劲爆价</span>
                  <span class="brand-itemPrice">
                    ¥<i class="tag">{{item.price}}</i>/{{item.productUnit}}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--循环2-->
      <div class="center-title">
        <div class="title-header">
          <span class="title-text corporate"></span>
          <span class="title-more" @click="moreBrand"></span>
        </div>
      </div>
      <div class="center-box">
        <ul class="brand-list">
          <li class="brand-item"
              v-for="(item,index) in ProvinceMuseumData.corporate">
            <div class="item-center">
              <div class="brand-itemBox" v-lazy:background-image="item.corporateLogo">
              </div>
              <div class="brand-itemTitle">
                <span class="brand-itemName">{{item.corporateName}}</span>
              </div>
              <div class="brand-button">
                <span class="detail" @click="_linkNext(item.corporateId,1)">查看详情></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="custom-service">
      <ul class="custom-ul">
        <li class="custom-list" @click="_linkCorporate">
          <span class="icon"></span>
          <span class="text">特色农产品</span>
        </li>
        <li class="custom-list" @click="_linkProduct">
          <span class="icon"></span>
          <span class="text">农业农头企业</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  export default{
    data(){
      return {
        financeBanner: {
          url: '/web/adPicture/findAdPictureByFlag',
          data: {
            searchFlag: ''
          },
          fetchFinance: []
        },
        ProvinceMuseumData: {
          url: '/web/provinceMuseum/goProvinceMuseum',
          arg: {
            provinceMuseumId: '',
          },
          ProvinceMuseum: [],
          corporate: [],
          activeIndex: 0,
          provinceName:''
        }
      }
    },
    methods: {
      _getFinanceBanner(){
        this.financeBanner.data.searchFlag = decodeURI(this.$router.history.current.query.provinceName);
        this.$http.post(this.financeBanner.url,this.financeBanner.data,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if (response.code === 200) {
            this.financeBanner.fetchFinance = response.data;
          }
        })
      },
      _getProvinceMuseum(){
        this.ProvinceMuseumData.arg.provinceMuseumId = this.$router.history.current.query.provinceMuseumId;
        this.$http.post(this.ProvinceMuseumData.url, this.ProvinceMuseumData.arg, {emulateJSON: true}).then((resp) => {
          let response = resp.body;
          if (response.code === 200) {
            this.ProvinceMuseumData.ProvinceMuseum = response.data.products;
            this.ProvinceMuseumData.corporate = response.data.corporates;
          }
        }, (resp) => {
          console.error('调用省级管失败')
        });
      },
      _watchProvince(){
        this.$watch('$route', function (n, o) {
          if (n.path !== '/provincial') {
            return false
          } else {
            this._getProvinceMuseum();
            this._getFinanceBanner();
          }
        })
      },
      //更多龙头企业
      moreBrand(){
        let provinceMuseumId = Router.history.current.query.provinceMuseumId;
        Router.push({path: '/brandList', query: {corporateType: 1, provinceMuseumId: provinceMuseumId}})
      },
      //特色产品查看更多
      moreHot(){
        let provinceMuseumId = Router.history.current.query.provinceMuseumId;
        Router.push({path: '/search', query: {provinceMuseumId: provinceMuseumId}})
      },
      _linkNext(id, type){
        let provinceMuseumId = Router.history.current.query.provinceMuseumId;
        Router.push({
          path: '/brandDetail',
          query: {
            corporateId: id,
            corporateType: type,
            provinceMuseumId: provinceMuseumId
          }
        })
      },
      _linkCorporate(){
        this.$root.$el.offsetParent.scrollTop = 1228;
      },
      _linkProduct(){
        this.$root.$el.offsetParent.scrollTop = 4188;
      },
      _linkDetail(id){
        this.$router.push({path:'/productDetail',query:{productId:id}})
      },
    },
    mounted(){
      this._getProvinceMuseum();
      this._getFinanceBanner();
      this._watchProvince();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "provincial.styl"
</style>
