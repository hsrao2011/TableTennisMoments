<template>
	<view  class="container">
		<post v-if="blog" :blog="blog" :imageColCount="2"></post>
	</view>
</template>

<script>
	import post from "@/pages/components/post/post.vue";
	export default {
		components:{
			"post": post
		},
		data() {
			return {
				blog: null
			}
		},
		onLoad(){
			const eventChannel = this.getOpenerEventChannel()
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			let that = this;
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.blog = Object.assign({}, that.blog, data.blog);
			})
		},
		mounted(){
			
		},
		methods: {
		}
	}
</script>

<style scoped>
	.container{
		background-color:#fff;
		margin-bottom: 15upx;
		height: 100%;
	}
</style>
