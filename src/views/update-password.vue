<template>
  <div :style="{ padding: '30px' }">
    <el-form
      :style="{
        padding: '40px 25% 40px 10%',
        borderColor: '#eee',
        borderStyle: 'solid',
        borderWidth: '0px 0 0',
        background: 'none',
      }"
      class="add-update-preview"
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="180px"
    >
      <el-form-item
        :style="{
          border: '0px solid #eee',
          width: '100%',
          padding: '0',
          margin: '0 0 26px 0',
          display: 'inline-block',
        }"
        label="原密码"
        prop="oldPassword"
      >
        <el-input type="oldPassword" v-model="ruleForm.oldPassword"></el-input>
      </el-form-item>
      <el-form-item
        :style="{
          border: '0px solid #eee',
          width: '100%',
          padding: '0',
          margin: '0 0 26px 0',
          display: 'inline-block',
        }"
        label="新密码"
        prop="password"
      >
        <el-input type="oldPassword" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item
        :style="{
          border: '0px solid #eee',
          width: '100%',
          padding: '0',
          margin: '0 0 26px 0',
          display: 'inline-block',
        }"
        label="确认密码"
        prop="repassword"
      >
        <el-input type="oldPassword" v-model="ruleForm.repassword"></el-input>
      </el-form-item>
      <el-form-item :style="{ padding: '0', margin: '20px 0 0' }">
        <el-button
          class="btn3"
          :style="{
            border: '0px solid #ccc',
            cursor: 'pointer',
            padding: '0 10px',
            margin: '0 10px 0 0',
            color: '#fff',
            borderRadius: '4px',
            background: '#32c67a',
            width: 'auto',
            fontSize: '16px',
            minWidth: '110px',
            height: '40px',
          }"
          type="primary"
          @click="onUpdateHandler"
        >
          <span
            class="icon iconfont icon-xihuan"
            :style="{
              margin: '0 2px',
              fontSize: '14px',
              color: '#fff',
              display: 'none',
              height: '40px',
            }"
          ></span>
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      ruleForm: {},
      user: {},
      rules: {
        oldPassword: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "blur",
          },
        ],
        repassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    onLogout() {
      this.$storage.remove("Token");
      this.$router.replace({ name: "login" });
    },
    // 修改密码
    async onUpdateHandler() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.ruleForm.password != this.ruleForm.repassword) {
            this.$message.error("两次密码输入不一致");
            return;
          }
          this.$http
            .put("uppwd", this.ruleForm)
            .then((response) => {
              if (response && response.data.success) {
                this.$message({
                  message: "修改密码成功,下次登录系统生效",
                  type: "success",
                  duration: 1500,
                  onClose: () => {},
                });
              } else {
                this.$message.error(response.data.data);
              }
            })
            .catch((error) => {
              this.$message.error("修改失败");
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-date-editor.el-input {
  width: auto;
}

.add-update-preview .el-form-item /deep/ .el-form-item__label {
  padding: 0 10px 0 0;
  color: #6e6e6e;
  font-weight: 500;
  width: 180px;
  font-size: 15px;
  line-height: 40px;
  text-align: right;
}

.add-update-preview .el-form-item /deep/ .el-form-item__content {
  margin-left: 180px;
}

.add-update-preview .el-input /deep/ .el-input__inner {
  border: 1px solid #e8e8e8;
  border-radius: 0px;
  padding: 0 12px;
  color: #666;
  width: 100%;
  font-size: 15px;
  min-width: 50%;
  height: 40px;
}

.add-update-preview .el-select /deep/ .el-input__inner {
  border: 1px solid #e8e8e8;
  border-radius: 0px;
  padding: 0 10px;
  color: #666;
  width: 100%;
  font-size: 15px;
  height: 40px;
}

.add-update-preview .el-date-editor /deep/ .el-input__inner {
  border: 1px solid #e8e8e8;
  border-radius: 0px;
  padding: 0 10px 0 30px;
  color: #666;
  background: #fff;
  width: 100%;
  font-size: 15px;
  height: 40px;
}

.add-update-preview /deep/ .el-upload--picture-card {
  background: transparent;
  border: 0;
  border-radius: 0;
  width: auto;
  height: auto;
  line-height: initial;
  vertical-align: middle;
}

.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
  border: 1px solid #e8e8e8;
  cursor: pointer;
  border-radius: 0px;
  color: #666;
  background: #fff;
  width: 90px;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  height: 60px;
}

.add-update-preview /deep/ .el-upload .el-icon-plus {
  border: 1px solid #e8e8e8;
  cursor: pointer;
  border-radius: 0px;
  color: #666;
  background: #fff;
  width: 90px;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  height: 60px;
}

.add-update-preview .el-textarea /deep/ .el-textarea__inner {
  border: 1px solid #e8e8e8;
  border-radius: 0px;
  padding: 12px;
  color: #666;
  background: #fff;
  width: auto;
  font-size: 15px;
  min-width: 100%;
  height: 120px;
}

.add-update-preview .btn3 {
  border: 0px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
  padding: 0 10px;
  margin: 0 10px 0 0;
  color: #fff;
  background: #32c67a;
  width: auto;
  font-size: 16px;
  min-width: 110px;
  height: 40px;
}

.add-update-preview .btn3:hover {
  opacity: 0.8;
}
</style>
