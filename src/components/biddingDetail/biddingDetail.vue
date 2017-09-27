<template>
  <div class="biddingDetail-content" ref="biddingDetail">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="biddingDetail-conter">
      <h3 class="biddingDetail-title">
        <v-pagePath :path="path"></v-pagePath>
      </h3>
      <div class="detail-con">
        <div class="detail-left">
          <h3 class="con-title">
            <span class="title">{{biddingDetail.fetchData.title}}</span>
            <div class="source-con">
              <span class="source-title">{{biddingDetail.fetchData.updatetime}}</span>
              <span class="source">来源：{{biddingDetail.fetchData.source}}</span>
            </div>
          </h3>
          <div class="detail" v-html="biddingDetail.fetchData.content"></div>
        </div>
        <div class="detail-right">
          <div class="title">
            <h3 class="right-title">最新招标信息</h3>
          </div>
          <ul class="item">
            <li class="list-item" v-for="(item,index) in wlbindding.fetchData" v-if="index<10" @click="linkDetail(item.infoid)">{{item.title}}</li>
          </ul>
          <div class="right-bg"></div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Nav from '@/components/nav/nav.vue'
  import Footer from '@/components/footer/footer.vue'
  import Router from '../../router/index.js'
  import pagePath from '@/components/pagePath/pagePath.vue'

  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer,
      'v-pagePath':pagePath
    },
    data(){
      return{
        biddingDetail:{
          url:'/web/info/informationInfo',
          fetchData:'',
          newsType:'',
          infoid:''
        },
        wlbindding:{
          url:'/web/info/getInfoList',
          fetchData:[],
          data:{
            firstInfoTypeId:1,
            secondInfoTypeId:26
          }
        },
        wlbinddingData:[],
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
            text:'物流资讯',
            path:'/wlbidding'
          },
          {
            text:'',
            path:''
          }
        ],
      }
    },
    methods:{
      _getData(){
        this.scrollTop()
        this.biddingDetail.infoid=Router.history.current.query.infoid;
        this.$http.get(this.biddingDetail.url+'?infoid='+this.biddingDetail.infoid).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.biddingDetail.fetchData=response.data;
            this.path[this.path.length-1].text=this.biddingDetail.fetchData.title
          }
        },(resp)=>{
          console.log("接口调用失败")
        })
      },
      _getlistBidding(){
        {
          this.$http.post(this.wlbindding.url, this.wlbindding.data, {emulateJSON: true}).then((resp) => {
            let response = resp.body;
            if (response.code === 200) {
              this.wlbindding.fetchData = response.data.infolist;
            }
          }, (resp) => {
            let response = resp.body;
            console.log(response.msg)
          })
        }
      },
      linkDetail(id){
        Router.push({path:'/biddingDetail',
          query:{infoid:id}
        });
        this.scrollTop()
        this._getData();
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
    },
    created(){
      this._getData()
      this._getlistBidding()
      this.scrollTop()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "biddingDetail.styl"
</style>
