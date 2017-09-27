<template>
  <div id="serviceOutside">
    <div class="head-wrapper">
      <v-head></v-head>
      <v-nav></v-nav>
    </div>
    <div class="content-wrapper">
      <div class="banner-wrapper">
        <el-carousel trigger="click" height="440px" :interval='5000'>
          <el-carousel-item v-for="(item,index) in banner.data.banner" :key="index">
              <span class="background-item" v-lazy:background-image="item.adpicturePath" lazy="loading">
              </span>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="introduce">
        <div class="introduce-item" v-for="item in introduce">
          <div class="item-top" v-lazy:background-image="item.url" @click="_openPage(item.href)"></div>
          <div class="item-bot">{{item.text}}</div>
        </div>
      </div>
      <div class="specialist">
        <div class="specialist-title">
          <span class="title">农业技术专家</span>
        </div>
        <div class="specialist-wrapper">
          <div class="content">
            <v-swiper :options="swiperOptions">
              <v-swiperSlide v-for="(item,index) in specialist.data" :key="index">
                <div class="content-item">
                  <span class="picture" v-lazy:background-image="item.infosimgpath"></span>
                  <span class="name">{{item.title}}</span>
                </div>
              </v-swiperSlide>
            </v-swiper>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Footer from '@/components/footer/footer.vue'
  import Nav from '@/components/nav/nav.vue'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    components: {
      'v-head': Head,
      'v-footer': Footer,
      'v-nav': Nav,
      'v-swiper': swiper,
      'v-swiperSlide': swiperSlide
    },
    data(){
      return {
        swiperOptions:{
          autoplay: 5000,
          speed: 500,
          loop: false,
          setWrapperSize: false,
          direction: 'horizontal',
          mousewheelControl: false,
          simulateTouch: false,//不能拖动
          slidesPerView: 4,  //配置显示条数
          slidesPerGroup:1,//slides的数量多少为一组
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          autoplayDisableOnInteraction: false, //用户操作后autoplay停止,true默认停止，false开启
        },
        introduce: [
          {
            url: '../../../static/serviceOutside/img_yqgh.jpg',
            href:'http://www.sunqiaoma.com/Article/201507/201507140025.shtml',
            text: '园区规划'
          }, {
            url: '../../../static/serviceOutside/img_ssjs.jpg',
            href:'http://www.sunqiaogreenhouse.com/',
            text: '设施建设'
          }, {
            url: '../../../static/serviceOutside/img_jspx.jpg',
            href:'http://www.sunqiaoma.com/Article/201507/2015071400276.shtml',
            text: '技术培训'
          }, {
            url: '../../../static/serviceOutside/img_hzjd.jpg',
            href:'http://www.sunqiaoma.com/Article/201507/201507140030.shtml',
            text: '合作基地'
          }
        ],
        banner: {
          url: '/web/adPicture/findAdPictureByFlag',
          arg: {
            searchFlag: 'serviceOutside'
          },
          data: []
        },
        specialist:{
          url:'/web/info/getInfoList',
          arg: {
            firstInfoTypeId: 1,
            secondInfoTypeId: 44
          },
          data:[]
        }
      }
    },
    methods: {
      _getBanner(){
        this.$http.post(this.banner.url, this.banner.arg, {emulateJSON: true}).then((resp) => {
          let response = resp.body;
          if (response.code === 200) {
            this.banner.data = response.data
          }
        })
      },
      _getSpecialist(){
        this.$http.post(this.specialist.url,this.specialist.arg,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.specialist.data = response.data.infolist;
          }
        })
      },
      _openPage(href){
        window.open(href)
      }
    },
    mounted(){
      this._getBanner();
      this._getSpecialist()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "serviceOutside.styl"
</style>
