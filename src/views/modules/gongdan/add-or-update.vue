
<template>
	<div class="addEdit-block">
		<el-form
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="180px"
		>
		<el-form-item v-if="type != 'info'" label="订单编号" prop="dingdanbianhaoid">
                        <el-select :disabled="ro.dingdanbianhao" @change="dingdanbianhaoChange" v-model="ruleForm.dingdanbianhaoid" placeholder="请选择订单编号" >
                            
                <el-option
                    v-for="(item,index) in dingdans"
                    v-bind:key="index"
                    :label="item.dingdanbianhao"
                    :value="`${item.id}`">
                </el-option>
                
                        </el-select>
					</el-form-item>
					<el-form-item v-else class="input" label="订单编号" prop="dingdanbianhao" >
						<el-input v-model="ruleForm.dingdanbianhao" placeholder="订单编号" readonly></el-input>
					</el-form-item>
					<el-form-item class="input" v-if="type != 'info'" label="配件名称" prop="peijianmingcheng">
                        <el-input v-model="ruleForm.peijianmingcheng" placeholder="配件名称" clearable :readonly="ro.peijianmingcheng"></el-input>
                    </el-form-item>
					<el-form-item v-else class="input" label="配件名称" prop="peijianmingcheng" >
						<el-input v-model="ruleForm.peijianmingcheng" placeholder="配件名称" readonly></el-input>
					</el-form-item><el-form-item class="input" v-if="type != 'info'" label="生产数量" prop="shengchanshuliang">
                        <el-input-number v-model="ruleForm.shengchanshuliang" placeholder="生产数量" clearable :readonly="ro.shengchanshuliang"  :min="0"></el-input-number>
                    </el-form-item>
					<el-form-item v-else class="input" label="生产数量" prop="shengchanshuliang" >
						<el-input-number v-model="ruleForm.shengchanshuliang" placeholder="生产数量" :disabled="true"></el-input-number>
					</el-form-item><el-form-item class="input" v-if="type != 'info'" label="订单状态" prop="dingdanzhuangtai">
                        <el-input v-model="ruleForm.dingdanzhuangtai" placeholder="订单状态" clearable :readonly="ro.dingdanzhuangtai"></el-input>
                    </el-form-item>
					<el-form-item v-else class="input" label="订单状态" prop="dingdanzhuangtai" >
						<el-input v-model="ruleForm.dingdanzhuangtai" placeholder="订单状态" readonly></el-input>
					</el-form-item><el-form-item v-if="type != 'info'" label="生产工人" prop="shengchangongrenid">
                        <el-select :disabled="ro.shengchangongren" @change="shengchangongrenChange" v-model="ruleForm.shengchangongrenid" placeholder="请选择生产工人" >
                            
                <el-option
                    v-for="(item,index) in gongrens"
                    v-bind:key="index"
                    :label="item.xingming"
                    :value="`${item.id}`">
                </el-option>
                
                        </el-select>
					</el-form-item>
					<el-form-item v-else class="input" label="生产工人" prop="shengchangongren" >
						<el-input v-model="ruleForm.shengchangongren" placeholder="生产工人" readonly></el-input>
					</el-form-item>
					<el-form-item v-if="type != 'info'" label="打包工人" prop="dabaogongrenid">
                        <el-select :disabled="ro.dabaogongren" @change="dabaogongrenChange" v-model="ruleForm.dabaogongrenid" placeholder="请选择打包工人" >
                            
                <el-option
                    v-for="(item,index) in gongrens"
                    v-bind:key="index"
                    :label="item.xingming"
                    :value="`${item.id}`">
                </el-option>
                
                        </el-select>
					</el-form-item>
					<el-form-item v-else class="input" label="打包工人" prop="dabaogongren" >
						<el-input v-model="ruleForm.dabaogongren" placeholder="打包工人" readonly></el-input>
					</el-form-item>
					
			<el-form-item class="btn">
				<el-button class="btn3"  v-if="type!='info'" type="success" @click="onSubmit">
					<span class="icon iconfont icon-xihuan"></span>
					提交
				</el-button>
				<el-button class="btn4" v-if="type!='info'" type="success" @click="back()">
					<span class="icon iconfont icon-xihuan"></span>
					取消
				</el-button>
				<el-button class="btn5" v-if="type=='info'" type="success" @click="back()">
					<span class="icon iconfont icon-xihuan"></span>
					返回
				</el-button>
			</el-form-item>
		</el-form>
    

	</div>
