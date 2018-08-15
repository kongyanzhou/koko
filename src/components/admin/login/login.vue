<template>
    <div class="login">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="username">
                            <Input v-model="form.username"  placeholder="请输入用户名" @keyup.enter.native="handleSubmit">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="handleSubmit">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
						<FormItem prop="vcode" class="vcode-input">
                            <Input v-model="form.vcode" placeholder="请输入验证码" @keyup.enter.native="handleSubmit">
                                <span slot="prepend">
                                    <Icon :size="14" type="information-circled"></Icon>
                                </span>
                            </Input>
							<div class="vcode-img" @click.stop="refreshVcode"><img :src='vcodeSrc + randomNum' alt="验证码"></div>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit" long :loading="form.loading">登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">领库api数据接口管理后台</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
	import common from 'assets/js/common';
	import Cookies from 'js-cookie';

	export default {
		data() {
			return {
				randomNum: common.GetRandomNum(10000,90000),
				vcodeSrc: common.getApiUrl + "/vcode?_=",
				form: {
					username: '',
					password: '',
					vcode: '',
					loading: false,
				},
				rules: {
					username: [
						{ required: true, message: '用户名不能为空', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '密码不能为空', trigger: 'blur' }
					],
					vcode: [
						{ required: true, message: '验证码不能为空', trigger: 'blur' }
					]
            	}
        	};
		},
		
		methods: {
       		handleSubmit() {
                this.$refs.loginForm.validate((valid) => {
					Cookies.set('user', 'true');
                    if (valid) {
						this.form.loading = true;
						var parameter = {};
						parameter.username = this.form.username;
						parameter.password = this.form.password;
						parameter.vcode = this.form.vcode;
						common.requestInterface({
							"url": common.getApiUrl + "/manage/login", 
							"parameter": parameter, 
							"successFun": (backData) => {
								if(backData.code == "S") {
									Cookies.set('api_username', this.form.username);
									this.$router.push({
										name: 'home_index'
									});
								}else {
									this.$Message.error(backData.msg);
									this.form.loading = false;
									this.refreshVcode();
								}
							}
						});
					} 
                })
			},
			refreshVcode() {
				this.randomNum = common.GetRandomNum(10000,90000);
			}
		}
	}
</script>

<style lang="scss">
	.login{
		width: 100%;
		height: 100%;
		background-image: url('./login_bg.jpg');
		background-size: cover;
		background-position: center;
		position: relative;
		&-con{
			position: absolute;
			right: 126px;
			top: 50%;
			transform: translateY(-60%);
			width: 330px;
			&-header{
				font-size: 16px;
				font-weight: 300;
				text-align: center;
				padding: 30px 0;
			}
			.form-con{
				padding: 10px 0 0;
			}
			
			.vcode-input {
				.ivu-form-item-content {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.ivu-input-wrapper {
					width:190px;
				}
			}
			.vcode-img {
				width: 96px;
				height: 32px;
				cursor: pointer;
				overflow: hidden;
				border-radius: 4px;
				border: 1px solid #dddee1;
				box-sizing: border-box;
				margin-top: 1px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.login-tip{
				font-size: 12px;
				text-align: center;
				color: #555;
			}
		}
	}
</style>
