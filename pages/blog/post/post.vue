<template>
	<view class="container">
		<view class="editor">
			<textarea class="content-text" v-model:value="content" auto-height adjust-position placeholder="placeholder" />
		</view>
		<view class="pic-container cu-list grid col-3">
			<view class="cu-item" v-for="(image, index) in picList" :key="index"
				@click="onPicItemClick(index)">
				<view class="content-pic">
					<image :src="imageUrl(image)" alt="" mode="aspectFill"></image>
					<view class="delete-pic" @click="onRemovePic(index)">X</view>
				</view>
			</view>
			<view class="cu-item add-pic">
				<view @click="onPicBtnClick">
					<view class="add-pic-text">+</view>
				</view>
			</view>
		</view>
		<view class="toolbar justify-around justify-center align-center">
			<view class="text-black cuIcon-pic " @click="onPicBtnClick">
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
	
	export default {
		data() {
			return {
				content:"",
				placeholder: "你写的，就是头条",
				picList: []
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
			onPicItemClick(index){
				uni.previewImage({
					current: index,
					urls:this.picList
					}
				);
			},
			onRemovePic(index){
				this.picList.splice(index,1);
			},
			imageUrl(image){
				return image;
			},
			onPicBtnClick(e){
				uni.chooseImage({
						count: 9,
						success: (res) => {
							console.log(res);
							res.tempFilePaths.forEach(path=>{
								console.log(path);
								this.picList.push(path);
							})
						}
					})
				},
				distribute(){
			}
		},
		onNavigationBarButtonTap(e){
			console.log(e);
			if(e.index == 0){// 取消
				navigateBack();
			}else if(e.index == 1){//发布
				if(!this.content && this.picList.length == 0){
					uni.showToast({title: "请编辑内容！",
					duration: 2000});
					return;
				}
				let that = this;
				function createBlog(){
					var data = {};
					data.content = that.content;
					data.images = that.picList;
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
				if(this.picList.length > 0){
					// 上传图片
					try{
						let uploadCount = 0;
						this.picList.forEach((path, index) =>{
							apiFile.uploadFile(path).then(res=>{
								uploadCount ++;
								this.picList[index] = res;
								if(uploadCount == this.picList.length){
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
		padding: 5upx;
		display: flex;
		flex-direction: column;
	}
	.editor{
		width:100%;
		flex: auto;
		auto-height:true;
		min-height: 300upx;
	}
	.content-text{
		font-size: 1rem;
	}
	.pic-container{
		background-color: #f7f7f7;
	}
	.delete-pic{
		position: absolute;
		right: 30upx;
		top: 15upx;
		z-order: 100;
		font-size: 40upx;
		font-weight: 300;
		color: #d81e06;
	}
	.cu-list.grid .cu-item{
		height: 0;
		padding: 33.3% 5upx 5upx 5upx;
		overflow: hidden;
	}
	.content-pic{
		position: absolute;
		top: 0;
		width:100%;
		height:100%;
	}
	.toolbar{
		display: flex;
		position:fixed;
		height: 80upx;
		line-height: 80upx;
		width: 100%;
		background-color: #F2F2F2;
		bottom: 0upx;
	}
	.toolbar view{
		width: 100upx;
		height: 80upx;
		font-size: 56upx;
		text-align: center;
	}
	.add-pic{
	}
	.add-pic view{
		position: absolute;
		top: 0;
		width:100%;
		height:100%;
		display: flex;
		align-items: center;
		justify-content:center;
		
	}
	.add-pic-text{
		font-size: 100upx;
		font-weight: 300;
		text-align: center;
		color: #d81e06;
	}
</style>
