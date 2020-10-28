<template>
	<view class="container">
		<view class="content" >
			<view class="content-title" :class="layout==0?'':'content-title-width'"
				@click="onTitleClick">
				<text class="title"> {{blog.data.title}}</text>
			</view>
			<view v-if="thumbnailUrl" class="content-thumbnail">
				<view class="thumbnail-view" >
					<image class="thumbnail-image" :src="thumbnailUrl" mode="aspectFill" @click="onPreviewThumbnail"></image>
				</view>
				
			</view>
		</view>
		<view class="user">
			<text class="nick-name">{{blog.user.nickName}}</text>
			<text class="comment-count">{{commentCount}}评论</text>
			<text class="date">{{date}}</text>
		</view>
	</view>
</template>

<script>
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
				let yesterday = new Date();
				yesterday.setTime(yesterday.getTime() - 24*60*60*1000);
				let blogDate = new Date(this.blog.data.date);
				if(blogDate < yesterday){
					return blogDate.toLocaleDateString();
				}else{
					return blogDate.toLocaleTimeString();
				}
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

<style>
	.container{
		background-color: #fff;
		padding: 15upx 30upx 15upx 30upx;
		margin-bottom: 10upx;
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-between;
	}
	.content-title{
		flex: 1 1 auto;
		width: 100%;
		padding-top: 20upx;
		margin-bottom: 20upx;
	}
	.content-title-width{
		width: 35%;
	}
	.title{
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.4;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;  //需要显示时文本行数
		
	}
	.content-thumbnail{
		flex: auto;
		padding: 10upx 10upx 0 10upx;
	}
	.thumbnail-view{
		position: relative;
		padding: 60% 15upx 15upx 15upx;
		overflow: hidden;
	}
	.thumbnail-image{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 5upx;
	}
	.user{
		margin: 10upx 0 0 30upx;
		color: #7f7f7f;
	}
	.nick-name{
		font-size: 0.9rem;
	}
	.comment-count{
		margin-left: 10upx;
		font-size: 0.9rem;
	}
	.date{
		margin-left: 10upx;
		font-size: 0.9rem;
	}
</style>
