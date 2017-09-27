<template>
  <div class="wlbidding" ref="wlbidding">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="swiper-wrapper">
      <div class="banner-wrapper">
        <div class="banner-content">
          <div class="banner-box">
            <div class="banner-contentBox">
              <el-carousel trigger="click" height="414px" :interval='5000'>
                <el-carousel-item v-for="(item,index) in swiperSlides" :key="index">
                  <span class="background-item"  v-lazy:background-image="item.adpicturePath" lazy="loading"></span>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wlbidding-content">
      <div class="wlbidding-center">
        <div class="wlbidding-con">
          <div class="wlbidding-box" v-for="item in wlbindding.fetchData">
            <h3 class="box-title" @click="_linkNext(item.infoid)">{{item.title}}</h3>
            <p class="box-content" v-html="limitText(item.content,0,90,1)">
            </p>
            <p class="time">
              {{item.updatetime}}
            </p>
          </div>
        </div>
        <!--<div class="page-wrapper">
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
        </div>-->
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
  import Router from "../../router/index.js"
  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer,
    },
    data(){
      return{
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
        wlbindding:{
          url:'/web/info/getInfoList',
          fetchData:[],
          data:{
            firstInfoTypeId:1,
            secondInfoTypeId:26
          }
        },
        wlbinddingData:[],
        wlbiddingPage:[],
        condition:{
          pageTotal:'',
          currentPage:'',
        },
        inputPage:'',
        pageResult:[],
        path:[
          {
            text:'首页',
            path:'/index'
          },
          {
            text:'物流中心',
            path:'/logistics',
          },
          {
            text:'物流资讯',
            path:''
          }
        ],
      }
    },
    methods:{
      _getlistBidding(){
        {
          this.$http.post(this.wlbindding.url, this.wlbindding.data, {emulateJSON: true}).then((resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.wlbindding.fetchData = response.data.infolist;
            }
          }, (resp) => {
            let response = resp.body;
            console.log(response.msg)
          })
        }
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
      },
      _linkNext(id){
        Router.push({path:'/biddingDetail',query:{infoid:id}})
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
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
    },
    created(){
     this. _getlistBidding();
     this.scrollTop()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "wlbidding.styl"
</style>
