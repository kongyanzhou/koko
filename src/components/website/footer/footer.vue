<template>
	<div class="footer">
		<div class="inner">
			<div class="main-info">
				<div class="main-info-item">
					<h3>产品介绍</h3>
					<a href="http://www.365editor.com" target="_blank">365编辑器</a>
					<a href="http://www.kolrank.com//ranklist?media=weixin" target="_blank">微信公众号榜单</a>
					<a href="http://www.kolrank.com//ranklist?media=weibo" target="_blank">新浪微博榜单</a>
				</div>

				<div class="main-info-item">
					<h3></h3>
					<a href="//www.kolstore.com/" target="_blank">广告平台</a>
					<a href="http://www.kolrank.com/kolschool" target="_blank">自媒体学院</a>
					<a href="//www.kolstore.com/accelarator/" target="_blank">投资孵化</a>   
				</div>

				<div class="main-info-item">
					<h3>关于我们</h3>
					<a href="http://www.microdreams.com/" target="_blank">微梦传媒</a>
					<a href="/about#information" target="_blank">领库资讯</a>
					<a href="/notice" target="_blank">法律声明</a>
				</div>

				<div class="main-info-item contact">
					<h3>联系我们</h3>
					<p>
						<span>电话：</span>
						<a href="tel:400-990-0711" rel="nofollow">400-990-0711</a>
					</p>
					<p>
						<span>QQ：</span>
						 <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=2673521770&amp;site=qq&amp;menu=yes;" target="_blanck">2673521770</a>
					</p>
					<p>
						<span>邮箱：</span>
						<a href="mailto:kol@microdreams.com" rel="nofollow">service@microdreams.com</a>
					</p>
					<p>
						<span>地址：</span>
						北京市朝阳区广渠路3号竞园5B栋
					</p>
				</div>
			</div>
			<div class="main-qrcode">
				<div class="qrcode-item">
					<img src="./qr_koleditor.jpg">
					<p>365编辑器</p>
				</div>
				<div class="qrcode-item">
					<img src="./qr_kolstore.png">
					<p>领库排行榜</p>
				</div>
				<div class="qrcode-item">
					<img src="./qr_microdreams.png">
					<p>微梦传媒集团</p>
				</div>
			</div>
		</div>
		<div class="record">
			<div class="content">
				<p>Copyright © 2017 Microdreams Co.,Ltd. All rights reserved.  北京微梦传媒股份有限公司</p>
				<p>
					<span>京ICP备14018627号-2</span>
					<span>京ICP证151155号</span>
					<span>京公网安备 11010502030283号</span>
				 </p>
			</div>
		</div>
	</div>
</template>

<script>
	
    export default {
        data () {
            return {
				
            }
		},
    }
</script>

<style lang="scss" type="text/css">
	@import "../../../assets/css/common.scss";

	.footer {
		width: 100%;
		height:245px;
		background: #363c4b;
		color: #7a8599;
		position: relative;
		.inner {
			width: 1180px;
			display: flex;
			justify-content: space-between;
			margin: 0 auto;
			padding-top: 20px;
			.main-info {
				width:66%;
				display: flex;
				justify-content: space-between;
				.main-info-item {
					h3 {
						font-size: 20px;
						height: 40px;
						line-height: 40px;
						color: #f5f5f5;
						margin-bottom: 10px;
					}
					a {
						display: block;
						color: #7a8599;
						font-size: 14px;
						margin-bottom: 10px;
					}
					&.contact {
						a {
							display: inline;
							color: #3fbad9;
							font-style: normal;
						}
						p {
							margin-bottom: 10px;
						}
						span {
							text-align: right;
							display: inline-block;
							width: 44px;
						}
					}
				}
			}
			.main-qrcode {
				width: 30%;
				display: flex;
				justify-content: space-around;
				padding-top: 30px;
				text-align: center;
				.qrcode-item {
					width: 86px;
					img {
						width: 80px;
						display: inline-block;
						margin-bottom: 10px;
					}
					
				}
			}
		}
		.record {
			width: 100%;
			background: rgba(0,0,0,.2);
			height: 42px;
			line-height: 42px;
			position: absolute;
			bottom: 0;
			.content {
				width: 1180px;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				span {
					margin-left: 26px;
				}
			}
		}
	}
</style>