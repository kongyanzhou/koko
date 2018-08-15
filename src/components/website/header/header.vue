<template>
	<div class="header ivu-menu ivu-menu-light ivu-menu-horizontal">
		<div class="inner">
			<div class="logo">
				<a href="/dist/views/website/index.html">
					<img src="./logo.png" alt="领库api数据接口开放平台">
				</a>
			</div>
			<div class="loginBtn">
				<div class="ivu-btn-group ivu-btn-group-large">
					<button type="button" class="ivu-btn ivu-btn-primary">登录 / 注册</button> 
				</div>
			</div>
			<div class="nav">
				<ul>
					<li class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected"><i class="ivu-icon ivu-icon-home"></i>首页</li>
					<a href="https://www.kancloud.cn/microdreamskol/microdream-data-api/489555" target="_blanck"><li class="ivu-menu-item"><i class="ivu-icon ivu-icon-ios-paper"></i>文档</li></a>
					<li class="ivu-menu-item"><i class="ivu-icon ivu-icon-help-circled"></i>常见问题</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>

export default {
	data() {
    	return {
    	}
  	},
}
</script>

<style lang="scss" type="text/css">
 	@import "../../../assets/css/common.scss";

	.header {
		height: 60px;
		width: 100%;
		.inner {
			width: 1200px;
			@include center-block();
		}
		.logo {
			width: 200px;
			float: left;
			img {
				width: 100%;
			}
		}
		.nav {
			float: right;
			margin-right: 24px;
		}
		.loginBtn {
			float: right;
		}
	}

</style>
