<template>
<div class="findCar-wrapper" ref="findCar">
  <div class="head-wrapper">
    <v-head></v-head>
  </div>
  <div class="nav-wrapper">
    <v-nav></v-nav>
  </div>
  <div class="findCar-content">
    <div class="findCar-title">
      <h3 class="title">
        <v-pagePath :path="path"></v-pagePath>
      </h3>
    </div>
    <div class="find">
      <div class="address">
        <p>运输路线
          <input type="text" class="begin" v-model="condition.routebegin"/>一
          <input type="text" class="end" v-model="condition.routeend"/></p>
      </div>
      <div class="dateTime">
        <div class="block">
          <span class="demonstration">预计发车时间</span>
            <el-date-picker
              v-model="time"
              type="date"
              placeholder="选择日期时间"
              :picker-options="pickerOptions0">
            </el-date-picker>
        </div>
      </div>
      <div class="num">
        <p>可承载重量
          <input type="text" class="limit" v-model="condition.limitedweight"/>一
          <input type="text" class="max" v-model="condition.limitedweight1"/></p>
      </div>
      <div class="button">
        <button class="button-search" @click="_getData">搜索</button>
      </div>
    </div>
    <div class="carCenter">
      <div class="findCar">
        <div class="carBox" v-for="item in carData">
          <h3 class="title">
            <span class="start">{{item.route_begin}}</span>
            <span class="bg"></span>
            <span class="end">{{item.route_end}}</span>
          </h3>
          <p class="goodsW">可承载货物重量：<em class="goodsNum">{{item.limited_weight}}吨</em></p>
          <p class="beginTime">预计发车时间：{{item.departure_time}}</p>
          <p class="explain">说明：{{item.platform_memo}}</p>
          <div class="useCar"><button>我要用车</button></div>
        </div>
      </div>
    </div>
    <div class="page-wrapper">
      <div class="page-content">
              <span class="changePage"
                    @click="_returnPage(-1)"
                    :class="condition.currentPage<=1?'end':''">上一页</span>
        <span class="pageFlag">
                {{condition.currentPage}}/{{page.pageTotal}}页
              </span>
        <span class="changePage"
              @click="_returnPage(1)"
              :class="condition.currentPage>=page.pageTotal?'end':''">下一页</span>
        <span class="linkPage">
                <i class="entry-wrapper">
                  <input v-model="inputPage" type="number" class="entry" placeholder="页数">
                </i>
                <i class="tag">页</i>
                <i class="confirm" @click="_confirmPage">确定</i>
              </span>
      </div>
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
  import pagePath from '@/components/pagePath/pagePath.vue'
  import Loading from '@/components/loading/loading.vue'

  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer,
      'v-pagePath':pagePath,
      'v-loading':Loading
    },
    data(){
      return{
        loadingShow:false,
        path:[
          {
            text:'首页',
            path:'/index'
          },
          {
            text:'物流中心',
            path:'/logistics',
          },
          {
            text:'找车运',
            path:''
          }
        ],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        findCarUrl:'/web/carinfo/carlist',
        condition:{
          routebegin:'',
          routeend:'',
          departuretime:'',
          limitedweight:'',
          limitedweight1:'',
          showCount:9,
          currentPage:''
        },
        time:'',
        carData:[],
        page:{
          pageTotal:''
        },
        inputPage:'',
      }
    },
    methods:{
      _getData(){
        this.loadingShow=true;
        if(this.time===''||this.time===undefined){
          this.condition.departuretime='';
        }else {
          let years = this.time.getFullYear();
          let months = this._checkTime(this.time.getMonth() + 1);
          let days = this._checkTime(this.time.getDate());
          let time = years + "-" + months + "-" + days;
          this.condition.departuretime = time;
        }
        this.$http.post(this.findCarUrl,this.condition,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.loadingShow=false;
            this.carData=response.data.pagedate;
            this.condition.currentPage=response.data.page.currentPage;
            this.page.pageTotal=response.data.page.totalPage;
          }
        },(resp)=>{
          this.loadingShow=false;
          console.log('调用接口失败')
        })
      },
      _checkTime(i){
        if (i < 10) {
          i = '0' + i;
        }
        return i
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
      _returnPage(crease){
        if(this.condition.currentPage>=this.page.pageTotal&&this.condition.currentPage<=1){
          return false
        }
        if(this.condition.currentPage<=1&&this.condition.currentPage>=this.page.pageTotal){
          return false
        }
        this.condition.currentPage+=crease;
        this._getData();
      },
      _confirmPage(){
        if(this.inputPage>this.condition.pageTotal){
          return false;
        }
        if(this.inputPage<1){
          return false;
        }
        this.condition.currentPage = this.inputPage;
        this._getData();
      },
    },
    created(){
      this._getData();
      this.scrollTop();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "findCar.styl"
</style>
