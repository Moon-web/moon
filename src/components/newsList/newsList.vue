<template>
  <div class="news-parent">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="news-list">
      <div class="news-list-center">
        <div class="news-nav">
          <div class="nav-box">
            <ul class="nav-item-wrapper">
              <li class="nav-item"
                  v-for="(item,index) in navItem"
                  :class="hookFlag===index?'active':''"
                  @click="_chooseNav(index,item.infotypeid)">{{item.infotypename}}</li>
            </ul>
          </div>
          <div class="UpToData-news">
            <span class="title">最新动态</span>
            <div class="upToData-wrapper">
              <div class="first-upToData"
                   v-for="(item,index) in upToData.fetchData"
                   v-if="index<1"
                   @click="_linkDetail(0,item.infoid)">
                <span class="picture" v-lazy:background-image="item.infosimgpath">
                  <!--<img  width="100%">-->
                </span>
                <span class="name">{{item.title}}</span>
              </div>
              <ul class="other-upToData">
                <li class="other-upToData-item"
                    v-for="(item,index) in upToData.fetchData"
                    v-if="index>0&&index<6"
                    @click="_linkDetail(0,item.infoid)">{{item.title}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="news-content">
          <router-view></router-view>
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
  import Footer from '@/components/footer/footer.vue'
  import Nav from '@/components/nav/nav.vue'
  import Router from '../../router/index'
  export default {
    components:{
      'v-head':Head,
      'v-footer':Footer,
      'v-nav':Nav
    },
    data(){
      return{
        navItem:[],
        hookFlag:0,
        upToData:{//获取专题报道
          url:'/web/info/findList',
          fetchData:[]
        },
        itemData:{//获取新闻分类
          url:'/web/info/findSecondTypeList',
          fetchData:[]
        }
      }
    },
    methods:{
      _chooseNav(index,type){
        this.hookFlag = index;
        Router.push({path:'/newsItem',query:{type:type}});
        this.itemData.type = type;
        this._getItemData();
      },
      _getUpToData(){//获取最新动态
        let data={
          datas:{
            firstInfoTypeId:1,
            secondInfoTypeId:'',
            pageNo: 1,
            pageSize:6
          }
        };
        this.$http.post(this.upToData.url,data).then(
          (resp)=>{
            let response = resp.body;
            if(response.success===true){
              this.upToData.fetchData = response.datas.list;
            }
          },(error)=>{
            console.log('调用新闻接口错误')
          }
        )
      },
      _getItemData(){

        let data = {
          datas:{
            firstInfoTypeId:1,
          }
        };
        let seeAll = {
          infotypeid: '',
          infotypename: "全部新闻",
          subInfoType: null,
          infos:""
        };
        this.$http.post(this.itemData.url,data).then(
          (resp)=>{
            let response = resp.body;
            if(response.success===true){
              this.navItem = response.datas.list;
              this.navItem.unshift(seeAll);
            }
          },(error)=>{
            console.log('调用新闻接口错误')
          }
        )
      },
      _linkDetail(type,id){
        Router.push({path:'/newsDetail',query:{
          type:type,
          infoId:id
        }})
      }
    },
    created(){
      this._getUpToData();
      this._getItemData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "newsList.styl"
</style>
