<template>
  <div class="head">
    <div class="head-center">
      <span class="item">
        你好，<i v-if="loginState===true">{{user.name}}</i>欢迎来到众农联平台
      </span>
      <div class="other-information">
        <div class="loginState">
          <div class="loginOut">
            <span class="list" v-if="loginState===false">
                <i class="hover" @click="_linkPage('/login')">登录</i>
                <i class="hover" @click="_linkPage('/register')">注册</i>
              </span>
            <span class="list hover" @click="loginOut" v-if="loginState===true">退出登录</span>
          </div>
        </div>
        <span class="item" v-if="user.roleId===5||user.roleId===6||user.roleId==''" @click="_linkControl('z33')">我的订单</span>
        <span class="item" v-if="user.roleId===3||user.roleId===4" @click="_linkControl('z34')">我的订单</span>
        <span class="item" @click="_linkControl('')">
         会员中心
        </span>
        <span class="item favorite" @click="_linkControl('z67')">收藏夹</span>
        <span class="item">客服热线：<i class="phone-num">021-80125325</i></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cMethods from '../../common/common'
  import Router from '../../router/index'
  import Event from '../../common/emit'

  export default {
    data(){
      return{
        loginState:false,
        userUrl:'/web/individua/getUserInfo',
        loginOutUrl:'/web/individua/logout',
        userData:{
          tm:''
        },
        user:{
          name:'',
          tel:'',
          roleId:'',
          corporateId:''
        },
        token:'',
        appNavData:{
          show:false,
          downApp:false
        },
      }
    },
    methods:{
      getData(){
        this.token = cMethods.getCookie('token');
        this.$http.get(this.userUrl,{headers:{token:this.token}}).then((resp)=>{
          let response = resp.body;
          if(response.code===410||response.code===409){
            cMethods.setCookie('loginState',false);
            this.loginState=false;
          }else{
            this.loginState = true;
            this.user.name = response.data.name;
            this.user.tel = response.data.mobilePhone;
            this.user.roleId = response.data.roleId;
            this.user.corporateId = response.data.corporateId;
            cMethods.setCookie('roleId',this.user.roleId);
            cMethods.setCookie('corporateId',this.user.corporateId);
            cMethods.setCookie('loginState',true);
            Event.$emit('role-id',this.user.roleId);
          }
        },(resp)=>{
          cMethods.setCookie('loginState',false);
          alert('用户信息接口调用异常')
        })
      },
      loginOut(){
        let result = confirm('是否确定退出？');
        let token = cMethods.getCookie('token');
        if(result === true){
          this.$http.get(this.loginOutUrl).then((resp)=>{
            let response = resp.body;
            if(response.code===200){
              cMethods.setCookie('token','');
              this.loginState = false;
              cMethods.setCookie('loginState',false);
            }else if(response.code===409||response.code===410){
              cMethods.setCookie('token','');
              this.loginState = false;
            }
          });
        }
      },
      _linkPage(path){
        this.$router.push(path)
      },
      _linkNews(path,type){
        this.$router.push({
          path:path,
          query:{
            type:type
          }
        })
      },
      _linkControl(menuId){
        this.token = cMethods.getCookie('token');
        this.$http.get(this.userUrl,{headers:{token:this.token}}).then((resp)=>{
          let response = resp.body;
          if(response.code===410||response.code===409){
            this._linkPage('/login')
          }else{
            window.location.href = cMethods.getHref()+'?menuId='+menuId;
          }
        },(resp)=>{
          console.log('用户信息接口调用异常')
        })
      },
      _linkHelp(id){
        Router.push({path:'/helpDetail',query:{type:id,num:id}});
      },
    },
    created(){
      this.getData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "head.styl"
</style>
