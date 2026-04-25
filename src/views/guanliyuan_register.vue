
<template>
	<div>
		<div class="register-container">
			<el-form ref="ruleForm" class="rgs-form animate__animated animate__" :model="ruleForm" :rules="rules">
				<div class="rgs-form2">
					<div class="title">管理员</div>
					<el-form-item class="list-item" v-if="type != 'info'"prop="touxiang">
						<div class="lable ">头像：</div>
                        <file-upload
                            tip="点击上传头像"
                            action="upload"
                            :limit="3"
                            :multiple="true"
                            :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
                            @change="touxiangUploadChange"
                        ></file-upload>
					</el-form-item>
					<el-form-item class="upload" v-else prop="touxiang" >
						<el-image v-if="ruleForm.touxiang" style="width: 100px; height: 100px"
							:src="value" v-for="(value, index) in $imgUrls(ruleForm.touxiang)" :key="index" :preview-src-list="$imgUrls(ruleForm.touxiang)">
						</el-image>
					</el-form-item>
					
                    <el-form-item class="list-item" v-if="type != 'info'" prop="xingming">
						<div class="lable ">姓名：</div>
                        <el-input v-model="ruleForm.xingming" placeholder="姓名" clearable :readonly="ro.xingming"></el-input>
                    </el-form-item>
					<el-form-item v-else class="list-item" prop="xingming" >
						<el-input v-model="ruleForm.xingming" placeholder="姓名" readonly></el-input>
					</el-form-item>
					
                    <el-form-item class="list-item" v-if="type != 'info'" prop="dengluming">
						<div class="lable ">登录名：</div>
                        <el-input v-model="ruleForm.dengluming" placeholder="登录名" clearable :readonly="ro.dengluming"></el-input>
                    </el-form-item>
					<el-form-item v-else class="list-item" prop="dengluming" >
						<el-input v-model="ruleForm.dengluming" placeholder="登录名" readonly></el-input>
					</el-form-item>
					
                    <el-form-item class="list-item" v-if="type != 'info'" prop="mima">
						<div class="lable ">密码：</div>
                        <el-input v-model="ruleForm.mima" placeholder="密码" clearable :readonly="ro.mima" show-password></el-input>
                    </el-form-item>
					<el-form-item v-else-if="type=='add'" class="list-item" prop="mima" >
						<el-input v-model="ruleForm.mima" placeholder="密码" readonly show-password></el-input>
					</el-form-item>
					
                    <el-form-item class="list-item" v-if="type != 'info'" prop="nianling">
						<div class="lable ">年龄：</div>
                        <el-input v-model="ruleForm.nianling" placeholder="年龄" clearable :readonly="ro.nianling"></el-input>
                    </el-form-item>
					<el-form-item v-else class="list-item" prop="nianling" >
						<el-input v-model="ruleForm.nianling" placeholder="年龄" readonly></el-input>
					</el-form-item>
					<el-form-item class="list-item" v-if="type != 'info'" prop="xingbie">
						<div class="lable ">性别：</div>
                        <el-select :disabled="ro.xingbie"  v-model="ruleForm.xingbie" placeholder="请选择性别" >
                            
                <el-option
                    v-for="(item,index) in ['男','女']"
                    v-bind:key="index"
                    :label="item"
                    :value="item">
                </el-option>
                
                        </el-select>
					</el-form-item>
					<el-form-item v-else class="list-item" prop="xingbie" >
						<el-input v-model="ruleForm.xingbie" placeholder="性别" readonly></el-input>
					</el-form-item>
					
                    <el-form-item class="list-item" v-if="type != 'info'" prop="dianhua">
						<div class="lable ">电话：</div>
                        <el-input v-model="ruleForm.dianhua" placeholder="电话" clearable :readonly="ro.dianhua"></el-input>
                    </el-form-item>
					<el-form-item v-else class="list-item" prop="dianhua" >
						<el-input v-model="ruleForm.dianhua" placeholder="电话" readonly></el-input>
					</el-form-item>
					
					<el-form-item class="list-item">
						<div class="lable required">邮箱：</div>
						<div style="display: flex;flex: 1;">
							<el-input v-model="ruleForm.youxiang" type="text" id="email" name="email"
								placeholder="请输入邮箱" autocomplete="off" class="emailInput" />
							<el-button v-if="isEndFlag" @click="sendemailcode" id="sendemailcode" type="button"
								class="el-btn">发送验证码</el-button>
							<el-button v-if="!isEndFlag" disabled="disabled" type="button" class="el-btn">{{ count
							}}秒后重发</el-button>
						</div>
					</el-form-item>
					<el-form-item class="list-item">
						<div class="lable required">验证码：</div>
						<el-input v-model="emailcode" type="text" id="emailcode" name="emailcode" placeholder="请输入验证码"
							autocomplete="off" class="el-input" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<button type="button" class="r-btn" @click="submitForm()">注册</button>
						</div>
						<div class="register-btn2">
							<div class="r-login" @click="goLogin()">已有账号，直接登录</div>
						</div>
					</div>
				</div>
			</el-form>
		</div>
	</div>
