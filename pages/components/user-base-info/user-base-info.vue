<template>
	<view v-if="user" class="user-base-info-container">
		<image class="user-base-info-avatar loading" :src="'/static/data/avatar/' + user.avatar" alt="头像" mode="aspectFill"></image>
		<view class="user-base-info-user-info">
			<text class="user-base-info-nickname">{{user.nickName}}</text>
			<text class="user-base-info-intro">{{user.intro}}</text>
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
	.user-base-info-container{
		width: 100%;
		display:flex;
		justify-content:flex-start;
		align-items: center;
	}
	.user-base-info-user-info{
		margin-left: 15upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.user-base-info-user-info>text{
		display:block;
	}
	.user-base-info-avatar{
		flex: 0 0 auto;
		position: relative;
		width:90upx;
		height:90upx;
		border-radius:1000upx;
	}
	.user-base-info-nickname{
		font-weight:bold;
		font-size: 32upx;
	}
	.user-base-info-intro{
		font-size:28upx;
		color:#777;
		margin-left: 2upx;
		margin-top: 6upx;
	}
</style>
