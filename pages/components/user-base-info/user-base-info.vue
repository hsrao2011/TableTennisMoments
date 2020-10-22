<template>
	<view class="container">
		<view v-if="user" class="user">
			<image class="avatar" :src="'/static/data/avatar/' + user.avatar" alt="头像" mode="aspectFill"></image>
			<view class="user-info">
				<text class="nickname">{{user.nickName}}</text>
				<text class="intro">{{user.intro}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			"user"
		],
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.container{
		
	}
	.user{
		display:flex;
		justify-content:flex-start;
		padding-top:10upx;
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
		flex: 0 0 auto;
		position:relative;
		width:90upx;
		height:90upx;
		border-radius:1000upx;
	}
	.user .nickname{
		font-weight:bold;
		font-size: 32upx;
	}
	.user .intro{
		font-size:28upx;
		color:#777;
		margin-left: 2upx;
		margin-top: 3upx;
	}
</style>