</template>
<script>
import 'animate.css';
import { 
	isEmail, isMobile, isPhone, isURL, checkIdCard, isNumber
} from "@/utils/validate";
export default {
	data() {
		return {
			ro: {},
			type:"add",
			ruleForm: {
				zhuangtai: "启用",
				type:"guanliyuan",
				touxiang: '',
				xingming: '',
				dengluming: '',
				mima: '',
				nianling: 0,
				xingbie: '',
				dianhua: '',
				youxiang: ''
				},
			rules: {
					touxiang: [
					
					
					
					
					
					
				],xingming: [
					
					
					
					
					
					
				],dengluming: [
					
					
					
					
					
					
				],mima: [
					
					
					
					
					
					
				],nianling: [
					{ validator: (rule, value, callback)=>{ if (isNumber(value)){callback()}else{callback(new Error("请输入正确的年龄"));} }, trigger: 'blur' },
					
					
					
					
					
				],xingbie: [
					
					
					
					
					
					
				],dianhua: [
					
					
					
					
					
					
				],youxiang: [
					
					
					
					
					
					
				]
				},
			emailcode: '',
			token: '',
			//倒计时60s
			count: 60,
			//倒计时定时器
			inter: null,
			//倒计结束标识
			isEndFlag: true,
            
		}
	},
	created() {
		
	},
	methods: {
		goLogin() {
			this.$router.push('/login');
		},
		sendemailcode() {
			if (!this.ruleForm.youxiang) {
				this.$message.error("邮箱不能为空");
				return
			}
			if (this.ruleForm.youxiang && (!isEmail(this.ruleForm.youxiang))) {
				this.$message.error('请输入正确的邮箱格式');
				return
			}
			this.isEndFlag = false;
			var _this = this;
			this.inter = window.setInterval(function () {
				_this.count = _this.count - 1;
				if (_this.count <= 0) {
					window.clearInterval(_this.inter);
					_this.isEndFlag = true;
					_this.count = 60;
				}
			}, 1000);
			this.$http({
				url: "sendemail?email=" + this.ruleForm.youxiang,
				method: "get",
				params: {}
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.token = data.data
					this.$message.success('发送成功');
				} else {
					this.$message.error('服务器异常，请稍后重试')
				}
			});
		},
		submitForm() {
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					this.$http.post("register", { ...this.ruleForm, token: this.token, code: this.emailcode }).then(res => {
						if (res.data.code === 0) {
							this.$message({
								message: '注册成功',
								type: 'success',
								duration: 1500,
								onClose: () => {
									this.$router.push('/login');
								}
							});
						} else {
							this.$message.error(res.data.data);
						}
					});
				} else {
					return false;
				}
			});
		},
		touxiangUploadChange(fileUrls) {
				this.ruleForm.touxiang = fileUrls;
			},
	
            
    
    
    
	}
}
</script>

