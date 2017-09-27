<template>
  <div class="search-result" ref="searchResult">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="center-wrapper">
      <div class="search-filter">
        <div class="search-filterTop">
          <div class="search-filterTopHot">
            <div class="search-filterTopHotLeft">分类：</div>
            <div class="search-filterTopHotRight">
              <ul class="search-filterList">
                <li class="search-filterList-item"
                    :class="firstTbag == -1?'search-filterList-item-active':''"
                    @click="_getSearchData(-1)">全部</li>
                <li class="search-filterList-item"
                    :class="item.productcategoryId == goodsData.First?'search-filterList-item-active':''"
                    v-for="(item,index) in goodsData.kindData"
                    @click="_getKinds(index,item.productcategoryId,1)">{{item.productcategoryName}}</li>
              </ul>
            </div>
          </div>
          <div class="search-filterTopHot">
            <div class="search-filterTopHotLeft">小分类：</div>
            <div class="search-filterTopHotRight">
              <ul class="search-filterList">
                <li class="search-filterList-item"
                    :class="secondTbag == -2?'search-filterList-item-active':''"
                    @click="_getSearchData(-2)">全部</li>
                <li class="search-filterList-item"
                    :class="item.productcategoryId == secondTbag?'search-filterList-item-active':''"
                    v-for="item in goodsData.nextKindData" @click="getSecondSearchData(item.productcategoryId)">{{item.productcategoryName}}</li>
              </ul>
            </div>
          </div>
          <div class="search-filterTopPrice">
            <div class="search-filterTopPriceLeft">价格：</div>
            <div class="search-filterTopPriceRight">
              <ul class="search-filterList">
                <li class="search-filterList-item" v-for="(item,index) in searchFiterPrice" @click="getSearchData(index)">{{item}}</li>
              </ul>
            </div>
          </div>
          <div class="search-filterTopPrice search-provincial">
            <div class="search-filterTopPriceLeft">产地：</div>
            <div class="search-filterTopPriceRight">
              <ul class="search-filterList">
                <li class="search-filterList-item"
                    :class="provinceMuseumId == -3?'search-filterList-item-active':''"
                    @click="_getSearchData(-3)">全部</li>
                <li class="search-filterList-item"
                    v-for="item in champion.championDate"
                    :class="item.provinceMuseumId == provinceMuseumId?'search-filterList-item-active':''"
                    @click="_getProvincialData(item.provinceMuseumId)">{{item.provinceMuseumName}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="search-filterBottom">
        <span class="tag">综合</span>
        <div class="search-button">
          <span class="search-item"
                @click="_getInventory"
                :class="condition.inventorynum===0||''?'unActive':'active'">销量</span>
          <span class="search-item"
                @click="_getPrice"
                :class="condition.priceup===0||''?'unActive':'active'">价格</span>
        </div>
        <div class="search-input">
          <span class="input-item">
            <input v-model="condition.pricelow" class="entry" type="text" placeholder="最低价">
          </span>
          <i class="place">-</i>
          <span class="input-item">
            <input v-model="condition.pricehigh" class="entry" type="text" placeholder="最高价">
          </span>
        </div>
        <span class="search-confirm" @click="_getData">
          确定
        </span>
        <div class="serach-ImgStyle" v-if="false">
          <span class="serach-bigImg" :class="searchBigImg===true?'search-BigImgS':''" @click="searchBigImg=true">大图</span>
          <span class="search-ImgList" :class="searchBigImg===false?'search-ImgLists':''" @click="searchBigImg=false">列表</span>
        </div>
      </div>
      </div>
      <div class="result-content">
        <ul class="result-box" v-show="searchBigImg===true">
          <li class="result-item" v-for="item in result">
            <div class="picture" v-lazy:background-image="item.mainproductimgpath"  @click="_linkDetail(item.productId)">
            </div>
            <div class="context">
              <div class="context-top">
                <div class="price">{{item.price}}</div>
                <div class="describe">
                  <span class="advantage">
                    {{item.productName}}
                  </span>
                  <span class="company">
                    <i class="text">{{item.corproateName}}</i>
                  </span>
                </div>
              </div>
              <div class="context-bot">
                <span class="now-buy" @click="_buyOrder">立即下单</span>
                <span class="monthVolume">
                  交易量：<i class="num">{{item.orderAmout}}</i>
                </span>
              </div>
            </div>
            <span class="border-wrapper">
              <v-border></v-border>
            </span>
          </li>
        </ul>
        <ul class="result-box result-boxOther" v-show="searchBigImg===false">
          <li class="result-boxList" v-for="(item,index) in result" :class="index===0?'result-boxListTopNone':''">
            <div class="result-boxListLeft" @click="_linkDetail(item.productId)">
              <span class="result-boxListLeftImg" v-lazy:background-image="item.mainproductimgpath"></span>
            </div>
            <div class="result-boxListRight">
              <div class="result-boxListPrice">
                <span class="result-boxList-DetailPrice">¥{{item.price}}</span>
                <span class="esult-boxList-monthVolume">交易量：{{item.orderAmout}}笔</span>
              </div>
              <p class="esult-boxList-productName">{{item.corproateName}}</p>
              <div class="esult-boxList-btn" @click="_linkDetail(item.productId)">查看详情</div>
            </div>
          </li>
        </ul>
        <v-nothing :show="nothingShow"></v-nothing>
      </div>
      <div class="page-wrapper"  v-show="!nothingShow">
        <div class="page-content">
          <span class="changePage"
                @click="_returnPage(-1)"
                :class="condition.currentPage<=1?'end':''">上一页</span>
          <span class="pageFlag">
          {{condition.currentPage}}/{{condition.pageTotal}}页
        </span>
          <span class="changePage"
                @click="_returnPage(1)"
                :class="condition.currentPage>=condition.pageTotal?'end':''">下一页</span>
          <span class="linkPage">
          <i class="entry-wrapper">
            <input v-model="inputPage" type="number" class="entry" placeholder="页数" @keyup.enter="_confirmPage">
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
    <div class="replaceOrder-wrapper">
      <v-replace  :state="isShow" :close="closeMark"></v-replace>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  import Event from '../../common/emit'
  import Nothing from '@/components/nothing/nothing.vue'
  import Head from '@/components/head/head.vue'
  import Footer from '@/components/footer/footer.vue'
  import Nav from '@/components/nav/nav.vue'
  import Border from '@/components/border/border.vue'
  import Loading from '@/components/loading/loading.vue'
  import replaceOrder from '@/components/replaceOrder/replaceOrder.vue'

  export default {
    components:{
      'v-nothing':Nothing,
      'v-head':Head,
      'v-footer':Footer,
      'v-nav':Nav,
      'v-border':Border,
      'v-loading':Loading,
      'v-replace':replaceOrder
    },
    data(){
      return{
        searchBigImg:true,
        isShow:false,
        firstTbag:-1,
        secondTbag:-1,
        provinceMuseumId:0,
        goodsData: {
          url: '/web/productcategorys/findFourFirstCategory',
          kindData:[],
          nextKindData:[],
          First:'',
        },
        champion: {
          url: '/web/provinceMuseum/listProvinceMuseum',
          championDate: [],
          provinceMuseumId:''
        },
        searchFiterPrice:[
          '0-100',
          '101-200',
          '201-300',
          '301-400',
          '401-500',
          '500以上'
        ],
        loadingShow:false,
        url:'/web/productcategorys/getProcutlist',
        result:[],
        condition:{
          productcategoryid:'',
          productName:'',
          pricelow:'',
          pricehigh:'',
          inventorynum:'',
          priceup:'',
          pageTotal:'',
          showCount:15,
          currentPage:'',
          productcategorySecondid:'',
          provinceMuseumId:'',
          firstProductcategoryId:''
        },
        inputPage:'',
        pageResult:[],
        filterHotData:[],
        nothingShow:false
      }
    },
    methods:{
      _buyOrder(){
        this.isShow = true;
      },
      closeMark(){
        this.isShow = false
      },
      _getChampionDate(){
        this.$http.get(this.champion.url).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.champion.championDate=response.data.provinceMuseums;
          }
        },(resp) => {
          console.log("省级馆列表接口调用失败")
        })
      },
      _getData(){
        this.loadingShow = true;
        let type = Router.history.current.query.productName;
        let id = Router.history.current.query.productcategoryid;
        let secondId = Router.history.current.query.productcategorySecondid;
        let provinceMuseumId  = Router.history.current.query.provinceMuseumId;
        let firstId = Router.history.current.query.firstProductcategoryId
        if(type!==undefined&&type!==''){
          this.condition.productName = decodeURI(type);
        }else{
          this.condition.productName = '';
        }
        if(id!==undefined&&id!==''){
          this.condition.productcategoryid = id;
        }else{
          this.condition.productcategoryid = '';
        }
        if(secondId!==undefined&&secondId!==''){
          this.condition.productcategorySecondid = secondId;
        }else{
          this.condition.productcategorySecondid = '';
        }
        if(provinceMuseumId!==undefined&&provinceMuseumId!==''){
          this.condition.provinceMuseumId = provinceMuseumId;
        }else{
          this.condition.provinceMuseumId = '';
        }
        if(firstId!==undefined&&firstId!==''){
          this.condition.firstProductcategoryId = firstId;
        }else{
          this.condition.firstProductcategoryId = '';
        }
        this.$http.post(this.url,this.condition,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.result = response.data.pageData;
            if(response.data.pageData.length<1){
              this.nothingShow = true;
            }else{
              this.nothingShow = false;
            }
            this.condition.pageTotal = response.data.page.totalPage;
            this.condition.currentPage = response.data.page.currentPage;
            this.filterHotData=response.data.thirdProductCategories;
          }else{
            this.$message.warning(response.msg)
          }
          this.loadingShow = false;
        },(resp)=>{
          console.log('调用接口失败');
          this.loadingShow = false;
        })
      },
      _getKinds(num,id,btag){
        this.provinceMuseumId = 0;
        this.$http.get(this.goodsData.url).then((resp) => {
          let response = resp.body;
          this.goodsData.bTag = true;
          if(response.code === 200){
            this.goodsData.kindData = response.data.productCategories;
            this.goodsData.nextKindData = response.data.productCategories[num].childProductcategory;
            if(btag === 1)  {
              this.firstTbag = -2;
              this.secondTbag = -2;
              this.goodsData.First = response.data.productCategories[num].productcategoryId;
            }
          }
        },(resp) => {
          alert("分类接口调用失败！")
        });
        Router.push({path:'/search',query:{firstProductcategoryId:id}})
      },
      getSecondSearchData(id){
        //this.firstTbag = -2;
        this.provinceMuseumId = -2;
        this.secondTbag = id;
        Router.push('/search?productcategorySecondid='+id);
      },
      _getInventory(){
        if(this.condition.inventorynum===0){
          this.condition.inventorynum = 1;
        }else{
          this.condition.inventorynum = 0
        }
        this.condition.priceup = '';
        this.condition.pricelow='';
        this.condition.pricehigh='';
        this._getData();
      },
      _getPrice(){
        if(this.condition.priceup===0){
          this.condition.priceup = 1;
        }else{
          this.condition.priceup = 0
        }
        this.condition.inventorynum = '';
        this.condition.pricelow='';
        this.condition.pricehigh='';
        this._getData();
      },
      _returnPage(crease){
        if(crease===1&&this.condition.currentPage===this.condition.pageTotal){
          return false
        }else if(crease===-1&&this.condition.currentPage===1){
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
      _linkDetail(id){
        Router.push({path:'/productDetail',query:{productId:id}})
      },
      getSearchData(num){
        if(num===0){
          this.condition.pricelow=0;
          this.condition.pricehigh=100;
        }
        if(num===1){
          this.condition.pricelow=101;
          this.condition.pricehigh=200;
        }
        if(num===2){
          this.condition.pricelow=201;
          this.condition.pricehigh=300;
        }
        if(num===3){
          this.condition.pricelow=301;
          this.condition.pricehigh=400;
        }
        if(num===4){
          this.condition.pricelow=401;
          this.condition.pricehigh=500;
        }
        if(num===5){
          this.condition.pricelow=501;
          this.condition.pricehigh=100000;
        }
        this._getData();
      },
      getHotSearchData(name){
        this.condition.productName=name;
        Router.push('/search?productName='+name);
      },
      scrollTop(){
        this.$nextTick(()=>{
          this.$root.$el.offsetParent.scrollTop = 0;
        })
      },
      _getProvincialData(num){
        this.provinceMuseumId = num;
        this.firstTbag = -2;
        this.secondTbag = -3;
        this.goodsData.First = 0
        Router.push({path:'/search',query:{provinceMuseumId:num}})
      },
      _getSearchData(num){
        this.condition.pricelow = '';
        this.condition.pricehigh = '';
        if(num===-1){
          this.firstTbag = -1;
          this.goodsData.First = 0;
          this.secondTbag = -1;
          this.provinceMuseumId = -1;
          Router.push({path:'/search',query:{productName:''}})
        }
        if(num===-2){
          this.secondTbag = -2;
          this.provinceMuseumId = -2;
          Router.push({path:'/search',query:{firstProductcategoryId:this.goodsData.First}})
        }
        if(num===-3){
          this.firstTbag = -3;
          this.secondTbag = -3;
          this.provinceMuseumId = -3;
          Router.push({path:'/search',query:{productName:''}})
        }
      }
    },
    watch:{
      '$route':'_getData'
    },
    created(){
      this._getData();
      this.scrollTop();
      this._getChampionDate();
      this._getKinds(0);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "searchResult.styl"
</style>
