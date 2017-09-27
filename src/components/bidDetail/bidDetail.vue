<template>
  <div class="bidDetail-wrapper">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="bidDetail-container">
      <div class="bidDetail-content">
        <div class="bidDetail-top">
          <div class="bidDetail-top-left">
            <div class="bidDetail-img" v-lazy:background="bidDetail.coverImage"></div>
            <!--竞拍报名 3-->
            <div class="bidDetail-mark" v-if="bidDetail.bidDetailData.status == 3">
              <h3 class="mark-title">报名记录<span class="mark-num">共报名<i class="mark-ci">{{listSuccessEnroll.listSuccessEnrollData.length||0}}</i>次</span></h3>
              <div class="bidDetail-mark-con">
                <ul class="bidDetail-mark-con-title">
                  <li class="bidDetail-mark-con-list">
                    <span class="item">报名企业</span>
                    <span class="item">申请数量</span>
                    <span class="item">单位</span>
                    <span class="item">时间</span>
                  </li>
                </ul>
                <div class="bidDetail-mark-content" v-if="listSuccessEnroll.listSuccessEnrollData.length>0">
                  <v-swiper :options="swiperOption">
                    <v-swiperSlide v-for="(item,index) in listSuccessEnroll.listSuccessEnrollData" :key="index">
                      <p class="bidDetail-mark-con-list">
                        <span class="item item-active">{{item.corporateName}}</span>
                        <span class="item item-active">{{item.reqQuantity}}</span>
                        <span class="item">{{item.unit}}</span>
                        <span class="item">{{item.createTime}}</span>
                      </p>
                    </v-swiperSlide>
                  </v-swiper>
                </div>
                <div class="bidDetail-mark-content" v-if="listSuccessEnroll.listSuccessEnrollData.length==0">
                  <p class="bidDetail-mark-content-no">暂无报名信息</p>
                </div>
              </div>
            </div>
            <!--待竞拍 4-->
            <div class="bidDetail-mark" v-if="bidDetail.bidDetailData.status == 4">
              <h3 class="mark-title">报名记录<span class="mark-num">共报名<i class="mark-ci">{{listSuccessEnroll.listSuccessEnrollData.length||0}}</i>次</span></h3>
              <div class="bidDetail-mark-con">
                <ul class="bidDetail-mark-con-title">
                  <li class="bidDetail-mark-con-list">
                    <span class="item">报名企业</span>
                    <span class="item">申请数量</span>
                    <span class="item">单位</span>
                    <span class="item">时间</span>
                  </li>
                </ul>
                <div class="bidDetail-mark-content" v-if="listSuccessEnroll.listSuccessEnrollData.length>0">
                  <v-swiper :options="swiperOption">
                    <v-swiperSlide v-for="(item,index) in listSuccessEnroll.listSuccessEnrollData" :key="index">
                      <p class="bidDetail-mark-con-list">
                        <span class="item item-active">{{item.corporateName}}</span>
                        <span class="item item-active">{{item.reqQuantity}}</span>
                        <span class="item">{{item.unit}}</span>
                        <span class="item">{{item.createTime}}</span>
                      </p>
                    </v-swiperSlide>
                  </v-swiper>
                </div>
                <div class="bidDetail-mark-content" v-if="listSuccessEnroll.listSuccessEnrollData.length==0">
                  <p class="bidDetail-mark-content-no">暂无报名信息</p>
                </div>
              </div>
            </div>
            <!--竞拍中 5-->
            <div class="bidDetail-mark" v-if="bidDetail.bidDetailData.status == 5">
              <h3 class="mark-title">出价记录<span class="mark-num">共出价<i class="mark-ci">{{subList.subListData.length||0}}</i>次</span></h3>
              <div class="bidDetail-mark-con">
                <ul class="bidDetail-mark-con-title">
                  <li class="bidDetail-mark-con-list">
                    <span class="item">竞拍企业</span>
                    <span class="item">出价金额</span>
                    <span class="item">数量（吨）</span>
                    <span class="item">出价时间</span>
                  </li>
                </ul>
                <div class="bidDetail-mark-content" v-if="subList.subListData.length>0">
                  <v-swiper :options="swiperOption">
                    <v-swiperSlide v-for="(item,index) in subList.subListData" :key="index">
                      <p class="bidDetail-mark-con-list">
                        <span class="item">{{item.auctionBuyer.buyer.corporateName}}</span>
                        <span class="item">{{item.bidPrice}}</span>
                        <span class="item">{{item.bidNum}}{{item.auction.auctionReq.unit}}</span>
                        <span class="item">{{item.auctionReq.updateTime}}</span>
                      </p>
                    </v-swiperSlide>
                  </v-swiper>
                </div>
                <div class="bidDetail-mark-content" v-if="subList.subListData.length==0">
                  <p class="bidDetail-mark-content-no">暂无竞拍出价信息</p>
                </div>
              </div>
            </div>
            <!--竞拍结束 6-->
            <div class="bidDetail-mark" v-if="bidDetail.bidDetailData.status == 6">
              <h3 class="mark-title">出价记录<span class="mark-num">共出价<i class="mark-ci">{{auctionBuyerSub.auctionBuyerSubData.length}}</i>次</span></h3>
              <div class="bidDetail-mark-con">
                <ul class="bidDetail-mark-con-title">
                  <li class="bidDetail-mark-con-list end-list">
                    <span class="item">状态</span>
                    <span class="item">报名企业</span>
                    <span class="item">申请数量</span>
                    <span class="item">单位</span>
                    <span class="item">出价时间</span>
                  </li>
                </ul>
                <div class="bidDetail-mark-content" v-if="auctionBuyerSub.auctionBuyerSubData.length>0">
                  <v-swiper :options="swiperOption">
                    <v-swiperSlide v-for="(item,index) in auctionBuyerSub.auctionBuyerSubData" :key="index">
                      <p class="bidDetail-mark-con-list end-list">
                        <span class="item">
                          <i class="end-status status-success" v-if="item.status==1">中标</i>
                          <i class="end-status status-fail" v-else>出局</i>
                        </span>
                        <span class="item">{{item.auctionBuyer.buyer.corporateName}}</span>
                        <span class="item">{{item.bidPrice}}</span>
                        <span class="item">{{item.bidFinalNum}}{{item.auctionBuyer.auction.auctionReq.unit}}</span>
                        <span class="item">{{item.updateTime}}</span>
                      </p>
                    </v-swiperSlide>
                  </v-swiper>
                </div>
                <div class="bidDetail-mark-content" v-if="auctionBuyerSub.auctionBuyerSubData.length<=0">
                  <p class="bidDetail-mark-content-no">暂无出价信息</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bidDetail-top-right">
            <!--竞拍报名 3-->
            <div class="bidDetail-top-status" v-if="bidDetail.bidDetailData.status == 3">
              <h3 class="bidDetail-name">
                <span class="bidList-list-name">{{bidDetail.auctionReq.productName}}</span>
                <span class="bidList-list-number">{{bidDetail.auctionReq.reqQuantity}}{{bidDetail.auctionReq.unit}}</span>
              </h3>
              <div class="bidDetail-status">
                <span class="status-bg status-start">即将开始</span>
                <span class="over-time" v-if="bidDetail.bidDetailData.status == 3">距离竞拍开始<i class="over">{{decreaseDate.day}}</i>天<i class="over">{{decreaseDate.hour}}</i>时<i class="over">{{decreaseDate.minute}}</i>分<i class="over">{{decreaseDate.second}}</i>秒</span>
                <span class="over-time" v-if="bidDetail.bidDetailData.status == 4">距离竞拍开始<i class="over">{{decreaseDate.day}}</i>天<i class="over">{{decreaseDate.hour}}</i>时<i class="over">{{decreaseDate.minute}}</i>分<i class="over">{{decreaseDate.second}}</i>秒</span>
              </div>
              <div class="bidDetail-address">
                <span class="address">地区：</span>
                <span class="address-detail">{{bidDetail.divisionName}}</span>
              </div>
              <div class="bidDetail-con">
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">报名企业数量：</span>
                  <span class="bidDetail-con-itemCon"><i class="unit">4家</i></span>
                </p>
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">已申请数量：</span>
                  <span class="bidDetail-con-itemCon">40块</span>
                </p>
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">竞拍数量：</span>
                  <span class="bidDetail-con-itemCon" v-if="bidDetail.auctionReq">
                  <i class="changeBtn" @click="_changeNum(-1,-bidDetail.auctionReq.numRange)">-</i>
                  <input type="text" class="changeNum" v-model="bidDetail.bidNumber">
                  <i class="changeBtn" @click="_changeNum(-1,bidDetail.auctionReq.numRange)">+</i>
                </span>
                </p>
                <p class="bidDetail-button-con">
                  <span class="bidDetail-button" @click="_enroll(bidDetail.bidDetailData.auctionId,bidDetail.bidNumber)">立即报名</span>
                </p>
              </div>
            </div>
            <!--待竞拍 4-->
            <div class="bidDetail-top-status" v-if="bidDetail.bidDetailData.status == 4">
              <h3 class="bidDetail-name">
                <span class="bidList-list-name">{{bidDetail.productName}}</span>
                <span class="bidList-list-number">{{bidDetail.auctionReq.reqQuantity}}{{bidDetail.auctionReq.unit}}</span>
              </h3>
              <div class="bidDetail-status">
                <span class="status-bg  status-start">已报名</span>
                <span class="over-time">距离竞拍开始<i class="over">{{decreaseDate.day}}</i>天<i class="over">{{decreaseDate.hour}}</i>时<i class="over">{{decreaseDate.minute}}</i>分<i class="over">{{decreaseDate.second}}</i>秒</span>
              </div>
              <div class="bidDetail-address">
                <span class="address">地区：</span>
                <span class="address-detail">{{bidDetail.divisionName}}</span>
              </div>
              <div class="bidDetail-con">
                <p class="bidDetail-con-enroll">您已报名成功！</p>
                <p class="bidDetail-con-enroll-num">已申请数量：20块</p>
                <p class="bidDetail-con-enroll-wait">等待竞拍开始</p>
              </div>
            </div>
            <!--竞拍中 5-->
            <div class="bidDetail-top-status" v-if="bidDetail.bidDetailData.status == 5">
              <h3 class="bidDetail-name">
                <span class="bidList-list-name">{{bidDetail.auctionReq.productName}}</span>
                <span class="bidList-list-number">{{bidDetail.auctionReq.reqQuantity}}{{bidDetail.auctionReq.unit}}</span>
              </h3>
              <div class="bidDetail-status">
                <span class="status-bg  status-starting">正在拍卖</span>
                <span class="over-time">距离竞拍结束<i class="over">{{decreaseDate.day}}</i>天<i class="over">{{decreaseDate.hour}}</i>时<i class="over">{{decreaseDate.minute}}</i>分<i class="over">{{decreaseDate.second}}</i>秒</span>
              </div>
              <div class="bidDetail-address">
                <span class="address">地区：</span>
                <span class="address-detail">{{bidDetail.divisionName}}</span>
              </div>
              <div class="bidDetail-con">
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">当前价格：</span>
                  <span class="bidDetail-con-itemCon">￥<i class="money">{{bidDetail.auctionReq.bidprice}}</i><i class="unit">元/块</i></span>
                </p>
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">已申请数量：</span>
                  <span class="bidDetail-con-itemCon">40块</span>
                </p>
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">竞拍出价：</span>
                  <span class="bidDetail-con-itemCon">
                    <i class="changeBtn" @click="_changeNum(1,-bidDetail.auctionReq.bidRange)">-</i>
                    <input type="text" class="changeNum" v-model="bidDetail.bidNumber">
                    <i class="changeBtn" @click="_changeNum(1,bidDetail.auctionReq.bidRange)">+</i>
                  </span>
                  <span class="rule">加价幅度：{{bidDetail.auctionReq.bidRange}}元/{{bidDetail.auctionReq.unit}}</span>
                </p>
                <p class="bidDetail-button-con">
                  <span class="bidDetail-button" @click="_biding()">立即出价</span>
                </p>
              </div>
            </div>
            <!--竞拍结束 6-->
            <div class="bidDetail-top-status" v-if="bidDetail.bidDetailData.status == 6">
              <h3 class="bidDetail-name">
                <span class="bidList-list-name">{{bidDetail.auctionReq.productName}}</span>
                <span class="bidList-list-number">{{bidDetail.auctionReq.reqQuantity}}{{bidDetail.auctionReq.unit}}</span>
              </h3>
              <div class="bidDetail-status">
                <span class="status-bg status-start">竞拍结束</span>
                <span class="over-time end">{{bidDetail.bidDetailData.auctionEndTime}}</span>
                <span class="over-end-bg"></span>
              </div>
              <div class="bidDetail-address">
                <span class="address">地区：</span>
                <span class="address-detail">{{bidDetail.divisionName}}</span>
              </div>
              <div class="bidDetail-con end-con">
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">最高成交价格：</span>
                  <span class="bidDetail-con-itemCon"><i class="money">￥{{auctionResult.auctionResultNum.bidMaxPrice}}</i><i class="unit">元/{{bidDetail.auctionReq.unit}}</i></span>
                </p>
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">最低成交价格：</span>
                  <span class="bidDetail-con-itemCon"><i class="money">￥{{auctionResult.auctionResultNum.bidMinPrice}}</i><i class="unit">元/{{bidDetail.auctionReq.unit}}</i></span>
                </p>
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">成功竞拍总数：</span>
                  <span class="bidDetail-con-itemCon">
                    <i class="money">{{auctionResult.auctionResultNum.auctionSum}}</i><i class="unit">{{bidDetail.auctionReq.unit}}</i>
                  </span>
                </p>
                <p class="bidDetail-con-price">
                  <span class="bidDetail-con-item">中标企业数量：</span>
                  <span class="bidDetail-con-itemCon">
                    <i class="money">{{auctionResult.auctionResultNum.count}}</i><i class="unit">家</i>
                  </span>
                </p>
              </div>
            </div>
            <div class="bidDetail-describe" v-if="bidDetail.auctionReq">
              <p class="bidDetail-describe-list">
                <span class="bidDetail-describe-item">起拍价</span>
                <span class="bidDetail-describe-item-con">{{bidDetail.auctionReq.startPrice}}元/{{bidDetail.auctionReq.unit}}</span>
              </p>
              <p class="bidDetail-describe-list">
                <span class="bidDetail-describe-item">保证金</span>
                <span class="bidDetail-describe-item-con" v-if="bidDetail.bidDetailData.recognizanceRule == 1">{{bidDetail.bidDetailData.recognizanceValue}}（固定金额）</span>
                <span class="bidDetail-describe-item-con" v-if="bidDetail.bidDetailData.recognizanceRule == 2">{{bidDetail.bidNumber*bidDetail.auctionReq.startPrice*bidDetail.bidDetailData.recognizanceValue/100}}（按比例）</span>
              </p>
              <p class="bidDetail-describe-list">
                <span class="bidDetail-describe-item">延时周期</span>
                <span class="bidDetail-describe-item-con">{{bidDetail.bidDetailData.delayTime}}分</span>
              </p>
              <p class="bidDetail-describe-list">
                <span class="bidDetail-describe-item">数量增幅</span>
                <span class="bidDetail-describe-item-con" v-if="bidDetail.auctionReq">{{bidDetail.auctionReq.numRange}}{{bidDetail.auctionReq.unit}}</span>
              </p>
              <p class="bidDetail-describe-list">
                <span class="bidDetail-describe-item">竞拍数量</span>
                <span class="bidDetail-describe-item-con">{{bidDetail.auctionReq.startNum}}{{bidDetail.auctionReq.unit}}起</span>
              </p>
              <p class="bidDetail-describe-list">
                <span class="bidDetail-describe-item">最小加价单位</span>
                <span class="bidDetail-describe-item-con">{{bidDetail.auctionReq.bidRange}}元/{{bidDetail.auctionReq.unit}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="bidDetail-bottom">
          <h3 class="bidDetail-bottom-title">商品信息</h3>
          <div class="bidDetail-bottom-introduce">
            <ul class="bidDetail-bottom-list" v-if="bidDetail.auctionReq">
              <li class="bidDetail-bottom-item">
                <span class="item-title">品牌：</span>
                <span class="item-con">{{bidDetail.auctionReq.productProp1||'暂无'}}</span>
              </li>
              <li class="bidDetail-bottom-item">
                <span class="item-title">产地：</span>
                <span class="item-con">{{bidDetail.auctionReq.productProp2||'暂无'}}</span>
              </li>
              <li class="bidDetail-bottom-item">
                <span class="item-title">净含量：</span>
                <span class="item-con">{{bidDetail.auctionReq.productProp3||'暂无'}}</span>
              </li>
              <li class="bidDetail-bottom-item">
                <span class="item-title">保质期：</span>
                <span class="item-con">{{bidDetail.auctionReq.productProp4||'暂无'}}</span>
              </li>
              <li class="bidDetail-bottom-item">
                <span class="item-title">存储方式：</span>
                <span class="item-con">{{bidDetail.auctionReq.productProp5||'暂无'}}</span>
              </li>
              <li class="bidDetail-bottom-item">
                <span class="item-title">生产日期：</span>
                <span class="item-con">{{bidDetail.auctionReq.productProp6||'暂无'}}</span>
              </li>
            </ul>
          </div>
          <div class="bidDetail-bottom-con" v-if="bidDetail.auctionReq">
            <p class="bidDetail-detail-title">
              产品详情：
            </p>
            <span class="bidDetail-detail" v-html="bidDetail.auctionReq.productDetail"></span>
            <span class="picture-box">
              <img v-lazy="bidDetail.coverImage" width="100%">
            </span>
            <span class="picture-box" v-for="item in 4">
              <img v-lazy="item" width="100%">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
    <div class="load-wrapper">
      <v-loading :state="loadingState"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Nav from '@/components/nav/nav.vue'
  import Footer from '@/components/footer/footer.vue'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Router from '../../router/index'
  import Loading from '@/components/loading/loading.vue'
  import cMethods from '../../common/common'

  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer,
      'v-swiper': swiper,
      'v-swiperSlide': swiperSlide,
      'v-loading': Loading
    },
    data(){
      return{
        loadingState: false,
        swiperOption: {
          autoplay: 5000,
          speed: 500,
          loop: false,
          setWrapperSize: false,
          direction: 'vertical',
          slidesPerView: 6,  //配置显示条数
          slidesPerGroup:1,
          mousewheelControl: false,
          simulateTouch: false,//不能拖动
          paginationClickable: true,
          mousewheelControl: false,
          observeParents: true
        },
        bidDetail:{
          url:'/web/webAuction/auctionDetial',
          data:{
            auctionId:''
          },
          bidDetailData:[],
          bidNumber:0,//竞拍出价或报名数量
          coverImage:'',
          productName:'',
          auctionReq:null,
          divisionName:''

        },
        endTime:'',
        decreaseDate:{
          day: '',
          hour: '',
          minute: '',
          second: ''
        },
        //竞拍
        biding:{
          url:'/web/webAuctionBuyerSub/bid',
          data:{
            auctionId:'',
            bidPrice:''
          },
          bidingData:[]
        },
        //报名记录列表
        listSuccessEnroll:{
          url:'/web/webAuctionBuyer/listSuccessEnroll',
          data:{
            auctionId:'',
            currentPage:'',
            showCount:20
          },
          listSuccessEnrollData:[]
        },
        //出价列表
        subList:{
          url:'/web/webAuctionBuyerSub/subList',
          data:{
            auctionId:''
          },
          subListData:[],
        },
        //最终竞价列表
        auctionBuyerSub:{
          url:'/web/webAuctionBuyerSub/cal',
          data:{
            auctionId:''
          },
          auctionBuyerSubData:[],
        },
        //竞价结果（企业数量）
        auctionResult: {
          url:'/web/webAuction/auctionResult',
          data:{
            auctionId:'',
          },
          auctionResultNum:[]
        }
      }
    },
    methods:{
      _getData(){
        this.loadingState = true;
        this.bidDetail.data.auctionId = Router.history.current.query.auctionId;
        this.bidDetail.status = Router.history.current.query.status;
        this.$http.post(this.bidDetail.url,this.bidDetail.data,{emulateJSON:true}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.loadingState = false;
            this.bidDetail.bidDetailData = response.data;
            this.bidDetail.auctionReq = response.data.auctionReq;
            this.bidDetail.coverImage = response.data.auctionReq.coverImage;
            this.bidDetail.productName = response.data.auctionReq.productName;
            this.bidDetail.divisionName = response.data.auctionReq.division.divisionName
            if(this.bidDetail.bidDetailData.status == 2 ){
              this.endTime = this.bidDetail.bidDetailData.enrollStartTime;//距离报名开始
              this.bidDetail.bidNumber = this.bidDetail.auctionReq.startNum;
            }else if(this.bidDetail.bidDetailData.status == 3){
              this.endTime = this.bidDetail.bidDetailData.auctionStartTime;//距离竞拍开始
              this.bidDetail.bidNumber = this.bidDetail.auctionReq.startNum;
              this._listSuccessEnroll();
            }else if(this.bidDetail.bidDetailData.status == 4){
              this.endTime = this.bidDetail.bidDetailData.auctionStartTime;//距离竞拍开始
              this._listSuccessEnroll();
            }else if(this.bidDetail.bidDetailData.status == 5){
              this.bidDetail.bidNumber = this.bidDetail.auctionReq.startPrice
              this.endTime = this.bidDetail.bidDetailData.auctionEndTime;//距离竞拍结束
              this._subList();
            }else{
              this.endTime = this.bidDetail.bidDetailData.auctionEndTime;//距离竞拍结束
              this.bidDetail.bidNumber = this.bidDetail.auctionReq.startNum;
              this._auctionBuyerSub();
              this._auctionResult();
            }
            this._getTime()
          }
        },(resp) => {
          this.loadingState = false;
          console.log("竞拍详情接口调用失败")
        })
      },
      _getTime(){
        let newTime = this.endTime;
        let ntime = this._splitCurrentDate(this.endTime);
        let _this = this;
        let timer = null;
        function decrease() {//计算结束时间
          let leftTime = (new Date(ntime.year, ntime.month - 1, ntime.day, ntime.hour, ntime.minute, ntime.second)) - (new Date()); //计算剩余的毫秒数
          let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
          let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
          let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
          let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
          if(days <= 0 && hours <=0 && minutes <=0 && seconds <=0){
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
            window.clearInterval(timer);
          }
          days = _this._checkTime(days);
          hours = _this._checkTime(hours);
          minutes = _this._checkTime(minutes);
          seconds = _this._checkTime(seconds);
          _this.decreaseDate.day = days;
          _this.decreaseDate.hour = hours;
          _this.decreaseDate.minute = minutes;
          _this.decreaseDate.second = seconds;
        }
        timer = window.setInterval(decrease, 1000);
      },
      _checkTime(i){
        if (i < 10) {
          i = '0' + i;
        }
        return i
      },
      _splitCurrentDate(time){
        let date = time.split(' ');
        let y = date[0];
        let t = date[1];
        let nowYear = parseInt(y.split('-')[0]);
        let nowMonth = parseInt(y.split('-')[1]);
        let nowDay = parseInt(y.split('-')[2]);
        let nowHour = parseInt(t.split(':')[0]);
        let nowMinute = parseInt(t.split(':')[1]);
        let nowSecond = parseInt(t.split(':')[2]);
        let nowDate = {
          year: nowYear,
          month: nowMonth,
          day: nowDay,
          hour: nowHour,
          minute: nowMinute,
          second: nowSecond
        };
        return nowDate;
      },
      _changeNum(type,num){
        this.bidDetail.bidNumber = this.bidDetail.bidNumber+num;
        if(type == 1){
          if (this.bidDetail.bidNumber <= 0 || this.bidDetail.bidNumber <= this.bidDetail.auctionReq.startPrice) {
            this.bidDetail.bidNumber = this.bidDetail.auctionReq.startPrice
            this.$message.warning('价格不能小于' + this.bidDetail.auctionReq.startPrice + '！');
          }
        } else if(type == -1 ) {
          if (this.bidDetail.bidNumber <= 0 || this.bidDetail.bidNumber <= this.bidDetail.auctionReq.startNum) {
            this.bidDetail.bidNumber = this.bidDetail.auctionReq.startNum;
            this.$message.warning('数量不能小于'+this.bidDetail.auctionReq.startNum+'！');
          }
        }
      },
      //竞拍
      _biding(){
        this.biding.data.auctionId = Router.history.current.query.auctionId;
        this.biding.data.bidPrice = this.bidDetail.bidNumber;
        this.token = cMethods.getCookie("token");
        this.$http.post(this.biding.url,this.biding.data,{emulateJSON:true,headers:{
          token:this.token
        }}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            alert("竞拍成功")
          }else if (response.code === 409 || response.code === 410) {
            this.$message.warning('请先登录！');
            Router.push({path:'/login',query:{typeId:1}})
          }else {
            this.$message.warning(response.msg)
          }
        },(resp) => {
          console.log("竞拍接口调用失败")
        })
      },
     //报名
      _enroll(auctionid,quantity){
        Router.push({
          path: '/bidenroll',
          query: {
            auctionId: auctionid,
            reqQuantity: quantity,
          }
        })
      },
      //报名记录列表
      _listSuccessEnroll(){
        this.listSuccessEnroll.data.auctionId = Router.history.current.query.auctionId;
        this.$http.post(this.listSuccessEnroll.url,this.listSuccessEnroll.data,{emulateJSON:true}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.listSuccessEnroll.listSuccessEnrollData = response.data.pageData;
          }
        },(resp) => {
          console.log("报名记录列表调用失败！")
        })
      },
      //出价列表
      _subList(){
        this.subList.data.auctionId = Router.history.current.query.auctionId;
        this.$http.post(this.subList.url,this.subList.data,{emulateJSON:true}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.subList.subListData = response.data.pageData
          }
        },(resp) => {
          console.log("出价列表失败")
        })
      },
      //最终竞价列表
      _auctionBuyerSub(){
        this.auctionBuyerSub.data.auctionId = Router.history.current.query.auctionId;
        this.$http.post(this.auctionBuyerSub.url,this.auctionBuyerSub.data,{emulateJSON:true}).then((resp) => {
          this.$nextTick(() => {
            let response = resp.body;
            if (response.code === 200) {
              this.auctionBuyerSub.auctionBuyerSubData = response.data.pageData;
            }
          }, (resp) => {
            console.log("最终竞价列表调用失败！")
          })
        })
      },
      //竞价结果（企业数量）
      _auctionResult(){
        this.auctionResult.data.auctionId = Router.history.current.query.auctionId;
        this.$http.post(this.auctionResult.url,this.auctionResult.data,{emulateJSON:true}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.auctionResult.auctionResultNum = response.data;
          }
        },(resp) => {
          console.log("最终竞价调用失败！")
        })
      }
    },
    created(){
      this._getData();
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "bidDetail.styl"
</style>
