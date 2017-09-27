<template>
  <div class="order-content" ref="orderContent">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="order">
      <div class="order-top">
        <div class="top-left" @click="_linkIndex"></div>
        <div class="top-right">
          <span class="check">1.填写核对信息订单信息</span>
          <span class="checkNext">2.成功提交订单</span>
        </div>
      </div>
      <div class="information" v-if="warnWindow">
        <p class="information-content">
          {{information}}
        </p>
        <span class="information-colse" @click="warnWindow=!warnWindow"></span>
      </div>
      <div v-if="orderWindow.entry" class="order-center">
        <h3 class="order-title">{{title}}</h3>
        <div class="order-detail">
          <div class="detail-address">
            <h3 class="address-title">收货人信息</h3>
            <div class="addressAll">
              <div class="addressBox" v-for="(item,index) in orderData.addressList"
                   :class="addressHook==index?'active':''" @click="_choiceAddress(index,item)">
                <div class="name">
                  <p class="ueserName">{{item.name}}收</p>
                  <button class="select" v-if="item.type!=1">默认地址</button>
                </div>
                <p class="detail">
                  <span class="addressD" v-if="item.province">{{item.province}}{{item.city}}{{item.county}}{{item.detail}}</span>
                  <span class="phone">手机：{{item.mobilePhone}}</span>
                </p>
              </div>
              <div class="new-addressBox" @click="addressOutsideWindow=true">
                <p class="name">添加新地址</p>
              </div>
            </div>
          </div>
          <div class="bill">
            <h3 class="bill-title">发票等其他信息</h3>
            <div class="bill-type">
              <span class="need" :class="fpChoice===true?'active':''" @click="_choiceInvoice">需要发票</span>
              <select name="name"
                      id="select"
                      class="chioce"
                      v-model="condition.billType"
                      v-if="fpChoice">
                <option :value="item.id" v-for="item in billArr">{{item.name}}</option>
              </select>
            </div>
            <div class="billTitle-wrapper" v-if="billTitle.show">
              <dl class="billTitle-item"
                  v-for="(item,index) in billTitle.data"
                  @click="_choiceBillTitle(item.id,index,item)"
                  :class="billTitle.hook===index?'active':''">
                <h5 class="billTitle-head">
                  {{item.companyName}}
                </h5>
                <span class="billTitle-information">
                  <p class="information-item">纳税人识别号：{{item.taxpayerId}}</p>
                  <p class="information-item">手机号：{{item.telephone}}</p>
                  <p class="information-item">银行账户：{{item.bankAccount}}</p>
                  <p class="information-item">开户行：{{item.bankName}}</p>
                  <p class="information-item">地址：{{item.address}}</p>
                </span>
              </dl>
              <i class="warn" v-if="billTitle.data.length<1">当前发票类型未添加任何抬头</i>
            </div>
            <div class="other-information">
              <textarea name=""
                        class="text"
                        placeholder="备注：请填写其他信息"
                        v-model="condition.buyerComment">
              </textarea>
            </div>
          </div>
          <div class="product">
            <h3 class="product-title">确认订单信息</h3>
            <div class="order-wrapper">
              <ul class="order-wrapper-ul">
                <li class="order-title-list">
                  商品信息
                </li>
                <li class="order-title-list">
                  商品规格
                </li>
                <li class="order-title-list">
                  单价
                </li>
                <li class="order-title-list">
                  数量
                </li>
                <li class="order-title-list">
                  小计
                </li>
              </ul>
              <div class="order-list-wrapper">
                <div class="order-list-header">
                  <span class="header-item">
                    <i class="title">供应商：</i>
                    <i class="text">{{orderDetail.supplierName}}</i>
                  </span>
                  <span class="header-item">
                    <i class="title">产品分类：</i>
                    <i class="text">{{orderDetail.categoryName}}</i>
                  </span>
                </div>
                <div class="order-list-content">
                  <dl class="order-list-row" v-for="(item,index) in skuList">
                    <div class="information-item">
                      <div class="product-information">
                        <span class="picture" v-lazy:background-image="orderDetail.imageUrl"></span>
                        <span class="name">{{orderDetail.productName}}<i v-if="orderDetail.productAttrs">-{{orderDetail.productAttrs}}</i></span>
                      </div>
                    </div>
                    <div class="information-item">
                      <div class="sku-attr">
                        <p class="attr-row" v-for="(key,val,index) in item.values">
                         {{val}}：{{key}}
                        </p>
                      </div>
                    </div>
                    <div class="information-item">
                      <div class="sku-attr">
                        <p class="attr-row" v-if="item.expectPrice">¥{{item.expectPrice}}</p>
                      </div>
                    </div>
                    <div class="information-item">
                      <div class="counter-wrapper">
                        <span class="list-total" v-if="disable===true">
                          {{skuData.skuList[index].buyCount}}
                        </span>
                        <v-counter
                          v-if="disable===false"
                          :width="98"
                          :maxCount="Infinity"
                          :buyCount="skuData.skuList[index].buyCount"
                          v-on:_decrease="_decrease(index)"
                          v-on:_increase="_increase(index)"
                          v-model="skuData.skuList[index].buyCount">
                        </v-counter>
                      </div>
                    </div>
                    <div class="information-item">
                      <div class="sku-attr">
                        <p class="attr-row red">¥{{_mulComputed(item.expectPrice,skuData.skuList[index].buyCount)}}</p>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="confirm">
          <div class="confirm-information">
            <p class="total-money">
              应付总金额：<span class="money">¥{{_totalPrice().toFixed(2)}}</span><!--总价-->
            </p>
            <p class="address">
              寄送至：<span
              class="endAddress">{{itemAddress.province || ''}}{{itemAddress.city || ''}}{{itemAddress.county || ''}}{{itemAddress.detail || ''}}</span>
            </p>
            <p class="contacts">
              收货人：<span class="contacts-con">{{itemAddress.name || ''}} {{itemAddress.mobilePhone || ''}}</span>
            </p>
          </div>
          <button class="commit" @click="_confirmWindow">提交订单</button>
          <button class="cancel" @click="_ComeBack">取消</button>
        </div>
      </div>
      <div v-if="orderWindow.confirm" class="confirm-order">
        <div class="confirm-title">确认订单详情</div>
        <div class="order-confirm-content">
          <div class="order-wrapper">
            <ul class="order-wrapper-ul">
              <li class="order-title-list">
                商品信息
              </li>
              <li class="order-title-list">
                商品规格
              </li>
              <li class="order-title-list">
                单价
              </li>
              <li class="order-title-list">
                数量
              </li>
              <li class="order-title-list">
                小计
              </li>
            </ul>
            <div class="order-list-wrapper">
              <div class="order-list-header">
                  <span class="header-item">
                    <i class="title">供应商：</i>
                    <i class="text">{{orderDetail.supplierName}}</i>
                  </span>
                <span class="header-item">
                    <i class="title">产品分类：</i>
                    <i class="text">{{orderDetail.categoryName}}</i>
                  </span>
              </div>
              <div class="order-list-content">
                <dl class="order-list-row" v-for="(item,index) in skuList">
                  <div class="information-item">
                    <div class="product-information">
                      <span class="picture" v-lazy:background-image="orderDetail.imageUrl"></span>
                      <span class="name">{{orderDetail.productName}}-{{orderDetail.productAttrs}}</span>
                    </div>
                  </div>
                  <div class="information-item">
                    <div class="sku-attr">
                      <p class="attr-row" v-for="(key,val,index) in item.values">
                        {{key}}：{{val}}
                      </p>
                    </div>
                  </div>
                  <div class="information-item">
                    <div class="sku-attr">
                      <p class="attr-row">¥{{item.expectPrice}}</p>
                    </div>
                  </div>
                  <div class="information-item">
                    <div class="counter-wrapper">
                      <span class="list-total">
                        {{skuData.skuList[index].buyCount}}
                      </span>
                    </div>
                  </div>
                  <div class="information-item">
                    <div class="sku-attr">
                      <p class="attr-row red">¥{{_mulComputed(item.expectPrice,skuData.skuList[index].buyCount)}}</p>
                    </div>
                  </div>
                </dl>
                <p class="total-money">
                  应付总金额：<span class="money">¥{{_totalPrice().toFixed(2)}}</span><!--总价-->
                </p>
              </div>
            </div>
          </div>
          <div class="order-address" v-if="itemAddress.name">
            <i class="confirm-tag">收货地址</i>
            {{itemAddress.name}}（收）{{itemAddress.mobilePhone}}
            {{itemAddress.province}}{{itemAddress.city}}{{itemAddress.county}}{{itemAddress.detail}}
          </div>
          <div class="order-bill">
            <p class="bill-title" v-if="fpChoice">
              <i class="confirm-tag">{{condition.billName}}</i>
              <i class="bill-information" v-if="billTitle.id!==null">
                纳税人识别号：{{billTitle.focusData.taxpayerId}}；
                手机号：{{billTitle.focusData.telephone}}；
                银行账户：{{billTitle.focusData.bankAccount}}；
                开户行：{{billTitle.focusData.bankName}}；
                地址：{{billTitle.focusData.address}}；
              </i>
            </p>
            <span class="tips" v-if="condition.buyerComment!==''">
              <i>备注信息：</i>
              {{condition.buyerComment}}
            </span>
            <p class="order-confirm-button">
              <span class="cancel-button" @click="_confirmWindow">取消</span>
              <span class="submit-button" @click="_submit">确认订单</span>
            </p>
          </div>
        </div>
      </div>
      <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-show="addressOutsideWindow" class="create-address">
          <div class="created">
            <div class="created-center">
              <div class="created-head">
                新增收货信息
                <i class="close" @click="addressOutsideWindow=false"></i>
              </div>
              <div class="created-content">
                <ul class="created-ul">
                  <li class="created-item">
                    <span class="created-title">地址名称：</span>
                    <span class="created-information">
                    <input class="entry-text" v-model="createAddress.data.address_name" type="text"
                           placeholder="请输入地址名称">
                  </span>
                  </li>
                  <li class="created-item">
                    <span class="created-title">默认地址：</span>
                    <span class="created-information">
                    <i class="choice-type"
                       :class="createAddress.addressType===true?'active':''"
                       @click="createAddress.addressType=true">普通地址</i>
                    <i class="choice-type"
                       :class="createAddress.addressType===false?'active':''"
                       @click="createAddress.addressType=false">默认地址</i>
                  </span>
                  </li>
                  <li class="created-item">
                    <span class="created-title">邮编：</span>
                    <span class="created-information">
                    <input class="entry-text" v-model="createAddress.data.zip_code" type="text" placeholder="请输入邮编">
                  </span>
                  </li>
                  <li class="created-item">
                    <span class="created-title">收货人：</span>
                    <span class="created-information">
                    <input class="entry-text" v-model="createAddress.data.name" type="text" placeholder="请输入收货人姓名">
                  </span>
                  </li>
                  <li class="created-item">
                    <span class="created-title">手机号码：</span>
                    <span class="created-information">
                    <input class="entry-text" v-model="createAddress.data.mobile_phone" type="text"
                           placeholder="请输入正确的手机号">
                  </span>
                  </li>
                  <li class="created-item">
                    <span class="created-title">地区：</span>
                    <span class="created-information">
                      <v-citySelect :width="104"></v-citySelect>
                    </span>
                  </li>
                  <li class="created-item">
                    <span class="created-title">详细地址：</span>
                    <span class="created-information">
                    <input class="entry-text long" v-model="createAddress.data.detail_address" type="text"
                           placeholder="请输入详细地址">
                  </span>
                  </li>
                </ul>
                <div class="save-address">
                  <span class="save-button" @click="saveAddress">保存</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
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
  import Router from '../../router/index'
  import cMethods from  '../../common/common'
  import citySelect from '@/components/citySelect/citySelect.vue'
  import Event from '../../common/emit'
  import Loading from '@/components/loading/loading.vue'
  import Counter from '@/components/counter/counter.vue'
  let reg = /^0?1[0-9][0-9]\d{8}$/;
  export default{
    components: {
      'v-head': Head,
      'v-nav': Nav,
      'v-footer': Footer,
      'v-loading': Loading,
      'v-counter':Counter,
      'v-citySelect':citySelect
    },
    data(){
      return {
        loadingShow: false,
        disable:false,
        information: '温馨提示：请确认相关商品信息后，提交订单',
        title: '填写并核对订单信息',
        productTitle: [
          '产品名称',
          '供应商',
          '价格（单价）',
          '数量',
          '小计（价格）'
        ],
        orderUrl: '/web/order/confirm',
        submitUrl: '/web/order/submit',
        orderData: [],
        orderDetail: {},
        condition: {
          productId: '',//普通下单的ID
          amount: '',
          dealType: '',//ZY：商城；CH：撮合交易；JC：集采交易
          oriReqCode: '',//撮合需求的ID
          groupBuyCode: '',//集采活动的Code
          groupBuyId: '',//集采ID
          supplierId: '',
          matchId: '',
          billType: '',
          billName: '',
          buyerComment: '',
          deposit:''
        },
        token: '',
        roleId: '',
        addressHook: 0,
        fpChoice: false,
        itemAddress: {},
        price: {
          singePrice: 0,//单价用于计算
          totalProduct: 0,//产品总量
          realPrice: 0,//用于累加
          buyCount: 0//购买个数
        },
        warnWindow: true,
        addressOutsideWindow: false,
        createAddress: {
          addressType: true,
          url: '/web/address/save',
          data: {
            type: '',
            name: '',
            address_name: '',
            mobile_phone: '',
            address_code: '',
            zip_code: '',
            detail_address: ''
          }
        },
        billArr: [],
        orderWindow: {
          entry: true,
          confirm: false
        },
        skuData:{
          skuList:[]
        },
        skuList:[],
        skuTotalPrice:0,
        billTitle:{
          show:false,
          hook:null,
          focusData:{},
          data:[],
          normalData:[],
          valueData:[],
          id:null
        },
      }
    },
    methods: {
      _getData(){
        this.loadingShow = true;
        let skuData = this.$router.history.current.query.skuData;
        if(skuData!==undefined){//普通直接下单
          this.skuData = JSON.parse(cMethods.decode(skuData));
          this.disable=false;
        }else{//后台跳转下单
          this.disable=true;
        }
        this.token = cMethods.getCookie('token');
        this.roleId = cMethods.getCookie('roleId');
        let routes = Router.history.current.query;
        this.condition.productId = routes.productId || '';
        this.condition.amount = routes.amount || 0;//购买个数
        this.condition.dealType = routes.dealType || '';
        this.condition.oriReqCode = routes.oriReqCode || '';
        this.condition.supplierId = routes.supplierId || '';
        this.condition.matchId = routes.matchReqId || '';
        this.condition.groupBuyCode = routes.groupBuyCode || '';
        this.condition.groupBuyId = routes.groupBuyId || '';
        this.condition.deposit=routes.deposit||'';
        this.condition.parentOrderId = routes.parentOrderId||'';
        let url = this.orderUrl + '?productId=' +
        this.condition.productId + '&amount=' +
        this.condition.amount + '&dealType=' +
        this.condition.dealType + '&oriReqCode=' +
        this.condition.oriReqCode + '&supplierId=' +
        this.condition.supplierId + '&matchReqId=' +
        this.condition.matchId + '&groupBuyCode=' +
        this.condition.groupBuyCode + '&groupBuyId=' +
        this.condition.groupBuyId+'&deposit='+
        this.condition.deposit+'&parentOrderId='+
        this.condition.parentOrderId;
        this.$http.get(url, {
          headers: {
            'If-Modified-Since':'0',
            'Cache-Control':'no-cache',
            token: this.token
          },
        }).then((resp) => {
          let response = resp.body;
          if (response.code === 410 || response.code === 409) {
            this.$message.warning('请先登录！');
            Router.push({path:'/login',query:{typeId:1}})
          } else if (response.code === 200) {
            this.orderData = response.data;
            this.billTitle.normalData = response.data.normalTitle;
            this.billTitle.valueData = response.data.valueTitle;
            if(skuData===undefined){
              this._getMatchSku(response.data.productList[0].skuJsonObj)
            }
            this.orderDetail = response.data.productList[0];
            if(response.data.productList[0].skuJsonObj != null){
              this._getSkuList(response.data.productList[0].skuJsonObj);
            }
            if (response.data.addressList.length < 1) {
              this.itemAddress = ''
            } else {
              this.itemAddress = response.data.addressList[0];
            }
            this.billArr = response.data.billTypeList;
            this.loadingShow = false;
          } else {
            this.$message.warning(response.msg);
            this.loadingShow = false;
          }
        })
      },
      _choiceAddress(index, item){
        this.addressHook = index;
        this.itemAddress = item;
      },
      _submit(){
        this.loadingShow = true;
        let skuIds = this._getSkuIds();
        let skuIdsQuantity = this._getSkuIdsQuantity();
        let data = {
          productId: this.orderDetail.productId,
          dealType: this.condition.dealType,
          oriReqCode: this.condition.oriReqCode,
          groupBuyId: this.condition.groupBuyId,
          groupBuyCode: this.condition.groupBuyCode,
          addressId: this.itemAddress.addressId,
          billIsuse: this.fpChoice === false ? 0 : 1,//是否需要发票
          billType: this.condition.billType,//发票类型,
          billName: this.condition.billName,//发票类型名称
          billTitleId:this.billTitle.id,//发票抬头
          buyerComment: this.condition.buyerComment,//备注
          count: this.price.buyCount,
          supplierId: this.orderDetail.supplierId,
          acceptName: this.itemAddress.name,
          acceptPhone: this.itemAddress.mobilePhone,
          matchReqId: this.condition.matchId,
          deposit:this.condition.deposit,
          parentOrderId:this.condition.parentOrderId,
          skuIds:skuIds,
          skuIdsQuantity:skuIdsQuantity
        };
        this.$http.post(this.submitUrl, data, {
          emulateJSON: true,
          headers: {
            'If-Modified-Since':'0',
            'Cache-Control':'no-cache',
            token: this.token
          },

        }).then((resp) => {
          let response = resp.body;
          if (response.code === 200) {
            this.$message.success('订单提交成功！');
            if(this.roleId==5||this.roleId==6){
              window.location.href = cMethods.getHref()+'?menuId=z33'
            }else if(this.roleId==3||this.roleId==4){
              window.location.href = cMethods.getHref()+'?menuId=z34'
            }
            this.loadingShow = false;
          }else if(response.code===904){
            this.loadingShow = false;
            this.$message.warning('订单已存在！不能重复下单');
          }else if(response.code===409||response.code===410){
            this.loadingShow = false;
            this.$message.warning('登录已过期，请重新登录');
            this.$router.push({
              path:'/login',
              query:{
                typeId:1
              }
            })
          }
        })
      },
      _linkIndex(){
        Router.push('/index');
      },
      saveAddress(){
        let zipCode = /^[0-9]{6}$/;
        let reg = /^0?1[0-9][0-9]\d{8}$/;
        let data = this.createAddress.data;
        if (this.createAddress.addressType === true) {
          this.createAddress.data.type = 1;
        } else {
          this.createAddress.data.type = 0;
        }
        if (data.address_name === '') {
          this.$message.warning('请输入地址名称！');
          return false;
        }
        if (data.zip_code === '') {
          this.$message.warning('请输入邮编！');
          return false;
        }
        if (data.name === '') {
          this.$message.warning('请输入收货人姓名！');
          return false;
        }
        if (data.mobile_phone === '') {
          this.$message.warning('请输入手机号！');
          return false
        }
        if (!reg.test(data.mobile_phone)) {
          this.$message.warning('请输入正确的手机号！');
          return false
        }
        if (data.detail_address === '') {
          this.$message.warning('请输入详细地址！');
          return false
        }
        if (!zipCode.test(data.zip_code)) {
          this.$message.warning('请输入正确的邮编！');
          return false
        }
        if (this.createAddress.data.address_code === '' || this.createAddress.data.address_code === undefined) {
          this.$message.warning('请选择你所在的地区！');
          return false
        }
        this.loadingShow = true;
        this.$http.post(this.createAddress.url, this.createAddress.data, {
          headers: {
            'If-Modified-Since':'0',
            'Cache-Control':'no-cache',
            token: this.token
          },

        }).then(
          (resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.$message.success('保存成功！');
              this.addressOutsideWindow = false;
              this.createAddress.addressType = true;
              this.createAddress.data = {
                type: '',
                name: '',
                address_name: '',
                mobile_phone: '',
                address_code: '',
                zip_code: '',
                detail_address: ''
              };
              this._getData();
            } else {
              this.$message.error('保存失败！');
            }
            this.loadingShow = false;
          }
        )
      },
      hah(v){
        this.createAddress.data.address_code = v.district.addressCode;
      },
      _getCitySelect(){
        let _this = this;
        Event.$on('throwData',function(v){
          _this.hah(v);
        })
      },
      _choiceInvoice(){
        this.fpChoice = !this.fpChoice;
        if (this.fpChoice === false) {
          this.condition.billType = '';
          this.condition.billName = ''
        } else {
          this.condition.billType = this.billArr[0].id;
          this.billTitle.show = true;
        }
      },
      _confirmWindow(){
        if (this.itemAddress.addressId === '' || this.itemAddress.addressId === undefined) {
          this.$message.warning('收货地址不能为空！');
          return false
        }
        if(this.fpChoice===true&&this.billTitle.id===null&&this.billTitle.data.length>0){
          this.$message.warning('请选择发票抬头！');
          return false
        }
        if (this.orderWindow.entry === true) {
          this.orderWindow.entry = false;
          this.orderWindow.confirm = true;
          this.scrollTop();
        } else {
          this.orderWindow.entry = true;
          this.orderWindow.confirm = false;
          this.scrollTop();
        }
      },
      _ComeBack(){
        Router.back()
      },
      scrollTop(){
        this.$nextTick(() => {
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
      _getSkuList(data){
        this.skuList = [];
        for(let i = 0;i<this.skuData.skuList.length;i++){
          for(let j =0;j<data.length;j++){
            if(this.skuData.skuList[i].skuId===data[j].skuId){
              this.skuList.push(data[j]);
            }
          }
        }
      },
      _getMatchSku(data){//取SKU数组
        this.skuData.skuList = [];
        for(let i = 0;i<data.length;i++){
          this.skuData.skuList.push({
            skuId:data[i].skuId,
            buyCount:data[i].requireQty
          })
        }
      },
      _decrease(index){
        this.skuData.skuList[index].buyCount--;
      },
      _increase(index){
        this.skuData.skuList[index].buyCount++;
      },
      _totalPrice(){
        let price = 0;
        for(let i = 0;i<this.skuData.skuList.length;i++){
          price+=(Math.abs(this.skuData.skuList[i].buyCount)*Math.abs(this.skuList[i].expectPrice))
        }
        this.skuTotalPrice = price;
        return price;
      },
      _getSkuIds(){
        let ids = [];
        for(let i = 0;i<this.skuData.skuList.length;i++){
          ids.push(this.skuData.skuList[i].skuId)
        }
        return ids
      },
      _getSkuIdsQuantity(){
        let quantity = [];
        for(let i = 0;i<this.skuData.skuList.length;i++){
          quantity.push(this.skuData.skuList[i].buyCount)
        }
        return quantity;
      },
      _choiceBillTitle(id,index,data){
        this.billTitle.id = id;
        this.billTitle.hook = index;
        this.billTitle.focusData = data;
      },
      _watch(){
        this.$watch('condition.billType',function(n,o){
          this.billTitle.hook = null;
          this.billTitle.id = null;
          if(n===''){
            this.billTitle.show = false;
          }else if(n===11){
            this.billTitle.data = this.billTitle.valueData;
            this.condition.billName = '增值税发票'
          }else if(n===25){
            this.billTitle.data = this.billTitle.normalData;
            this.condition.billName = '普通发票'
          }
        })
      },
      _mulComputed(c,b){
        return (c*b).toFixed(2);
      }
    },
    created(){
      this._getData();
      this.scrollTop();
      this._watch();
    },
    mounted(){
      this._getCitySelect()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "order.styl"
</style>
