<template>
	<view class="container">
		<view class="content-video">
			<video class="video" :src="videoUrl" controls>
				<cover-view class="backButton" @click="onBack">
					<
				</cover-view>
			</video>
		</view>
		<view class="content-title">
			<label class="title-label">标题</label>
			<view class="title-editor">
				<textarea v-model:value="title" placeholder="输入标题" 
				placeholder-style="font-size: 1.4rem; font-weight:500;"
				@blur="onTitleBlur" @input="onTitleInput"/>
				<text v-if="titlePrompt" class="title-prompt" >{{titlePrompt}}</text>
			</view>
		</view>
		<view class="distribute">
			<button class="distribure-btn" type="default" @click="onDistribute">发布</button>
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
				return "/static/data/upload/1.mp4"
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
			})	
		},
		onUnload(){
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
		},
		methods: {
			...mapMutations("user",[
				"incrementBlogCount"
			]),
			onBack(){
				var pages = getCurrentPages();
				if(pages.length <= 1){
					uni.switchTab({
						url:"/pages/tabbar/home/home"
					})
				}else{
					uni.navigateBack({
						delta: 1,
					})
				}
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
				}else{
					this.titlePrompt = "";
				}
			},
			onDistribute(){
				//发布
				if(this.titlePrompt.length > 0){
					uni.showToast({
						title: this.titlePrompt,
						duration: 2000
					})
					return;
				}
				let filePath = "";
				let that = this;
				function createBlog(){
					var data = {};
					data.content = filePath;
					data.title = that.title;
					console.log(data);
					api.createShortVideo(data).then((res)=>{
						that.incrementBlogCount();
						navigateBack();
						uni.showToast({title: "发布成功！",
							ion: 2000});
						console.log("发布成功！");
					}).catch((err) => {
						console.log("发布异常, 上传文章失败：" + JSON.stringify(err));
					});
				}
				try{
					apiFile.uploadFile(this.videoInfo.tempFilePath, true).then(path=>{
						console.log(path);
						// #ifdef APP-PLUS
						{// 以下处理的说明参见acticle的发布
							let reg = new RegExp("^_");
							path = path.replace(reg, "file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/")
							console.log(path);
						}
						// #endif
						filePath = path;
						createBlog();
					});
				}catch(err){
					console.log("发布异常, 视频上传失败：" + JSON.stringify(err));
				}
			}
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.content-video{
		width: 100%;
		padding-bottom: 60%;
		height: 0;
		position: relative;
	}
	.video{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.backButton{
		position: absolute;
		top: 30upx;
		left: 30upx;
		color: #a7a7a7;
		font-size: 56upx;
	}
	.content-title{
		width: 100%;
		overflow: hidden;
		padding: 40upx 30upx;
		display: flex;
		flex-wrap: nowrap;
		font-size: 1.4rem;
		font-weight: 400;
	}
	.title-label{
		width: 120upx;
		padding-top: 20upx;
		flex: 0 0 auto;
	}
	.title-editor{
		flex: 1 1 auto;
		padding: 20upx;
		display: flex;
		flex-direction: column;
	}
	.title-editor textarea{
		width: 100%;
		height: 160upx;
		font-size: 1.4rem;
		font-weight: 550;
		
	}
	.title-prompt{
		color:#d81e06;
		font-size: 1rem;
		line-height: 1.2;
	}
	.distribute{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 30upx;
	}
	.distribure-btn{
		width: 40%;
		height: 75upx;
		line-height: 75upx;
		background-color: #d81e06;
		color: #fff;
		font-size: 1rem;
	}
</style>
