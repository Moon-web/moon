<template>
  <div class="bidList-wrapper">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="swiper-wrapper">
      <div class="banner-wrapper">
        <div class="banner-content">
          <div class="banner-box">
            <div class="banner-contentBox">
              <el-carousel trigger="click" height="440px" :interval='5000'>
                <el-carousel-item v-for="(item,index) in bidListBanner.fetchData.banner" :key="index">
                  <span class="background-item" v-lazy:background-image="item.adpicturePath" lazy="loading"></span>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bidingList-container">
      <div class="bidList-content">
        <div class="bidList-left">
          <div class="bidList-left-top"></div>
          <div class="bidList-left-bottom">
            <div class="bidList-list" v-for="(item,index) in bidlist.bidlistData" v-if="item.status !=2">
              <!--竞拍尚未开始 竞拍报名 3-->
              <div class="bidList-box" v-if="item.status == 3">
                <div class="bidList-list-left">
                  <h3 class="bidList-list-title">
                    <span class="bidList-list-name">{{item.auctionReq.productName}}</span>
                  </h3>
                  <div class="bidList-price">
                    <div class="bidList-list-name">起拍价格：<span class="bidList-list-number">{{item.auctionReq.reqQuantity}}元/{{item.auctionReq.unit}}</span></div>
                    <div class="time" v-if="item.enrollStartTime>=date">
                      <span class="begin-time">距离报名开始：</span>
                      <span class="lastTime"><v-timer :endTime="item.enrollStartTime"></v-timer></span>
                    </div>
                    <div class="time" v-if="item.enrollStartTime<date">
                      <span class="begin-time">距离报名结束：</span>
                      <span class="lastTime"><v-timer :endTime="item.enrollEndTime"></v-timer></span>
                    </div>
                  </div>
                  <div class="bidList-num">
                    <span class="bidList-list-name">竞拍总数：</span>
                    <span class="bidList-list-number">{{item.auctionReq.reqQuantity}}{{item.auctionReq.unit}}</span>
                  </div>
                  <div class="bidList-time">
                    <span class="bidList-list-name">报名时间：</span>
                    <span class="bidList-list-number">{{item.enrollStartTime}}~{{item.enrollEndTime}}</span>
                  </div>
                </div>
                <div class="bidList-list-right">
                  <div class="bidList-list-city">地区：{{item.auctionReq.division.divisionName}}</div>
                  <div class="bidList-list-sureMoney" v-if="item.recognizanceRule == 1">保证金：{{item.recognizanceValue}}（固定金额）</div>
                  <div class="bidList-list-sureMoney" v-if="item.recognizanceRule == 2">保证金：{{item.recognizanceValue}}（按数量）</div>
                  <div class="bidList-list-startTime"><span class="biding" @click="_bidding(item.auctionId)">我要报名</span></div>
                </div>
              </div>
              <!--我要竞拍  4,5-->
              <div class="bidList-box" v-if="item.status == 4||item.status == 5">
                <div class="bidList-list-left" >
                  <h3 class="bidList-list-title">
                    <span class="bidList-list-name">{{item.auctionReq.productName}}</span>
                  </h3>
                  <!--我要竞拍 status为4，5-->
                  <div class="bidList-price">
                    <div class="bidList-list-name">起拍价格：<span class="bidList-list-number">{{item.auctionReq.startPrice}}元</span></div>
                    <div class="time" v-if="item.auctionStartTime>=date">
                      <span class="begin-time">距竞拍开始：</span>
                      <span class="lastTime"><v-timer :endTime="item.auctionStartTime"></v-timer></span>
                    </div>
                    <div class="time" v-if="item.auctionStartTime<date">
                      <span class="begin-time">距竞拍结束：</span>
                      <span class="lastTime"><v-timer :endTime="item.auctionEndTime"></v-timer></span>
                    </div>
                  </div>
                  <div class="bidList-num">
                    <span class="bidList-list-name">竞拍总数：</span>
                    <span class="bidList-list-number">{{item.auctionReq.reqQuantity}}{{item.auctionReq.unit}}</span>
                  </div>
                  <div class="bidList-time">
                    <span class="bidList-list-name">竞拍时间：</span>
                    <span class="bidList-list-number">{{item.auctionStartTime}}~{{item.auctionEndTime}}</span>
                  </div>
                </div>
                <div class="bidList-list-right">
                  <div class="bidList-list-city">地区：{{item.auctionReq.division.divisionName}}</div>
                  <div class="bidList-list-sureMoney" v-if="item.recognizanceRule == 1">保证金：{{item.recognizanceValue}}（固定金额）</div>
                  <div class="bidList-list-sureMoney" v-if="item.recognizanceRule == 2">保证金：{{item.recognizanceValue}}（按数量）</div>
                  <div class="bidList-list-startTime"><span class="biding" @click="_bidding(item.auctionId)">我要竞拍</span></div>
                </div>
              </div>
              <!--竞拍结束 6-->
              <div class="bidList-box" v-if="item.status == 6">
                <div class="bidList-list-left">
                  <h3 class="bidList-list-title">
                    <span class="bidList-list-name">{{item.auctionReq.productName}}</span>
                  </h3>
                  <div class="bidList-price">
                    <div class="bidList-list-name">最高中标价：<span class="bidList-list-number">{{item.bidMaxPrice}}元/{{item.auctionReq.unit}}</span></div>
                    <div class="time">
                      <span class="begin-time">最低中标价：</span>
                      <span class="lastTime">{{item.bidMinPrice}}元/{{item.auctionReq.unit}}</span>
                    </div>
                  </div>
                  <div class="bidList-num">
                    <span class="bidList-list-name">中标企业数目：</span>
                    <span class="bidList-list-number">20家</span>
                  </div>
                  <div class="bidList-time">
                    <span class="bidList-list-name">竞拍结束时间：</span>
                    <span class="bidList-list-number">{{item.auctionEndTime}}</span>
                  </div>
                  <div class="over-bg"></div>
                </div>
                <div class="bidList-list-right over-bidlist">
                  <div class="bidList-list-city">地区：{{item.auctionReq.division.divisionName}}</div>
                  <div class="bidList-list-sureMoney" v-if="item.recognizanceRule == 1">保证金：{{item.recognizanceValue}}（固定金额）</div>
                  <div class="bidList-list-sureMoney" v-if="item.recognizanceRule == 2">保证金：{{item.recognizanceValue}}（按数量）</div>
                  <div class="bidList-list-startTime"><span class="biding" @click="_bidding(item.auctionId)">竞拍结束</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bidList-right">
          <div class="other-top">
            <div class="other-top-bg"></div>
            <span class="other-top-content">Hi，<i v-if="userInfo.loginState===true">{{userInfo.user.name}}</i>你好</span>
            <div class="other-infomation">
              <div class="login-con" v-if="userInfo.loginState===false">
                <span class="login statue" @click="_login">登录</span>
                <span class="register" @click="_register">注册</span>
              </div>
              <div class="exit-login-con" v-if="userInfo.loginState===true">
                <span class="exit-login">欢迎您来到众农联平台</span>
              </div>
            </div>
            <div class="other-small-item">
              <span class="small-item" v-for="item in 4"></span>
            </div>
          </div>
          <div class="bidList-success">
            <h3 class="success-title">竞拍成功</h3>
            <div class="success-list">
              <v-swiper :options="swiperOption">
                <v-swiperSlide v-for="(item,index) in listSuccessAuction.listSuccessAuctionData" :key="index">
                  <p class="success-item">
                    <span class="success-item-con">{{item.auctionName}}</span>
                    <span class="success-time">{{limitText(item.createTime,6,11,0)}}</span>
                  </p>
                </v-swiperSlide>
              </v-swiper>
            </div>
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
  import cMethods from '../../common/common'
  import Event from '../../common/emit'
  import Loading from '@/components/loading/loading.vue'
  import Timer from '@/components/timer/timer.vue'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer,
      'v-loading': Loading,
      'v-timer':Timer,
      'v-swiper': swiper,
      'v-swiperSlide': swiperSlide,
    },
    data(){
      return{
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
        loadingState: false,
        bidListBanner:{
          url: '/web/adPicture/findAdPictureByFlag',
          data: {
            searchFlag: 'bidlist'
          },
          fetchData:[],
        },
        userInfo:{
          loginState:false,
          userUrl:'/web/individua/getUserInfo',
          user:{
            name:'',
            tel:'',
            roleId:''
          },
        },
        bidlist:{
          url:'/web/webAuction/listAuction',
          data:{
            currentPage:'',
            showCount:10
          },
          bidlistData:[],
          //距离报名开始的倒计时
          startTime:{
            day: '',
            hour: '',
            minute: '',
            second: ''
          },
          //距离竞拍结束的倒计时
          decreaseDate: {
            day: '',
            hour: '',
            minute: '',
            second: ''
          },
          //距离竞拍结束的当前时间
          targetTime:{},
          //距离报名开始的当前时间
          nowTime:{},
        },
        listSuccessAuction:{
          url:'/web/webAuction/listSuccessAuction',
          data:{
            currentPage:'',
            showCount:20,
          },
          listSuccessAuctionData:[],
        },
        date:''
      }
    },
    methods:{
      _getBanner(){
        this.$http.post(this.bidListBanner.url,this.bidListBanner.data,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code === 200){
            this.bidListBanner.fetchData = response.data;
          }
        },(resp)=>{
          alert("banner图接口调用失败")
        })
      },
      //获取用户信息
      getData(){
        this.token = cMethods.getCookie('token');
        this.$http.get(this.userInfo.userUrl,{headers:{token:this.token}}).then((resp)=>{
          let response = resp.body;
          if(response.code===410||response.code===409){
            cMethods.setCookie('loginState',false);
            this.userInfo.loginState=false;
          }else{
            this.userInfo.loginState = true;
            this.userInfo.user.name = response.data.name;
            this.userInfo.user.tel = response.data.mobilePhone;
            this.userInfo.user.roleId = response.data.roleId;
            cMethods.setCookie('roleId',this.userInfo.user.roleId);
            cMethods.setCookie('loginState',true);
            Event.$emit('role-id',this.userInfo.user.roleId);
          }
        },(resp)=>{
          cMethods.setCookie('loginState',false);
          alert('用户信息接口调用异常')
        })
      },
      //登录
      _login(){
        Router.push({path:'/login',query:{type:1}})
      },
      //注册
      _register(){
        Router.push('/register')
      },
      _getBidListData(){
        this.loadingState = true;
        this.$http.post(this.bidlist.url,this.bidlist.data,{elumentJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code === 200){
            this.loadingState = false;
            this.bidlist.bidlistData = response.data.pageData;
            let month = this._checkTime(new Date().getMonth()+1);
            let day = this._checkTime(new Date().getDate());
            let hour = this._checkTime(new Date().getHours());
            let minute = this._checkTime(new Date().getMinutes());
            let seconds = this._checkTime(new Date().getSeconds());
            this.date = new Date().getFullYear()+'-'+month+'-'+day+' '+hour+':'+minute+':'+seconds
          }
        },(resp)=>{
          this.loadingState = false;
          console.log("竞拍列表接口调用失败")
        })
      },
      _checkTime(i){
        if (i < 10) {
          i = '0' + i;
        }
        return i
      },
      //我要竞拍
      _bidding(id){
        Router.push({path:'/bidDetail',query:{auctionId:id}});
      },
      //竞拍成功列表
      _listSuccessAuction(){
        this.$http.post(this.listSuccessAuction.url,this.listSuccessAuction.data,{emulateJSON:true}).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.listSuccessAuction.listSuccessAuctionData = response.data.pageData;
          }
        },(resp) => {
          console.log("竞拍列表失败")
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
    created(){
      this._getBanner();
      this.getData();
      this._getBidListData();
      this._listSuccessAuction();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "bidList.styl"
</style>
