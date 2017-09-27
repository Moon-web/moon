<template>
  <div class="newsItemWrapper">
    <div class="news-header">
      <div class="news-banner">
        <el-carousel trigger="click" height="322px" :interval='5000' indicator-position="none">
          <el-carousel-item v-for="(item,index) in newsBanner.fetchData.banner" :key="index">
            <span class="background-item" v-lazy:background-image="item.adpicturePath" lazy="loading">
              <p class="advertisement-name">{{item.adpictureName}}</p>
            </span>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="news-item-content">
      <ul class="item-content-ul">
        <li class="news-item-list" v-for="(item,index) in newsData.fetchData" @click="_linkDetail(newsData.type,item.infoid)"><!-- v-if="index>2" -->
          <div class="news-picture">
            <span class="news-img" v-lazy:background-image="item.infosimgpath"></span>
            <i class="news-type">{{item.infotypename}}</i>
          </div>
          <div class="news-context">
            <p class="news-title">{{item.title}}</p>
            <span class="news-describe">{{limitText(item.resume,0,90)}}</span>
            <p class="news-other-information">
              <span class="source">新闻来源：<i class="tag">{{item.source||'众农联'}}</i></span>
              <span class="createdTime">{{item.createtime}}</span>
            </p>
          </div>
        </li>
      </ul>
      <div class="loadMore-wrapper" @click="_loadMore">
        <v-load :state="loadMoreData.state" :end="loadMoreData.end"></v-load>
      </div>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingShow"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../../router/index'
  import Loading from '@/components/loading/loading.vue'
  import LoadMore from '@/components/loadMore/loadMore.vue'

  export default {
    components:{
      'v-loading':Loading,
      'v-load':LoadMore
    },
    data(){
      return{
        loadingShow:false,
        newsData:{
          url:'/web/info/findList',
          fetchData:[],
          data:{
            datas:{
              firstInfoTypeId:1,
              secondInfoTypeId:'',
              pageNo:1,
              pageSize:10
            }
          }
        },
        newsBanner:{
          url:'/web/adPicture/findAdPictureByFlag',
          fetchData:[],
          data:{
            searchFlag:'info'
          }
        },
        loadMoreData:{
          state:false,
          end:false
        }
      }
    },
    methods:{
      _getNewsData(){
        this.$root.$el.offsetParent.scrollTop = 0;
        this.loadingShow = true;
        this.loadMoreData.end = false;
        this.loadMoreData.state = false;
        this.newsData.fetchData = [];
        this.newsData.data.datas.secondInfoTypeId = Router.history.current.query.type;
        this.newsData.data.datas.pageNo = 1;
        this.$http.post(this.newsData.url,this.newsData.data).then(
          (resp)=>{
            let response = resp.body;
            if(response.success===true){
              this.newsData.fetchData = response.datas.list;
            }
            this.loadingShow = false;
          },(error)=>{
            console.log('调用新闻接口错误');
            this.loadingShow = false;
          }
        )
      },
      _loadMore(){
        this.loadingShow = true;
        this.newsData.data.datas.pageNo++;
        this.loadMoreData.state = true;
        this.$http.post(this.newsData.url,this.newsData.data).then((resp)=> {
          let response = resp.body;
          if (this.newsData.data.datas.pageNo > response.datas.page.pageCount) {
            this.loadMoreData.end = true;
            this.loadMoreData.state = false;
            this.loadingShow = false;
            return
          }
          if (response.datas.page.pageCount > 0) {
            this.newsData.fetchData.push(...response.datas.list);
            this.$nextTick(()=> {
              this.loadingShow = false;
              this.loadMoreData.state = false;
            })
          }
        })
      },
      _linkDetail(type,id){
        Router.push({path:'/newsDetail',query:{
          type:type,
          infoId:id
        }})
      },
      limitText:function (val,start,end) {
        let text = '';
        if(val.length>end){
          text = val.substring(start,end)+'...'
        }else{
          text = val;
        }
        return text;
      },
      _getNewsBanner(){
        this.$http.post(this.newsBanner.url,this.newsBanner.data,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.newsBanner.fetchData = response.data;
          }else{
            this.$message.warning(response.msg);
          }
        })
      }
    },
    watch:{
      '$route':'_getNewsData'
    },
    created(){
      this._getNewsData();
      this._getNewsBanner();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "news-item.styl"
</style>
