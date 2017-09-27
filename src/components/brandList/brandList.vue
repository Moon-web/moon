<template>
  <div class="brandList" ref="brandList">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="brandList-con">
      <div class="brandList-center">
        <div class="path">
          <v-pagePath :path="path"></v-pagePath>
        </div>
        <div class="brand-item">
          <div class="item-con">
            <div class="item-list" v-for="(item,index) in brandList" v-if="index<15">
              <div class="item-logo" @click="_linkNext(item.corporate_id,condition.corporateType)" v-lazy:background-image="item.corporate_logo">
              </div>
              <h3 class="item-name">{{item.corporate_name}}</h3>
              <p class="item-con">
                <span>{{item.corporate_type}}</span>
              </p>
              <div class="detail" @click="_linkNext(item.corporate_id,condition.corporateType)">
                <span class="left"></span>
                <span class="sdetail">
                  查看详情
                </span>
                <span class="right"></span>
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
  import Router from '../../router/index'
  import cMethods from '../../common/common'
  import pagePath from '@/components/pagePath/pagePath.vue'
  import Loading from '@/components/loading/loading.vue'
  let token=cMethods.getCookie("token");
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
            text:'省级馆',
            path:'',
          },
          {
            text:'',
            path:''
          }

        ],
        brandList:[],
        brandListUrl:'/web/corporate/listPageCorporate',
        condition:{
          corporateType:'',
          showCount:15,
          currentPage:'',
          provinceMuseumId:''
        },
        pathName:'',
        page:{
          pageTotal:''
        },
        inputPage:'',
        pageResult:[],
      }
    },
    methods:{
      _getData(){
        this.loadingShow=true;
        this.condition.corporateType=Router.history.current.query.corporateType;
        this.condition.provinceMuseumId = Router.history.current.query.provinceMuseumId
        this.path[this.path.length-2].path='/provincial?provinceMuseumId='+this.condition.provinceMuseumId
        if(this.condition.corporateType==0){
          this.pathName='采购商列表'
          this.path[this.path.length-1].text=this.pathName
        }else{
          this.pathName='供应商列表'
          this.path[this.path.length-1].text=this.pathName
        }
        this.$http.post(this.brandListUrl,this.condition,{emulateJSON:true}).then((resp)=>{
          let response=resp.body;
          if(response.code===200){
            this.loadingShow=false;
            this.brandList=response.data.pageData;
            this.page.pageTotal = response.data.page.totalPage;
            this.condition.currentPage = response.data.page.currentPage;
          }
        },(resp)=>{
          this.loadingShow = false;
          console.log("接口调用失败");
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
      _linkNext(id,pathId){
        Router.push({
          path:'/brandDetail',
          query:{
            corporateId:id,
            corporateType:pathId,
            provinceMuseumId:this.condition.provinceMuseumId
          }
        })
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      }
    },
    created(){
      this._getData();
      this.scrollTop()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "brandList.styl"
</style>
