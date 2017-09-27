<template>
  <div class="citySelect">
    <div class="select">
      <select class="selected" v-model="selectData.province" @change="_getProvince" :style="{width:width+'px',height:height+'px'}">
        <option v-for="item in provinceData" :value="item.divisionId">{{item.divisionName}}</option>
      </select>
    </div>
    <div class="select">
      <select class="selected" v-model="selectData.city"  :style="{width:width+'px',height:height+'px'}">
        <option v-for="item in cityData" :value="item.divisionId">{{item.divisionName}}</option>
      </select>
    </div>
    <div class="select">
      <select class="selected" v-model="selectData.district" :style="{width:width+'px',height:height+'px'}">
        <option v-for="item in districtData" :value="item.divisionId">{{item.divisionName}}</option>
      </select>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event from '../../common/emit'
  export default {
    props:{
      width:{
        type:Number,
        default:130
      },
      height:{
        type:Number,
        default:30
      }
    },
    data(){
      return{
        url:'/web/division/findListByParentId/',
        provinceId:'-1',
        provinceData:[],
        cityData:[],
        districtData:[],
        selectData:{
          province:'',
          city:'',
          district:''
        },
        throwData:{
          province:{}
        }
      }
    },
    methods:{
      _getProvince(){
        this.$http.post(this.url+this.provinceId).then((res)=>{
          let response = res.body;
          if(response.code===200){
            this.provinceData = response.data;
          }
        })
      },
      _getCity(){
        this.$http.post(this.url+this.selectData.province).then((res)=>{
          let response = res.body;
          if(response.code===200){
            this.cityData = response.data;
          }
        })
      },
      _getDistrict(){
        this.$http.post(this.url+this.selectData.city).then((res)=>{
          let response = res.body;
          if(response.code===200){
            this.districtData = response.data;
          }
        })
      },
      _watch(){
        this.$watch('provinceData',function(n,o){
          if(o.length===0){
            this.selectData.province = n[0].divisionId;
          }
          this._getCity();
        },{
          deep:true
        });
        this.$watch('cityData',function(n,o){
          this.selectData.city = n[0].divisionId;
          this._getDistrict()
        },{
          deep:true
        });
        this.$watch('districtData',function(n,o){
          this.selectData.district = n[0].divisionId;
        },{
          deep:true
        });
        this.$watch('selectData.province',function(n,o){
          for(let i = 0; i < this.provinceData.length;i++){
            if(this.provinceData[i].divisionId===n){
              this.throwData.province = this.provinceData[i];
            }
          }
        });
        this.$watch('selectData.city',function(n,o){
          for(let i = 0; i < this.cityData.length;i++){
            if(this.cityData[i].divisionId===n){
              this.throwData.city = this.cityData[i];
            }
          }
          this._getDistrict();
        });
        this.$watch('selectData.district',function(n,o){
          for(let i = 0; i < this.districtData.length;i++){
            if(this.districtData[i].divisionId===n){
              this.throwData.district = this.districtData[i];
            }
          }
          Event.$emit('throwData',this.throwData)
          //发送数据，接收数据时先定义一个方法用Event取值，然后用另外一个方法赋值，详情见说明
        })
      }
    },
    created(){
      this._watch();
      this._getProvince();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "citySelect.styl"
</style>
