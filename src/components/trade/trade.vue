<template>
  <div class="trade-wrapper">
    <div class="swiper-wrapper">
      <div class="banner-wrapper">
        <div class="banner-content">
          <div class="banner-box">
            <div class="banner-contentBox">
              <el-carousel trigger="click" height="414px">
                <el-carousel-item v-for="(item,index) in bannerData.fetchData.banner" :key="index">
                  <img v-lazy="item.adpicturePath" width="100%">
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="trade-container">
      <div class="trade-content">
        <div class="trade-match">
          <div class="trade-title">
            <h3 class="title">撮合交易</h3>
            <div class="trade-search">

            </div>
          </div>
          <div class="trade-tree"></div>
          <div class="trade-box">
            <div class="trade-box-title">
              <div class="trade-box-titleCon">
                <p class="trade-list">
                  <span class="item" v-for="item in match.matchTitle">{{item}}</span>
                </p>
              </div>
            </div>
            <div class="trade-box-con">
              <!--<v-swiper :options="swiperOption">
                <v-swiperSlide v-for="(item,index) in match.fetchData" :key="index">-->
                  <p class="trade-list" v-for="(item,index) in match.fetchData">
                    <span class="item">{{item.productName}}</span>
                    <span class="item">{{item.reqQuantity}}</span>
                    <span class="item">{{item.productProps}}</span>
                    <span class="item">{{item.detailAddress}}</span>
                    <span class="item">{{limitText(item.reqDeadline,1,11)}}</span>
                    <span class="item" @click="_quoted(item.reqCode)"><i class="price">议价</i></span>
                  </p>
                <!--</v-swiperSlide>
              </v-swiper>-->
            </div>
          </div>
        </div>
        <div class="trade-groupBuy">
          <div class="trade-title">
            <h3 class="title">集采交易</h3>
            <div class="trade-search">
            </div>
          </div>
          <div class="trade-tree"></div>
          <div class="trade-box">
            <div class="trade-box-title">
              <div class="trade-box-titleCon">
                <p class="trade-list">
                  <span class="item" v-for="item in groupbuy.groupbuyTitle">{{item}}</span>
                </p>
              </div>
            </div>
            <div class="trade-box-con">
             <!-- <v-swiper :options="swiperOption">
                <v-swiperSlide v-for="(item,index) in groupbuy.fetchData" :key="index">-->
                  <p class="trade-list" v-for="(item,index) in groupbuy.fetchData">
                    <span class="item">{{item.productName}}</span>
                    <span class="item">{{item.reqQuantity}}{{item.unit}}</span>
                    <span class="item">{{item.skuMinPrice}}元</span>
                    <span class="item">{{limitText(item.groupBuyStartTime,1,11)}}—{{limitText(item.groupBuyEndTime,1,11)}}</span>
                    <span class="item">{{item.earnestMoney}}元</span>
                    <span class="item finish" v-if="item.status===9">已完成</span>
                    <span class="item doing" v-if="item.status===0">进行中</span>
                    <span class="item start" v-if="item.status===11">即将开始</span>
                    <span class="item" @click="_linkGroupDetail(item.groupBuyId,item.status)"><i class="price">参团</i></span>
                  </p>
                <!--</v-swiperSlide>
              </v-swiper>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default{
    components:{
      'v-swiper':swiper,
      'v-swiperSlide':swiperSlide
  },
    data(){
      return{
        swiperOption: {
          autoplay: 3500,
          speed: 500,
          loop: false,
          setWrapperSize: false,
          direction: 'vertical',
          slidesPerView: 11,  //配置显示条数
          slidesPerGroup:1,
          mousewheelControl: false,
          simulateTouch: false,//不能拖动
          paginationClickable: true,
          mousewheelControl: false,
          observeParents: true
        },
        bannerData:{
          url: '/web/adPicture/findAdPictureByFlag',
          data: {
            searchFlag: 'trade'
          },
          fetchData:[],
        },
        match:{
          matchTitle:['品名','数量','属性','交货地','时间','操作'],
          url:'/web/match/list',
          fetchData:[],
        },
        groupbuy:{
          groupbuyTitle:['品名','成团数量','预期采购价','集采时间','交纳保证金','状态','操作'],
          url:'/web/groupBuy/findGroupBuyList',
          data:{
            currentPage:'',
            showCount:9,
            productName:'',
            productCategoryId:''
          },
          fetchData:[],
        },
        quoted:{
          url:'/web/match/push'
        },
        quotedData:{
          reqCode:''
        },
      }
    },
    methods:{
      //banner
      _getBanner(){
        this.$http.post(this.bannerData.url, this.bannerData.data, {emulateJSON: true}).then((resp) => {
          let response = resp.body;
          if (response.code === 200) {
            this.bannerData.fetchData = response.data
          }
        }, (resp) => {
          alert("交易中心banner接口调用失败")
        })
      },
      //撮合
      _getMatch(){
        this.$http.get(this.match.url).then((resp)=>{
          let response = resp.body;
          if(response.code === 200){
            this.match.fetchData = response.data;
          }
        },(resp)=>{
          alert("撮合接口调用失败！")
        })
      },
      //报价
      _quoted(item){
        this.quotedData.reqCode = item;
        this.token = cMethods.getCookie('token');
        this.$http.post(this.quoted.url,this.quotedData,{
          emulateJSON:true,
          headers:{
            token:this.token
          }
        }).then(
          (resp)=>{
            let response = resp.body;
            if(response.code===200){
              this.$message.success('报价成功');
              window.location.href=cMethods.getHref()+'?menuId=z10'
            }else if(response.code===409||response.code===410){
              this.$message.error('登录已过期');
              this.$router.push({path:'/login',query:{typeId:1}})
            }else{
              this.$message.warning(response.msg)
            }
          },(error)=>{
            console.log('报价失败！')
          }
        )
      },
      //集采
      _getGroupList(){
        this.$http.post(this.groupbuy.url,this.groupbuy.data,{
          emulateJSON:true
        }).then(
          (resp)=>{
            let response = resp.body;
            if(response.code===200){
              this.groupbuy.fetchData = response.data.pageData;
              this.groupbuy.fetchData.currentPage=response.data.page.currentPage
            }else{
              this.$message.warning(response.msg)
            }
          },(error)=>{
            console.log('调用集采列表接口错误')
          }
        )
      },
      _linkGroupDetail(id,state){
        this.$router.push({
          path:'/groupDetail',
          query:{
            groupBuyId:id,
            groupState:state
          }
        })
      },
      limitText(text,start,end){
        let time = JSON.stringify(text);
        let val = '';
        if(time.length>end){
          val = time.substring(start,end)
        }else{
          val = time;
        }
        return val;
      },
    },
    mounted(){
      this._getBanner();
      this._getMatch();
      this._getGroupList()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "trade.styl"
</style>
