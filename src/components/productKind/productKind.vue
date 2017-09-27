<template>
  <div class="productKind-wrapper" v-show="show">
    <div class="productKind-container" @mouseleave="kindShow=false">
      <ul class="kind-box">
        <li class="kind-first" v-for="item in productKind.kindData.one" @mouseenter="kind(item.productcategoryId)">
          <span class="first-item">{{item.productcategoryName}}</span>
        </li>
      </ul>
      <ul class="kind-firstBox" v-show="kindShow">
        <li class="kind-second" v-for="item in productKind.kindData.two" v-if="item.parentId === kindId">
          <span class="second-item">{{item.productcategoryName}}</span>
          <ul class="kind-secondBox">
            <li class="kind-third" @click="_linkSearch(items.productcategoryId)"
                v-for="items in productKind.kindData.three" v-if="items.parentId === item.productcategoryId">{{items.productcategoryName}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  export default{
    props:{
      show:{
        type:Boolean,
        detault:false
      }
    },
    data(){
      return{
        productKind:{
          url:'/web/productcategorys/categoryList',
          kindData:[]
        },
        kindId:0,
        kindShow:false,
      }
    },
    methods:{
      _getKinds(){
        this.$http.get(this.productKind.url).then((resp) => {
          let response = resp.body;
          if(response.code === 200){
            this.productKind.kindData = response.data;
            this.kindId = this.productKind.kindData.one[0].productcategoryId;
          }
        },(resp) => {
          alert("分类接口调用失败！")
        })
      },
      kind(id){
        this.kindId = id;
        this.kindShow = true;
      },
      _linkSearch(id){
        Router.push('/search?productcategoryid='+id)
      }
    },
    mounted(){
      this._getKinds()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "productKind.styl"
</style>
