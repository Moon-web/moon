<template xmlns:v-lazy="http://www.w3.org/1999/xhtml">
  <div class="productDetail" ref="productDetail">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="content-wrapper">
      <div class="content-center">
        <div class="path">
          <v-path :path="pathData"></v-path>
        </div>
        <div class="content-box">
          <div class="product-information-model">
            <div class="product-picture">
              <div class="picture-view" v-lazy:background-image="groupBuyData.fetchData.coverImage">
              </div>
              <div class="picture-list">
                <span class="list-item" v-lazy:background-image="groupBuyData.fetchData.coverImage">
                </span>
              </div>
            </div>
            <div class="information-menu">
              <div class="product-groupBuy"><!--集采交易-->
                <div class="group-information">
                  <div class="group-information-top">
                    <h3 class="group-product-name">{{groupBuyData.fetchData.groupBuyTitle}}</h3>
                    <p class="group-product-state">
                      <span class="state-item" v-if="false">{{groupBuyData.fetchData.productName}}</span>
                      <span class="state-item" v-if="groupBuyData.fetchData.status===0">集采开团</span>
                      <span class="state-item" v-if="groupBuyData.fetchData.status===11">即将开团</span>
                      <span class="state-item" v-if="groupBuyData.fetchData.status===9">集采结束</span>
                      <span class="state-item">集采活动</span>
                    </p>
                    <div class="group-product-other">
                      <p class="other-information-item">
                        <span class="other-title-item">地区</span>
                        <span class="other-title-context" v-if="groupBuyData.fetchData.division">
                          {{groupBuyData.fetchData.division.division.division.divisionName}}
                          {{groupBuyData.fetchData.division.division.divisionName}}
                          {{groupBuyData.fetchData.division.divisionName}}
                        </span>
                      </p>
                      <p class="other-information-item">
                        <span class="other-title-item">最低采购数量</span>
                        <span
                          class="other-title-context">{{groupBuyData.fetchData.minQuality}}{{groupBuyData.fetchData.unit}}</span>
                      </p>
                      <p class="other-information-item" v-if="false">
                        <span class="other-title-item">保证金金额</span>
                        <span class="other-title-context">
                          {{groupBuyData.fetchData.earnestMoney}}
                          <i v-if="groupBuyData.fetchData.earnestMoneyRule==1">
                            /{{groupBuyData.fetchData.unit}}
                          </i>
                          <i v-if="groupBuyData.fetchData.earnestMoneyRule!=1" class="warn">缴纳固定额度保证金</i>
                          <i v-if="groupBuyData.fetchData.earnestMoneyRule==1" class="warn">按采购数量缴纳保证金</i>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div v-if="groupState==11" class="group-prepare"><!--即将开始-->
                    <p class="begin-date">
                      采购日期：{{groupBuyData.fetchData.groupBuyStartTime}}~{{groupBuyData.fetchData.groupBuyEndTime}}
                    </p>
                    <div class="begin-price">
                      <div class="price-left">
                        <span class="price-wrapper" v-for="(item,index) in sku.data" v-if="index===0">
                          ¥ {{item.expectPrice}}.00
                        </span>
                        <span class="tag">预期采购价</span>
                      </div>
                      <div class="price-right">
                        <span class="remind-button" @click="submitWarn.show = true">
                          开团提醒
                        </span>
                      </div>
                    </div>
                  </div>
                  <div v-if="groupState==0" class="group-ing"><!--进行中-->
                    <div class="notice-wrapper">
                      <span class="text">倒计时</span>
                      <span class="decrease-date">
                        <span class="decrease-tittle">距集采结束</span>
                        <span class="decrease-time">{{decreaseDate.day}}天{{decreaseDate.hour}}小时{{decreaseDate.minute}}分{{decreaseDate.second}}秒</span>
                      </span>
                      <span class="sell-total">
                        <p class="total-row">已申请数量</p>
                        <p class="total-row">{{groupBuyData.fetchData.groupNowNum}}{{groupBuyData.fetchData.unit}}</p>
                      </span>
                    </div>
                    <div class="activity-information">
                      <p class="other-information-item bot">
                        <span class="other-title-item">集采日期</span>
                        <span
                          class="other-title-context">{{groupBuyData.fetchData.groupBuyStartTime}}~{{groupBuyData.fetchData.groupBuyEndTime}}</span>
                      </p>
                      <p class="other-information-item bot">
                        <span class="other-title-item big">价格</span>
                        <span class="other-title-context">
                          <i class="rmb">¥</i>
                          <i class="price">{{minPrice}}</i>
                          <i class="rmb-zero">.00</i>
                        </span>
                      </p>
                      <p class="other-information-item bot">
                        <span class="other-title-item">已报名企业</span>
                        <span class="other-title-context">{{groupBuyer.buyerList.length}}家</span>
                      </p>
                    </div>
                    <div class="product-logistics">
                      <span class="title">
                        规格
                      </span>
                      <div class="sku-item-wrapper">
                        <dl class="sku-item" v-for="(item,index) in sku.data" v-show="index<sku.normalLength">
                          <dt class="sku-item-title">
                            <i class="sku-tag" v-if="item.skuAtt1">
                              {{item.skuAtt1}}：{{item.skuVal1||'无属性'}}
                            </i>
                            <i class="sku-tag" v-if="item.skuAtt2">
                              {{item.skuAtt2}}：{{item.skuVal2||'无属性'}}
                            </i>
                            <i class="sku-tag" v-if="item.skuAtt3">
                              {{item.skuAtt3}}：{{item.skuVal3||'无属性'}}
                            </i>
                            <i class="sku-tag" v-if="item.skuAtt4">
                              {{item.skuAtt4}}：{{item.skuVal4||'无属性'}}
                            </i>
                            <i class="sku-tag" v-if="item.skuAtt5">
                              {{item.skuAtt5}}：{{item.skuVal5||'无属性'}}
                            </i>
                            <i class="sku-tag" v-if="item.skuAtt6">
                              {{item.skuAtt6}}：{{item.skuVal6||'无属性'}}
                            </i>
                          </dt>
                          <dd class="sku-item-counter">
                            <span class="singePrice">
                              <i class="rmb">¥</i>
                              <i class="price">{{item.expectPrice}}</i>
                              <i class="unit">元/{{item.unit}}</i>
                              <i class="note">（剩余量：{{item.requireQty-item.enrollQty}}）</i>
                            </span>
                            <span class="counter-wrapper">
                              <v-counter
                                v-on:_increase="_inCount(index)"
                                v-on:_decrease="_deCount(index)"
                                :maxCount="Infinity"
                                :buyCount="0"
                                :minCount="0"
                                v-model="sku.skuPriceList[index].purchaseQty">
                              </v-counter>
                            </span>
                          </dd>
                        </dl>
                      </div>
                      <span class="more" :class="sku.normalLength===sku.skuLength?'active':''" @click="_toggleSkuList">
                      </span>
                    </div>
                    <div class="buy-button">
                      <span class="buy-operation"
                            @click="_linkOrder">参与报名</span>
                    </div>
                  </div>
                  <div v-if="groupState==9" class="group-end"><!--已完成-->
                    <div class="notice-wrapper">
                      <span class="end-notice">
                        该次活动已结束，敬请期待下次参与
                      </span>
                    </div>
                    <div class="activity-information">
                      <p class="other-information-item bot">
                        <span class="other-title-item">集采日期</span>
                        <span
                          class="other-title-context">{{groupBuyData.fetchData.groupBuyStartTime}}~{{groupBuyData.fetchData.groupBuyEndTime}}</span>
                      </p>
                      <p class="other-information-item bot">
                        <span class="other-title-item big">预期采购价</span>
                        <span class="other-title-context">
                          <i class="rmb">¥</i>
                          <i class="price">{{minPrice}}</i>
                          <i class="rmb-zero">.00</i>
                          <i class="expect-price">预期最高采购价（元/块）</i>
                        </span>
                      </p>
                      <p class="other-information-item bot">
                        <span class="other-title-item">已报名企业</span>
                        <span class="other-title-context">{{groupBuyer.buyerList.length}}家</span>
                      </p>
                      <p class="other-information-item bot">
                        <span class="other-title-item">已申请数量</span>
                        <span
                          class="other-title-context">{{groupBuyData.fetchData.groupNowNum}}{{groupBuyData.fetchData.unit}}</span>
                      </p>
                    </div>
                    <div class="buy-button">
                      <span class="buy-operation end">活动结束</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="hot-product">
              <span class="hot-head">相似产品</span>
              <span class="next-product" v-for="item in similarProduct.fetchData" @click="_linkDetail(item.productId)">
                <span class="picture" v-lazy:background-image="item.mainproductimgpath">
                  <i class="price">¥{{item.price}}</i>
                </span>
                <i class="name">{{item.productName}}</i>
              </span>
            </div>
          </div>
        </div>
        <div class="other-product-content">
          <div class="hot-product">
            <span class="hot-head">相似产品</span>
            <span class="next-product" v-for="item in similarProduct.fetchData" @click="_linkDetail(item.productId)">
                <span class="picture" v-lazy:background-image="item.mainproductimgpath">
                  <i class="price">¥{{item.price}}</i>
                </span>
                <i class="name">{{item.productName}}</i>
              </span>
          </div>
          <div class="other-product-information">
            <div class="other-product-head">
              <span class="title"
                    :class="detailInfoChoice===true?'active':''"
                    @click="detailInfoChoice=true">商品详情</span>
              <span class="title"
                    :class="detailInfoChoice===false?'active':''"
                    @click="detailInfoChoice=false">报名记录</span>
            </div>
            <div v-show="detailInfoChoice===true" class="other-product-context">
              <div class="product-attr">
              </div>
              <div class="other-picture">
                <p class="other-detail-title">
                  产品详情：
                </p>
                <span class="other-detail" v-html="groupBuyData.fetchData.productDetail">
                </span>
                <span class="picture-box">
                  <img width="100%" v-lazy="groupBuyData.fetchData.coverImage">
                </span>
              </div>
            </div>
            <div v-show="detailInfoChoice===false" class="other-product-context">
              <dl class="buyer-list" v-if="groupBuyer.buyerList.length>0">
                <dt class="list-title">
                  <span class="list-row">申请</span>
                  <span class="list-row">申请数量</span>
                  <span class="list-row">单位</span>
                  <span class="list-row">申请日期</span>
                </dt>
                <dt class="list-wrapper" v-for="item in groupBuyer.buyerList">
                  <span class="list-row">{{item.buyer.corporateName}}</span>
                  <span class="list-row">{{item.buyNums}}</span>
                  <span class="list-row">{{groupBuyData.fetchData.unit}}</span>
                  <span class="list-row">{{item.applyTime}}</span>
                </dt>
              </dl>
              <div class="buyer-listNone" v-if="groupBuyer.buyerList.length===0">
                暂无报名记录
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
    <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="submitWarn" v-show="submitWarn.show">
        <div class="warn-center">
          <div class="entry-wrapper">
            <div class="entry-input">
              <i class="icon tel"></i>
              <input type="text" class="input" placeholder="请输入手机号码" v-model="submitWarn.entry.phone">
            </div>
            <div class="entry-input">
              <i class="icon name"></i>
              <input type="text" class="input" placeholder="请输入您的姓名" v-model="submitWarn.entry.name">
            </div>
          </div>
          <div class="confirm-wrapper" @click="_submitWarn">
            立即确认
          </div>
          <span class="close-button" @click="submitWarn.show = false"></span>
        </div>
      </div>
    </transition>

    <div class="loading-wrapper">
      <v-loading :state="loadingShow"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Nav from '@/components/nav/nav.vue'
  import Footer from '@/components/footer/footer.vue'
  import Router from '../../router/index'
  import cMethods from '../../common/common'
  import Event from '../../common/emit'
  import path from '@/components/pagePath/pagePath.vue'
  import Counter from '@/components/counter/counter.vue'
  import Loading from '@/components/loading/loading.vue'

  export default{
    components: {
      'v-head': Head,
      'v-nav': Nav,
      'v-footer': Footer,
      'v-path': path,
      'v-counter': Counter,
      'v-loading':Loading
    },
    data(){
      return {
        loadingShow:false,
        token: '',
        roleId: '',
        singePrice: 0,
        minPrice:0,
        groupState: '',
        startMillisecond: 0,
        userData: {
          url: '/web/individua/getUserInfo'
        },
        sku:{
          skuPriceList:[],
          data:[],
          normalLength:2,
          skuLength:''
        },
        buyData: {
          buyCount: 0,
          minCount: 0,
        },
        submitData: {
          price: 0,
          totalProduct: 0
        },
        similarProduct: {
          url: '/web/productcategorys/getProcutlist',
          data: {
            productcategoryid: '',
            productName: '',
            pricelow: '',
            pricehigh: '',
            inventorynum: '',
            priceup: '',
            pageTotal: '',
            currentPage: '',
            productcategorySecondid: '',
            showCount: 3
          },
          fetchData: []
        },
        detailInfoChoice: true,
        groupBuyData: {
          url: '/web/groupBuy/findGroupBuyDetail',
          data: {
            groupBuyId: ''
          },
          fetchData: {}
        },
        groupBuyer: {
          buyerList: []
        },
        decreaseDate: {
          day: '',
          hour: '',
          minute: '',
          second: ''
        },
        targetDate: {},
        nowDate: {},
        startDate: {},
        pathData: [
          {
            text: '首页',
            path: '/index'
          }, {
            text: '产品详情'
          }
        ],
        submitWarn: {
          url: '/web/webGroupMessage/saveMessage',
          show: false,
          entry: {
            phone: '',
            name: '',
            groupBuyId: ''
          }
        },
      }
    },
    methods: {
      _getSimilar(){//获取类似
        this.$http.post(this.similarProduct.url, this.similarProduct.data, {
          emulateJSON: true
        }).then(
          (resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.similarProduct.fetchData = response.data.pageData;
            }
          }, (error) => {
            console.log('调用相似产品接口错误')
          }
        )
      },
      _getGroupBuyDetail(){//集采详情
        this.loadingShow=true;
        this.token = cMethods.getCookie('token');
        this.groupBuyData.data.groupBuyId = Router.history.current.query.groupBuyId;
        this.groupState = Router.history.current.query.groupState;
        this.$http.post(this.groupBuyData.url, this.groupBuyData.data, {
          emulateJSON: true
        }).then(
          (resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.loadingShow=false;
              this.submitWarn.entry.groupBuyId = response.data.groupBuy.groupBuyId;
              this.groupBuyData.fetchData = response.data.groupBuy;
              this.groupBuyer.buyerList = response.data.groupBuyers;
              this.sku.data = response.data.skuList.sort(this.compare);
              this.minPrice = this.sku.data[0].expectPrice;
              this.sku.skuLength =response.data.skuList.length;
              this._pushSkuList(this.sku.data);
              this.similarProduct.data.productcategoryid = response.data.groupBuy.productcategoryId;
              this.nowDate = this._splitCurrentDate(response.data.currentTime);
              this.targetDate = this._splitCurrentDate(response.data.groupBuy.groupBuyEndTime);
              this.startDate = this._splitCurrentDate(response.data.groupBuy.groupBuyStartTime);
              this._getSimilar();
            } else {
              this.$message.warning(response.msg)
            }
          }, (error) => {
            this.loadingShow=false;
            console.log('调用集采详情接口错误')
          }
        )
      },
      _pushSkuList(data){
        for(let i = 0;i<data.length;i++){
          this.sku.skuPriceList.push({
            skuId:data[i].id,
            purchaseQty:0,
            skuAtt1:data[i].skuAtt1,
            skuVal1:data[i].skuVal1,
            skuAtt2:data[i].skuAtt2,
            skuVal2:data[i].skuVal2,
            skuAtt3:data[i].skuAtt3,
            skuVal3:data[i].skuVal3,
            skuAtt4:data[i].skuAtt4,
            skuVal4:data[i].skuVal4,
            skuAtt5:data[i].skuAtt5,
            skuVal5:data[i].skuVal5,
            skuAtt6:data[i].skuAtt6,
            skuVal6:data[i].skuVal6,
            expectPrice:data[i].expectPrice,
          })
        }
      },
      _linkOrder(){
        this.token = cMethods.getCookie('token');
        this.roleId = cMethods.getCookie('roleId');
        if(this._countTotalProduct()<this.groupBuyData.fetchData.minQuality){
          this.$message.warning('至少采购'+this.groupBuyData.fetchData.minQuality+'件！');
          return false
        }
        let orderData = {
          earnestMoney:'',
          groupBuyId:'',
          groupBuyerSku:[],
          imgUrl:'',
          productName:'',
          groupBuyStartTime:'',
          groupBuyEndTime:'',
          unit:'',
          kind:'',
          groupBuyCode:'',
          groupBuyTitle:'',
          groupState:''
        };
        if (this.groupBuyData.fetchData.earnestMoneyRule === '1') {
          orderData.earnestMoney = this.groupBuyData.fetchData.earnestMoney * this._countTotalProduct();
        } else {
          orderData.earnestMoney = this.groupBuyData.fetchData.earnestMoney;
        }
        orderData.groupBuyId = this.groupBuyData.fetchData.groupBuyId;
        orderData.imgUrl = this.groupBuyData.fetchData.coverImage;
        orderData.productName = this.groupBuyData.fetchData.productName;
        orderData.groupBuyStartTime = this.groupBuyData.fetchData.groupBuyStartTime;
        orderData.groupBuyEndTime = this.groupBuyData.fetchData.groupBuyEndTime;
        orderData.unit = this.groupBuyData.fetchData.unit;
        orderData.groupBuyCode = this.groupBuyData.fetchData.groupBuyCode;
        orderData.groupState = this.groupBuyData.fetchData.status;
        orderData.groupBuyTitle = this.groupBuyData.fetchData.groupBuyTitle;
        orderData.kind = this.groupBuyData.fetchData.productcategory.productcategory.productcategory.productcategoryName+'>'
          +this.groupBuyData.fetchData.productcategory.productcategory.productcategoryName+'>'
          +this.groupBuyData.fetchData.productcategory.productcategoryName;
        orderData.groupBuyerSku = this._clearCountZero();
        this.$http.get(this.userData.url, {headers: {token: this.token}}).then((resp) => {
            let response = resp.body;
            let groupState = Router.history.current.query.groupState;
            if (response.code === 200) {
              if (this.roleId === '5' || this.roleId === '6') {
                Router.push({
                  path: '/enroll',
                  query: {
                    head:cMethods.encode(JSON.stringify(orderData))
                  }
                })
              }else {
                this.$message.warning("您不是采购商！不能进行该操作！");
              }
            } else if (response.code === 409 || response.code === 410) {
              this.$message.warning('请先登录！');
              Router.push({path:'/login',query:{typeId:1}})
            }else {
              this.$message.warning(response.msg)
            }
          });
      },
      _countTotalProduct(){//计算采购总数
        let count = 0;
        for(let i = 0;i<this.sku.skuPriceList.length;i++){
          count+=this.sku.skuPriceList[i].purchaseQty;
        }
        return count;
      },
      _clearCountZero(){//清除采购数为零的SKU
        let notZero = [];
        for(let i = 0;i<this.sku.skuPriceList.length;i++){
          if(this.sku.skuPriceList[i].purchaseQty>0){
            notZero.push(this.sku.skuPriceList[i])
          }
        }
        return notZero
      },
      _watch(){
        this.$watch('startDate', function (n, o) {
          this._nowTimer();
        }, {
          deep: true
        });
      },
      scrollTop(){
        this.$nextTick(() => {
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
      _decreaseTimer(){
        let _this = this;
        let timer = null;
        function decrease() {//计算结束时间
          let leftTime = (new Date(_this.targetDate.year, _this.targetDate.month - 1, _this.targetDate.day, _this.targetDate.hour, _this.targetDate.minute, _this.targetDate.second)) - (new Date()); //计算剩余的毫秒数
          let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
          let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
          let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
          let seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
          if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 && Router.history.current.query.groupState == 0) {
            Router.history.current.query.groupState = 9;
            timer = clearInterval(timer);
            clearInterval(timer);
            _this.token = cMethods.getCookie('token');
            _this.groupBuyData.data.groupBuyId = Router.history.current.query.groupBuyId;
            _this.groupState = Router.history.current.query.groupState;
            _this.$http.post(_this.groupBuyData.url, _this.groupBuyData.data, {
              emulateJSON: true,
              token: _this.token
            }).then(
              (resp) => {
                let response = resp.body;
                if (response.code === 200) {
                  _this.submitWarn.entry.groupBuyId = response.data.groupBuy.groupBuyId;
                  _this.groupBuyData.fetchData = response.data.groupBuy;
                  _this.groupBuyer.buyerList = response.data.groupBuyers;
                  _this.singePrice = response.data.groupBuy.earnestMoney;//保证金单价
                  _this.similarProduct.data.productcategoryid = response.data.groupBuy.productcategoryId;
                }
              },(resp)=>{
                console.log("调用集采详情接口错误")
              })
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
      _nowTimer(){
        let _this = this;
        let timer=null;
        let nowTime = (new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day, this.startDate.hour, this.startDate.minute, this.startDate.second) - new Date(this.nowDate.year, this.nowDate.month - 1, this.nowDate.day, this.nowDate.hour, this.nowDate.minute, this.nowDate.second))
        let days = parseInt(nowTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(nowTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(nowTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(nowTime / 1000 % 60, 10);//计算剩余的秒数
        let totalMillisecond = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
        timer=window.setInterval(function(){
          totalMillisecond-=1000;
          if(totalMillisecond<=0 && Router.history.current.query.groupState==0){
            clearInterval(timer);
          }
          if(totalMillisecond<=0 && Router.history.current.query.groupState==11){
            Router.history.current.query.groupState = 0;
            clearInterval(timer);
            _this.token = cMethods.getCookie('token');
            _this.groupBuyData.data.groupBuyId = Router.history.current.query.groupBuyId;
            _this.groupState = Router.history.current.query.groupState;
            _this.$http.post(_this.groupBuyData.url, _this.groupBuyData.data, {
              emulateJSON: true,
              token: _this.token
            }).then(
              (resp) => {
                let response = resp.body;
                if (response.code === 200) {
                  _this.submitWarn.entry.groupBuyId = response.data.groupBuy.groupBuyId;
                  _this.groupBuyData.fetchData = response.data.groupBuy;
                  _this.groupBuyer.buyerList = response.data.groupBuyers;
                  _this.singePrice = response.data.groupBuy.earnestMoney;//保证金单价
                  _this.submitData.price = response.data.groupBuy.earnestMoney * response.data.groupBuy.minQuality;//计算单价
                  _this.submitData.totalProduct = response.data.groupBuy.reqQuantity;//总数
                  _this.buyData.minCount = response.data.groupBuy.minQuality;//最低采购
                  _this.buyData.buyCount = response.data.groupBuy.minQuality;//计算最低采购
                  _this.similarProduct.data.productcategoryid = response.data.groupBuy.productcategoryId;
                }
              },(resp)=>{
                console.log("调用集采详情接口错误")
              })
          }
        },1000)
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
      _submitWarn(){
        let tel = /^1[34578]\d{9}$/;
        if (this.submitWarn.entry.phone === '') {
          this.$message.warning('请填写手机号码');
          return false
        } else if (this.submitWarn.entry.name === '') {
          this.$message.warning('请填写姓名');
          return false
        } else if (!tel.test(this.submitWarn.entry.phone)) {
          this.$message.warning('请输入正确的手机号');
          return false
        }
        this.$http.post(this.submitWarn.url, this.submitWarn.entry, {emulateJSON: true}).then(
          (resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.$message.success('已成功为您提交开团提醒');
              this.submitWarn.show = false;
              this.submitWarn.entry.phone = '';
              this.submitWarn.entry.name = '';
            } else {
              console.log(response.msg)
            }
          }
        )
      },
      _linkDetail(id){
        this.$router.push({path:'/productDetail',query:{productId:id}})
      },
      _inCount(index){
        this.sku.skuPriceList[index].purchaseQty++;
      },
      _deCount(index){
        this.sku.skuPriceList[index].purchaseQty--;
      },
      _toggleSkuList(){
        if(this.sku.normalLength !== this.sku.skuLength){
          this.sku.normalLength = this.sku.skuLength
        }else{
          this.sku.normalLength = 2;
        }
      },
      compare(obj1, obj2) {
        let val1 = obj1.expectPrice;
        let val2 = obj2.expectPrice;
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    watch: {
      '$route': 'scrollTop'
    },
    created(){
      this._watch();
      this.scrollTop();
      this._getGroupBuyDetail();
    },
    mounted(){
      this._decreaseTimer();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "groupDetail.styl"
</style>
