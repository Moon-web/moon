<template>
  <div class="registerState">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="registerState-content">
      <div class="warn-wrapper notRegisterEmail" v-if="state===5">
        <div class="warning">
          <i class="warning-icon"></i>
          <p class="warning-text">您的邮箱尚未注册！</p>
        </div>
        <div class="button">
          <span class="href-button" @click="_link('/register')">
            立即注册！
          </span>
        </div>
      </div>
      <div class="warn-wrapper overTimeRegister" v-if="state===4">
        <div class="warning">
          <i class="warning-icon"></i>
          <p class="warning-text">抱歉，注册激活超时！</p>
        </div>
        <div class="button">
          <span class="href-button" @click="_link('/index')">
            前往众农联
          </span>
        </div>
      </div>
      <div class="warn-wrapper overTimeRegister" v-if="state===3">
        <div class="warning">
          <i class="warning-icon"></i>
          <p class="warning-text">抱歉，激活邮箱失败！</p>
        </div>
        <div class="button">
          <span class="href-button" @click="_link('/index')">
            前往众农联
          </span>
        </div>
      </div>
      <div class="warn-wrapper activitySuccess" v-if="state===2">
        <div class="warning">
          <i class="warning-icon"></i>
          <p class="warning-text">注册成功！请前往邮箱激活！</p>
        </div>
        <div class="button">
          <span class="href-button" @click="_link('/index')">
            返回
          </span>
        </div>
      </div>
      <div class="warn-wrapper activitySuccess" v-if="state===6">
        <div class="warning">
          <i class="warning-icon"></i>
          <p class="warning-text">注册成功！邮件正在发送中...</p>
        </div>
        <div class="button">
          <span class="href-button" @click="_link('/index')">
            返回
          </span>
        </div>
      </div>
      <div class="warn-wrapper activitySuccess" v-if="state===1">
        <div class="warning">
          <i class="warning-icon"></i>
          <p class="warning-text">激活成功了！</p>
        </div>
        <div class="button">
          <span class="href-button" @click="login">
            立即认证
          </span>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-footer></v-footer>
    </div>
    <v-loading :state="loadingShow"></v-loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import Head from '@/components/head/head.vue'
  import Footer from '@/components/footer/footer.vue'
  import cMethods from '../../common/common'
  import Loading from '@/components/loading/loading.vue'
  const success = 1;//激活成功
  const registerSuccess = 2;//注册成功待激活
  const failActive = 3;//激活失败
  const activeOverTime = 4;//激活超时
  const notRegister = 5;//未注册
  const emailIng = 6;//邮件发送中
  export default {
    components:{
      'v-head':Head,
      'v-footer':Footer,
      'v-loading':Loading
    },
    data(){
      return{
        url:'/web/individua/activateEmail',
        loginUrl:'/web/individua/login',
        loadingShow:false,
        loginData:{
          account:'',
          password:''
        },
        data:{
          keyup:''
        },
        state:2,
        userData:{}
      }
    },
    methods:{
      _getState(){
        let userData = '';
        this.data.keyup = this.$router.history.current.query.keyup;
        userData = cMethods.decode(this.$router.history.current.query.keyup);
        this.userData = JSON.parse(userData);
        this.$http.post(this.url,this.data,{emulateJSON:true}).then((res)=>{
          let response = res.body;
          if(response.code===200){
            this.$message.success('恭喜，激活成功！');
            this.state = success;
          }else if(response.code===617){
            this.$message.error('抱歉，注册激活超时！');
            this.state = activeOverTime;
          }else if(response.code===613){
            this.$message.error('抱歉，您的邮箱尚未注册！');
            this.state = notRegister;
          }else if(response.code===614){
            this.$message.error('抱歉，激活邮箱失败！');
            this.state = failActive;
          }else if(response.code===611){
            this.$message.error('邮箱验证码错误！');
            this.state = failActive;
          }else if(response.code===612){
            this.$message.error('邮箱已存在！');
            this.state = failActive;
          }else if(response.code===615){
            this.$message.error('邮件正在发送中！');
            this.state = emailIng;
          }else if(response.code===616){
            this.$message.success('邮箱未激活！');
            this.state = registerSuccess;
          }else{
            this.$message.error('抱歉，激活邮箱失败！');
            this.state = failActive;
          }
        })
      },
      _link(path){
        this.$router.push(path);
      },
      login(){

        this.$http.post(this.loginUrl,this.loginData).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.loadingShow = false;
            this.$router.replace('/authentication');
            cMethods.setCookie("token", response.data.token);
          }else{
            this.loadingShow = false;
            this.$message.error(response.msg)
          }
        },(error)=>{
          this.loadingShow = false;
          alert('调用登陆接口错误！')
        })
      }
    },
    created(){
      this._getState();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "registerState.styl"
</style>