<style lang="scss" scoped>
.register-container {
	position: relative;
	background: url(http://codegen.caihongy.cn/20241007/5551afe518fb4bcb986c70aeecdcfcb1.jpg) no-repeat center center / 100% 100%;
	background: url(http://codegen.caihongy.cn/20241007/5551afe518fb4bcb986c70aeecdcfcb1.jpg) no-repeat center center / 100% 100%;
	display: flex;
	width: 100%;
	min-height: 100vh;
	justify-content: center;
	align-items: center;
	position: relative !important;

	.rgs-form {
		.rgs-form2 {
			width: 100%;
		}

		border-radius: 30px;
		padding: 40px 80px 20px 130px;
		box-shadow: inset 0px 0px 0px 0px #000;
		margin: 80px auto 40px;
		background: #fff;
		width: 600px;
		position: relative;
		height: auto;

		.title {
			margin: 0 0 0px 0;
			color: #333;
			top: -60px;
			left: 0;
			background: none;
			font-weight: 600;
			width: 100%;
			font-size: 22px;
			line-height: 40px;
			position: absolute;
			text-align: center;
		}

		.list-item {
			border: 1px solid #000;
			border-radius: 8px;
			padding: 0 0 0 4px;
			margin: 0 0 20px;
			width: 100%;
			position: relative;
			height: auto;

			/deep/ .el-form-item__content {
				display: block;
			}

			.lable {
				padding: 0 10px 0 0;
				color: #333;
				left: -130px;
				width: 130px;
				font-size: 16px;
				line-height: 34px;
				position: absolute !important;
				text-align: right;
			}

			.el-input {
				width: 100%;
			}

			.el-input /deep/ .el-input__inner {
				border: 0;
				border-radius: 8px;
				padding: 0 10px;
				color: #666;
				width: 100%;
				font-size: 16px;
				height: 40px;
			}

			.el-input /deep/ .el-input__inner:focus {
				border: 0;
				border-radius: 8px;
				padding: 0 10px;
				outline: none;
				color: #666;
				width: 100%;
				font-size: 16px;
				height: 40px;
			}

			.el-input-number {
				width: 100%;
			}

			.el-input-number /deep/ .el-input__inner {
				text-align: center;
				border: 0;
				border-radius: 8px;
				padding: 0 10px;
				color: #666;
				width: 100%;
				font-size: 16px;
				height: 40px;
			}

			.el-input-number /deep/ .el-input__inner:focus {
				border: 0;
				border-radius: 8px;
				padding: 0 10px;
				outline: none;
				color: #666;
				width: 100%;
				font-size: 16px;
				height: 40px;
			}

			.el-input-number /deep/ .el-input-number__decrease {
				display: none;
			}

			.el-input-number /deep/ .el-input-number__increase {
				display: none;
			}

			.el-select {
				width: 100%;
			}

			.el-select /deep/ .el-input__inner {
				border: 0;
				border-radius: 8px;
				padding: 0 10px;
				color: #666;
				width: 100%;
				font-size: 16px;
				height: 38px;
			}

			.el-select /deep/ .el-input__inner:focus {
				border: 0;
				border-radius: 8px;
				padding: 0 10px;
				outline: none;
				color: #666;
				width: 100%;
				font-size: 16px;
				height: 38px;
			}

			.el-date-editor {
				width: 100%;
			}

			.el-date-editor /deep/ .el-input__inner {
				border: 0;
				border-radius: 8px;
				padding: 0 10px 0 30px;
				color: #666;
				width: 100%;
				font-size: 16px;
				height: 38px;
			}

			.el-date-editor /deep/ .el-input__inner:focus {
				border: 0;
				border-radius: 8px;
				padding: 0 10px 0 30px;
				outline: none;
				color: #666;
				width: 100%;
				font-size: 16px;
				height: 38px;
			}

			.el-date-editor.el-input {
				width: 100%;
			}

			/deep/ .el-upload--picture-card {
				background: transparent;
				border: 0;
				border-radius: 0;
				width: auto;
				height: auto;
				line-height: initial;
				vertical-align: middle;
			}

			/deep/ .upload .upload-img {
				border: 1px solid #efeff7;
				cursor: pointer;
				border-radius: 8px;
				margin: 10px 0 0 10px;
				color: #999;
				background: #fff;
				width: 90px;
				font-size: 24px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}

			/deep/ .el-upload-list .el-upload-list__item {
				border: 1px solid #efeff7;
				cursor: pointer;
				border-radius: 8px;
				margin: 10px 0 0 10px;
				color: #999;
				background: #fff;
				width: 90px;
				font-size: 24px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}

			/deep/ .el-upload .el-icon-plus {
				border: 1px solid #efeff7;
				cursor: pointer;
				border-radius: 8px;
				margin: 10px 0 0 10px;
				color: #999;
				background: #fff;
				width: 90px;
				font-size: 24px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}

			/deep/ .el-upload__tip {
				padding: 0 0 0 10px;
				color: #666;
				font-size: 15px;
			}

			/deep/ .el-input__inner::placeholder {
				color: #999;
				font-size: 16px;
			}

			.required {
				position: relative;
			}

			.required::after {
				color: red;
				left: 115px;
				line-height: 42px;
				position: inherit;
				content: "*";
				order: -1;
			}

			.editor {
				border: 0;
				background: #fff;
				width: 100%;
				height: auto;
			}

			.editor>.avatar-uploader {
				line-height: 0;
				height: 0;
			}
		}

		.list-item.youxiang {
			input {
				border: 0;
				border-radius: 8px 0 0 8px;
				padding: 0 10px;
				margin: 0;
				color: #666;
				background: #fff;
				flex: 1;
				width: 100%;
				font-size: 14px;
				height: 40px;
			}

			input:focus {
				border: 0;
				border-radius: 8px 0 0 8px !important;
				padding: 0 10px;
				outline: none;
				color: #666;
				width: 100%;
				font-size: 14px;
				height: 40px;
			}

			input::placeholder {
				color: #999;
				font-size: 16px;
			}

			button {
				border: 0px solid #e6e6e6;
				cursor: pointer;
				border-radius: 0 8px 8px 0;
				padding: 0;
				margin: 0 0 0 10px;
				color: #333;
				background: #fff2d5;
				width: 150px;
				font-size: 15px;
				height: 40px;
			}

			button:hover {
				opacity: 1;
			}
		}

		.register-btn {
			display: flex;
			width: 100%;
			flex-wrap: wrap;
		}

		.register-btn1 {
			width: 100%;
		}

		.register-btn2 {
			margin: 0 0 10px;
			width: 100%;
			order: -1;
		}

		.r-btn {
			border: 0px solid rgba(0, 0, 0, 1);
			cursor: pointer;
			border-radius: 0px;
			padding: 0 10px;
			margin: 0 0 10px;
			color: #fff;
			background: url(http://codegen.caihongy.cn/20241007/70b73101042347a28d9395ad94986888.png) no-repeat left center / 100% 100%;
			font-weight: 600;
			width: 100%;
			font-size: 22px;
			min-width: 68px;
			height: 66px;
		}

		.r-btn:hover {
			border: 0px solid rgba(0, 0, 0, 1);
			opacity: 0.8;
		}

		.r-login {
			cursor: pointer;
			padding: 0;
			color: #666;
			display: inline-block;
			width: 100%;
			font-size: 15px;
			line-height: 40px;
			text-align: center;
		}

		.r-login:hover {
			opacity: 1;
		}
	}
}

::-webkit-scrollbar {
	display: none;
}
</style>

