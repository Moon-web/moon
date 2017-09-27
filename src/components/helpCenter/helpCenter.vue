<template>
  <div class="helpCenter-wrapper">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="nav-wrapper">
      <v-nav></v-nav>
    </div>
    <div class="helpCenter-container">
      <div class="helpCenter-content">
        <div class="helpCenter-title">
          <h3 class="title">
            <v-pagePath :path="path"></v-pagePath>
          </h3>
        </div>
        <div class="helpCenter-box">
          <div class="helpCenter-left">
            <div class="helpLeft-top">常见问题</div>
            <div class="helpLeft-bottom">
              <el-collapse v-model="activeNames">
                <el-collapse-item ref="element" v-for="(item,index) in helpData.protocolData" :title="item.infotypename" :name="index" :key="index">
                  <ul class="helpLeft-ul">
                    <li class="helpLeft-item" v-for="(items,index) in helpData.protocolData[index].infos"
                        :class="flagNav==items.infoid?'helpLeft-itemActive':''"
                        @click="_chooseHelpNav(items.infoid)">{{items.title}}</li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div class="helpCenter-right">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Nav from '@/components/nav/nav.vue'
  import pagePath from '@/components/pagePath/pagePath.vue'
  import Footer from '@/components/footer/footer.vue'
  import Router from '../../router/index'

  export default {
    components:{
      'v-head':Head,
      'v-nav':Nav,
      'v-pagePath':pagePath,
      'v-footer':Footer,
    },
    data(){
      return{
        path:[
          {
            text:'帮助中心',
            path:'/helpDetail?type=50'
          },
          {
            text:'常见问题',
          },
        ],
        helpData:{
          protocolUrl:'/web/info/getInfoList',
          condition:{
            firstInfoTypeId:2,
            secondInfoTypeId:''
          },
          protocolData:[],
          helpTitleNav:'',
        },
        info:{
          url:'/web/info/informationInfo',
          infoid:'',
          data:[]
        },
        flagNav:'',
        activeNames:[]
      }
    },
    methods:{
      _chooseHelpNav(id){
        Router.push({path:'/helpDetail',query:{type:id}});
        this.flagNav= Router.history.current.query.type;
      },
      _getchooseNav(){
        this.flagNav= Router.history.current.query.type;
        this.$http.post(this.helpData.protocolUrl,this.helpData.condition,{emulateJSON: true}).then((resp)=>{
          let response=resp.body;
          if(response.code==200){
            this.helpData.protocolData=response.data.infoTypeList[0].subInfoType;
            this.helpData.protocolData.shift();
            for(let i=0;i<this.helpData.protocolData.length;i++){
              this.activeNames.push(i);
            }
          }
        },(resp)=>{
          console.log("帮助接口调用错误")
        })
      },
    },
    created(){
      this._getchooseNav();
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "helpCenter.styl"
</style>
