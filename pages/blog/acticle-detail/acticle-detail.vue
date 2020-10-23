<template>
	<view class="container">
		<view class="content" v-if="blog">
			<view class="title">
				<text>{{blog.data.title}}</text>
			</view>
			<user-base-info :user="blog.user"></user-base-info>
			<view class="ql-container">  
				<jyf-parser class="ql-editor" :html="blog.data.html" ></jyf-parser>  
			</view>
			<comment-list :targetId="blog.data.id" ></comment-list>
		</view>
	</view>
</template>

<script>
	import userBaseInfo from "@/pages/components/user-base-info/user-base-info"
	import commentList from "@/pages/components/comment-list/comment-list.vue"
	import jyfParser from "@/components/jyf-parser/jyf-parser"
	export default {
		components:{
			"user-base-info": userBaseInfo,
			"comment-list": commentList,
			"jyf-parser": jyfParser
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
		methods: {
		}
	}
</script>

<style scoped>
	.container{
		background-color:#fff;
		padding: 80upx 15upx 0 15upx;
		height: 100%;
	}
	.content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.title{
		padding: 0 10upx 0 10upx;
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.2;
		margin-bottom: 20upx;
	}
	.ql-container {
		box-sizing: border-box;
		padding: 12upx 15upx;
		width: 100%;
		height: auto;
		background: #fff;
		margin-top: 50upx;
		font-size: 1.4rem;
		line-height: 1.2;
	}
	.ql-active {
		color: #06c;
	}
</style>
