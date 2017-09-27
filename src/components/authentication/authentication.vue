<template>
  <div class="authentication">
    <div class="authentication-head">
      <div class="head-center">
        <div class="head-logo">
          <i class="logo" @click="_linkIndex"></i>
          <span class="text">企业认证</span>
        </div>
        <div class="head-link">
          <span class="link-wrapper" @click="_linkIndex">
            返回首页
          </span>
        </div>
      </div>
      <div class="authentication-wrapper">
        <div class="authentication-content">
          <div class="bread-nav">
            <ul class="nav-ul">
              <li class="nav-item">
                <i class="icon"></i>
                <i class="text">企业资料</i>
              </li>
              <li class="nav-item" :class="control.step===2||control.step===3?'active':''">
                <i class="icon"></i>
                <i class="text">上传证件</i>
              </li>
              <li class="nav-item" :class="control.step===3?'active':''">
                <i class="icon"></i>
                <i class="text">完成认证</i>
              </li>
            </ul>
          </div>
          <div class="authentication-box">
            <div v-show="control.step===1" class="submit-first">
              <ul class="submit-wrapper">
                <li class="submit-item">
                  <span class="title">企业名称</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.corporateName" onfocus="true" placeholder="请输入公司名称">
                </span>
                </li>
                <li class="submit-item">
                  <span class="title">法人代表</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.corporation" placeholder="请输入法人代表名称">
                </span>
                </li>
                <li class="submit-item">
                  <span class="title">法人代表电话</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.corporationTel" placeholder="请输入法人代表电话">
                </span>
                </li>
                <li class="submit-item">
                  <span class="title">公司规模</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.scale" placeholder="请输入公司规模">
                </span>
                </li>
                <li class="submit-item">
                  <span class="title">企业性质</span>
                  <span class="entry">
                  <select class="normal-select" v-model="submitData.corporateType">
                    <option v-for="item in corporateType" :value="item.dicName">{{item.dicName}}</option>
                  </select>
                </span>
                </li>
                <li class="submit-item">
                  <span class="title">主营产品</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.mainCamp" placeholder="请输入公司主营产品">
                </span>
                </li>
                <li class="submit-item">
                  <span class="title">副营产品</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.viceCamp" placeholder="请输入公司副营产品">
                </span>
                </li>
                <!-- <li class="submit-item">
                   <span class="title">公司地址</span>
                   <span class="entry">
                   <span class="threeClass-wrapper">
                       <v-citySelect :width="122" :height="40"></v-citySelect>
                   </span>
                 </span>
                 </li>-->
                <li class="submit-item">
                  <span class="title">详细地址</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.detailAddress" placeholder="请输入公司详细地址">
                </span>
                </li>
                <li class="submit-item">
                  <span class="title">公司座机</span>
                  <span class="entry">
                    <input type="text" class="concat1" v-model="phoneConcat.title" placeholder="区号">
                    <i class="concat-symbol">-</i>
                    <input type="text" class="concat2" v-model="phoneConcat.content" placeholder="座机号码">
                  </span>
                </li>
                <li class="submit-item">
                  <span class="title">企业邮箱</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.corpEmail" placeholder="请输入企业邮箱">
                </span>
                </li>
                <li class="submit-item">
                  <span class="title unnecessary">企业官网</span>
                  <span class="entry">
                  <input type="text" v-model="submitData.corpWebsite" placeholder="请输入企业官网（非必填）">
                </span>
                </li>
                <li class="submit-item">
                  <span class="title">申请</span>
                  <span class="entry">
                  <select class="normal-select" v-model="submitData.type">
                    <option v-for="item in type" :value="item.roleItemId">{{item.roleName}}</option>
                  </select>
                </span>
                </li>
              </ul>
              <div class="submit-button">
              <span class="button" @click="_confirmFirstStep">
                下一步
              </span>
              </div>
            </div>
            <div v-show="control.step===2" class="submit-second">
              <ul class="submit-wrapper">
                <li class="submit-item">
                  <span class="title">企业LOGO</span>
                  <span class="entry">
                    <span class="upload-wrapper">
                      <el-upload
                        :action="pictureUrl"
                        list-type="picture-card"
                        :headers="headers"
                        :data="logoData"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="logoRemove"
                        :on-success="logoSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-change="handleChange"
                        ref="logo">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <i class="warn">上传企业LOGO*1MB以内JPG/PNG图片</i>
                    </span>
                    <el-dialog v-model="dialogVisible" size="tiny">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </span>
                </li>
                <li class="submit-item">
                  <span class="title">法人身份证号</span>
                  <span class="entry">
                    <input type="text" v-model="submitData.corporationId" placeholder="请输入法人身份证号">
                  </span>
                </li>
                <li class="submit-item">
                  <span class="title">法人身份证复印件（正背两面）</span>
                  <span class="entry">
                    <span class="upload-wrapper">
                      <el-upload
                        :action="pictureUrl"
                        list-type="picture-card"
                        :data="idCardData"
                        :headers="headers"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="idCardRemove"
                        :on-success="idCardSuccess"
                        :before-upload="beforeIdCardUpload"
                        :on-change="handleChange"
                        ref="idCard">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <i class="warn">法人身份证复印件正反面*1MB以内JPG/PNG图片</i>
                    </span>
                  </span>
                </li>
         <!--       <li class="submit-item">
                  <span class="title">法人身份证背面</span>
                  <span class="entry">
                    <span class="upload-wrapper">
                      <el-upload
                        :action="pictureUrl"
                        list-type="picture-card"
                        :data="idCardBackData"
                        :headers="headers"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="idCardBckRemove"
                        :on-success="idCardBackSuccess"
                        :before-upload="beforeIdCardBackUpload"
                        :on-change="handleChange"
                        ref="idCardBack">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <i class="warn">法人身份证背面*1MB以内JPG/PNG图片</i>
                    </span>
                  </span>
                </li>-->
                <li class="submit-item">
                  <span class="title">证件类型</span>
                  <span class="entry">
                    <select class="normal-select" v-model="submitData.certificateType">
                      <option v-for="item in papers" :value="item.type">{{item.text}}</option>
                    </select>
                  </span>
                </li>
                <li class="submit-item">
                  <span class="title">营业执照编号</span>
                  <span class="entry">
                    <input type="text" v-model="submitData.businessLicense" placeholder="请输入营业执照编号">
                  </span>
                </li>
                <li class="submit-item">
                  <span class="title">营业执照</span>
                  <span class="entry">
                    <span class="upload-wrapper">
                      <el-upload
                        :action="pictureUrl"
                        list-type="picture-card"
                        :data="businessLicense"
                        :headers="headers"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="runRemove"
                        :on-success="runSuccess"
                        :before-upload="beforeBusinessUpload"
                        :on-change="handleChange"
                        ref="run">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <i class="warn">营业执照副本（加盖公章 ）*1MB以内JPG/PNG图片</i>
                    </span>
                  </span>
                </li>
              </ul>
              <ul class="submit-wrapper" v-if="submitData.certificateType===0">
                <li class="submit-item">
                  <span class="title">组织机构代码</span>
                  <span class="entry">
                    <input type="text" v-model="submitData.organizationCode" placeholder="请输入组织机构代码">
                  </span>
                </li>
                <li class="submit-item">
                  <span class="title">组织机构代码</span>
                  <span class="entry">
                    <span class="upload-wrapper">
                      <el-upload
                        :action="pictureUrl"
                        list-type="picture-card"
                        :data="organizationData"
                        :headers="headers"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="institutionRemove"
                        :on-success="institutionSuccess"
                        :before-upload="beforeOrganizationUpload"
                        :on-change="handleChange"
                        ref="institution">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <i class="warn">组织机构代码证副本（加盖公章 ）*1MB以内JPG/PNG图片</i>
                    </span>
                  </span>
                </li>
                <li class="submit-item">
                  <span class="title">税务登记号</span>
                  <span class="entry">
                    <input type="text" v-model="submitData.taxRegistrationLicense" placeholder="请输入税务登记号">
                  </span>
                </li>
                <li class="submit-item">
                  <span class="title">税务登记证</span>
                  <span class="entry">
                    <span class="upload-wrapper">
                      <el-upload
                        :action="pictureUrl"
                        list-type="picture-card"
                        :data="taxData"
                        :headers="headers"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="taxRemove"
                        :on-success="taxSuccess"
                        :before-upload="beforeTaxUpload"
                        :on-change="handleChange"
                        ref="tax">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <i class="warn">税务登记证副本（加盖公章 ）*1MB以内JPG/PNG图片</i>
                    </span>
                  </span>
                </li>
              </ul>
              <div class="submit-button">
                <span class="button" @click="_confirmSecondStep">
                  提交认证
                </span>
              </div>
            </div>
            <div v-show="control.step===3" class="submit-third">
              <div class="success-wrapper">
                <div class="success-content">
                  恭喜您已认证完成，请等待审核！
                </div>
                <div class="success-link">
                  <span class="link" @click="_linkIndex">众农联首页</span>
                  <span class="link" @click="_linkAdmin">前往管理后台</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-wrapper">
        <v-foot></v-foot>
      </div>
    </div>
    <v-loading :state="loadingShow"></v-loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event from '../../common/emit'
  import Footer from '@/components/footer/footer.vue'
  import citySelect from '@/components/citySelect/citySelect.vue'
  import Loading from '@/components/loading/loading.vue'
  import cMethods from '../../common/common'
  let regMobilePhone = /^1[34578]\d{9}$/;
  let regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  let idCard = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let regTitle = /^0[0-9]{2,3}$/;
  let regTelNum = /^([2-9][0-9]{6,7})$/;
  export default {
    components: {
      'v-foot': Footer,
      'v-citySelect': citySelect,
      'v-loading': Loading
    },
    data() {
      return {
        headers: {
          token: ''
        },
        submitUrl: '/web/corporateEntity/saveCorporate',
        pictureUrl: '/web/corporateEntity/uploadMultiparts',
        selectInformation: {
          Url: '/web/corporateEntity/getSeleData',
          data: {
            dicType: 'XZ'
          }
        },
        dialogImageUrl: '',
        dialogVisible: false,
        loadingShow: false,
        addressCode: {},
        papers: [
          {
            text: '三证合一',
            type: 1
          },{
            text: '企业三证',
            type: 0
          }
        ],
        corporateType: [],
        type: [],
        control: {
          papers: '',
          step: 1,
          logo: 0,
          run: 0,
          institution: 0,
          tax: 0,
          idCard:0,//正面
          idCardBack:0//反面
        },
        logoData: {
          fileName: '',
          fileType: ''
        },
        businessLicense: {
          fileName: '',
          fileType: ''
        },
        organizationData: {
          fileName: '',
          fileType: ''
        },
        taxData: {
          fileName: '',
          fileType: ''
        },
        idCardData:{
          fileName:'',
          fileType:''
        },
/*        idCardBackData:{
          fileName:'',
          fileType:''
        },*/
        phoneConcat:{
          title:'',
          content:'',
        },
        submitData: {
          corporateName: '',//企业名称
          corporation: '',//法人姓名（新增）
          corporationTel: '',//法人电话（新增）
          corporateType: '',//企业性质
          addressCode: '010101',//企业地址地区代码（废弃）
          detailAddress: '',//企业详细地址
          corpEmail: '',//企业邮箱（新增）
          corpWebsite: '',//企业官网（新增）
          phone: '',//企业座机（修改）
          type: '',//申请类型
          contactName: '',//联系人姓名（废弃）
          contactQq: '',//联系人QQ（废弃）
          contactPhone: '',//联系人电话（废弃）
          contactEmail: '',//联系人邮箱（废弃）
          corporateLogo: '',//企业logo图片路径
          corporationId:'',//法人身份证号
          corpIdFront:'',//法人身份证复印件正面
          /*corpIdBack:'',//法人身份证复印件反面*/
          certificateType: '',//证件类型(三证合一什么的)
          businessLicense: '',//营业执照编号
          businessLicensePic: '',//营业执照图片路径
          organizationCode: '',//组织机构代码
          organizationCodePic: '',//组织机构代码证图片路径
          taxRegistrationLicense: '',//税务登记号
          taxRegistrationPic: '',//税务登记证图片路径
          mainCamp: '',//主营
          viceCamp: '',//副营（新增）
          scale: '',//规模
          corporateDesc: '',//企业介绍（废弃）
          rankCode: '',//企业等级代码
          status: ''//企业状态
        }
      };
    },
    methods: {
      logoSuccess(file, fileList){//logo上传
        this.control.logo = fileList.length;
        this.$refs.logo.$el.lastChild.style.display = 'none';
      },
      logoRemove(file, fileList){//logo移除
        this.control.logo = fileList.length;
        this.submitData.corporateLogo = '';
        if (fileList.length === 0) {
          this.$refs.logo.$el.lastChild.style.display = 'block';
        }
      },
      runSuccess(file, fileList){//营业执照上传
        this.control.run = fileList.length;
        this.$refs.run.$el.lastChild.style.display = 'none';
      },
      runRemove(file, fileList){
        this.control.run = fileList.length;
        this.submitData.businessLicensePic = '';
        if (fileList.length === 0) {//营业执照移除
          this.$refs.run.$el.lastChild.style.display = 'block';
        }
      },
      institutionSuccess(file, fileList){//机构代码上传
        this.control.institution = fileList.length;
        this.$refs.institution.$el.lastChild.style.display = 'none';
      },
      institutionRemove(file, fileList){//机构代码移除
        this.submitData.organizationCodePic = '';
        this.control.institution = fileList.length;
        if (fileList.length === 0) {
          this.$refs.institution.$el.lastChild.style.display = 'block';
        }
      },
      taxSuccess(file, fileList){//税务登记上传
        this.control.tax = fileList.length;
        this.$refs.tax.$el.lastChild.style.display = 'none';
      },
      taxRemove(file, fileList){//税务登记移除
        this.submitData.taxRegistrationPic = '';
        this.control.tax = fileList.length;
        if (fileList.length === 0) {
          this.$refs.tax.$el.lastChild.style.display = 'block';
        }
      },
      idCardSuccess(file,fileList){
        this.control.idCard = fileList.length;
        this.$refs.idCard.$el.lastChild.style.display = 'none';
      },
      idCardRemove(file,fileList){
        this.submitData.corpIdFront = '';
        this.control.idCard = fileList.length;
        if (fileList.length === 0) {
          this.$refs.idCard.$el.lastChild.style.display = 'block';
        }
      },

    /*  idCardBackSuccess(file,fileList){
        this.control.idCardBack = fileList.length;
        this.$refs.idCardBack.$el.lastChild.style.display = 'none';
      },
      idCardBckRemove(file,fileList){
        this.submitData.corpIdBack = '';
        this.control.idCardBack = fileList.length;
        if (fileList.length === 0) {
          this.$refs.idCardBack.$el.lastChild.style.display = 'block';
        }
      },*/

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      beforeAvatarUpload(file) {
        this.loadingShow = true;
        this.submitData.corporateLogo = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        this.logoData.fileName = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = (file.size / 1024 / 1024) < 1;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
          this.loadingShow = false;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          this.loadingShow = false;
        }
        return isJPG && isLt2M;
      },
      beforeBusinessUpload(file){
        this.loadingShow = true;
        this.submitData.businessLicensePic = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        this.businessLicense.fileName = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = (file.size / 1024 / 1024) < 1;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
          this.loadingShow = false;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          this.loadingShow = false;
        }
        return isJPG && isLt2M;
      },
      beforeOrganizationUpload(file){
        this.loadingShow = true;
        this.submitData.organizationCodePic = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        this.organizationData.fileName = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = (file.size / 1024 / 1024) < 1;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
          this.loadingShow = false;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          this.loadingShow = false;
        }
        return isJPG && isLt2M;
      },
      beforeTaxUpload(file){
        this.loadingShow = true;
        this.submitData.taxRegistrationPic = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        this.taxData.fileName = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = (file.size / 1024 / 1024) < 1;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
          this.loadingShow = false;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          this.loadingShow = false;
        }
        return isJPG && isLt2M;
      },
      beforeIdCardUpload(file){
        this.loadingShow = true;
        this.submitData.corpIdFront = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        this.idCardData.fileName = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = (file.size / 1024 / 1024) < 1;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
          this.loadingShow = false;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          this.loadingShow = false;
        }
        return isJPG && isLt2M;
      },
   /*   beforeIdCardBackUpload(file){
        this.loadingShow = true;
        this.submitData.corpIdBack = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        this.idCardBackData.fileName = file.name.substring(0, file.name.length - 4) + file.uid + file.name.substr(-4);
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = (file.size / 1024 / 1024) < 1;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
          this.loadingShow = false;
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!');
          this.loadingShow = false;
        }
        return isJPG && isLt2M;
      },*/

      handleChange(){
        this.loadingShow = false;
      },
      _getData(){
        this.headers.token = cMethods.getCookie('token');

        //获取cookie存的内容
        let submitData = cMethods.getCookie('submitData');//获取存储的所有数据
        let phoneConcat = cMethods.getCookie('phoneConcat');//获取存储的座机
        let logoPath = cMethods.getCookie('logoPath');//企业logo

        if(submitData!==null&&submitData!==''&&submitData!==undefined){
          this.submitData = JSON.parse(cMethods.decode(submitData));
        }else {
          this.submitData.corpEmail = this.$router.history.current.query.user;
        }

        if(phoneConcat!==null&&phoneConcat!==''&&phoneConcat!==undefined){
          this.phoneConcat = JSON.parse(cMethods.decode(phoneConcat));
        }


      },
      //获取地址code
      hah(v){
        this.addressCode = v;
      },
      _getCitySelect(){
        let _this = this;
        Event.$on('throwData', function (v) {
          _this.hah(v);
        })
      },
      _confirmFirstStep(){
        if (this.submitData.corporateName === '') {
          this.$message.warning('请填写企业名称！');
          return false
        }
        if(this.submitData.corporation === ''){
          this.$message.warning('请填写法人代表姓名！');
          return false
        }
        if(this.submitData.corporationTel === ''){
          this.$message.warning('请填写法人代表电话！');
          return false
        } else if (!regMobilePhone.test(this.submitData.corporationTel)) {
          this.$message.warning('请输入正确的手机格式！');
          return false
        }

        if (this.submitData.scale === '') {
          this.$message.warning('请填写企业规模！');
          return false
        }
        if (this.submitData.mainCamp === '') {
          this.$message.warning('请填写企业主营产品！');
          return false
        }
        if (this.submitData.viceCamp === '') {
          this.$message.warning('请填写企业副营产品！');
          return false
        }
        /*if (this.addressCode.district.addressCode === '' || this.addressCode.district.addressCode === undefined) {
          this.$message.warning('请选择企业所在地区！');
          return false
        } else {
          this.submitData.addressCode = this.addressCode.district.addressCode;
        }*/
        if (this.submitData.detailAddress === '') {
          this.$message.warning('请输入企业详细地址！');
          return false
        }
        if (this.phoneConcat.title===''||this.phoneConcat.content==='') {
          this.$message.warning('请输入公司座机！');
          return false
        }
        if (this.submitData.corpEmail === '') {
          this.$message.warning('请输入企业邮箱！');
          return false
        } else if (!regEmail.test(this.submitData.corpEmail)) {
          this.$message.warning('请输入正确的企业邮箱格式！');
          return false
        }
       /* if (this.submitData.contactName === '') {
          this.$message.warning('请输入联系人姓名！');
          return false
        }
        if (this.submitData.contactQq === '') {
          this.$message.warning('请输入联系人QQ！');
          return false
        }*/
        /*if (this.submitData.contactPhone === '') {
          this.$message.warning('请输入联系人手机！');
          return false
        } else if (!regMobilePhone.test(this.submitData.contactPhone)) {
          this.$message.warning('请输入正确的手机格式！');
          return false
        }
        */
        this.submitData.phone = this.phoneConcat.title+this.phoneConcat.content;
        this.control.step = 2;
      },
      _confirmSecondStep(){
        if (this.control.logo < 1) {
          this.$message.warning('请先上传企业LOGO！');
          return false
        } else if (this.control.logo > 1) {
          this.$message.warning('企业LOGO最多上传一张！');
          return false
        }
        if (this.submitData.corporationId === '') {
          this.$message.warning('请填写法人身份证号！');
          return false
        }else if(!idCard.test(this.submitData.corporationId)){
          this.$message.warning('请输入正确的身份证格式！');
          return false
        }
        if (this.control.idCard < 1) {
          this.$message.warning('请上传法人身份证复印件正反面！');
          return false
        } else if (this.control.idCard > 1) {
          this.$message.warning('法人身份证复印件图片最多上传一张！');
          return false
        }
        if (this.submitData.businessLicense === '') {
          this.$message.warning('请填写营业执照编号！');
          return false
        }
        if (this.control.run < 1) {
          this.$message.warning('请上传营业执照图片！');
          return false
        } else if (this.control.run > 1) {
          this.$message.warning('营业执照图片最多上传一张！');
          return false
        }
        if (this.submitData.certificateType === '企业三证' && this.submitData.organizationCode === '') {
          this.$message.warning('请填写组织机构代码！');
          return false
        }
        if (this.submitData.certificateType === '企业三证' && this.control.institution < 1) {
          this.$message.warning('请上传组织机构代码证图片！');
          return false
        } else if (this.submitData.certificateType === '企业三证' && this.control.institution > 1) {
          this.$message.warning('组织机构代码证图片最多上传一张！');
          return false
        }
        if (this.submitData.certificateType === '企业三证' && this.submitData.taxRegistrationLicense === '') {
          this.$message.warning('请填写税务登记号！');
          return false
        }
        if (this.submitData.certificateType === '企业三证' && this.control.tax < 1) {
          this.$message.warning('请上传税务登记证图片！');
          return false
        } else if (this.submitData.certificateType === '企业三证' && this.control.tax > 1) {
          this.$message.warning('税务登记证图片最多上传一张！');
          return false
        }
        /*if (this.submitData.corporateDesc === '') {
          this.$message.warning('请填写企业介绍！');
          return false
        }*/
        this.loadingShow = true;
        let token = cMethods.getCookie('token');
        this.$http.post(this.submitUrl, this.submitData, {emulateJSON: true, headers: {token: token}}).then((res) => {
          let response = res.body;
          if (response.code === 200) {
            this.$message.success('已成功申请认证，将尽快为您认证通过！');
            this.control.step = 3;
            this.loadingShow = false;
          } else {
            this.$message.error(response.msg);
            this.loadingShow = false
          }
        }, (error) => {
          console.log('调用申请认证接口错误！');
          this.loadingShow = false
        })
      },
      _getSelectInformation(){
        this.$http.post(this.selectInformation.Url, this.selectInformation.data, {
          emulateJSON: true
        }).then((resp) => {
          let response = resp.body;
          if (response.code === 200) {
            this.corporateType = response.data.objectList;
            this.type = response.data.typeList;
            if(this.submitData.corporateType===''){
              this.submitData.corporateType = response.data.objectList[0].dicName;
            }
            if(this.submitData.type===''){
              this.submitData.type = response.data.typeList[0].roleItemId;
            }
            if(this.submitData.certificateType===''){
              this.submitData.certificateType = this.papers[0].type;
            }
          }
        })
      },
      _linkIndex(){
        this.$router.push('/index')
      },
      _linkAdmin(){
        window.location.href = cMethods.getHref();
      },
      _watch(){
        this.$watch('phoneConcat',function(n,o){
          if(!regTitle.test(n.title)){
            this.phoneConcat.title = n.title.substring(0,4)
          }
          if(!regTelNum.test(n.content)){
            this.phoneConcat.content = n.content.substring(0,8)
          }
          cMethods.setCookie('phoneConcat',cMethods.encode(JSON.stringify(n)))
        },{
          deep:true
        });
        this.$watch('submitData',function(n,o){
          cMethods.setCookie('submitData',cMethods.encode(JSON.stringify(n)))
        },{
          deep:true
        });
      },

    },
    created(){
      this._getSelectInformation();
      this._getData();
      this._watch()
    },
    mounted(){
      this._getCitySelect();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "authentication.styl"
</style>
