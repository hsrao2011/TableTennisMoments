<template>
	<view class="distribute-container">
		<view v-if="userInfo" class = "user">
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
					["发视频", "video"]
				]
			}
		},
		computed:{
			...mapState("user", {
				userInfo: "userInfo"
			})
		},
		mounted(){
			if(!this.userInfo)
				this.getUserInfo();
		},
		methods: {
			...mapActions("user", {
				getUserInfo: "getUserInfo"
			}),
			onClose(e){
				this.$emit("close",  e);
			},
			onItemClick(index){
				this.onClose();
				new Promise((resolve, reject) =>{
					switch(index){
						case 0:{
							resolve({url: "/pages/blog/post/post"});
						}
						break;
						case 1:{
							resolve({url: "/pages/blog/acticle/acticle"});
						}
						break;
						case 2:{
							uni.chooseVideo({
								count: 1,
								maxDuration: 600,
								success: res => {
									resolve({url: "/pages/blog/short-video/short-video",
										params: res
									});
								},
								fail: err => {
									reject();
								}
							})
						}
						break;
						default:{
							reject();
						}
						break;
					}	

				}).then( to => {
					uni.navigateTo({
						url: to.url,
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							if(to.params)
								res.eventChannel.emit('acceptDataFromOpenerPage', { params: to.params })
						}
					})
				}).catch(err =>{
					console.log(err);
					uni.showToast({
						title: "选择视频文件错误",
						duration:2000
					})
				})
			}
		}
	}
</script>

<style scoped>
	.distribute-container{
		background-color: #f8f8f8;
		width: 100%;
		height: 420upx;
		padding: 10upx 0upx;
	}
	.user{
		display: flex;
		background-color: #f8f8f8;
		justify-content: flex-start;
		align-items: center;
		padding: 10upx 20upx;
		margin: 30upx 10upx;
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
