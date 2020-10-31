<template>
	<view class="blog-short-video-container">
		<view class="blog-short-video-content-video">
			<video id="video" class="blog-short-video-video" :src="videoUrl" controls autoplay>
				<cover-image src="/static/icon/btn-play-return.png" class="blog-short-video-backButton" @click="onBack"></cover-image>
			</video>
		</view>
		<view class="blog-short-video-content-title">
			<label class="blog-short-video-title-label">标题</label>
			<view class="blog-short-video-title-editor">
				<textarea v-model:value="title" placeholder="输入标题" 
				placeholder-style="font-size: 1.4rem; font-weight:500;"
				@blur="onTitleBlur" @input="onTitleInput"/>
				<text v-if="titlePrompt" class="blog-short-video-title-prompt" >{{titlePrompt}}</text>
			</view>
		</view>
		<view class="blog-short-video-distribute">
			<button class="blog-short-video-distribure-btn" type="default" @click="onDistribute">发布</button>
		</view>
	</view>
</template>

<script>
	import api from "@/api/blog.js"
	import apiFile from "@/api/file.js"
	import {mapMutations} from "vuex"
	import {navigateBack} from "@/pages/page.js"
	export default {
		data() {
			return {
				videoInfo:{},
				title: "",
				titlePrompt: ""
			}
		},
		computed:{
			videoUrl(){
				if(!this.videoInfo)
					return "";
				// #ifdef H5
				console.log("h5")
				return "/static/data/upload/82D74E3954EE09BCB956ECC4D9C75B9A.mp4"
				// #endif
				return this.videoInfo.tempFilePath;
			}
		},
		onLoad(){
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
			const eventChannel = this.getOpenerEventChannel()
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			let that = this;
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				let params = data.params;
				delete params.errMsg;
				that.videoInfo = Object.assign({}, that.videoInfo, params);
				that.$set(that.videoInfo, "tempFilePath", params.tempFilePath);
				
				that.videoContext = uni.createVideoContext("video", that)
			})	
		},
		onUnload(){
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
			uni.hideLoading();
		},
		methods: {
			...mapMutations("user",[
				"incrementBlogCount"
			]),
			onBack(){
				let empty = !this.title;
				if(empty){
					navigateBack();
					return;
				}
				uni.showModal({
					title: "放弃编辑",
					content: "暂时不支持保存草稿，放弃后将丢失当前已编辑的内容，确定放弃吗？",
					showCancel: true,
					confirmText:"放弃",
					confirmColor: "#d81e06",
					cancelText: "继续编辑",
					success(res){
						if(res.confirm){
							navigateBack();
						}
					}
				})
			},
			onTitleInput(){
				if(this.title.length > 30){
					this.titlePrompt = "标题字数不可多于30个字"
				}else{
					this.titlePrompt = "";
				}
			},
			onTitleBlur(){
				if(this.title.length > 30){
					this.titlePrompt = "标题字数不可多于30个字"
				}else if(this.title.length < 5){
					this.titlePrompt = "标题字数不可少于5个字"
				}else{
					this.titlePrompt = "";
				}
			},
			onDistribute(){
				//发布
				if(this.title.length == 0){
					this.titlePrompt = "标题字数不可少于5个字";
				}
				if(this.titlePrompt.length > 0){
					uni.showToast({
						title: this.titlePrompt,
						duration: 2000
					})
					return;
				}
				if(this.videoContext)
					this.videoContext.pause();
				uni.showLoading({
					title: "发布中...",
					mask: true
				})
				try{
					let filePath = "";
					let that = this;
					function createBlog(){
						var data = {};
						data.content = filePath;
						data.title = that.title;
						api.createShortVideo(data).then((res)=>{
							that.incrementBlogCount();
							getApp().globalData.updateBlog = true;
							uni.switchTab({
								url: "/pages/tabbar/follow/follow"
							});
							uni.showToast({title: "发布成功！",
								ion: 2000});
						}).catch((err) => {
							uni.hideLoading();
							uni.showToast({title: "调用发布接口发生异常:"+ JSON.stringify(err),
								duration: 2000});
						});
					}
					apiFile.uploadFile(this.videoInfo.tempFilePath, true).then(path=>{
						filePath = path;
						createBlog();
					}).catch(err=>{
						uni.hideLoading();
						uni.showToast({title: "上传文件发生异常:"+ JSON.stringify(err),
							duration: 2000});
					});
				}catch(err){
					uni.hideLoading();
					uni.showToast({title: "发布失败！"+ JSON.stringify(err),
						duration: 2000});
				}
			}
		}
	}
</script>

<style scoped>
	.blog-short-video-container{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		background-color: #fff;
		width: 100%;
		height: 100vh;
	}
	.blog-short-video-content-video{
		width: 100%;
		padding-bottom: 60%;
		height: 0;
		position: relative;
	}
	.blog-short-video-video{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.blog-short-video-backButton{
		position: absolute;
		top: 40upx;
		left: 30upx;
		width: 48upx;
		height: 48upx;
		padding: 5upx;
		background-color: rgba(0,0,0,0.2);
	}
	.blog-short-video-content-title{
		width: 100%;
		overflow: hidden;
		padding: 40upx 30upx;
		display: flex;
		flex-wrap: nowrap;
		font-size: 1.4rem;
		font-weight: 400;
	}
	.blog-short-video-title-label{
		width: 120upx;
		padding-top: 20upx;
		flex: 0 0 auto;
	}
	.blog-short-video-title-label::after{
		content:"*";
		color: #d81e06;
	}
	.blog-short-video-title-editor{
		flex: 1 1 auto;
		padding: 20upx;
		display: flex;
		flex-direction: column;
	}
	.blog-short-video-title-editor textarea{
		width: 100%;
		height: 160upx;
		font-size: 1.4rem;
		font-weight: 550;
		
	}
	.blog-short-video-title-prompt{
		color:#d81e06;
		font-size: 1rem;
		line-height: 1.2;
	}
	.blog-short-video-distribute{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 30upx;
	}
	.blog-short-video-distribure-btn{
		width: 40%;
		height: 75upx;
		line-height: 75upx;
		background-color: #d81e06;
		color: #fff;
		font-size: 1rem;
	}
</style>
