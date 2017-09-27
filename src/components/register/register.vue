<template>
  <div class="register-wrapper">
    <div class="register-topcon">
      <div class="register-top">
        <div class="register-top-left">
          <div class="register-topLeft" @click="_returnIndex"></div>
          <div class="register-topRight">欢迎注册众农联平台会员</div>
        </div>
        <div class="register-top-right" @click="_goLogin">已有账号去登录></div>
      </div>
    </div>
    <div class="register-wrapperBox">
      <div class="register-containerFirst" v-if="step===0">
        <div class="register-firstStep-top">
          <span class="register-firstStep-topItem register-firstStep-topItem1">选择注册方式</span>
          <span class="register-firstStep-topItem register-firstStep-topItem2">填写信息</span>
          <span class="register-firstStep-topItem register-firstStep-topItem3">完成注册</span>
        </div>
        <div class="register-firstStep-bottom">
          <div class="register-firstStep-phone" @click="chooseStep('phone')">
            <span class="register-firstStep-phoneBg"></span>
            <span class="register-firstStep-phoneCon">个人注册</span>
          </div>
          <div class="register-firstStep-email" @click="chooseStep('email')" v-if="false">
            <span class="register-firstStep-emailBg"></span>
            <span class="register-firstStep-emailCon">企业注册</span>
          </div>
        </div>
      </div>
      <div class="register-containerSecond" v-if="step===1">
        <div class="register-secondStep-top">
          <span class="register-firstStep-topItem register-firstStep-topItem1">选择注册方式</span>
          <span class="register-firstStep-topItem register-firstStep-topItem2">填写信息</span>
          <span class="register-firstStep-topItem register-firstStep-topItem3">完成注册</span>
        </div>
        <div class="register-secondStep-bottom">
          <div class="phone-register" v-show="registerType.phone">
            <div class="register-con">
              <div class="information">
                <span class="title necessary">手机号</span>
                <input class="phone" ref="phone" v-model="condation.mobilePhone" type="number" placeholder="请输入11位手机号"/>
              </div>
              <div class="information">
                <span class="title necessary">验证码</span>
                <input class="code" ref="imgCode" type="text" placeholder="图片验证码" v-model="condation.imageCode"/>
                <img :src="attr" id="codeImg" class="codeImg" @click="_changeCode"/>
              </div>
              <div class="information">
                <span class="title necessary">短信验证码</span>
                <input class="code" ref="phoneCode" v-model="condation.phoneCode" type="text" placeholder="请输入验证码"/>
                <input type="submit" ref="btnCode" :class="disable===true?'off':'on'" value="获取验证码" class="submit" @click="_sendCode"/>
                <i ref="yanCode" class="yanCode"></i>
              </div>
              <div class="information">
                <span class="title necessary">设置密码</span>
                <input class="phone" type="password" ref="pw" placeholder="请输入密码" v-model="condation.password"/>
              </div>
              <div class="information">
                <span class="title necessary">确认密码</span>
                <input class="phone" type="password" ref="pw" placeholder="请再次输入密码" v-model="confirmPass"/>
              </div>
              <div class="information">
                <span class="title necessary" >姓名</span>
                <input class="phone" type="text" placeholder="姓名" v-model="condation.name"/>
              </div>
              <div class="information">
                <span class="title necessary">地区</span>
                <div class="address" v-model="condation.addressCode">
                  <v-citySelect :width="125" :height="35"></v-citySelect>
                </div>
              </div>
              <div class="information">
                <input type="checkbox" class="vmiddle" checked="checked" ref="registerBoxp">
                我已同意<em class="blue" @click="registerProtocol">&lt;&lt;众农联服务协议&gt;&gt;</em>
              </div>
              <div class="confirm">
                <div class="confirm-con">
                  <input type="submit" class="commit" value="立即注册" @click="_register"/>
                </div>
              </div>
              <div class="find">
                <div class="find-con">
                  <span class="haveAccount" @click="haveAccount ">已有账号</span>
                  <span class="haveAccount" @click="changeRegisterType" v-if="false">邮箱注册</span>
                  <span class="findpw" @click="_findPw">找回密码</span>
                </div>
              </div>
            </div>
          </div>
          <div class="email-register" v-show="registerType.email">
            <div class="register-content">
              <div class="submit-content">
                <ul class="submit-ul">
                  <li class="submit-list">
                    <span class="title necessary">邮箱</span>
                    <span class="information">
                      <input class="realInput" v-model="emailRegisters.data.email" type="email" placeholder="请填写正确的邮箱格式">
                    </span>
                  </li>
                  <li class="submit-list">
                    <span class="title necessary">姓名</span>
                    <span class="information">
                      <input class="realInput" v-model="emailRegisters.data.name" type="text" placeholder="请填写姓名">
                    </span>
                  </li>
                  <li class="submit-list">
                    <span class="title necessary">密码</span>
                    <span class="information">
                      <input class="realInput" v-model="emailRegisters.data.password" type="password" placeholder="请填写密码">
                    </span>
                  </li>
                  <li class="submit-list">
                    <span class="title necessary">确认密码</span>
                    <span class="information">
                      <input class="realInput" v-model="emailRegisters.confirmPass" type="password" placeholder="请再次填写密码">
                    </span>
                  </li>
                  <li class="submit-list">
                    <span class="title necessary">验证码</span>
                    <span class="information">
                      <input type="text" v-model="emailRegisters.data.imageCode" class="checkCode" placeholder="验证码">
                      <span class="checkPicture">
                        <img :src="attr" class="codeImg" @click="_changeCode"/>
                      </span>
                    </span>
                  </li>
                </ul>
                <div class="submit-button">
                  <div class="information">
                    <input type="checkbox" class="vmiddle" checked="checked" ref="registerBox">
                    我已同意<em class="blue" @click="registerProtocol">&lt;&lt;众农联服务协议&gt;&gt;</em>
                  </div>
                  <div class="confirm">
                    <div class="confirm-con">
                      <input type="submit" class="commit" value="立即注册" @click="emailRegister"/>
                    </div>
                  </div>
                  <div class="find">
                    <div class="find-con">
                      <span class="haveAccount" @click="haveAccount ">已有账号</span>
                      <span class="haveAccount" @click="changeRegisterType" v-if="false">手机注册</span>
                      <span class="findpw" @click="_findPw">找回密码</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="register-containerThird" v-if="step==2">
        <div class="register-ThirdStep-top">
          <span class="register-firstStep-topItem register-firstStep-topItem1">选择注册方式</span>
          <span class="register-firstStep-topItem register-firstStep-topItem2">填写信息</span>
          <span class="register-firstStep-topItem register-firstStep-topItem3">完成注册</span>
        </div>
        <div class="register-ThirdStep-bottom">
          <div class="register-ThirdStep-bottomCon">
            <div class="register-ThirdStep-sueecss">
              <span class="register-ThirdStep-sueecssBg"></span>
              <div class="register-ThirdStep-info">
                <span class="register-ThirdStep-sueecssCon">恭喜您的账号注册成功</span>
                <span class="register-ThirdStep-ren">完善企业资质认证尊享优质服务，海量采购/供应信息轻松get！</span>
              </div>
            </div>
            <div class="register-ThirdStep-btn">
              <span class="register-ThirdStep-identification" @click="_returnIdentification">去认证</span>
              <span class="register-ThirdStep-back" @click="_returnINdex">返回首页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="register-out" :class="registerShow?'OutIsShow':''">
      <div class="registerOut">
        <span class="register-close" @click="registerClose"></span>
        <div id="registerOutCon" v-html="protocol.protocolData">
        </div>
      </div>
    </div>
    <div class="loading-wrapper">
      <v-loading :state="loadingShow"></v-loading>
    </div>
    <div class="login-bottom">
      <p class="bottom-list">
        <a class="list hover" v-for="list in lists" @click="_linkHref(list.src)">{{list.name}}</a>
      </p>
      <p class="bottom-listp">
        Copyright © Powered by Ndtech
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Router from '../../router/index'
  import citySelect from '@/components/citySelect/citySelect.vue'
  import Event from '../../common/emit'
  import Loading from '@/components/loading/loading.vue'
  import cMethods from '../../common/common'

  let regPhone = /^1[34578]\d{9}$/;
  let regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  export default{
    components:{
      'v-loading':Loading,
      'v-citySelect':citySelect
    },
    data(){
      return{
        step:0,
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
        ],
        registerType:{
          phone:true,
          email:false
        },
        loadingShow:false,
        registerShow:false,
        url:'/code.do',
        attr:'',
        disable:false,
        registerUrl:'/web/individua/register',
        resultUrl:'/web/individua/code/',
        condation:{
          mobilePhone: '',
          name: '',
          password: '',
          addressCode: '',
          imageCode: '',
          phoneCode:'',
        },
        confirmPass:'',
        addressCode:{},
        code:'',
        protocol:{
          protocolUrl:'/web/info/getInfoList',
          condition:{
            firstInfoTypeId:2,
            secondInfoTypeId:39
          },
          protocolData:[]
        },
        emailRegisters:{
          url:'/web/individua/registerEmail',
          data:{
            email:'',
            password:'',
            name:'',
            returnUrl:''
          },
          confirmPass:'',
        },
        loginData:{
          url:'/web/individua/login',
          data:{
            account:'',
            password:''
          }
        }
      }
    },
    methods:{
      haveAccount(){
        Router.push({path:'/login'})
      },
      _returnIndex(){
        Router.push('index')
      },
      _goLogin(){
        Router.push({path:'/login'})
      },
      //选择注册方式
      chooseStep(type){
        this.step=1;
        if(type=='phone'){
          this.registerType.phone=true;
          this.registerType.email=false
        }else if(type=='email'){
          this.registerType.email=true;
          this.registerType.phone=false;
        }
      },
      //图片验证码
      _changeCode(){
        let time=new Date().getTime();
        this.attr=this.url+'?t='+ time;
      },
      //手机注册
      _register(){
        let registerBox=this.$refs.registerBoxp;
        if(this.condation.mobilePhone===''){
          this.$message.warning('请填写手机号！');
          return false
        }else if(!regPhone.test(this.condation.mobilePhone)){
          this.$message.warning('请填写正确的手机号格式！');
          return false
        }else if(this.condation.password===''){
          this.$message.warning('请填写密码！');
          return false
        }else if(this.condation.password!==this.confirmPass){
          this.$message.warning('两次密码不一致，请重新输入！');
          return false
        }else if(this.condation.name===''){
          this.$message.warning('请填写姓名！');
          return false
        }else if(registerBox.checked){
          this.loadingShow = true;
          //this.condation.addressCode=this.addressCode.district.addressCode+this.addressCode.city.addressCode+this.addressCode.province.addressCode;
          this.condation.addressCode=this.addressCode.district.addressCode;//只需要三级id
          this.$http.post(this.registerUrl,this.condation).then((resp)=>{
            let response=resp.body;
            if(response.code==200){
              this.loadingShow = false;
              this.step=2;
            }else{
              this.loadingShow = false;
              this.$message.error(response.msg)
            }
          },(resp)=>{
            console.log("接口调用失败")
          })
        }else{
          this.$message.warning("请同意众农联服务协议，再进行注册！")
        }
      },
      //获取手机验证码
      _sendCode(){
        let registerBox=this.$refs.registerBoxp;
        if(this.condation.mobilePhone===''){
          this.$message.warning('请填写手机号！');
          return false
        }else if(!regPhone.test(this.condation.mobilePhone)){
          this.$message.warning('请填写正确的手机号格式！');
          return false
        }else {
          if (this.disable === true) {
            return false;
          }
          let btnCode = this.$refs.btnCode;
          let _this = this;
          let sec = 60;
          this.disable = true;
          let interval = window.setInterval(function () {
            if (sec == 0) {
              _this.disable = false;
              btnCode.value = "重新获取";
              window.clearInterval(interval);
              return false;
            }
            btnCode.value = "重新发送" + sec + "秒";
            sec--;
          }, 1000);
          this.$http.post(this.resultUrl + this.condation.mobilePhone).then((resp) => {
            let response = resp.body;
            let yanCode = this.$refs.yanCode;
             yanCode.innerHTML = "发送成功，验证码：" + response.data
          }, (resp) => {
            this.disable = false;
            btnCode.value = "获取验证码";
            window.clearInterval(interval);
            this.$message.error("验证码发送失败")
          })
        }
      },
      //获取地址code
      hah(v){
        this.addressCode = v;
      },
      _getCitySelect(){
        let _this = this;
        Event.$on('throwData',function(v){
          _this.hah(v);
        })
      },
      _findPw(){
        Router.push('/changePw')
      },
      //服务协议
      registerProtocol(){
        this.registerShow=!this.registerShow;
        this.$http.post(this.protocol.protocolUrl,this.protocol.condition,{emulateJSON: true}).then((resp)=>{
          let response=resp.body;
          if(response.code==200){
            for(let i =0;i<response.data.infolist.length;i++){
              if(response.data.infolist[i].title==='平台服务协议'){
                this.protocol.protocolData=response.data.infolist[i].content;
                return this.protocol.protocolData
              }
            }
          }
        },(resp)=>{
          console.log("接口调用错误")
        })
      },
      registerClose(){
        this.registerShow=false
      },
      //邮箱注册
      emailRegister(){
        let registerBox=this.$refs.registerBox;
        if(!registerBox.checked){
          this.$message.warning('请同意众农联服务协议，再进行注册！');
        }
        if(this.emailRegisters.data.email===''){
          this.$message.warning('请填写邮箱！');
          return false
        }else if(!regEmail.test(this.emailRegisters.data.email)){
          this.$message.warning('请填写正确的邮箱格式！');
          return false
        }else if(this.emailRegisters.data.password===''){
          this.$message.warning('请填写密码！');
          return false
        }else if(this.emailRegisters.data.password!==this.emailRegisters.confirmPass){
          this.$message.warning('两次密码不一致，请重新输入！');
          return false
        }else if(this.emailRegisters.data.name===''){
          this.$message.warning('请填写姓名！');
          return false
        }
        this.loadingShow = true;
        this.emailRegisters.data.returnUrl = 'index.html#/registerState';
        this.$http.post(this.emailRegisters.url,this.emailRegisters.data).then((res)=>{
          let response = res.body;
          if(response.code===200){
            this.loadingShow = false;
            this.$router.replace({
              path:'/registerState',
              query:{
                user:cMethods.encode(JSON.stringify(this.emailRegisters.data)),
                key:''
              }
            });
            this.step=2
          }else{
            this.loadingShow = false;
            this.$message.error(response.msg);
          }
        },(error)=>{
          this.loadingShow = false;
          console.log('注册接口调用错误！')
        })
      },
      changeRegisterType(){
        if(this.registerType.phone===true){
          this.registerType.phone=false;
          this.registerType.email=true
        }else{
          this.registerType.phone=true;
          this.registerType.email=false
        }
      },
      //返回首页
      _returnINdex(){
        Router.push('/index');
      },
      //去认证
      _returnIdentification(){
        this.loadingShow = true;
        this.loginData.data.account=this.condation.mobilePhone;
        this.loginData.data.password=this.condation.password;
        this.$http.post(this.loginData.url,this.loginData.data).then((resp)=>{
          let response = resp.body;
          if(response.msg==='success'){
            this.loadingShow = false;
            cMethods.setCookie("token", response.data.token);
            //Router.push('/authentication');
            window.location.href = cMethods.getHref()+'?menuId=z38';
          }
        },(resp)=>{
          this.loadingShow = false;
        })
      }
    },
    created(){
      this._changeCode();
    },
    mounted(){
      this._getCitySelect();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "register.styl"
</style>
