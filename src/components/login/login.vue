<template>
  <div class="login">
    <div class="logo">
      <div class="logoLogin" @click="_rerurnIndex">
      </div>
    </div>
    <div class="login-con">
      <div class="login-content">
        <div class="login-center">
          <div class="login-top">
            <span class="login-title">账户登录</span>
            <span class="register" @click="_linkUrl">免费注册</span>
          </div>
          <div class="entry">
            <span class="entryBg"></span>
            <input type="text" v-model="data.account" placeholder="请输入手机号">
          </div>
          <div class="entry-pw">
            <span class="entryBg"></span>
            <input type="password" v-model="data.password" placeholder="请输入密码" @keyup.enter="_submitLogin"/>
          </div>
          <div class="forget">
            <span class="forget-pw" @click="_forgetPw">忘记密码？</span>
            <span class="memory-pw">
              <input type="checkbox" value="check" />记住密码
            </span>
          </div>
          <div class="button">
            <input type="button" value="提交" @click="_submitLogin">
          </div>
        </div>
      </div>
    </div>
    <div class="login-bottom">
      <p class="bottom-list">
        <a class="list hover" v-for="list in lists" @click="_linkHref(list.src)">{{list.name}}</a>
      </p>
      <p class="bottom-listp">
        Copyright © Powered by Ndtech
      </p>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingShow"></v-loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cMethods from '../../common/common'
  import Router from '../../router/index'
  import Loading from '@/components/loading/loading.vue'

  export default {
    components:{
      'v-loading':Loading
    },
    data(){
      return{
        loadingShow:false,
        url:'/web/individua/login',
        data:{
          account:'',
          password:''
        },
        lists: [
          {
            name: '关于众农联',
            src:'/login'
          },
          {
            name: '联系我们',
            src:''
          },
          {
            name: '认证机构登陆',
            src:''
          },
          {
            name: '客服热线：021-8012 5325',
            src:''
          }
        ]
      }
    },
    methods:{
      _submitLogin(){
        let typeId=Router.history.current.query.typeId;
        if(this.data.account===''){
          this.$message.warning('请先填写用户名！');
          return
        }else if(this.data.password===''){
          this.$message.warning('请输入密码！');
          return
        }
        this.loadingShow = true;
        this.$http.post(this.url,this.data).then((resp)=>{
          let response = resp.body;
          if(response.msg==='success'){
            cMethods.setCookie("token", response.data.token);
            this.loadingShow = false;
            this.$message.success('登录成功！');
            if(typeId===1){
              Router.back();
            }else{
              window.location.href = cMethods.getHref();
            }
          }else{
            this.loadingShow = false;
            alert(response.msg);
          }
        })
      },
      _clearToken(){
        let tokenClear = Router.history.current.query.tokenClear;
        if(tokenClear===true){
          cMethods.setCookie('token','')
        }
      },
      _linkUrl(){
        Router.push('register');
      },
      _rerurnIndex(){
        Router.push('/index');
      },
      _forgetPw(){
        Router.push('/changePw');
      }
    },
    created(){
      this._clearToken();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "login.styl"
</style>
