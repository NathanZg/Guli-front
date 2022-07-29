<template>
  <div class="app-container">
    <el-form
      ref="user"
      :model="member"
      :rules="validateRules"
      label-width="120px"
    >
      <el-form-item label="头像">
        <el-upload
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :before-upload="beforeAvatarUpload"
          action="http://localhost:8222/eduoss/file"
          class="avatar-uploader"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户昵称" prop="username">
        <el-input v-model="member.nickname" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="member.mobile" />
      </el-form-item>

      <el-form-item label="用户密码" prop="password">
        <el-input v-model="member.password" />
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="member.sex" clearable placeholder="请选择">
          <el-option :value="1" label="女" />
          <el-option :value="2" label="男" />
        </el-select>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input-number v-model="member.age" controls-position="right" />
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="updateMemberInfo"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import loginApi from "@/api/login";
import cookie from "js-cookie";
export default {
  data() {
    return {
      member: {
        id: "",
        mobile: "",
        nickname: "",
        sex: 2,
        age: 0,
        avatar: "",
      },
      saveBtnDisabled: false, // 保存按钮是否禁用
      imgUrl: "",
      user: {
        mobile: "",
        password: "",
      },
      loginInfo: {},
      validateRules: {
        username: [{ required: true, trigger: "blur", message: "爱输不输！不做校验了，累死爷了！" }],
        password: [
          { required: true, trigger: "blur", validator: this.validatePass },
        ],
        mobile: [
          { required: true, trigger: "blur", validator: this.checkPhone },
        ],
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  watch: {
    $route(to, from) {
      this.getUserInfo();
    },
  },
  methods: {
    logout() {
      //清空cookie
      cookie.set("guli_token", "", {
        domain: "localhost",
      });
      cookie.set("guli_ucenter", "", {
        domain: "localhost",
      });
      //跳转页面
      window.location.href = "/login";
    },
    checkPhone(rule, value, callback) {
      if (!/^1[34578]\d{9}$/.test(value)) {
        this.saveBtnDisabled = true;
        return callback(new Error("手机号码格式不正确"));
      } else {
        this.saveBtnDisabled = false;
        return callback();
      }
    },
    validatePass(rule, value, callback) {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
        this.saveBtnDisabled = true;
      } else {
        this.saveBtnDisabled = false;
        callback();
      }
    },
    //删除上传的Banner执行
    handleRemove(file, fileList) {
      this.member.avatar = "";
      this.imgUrl = "";
    },
    //上传Banner成功执行
    handleAvatarSuccess(res, file) {
      if (res.code == 20000) {
        this.member.avatar = res.data.url;
        this.imgUrl = this.member.avatar;
      }else{
        this.$message.error(res.message);
      }
    },
    //上传Banner前执行
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 <= 2;

      if (!isJPG) {
        this.$message.error("上传Banner只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传Banner大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //取消修改返回
    cancel() {
      this.$router.push({ path: "/" });
    },
    //修改讲师信息
    updateMemberInfo() {
      loginApi.updateMemberInfo(this.member).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.user.mobile = this.member.mobile;
        this.user.password = this.member.password;
        this.logout();
      });
    },
    //根据讲师id查询讲师信息
    getUserInfo() {
      var that = this;
      loginApi.getLoginInfo().then((response) => {
        if (response.data.code == 20000) {
          that.member = response.data.data.userInfo;
          that.imgUrl = that.member.avatar;
        }
      });
    },
  },
};
</script>