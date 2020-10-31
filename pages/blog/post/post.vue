<template>
	<view class="blog-post-container">
		<view class="blog-post-content">
			<view class="blog-post-content-editor">
				<textarea class="blog-post-editor" v-model:value="content"
				:placeholder="placeholder" placeholder-style="font-size: 1.4rem;"
				auto-height="true"/>
			</view>
			<image-grid ref="imageGrid" :images="images" :editable="true"></image-grid>
		</view>
		<view class="blog-post-toolbar-placeholder">
		</view>
		<view class="blog-post-toolbar">
			<view class="text-black cuIcon-pic " @click="onToolBarAddImage">
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/api/blog.js"
	import utils from "@/utils/utils.js"
	import apiFile from "@/api/file.js"
	import {navigateBack} from "@/pages/page.js"
	import {mapMutations} from "vuex"
	import imageGrid from "../../components/image-grid/image-grid"
	
	export default {
		components:{
			"image-grid": imageGrid
		},
		props:{
		},
		data() {
			return {
				content:"",
				placeholder: "你写的，就是头条",
				images: []
			}
		},
		computed:{
		},
		mounted(){
			if(document){
				var backButton = document.getElementsByClassName('uni-page-head-hd')[0]
				console.log(backButton.firstElementChild);
				backButton.firstElementChild.style.display = "none";
			}
		},
		onUnload(){
			uni.hideLoading();
		},
		methods: {
			...mapMutations("user", [
				"incrementBlogCount"
			]),
			onToolBarAddImage(e){
				this.$refs.imageGrid.addImage();
			}
		},
		onNavigationBarButtonTap(e){
			let empty = !this.content && this.images.length == 0;
			if(e.index == 0){// 取消
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
			}else if(e.index == 1){//发布
				if(empty){
					uni.showToast({title: "请编辑内容！",
					duration: 2000});
					return;
				}
				uni.showLoading({
					title: "发布中...",
					mask: true
				})
				try{
					let that = this;
					function createBlog(){
						var data = {};
						data.content = that.content;
						data.images = that.images;
						api.createPost(data).then((res)=>{
							that.incrementBlogCount();
							getApp().globalData.updateBlog = true;
							uni.switchTab({
								url: "/pages/tabbar/follow/follow"
							})
							uni.showToast({title: "发布成功！",
							duration: 2000});
						}).catch(err=>{
							uni.hideLoading();
							uni.showToast({title: "调用发布接口发生异常："+ JSON.stringify(err),
								duration: 2000});
						});
					}
					if(this.images.length > 0){
						// 上传图片
						let uploadCount = 0;
						this.images.forEach((path, index) =>{
							apiFile.uploadFile(path).then(res=>{
								uploadCount ++;
								this.images[index] = res;
								if(uploadCount == this.images.length){
									createBlog();
								}
							}).catch(err=>{
								uni.hideLoading();
								uni.showToast({title: "上传文件发生异常:"+ JSON.stringify(err),
									duration: 2000});
							});
						})	
					}else{
						createBlog();
					}
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
	.blog-post-container{
		padding: 15upx;
		background-color: #fff;
		height: 100vh;
	}
	.blog-post-content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.blog-post-toolbar-placeholder{
		height: 80upx;
		flex: 0 0 auto;
	}
	.blog-post-content-editor{
		flex: auto;
	}
	.blog-post-editor{
		min-height: 600upx;
		width: 100%;
		font-size: 1.4rem;
		line-height: 1.2;
	}
	.blog-post-toolbar{
		display: flex;
		justify-content: space-around;
		align-items: center;
		position:fixed;
		left: 0;
		bottom: 0;
		height: 80upx;
		line-height: 80upx;
		width: 100%;
		background-color: #F2F2F2;
	}
	.blog-post-toolbar view{
		width: 100upx;
		height: 80upx;
		font-size: 56upx;
		text-align: center;
	}
</style>
