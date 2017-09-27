<template>
  <div class="finance-wrapper">
    <div class="finance-banner">
      <div class="swiper-wrapper">
        <div class="banner-wrapper">
          <div class="banner-content">
            <div class="banner-box">
              <div class="banner-contentBox">
                <el-carousel height="440px">
                  <el-carousel-item v-for="(item,index) in financeBanner.fetchFinance.banner" :key="index">
                    <span class="background-item" v-lazy:background-image="item.adpicturePath" lazy="loading"></span>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="finance-container">
      <div class="finance-box1"></div>
      <div class="finance-box2"></div>
      <div class="finance-box3"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        financeBanner:{
          url:'/web/adPicture/findAdPictureByFlag',
          data:{
            searchFlag:'financial'
          },
          fetchFinance:[]
        }
      }
    },
    methods:{
      _getFinanceBanner(){
        this.$http.post(this.financeBanner.url,this.financeBanner.data,{emulateJSON:true}).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.financeBanner.fetchFinance = response.data;
          }
        })
      },
    },
    mounted(){
      this._getFinanceBanner();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "finance.styl"
</style>
