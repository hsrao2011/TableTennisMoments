<template>
	<view class="container">
		<view class = "user">
			<image class="avatar" :src="'/static/data/avatar/' + userInfo.avatar" alt="头像" mode=""></image>
			<text class="nick-name">{{userInfo.nickName}}</text>
		</view>
		<view class="cu-list grid col-3">
			<view class="cu-item" v-for="(item, index) in distributeList" :key="index"
				@click="onItemClick(index)">
				<view :class="'cuIcon-'+item[1]" class="lg text-red"></view>
				<text class="text-red">{{item[0]}}</text>
			</view>
		</view>
		<view class="close">
			<text @click="onClose">X</text>
		</view>
	</view>
</template>

<script>
	import { mapActions, mapState } from "vuex"
	export default {
		data() {
			return {
				distributeList:[
					["发微文", "comment"],
					["写文章", "edit"],
					["发短视频", "video"]
				]
			}
		},
		computed:{
			...mapState("user", {
				userInfo: "userInfo"
			})
		},
		methods: {
			onClose(e){
				this.$emit("close",  e);
			},
			onItemClick(index){
				this.onClose();
				var toUrl;
				switch(index){
					case 0:{
						toUrl = "../../blog/post/post";
					}
					break;
					case 1:{
						toUrl = "../../blog/acticle/acticle";
					}
					break;
					case 2:{
						
					}
					break;
				}
				if(toUrl){
					uni.navigateTo({
						url:toUrl
					})
				}
			}
		}
	}
</script>

<style scoped>
	
	.container{
		background-color: #f8f8f8;
		height: 420upx;
		padding: 10upx 10upx;
	}
	
	.user{
		display: flex;
		background-color: #f8f8f8;
		justify-content: flex-start;
		padding: 10upx 20upx;
		margin: 30upx 10upx;
		align-items: center;
	}
	.user .avatar{
		flex-shrink: 0;
		backgroun-color: #d81e06;
		width: 60upx;
		height: 60upx;
		border-radius:100upx;
	}
	
	.user .nick-name{
		font-weight:bolder;
		font-size: 30upx;
		margin-left: 20upx;
	}
	.close{
		position: absolute;
		bottom: 25upx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.close text{
		text-align: center;
		width: 40upx;
		font-size: 40upx;
	}
</style>
