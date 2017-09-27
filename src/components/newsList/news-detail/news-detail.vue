<template>
  <div class="newsDetail" ref="newsDetail">
    <div class="news-path">
      <i class="path-item">新闻</i>
      <i class="path-item" @click="_linkBack(newsType)">>{{_getType(newsType)}}></i>
      <i class="path-item">详情页面</i>
    </div>
    <div class="news-detail-context">
      <div class="news-detail-name">
        <span class="name-wrapper">
          {{fetchData.title}}
        </span>
      </div>
      <div class="news-detail-text">
        <p class="news-other-information">
          <span class="source">新闻来源：{{fetchData.source}}</span>
          <span class="createdTime"></span>
        </p>
        <span class="news-detail-describe">
          <span class="content-box" v-html="fetchData.content">
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../../router/index'
  export default {
    data(){
      return{
        newsUrl:'/web/info/informationInfo/',
        fetchData:'',
        newsType:'',
        infoid:''
      }
    },
    methods:{
      _getDetail(){
        this.scrollTop();
        this.newsType = Router.history.current.query.type;
        this.infoid = Router.history.current.query.infoId;
        this.$http.get(this.newsUrl+'?infoid='+this.infoid).then(
          (resp)=>{
            let response = resp.body;
            if(response.code===200){
              this.fetchData = response.data;
            }else{
              this.$message.warning(response.msg)
            }
          },(error)=>{
            console.log('调用新闻详情接口错误')
          }
        )
      },
      _getType(type){
        switch (type){
          case 0:
            return '全部动态';
            break;
          case 1:
            return '最新动态';
            break;
          case 2:
            return '新闻资讯';
            break;
          case 3:
            return '行情分析';
            break;
        }
      },
      _linkBack(type){
        Router.push({path:'/newsItem',query:{type:type}})
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      }
    },
    watch:{
      '$route':'_getDetail'//检测路由变化
    },
    created(){
      this._getDetail();
      this.scrollTop();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "news-detail.styl"
</style>
