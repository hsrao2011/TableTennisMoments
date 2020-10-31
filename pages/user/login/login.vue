<template>
	<view class="ttm-container">
		<view class="logo-container">
			<image class="logo" src="/static/data/img/u=2212215555,3661228960&fm=26&gp=0.jpg"></image>
			<view class="">乒乓交流学习</view>
		</view>
		<view class="login-container">
			<view class="a">中国移动认证</view>
			<view class="b">138****8888</view>
			<button class="c" type="default" @click="onLogin">本机一键登录</button>
			<view class="d">登录即同意《中国移动认证服务条款》及"用户协议"和"隐私政策"</view>
		</view>
		
	</view>
</template>

<script>
	import { mapActions} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		mounted(){
			if(document){
				var backButton = document.getElementsByClassName('uni-page-head-hd')[0]
				if(backButton)
					backButton.style.display = 'none';	
			}
		},
		onLoad(){
		},
		onNavigationBarButtonTap(e){
			if(e.type === "close"){
				uni.navigateBack();
			}
		},
		methods: {
			...mapActions("user", {
				login: "login",
				getUserInfo: "getUserInfo"
			}),
			onLogin(){
				uni.showLoading({
					title: "登录中..."
				});
				this.login().then(res => {
					
					this.getUserInfo().then(res => {
						var pages = getCurrentPages();
						if(pages.length <= 1){
							uni.switchTab({
								url:"../../tabbar/home/home"
							})
						}else{
							uni.navigateBack({
								delta: 1
							});
						}
						uni.hideLoading();
					}).catch( res => {
						uni.showToast({
							title:"获取用户信息失败!",
							duration: 3000
						})
						uni.hideLoading();
					})
				}).catch(res => {
					uni.showToast({
						title:"登录失败!",
						duration: 3000
					})
					uni.hideLoading();
				});
			}
		}
	}
</script>

<style scoped>
	.ttm-container{
		background-color: #f8f8f8;
	}
	.logo-container{
		margin: 100upx;
		display:flex;
		flex-direction: column;
		align-items: center;
	}
	.logo{
		width: 200upx;
		height: 200upx;
		border-radius: 20upx;
	}
	.login-container{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 60%;
		margin-left: auto;
		margin-right: auto;
	}
	.login-container>.a{
		color: #999;
		font-size: 0.7rem;
		margin-bottom: 10upx;
	}
	.login-container>.b{
		color: #000;
		font-size: 1.2rem;
		font-weight:bold;
		margin-bottom: 10upx;
	}
	.login-container>.c{
		margin-bottom: 10upx;
		width: 80%;
		height: 75upx;
		line-height: 75upx;
		background-color: #d81e06;
		color: #fff;
		font-size: 1rem;
	}
	.login-container>.d{
		font-size: 0.7rem;
		text-align: center;
		color: #999;
	}
	
	
</style>
