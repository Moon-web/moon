<template>
  <div class="logistics">
    <div class="logistics-head">
      <div class="banner-wrapper">
        <div class="banner-content">
          <div class="banner-box">
            <div class="banner-contentBox">
              <el-carousel trigger="click" height="440px" :interval='5000'>
                <el-carousel-item v-for="(item,index) in bannerData.fetchData.banner" :key="index">
                  <span class="background-item" v-lazy:background-image="item.adpicturePath" lazy="loading"></span>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="logistics-content">
      <div class="logistics-findcar">
        <div class="logistics-findcar-left">

        </div>
        <div class="logistics-findcar-right">
          <div class="logistics-head-center">
            <div class="logistics-head-center-title">找车信息</div>
            <div class="search-truck">
              <ul class="entry-box">
                <li class="entry-item">
                  <div class="information">
                    <span class="title">发货地</span>
                    <span class="input">
                      <input type="text" v-model="searchTruckData.data.origin">
                    </span>
                  </div>
                  <div class="information">
                    <span class="title">目的地</span>
                    <span class="input">
                  <input type="text" v-model="searchTruckData.data.destination">
                </span>
                  </div>
                </li>
                <li class="entry-item">
                  <div class="information datetime">
                    <span class="title">开始日期</span>
                    <span class="input picker">
                    <el-date-picker
                      type="date"
                      v-model="searchTruckData.data.startDateStr"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                </span>
                  </div>
                </li>
                <li class="entry-item">
                  <div class="information">
                    <span class="title">货物</span>
                    <span class="input">
                  <input type="text" v-model="searchTruckData.data.goodsDesc">
                </span>
                  </div>
                  <div class="information">
                    <span class="title">货物重量</span>
                    <span class="input">
                  <input type="number" v-model="searchTruckData.data.goodsWeight" placeholder="吨">
                </span>
                  </div>
                </li>
                <li class="entry-item">
                  <div class="information">
                    <span class="title">联系人</span>
                    <span class="input">
                  <input type="text" v-model="searchTruckData.data.consignor">
                </span>
                  </div>
                  <div class="information">
                    <span class="title">联系电话</span>
                    <span class="input">
                  <input type="tel" v-model="searchTruckData.data.phone">
                </span>
                  </div>
                </li>
                <li class="entry-item">
                  <div class="tips">
                    <span class="title">备注</span>
                    <span class="textarea" contenteditable="true" @keyup="_getTips($event)" v-model="searchTruckData.data.consignorMemo">
                </span>
                  </div>
                </li>
              </ul>
              <div class="submit">
                <span class="submit-btn" @click="_submitTruckInformation">我要找车</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="logistics-resource">
        <div class="goods-resource">
          <h3 class="goods-resource-title">
            <span class="resource-title">车辆信息</span>
            <span class="resource-more" @click="_findCar">查看更多>></span>
          </h3>
          <div class="goods-info">
            <div class="goods-car-title">
              <p class="item-wrapper">
                <span class="item">货主信息</span>
                <span class="item">货物描述</span>
                <span class="item">运输路线</span>
              </p>
            </div>
            <div class="goods-carCon">
              <v-swiper :options="swiperOption">
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">157****3589</span>
                    <span class="item">香菇50吨</span>
                    <span class="item">上海—>上海</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">133****6862</span>
                    <span class="item">骏枣50吨</span>
                    <span class="item">上海—>杭州</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">137****9660</span>
                    <span class="item">灰枣50吨</span>
                    <span class="item">上海—>杭州</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">132****9783</span>
                    <span class="item">灰枣50吨</span>
                    <span class="item">上海—>重庆</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">135****9890</span>
                    <span class="item">香菇50吨</span>
                    <span class="item">上海—>北京</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">157****6689</span>
                    <span class="item">蛋20吨</span>
                    <span class="item">上海—>上海</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">133****6862</span>
                    <span class="item">奶50吨</span>
                    <span class="item">上海—>杭州</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">137****9660</span>
                    <span class="item">肉60吨</span>
                    <span class="item">上海—>杭州</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">137****9660</span>
                    <span class="item">茶叶60吨</span>
                    <span class="item">上海—>杭州</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">132****9783</span>
                    <span class="item">棉花50吨</span>
                    <span class="item">上海—>重庆</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">132****9783</span>
                    <span class="item">菠萝50吨</span>
                    <span class="item">上海—>重庆</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">137****9660</span>
                    <span class="item">苹果60吨</span>
                    <span class="item">上海—>杭州</span>
                  </p>
                </v-swiperSlide>
                <v-swiperSlide>
                  <p class="item-wrapper">
                    <span class="item">132****9783</span>
                    <span class="item">豆豉50吨</span>
                    <span class="item">上海—>重庆</span>
                  </p>
                </v-swiperSlide>
              </v-swiper>
            </div>
          </div>
        </div>
        <div class="goods-news">
          <h3 class="goods-resource-title">
            <span class="resource-title">最新招标</span>
            <span class="resource-more" @click="_wlBidding">查看更多>></span>
          </h3>
          <div class="goods-newsCon">
            <div class="goods-news-title">
              <p class="item-wrapper">
                <span class="item">最新招标</span>
                <span class="item">发布时间</span>
              </p>
            </div>
            <div class="goods-news-Con">
              <v-swiper :options="swiperOption">
                <v-swiperSlide v-for="(item,index) in logisticsItem.fetchData" :key="index">
                  <p class="item-wrapper">
                    <span class="item" @click="logisticsDetail(item)">{{item.title}}</span>
                    <span class="item">{{limitText(item.createtime,12,17)}}</span>
                  </p>
                </v-swiperSlide>
              </v-swiper>
            </div>
          </div>
        </div>
      </div>
      <div class="logistics-describe">
        <div class="describe-titleBox">
        </div>
        <div class="describe-contextBox">
          <div class="describe-contextBox-bg"></div>
          <div class="describe-context">
            众农联智慧物流平台是以众农联平台会员企业为切入点、以特色农产品运输为基础、以半成品/成品/运输为延伸、以物流信息化系统为支撑，将物流企业、农产品基地、车源、货源集中整合到一起，并进行集成化管理、可视化运作，使物流企业和农产品基地、农业企业各取所需、互惠互利、抱团发展的一个“B2B+O2O”特色农业产业物流平台。众农联智慧物流平台将成为中国第一个也是最大的一个特色农业产业物流平台。
          </div>
        </div>
      </div>
      <div class="cooperate-friend">
        <div class="title"></div>
        <div class="friend-wrapper">
          <span class="friend-item" v-if="friendLogo" v-for="item in friendLogo">
            <span class="item" v-lazy:background-image="item"></span>
          </span>
        </div>
      </div>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingState"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  //import scrollItem from '@/components/swiper-item/swiper-item.vue'
  import cMethods from '../../common/common'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Loading from '@/components/loading/loading.vue'
  let exPhone = /^0?1[0-9][0-9]\d{8}$/;
  export default {
    components: {
      'v-swiper': swiper,
      'v-swiperSlide': swiperSlide,
     // 'v-scrollItem': scrollItem,
      'v-loading': Loading
    },
    data(){
      return {
        token: '',
        roleId: '',
        corporateId:'',
        loadingState: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        swiperOption: {
          autoplay: 5000,
          speed: 500,
          loop: false,
          setWrapperSize: false,
          direction: 'vertical',
          slidesPerView: 10,  //配置显示条数
          slidesPerGroup:1,
          mousewheelControl: false,
          simulateTouch: false,//不能拖动
          paginationClickable: true,
          mousewheelControl: false,
          observeParents: true
        },
        bannerData: {
          url: '/web/adPicture/findAdPictureByFlag',
          fetchData: [],
          data: {
            searchFlag: 'logistics'
          }
        },
        searchTruckData: {
          url: '/web/logisticsReq/save',
          data: {
            consignor: '',
            phone: '',
            origin: '',
            destination: '',
            goodsDesc: '',
            goodsWeight: '',
            startDateStr: '',
            consignorMemo: '',
            code:''
          }
        },
        truckItem: {
          url: '/web/carinfo/carlist',
          showCount: 5,
          outerHeight: 240,
          data: {
            routebegin: '',
            routeend: '',
            limitedweight: '',
            limitedweight1: '',
            departuretime: ''
          },
          truckHead: [
            '可承载重量',
            '车牌信息',
            '运输线路'
          ],
          fetchData: []
        },
        friendLogo: [
          '../../../static/logistics/wuliu_he1.png',
          '../../../static/logistics/wuliu_he2.png',
          '../../../static/logistics/wuliu_he3.png',
          '../../../static/logistics/wuliu_he4.png',
          '../../../static/logistics/wuliu_he5.png'
        ],
        logisticsItem: {
          url:'/web/info/getInfoList',
          data:{
            firstInfoTypeId:1,
            secondInfoTypeId:26
          },
          showCount: 5,
          outerHeight: 240,
          logisticsHead: [
            '最新招标',
            '发布时间'
          ],
          fetchData: [],
          infoid: ''
        },
        logisticsFunc:[
          {
            src:'../../../static/logistics/icon_inquire.png',
            title:'运价查询',
            content:'实时掌握最新运价'
          },
          {
            src:'../../../static/logistics/icon_weituo.png',
            title:'在线委托',
            content:'轻松委托靠谱车队'
          },
          {
            src:'../../../static/logistics/icon_follow.png',
            title:'订单跟踪',
            content:'随时查看订单运输状态，全程可视化跟踪'
          },
          {
            src:'../../../static/logistics/icon_pay.png',
            title:'在线支付',
            content:'轻松完成订单支付'
          },
          {
            src:'../../../static/logistics/icon_source.png',
            title:'资源调度',
            content:'整合物流资源大力发展回程车，物流资源利用率最大化'
          },
          {
            src:'../../../static/logistics/icon_make.png',
            title:'个性化定制',
            content:'提供最优物流方案及个性化的物流服务'
          },

        ]
      }
    },
    methods: {
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
      _getTips(event){
        this.searchTruckData.data.consignorMemo = event.srcElement.innerHTML;
      },
      _getLargePicture(){
        this.$http.post(this.bannerData.url, this.bannerData.data, {emulateJSON: true}).then(
          (resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.bannerData.fetchData = response.data;
            } else {
              console.log(response.msg)
            }
          }, (err) => {
            console.log('调用图片接口错误')
          }
        )
      },
      _submitTruckInformation(){
        this.token = cMethods.getCookie('token');
        this.roleId = cMethods.getCookie('roleId');
        this.corporateId = cMethods.getCookie('corporateId')
        if(this.roleId === 2 || this.corporateId == 'null'){
          this.$message.warning('您不是供应商或采购商，不能找车！');
          return false
        }else {
          let data = this.searchTruckData.data;
          if (data.origin === '') {
            this.$message.warning('请填写发货地！');
            return false;
          } else if (data.destination === '') {
            this.$message.warning('请填写目的地！');
            return false;
          } else if (data.startDateStr === '') {
            this.$message.warning('请填写开始日期！');
            return false;
          } else if (data.goodsDesc === '') {
            this.$message.warning('请填写货物名称！');
            return false;
          } else if (data.goodsWeight === '') {
            this.$message.warning('请填写货物重量！');
            return false;
          } else if (data.goodsWeight < 1) {
            this.$message.warning('货物重量不能少于1吨');
            return false;
          } else if (data.consignor === '') {
            this.$message.warning('请填写联系人！');
            return false
          } else if (data.phone === '') {
            this.$message.warning('请填写联系人电话！');
            return false;
          } else if (!exPhone.test(data.phone)) {
            this.$message.warning('请输入正确的手机号码！');
            return false;
          }
          this.loadingState = true;
          let years = data.startDateStr.getFullYear();
          let months = this._checkTime(data.startDateStr.getMonth() + 1);
          let days = this._checkTime(data.startDateStr.getDate());
          let time = years + "-" + months + "-" + days;
          this.searchTruckData.data.startDateStr = time;
          this.$http.post(this.searchTruckData.url, this.searchTruckData.data, {headers: {token: this.token}}).then(
            (resp) => {
              let response = resp.body;
              if (response.code === 200) {
                if (this.roleId == 3 || this.roleId == 4 || this.roleId == 5 || this.roleId == 6) {
                  this.$message.success('恭喜！找车成功，请前往用户中心！');
                  this.searchTruckData.data = {
                    consignor: '',
                    phone: '',
                    origin: '',
                    destination: '',
                    goodsDesc: '',
                    goodsWeight: '',
                    startDateStr: '',
                    consignorMemo: ''
                  }
                } else {
                  this.loadingState = false;
                  this.$message.warning('抱歉，只有供应商和采购商才能找车！');
                  return false
                }
              } else if (response.code === 409 || response.code === 410) {
                this.loadingState = false;
                this.$message.error('登录已过期');
                Router.push({path: '/login', query: {typeId: 1}});
                return false;
              } else {
                alert(response.msg)
              }
              this.loadingState = false;
            }, (resp) => {
              alert('找车接口调用错误');
              this.loadingState = false;
            }
          )
        }
      },
      _checkTime(i){
        if (i < 10) {
          i = '0' + i;
        }
        return i
      },
      _getTruckInformation(){
        this.$http.post(this.truckItem.url, this.truckItem.data, {emulateJSON: true}).then(
          (resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.truckItem.fetchData = response.data.pagedate;
            } else {
              console.log(response.msg)
            }
          }, (resp) => {
            console.log('车队列表接口调用错误')
          }
        )
      },
      _getLogistics(){
        this.$http.post(this.logisticsItem.url, this.logisticsItem.data, {emulateJSON: true}).then((resp) => {
          let response = resp.body;
          if (response.code === 200) {
            this.logisticsItem.fetchData = response.data.infolist;
          }
        }, (resp) => {
          let response = resp.body;
          console.log(response.msg)
        })
      },
      logisticsDetail(code){
        this.logisticsItem.infoid = code.infoid;
        Router.push({path: '/biddingDetail', query: {infoid: this.logisticsItem.infoid}})
      },
      _findCar(){
        Router.push('findCar');
      },
      _wlBidding(){
        Router.push({path: '/wlbidding'});
      }
    },
    created(){
      this._getLargePicture();
      this._getTruckInformation();
      this._getLogistics();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "logistics.styl"
</style>
