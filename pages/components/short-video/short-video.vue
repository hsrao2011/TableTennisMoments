<template>
	<view>
		<view class="container">
			<user-base-info :user="blog.user"></user-base-info>
			<view class="content">
				<text class="content-text" :class="brief?'content-brief':''" @click="onContentClick">{{blog.data.title}}</text>
				<video class="content-video" :src="blog.data.content" controls>
				</video>
			</view>
		</view>
	</view>
</template>

<script>
	import userBaseInfo from "../user-base-info/user-base-info"
	export default {
		components:{
			"user-base-info": userBaseInfo
		},
		props:{
			blog: Object,
			brief: {
				type: Boolean,
				default: false
			},
			imageColCount:{
				type: Number,
				default: 3
			}
		},
		mounted(){
			console.log(this.blog);
		},
		data() {
			return {
				
			}
		},
		methods: {
			onContentClick(){
				let that = this;
				uni.navigateTo({
					/*url: "/pages/blog/post-detail/post-detail",
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', { blog: that.blog })
					}*/
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color:#fff;
		padding: 15upx 15upx 0 15upx;
		margin-bottom: 10upx;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top:15upx;
	}
	.content-text{
		padding: 0 10upx 0 10upx;
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.2;
	}
	.content-brief{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;  //需要显示时文本行数
	}
	.content-video{
		width: 100%;
	}
</style>
