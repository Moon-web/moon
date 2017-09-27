<template>
  <div class="wlbidding">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="swiper-wrapper">
      <div class="banner-wrapper">
        <v-swiper :options="swiperOption">
          <v-swiperSlide v-for="(item,index) in swiperSlides" :style="item.atr" :key="index">
            <img :src="item.url" alt="">
          </v-swiperSlide>
        </v-swiper>
        <div class="swiper-button-prev click-btn"></div>
        <div class="swiper-button-next click-btn"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  <!--  <div class="productNav-wrapper">
      <v-productNav></v-productNav>
    </div>-->
    <div class="wlbidding-content">
      <h3 class="wlbidding-title">
        <span>物流中心</span>
        <span>&gt;</span>
        <span>招标列表</span>
        <span>&gt;</span>
        <span class="last">招标列表</span>
      </h3>
      <div class="wlbidding-center">
        <div class="wlbidding-con">
          <div class="wlbidding-box" v-for="item in wlbinddingData">
            <h3 class="box-title" :id="item.infoid">{{item.title}}</h3>
            <p class="box-content">
              {{item.content.substr(0,115)}}......
            </p>
            <p class="time">
              {{item.updatetime}}
            </p>
          </div>
        </div>
        <div class="page-wrapper">
          <div class="page-content">
            <span class="changePage"
                @click="_returnPage(-1)"
                :class="condition.currentPage<=1?'end':''">上一页</span>
            <span class="pageFlag">
          {{condition.currentPage}}/{{condition.pageTotal}}页
        </span>
            <span class="changePage"
                  @click="_returnPage(1)"
                  :class="condition.currentPage>=condition.pageTotal?'end':''">下一页</span>
            <span class="linkPage">
          <i class="entry-wrapper">
            <input v-model="inputPage" type="number" class="entry" placeholder="页数">
          </i>
          <i class="tag">页</i>
          <i class="confirm" @click="_confirmPage">确定</i>
        </span>
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
  import Nav from '@/components/nav/nav.vue'
  import Footer from '@/components/footer/footer.vue'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer,
      'v-swiper': swiper,
      'v-swiperSlide': swiperSlide
    },
    data(){
      return{
        swiperOption: {
          autoplay: 3500,
          speed:500,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true
        },
        swiperSlides: [
          {
            atr:{
              background: '#889',
              height: '100%',
              textAlign:"center"
            },
            url:'../../../static/wlbidding/img_banner.jpg'
          }
        ],
        wlbinddingUrl:'/web/wuliuInfo/listWulius',
        wlbinddingData:[],
        wlbiddingPage:[],
        condition:{
          pageTotal:'',
          currentPage:'',
        },
        inputPage:'',
        pageResult:[]
      }
    },
    methods:{
      _getData(){
        this.$http.post(this.wlbinddingUrl,this.condition,{emulateJSON:true}).then((resp)=>{
          let response=resp.body;
          if(response.code===200){
            this.wlbinddingData=response.data.pageData;
            this.condition.pageTotal = resp.body.data.page.totalPage;
            this.condition.currentPage = resp.body.data.page.currentPage;
          }
        },(error)=>{
          let response=resp.body;

          console.log(response.msg)
        })
      },
      _returnPage(crease){
        if(this.condition.currentPage>=this.condition.pageTotal&&this.condition.currentPage<=1){
          return false
        }
        if(this.condition.currentPage<=1&&this.condition.currentPage>=this.condition.pageTotal){
          return false
        }
        this.condition.currentPage+=crease;
        this._getData();
      },
      _confirmPage(){
        if(this.inputPage>this.condition.pageTotal){
          return false;
        }
        if(this.inputPage<1){
          return false;
        }
        this.condition.currentPage = this.inputPage;
        this._getData();
      }
    },
    created(){
     this. _getData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "wlbidding.styl"
</style>
