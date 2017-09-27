<template>
  <div class="JcMoney" ref="JcMoney">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="JcMoney-con">
      <div class="JcMoney-statu">
        <h3 class="title">恭喜您报名提交成功，请尽快支付保证金！</h3>
        <p class="sure-money">保证金金额：{{sureMoney}} 元</p>
        <p class="con">报名提交成功后，请于<i style="color: #ff0000">14小时内</i>付款，否则取消集采活动报名资格</p>
      </div>
      <div class="money">
        <div class="title">
          <span class="bg" @click="_checkLine" :class="tag?'changeBg':''"></span>
          <span class="content">选择线上支付</span>
        </div>
        <div class="blank"></div>
      </div>
      <div class="underLine-money">
        <div class="title">
          <span class="bg" @click="_check" :class="bTag?'changeBg':''"></span>
          <span class="content">选择线下支付</span>
        </div>
        <div class="title-form btn-success">
          <span>上传线下支付凭证</span>
          <input type="file">
        </div>
      </div>
      <div class="payBtn">
        <button class="cancel" @click="_cancel">取消</button>
        <button class="commit" @click="_payMoney">提交订单</button>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingShow"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Nav from '@/components/nav/nav.vue'
  import Footer from '@/components/footer/footer.vue'
  import cMethods from '../../common/common'
  import Router from '../../router/index'
  import Loading from '@/components/loading/loading.vue'

  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer,
      'v-loading':Loading
    },
    data(){
      return{
        loadingShow:false,
        bTag:false,
        tag:false,
        payMonyUrl:'/web/order/goUploadPayOrder',
        payMonyData:{
          groupBuyId:'',
          buyerId:'',
          payMode:'',
          payNode:'',
          orderId:'',
          oriReqCode:'',
          orderCode:'',
          deposit:''
        },
        token:'',
        sureMoney:'',
        payMode:''
      }
    },
    methods:{
      _getMoney(){
        this.sureMoney=Router.history.current.query.earnestMoney;
      },
      _check(){
        if(this.bTag){
          this.bTag=false;
        }else{
          this.bTag=true;
          this.tag=false
        }
      },
      _checkLine(){
        if(this.tag){
          this.tag=false;
        }else{
          this.tag=true;
          this.bTag=false
        }
      },
      _payMoney(){
        if(this.bTag){
          this.loadingShow = true;
          this.token=cMethods.getCookie("token");
          this.payMode=2;//表示线下支付;
          this.payMonyData.payMode=this.payMode;
          if(Router.history.current.query.orderId===undefined){
            this.payMonyData.orderId='';
            this.payMonyData.oriReqCode='';
            this.payMonyData.orderCode='';
            this.payMonyData.deposit=Router.history.current.query.earnestMoney;
            this.payMonyData.groupBuyId=Router.history.current.query.groupBuyId;
            this.payMonyData.buyerId=Router.history.current.query.buyerId;
            this.payMonyData.payNode=Router.history.current.query.payNode;
          }else{
            this.payMonyData.orderId=Router.history.current.query.orderId||'';
            this.payMonyData.oriReqCode=Router.history.current.query.oriReqCode;
            this.payMonyData.orderCode=Router.history.current.query.orderCode;
            this.payMonyData.groupBuyId='';
            this.payMonyData.buyerId='';
            this.payMonyData.payNode=2;
            this.payMonyData.deposit='';
          }
          this.$http.post(this.payMonyUrl,this.payMonyData,{
            emulateJSON:true,
          }).then((resp)=>{
            this.loadingShow = false;
            let response=resp.body;
            document.write(response)
          },(resp)=>{
            this.loadingShow = false;
            alert("接口调用失败！")
          })
        }else{
          this.$message.warning("请选择支付方式！")
        }
      },
      _cancel(){
        Router.push('/index')
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
    },
    created(){
      this._getMoney();
      this.scrollTop();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "JcMoney.styl"
</style>
