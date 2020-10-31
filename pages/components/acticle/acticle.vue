<template>
	<view class="acticle-container">
		<view class="acticle-content" >
			<view class="acticle-content-title" :class="layout==0?'':'acticle-content-title-width'"
				@click="onTitleClick">
				<text class="acticle-title"> {{blog.data.title}}</text>
			</view>
			<view v-if="thumbnailUrl" class="acticle-content-thumbnail" :style="layout==0?'':'margin-left:10upx;'">
				<view class="acticle-thumbnail-view" >
					<image class="acticle-thumbnail-image" :src="thumbnailUrl" mode="aspectFill" @click="onPreviewThumbnail"></image>
				</view>
				
			</view>
		</view>
		<view class="acticle-user">
			<text class="acticle-nick-name">{{blog.user.nickName}}</text>
			<text class="acticle-comment-count">{{commentCount}}评论</text>
			<text class="acticle-date">{{date}}</text>
		</view>
	</view>
</template>

<script>
	import utils from "@/utils/utils.js"
	export default {
		props:["blog"],
		data() {
			return {
				layout: 0
			}
		},
		mounted(){
			if(this.blog && this.blog.data.images && this.blog.data.images[0])
				this.layout = Math.random() > 0.5 ? 1: 0;
		},
		computed:{
			thumbnailUrl(){
				if(this.blog.data.images){
					return this.blog.data.images[0];
				}
				return null;
			},
			date(){
				let blogDate = new Date(this.blog.data.date);
				let formated = utils.formatDate(blogDate);
				return formated;
			},
			commentCount(){
				return Math.floor(Math.random()* 200);
			}
		},
		methods: {
			onPreviewThumbnail(){
				uni.previewImage({
					current:0,
					urls: [this.thumbnailUrl]
					}
				);
			},
			onTitleClick(){
				let that = this;
				uni.navigateTo({
					url: "/pages/blog/acticle-detail/acticle-detail",
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
	.acticle-container{
		background-color: #fff;
		padding: 24upx 30upx 24upx 30upx;
		margin-bottom: 10upx;
	}
	.acticle-content{
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
	}
	.acticle-content-title{
		flex: 1 1 auto;
		width: 100%;
		margin-bottom: 20upx;
	}
	.acticle-content-title-width{
		width: 35%;
	}
	.acticle-title{
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.4;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;  //需要显示时文本行数
	}
	.acticle-content-thumbnail{
		flex: auto;
		width: 100%;
	}
	.acticle-thumbnail-view{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 60%;
		overflow: hidden;
	}
	.acticle-thumbnail-image{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5upx;
	}
	.acticle-user{
		margin-top: 20upx;
		color: #7f7f7f;
	}
	.acticle-nick-name{
		font-size: 0.9rem;
	}
	.acticle-comment-count{
		margin-left: 10upx;
		font-size: 0.9rem;
	}
	.acticle-date{
		margin-left: 10upx;
		font-size: 0.9rem;
	}
</style>
