<template>
	<view class="container">
		<view class="content">
			<view class="content-editor">
				<textarea class="editor" v-model:value="content"
				:placeholder="placeholder" placeholder-style="font-size: 1.4rem;"
				auto-height="true"/>
			</view>
			<image-grid ref="imageGrid" :images="images" :editable="true"></image-grid>
		</view>
		<view class="toolbar-placeholder">
		</view>
		<view class="toolbar">
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
			var backButton = document.getElementsByClassName('uni-page-head-hd')[0]
			console.log(backButton.firstElementChild);
			backButton.firstElementChild.style.display = "none";
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
			console.log(e);
			if(e.index == 0){// 取消
				navigateBack();
			}else if(e.index == 1){//发布
				if(!this.content && this.images.length == 0){
					uni.showToast({title: "请编辑内容！",
					duration: 2000});
					return;
				}
				let that = this;
				function createBlog(){
					var data = {};
					data.content = that.content;
					data.images = that.images;
					api.createPost(data).then((res)=>{
						that.incrementBlogCount();
						navigateBack();
						uni.showToast({title: "发布成功！",
						duration: 2000});
						console.log("发布成功！");
					}).catch((res) => {
						console.log("发布异常：" + res);
					});
				}
				if(this.images.length > 0){
					// 上传图片
					try{
						let uploadCount = 0;
						this.images.forEach((path, index) =>{
							apiFile.uploadFile(path).then(res=>{
								uploadCount ++;
								this.images[index] = res;
								if(uploadCount == this.images.length){
									createBlog();
								}
							});
						})	
					}catch(err){
						uni.showToast({title: "上传文件失败！"+ JSON.stringify(err),
							duration: 2000});
							return;
					}
				}else{
					createBlog();
				}
			}
		}
	}
</script>

<style>
	.container{
		padding: 15upx;
	}
	.content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.toolbar-placeholder{
		height: 80upx;
		flex: 0 0 auto;
	}
	.content-editor{
		flex: auto;
	}
	.editor{
		min-height: 600upx;
		width: 100%;
		font-size: 1.4rem;
		line-height: 1.2;
	}
	.toolbar{
		display: flex;
		justify-content: space-around;
		align-items: center;
		position:fixed;
		bottom: 0;
		height: 80upx;
		line-height: 80upx;
		width: 100%;
		background-color: #F2F2F2;
	}
	.toolbar view{
		width: 100upx;
		height: 80upx;
		font-size: 56upx;
		text-align: center;
	}
</style>
