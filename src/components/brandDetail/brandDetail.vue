<template>
  <div class="brabdDetail-content" ref="brandDetail">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="brabdDetail-center">
      <div class="brandDetail-con">
        <div class="path">
          <v-pagePath :path="path"></v-pagePath>
        </div>
        <div class="compony">
          <!--<div class="compony-topIng" v-for="(item,index) in brandBanner.fetchBrand.advertisement" v-lazy:background-image="item.adpicturePath" v-if="item.adpictureName=='品牌榜单企业详情'"></div>-->
          <div class="compony-bottom">
            <div class="box">
            <div class="compony-bottom-left">
              <div class="commony-img" v-lazy:background-image="brandDetail.corporateLogo"></div>
            </div>
            <div class="compony-bottom-right">
              <div class="compony-bottomR-top">
                <div class="commony-name">
                  <h3 class="title">{{brandDetail.corporateName}}</h3>
                  <p class="statu">
                    <span class="type">公司性质：<i class="type-con">{{brandDetail.corporateType}}</i></span>
                    <span class="address">所在地区：<i class="type-con">{{brandDetail.address||brandDetail.detailAddress}}</i></span>
                  </p>
                </div>
                <div class="collect" @click="_collect">
                  <span class="btn-collectBg" :class="bTag?'':'canclecollect'"></span>
                  <span class="btn-collect">{{colloect}}</span>
                </div>
              </div>
            </div>
            </div>
            <div class="componybottomR-botoom">
              <div class="compony-con">
                <h3 class="introduce">
                  <span class="introduce-item">公司介绍</span>
                </h3>
                <div class="compony-content">
                  <div class="compony-introduceCon">
                    <div class="con-introduce" v-html="detailMore"></div>
                    <div class="lookMore">
                      <div class="more" @click="_more">{{statue}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="compony-product" v-if="detailProduct.length>0">
          <h3 class="product-title">
            <span class="leftBg"></span>
            <span class="cname">企业产品</span>
            <span class="ename">ENTERPRISE PRODUCTS</span>
            <span class="rightBg"></span>
          </h3>
          <div class="product-con">
            <div class="product-item" v-for="(item,index) in detailProduct" v-if="index<10">
              <div class="item-img" @click="_productDetail(item.productId)">
                <span class="pro-img" v-lazy:background-image="item.mainproductImgpath"></span>
              </div>
              <div class="price-content">
                <p class="content">{{item.productName}}</p>
              </div>
              <div class="order">
                <span class="orderPrice-con">￥<i class="order-price">{{item.price}}</i></span>
                <span class="successNum">库存{{item.inventoryNum}}件</span>
              </div>
            </div>
          </div>
          <div class="page-wrapper">
            <div class="page-content">
              <span class="changePage"
                    @click="_returnPage(-1)"
                    :class="detailCondation.currentPage<=1?'end':''">上一页</span>
              <span class="pageFlag">
                {{detailCondation.currentPage}}/{{condition.pageTotal}}页
              </span>
              <span class="changePage"
                    @click="_returnPage(1)"
                    :class="detailCondation.currentPage>=condition.pageTotal?'end':''">下一页</span>
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
  import cMethods from '../../common/common.js'
  import pagePath from '@/components/pagePath/pagePath.vue'
  import Loading from '@/components/loading/loading.vue'
  export default{
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-footer':Footer,
      'v-pagePath':pagePath,
      'v-loading':Loading,
    },
    data(){
      return{
        introduceTag:0,
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
          },
          {
            text:'',
            path:''
          }
        ],
        token:'',
        brandBanner:{
          url:'/web/adPicture/findAdPictureByFlag',
          data:{
            searchFlag:'brand'
          },
          fetchBrand:[]
        },
        brandDetail:[],
        detailProduct:[],
        brandDetailUrl:'/web/corporate/findCorporateById',
        detailProductUrl:'/web/product/listProductsByCorporateId',
        collectUrl:'/web/collect/collect',
        cancleCollectUrl:'/web/collect/cancleCollect',
        isCollectUrl:'/web/collect/isCollect',
        detailCondation:{
          corporateId:'',
          showCount:'',
          currentPage:''
        },
        condition:{
          pageTotal:''
        },
        pathName:'',
        inputPage:'',
        pageResult:[],
        bTag:true,
        detailMore:'',
        statue:'查看全部>',
        colloect:'企业收藏',
        tag:true,
        cityData:{}
      }
    },
    methods:{
      //banner
      _getBrandBanner(){
        this.$http.post(this.brandBanner.url,this.brandBanner.data,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.brandBanner.fetchBrand = response.data;
          }
        })
      },
      _getData(){
        let corporateType=Router.history.current.query.corporateType;
        let provinceMuseumId = Router.history.current.query.provinceMuseumId;
        this.scrollTop();
        this.loadingShow = true;
        this.detailCondation.corporateId=Router.history.current.query.corporateId;
        if(corporateType==0){
          this.pathName='采购商列表'
          this.path[this.path.length-2].text=this.pathName
          this.path[this.path.length-2].path='/brandList?corporateType=0'
        }else{
          this.path[this.path.length-3].path='/provincial?provinceMuseumId='+provinceMuseumId
          this.pathName='供应商列表';
          this.path[this.path.length-2].text=this.pathName;
          this.path[this.path.length-2].path='/brandList?corporateType=1&&provinceMuseumId='+provinceMuseumId
          this.$http.post(this.detailProductUrl,this.detailCondation,{emulateJSON:true}).then((resp)=>{
            let response=resp.body;
            if(response.code===200){
              this.detailProduct=response.data.pageData;
              this.condition.pageTotal = response.data.page.totalPage;
              this.detailCondation.currentPage = response.data.page.currentPage;
            }
          },(resp)=>{
            console.log("获取产品列表失败")
          })
        }
        this.$http.post(this.brandDetailUrl,{corporateId:this.detailCondation.corporateId},{emulateJSON:true}).then((resp)=>{
          let response=resp.body
          if(response.code===200){
            this.loadingShow = false;
            this.brandDetail=response.data;
            this.path[this.path.length-1].text=this.brandDetail.corporateName;
            if(this.brandDetail.desc==null){
              this.detailMore='暂无介绍'
              this.statue=""
            }else if(this.brandDetail.desc.length<320){
              this.detailMore=this.brandDetail.desc;
              this.statue=""
            }else {
              this.detailMore = this.brandDetail.desc.substring(0, 320) + "．．．．．．";
            }
          }
        },(resp)=>{
          this.loadingShow = false;
          console.log("接口调用失败")
        })
      },
      _isCollect(){
        this.token=cMethods.getCookie("token");
        if(this.token) {
          this.$http.post(this.isCollectUrl, {corporateIds: this.detailCondation.corporateId}, {
            emulateJSON: true,
            headers: {token: this.token}
          }).then((resp) => {
            let response = resp.body;
            if (response.code == 200) {
              if (response.data[0] == 1) {
                this.bTag = false;
                this.colloect = "已收藏"
              }
            }
          }, (resp) => {
            console.log("调用收藏接口失败！")
          })
        }else{
          return false;
        }
      },
      _productDetail(id){
          Router.push({path:'/productDetail',query:{productId:id}})
      },
      _returnPage(crease){
        if(this.detailCondation.currentPage>=this.condition.pageTotal&&this.detailCondation.currentPage<=1){
          return false
        }
        if(this.detailCondation.currentPage<=1&&this.detailCondation.currentPage>=this.condition.pageTotal){
          return false
        }
        this.detailCondation.currentPage+=crease;
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
      _collect(){
        this.token=cMethods.getCookie("token");
        this.detailCondation.corporateId=Router.history.current.query.corporateId;
        if(this.token){
          if(this.bTag){
            this.$http.post(this.collectUrl,{corporateId:this.detailCondation.corporateId},
              {
                emulateJSON:true,
                headers:{token:this.token}
              }).then((resp)=>{
              let response=resp.body;
              if(response.code===200){
                this.bTag=false;
                this.$message.success("收藏成功");
                this.colloect="已收藏"
              }else if(response.code===409||response.code===410){
                this.$message.error("登录已过期，请重新登录");
                Router.push({path:'/login',query:{typeId:1}})
              }
            },(resp)=>{
              this.$message.error("收藏失败");
              this.colloect="企业收藏"
            })
          }else{
            this.$http.post(this.cancleCollectUrl,{corporateId:this.detailCondation.corporateId},
              {
                emulateJSON:true,
                headers:{token:this.token}
              }).then((resp)=>{
              let response=resp.body;
              if(response.code===200){
                this.bTag=true;
                this.$message.success("取消收藏成功");
                this.colloect="企业收藏"
              }else if(response.code===409){
                this.$message.error("登录已过期，请重新登录");
                Router.push({path:'/login',query:{typeId:1}})
              }
            },(resp)=>{
              this.$message.error("取消收藏失败")
            })
          }
        }else{
          this.$message.warning("请登录后，再收藏企业");
          Router.push({path:'/login',query:{typeId:1}})
        }
      },
      _more(){
        if(this.tag){
          this.tag=false;
          this.detailMore=this.brandDetail.desc;
          this.statue="收起>";
        }else{
          this.tag=true;
          this.detailMore=this.brandDetail.desc.substring(0,320)+"．．．．．．";
          this.statue="查看全部>";
        }
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
    },
    created(){
      this._getData();
      this._isCollect();
      this.scrollTop();
      this._getBrandBanner();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "brandDetail.styl"
</style>
