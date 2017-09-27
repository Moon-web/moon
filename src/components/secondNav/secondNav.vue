<template>
  <div class="secondNav-wrapper">
    <div class="secondNav-container">
      <ul class="secondNav-box">
        <li class="secontNav-item"
            @click="_choiceProvinceMuseum(index,item.provinceMuseumId,item.provinceMuseumName)"
            v-for="(item,index) in ProvinceMuseumData.ProvinceMuseum">
          <span class="item" :class="ProvinceMuseumData.activeIndex===index?'active':''">{{item.provinceMuseumName}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  export default{
    data(){
      return{
        ProvinceMuseumData:{
          url:'/web/provinceMuseum/listProvinceMuseum',
          ProvinceMuseum:[],
          activeIndex:0
        }
      }
    },
    methods:{
      _getProvinceMuseum(){
        this.$http.get(this.ProvinceMuseumData.url).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.ProvinceMuseumData.ProvinceMuseum = response.data.provinceMuseums;
          }
        },(resp) => {
          alert("省级馆接口调用失败")
        })
      },
      _choiceProvinceMuseum(index,id,province){
        this.ProvinceMuseumData.activeIndex = index;
        Router.push({path:'/provincial',query:{
          provinceMuseumId:id,
          provinceName:province
        }});
        return false
      }
    },
    mounted(){
      this._getProvinceMuseum();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "secondNav.styl"
</style>
