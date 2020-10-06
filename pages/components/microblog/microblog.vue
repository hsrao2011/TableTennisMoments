<template>
	<view class="container">
		<view class="user">
			<image class="avatar" :src="'/static/data/avatar/' + blogData.user.avatar" alt="头像" mode=""></image>
			<view class="userinfo">
				<text class="nickname">{{blogData.user.nickName}}</text>
				<text class="intro">{{blogData.user.intro}}</text>
			</view>
			
		</view>
		<view class="content">
			<text @click="onContentClick">{{blogData.data.content}}</text>
			<view class="imageGroup" >
				<view v-for="image in blogData.data.images">
						<image :src="imageUrl(image)" mode="aspectFill" @click="onPreviewImage(imageUrl(image))"></image>
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
			console.log("microblog created");
		},
		computed:{
			
		},
		mounted(){
			console.log(this.blogData);
		},
		methods: {
			imageUrl(image){
				return '/static/data/img/'+ image;
			},
			onPreviewImage(url){
				uni.previewImage({
					current:0,
					urls:[url]
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

<style>
	.container{
		background-color:#fff;
		padding-top:5upx;
		margin-bottom:5upx;
	}
	.user{
		display:flex;
		justify-content:flex-start;
		padding-top:10upx;
	}
	.user .userinfo{
		padding:2upx 1upx;
		margin-left: 5upx;
	}
	.user .userinfo>text{
		display:block;
	}
	.user .nickname{
		font-weight:bolder;
	}
	
	.user .avatar{
		position:relative;
		backgroun-color:#f00;
		width:60upx;
		height:60upx;
		margin-left:10upx;
		border-radius:10upx;
	}
	.user .intro{
		font-size:0.6em;
		color:#ccc;
	}
	.content {
		display:flex;
		flex-direction:column;
		justify-content: flex-start;
		margin:10upx 30upx;
	}
	.content text{
		font-size:0.9em;
		max-height:100upx;
		overflow:hidden;
		margin-bottom:5upx;
		text-overflow:ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;  //需要显示时文本行数
		line-height:32upx;
	}
	.content .imageGroup{
		display:flex;
		flex-direction: row;
		flex-wrap:wrap;
		justify-content:flex-start;
	}
	.content .imageGroup image{
		width:160upx;
		height:160upx;
		padding:2upx;
		margin-left:10upx;
	}
</style>