</template>
<script>
	import { 
		isEmail, isMobile, isPhone, isURL, checkIdCard, isNumber
	} from "@/utils/validate";
	export default {
		data() {
			
			return {
				id: '',
				type: '',
			
			
				ro:{
					dingdanbianhao: false,
					peijianmingcheng: false,
					shengchanshuliang: false,
					dingdanzhuangtai: false,
					shengchangongren: false,
					dabaogongren: false
				},
			
				ruleForm: {
					dingdanbianhao: '',
					peijianmingcheng: '',
					shengchanshuliang: 0,
					dingdanzhuangtai: '',
					shengchangongren: '',
					dabaogongren: ''
				},
				rules: {
					dingdanbianhaoid: [
					],
					peijianmingcheng: [
					],
					shengchanshuliang: [
					],
					dingdanzhuangtai: [
					],
					shengchangongrenid: [
					],
					dabaogongrenid: [
					]
				},
				isTiaoZhuan: false,
                dingdans:[],
            gongrens:[]
			};
		},
		props: ["parent"],
		computed: {
		},
		components: {
		},
		created() {
            this.listDingdan();
        this.listGongren();
			
		},
		methods: {
			
			// 下载
			download(file){
				window.open(file)
			},
			// 初始化
			init(id,type) {
				if (id) {
					this.id = id;
				}
				this.type = type;
				if(this.type=='info'||this.type=='else'||this.type=='msg'||this.type=='edit'){
					this.info(id);
				}
			
			},
			// 多级联动参数

			info(id) {
				this.$http({
					url: 'gongdan/get?id=' + id,
					method: "get"
				}).then(({ data }) => {
					if (data && data.code === 0) {
						this.ruleForm = data.data;
						
					} else {
						this.$message.error(data.msg);
					}
				});
			},

			// 提交
			async onSubmit() {
					await this.$refs["ruleForm"].validate(async valid => {
						if (valid) {
							await this.$http({
	                            url: 'gongdan/' + (!this.ruleForm.id ? "add" : "update"),
								method: !this.ruleForm.id ? "post" : "put",
								data: {...this.ruleForm, }
							}).then(async ({ data }) => {
								if (data && data.success) {
									this.$message({
										message: "操作成功",
										type: "success",
										duration: 1500,
										onClose: () => {
											if(this.isTiaoZhuan){
												this.$router.push({
													path: "/gongdan",
												});
											}										
											this.parent.showFlag = true;
											this.parent.addOrUpdateFlag = false;
											this.parent.gongdanCrossAddOrUpdateFlag = false;
											this.parent.search();
											this.parent.contentStyleChange();
										}
									});
								} else {
									this.$message.error(data.data);
								}
							});
						}
					});
			},
			// 获取uuid
			getUUID () {
				return new Date().getTime();
			},
			// 返回
			back() {
				if(this.isTiaoZhuan){
					history.back()
				}
				this.parent.showFlag = true;
				this.parent.addOrUpdateFlag = false;
				this.parent.gongdanCrossAddOrUpdateFlag = false;
				this.parent.contentStyleChange();
			},
			
            
    
        listDingdan() {
            this.$http.get('dingdan/list')
                .then(response => {
                    this.dingdans = response.data.data;
                });
        },
        listGongren() {
            this.$http.get('gongren/list')
                .then(response => {
                    this.gongrens = response.data.data;
                });
        },
    
        dingdanbianhaoChange(val){
            this.ruleForm.dingdanbianhao = this.dingdans.find(ele=>ele.id == val).dingdanbianhao;
        },

        shengchangongrenChange(val){
            this.ruleForm.shengchangongren = this.gongrens.find(ele=>ele.id == val).xingming;
        },

        dabaogongrenChange(val){
            this.ruleForm.dabaogongren = this.gongrens.find(ele=>ele.id == val).xingming;
        }
    
			
		}
	};
