<template>
	<view class="container">
		<view class="user">
			<image class="avatar" :src="'/static/data/avatar/' + blogData.user.avatar" alt="头像" mode=""></image>
			<view class="user-info">
				<text class="nickname">{{blogData.user.nickName}}</text>
				<text class="intro">{{blogData.user.intro}}</text>
			</view>
			
		</view>
		<view class="content">
			<text @click="onContentClick">{{blogData.data.content}}</text>
			<view class="image-group" >
				<view v-for="(image,index) in blogData.data.images">
						<image :src="imageUrl(image)" mode="aspectFill" @click="onPreviewImage(index)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["blogData"],
		data() {
			return {
				
			}
		},
		created(){
		},
		computed:{
			
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
					urls: this.blogData.data.images
					}
				);
			},
			onContentClick(){
				uni.showToast({
					title:"点击全文"
				});
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color:#fff;
		padding-top:5upx;
		margin-bottom:5upx;
	}
	.user{
		display:flex;
		justify-content:flex-start;
		padding-top:10upx;
		margin-left: 20upx;
		align-items: center;
	}
	.user .user-info{
		margin-left: 15upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.user .user-info>text{
		display:block;
	}
	.user .avatar{
		position:relative;
		backgroun-color:#f00;
		width:90upx;
		height:90upx;
		border-radius:10upx;
	}
	.user .nickname{
		font-weight:bold;
		font-size: 30upx;
	}
	.user .intro{
		font-size:20upx;
		color:#ccc;
		margin-left: 2upx;
		margin-top: 3upx;
	}
	.content {
		display:flex;
		flex-direction:column;
		justify-content: flex-start;
		margin:15upx 30upx;
	}
	.content text{
		font-size:0.9em;
		overflow:hidden;
		text-overflow:ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;  //需要显示时文本行数
		line-height:1.2;
	}
	.content .image-group{
		display:flex;
		flex-direction: row;
		flex-wrap:wrap;
		justify-content:flex-start;
		margin-top: 15upx;
	}
	.content .image-group image{
		width:160upx;
		height:160upx;
		padding:2upx;
		margin-left:10upx;
	}
</style>
