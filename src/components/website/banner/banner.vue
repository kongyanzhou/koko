<template>
	<div class="banner">
		<Carousel autoplay v-model="value" :autoplay-speed="5000">
			<CarouselItem v-for = "banner in banners" :key="banner.pic">
				<div  class="demo-carousel">
					<a class="banner-item" href="https://www.kancloud.cn/microdreamskol/microdream-data-api/489555" :style="{background: 'url('+banner.pic+') center no-repeat'}" target="_blank"></a>
				</div>  
			</CarouselItem>
		</Carousel>
	</div>
</template>

<script>
	
    export default {
        data () {
            return {
				value: 0,
				banners: [
					{pic: require("./banner01.jpg")},
					// {pic: require("./banner01.jpg")},
				]
            }
		},
    }
</script>

<style lang="scss" type="text/css">
	 @import "../../../assets/css/common.scss";

	 // 解决ivew轮播图宽度非100%
	 .ivu-carousel-list {
		width: 100%;
	 }
	 .banner {
		@include center-block();
	 }
	 .banner-item {
		height: 500px;
		display: block;
	 }
</style>
