<template>
  <div class="jicai-wrapper">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="order-wrapper">
      <div class="order-content">
        <div class="path-wrapper">
          <v-pagePath :path="pathData"></v-pagePath>
        </div>
        <div class="order-table">
          <h3 class="title">
            确认活动信息
          </h3>
          <div class="head-title">
            <ul class="head-titleUl">
              <li class="head-titleList" v-for="item in shopDataTitle">{{item}}</li>
            </ul>
          </div>
          <div class="order-tableCon">
            <div class="order-tableCon-top">
              <!--<p class="order-tableConTopLeft">供应商：aaaaaaaaaaaa</p>-->
              <p class="order-tableConTopRight">产品分类：{{skuData.kind}}</p>
            </div>
            <div class="order-tableCon-bottom">
              <div class="order-tableConList" v-for="(item,index) in skuData.groupBuyerSku">
                <ul class="order-tableUl">
                  <li class="order-table-list">
                    <span class="table-listBg" v-lazy:background-image="skuData.imgUrl"></span>
                    <span class="table-list-productName">{{skuData.productName}}</span>
                  </li>
                  <li class="order-table-list">
                    <span class="skuTag" v-if="item.skuAtt1">
                      {{item.skuAtt1}}：{{item.skuVal1||'无属性'}}
                    </span>
                    <span class="skuTag" v-if="item.skuAtt2">
                      {{item.skuAtt2}}：{{item.skuVal2||'无属性'}}
                    </span>
                    <span class="skuTag" v-if="item.skuAtt3">
                      {{item.skuAtt3}}：{{item.skuVal3||'无属性'}}
                    </span>
                    <span class="skuTag" v-if="item.skuAtt4">
                      {{item.skuAtt4}}：{{item.skuVal4||'无属性'}}
                    </span>
                    <span class="skuTag" v-if="item.skuAtt5">
                      {{item.skuAtt5}}：{{item.skuVal5||'无属性'}}
                    </span>
                    <span class="skuTag" v-if="item.skuAtt6">
                      {{item.skuAtt6}}：{{item.skuVal6||'无属性'}}
                    </span>
                  </li>
                  <li class="order-table-list">
                    {{item.expectPrice}}
                  </li>
                  <li class="order-table-list">
                    {{item.purchaseQty}}
                  </li>
                  <li class="order-table-list">
                    {{item.expectPrice*item.purchaseQty}}
                  </li>
                </ul>
              </div>
              <div class="order-tableAddress">
                <div class="Address">
                  <span class="address-title">地区：</span>
                  <span class="detail-address">
                    <v-citySelect></v-citySelect>
                  </span>
                </div>
                <div class="protocol" style="opacity: 0">
                  <span class="lable"><input type="checkbox" checked="checked" ref="chooseBox"><span @click="showProtocol">集采协议</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order">
          <div class="order-center">
            <div class="order-con">
              <p class="sure-money" v-if="false">保证金金额：<span class="money">￥{{skuData.earnestMoney}}</span></p>
              <p class="sure-money">预计总金额：<span class="money">￥{{countTotalMoney}}</span></p>
              <p class="count">
                <em class="title">报名采购总数量：</em>
                <span class="num price">{{skuDataNum}}</span>
              </p>
              <p class="sure-time">集采日期：<span
                class="time">{{skuData.groupBuyStartTime}}~{{skuData.groupBuyEndTime}}</span></p>
            </div>
          </div>
          <div class="order-button">
            <div class="order-btn">
              <button class="cancel" @click="_cancel">取消报名</button>
              <button class="commit" @click="_commit">确定报名</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
    <div class="JcEnter-out" :class="isShow?'outShow':''">
      <div class="JC-outContent">
        <span class="JcEnter-close" @click="isShow=false"></span>
        <div id="JcEnterContent" v-html="protocol.protocolData"></div>
      </div>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingShow"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Footer from '@/components/footer/footer.vue'
  import Router from '../../router/index'
  import citySelect from '@/components/citySelect/citySelect.vue'
  import cMethods from '../../common/common.js'
  import Event from '../../common/emit'
  import Loading from '@/components/loading/loading.vue'
  import pagePath from '@/components/pagePath/pagePath.vue'

  export default{
    components: {
      'v-head': Head,
      'v-footer': Footer,
      'v-citySelect':citySelect,
      'v-loading': Loading,
      'v-pagePath':pagePath,
    },
    data(){
      return{
        loadingShow: false,
        isShow:false,
        pathData:[
          {
            text:'首页',
            path:'/index'
          },{
            text:'活动详情',
            path:''
          },{
            text:'活动名称',
            path:''
          }
        ],
        shopDataTitle:[
          '商品信息',
          '商品规格',
          '单价',
          '数量',
          '小计',
        ],
        skuData:[],
        skuDataNum:0,
        countTotalMoney:0,//预计总金额
        protocol:{
          protocolUrl:'/web/info/getInfoList',
          condition:{
            firstInfoTypeId:2,
            secondInfoTypeId:6
          },
          protocolData:[]
        },
        token: '',
        addressCode: '',
        groupBuySku:{
          url:'/web/groupBuy/enroll',
          data:{
            groupBuyId:'',
            address:'',
            earnestMoney:'',
            groupBuyerSku:[]
          }
        }
      }
    },
    methods:{
      _getData(){
        this.skuData = JSON.parse(cMethods.decode(this.$router.history.current.query.head));
        for(let i=0;i<this.skuData.groupBuyerSku.length;i++){
          this.skuDataNum += parseInt(this.skuData.groupBuyerSku[i].purchaseQty);
          this.countTotalMoney += parseInt(this.skuData.groupBuyerSku[i].expectPrice)*parseInt(this.skuData.groupBuyerSku[i].purchaseQty);
        };
        this.pathData[this.pathData.length-1].text=this.skuData.groupBuyTitle;
        this.pathData[this.pathData.length-2].path='/groupDetail?groupBuyId='+this.skuData.groupBuyId+'&groupState='+this.skuData.groupState;
      },
      showProtocol(){
        this.isShow=!this.isShow
        this.$http.post(this.protocol.protocolUrl,this.protocol.condition,{emulateJSON: true}).then((resp)=>{
          let response=resp.body;
          if(response.code==200){
            this.protocol.protocolData=response.data.infoTypeList[0].subInfoType[0].infos[0].content;
        }
        },(resp)=>{
          console.log("接口调用错误")
        })
      },
      _pushSkuList(data){
        for(let i = 0;i<data.length;i++){
          this.groupBuySku.data.groupBuyerSku.push({
            skuId:data[i].skuId,
            purchaseQty:data[i].purchaseQty,
          })
        }
      },
      _commit(){
        if(this.addressCode.district.addressCode===''||this.addressCode.district.addressCode===undefined){
          this.$message.warning("请选择你所在的地区！");
          return false;
        }else {
          let chooseBox = this.$refs.chooseBox;
          if (chooseBox.checked){
            this.loadingShow = true;
            this.token = cMethods.getCookie("token");
            this.role = cMethods.getCookie("roleId");
            this.groupBuySku.data.address = this.addressCode.district.addressCode
            this.groupBuySku.data.groupBuyId = this.skuData.groupBuyId;
            this.groupBuySku.data.earnestMoney = this.skuData.earnestMoney;
            this._pushSkuList(this.skuData.groupBuyerSku);
            this.$http.post(this.groupBuySku.url, this.groupBuySku.data, {
              headers: {token: this.token}
             }).then((resp) => {
              let response = resp.body;
              if (response.code === 200) {
                this.loadingShow = false;
//                Router.push({
//                  path: '/JcMoney',
//                  query: {
//                    groupBuyCode: this.skuData.groupBuyCode,//集采活动编号
//                    groupBuyId: this.skuData.groupBuyId,//集采活动id
//                    earnestMoney: 0,//保证金(this.skuData.earnestMoney暂时不要)
//                    payNode: 1,//1 保证金  2订单支付
//                    /*buyerId: this.skuData.buyerId*/
//                  }
//                })
                window.location.href = cMethods.getHref()+'?menuId=z46';
              } else if (response.code === 409 || response.code === 410) {
                this.loadingShow = false;
                this.$message.error('登录已过期');
                this.$router.push({path:'/login',query:{typeId:1}})
              } else {
                this.loadingShow = false;
                this.$message.warning(response.msg)
              }
            }, (resp) => {
              this.$message.error('报名失败！')
            })
          }else{
            this.$message.warning("请先同意集采协议，在进行报名！")
          }
        }
      },
      //获取地址code
      hah(v){
        this.addressCode = v;
      },
      _getCitySelect(){
        let _this = this;
        Event.$on('throwData',function(v){
          _this.hah(v);
        })
      },
      _cancel(){
        Router.back()
      },
    },
    created(){
      this._getData()
    },
    mounted(){
      this._getCitySelect()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "enroll.styl"
</style>
