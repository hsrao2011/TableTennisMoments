<template>
	<view class="post-container">
		<user-base-info :user="blog.user"></user-base-info>
		<view class="post-content">
			<text class="post-content-text" :class="brief?'post-content-brief':''" @click="onContentClick">{{blog.data.content}}</text>
			<image-grid :images="blog.data.images" :cols="imageColCount"></image-grid>
		</view>
	</view>
</template>

<script>
	import userBaseInfo from "../user-base-info/user-base-info"
	import imageGrid from "../image-grid/image-grid"
	export default {
		components:{
			"user-base-info": userBaseInfo,
			"image-grid": imageGrid,
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
		data() {
			return {
			}
		},
		created(){
		},
		mounted(){
		},
		methods: {
			imageUrl(image){
				return image;
			},
			onPreviewImage(index){
				uni.previewImage({
					current:index,
					urls: this.blog.data.images
					}
				);
			},
			onContentClick(){
				if(!this.brief)
					return;
				let that = this;
				uni.navigateTo({
					url: "/pages/blog/post-detail/post-detail",
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', { blog: that.blog })
					}
				})
			}
		}
	}
</script>

<style scoped>
	.post-container{
		width: 100%;
		background-color:#fff;
		padding: 24upx 30upx 14upx 30upx;
		margin-bottom: 10upx;
	}
	.post-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-top: 20upx;
	}
	.post-content-text{
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.4;
	}
	.post-content-brief{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;  //需要显示时文本行数
	}
	.post-content text{
		margin-bottom: 20upx;
	}
</style>
