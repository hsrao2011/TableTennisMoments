<template>
	<view class="short-video-container">
		<user-base-info :user="blog.user"></user-base-info>
		<view class="short-video-title" :class="brief?'short-video-title-brief':''" @click="onContentClick">{{blog.data.title}}</view>
		<view class="short-video-content">
			<view class="short-video-face-container">
				<image class="short-video-face"  src="/static/data/img/video_face.jpg" alt="封面" @click="onContentClick"></image>	
				<image class="short-video-play-btn" src="/static/icon/btn-play-center.png" alt="播放"></image>
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
			uniqueId:{
				type: Number,
				default: Math.floor(Math.random() * 1000000)
			}
		},
		data() {
			return {
			}
		},
		computed:{
		},
		methods: {
			gotoDetail(){
				let that = this;
				uni.navigateTo({
					url: "/pages/blog/short-video-detail/short-video-detail",
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', 
						 { blog: that.blog});
					}
				})
			},
			onGotoDetail(){
				this.gotoDetail();
			},
			onContentClick(){
				this.gotoDetail();
			}
		}
	}
</script>

<style scoped>
	.short-video-container{
		background-color:#fff;
		padding: 24upx 30upx 24upx 30upx;
		margin-bottom: 10upx;
	}
	.short-video-content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top:20upx;
	}
	.short-video-title{
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.4;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 20upx;
	}
	.short-video-title-brief{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;  //需要显示时文本行数
	}
	.short-video-face-container{
		position: relative;
		left: 0;
		top: 0;
		width: 100%;
		height: 0;
		padding-top: 60%;
		overflow: hidden;
	}
	.short-video-face{
		position: absolute;
		width:100%;
		height: 100%;
		left: 0;
		top: 0;
		border-radius: 5upx;
	}
	.short-video-play-btn{
		position: absolute;
		top: calc(50% - 50upx);
		left: calc(50% - 50upx);
		width: 100upx;
		height: 100upx;
		background-color: rgba(0,0,0,0);
		z-index: 900;
		pointer-events: none;
	}
</style>
