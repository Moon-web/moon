<template>
  <div class="changePw">
    <div class="head-wrapper">
      <v-head></v-head>
    </div>
    <div class="register-top">
      <div class="top">
        <div class="left" @click="_returnIndex"></div>
        <div class="right">
        </div>
      </div>
    </div>
    <div class="inform" v-if="warnWindow">
      <p class="information-content">
        {{information}}
      </p>
      <span class="information-colse" @click="warnWindow=!warnWindow"></span>
    </div>
    <div class="register-con" v-show="resetPass.phone===true">
      <div class="first" v-if="bTag==0">
        <div class="firstBg">
          <span class="stepOne">1.请输入手机号</span>
          <span class="stepTwo">2.请输入新密码</span>
          <span class="stepLast">3.完成</span>
        </div>
        <div class="information">
          <select name="sel" id="" class="selesct-con">
            <option value="1">+86</option>
          </select>
          <input class="phone" ref="phone" v-model="nextData.mobilePhone" type="number" placeholder="请输入11位手机号" @blur="_phone"/>
          <i class="wran" ref="wran"></i>
        </div>
        <div class="information">
          <input class="code" ref="phoneCode" v-model="nextData.code" type="text" placeholder="请输入验证码"/>
          <input type="submit" ref="btnCode" :disabled="disable" value="获取验证码" class="submit" @click="_sendPhoneCode" :class="changeBg?'submitBg':''"/>
          <i class="yanCode" ref="yanCode"></i>
        </div>
        <div class="btn">
          <button class="sureBtn" @click="_nextStep">下一步</button>
        </div>
        <!--<div class="changeResetPassType p">-->
          <!--<b class="operation" @click="resetPass.phone=false">使用邮箱修改</b>-->
        <!--</div>-->
      </div>
      <div class="second" v-if="bTag==1">
        <div class="secondBg">
          <span class="stepOne">1.请输入手机号</span>
          <span class="stepTwo">2.请输入新密码</span>
          <span class="stepLast">3.完成</span>
        </div>
        <div class="information">
          <input class="password" type="password" ref="pw" placeholder="请输入密码" v-model="condition.password" @blur="_pw"/>
          <i class="pwWran" ref="pwWran"></i>
        </div>
        <div class="information">
          <input class="password" type="password" ref="surepw" placeholder="请输入密码" v-model="condition.rePassword" @blur="_surePw"/>
          <i class="surepwWran" ref="surepwWran"></i>
        </div>
        <div class="btn">
          <button class="sureBtn" @click="_changePw">确定修改密码</button>
        </div>

      </div>
      <div class="third" v-if="bTag==2">
        <div class="thirdBg">
          <span class="stepOne">1.请输入手机号</span>
          <span class="stepTwo">2.请输入新密码</span>
          <span class="stepLast">3.完成</span>
        </div>
        <div class="changeSuccess">恭喜您的密码已经完成修改!</div>
      </div>
    </div>
    <div class="emailReset" v-show="resetPass.phone===false">
      <div class="register-content">
        <div class="submit-content">
          <ul class="submit-ul">
            <li class="submit-list">
              <span class="title necessary">邮箱</span>
              <span class="information">
                <input class="realInput" v-model="resetPass.data.email" type="email" placeholder="请填写正确的邮箱格式">
              </span>
            </li>
            <li class="submit-list">
              <span class="title necessary">新密码</span>
              <span class="information">
                <input class="realInput" v-model="resetPass.data.password" type="password" placeholder="请填写新密码">
              </span>
            </li>
            <li class="submit-list">
              <span class="title necessary">确认密码</span>
              <span class="information">
                <input class="realInput" v-model="resetPass.confirmPass" type="password" placeholder="请再次填写密码">
              </span>
            </li>
            <li class="submit-list">
              <span class="title necessary">验证码</span>
              <span class="information">
                <input type="text" class="checkCode" v-model="resetPass.data.imageCode" placeholder="验证码">
                <span class="checkPicture">
                  <img :src="resetPass.imageCodeAttr" class="left" @click="_changeCode"/>
                </span>
              </span>
            </li>
          </ul>
          <div class="submit-button">
            <div class="confirm">
              <div class="confirm-con">
                <input type="submit" @click="_emailResetPass" class="commit" value="找回密码"/>
              </div>
            </div>
          </div>
          <div class="changeResetPassType">
            <b class="operation" @click="resetPass.phone=true">使用手机修改</b>
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
  import Footer from '@/components/footer/footer.vue'
  import Router from '../../router/index'
  import cMethods from '../../common/common'
  let codeImg=document.getElementById("codeImg");
  let testPhone = /^1[34578]\d{9}$/;
  export default{
    components:{
      'v-head':Head,
      'v-footer':Footer
    },
    data(){
      return{
        resetPass:{
          url:'/web/individua/findEmail',
          phone:true,
          confirmPass:'',
          imageCodeAttr:'',
          checkCodeUrl:'/code.do',
          data:{
            email:'',
            password:'',
            returnUrl:'',
            imageCode:''
          }
        },
        warnWindow: true,
        attr:'',
        disable:false,
        resultUrl:'/web/individua/pwdCode/',
        nextUrl:'/web/individua/vlalidateCode',
        changePwUrl:'/web/individua/changePwd',
        nextData:{
          code:'',
          mobilePhone:''
        },
        condition:{
          code: '',
          password: '',
          rePassword: '',
          mobilePhone:''
        },
        bTag:0,
        information:'温馨提示：请您填写正确的手机号或者邮箱，找回密码！',
        changeBg:false,
      }
    },
    methods:{
      _watch(){
        let _this = this;
        this.$watch('nextData.mobilePhone',function(n,o){
          if(testPhone.test(n)){
            _this.changeBg = true;
          }
        })
      },
      _returnIndex(){
        Router.push('index')
      },
      //获取手机验证码
      _sendPhoneCode(){
        let phone=this.$refs.phone;
        let phoneCode=this.$refs.phoneCode;
        let btnCode=this.$refs.btnCode;
        //手机号验证
        this._phone();
        //短信验证码
        let sec = 60;
        this.disable=true;
        this.changeBg=false;
        this.$http.post(this.resultUrl+this.nextData.mobilePhone).then((resp)=>{
          let response=resp.body
          if(response.code==200){
            let _this=this;
            let timer = window.setInterval(function () {
              if (sec == 0) {
                _this.disable=false;
                _this.changeBg=true;
                btnCode.value="重新获取"
                window.clearInterval(timer);
                return;
              }
              btnCode.value="重新发送" + sec + "秒";
              sec--;
            }, 1000);
            let yanCode=this.$refs.yanCode
            yanCode.innerHTML="发送成功，验证码：" + response.data.code
          }else if(response.code==604){
            this.disable=false;
            this.changeBg=false;
            this.$message.warning("用户名不存在！")
          }else if(response.code==606){
            this.disable=false;
            this.changeBg=false;
            this.$message.warning("手机验证码错误！")
          }else{
            this.disable=false;
            this.changeBg=false;
            this.$message.warning("其他错误！")
          }
        },(resp)=>{
          this.disable=false;
          this.changeBg=false;
          btnCode.value="获取验证码";
          clearInterval(interval);
          this.$message.error("验证码发送失败");
        })
      },
      _phone(){
        let phone=this.$refs.phone
        let wran=this.$refs.wran;
        if(phone.value==''||phone.value==null){
          wran.innerHTML='手机号码不能为空'
          return false;
        }else if(!testPhone.test(phone.value)){
          wran.innerHTML='手机号码格式不正确'
          return false;
        }
        this.changeBg=true;
        wran.innerHTML="";
      },
      _pw(){
        let pw=this.$refs.pw
        let surepw=this.$refs.surepw
        let pwWran=this.$refs.pwWran
        let surepwWran=this.$refs.surepwWran
        if(pw.value == "" || pw.value == null) {
          pwWran.innerHTML="请设置密码！";
          return;
        }
        if(pw.value.length < 6 || pw.value.length > 18){
          pwWran.innerHTML="请输入6-18位字符的密码！";
          return;
        }
        pwWran.innerHTML='';
      },
      _surePw(){
        let pw=this.$refs.pw
        let surepw=this.$refs.surepw
        let pwWran=this.$refs.pwWran
        let surepwWran=this.$refs.surepwWran
        if(pw.value!==surepw.value&&(surepw.value!==''||pw.value !== null)){
          surepwWran.innerHTML="两次密码输入不一致，请重新输入";
          return;
        }
        surepwWran.innerHTML=""
      },
      _nextStep(){
        let yanCode=this.$refs.yanCode;
        yanCode.innerHTML="";
        //手机号验证
        this._phone();
        this.changeBg=false;
        this.$http.post(this.nextUrl,this.nextData,{
          emulateJSON: true,
        }).then((resp)=>{
          let response=resp.body;
          if(response.code===200){
            this.bTag=1;
          }else if(response.code==603){
            this.$message.warning("验证码错误")
          }else if(response.code==604){
            this.$message.warning("用户不存在")
          }else{
            this.$message.warning("请检查用户名或验证码是否正确")
          }
        },(resp)=>{
          this.$message.error("获取验证码失败！")
        });
      },
      _changePw(){
        this.condition.code=this.nextData.code;
        this.condition.mobilePhone=this.nextData.mobilePhone;
        this.$http.post(this.changePwUrl,this.condition,{
          emulateJSON:true
        }).then((resp)=>{
          let response=resp.body;
          if(response.code===200){
            this.bTag=2;
            this.$message.success("修改密码成功")
          }else if(response.code===603){
            this.$message.warning("验证码错误")
          }else{
            this.$message.warning("参数错误")
          }
        },(resp)=>{
          this.$message.error("修改密码失败！")
        });
      },
      //图片验证码
      _changeCode(){
        let time=new Date().getTime();
        this.resetPass.imageCodeAttr=this.resetPass.checkCodeUrl+'?t='+ time;
      },
      _emailResetPass(){
        if(this.resetPass.data.email===''){
          this.$message.warning('请填写邮箱！');
          return false
        }else if(this.resetPass.data.password===''){
          this.$message.warning('请输入密码！');
          return false
        }else if(this.resetPass.data.password!==this.resetPass.confirmPass){
          this.$message.warning('两次密码不一致，请重新输入！');
          return false
        }else if(this.resetPass.data.imageCode===''){
          this.$message.warning('请输入验证码！');
          return false
        }
        this.resetPass.data.returnUrl = 'index.html#/resetPasswordState';
        this.$http.post(this.resetPass.url,this.resetPass.data).then((resp)=>{
          let response = resp.body;
          if(response.code===200){
            this.bTag=2;
            this.$message.success("已发送邮件，请前往邮箱确认！");
            this.$router.replace({
              path:'/resetPasswordState',
              query:{
                email:this.emailRegisters.data.email,
                key:''
              }
            });
          }else{
            this.$message.warning(response.msg);
          }
        })
      }
    },
    created(){
      this._watch();
      this._changeCode()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "changePw.styl"
</style>
