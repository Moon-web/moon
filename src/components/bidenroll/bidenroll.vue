<template>
  <div class="bidenroll-wrapper">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="bidenroll-container">
      <h3 class="bidenroll-title">竞拍活动报名</h3>
      <div class="bidenroll-content">
        <p class="bidenroll-content-title">
          <span class="bidenroll-content-item">竞拍编号</span>
          <span class="bidenroll-content-item">商品名称</span>
          <span class="bidenroll-content-item">竞拍剩余总数</span>
          <span class="bidenroll-content-item">参与数量</span>
        </p>
        <div class="bidenroll-content-box">
          <div class="bidenroll-content-item">{{enrollDetail.auctionReqCode }}</div>
          <div class="bidenroll-content-item">
            <span class="bidenroll-content-item-bg" v-lazy:background="enrollDetail.detail.auctionReq.coverImage"></span>
            <span class="bidenroll-content-item-con">{{enrollDetail.detail.auctionReq.productName}}</span>
          </div>
          <div class="bidenroll-content-item">{{enrollDetail.detail.auctionReq.reqQuantity}}</div>
          <div class="bidenroll-content-item">
            <span class="bidenroll-content-item-num">{{enrollDetail.enrollNum}}</span>
          </div>
        </div>
        <div class="bidenroll-content-address">
          <span class="address-title">选择收货地区：</span>
          <span class="detail-address">
            <v-citySelect></v-citySelect>
          </span>
        </div>
      </div>
      <div class="bidenroll-content-bid">
        <div class="bidenroll-content-bid-con">
          <div class="bidenroll-content-bid-right">
            <p class="nim-num">
              <span class="title-item">最低采购数量：</span>
              <span class="title-con">{{enrollDetail.detail.auctionReq.startNum}}{{enrollDetail.detail.auctionReq.unit}}</span>
            </p>
            <p class="nim-num">
              <span class="title-item">最小增幅单位：</span>
              <span class="title-con">{{enrollDetail.detail.auctionReq.numRange}}{{enrollDetail.detail.auctionReq.unit}}</span>
            </p>
            <p class="nim-num">
              <span class="title-item">竞拍日期：</span>
              <span class="title-con">{{limitText(enrollDetail.detail.auctionStartTime,1,11,0)}}~{{limitText(enrollDetail.detail.auctionEndTime,1,11,0)}}</span>
            </p>
            <p class="enroll-money">
              <span class="title-item">保证金金额：</span>
              <span class="title-con">{{enrollDetail.recognizance}}元</span>
            </p>
          </div>
        </div>
        <div class="enroll">
          <div class="enroll-left">
            <input type="checkbox" checked/> 我以阅读并同意<i class="xieyi">竞拍协议</i>
          </div>
          <div class="enroll-right">
            <span class="enroll-cancle">取消报名</span>
            <span class="enroll-button" @click="_makeEnroll()">确定报名</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingState"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Nav from '@/components/nav/nav.vue'
  import Footer from '@/components/footer/footer.vue'
  import Router from '../../router/index'
  import citySelect from '@/components/citySelect/citySelect.vue'
  import cMethods from '../../common/common.js'
  import Event from '../../common/emit'
  import Loading from '@/components/loading/loading.vue'

  export default{
    components: {
      'v-head': Head,
      'v-nav': Nav,
      'v-footer': Footer,
      'v-citySelect':citySelect,
      'v-loading': Loading,
    },
    data(){
      return{
        loadingState: false,
        addressCode:{},
        enrollDetail:{
          url:'/web/webAuction/auctionDetial',
          data:{
            auctionId:''
          },
          detail:[],
          enrollNum:'',//报名数量
          auctionReqCode:'',//竞拍code
          recognizance:''//保证金金额
        },
        //竞拍报名
        enroll:{
          url:'/web/webAuctionBuyer/enroll',
          data:{
            auctionReqId:'',
            auctionId:'',
            reqQuantity:'',
            addressCode:'',
          }
        },
        token:''
      }
    },
    methods:{
      _getData(){
        this.loadingState = true;
        this.enrollDetail.data.auctionId = Router.history.current.query.auctionId;
        this.enrollDetail.enrollNum = Router.history.current.query.reqQuantity;
        this.enroll.data.reqQuantity = Router.history.current.query.reqQuantit;
        this.$http.post(this.enrollDetail.url,this.enrollDetail.data,{emulateJSON:true}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.loadingState = false;
            this.enrollDetail.detail = response.data;
            this.enrollDetail.auctionReqCode = response.data.auctionReq.auctionReqCode;
            this.enroll.data.auctionReqId = response.data.auctionReq.auctionReqId;
            if(this.enrollDetail.detail.recognizanceRule == 1){
              this.enrollDetail.recognizance = this.enrollDetail.detail.recognizanceValue
            }else{
              this.enrollDetail.recognizance = this.enrollDetail.enrollNum*this.enrollDetail.detail.auctionReq.startPrice*this.enrollDetail.detail.recognizanceValue/100
            }
          }
        },(resp) => {
          this.loadingState = false;
          console.log("竞拍详情接口调用失败")
        })
      },
      //报名
      _makeEnroll(){
        this.token = cMethods.getCookie("token");
        this.enroll.data.auctionId = Router.history.current.query.auctionId;
        this.enroll.data.reqQuantity = Router.history.current.query.reqQuantity;
        this.$http.post(this.enroll.url,this.enroll.data,{emulateJSON:true,headers:{
          token:this.token
        }}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            let auctionBuyerId = response.data
            this.$message.success("您已成功报名该竞拍活动，请支付保证金");
            Router.push({
              path: '/bidenrollMoney',
              query: {
                recognizance: this.enrollDetail.recognizance,
                auctionReqId: this.enroll.data.auctionReqId,
                auctionBuyerId: auctionBuyerId,
                auctionId: this.enroll.data.auctionId,
              }
            })
          }else if (response.code === 409 || response.code === 410) {
            this.$message.warning('请先登录！');
            Router.push({path:'/login',query:{typeId:1}})
          }else {
            this.$message.warning(response.msg)
          }
        },(resp) => {
          console.log("竞拍活动报名失败")
        })
      },
      //获取地址code
      hah(v){
        this.addressCode = v;
        this.enroll.data.addressCode = this.addressCode.district.addressCode
      },
      _getCitySelect(){
        let _this = this;
        Event.$on('throwData',function(v){
          _this.hah(v);
        })
      },
      limitText(text,start,end,type){
        let time = JSON.stringify(text);
        let val = '';
        if(time.length>end&&type===0){
          val = time.substring(start,end)
        }else if(time.length>end&&type===1){
          val = time.substring(start,end)+'......'
        }else{
          val = time;
        }
        return val;
      },
    },
    mounted(){
      this._getData();
      this._getCitySelect();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "bidenroll.styl"
</style>

