<template>
  <div class="footer">
    <div class="footer-content">
      <div class="foot">
        <ul class="icon-ul">
          <li class="item" v-for="item in itemsList">
            <div class="itemRight">
              <span class="title">{{item.name}}</span>
              <span class="content">{{item.content}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="footer-center">
        <div class="left">
          <div class="footer-leftBox" v-for="(item,index) in FhelpData.protocolData" v-if="index<1">
            <p class="footer-leftTitle">{{item.infotypename}}</p>
            <div class="footer-help-con">
              <ul class="footer-list">
                <li class="list-item" v-for="(items,index) in FhelpData.protocolData">{{items.title}}</li>
              </ul>
            </div>
          </div>
          <div class="footer-leftBox" v-for="(item,index) in FhelpData.declareData" v-if="index<1">
            <p class="footer-leftTitle">{{item.infotypename}}</p>
            <div class="footer-help-con">
              <ul class="footer-list">
                <li class="list-item" v-for="(items,index) in FhelpData.declareData">{{items.title}}</li>
              </ul>
            </div>
          </div>
          <div class="footer-leftBox" v-for="(item,index) in FhelpData.ufaData" v-if="index<1">
            <p class="footer-leftTitle">{{item.infotypename}}</p>
            <div class="footer-help-con">
              <ul class="footer-list">
                <li class="list-item" v-for="(items,index) in FhelpData.ufaData">{{items.title}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-bg"></div>
          <span class="title">官方微信公众号</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p class="bottom-list">
        <a class="list hover" v-for="list in dataFooter">{{list.name}}</a>
      </p>
      <p class="bottom-listp">
        Copyright © Powered by Ndtech
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  export default{
    data(){
      return {
        itemsList:[
          {
            name:'智能物流',
            src:'',
            content:'如约送货，送货入户'
          },
          {
            name:'品种齐全',
            src:'',
            content:'私人定制，优质生产'
          },
          {
            name:'品质保障',
            src:'',
            content:'全场正品，采购无忧'
          },
          {
            name:'服务中心',
            src:'',
            content:'品质护航，采购无忧'
          }
        ],
        FhelpData:{
          protocolUrl:'/web/info/findList',
          protocolData:[],//新手帮助
          declareData:[],//平台声明
          ufaData:[]//关于众农联
        },
        dataFooter:[
          {
            name:'关于众农联',
            src:''
          },
          {
            name:'联系我们',
            src:''
          },
          {
            name:'认证机构登陆',
            src:''
          },
          {
            name:'客服热线：021-8012 5325',
            src:''
          },
        ]
      }
    },
    methods:{
      _linkHelpDetail(id){
        Router.push({path:'/helpDetail',query:{type:id,num:id}});
      },
      //获取新手指南
      _getFHelpData(){
        let condition = {
          datas:{
            firstInfoTypeId:2,
            secondInfoTypeId:36,
            pageNo:1
          }
        };
        this.$http.post(this.FhelpData.protocolUrl,condition).then((resp)=>{
          let response=resp.body;
          if(response.success){
            this.FhelpData.protocolData=response.datas.list;
          }
        },(resp)=>{
          console.log("接口调用错误")
        })
      },
      //获取平台申明
      _getDeclare(){
        let condition = {
          datas:{
            firstInfoTypeId:2,
            secondInfoTypeId:39,
            pageNo:1
          }
        };
        this.$http.post(this.FhelpData.protocolUrl,condition).then((resp)=>{
          let response=resp.body;
          if(response.success){
            this.FhelpData.declareData=response.datas.list;
          }
        },(resp)=>{
          console.log("接口调用错误")
        })
      },
      //关于
      _getAbout(){
        let condition = {
          datas:{
            firstInfoTypeId:2,
            secondInfoTypeId:40,
            pageNo:1
          }
        };
        this.$http.post(this.FhelpData.protocolUrl,condition).then((resp)=>{
          let response=resp.body;
          if(response.success){
            this.FhelpData.ufaData=response.datas.list;
          }
        },(resp)=>{
          console.log("接口调用错误")
        })
      }
    },
    created(){
      this._getFHelpData();
      this._getDeclare();
      this._getAbout()
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "footer.styl"
</style>
