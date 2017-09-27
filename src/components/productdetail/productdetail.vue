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
          <v-pagePath :path="path"></v-pagePath>
        </div>
        <div class="content-box">
          <div class="product-information-model">
            <div class="product-picture">
              <div class="product-pictureBox">
                <div class="picture-view" v-for="(item,index) in detailData.fetchData.picture"
                     v-if="index===picture.hook" v-lazy:background-image="item">
                </div>
                <div class="picture-list">
                  <span class="list-item" v-for="(item,index) in detailData.fetchData.picture"
                        @click="_getPictureIndex(index)" v-lazy:background-image="item">
                  </span>
                </div>
              </div>
              <div class="procuct-picture-collect">
                <span class="procuct-collect-sno">商品编号：{{detailData.fetchData.product_code}}</span>
                <span class="procuct-collect" @click="_collectGoods"><i class="productCollect-bg" :class="isCollectDood?'':'productCollected-bg'"></i><i class="productCollect-con">{{productCollect}}</i></span>
              </div>
            </div>
            <div class="information-menu">
              <div class="product-information"  v-if="minPrice!='99999'">
                <div class="product-name">
                  {{detailData.fetchData.product_name}}
                </div>
                <div class="product-price">
                  <p class="price-wrapper">
                    商品价格：
                    <i class="yuan">¥</i>
                    <span class="number">{{minPrice}}</span>
                  </p>
                  <p class="count-wrapper">
                    货物库存：
                    <i class="num">{{totalProduct}}{{detailData.fetchData.product_unit}}</i>
                  </p>
                </div>
                <div class="product-logistics">
                  <p class="product-place">
                    <i class="title">产地</i>
                    <span class="describe">{{detailData.fetchData.productAddress}}</span>
                  </p>
                  <p class="product-place">
                    <i class="title">成交量</i>
                    <span class="describe">
                    已成交
                    <i class="inventory-num">
                      {{detailData.fetchData.orderAmout}}
                    </i>
                    笔
                  </span>
                  </p>
                  <p class="product-place">
                    <i class="title mg">配送至</i>
                    <span class="describe">
                    <v-citySelect></v-citySelect>
                  </span>
                  </p>
                </div>
                <div class="product-logistics arg">
                  <p class="product-place">
                    <i class="title">商品编号</i>
                    <span class="describe">{{detailData.fetchData.product_code}}</span>
                  </p>
                  <p class="product-place arg" v-if="detailData.fetchData.attributes.length>0">
                    <i class="title">产品属性</i>
                    <span class="describe">
                      <i v-for="item in detailData.fetchData.attributes">
                        {{item.name}}：{{item.content}}；
                      </i>
                  </span>
                  </p>
                </div>
                <div class="product-logistics sku" >
                  <span class="sortTitle">
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
                          <i class="price">{{item.price}}</i>
                          <i class="unit">元/{{item.unit}}</i>
                        </span>
                        <span class="counter-wrapper">
                          <v-counter
                            v-on:_increase="_inCount(index)"
                            v-on:_decrease="_deCount(index)"
                            :maxCount="mathInfinity"
                            :buyCount="0"
                            :minCount="0"
                            v-model="sku.skuPriceList[index].buyCount">
                          </v-counter><!--maxCount：item.qty-->
                        </span>
                      </dd>
                    </dl>
                  </div>
                  <span class="more" :class="sku.normalLength===sku.skuLength?'active':''" @click="_toggleSkuList"></span>
                </div>
                <div class="buy-button">
                  <span class="buy-operation" v-if="false"
                        @click="_linkOrder(detailData.fetchData.product_id,buyData.buyCount,'ZY','','')">立即购买</span>
                  <span class="buy-operation" @click="_buyOrder">询价</span>
                </div>
              </div>
              <div class="product-information"  v-else>
                <div class="product-name">
                  {{detailData.fetchData.product_name}}
                </div>
                <div class="product-price other-product-price">
                  <p class="count-wrapper">
                    <i class="title elseTitle">产地</i>
                    <span class="num">{{detailData.fetchData.productAddress}}</span>
                  </p>
                  <p class="count-wrapper">
                    <i class="title elseTitle">成交量</i>
                    <span class="num">
                    已成交
                    <i class="num elseNum">
                      {{detailData.fetchData.orderAmout}}
                    </i>
                    笔
                  </span>
                  </p>
                  <p class="count-wrapper">
                    <i class="title elseTitle">货物库存</i>
                    <i class="num">{{totalProduct}}{{detailData.fetchData.product_unit}}</i>
                  </p>
                </div>
                <div class="other-price-bg">请咨询众农联获取最新价格</div>
                <div class="product-logistics other-product-logistics">
                  <p class="product-place">
                    <i class="title">商品编号</i>
                    <span class="describe">{{detailData.fetchData.product_code}}</span>
                  </p>
                  <p class="product-place"><i class="title">价格</i>
                    <del class="describe other-describe">0.00</del><span class="zan">暂未更新</span></p>
                </div>
                <div class="product-logistics">
                  <p class="product-place">
                    <i class="title mg">配送至</i>
                    <span class="describe">
                    <v-citySelect></v-citySelect>
                  </span>
                  </p>
                </div>
                <div class="buy-button">
                  <span class="buy-operation" v-if="false"
                        @click="_linkOrder(detailData.fetchData.product_id,buyData.buyCount,'ZY','','')">立即购买</span>
                  <span class="buy-operation other-buy-operation" @click="_buyOrder">我要询价</span>
                </div>
              </div>
            </div>
            <div class="hot-product">
              <span class="hot-head">相似产品</span>
              <span class="next-product" v-for="item in detailData.similarProduct" @click="_linkDetail(item.productId)">
                <span class="picture" v-lazy:background-image="item.mainProductImgPath1">
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
            <span class="next-product" v-for="item in detailData.similarProduct" @click="_linkDetail(item.productId)">
                <span class="picture" v-lazy:background-image="item.mainProductImgPath1">
                  <i class="price">¥{{item.price}}</i>
                </span>
                <i class="name">{{item.productName}}</i>
              </span>
          </div>
          <div class="other-product-information">
            <div class="other-product-head">
              <span class="title" :class="otherProductTbag===0?'active':''"
                    @click="otherProductTbag=0">商品详情</span>
              <span class="title" :class="otherProductTbag===1?'active':''"
                    @click="otherProductTbag=1">累计评价</span>
              <span class="title" :class="otherProductTbag===2?'active':''"
                    @click="otherProductTbag=2">我要问答</span>
            </div>
            <div class="other-product-context" v-show="otherProductTbag===0">
              <div class="product-attr">
                <p class="tag-row">
                  <span class="tag">
                  品牌：<i class="plc">{{detailData.fetchData.brand}}</i>
                </span>
                  <span class="tag">
                  种类：<i class="plc">{{detailData.fetchData.productCategoryName}}</i>
                </span>
                  <span class="tag">
                  产地：<i class="plc">{{detailData.fetchData.productAddress}}</i>
                </span>
                </p>
                <p class="tag-row">
                  <span class="tag">
                  型号：<i class="plc">{{detailData.fetchData.modelnumber}}</i>
                </span>
                  <span class="tag" v-if="detailData.fetchData.attributes.length>0&&minPrice!='99999'">
                  属性：
                    <i class="plc">
                      <i v-for="item in detailData.fetchData.attributes">
                        {{item.name}}{{item.content}}；
                      </i>
                    </i>
                </span>
                </p>
              </div>
              <div class="other-picture">
                <p class="other-detail-title">
                  产品详情：
                </p>
                <span class="other-detail" v-html="detailData.fetchData.product_detail">
                </span>
                <p class="other-detail-title">
                  采购说明：
                </p>
                <span class="other-detail">
                  {{detailData.fetchData.buyer_desc}}
                </span>
                <span class="picture-box">
                  <img v-lazy="detailData.fetchData.mainproductImgpath" width="100%">
                </span>
                <span class="picture-box" v-for="item in detailData.fetchData.picture">
                  <img v-lazy="item" width="100%">
                </span>
              </div>
            </div>
            <div class="other-product-context" v-show="otherProductTbag===1">
              <div class="evaluate-context" v-if="detailData.evaluate.length>0" v-for="(item,index) in detailData.evaluate">
                <div class="evaluate-bg" :class="index===0?'evaluate-bgNone':''"></div>
                <div class="evaluate-container">
                  <div class="evaluate-left">
                    <span class="evaluate-picture"></span>
                    <span class="evaluate-componyName" v-if="item.evaluateName.length>0&&item.evaluateName.length<=2">{{item.evaluateName.split("",1)[0]+"**"}}</span>
                    <span class="evaluate-componyName" v-if="item.evaluateName.length>2">{{item.evaluateName.split("",1)[0]+"**"+item.evaluateName.split("")[item.evaluateName.length-1]}}</span>
                  </div>
                  <div class="evaluate-right">
                    <div class="product-evaluate">
                      <div class="evaluateTitle">
                        <span class="evaluateTitleL">商品评星</span>
                        <div class="star-wrapper">
                          <v-star :star="item.evaluateRanks"></v-star>
                        </div>
                      </div>
                      <div class="evaluateContext">{{item.productEvaluate}}</div>
                      <p class="evaluate-time">评价时间：{{item.createTime}}</p>
                    </div>
                    <div class="service-evaluate">
                      <div class="evaluateTitle">
                        <span class="evaluateTitleL">服务评星</span>
                        <div class="star-wrapper">
                          <v-star :star="item.evaluateRankf"></v-star>
                        </div>
                      </div>
                      <div class="evaluateContext">暂时没有评价</div>
                      <p class="evaluate-time">评价时间：{{item.createTime}}</p>
                    </div>
                    <div class="supplier-evaluate">
                      <div class="evaluateTitle">
                        <span class="evaluateTitleL">供应商评星</span>
                        <div class="star-wrapper">
                          <v-star :star="item.evaluateRankg"></v-star>
                        </div>
                      </div>
                      <div class="evaluateContext">{{item.providerEvaluate}}</div>
                      <p class="evaluate-time">评价时间：{{item.createTime}}</p>
                    </div>
                    <div class="buyer-evaluate">
                      <div class="evaluateTitle">
                        <span class="evaluateTitleL">采购商评星</span>
                        <div class="star-wrapper">
                          <v-star :star="item.evaluateRankc"></v-star>
                        </div>
                      </div>
                      <div class="evaluateContext">{{item.buyerEvaluate}}</div>
                      <p class="evaluate-time">评价时间：{{item.createTime}}</p>
                    </div>
                  </div>
                </div>

              </div>
              <div class="evaluate-context" v-if="detailData.evaluate.length===0"><p class="evaluate-contextNone">该商品暂无评价</p></div>
            </div>
            <div class="other-product-context" v-show="otherProductTbag===2">
              <div class="question-top">
                <textarea name="" id="" cols="30" rows="10" class="questionArea" v-model="questionData.data.askContent" placeholder="如果您对该产品有任何疑问可以向我们咨询，我们将在第一时间为您解答~"></textarea>
                <p class="question-len">请输入1-100个字符，剩余可输入{{100-questionData.data.askContent.length}}个字符</p>
                <div class="question-submit">
                  <p class="question-login" v-if="loginState===false">温馨提示：您还没有登录，<span class="question-Surelogin" @click="_sureLogin">请先登陆</span></p>
                  <p class="question-login" v-if="loginState===true">温馨提示：您好{{userInfo.user.name}}，欢迎您来到众农联平台！</p>
                  <button class="question-sure" @click="_question">我要提问</button>
                </div>
              </div>
              <div class="question-container">
                <div class="question-box" v-for="item in answerData.answerContent">
                  <div class="evaluate-bg"></div>
                  <div class="question-context">
                    <div class="question-left">
                      <span class="evaluate-picture"></span>
                      <span class="evaluate-componyName" v-if="item.corporate_name.length>0&&item.corporate_name.length<=2">{{item.corporate_name.split("",1)[0]+"**"}}</span>
                      <span class="evaluate-componyName" v-if="item.corporate_name.length>2">{{item.corporate_name.split("",1)[0]+"**"+item.corporate_name.split("")[item.corporate_name.length-1]}}</span>
                    </div>
                    <div class="question-right">
                      <div class="question-ask">
                        <p class="ask">{{item.askContent}}</p>
                        <p class="ask-time">{{item.update_time}}</p>
                      </div>
                      <div class="question-da" v-if="item.answerContent">
                        <p class="answer">{{item.answerContent}}</p>
                      </div>
                      <div class="question-da" v-else>
                        <p class="answer">暂无回答</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingShow"></v-loading>
    </div>
    <div class="replaceOrder-wrapper">
      <v-replace  :state="isShow" :close="closeMark"></v-replace>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Nav from '@/components/nav/nav.vue'
  import Footer from '@/components/footer/footer.vue'
  import citySelect from '@/components/citySelect/citySelect.vue'
  import Router from '../../router/index'
  import cMethods from '../../common/common'
  import Event from '../../common/emit'
  import Loading from '@/components/loading/loading.vue'
  import Star from '@/components/star/star.vue'
  import pagePath from '@/components/pagePath/pagePath.vue'
  import Counter from '@/components/counter/counter.vue'
  import replaceOrder from '@/components/replaceOrder/replaceOrder.vue'

  export default{
    components: {
      'v-head': Head,
      'v-nav': Nav,
      'v-footer': Footer,
      'v-citySelect':citySelect,
      'v-loading': Loading,
      'v-star':Star,
      'v-pagePath':pagePath,
      'v-counter':Counter,
      'v-replace':replaceOrder
    },
    data(){
      return {
        isShow:false,
        path:[
          {
            text:'首页',
            path:'/index'
          },
          {
            text:'',
            path:'',
          }
        ],
        mathInfinity:'',
        loginState:false,
        loadingShow: false,
        token: '',
        picture: {
          hook: 0,
          allPicture: []
        },
        userData: {
          roleId: ''
        },
        buyData: {
          buyCount: 0,
          productText: '有货'
        },
        detailData: {
          url: '/web/productcategorys/getProcutInfo',
          data: {
            productid: ''
          },
          mainPicture: '',
          fetchData: {},
          similarProduct:[],
          evaluate:[]
        },
        otherProductTbag:0,
        answerData:{
          url:'/web/prodConsult/prodConsultList',
          data:{
            productId:''
          },
          answerContent:[]
        },
        questionData:{
          url:'/web/prodConsult/addProdConsult',
          data: {
            productId: '',
            askContent: '',
          },
        },
        userInfo:{
          url:'/web/individua/getUserInfo',
          user:{
            name:'',
            tel:'',
            roleId:''
          },
        },
        isCollectDood:true,
        productCollect:'收藏',
        collectGoods:{
          url:'/web/goodcollect/goodcollect',
          data:{
            prodId:''
          }
        },
        cancelCollectGoods:{
          url:'/web/goodcollect/GoodCollectedit',
          data:{
            prodId:''
          }
        },
        isCollectGoods: {
          url:'/web/productcategorys/getProductCollect',
          data:{
            productid:''
          }
        },
        sku:{
          skuPriceList:[],
          data:{},
          normalLength:2,
          skuLength:''
        },
        getUserUrl:'/web/individua/getUserInfo',
        minPrice:0,//sku最低价
        totalProduct:0,//sku库存总和
      }
    },
    methods: {
      _buyOrder(){
        this.isShow = true;
      },
      closeMark(){
        this.isShow = false
      },
      _sureLogin(){
        Router.push({path:"/login",query:{typeId:1}})
      },
      /*产品是否收藏*/
      _isCollectGoods(){
        this.isCollectGoods.data.productid=Router.history.current.query.productId;
        this.token=cMethods.getCookie("token");
        this.$http.get(this.isCollectGoods.url+'?productid='+this.isCollectGoods.data.productid,{
          headers: {token: this.token}}).then((resp)=>{
          let response=resp.body;
          if(response.code===200){
            if(response.data.status===1) {
              this.isCollectDood = false;
              this.productCollect = '已收藏';
            }else{
              this.isCollectDood=true;
              this.productCollect='收藏';
            }
          }
        },(resp)=>{
          console.log("是否收藏接口调用失败")
        })
      },
      _getDetailData(){
        this.mathInfinity = Infinity;
        this.scrollTop();
        this.loadingShow = true;
        this.detailData.data.productid = Router.history.current.query.productId;
        this.$http.get(this.detailData.url + '?productid=' + this.detailData.data.productid).then((resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.detailData.fetchData = response.data;
              this.sku.data = response.data.productSkuList;
              this.sku.skuLength = response.data.productSkuList.length;
              this.minPrice = response.data.productSkuList.sort(this.compare)[0].price;
              this._pushSkuList(response.data.productSkuList);
              this._skuTotalProduct(response.data.productSkuList);
              this.path[this.path.length-1].text=this.detailData.fetchData.product_name;
              this.picture.allPicture.push(...response.data.picture);
              this.detailData.similarProduct = response.data.otherProduct;
              this.detailData.evaluate = response.data.evaluate;
              if (response.data.inventory_num <= 0) {
                this.buyData.productText = '没货'
              } else {
                this.buyData.productText = '有货'
              }
            }
            this.loadingShow = false;
          }
        );

      },
      _getPictureIndex(index){
        this.picture.hook = index;
      },
      _linkOrder(productId, amount, dealType, oriReqCode, supplierId){
        this.token = cMethods.getCookie('token');
        this.$http.get(this.getUserUrl,{headers:{token:this.token}}).then((resp)=>{
          let response = resp.body;
          if(response.code===410||response.code===409){
            this.$message.warning('您还未登录或登录已过期，请登录！');
            this.$router.push({path:'/login',query:{typeId:1}})
          }else{
            let roleId=cMethods.getCookie("roleId");
            if(roleId==3||roleId==4){
              this.$message.warning('您是供应商，不能购买商品！');
              return false;
            }
            if (this._countTotalProduct()<= 0) {
              this.$message.warning('下单不得少于一件商品！');
              return false;
            }
            let confirmOrder = {
              skuList:this._clearCountZero()
            };
            Router.push({
              path: '/order',
              query: {
                productId: productId,
                amount: amount,
                dealType: dealType,
                oriReqCode: oriReqCode,
                supplierId: supplierId,
                skuData:cMethods.encode(JSON.stringify(confirmOrder))
              }
            })
          }
        })
      },
      _getAnswer(){
        this.answerData.data.productId = Router.history.current.query.productId;
        this.$http.post(this.answerData.url,this.answerData.data,{emulateJSON:true}).then((resp)=>{
          let response=resp.body;
          if(response.code===200){
            this.answerData.answerContent=response.data.pageData;
          }
        },(resp)=>{
          console.log("咨询信息接口调用失败！")
        })
      },
      _question(){
        this.questionData.data.productId=Router.history.current.query.productId;
        this.token=cMethods.getCookie("token");
        if(this.token) {
          if (this.questionData.data.askContent.length <= 0) {
            this.$message.warning("提问不能为空！");
          } else if (this.questionData.data.askContent.length > 100) {
            this.$message.warning("提问字数太长！");
          } else {
            this.$http.post(this.questionData.url, this.questionData.data, {
              emulateJSON: true,
              headers: {token: this.token}
            }).then((resp) => {
              let response = resp.body;
              if (response.code === 200) {
                this.$message.success("提问成功！");
                this.questionData.data.askContent = '';
                this._getAnswer();
              } else if (response.code === 409 || response.code === 410) {
                this.$message.warning("登陆已过期，请重新登陆！");
                Router.push({path:'/login',query:{typeId:1}})
              }else{
                this.$message.warning(response.msg)
              }
            }, (resp) => {
              console.log("获取咨询接口失败")
            })
          }
        }else{
          this.$message.warning("您还没有登陆，请登陆后再提问！");
          Router.push({path:'/login',query:{typeId:1}})
        }
      },
      _getUserInfo(){
        this.token = cMethods.getCookie('token');
        this.$http.get(this.userInfo.url,{headers:{token:this.token}}).then((resp)=>{
          let response = resp.body;
          if(response.code===410||response.code===409){
            this.loginState=false;
          }else{
            this.loginState = true;
            this.userInfo.user.name = response.data.name;
            this.userInfo.user.tel = response.data.mobilePhone;
            this.userInfo.user.roleId = response.data.roleId;
            cMethods.setCookie('roleId',this.userInfo.user.roleId);
            Event.$emit('role-id',this.userInfo.user.roleId)
          }
        },(resp)=>{
          console.log('用户信息接口调用异常')
        })
      },
      _collectGoods(){
        this.collectGoods.data.prodId=this.detailData.data.productid;
        this.cancelCollectGoods.data.prodId=this.detailData.data.productid;
        this.token=cMethods.getCookie("token");
        if(this.isCollectDood){
          this.$http.post(this.collectGoods.url,this.collectGoods.data, {emulateJSON:true, headers:{token:this.token}}).then((resp)=>{
            let response=resp.body;
            if(response.code===200){
              this.isCollectDood=false;
              this.$message.success("收藏成功");
              this.productCollect="已收藏"
            }else if(response.code===409||response.code===410){
              this.$message.warning("尚未登陆或登录已过期，请重新登录");
              Router.push({path:'/login',query:{typeId:1}})
            }else{
              this.$message.error(response.msg);
            }
          },(resp)=>{
            console.log("商品收藏接口失败！");
            this.productCollect="收藏"
          })
        }else{
          this.$http.post(this.cancelCollectGoods.url,this.cancelCollectGoods.data,{emulateJSON:true,headers:{token:this.token}}).then((resp)=>{
            let response=resp.body;
            if(response.code===200){
              this.isCollectDood=true;
              this.$message.success("取消收藏成功");
              this.productCollect="收藏"
            }else if(response.code===409||response.code===410){
              this.$message.error("尚未登陆或登录已过期，请重新登录");
              Router.push({path:'/login',query:{typeId:1}})
            }
          },(resp)=>{
            console.log("取消商品收藏失败！")
          })
        }
      },
      _watchCon(){
        let _this = this;
        this.$watch('questionData.data.askContent',function(n,o){
          let len=_this.questionData.data.askContent.length;
          if(len>100){
            _this.questionData.data.askContent=n.substring(0,100);
          }
        })
      },
      scrollTop(){
        this.$nextTick(() => {
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
      _linkDetail(id){
        this.$router.push({path:'/productDetail',query:{productId:id}})
      },
      _inCount(index){
        this.sku.skuPriceList[index].buyCount++;
      },
      _deCount(index){
        this.sku.skuPriceList[index].buyCount--;
      },
      _toggleSkuList(){
        if(this.sku.normalLength !== this.sku.skuLength){
          this.sku.normalLength = this.sku.skuLength
        }else{
          this.sku.normalLength = 2;
        }
      },
      _pushSkuList(data){
        for(let i = 0;i<data.length;i++){
          this.sku.skuPriceList.push({
            skuId:data[i].skuID,
            buyCount:0
          })
        }
      },
      _countTotalProduct(){//计算采购总数
        let count = 0;
        for(let i = 0;i<this.sku.skuPriceList.length;i++){
          count+=this.sku.skuPriceList[i].buyCount;
        }
        return count;
      },
      _clearCountZero(){//清除采购数为零的SKU
        let notZero = [];
        for(let i = 0;i<this.sku.skuPriceList.length;i++){
          if(this.sku.skuPriceList[i].buyCount>0){
            notZero.push(this.sku.skuPriceList[i])
          }
        }
        return notZero
      },
      _skuTotalProduct(data){
        for(let i = 0;i<data.length;i++){
          this.totalProduct += Math.abs(data[i].qty);
        }
      },
      compare(obj1, obj2) {
        let val1 = obj1.price;
        let val2 = obj2.price;
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
      '$route': '_getDetailData'
    },
    created(){
      this._getDetailData();
      this._getAnswer();
      this._getUserInfo();
      this._watchCon();
      this._isCollectGoods()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "productdetail.styl"
</style>
