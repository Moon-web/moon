<template>
  <div class="bidenroll-wrapper">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="bidenrollMoney-wrapper">
      <div class="bidenrollMoney-container">
        <div class="bidenrollMoney-top">
          <div class="bidenrollMoney-top-box">
            <div class="bidenrollMoney-top-left">
              <p class="name">恭喜您竞拍报名成功，请尽快支付保证金</p>
              <p class="warn">提交报名成功后，请于<i class="red">14小时内付款</i>，否则取消竞拍报名资格</p>
            </div>
            <div class="bidenrollMoney-top-right">
              <p class="bidenrollMoney-top-right-con">
                保证金金额：<span class="money">￥{{enrollMney.data.recognizance}}</span>元
              </p>
            </div>
          </div>
        </div>
        <div class="bidenrollMoney-style">
          <div class="bidenrollMoney-onLine">
            <p class="Line-title"><input ref="onLine" class="checkbox" type="radio" name="line"/>选择线上支付</p>
            <div class="Line-con"></div>
          </div>
          <div class="bidenrollMoney-outLine">
            <p class="Line-title"><input ref="outLine" class="checkbox" type="radio" checked name="line"/>选择线下支付</p>
            <div class="upload">
              <input type="file" nama="avatar" ref="payEvidenceAd" accept="image/gif,image/jpeg,image/jpg,image/png">
            </div>
          </div>
        </div>
        <div class="money-pay">
          <div class="money-pay-right">
            <span class="money-pay-button" @click="_enrollMoney">确定支付</span>
            <span class="money-pay-button-cancle" @click="_cancleEnroll()">取消支付</span>
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
        loadingState:false,
        headers: {
          token: ''
        },
        enrollMney:{
          url:'/web/webAuctionBuyer/bidenrollMoney',
          data: {
            recognizance: '',//保证金金额
            auctionReqId: '',
            auctionBuyerId: '',
            auctionId: '',
            payEvidenceAd: '',//支付凭证
            payMode: '',//支付方式，1 线上  2 线下
           // payMemo: ''//支付说明
          }
        },
        token:'',
        roleId:''
      }
    },
    methods: {
      _getData(){
        console.log(this.$refs.payEvidenceAd)
        this.headers.token = cMethods.getCookie('token');
        this.enrollMney.data.recognizance = Router.history.current.query.recognizance;
        this.enrollMney.data.auctionReqId = Router.history.current.query.auctionReqId;
        this.enrollMney.data.auctionBuyerId = Router.history.current.query.auctionBuyerId;
        this.enrollMney.data.auctionId = Router.history.current.query.auctionId;
      },
      //确定支付保证金
      _enrollMoney(){
        let outLine = this.$refs.outLine;
        let onLine = this.$refs.onLine
        if(outLine.checked){
          this.enrollMney.data.payMode = 2;
        }else if(onLine.checked){
          this.enrollMney.data.payMode = 1;
        }else{
          this.$message.warning("请选择支付方式")
        }
        this.token = cMethods.getCookie('token');
        this.roleId = cMethods.getCookie('roleId');
        let formData = new FormData();
        formData .append("recognizance",this.enrollMney.data.recognizance);
        formData .append("auctionReqId",this.enrollMney.data.auctionReqId);
        formData .append("auctionBuyerId",this.enrollMney.data.auctionBuyerId);
        formData .append("auctionId",this.enrollMney.data.auctionId);
        formData .append("payEvidenceAd",this.$refs.payEvidenceAd.files[0]);
        formData .append("payMode", this.enrollMney.data.payMode);
        this.$http.post(this.enrollMney.url,formData,{headers:{token:this.token}}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.$message.success("支付成功")
            if(this.roleId==5||this.roleId==6){
              window.location.href = cMethods.getHref()+'?menuId=z89'
            }else if(this.roleId==3||this.roleId==4){
              window.location.href = cMethods.getHref()+'?menuId=z89'
            }
          }else if(response.code === 409 || response.code === 410){
            this.$message.warning('登录已过期或未登录，请先登录！');
            Router.push({path:'/login',query:{typeId:1}})
          }else{
            this.$message.warning("支付出现问题")
          }
        },(resp) => {
          console.log("支付保证金接口调用失败")
        })

      },
      //取消支付
      _cancleEnroll(){
        Router.push('/index')
      },
    },
    created(){
      this._getData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "bidenrollMoney.styl"
</style>