</script>




<style lang="scss" scoped>
.addEdit-block {
  padding: 30px;
}
.add-update-preview {
  padding: 40px 25% 40px 10%;
  background: none;
  border-color: #eee;
  border-width: 0px 0 0;
  border-style: solid;
}
.amap-wrapper {
  width: 100%;
  height: 500px;
}

.search-box {
  position: absolute;
}

.el-date-editor.el-input {
  width: auto;
}
.add-update-preview /deep/ .el-form-item {
  border: 0px solid #eee;
  padding: 0;
  margin: 0 0 26px 0;
  display: inline-block;
  width: 100%;
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
.add-update-preview .el-form-item span.text {
  padding: 0 10px;
  color: #666;
  background: none;
  font-weight: 500;
  display: inline-block;
  font-size: 15px;
  line-height: 40px;
  min-width: 100%;
}

.add-update-preview .el-input {
  width: 100%;
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
.add-update-preview .el-input /deep/ .el-input__inner[readonly="readonly"] {
  border: 0px solid #ccc;
  cursor: not-allowed;
  border-radius: 0px;
  padding: 0 12px;
  color: #666;
  background: none;
  width: auto;
  font-size: 15px;
  height: 40px;
}
.add-update-preview .el-input-number {
  text-align: left;
  width: 100%;
}
.add-update-preview .el-input-number /deep/ .el-input__inner {
  text-align: left;
  border: 1px solid #e8e8e8;
  border-radius: 0px;
  padding: 0 12px;
  color: #666;
  width: 100%;
  font-size: 15px;
  min-width: 50%;
  height: 40px;
}
.add-update-preview .el-input-number /deep/ .is-disabled .el-input__inner {
  text-align: left;
  border: 0px solid #ccc;
  cursor: not-allowed;
  border-radius: 0px;
  padding: 0 12px;
  color: #666;
  background: none;
  width: auto;
  font-size: 15px;
  height: 40px;
}
.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
  display: none;
}
.add-update-preview .el-input-number /deep/ .el-input-number__increase {
  display: none;
}
.add-update-preview .el-select {
  width: 100%;
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
.add-update-preview .el-select /deep/ .is-disabled .el-input__inner {
  border: 0;
  cursor: not-allowed;
  border-radius: 4px;
  padding: 0 10px;
  color: #666;
  background: none;
  width: auto;
  font-size: 15px;
  height: 34px;
}
.add-update-preview .el-date-editor {
  width: 100%;
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
.add-update-preview .el-date-editor /deep/ .el-input__inner[readonly="readonly"] {
  border: 0;
  cursor: not-allowed;
  border-radius: 0px;
  padding: 0 10px 0 30px;
  color: #666;
  background: none;
  width: auto;
  font-size: 15px;
  height: 40px;
}
.add-update-preview .viewBtn {
  border: 1px solid #e8e8e8;
  cursor: pointer;
  border-radius: 0px;
  padding: 0 15px;
  margin: 0 20px 0 0;
  color: #666;
  background: #fff;
  width: auto;
  font-size: 15px;
  line-height: 34px;
  height: 34px;
  .iconfont {
    margin: 0 2px;
    color: #666;
    font-size: 16px;
    height: 34px;
  }
}
.add-update-preview .viewBtn:hover {
  opacity: 0.8;
}
.add-update-preview .downBtn {
  border: 1px solid #e8e8e8;
  cursor: pointer;
  border-radius: 0px;
  padding: 0 15px;
  margin: 0 20px 0 0;
  color: #666;
  background: #fff;
  width: auto;
  font-size: 15px;
  line-height: 34px;
  height: 34px;
  .iconfont {
    margin: 0 2px;
    color: #666;
    font-size: 16px;
    height: 34px;
  }
}
.add-update-preview .downBtn:hover {
  opacity: 0.8;
}
.add-update-preview .unBtn {
  border: 0;
  cursor: not-allowed;
  border-radius: 4px;
  padding: 0 0px;
  margin: 0 20px 0 0;
  outline: none;
  color: #999;
  background: none;
  width: auto;
  font-size: 15px;
  line-height: 40px;
  height: 40px;
  .iconfont {
    margin: 0 2px;
    color: #fff;
    display: none;
    font-size: 14px;
    height: 34px;
  }
}
.add-update-preview .unBtn:hover {
  opacity: 0.8;
}
.add-update-preview /deep/ .el-upload--touxiang-card {
  background: transparent;
  border: 0;
  border-radius: 0;
  width: auto;
  height: auto;
  line-height: initial;
  vertical-align: middle;
}

.add-update-preview /deep/ .upload .upload-img {
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
.add-update-preview /deep/ .el-upload__tip {
  color: #666;
  font-size: 15px;
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
.add-update-preview .el-textarea /deep/ .el-textarea__inner[readonly="readonly"] {
  border: 0;
  cursor: not-allowed;
  border-radius: 0px;
  padding: 12px;
  color: #666;
  background: none;
  width: auto;
  font-size: 15px;
  min-width: 400px;
  height: auto;
}
.add-update-preview .el-form-item.btn {
  padding: 0;
  margin: 20px 0 0;
  .btn1 {
    border: 0px solid #ccc;
    cursor: pointer;
    border-radius: 4px;
    padding: 0 10px;
    margin: 0 10px 0 0;
    color: #fff;
    background: #1a3194;
    width: auto;
    font-size: 16px;
    min-width: 110px;
    height: 40px;
    .iconfont {
      margin: 0 2px;
      color: #fff;
      display: none;
      font-size: 14px;
      height: 40px;
    }
  }
  .btn1:hover {
    opacity: 0.8;
  }
  .btn2 {
    border: 0px solid #ccc;
    cursor: pointer;
    border-radius: 4px;
    padding: 0 10px;
    margin: 0 10px 0 0;
    color: #fff;
    background: #1fc3cb;
    width: auto;
    font-size: 16px;
    min-width: 110px;
    height: 40px;
    .iconfont {
      margin: 0 2px;
      color: #fff;
      display: none;
      font-size: 14px;
      height: 34px;
    }
  }
  .btn2:hover {
    opacity: 0.8;
  }
  .btn3 {
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
    .iconfont {
      margin: 0 2px;
      color: #fff;
      display: none;
      font-size: 14px;
      height: 40px;
    }
  }
  .btn3:hover {
    opacity: 0.8;
  }
  .btn4 {
    border: 0px solid #ccc;
    cursor: pointer;
    border-radius: 4px;
    padding: 0 10px;
    margin: 0 10px 0 0;
    color: #fff;
    background: #b3b3b3;
    width: auto;
    font-size: 16px;
    min-width: 110px;
    height: 40px;
    .iconfont {
      margin: 0 2px;
      color: #fff;
      display: none;
      font-size: 14px;
      height: 40px;
    }
  }
  .btn4:hover {
    opacity: 0.8;
  }
  .btn5 {
    border: 0px solid #ccc;
    cursor: pointer;
    border-radius: 4px;
    padding: 0 10px;
    margin: 0 10px 0 0;
    color: #fff;
    background: #156286;
    width: auto;
    font-size: 16px;
    min-width: 110px;
    height: 40px;
    .iconfont {
      margin: 0 2px;
      color: #fff;
      display: none;
      font-size: 14px;
      height: 40px;
    }
  }
  .btn5:hover {
    opacity: 0.8;
  }
}
</style>

            