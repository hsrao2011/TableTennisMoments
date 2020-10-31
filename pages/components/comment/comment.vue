<template>
	<view v-if="comment" class="comment-container">
		<view class="comment-left">
			<image class="comment-avatar" :src="'/static/data/avatar/' + comment.user.avatar" alt="头像" mode="aspectFill"></image>
		</view>
		<view class="comment-right">
			<view class="comment-nick-name">{{comment.user.nickName}}</view>
			<view class="comment-comment">{{comment.data.content}}</view>
			<view class="comment-date">{{comment.data.date}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			comment:{
				type: Object,
				default: null
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.comment-container{
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: 20upx;
	}
	.comment-left{
		
	}
	.comment-left .comment-avatar{
		flex: 0 0 auto;
		position:relative;
		width:90upx;
		height:90upx;
		border-radius:1000upx;
	}
	.comment-right{
		margin-left: 20upx;
		display: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.comment-right .comment-nick-name{
		color:#007Abb;
		font-weight:bold;
		font-size: 40upx;
	}
	.comment-right .comment-comment{
		margin-top: 30upx;
		font-size: 1.2rem;
		line-height: 1.4;
		white-space: normal;
	}
	.comment-right .comment-date{
		margin-top: 30upx;
		font-size: .9rem;
		line-height: 1.4;
	}
</style>
