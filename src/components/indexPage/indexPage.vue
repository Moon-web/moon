<template>
  <div class="indexPage-wrapper">
    <div class="swiper-wrapper-con">
      <div class="banner-wrapper">
        <div class="banner-content">
          <div class="banner-box">
            <div class="banner-contentBox">
              <el-carousel trigger="click" height="440px" :interval='5000'>
                <el-carousel-item v-for="(item,index) in indexBanner.fetchData.banner" :key="index">
                    <span class="background-item" v-lazy:background-image="item.adpicturePath" lazy="loading">
                    </span>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
      <div class="other-wrapper">
        <div class="other-top">
          <div class="other-top-bg"></div>
          <span class="other-top-content">Hi，<i v-if="userInfo.loginState===true">{{userInfo.user.name}}</i>你好</span>
          <div class="other-infomation">
            <div class="login-con" v-if="userInfo.loginState===false">
              <span class="login statue" @click="_login">登录</span>
              <span class="register" @click="_register">注册</span>
            </div>
            <div class="exit-login-con" v-if="userInfo.loginState===true">
              <span class="exit-login">欢迎您来到众农联平台</span>
            </div>
          </div>
          <div class="other-small-item">
            <span class="small-item" v-for="item in 4"></span>
          </div>
        </div>
        <div class="other-bottom">
          <h3 class="other-bottom-title">
            <span class="other-bottom-title-con">新闻资讯</span>
            <span class="more" @click="moreNews">更多</span>
          </h3>
          <div class="other-bottom-content">
            <ul class="other-list">
              <li class="other-item" v-if="index<3"
                  @click="_linkNewsDetail(item.infoid)"
                  v-for="(item,index) in news.newsDataNews">{{limitText(item.title,1,25,1)}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="indexPage-container">
      <div class="indexPage-champion">
        <h3 class="champion-title">
          <span class="title-bg"></span>
          <span class="title">最新开馆</span>
        </h3>
        <div class="champion-con">
          <div class="champion-box">
            <v-swiper :options="swiperOption" ref="holder">
              <v-swiperSlide v-for="(item,index) in champion.championDate" :key="index">
                <div class="champion-item" @click="provincial(item.provinceMuseumId,item.provinceMuseumName)">
                  <div class="champion-itemBg-box">
                    <span class="champion-itemBg" v-lazy:background-image="item.provinceMuseumLogo"></span>
                  </div>
                  <span class="champion-mark">{{item.provinceMuseumName}}</span>
                </div>
              </v-swiperSlide>
            </v-swiper>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
      <div class="indexPage-goodsbox">
        <div class="goods-fruits">
          <div class="goods-title">
            <h3 class="title-box">
              <span class="title-bg"></span>
              <span class="title">{{goodsData.firstData.productcategoryName}}</span>
            </h3>
            <div class="goods-content-title">
              <ul class="title-content">
                <li class="title-item" v-if="index<4"
                    :class="goodsData.activeIndexFirst===index?'item-active':''"
                    @click="_clickList(item.productcategoryId,goodsData.firstData.childProductcategory,0)"
                    v-for="(item,index) in goodsData.firstData.childProductcategory">{{item.productcategoryName}}</li>
              </ul>
            </div>
          </div>
          <div class="goods-content">
            <div class="goods-left">
              <div class="goods-left-bg" v-for="item in indexBanner.fetchData.advertisement"
                   v-if="item.adpictureName==='首页1f'"
                   v-lazy:background-image="item.adpicturePath"></div>
            </div>
            <div class="goods-right">
              <ul class="goods-box">
                <li class="goods-item"
                    @click="_productDetail(item.productId)"
                    v-for="(item,index) in goodsData.kindsort.kindDataFirst" v-if="index<7">
                  <div class="item-titleBox">
                    <span class="item-title">{{item.productName}}</span>
                    <span class="item-price">{{item.price}}<i class="unit">元/{{item.productUnit}}</i></span>
                  </div>
                  <div class="item-picture">
                    <span class="item-bg" v-lazy:background-image="item.mainproductImgpath"></span>
                  </div>
                </li>
              </ul>
              <div class="default-box" v-if="goodsData.kindsort.kindDataFirst.length==0"
                   v-lazy:background-image=""></div>
            </div>
          </div>
        </div>
        <div class="goods-forest">
          <div class="goods-title">
            <h3 class="title-box">
              <span class="title-bg"></span>
              <span class="title">{{goodsData.secondData.productcategoryName}}</span>
            </h3>
            <div class="goods-content-title">
              <ul class="title-content">
                <li class="title-item"  v-if="index<4"
                    :class="goodsData.activeIndexSecond===index?'item-active':''"
                    @click="_clickList(item.productcategoryId,goodsData.secondData.childProductcategory,1)"
                    v-for="(item,index) in goodsData.secondData.childProductcategory">{{item.productcategoryName}}</li>
              </ul>
            </div>
          </div>
          <div class="goods-content">
            <div class="goods-left">
              <div class="goods-left-bg" v-for="item in indexBanner.fetchData.advertisement"
                   v-if="item.adpictureName==='首页2f'"
                   v-lazy:background-image="item.adpicturePath"></div>
            </div>
            <div class="goods-right">
              <ul class="goods-box">
                <li class="goods-item"
                    @click="_productDetail(item.productId)"
                    v-for="(item,index) in goodsData.kindsort.kindDataSecond" v-if="index<8">
                  <div class="item-titleBox">
                    <span class="item-title">{{item.productName}}</span>
                    <span class="item-price">{{item.price}}<i class="unit">元/{{item.productUnit}}</i></span>
                  </div>
                  <div class="item-picture">
                    <span class="item-bg" v-lazy:background-image="item.mainproductImgpath"></span>
                  </div>
                </li>
              </ul>
              <div class="default-box" v-if="goodsData.kindsort.kindDataSecond.length==0"
               v-lazy:background-image=""></div>
            </div>
          </div>
        </div>
        <div class="goods-agricultural">
          <div class="goods-title">
            <h3 class="title-box">
              <span class="title-bg"></span>
              <span class="title">{{goodsData.thirdData.productcategoryName}}</span>
            </h3>
            <div class="goods-content-title">
              <ul class="title-content">
                <li class="title-item"  v-if="index<4"
                    :class="goodsData.activeIndexThird===index?'item-active':''"
                    @click="_clickList(item.productcategoryId,goodsData.thirdData.childProductcategory,2)"
                    v-for="(item,index) in goodsData.thirdData.childProductcategory">
                  {{item.productcategoryName}}
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-content">
            <div class="goods-left">
              <div class="goods-left-bg" v-for="item in indexBanner.fetchData.advertisement"
                   v-if="item.adpictureName==='首页3f'"
                   v-lazy:background-image="item.adpicturePath"></div>
            </div>
            <div class="goods-right">
              <ul class="goods-box">
                <li class="goods-item"
                    @click="_productDetail(item.productId)"
                    v-for="(item,index) in goodsData.kindsort.kindDataThird" v-if="index<8">
                  <div class="item-titleBox">
                    <span class="item-title">{{item.productName}}</span>
                    <span class="item-price">{{item.price}}<i class="unit">元/{{item.productUnit}}</i></span>
                  </div>
                  <div class="item-picture">
                    <span class="item-bg" v-lazy:background-image="item.mainproductImgpath"></span>
                  </div>
                </li>
              </ul>
              <div class="default-box" v-if="goodsData.kindsort.kindDataThird.length==0"
                   v-lazy:background-image=""></div>
            </div>
          </div>
        </div>
        <div class="goods-livestock ">
          <div class="goods-title">
            <h3 class="title-box">
              <span class="title-bg"></span>
              <span class="title">{{goodsData.forthData.productcategoryName}}</span>
            </h3>
            <div class="goods-content-title">
              <ul class="title-content">
                <li class="title-item"  v-if="index<4"
                    :class="goodsData.activeIndexForth===index?'item-active':''"
                    @click="_clickList(item.productcategoryId,goodsData.forthData.childProductcategory,3)"
                    v-for="(item,index) in goodsData.forthData.childProductcategory">
                  {{item.productcategoryName}}
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-content">
            <div class="goods-left">
              <div class="goods-left-bg" v-for="item in indexBanner.fetchData.advertisement"
                   v-if="item.adpictureName==='首页4f'"
                   v-lazy:background-image="item.adpicturePath"></div>
            </div>
            <div class="goods-right">
              <ul class="goods-box">
                <li class="goods-item"
                    @click="_productDetail(item.productId)"
                    v-for="(item,index) in goodsData.kindsort.kindDataForth" v-if="index<8">
                  <div class="item-titleBox">
                    <span class="item-title">{{item.productName}}</span>
                    <span class="item-price">{{item.price}}<i class="unit">元/{{item.productUnit}}</i></span>
                  </div>
                  <div class="item-picture">
                    <span class="item-bg" v-lazy:background-image="item.mainproductImgpath"></span>
                  </div>
                </li>
              </ul>
              <div class="default-box" v-if="goodsData.kindsort.kindDataForth.length==0"
                   v-lazy:background-image=""></div>
            </div>
          </div>
        </div>
        <div class="advertisement">
          <div class="advertisement-bg" v-for="item in indexBanner.fetchData.advertisement"
               v-if="item.adpictureName==='首页广告1'"
               v-lazy:background-image="item.adpicturePath"></div>
        </div>
        <div class="news-content">
          <div class="goods-title">
            <h3 class="title-box">
              <span class="title-bg"></span>
              <span class="title">行情资讯</span>
            </h3>
            <div class="goods-content-title" @click="moreNews">
              查看更多>>
            </div>
          </div>
          <div class="news-box">
            <div class="news-left">
              <div class="news-left-top">
                <div class="news-letf-big" v-for="(item,index) in news.newsDataview" v-if="index<1" @click="_linkNewsDetail(item.infoid)">
                  <span class="news-big" v-lazy:background-image="item.infosimgpath"></span>
                  <span class="news-big-title">{{item.title}}</span>
                </div>
                <div class="news-left-small">
                  <div class="news-small-item" v-for="(item,index) in news.newsDataview" v-if="index>=1&&index<5" @click="_linkNewsDetail(item.infoid)">
                    <span class="news-small" v-lazy:background-image="item.infosimgpath"></span>
                    <span class="news-small-title">{{item.title}}</span>
                  </div>
                </div>
              </div>
              <div class="news-left-bottom">
                <div class="news-bottm-item" v-for="(item,index) in news.newsDataview" v-if="index>=5&&index<8" @click="_linkNewsDetail(item.infoid)">
                  <span class="news-bottom-title">{{item.title}}</span>
                  <span class="news-bottom" v-html="limitText(item.content,0,30,1)"></span>
                  <span class="more" @click="_linkNewsDetail(item.infoid)">【更多】</span>
                </div>
              </div>
            </div>
            <div class="news-right">
              <h3 class="news-right-title">
                <span class="title-item" :class="newsActive?'active':''" @click="newsActive=true">会展资讯</span>
                <span class="title-item" :class="newsActive?'':'active'" @click="newsActive=false">专题报道</span>
              </h3>
              <div class="news-rignt-content">
                <div class="news-con" v-show="newsActive===true">
                  <ul class="news-con-box">
                    <li class="news-con-item" v-for="(item,index) in news.newsDataExhibition" v-if="index<9" @click="_linkNewsDetail(item.infoid)">
                      <span class="title-mark">{{index+1}}</span>
                      <span class="item-con">{{item.title}}</span>
                    </li>
                  </ul>
                </div>
                <div class="news-con" v-show="newsActive===false">
                  <ul class="news-con-box">
                    <li class="news-con-item" v-for="(item,index) in news.newsDataInterview" v-if="index<9" @click="_linkNewsDetail(item.infoid)">
                      <span class="title-mark">{{index+1}}</span>
                      <span class="item-con">{{item.title}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="service-center">
          <div class="goods-title">
            <h3 class="title-box">
              <span class="title-bg"></span>
              <span class="title">服務中心</span>
            </h3>
            <div class="goods-content-title" @click="moreService">
              查看更多>>
            </div>
          </div>
          <div class="service-box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Router from '../../router/index'
  import cMethods from '../../common/common'
  import Event from '../../common/emit'
  export default{
    components:{
      'v-swiper': swiper,
      'v-swiperSlide': swiperSlide,
    },
    data(){
      return {
        indexBanner: {
          url: '/web/adPicture/findAdPictureByFlag',
          data: {
            searchFlag: 'index'
          },
          fetchData: [],
        },
        swiperOption: {
          autoplay: 5000,
          speed: 500,
          loop: false,
          setWrapperSize: false,
          direction: 'horizontal',
          mousewheelControl: false,
          simulateTouch: false,//不能拖动
          slidesPerView: 5,  //配置显示条数
          slidesPerGroup:1,//slides的数量多少为一组
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween:13,//margin-top和margin-right
          autoplayDisableOnInteraction: false, //用户操作后autoplay停止,true默认停止，false开启
        },
        champion: {
          url: '/web/provinceMuseum/listProvinceMuseum',
          championDate: [],
        },
        news: {
          url: '/web/info/findList',//新闻接口
          newsDataInterview:[],//专题报道
          newsDataNews:[],//新闻资讯
          newsDataview:[],//独家观点
          newsDataExhibition:[]//会展资讯
        },
        newsActive:true,
        goodsData:{
          url:'/web/productcategorys/findFourFirstCategory',
          firstData:[],
          secondData:[],
          thirdData:[],
          forthData:[],
          activeIndexFirst:0,
          activeIndexSecond:0,
          activeIndexThird:0,
          activeIndexForth:0,
          kindsort:{
            url:'/web/product/findSelling',
            data:{
              productCategoryId:''
            },
            kindDataFirst:[],
            kindDataSecond:[],
            kindDataThird:[],
            kindDataForth:[]
          },
        },
        userInfo:{
          loginState:false,
          userUrl:'/web/individua/getUserInfo',
          user:{
            name:'',
            tel:'',
            roleId:''
          },
        }
      }
    },
    methods:{
      _getBanner(){
        this.$http.post(this.indexBanner.url,this.indexBanner.data,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code === 200){
            this.indexBanner.fetchData = response.data;

          }
        },(resp)=>{
          alert("banner图接口调用失败")
        })
      },
      //最新开馆
      _getChampionDate(){
        this.$http.get(this.champion.url).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.champion.championDate=response.data.provinceMuseums;
          }
        },(resp) => {
          console.log("省级馆列表接口调用失败")
        })
      },
      //进入各个省级馆
      provincial(id,name){
        Router.push({path:'/provincial',query:{provinceMuseumId:id,provinceName:name}})
      },
      //查看更多新闻
      moreNews(){
        Router.push({path:'newsItem?type='})
      },
      //获取专题报道
      _getNewsReport(secondId){
        let data = {
          datas:{
            firstInfoTypeId:1,//1新闻2帮助
            secondInfoTypeId:secondId,
            pageNo: 1,
            pageSize:9
          }
        };
        this.$http.post(this.news.url,data).then((resp)=>{
          let response=resp.body;
          if(response.success===true){
            this.news.newsDataInterview=response.datas.list;
          }
        },(resp)=>{
          this.loadingShow = false;
          console.log("获取专题报道失败！")
        })
      },
      //获取新闻资讯
      _getNewsInfo(secondId){
        let data = {
          datas:{
            firstInfoTypeId:1,//1新闻2帮助
            secondInfoTypeId:secondId,
            pageNo: 1,
            pageSize:3
          }
        };
        this.$http.post(this.news.url,data).then((resp)=>{
          let response=resp.body;
          if(response.success===true){
            this.news.newsDataNews=response.datas.list;
          }
        },(resp)=>{
          this.loadingShow = false;
          console.log("获取新闻资讯失败！")
        })
      },
      //获取独家观点
      _getNewsView(secondId){
        let data = {
          datas:{
            firstInfoTypeId:1,//1新闻2帮助
            secondInfoTypeId:secondId,
            pageNo: 1,
            pageSize:8
          }
        };
        this.$http.post(this.news.url,data).then((resp)=>{
          let response=resp.body;
          if(response.success===true){
            this.news.newsDataview=response.datas.list;
          }
        },(resp)=>{
          this.loadingShow = false;
          console.log("获取行情直播失败！")
        })
      },
      //获取会展资讯
      _getNewsEx(secondId){
        let data = {
          datas:{
            firstInfoTypeId:1,//1新闻2帮助
            secondInfoTypeId:secondId,
            pageNo: 1,
            pageSize:9
          }
        };
        this.$http.post(this.news.url,data).then((resp)=>{
          let response=resp.body;
          if(response.success===true){
            this.news.newsDataExhibition=response.datas.list;
          }
        },(resp)=>{
          this.loadingShow = false;
          console.log("获取行情直播失败！")
        })
      },
      limitText(text,start,end,type){
        //let time = JSON.stringify(text);
        let val = '';
        if(text.length>end&&type===0){
          val = text.substring(start,end)
        }else if(text.length>end&&type===1){
          val = text.substring(start,end)+'......'
        }else{
          val = text;
        }
        return val;
      },
      _linkNewsDetail(id){
        Router.push({path:'/newsDetail',query:{infoId:id}})
      },
      //楼层数据
      _getGoods(){
        this.$http.get(this.goodsData.url).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.goodsData.firstData = response.data.productCategories[0];
            this.goodsData.secondData = response.data.productCategories[1];
            this.goodsData.thirdData = response.data.productCategories[2];
            this.goodsData.forthData = response.data.productCategories[3];
            this._getKindProduct(this.goodsData.firstData.childProductcategory[0].productcategoryId,0)
            this._getKindProduct(this.goodsData.secondData.childProductcategory[0].productcategoryId,1)
            this._getKindProduct(this.goodsData.thirdData.childProductcategory[0].productcategoryId,2)
            this._getKindProduct(this.goodsData.forthData.childProductcategory[0].productcategoryId,3)
          }
        },(resp) => {
          alert("楼层数据接口调用失败")
        })
      },

      _getKindProduct(id,num){
        this.goodsData.kindsort.data.productCategoryId = id
        this.$http.post(this.goodsData.kindsort.url, this.goodsData.kindsort.data, {emulateJSON: true}).then((resp) => {
          let response = resp.body;
          if (response.code === 200) {
            if(num == 0){
              this.goodsData.kindsort.kindDataFirst = response.data;
            }
            if(num == 1){
              this.goodsData.kindsort.kindDataSecond = response.data;
            }
            if(num == 2){
              this.goodsData.kindsort.kindDataThird = response.data;
            }
            if(num == 3){
              this.goodsData.kindsort.kindDataForth = response.data;
            }
          } else {
            console.log(response.msg)
          }
        })
      },
      //不同分类
      _clickList(index,dataObj,num){
        for (let i = 0; i < dataObj.length; i++) {
          if (dataObj[i].productcategoryId === index) {
            if (num == 0){
              this.goodsData.activeIndexFirst = i;
            }
            if (num == 1){
              this.goodsData.activeIndexSecond = i;
            }
            if (num == 2){
              this.goodsData.activeIndexThird = i;
            }
            if (num == 3){
              this.goodsData.activeIndexForth = i;
            }
            this.goodsData.productCategoryId = dataObj[i].productcategoryId;
          }
        }
        this._getKindProduct(index,num);
      },
      //商品详情
      _productDetail(id){
        Router.push({path:'/productDetail',query:{productId:id}})
      },
      //更多服务
      moreService(){
        Router.push('/service')
      },
      //登录
      _login(){
        Router.push({path:'/login',query:{type:1}})
      },
      //注册
      _register(){
        Router.push('/register')
      },
      //获取用户信息
      getData(){
        this.token = cMethods.getCookie('token');
        this.$http.get(this.userInfo.userUrl,{headers:{token:this.token}}).then((resp)=>{
          let response = resp.body;
          if(response.code===410||response.code===409){
            cMethods.setCookie('loginState',false);
            this.userInfo.loginState=false;
          }else{
            this.userInfo.loginState = true;
            this.userInfo.user.name = response.data.name;
            this.userInfo.user.tel = response.data.mobilePhone;
            this.userInfo.user.roleId = response.data.roleId;
            cMethods.setCookie('roleId',this.userInfo.user.roleId);
            cMethods.setCookie('loginState',true);
            Event.$emit('role-id',this.userInfo.user.roleId);
          }
        },(resp)=>{
          cMethods.setCookie('loginState',false);
          alert('用户信息接口调用异常')
        })
      },
    },
    mounted(){
      this._getBanner();
      this._getChampionDate();
      this._getNewsReport(19);
      this._getNewsInfo(8);
      this._getNewsView(4);
      this._getNewsEx(5);
      this._getGoods();
      this.getData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "indexPage.styl"
</style>
