<template>
  <div class="helpDetail-wrapper" ref="helpDetail">
    <h3 class="helpCenter-rightTitle">常见问题>{{info.data.title}}</h3>
    <div class="helpCenter-rightBox">
      <div class="helpRightBox-title">{{info.data.title}}</div>
      <div class="helpRightBox-con" v-html="info.data.content"></div>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingShow"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../../router/index'
  import Loading from '@/components/loading/loading.vue'

  export default {
    components:{
      'v-loading':Loading
    },
    data(){
      return{
        helpDetailId:'',
        loadingShow: false,
        typeNum:'',
        info:{
          url:'/web/info/informationInfo',
          data:[]
        }
      }
    },
    methods:{
      _getHelpData(){
        this.loadingShow=true;
        this.helpDetailId = Router.history.current.query.type;
        this.typeNum = Router.history.current.query.num || '';
          this.$http.get(this.info.url+'?infoid='+this.helpDetailId).then(
            (resp)=>{
              let response = resp.body;
              if(response.code===200){
                this.loadingShow=false;
                this.info.data = response.data;
              }else{
                this.$message.warning(response.msg)
              }
            },(error)=>{
              this.loadingShow=false;
              console.log('调用新闻详情接口错误')
            }
          )
      },
      _watch(){
        this.$watch('typeNum', function (n, o) {
          if(o!==''&&n==''){
            return false;
          }else{
          window.location.reload();
          }
        })
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
    },
    watch:{
      '$route':'_getHelpData'
    },
    created(){
      this._getHelpData();
      this.scrollTop();
      this._watch();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "helpDetail.styl"
</style>
