<template>
  <div class="service-wrapper">
    <div class="swiper-wrapper">
      <div class="banner-wrapper">
        <div class="banner-content">
          <div class="banner-box">
            <div class="banner-contentBox">
              <el-carousel trigger="click" height="440px" :interval='5000'>
                <el-carousel-item v-for="(item,index) in serviceBanner.fetchData.banner" :key="index">
                  <span class="background-item" v-lazy:background-image="item.adpicturePath" lazy="loading"></span>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="service-container">
      <div class="service-item" v-for="(item,index) in serviceData">
        <div class="item-left" v-lazy:background-image="item.src"></div>
        <div class="item-right">
          <div class="item-title-box">
            <span class="item-left"></span>
            <h3 class="item-title">{{item.title}}</h3>
            <span class="item-right"></span>
          </div>
          <p class="item-con">{{item.content}}</p>
          <span class="look-detail active" v-if="index==0" @click="_linkMore">点击查看</span>
          <span class="look-detail" v-else>敬请期待</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  export default{
    data(){
      return{
        serviceBanner:{
          url: '/web/adPicture/findAdPictureByFlag',
          data: {
            searchFlag: 'service'
          },
          fetchData:[],
        },
        serviceData:[
          {
            src: "../../../static/service/img_1.jpg",
            title: "对外服务中心",
            content: "众农联对外服务中心集技术专家、技术培训、设施建设等核心功能，联合孙桥农业现代院核心资源优势，为全国各地农业园区、农业基地、农业企业、合作社等提供专业服务支持。"
          },
          {
            src: "../../../static/service/img_2.jpg",
            title: "全球农产品金融中心",
            content:"众农联供应链金融服务中心，集供应链金融、多种融资、金融服务等专业高效的综合性互联网+金融服务中心，对平台创新农企、优质农企及优质农业项目提供专业金融服务，帮助平台农业企业高效发展。"
          },
          {
            src: "../../../static/service/img_3.jpg",
            title: "全球农产品展销中心",
            content: "众农联农产品展销中心，利用坐落于上海自贸区、孙桥现代农业园区内的众农联全球总部第一期3.2万方展示中心和VR等技术，为全国各省市及其它国家提供一站式、永不落幕的农产品展示体验中心。"
          },
          {
            src:"../../../static/service/img_4.jpg",
            title: "全球产品大数据中心",
            content: "众农联全球农业大数据中心，汇聚行业上中下游海量信息，以农业行业大数据的“采集存储”、“清洗分析”和“管理应用”三个核心功能为目标，打造农业行业的大数据生态系统。"
          },
          {
            src: "../../../static/service/img_6.jpg",
            title: "智慧农业公共服务中心",
            content: "众农联智慧农业人才服务中心，利用平台集聚的优质资源及政策优势，为农业企业的发展和创新提供共享型共性综合服务。"
          },
          {
            src: "../../../static/service/img_7.jpg",
            title: "智慧农业人才中心",
            content: "众农联智慧农业人才服务中心，以推动现代农业领域现代化教育培训体系的构建，培养特色农业产业高素质人才为己任，提高农业产业高技能人才培训，优质人才输送。聚集农业行业顶级师资、专家力量及海量专业人才，打造互相学习、交流和研讨的平台。"
          },
          {
            src: "../../../static/service/img_8.jpg",
            title: "智慧农业现代物流中心",
            content: "众农联现代物流服务中心，是以众农联平台会员企业为切入点、以特色农产品运输为基础、以半成品/成品/运输为延伸、以物流信息化系统为支撑，将物流企业、农产品基地、车源、货源集中整合到一起，并进行集成化管理、可视化运作，使物流企业和农产品基地、农业企业各取所需、互惠互利、抱团发展的一个“B2B+O2O”特色农业产业物流平台。众农联智慧物流平台将成为中国第一个也是最大的一个特色农业产业物流平台。"
          },
          {
            src: "../../../static/service/img_5.jpg",
            title: "智慧农业研究中心",
            content: "智慧农业研究中心，利用农业专家团队，专业研究、解读农业行业政策、特色农产品的各项检验检测标准、基地认证标准等以及符合行业的系列标准体系和政策研究，承担政府部门战略科研项目。"
          },
        ],
      }
    },
    methods:{
      _getBanner(){
        this.$http.post(this.serviceBanner.url,this.serviceBanner.data,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code === 200){
            this.serviceBanner.fetchData = response.data;
          }
        },(resp)=>{
          alert("banner图接口调用失败")
        })
      },
      _linkMore(){
        Router.push('/serviceOutside')
      }
    },
    mounted(){
      this._getBanner();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "service.styl"
</style>
