<template>
	<view class="container">
		<view v-if="userInfo" class="user">
			<view class = "base-info">
				<image class="avatar" :src="'/static/data/avatar/' + userInfo.avatar" alt="头像" mode=""></image>
				<view class="user-info">
					<text class="nick-name">{{userInfo.nickName}}</text>
					<view class="intro">{{userInfo.intro}}</view>
				</view>
			</view>
			<view class="ext-info">
				<view class="ext-info-item" v-for="(item, index) in extInfoList" :key="index">
					<view class="ext-info-name">{{item[0]}}</view>
					<view class="ext-info-value">{{item[1]}}</view>
				</view>
			</view>
		</view>
		<view class="btn-login-container">
			<button :class="btnLoginClass" @click="onLogin">{{loginButtonName}}</button>
		</view>
		<view class="placeholder"></view>
	</view>
</template>

<script>
	import { mapActions, mapState, mapGetters} from "vuex"
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapState("user", {
				userInfo: "userInfo"
			}),
			...mapGetters("user", {
				isLogined: "isLogined"
			}),
			extInfoList(){
				var list = [];
				var userInfo = this.userInfo;
				if(userInfo){
					list[0] = ["发布", userInfo.blogsCount];
					list[1] = ["被点赞", userInfo.likesCount];
					list[2] = ["粉丝", userInfo.fansCount];
					list[3] = ["关注", userInfo.followsCount];
				}
				return list;
			},
			loginButtonName(){
				if(this.isLogined){
					return "退出登录";
				}else{
					return "登录";
				}
			},
			btnLoginClass(){
				return this.isLogined ? "btn-logout":"btn-login";
			}
		},
		onLoad(){	
			if(!this.userInfo)
				this.getUserInfo();
		},
		methods: {
			...mapActions("user", {
				getUserInfo: "getUserInfo",
				logout: "logout"
			}),
			onLogin(){
				if(this.isLogined){
					this.logout();
				}else{
					uni.navigateTo({
						url: "../../user/login/login",
						animationType: 'pop-in',
						animationDuration: 1000
					})
				}
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 15upx;
		min-height: 100%;
	}
	.user{
		display: flex;
		background-color: #fefefe;
		flex-direction: column;
		justify-content: flex-start;
		padding: 50upx 40upx;
		flex: none;
	}
	.user .base-info{
		align-items: center;
		display: flex;
		flex:none;
	}
	.user .base-info .user-info{
		flex-shrink: 1
	}
	.user .base-info .avatar{
		flex-shrink: 0;
		backgroun-color: #f00;
		width: 160upx;
		height: 160upx;
		border-radius:100upx;
	}
	.user .base-info .user-info > text{
		display:block;
	}
	.user .base-info .nick-name{
		font-weight:bolder;
		font-size: 60upx;
		margin-left: 20upx;
	}
	.user .base-info .intro{
		font-size: 32upx;
		color:#ccc;
		max-height:72upx;
		margin: 10upx 10upx;
		overflow:hidden;
		text-overflow:ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;  //需要显示时文本行数
		line-height:36upx;
	}
	.ext-info{
		display: flex;
		justify-content: space-around;
		margin-top:20upx;
	}
	.ext-info-item{
		display:flex;
		flex-direction: column;
		align-items: center;
	}
	.ext-info-item .ext-info-name{
		font-size: 0.8rem;
		font-weight: bold;
		margin-bottom: 10upx;
		color: #222;
	}
	.ext-info-item .ext-info-value{
		font-size: 0.7rem;
		color: #aaa;
	}
	.btn-login-container{
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0 0 auto;
	}
	.btn-logout{
		color: #d81e06;
		margin: 50upx 0 50upx 0;
		width: 85%;
	}
	
	.btn-login{
		border-radius: 1000upx;
		border:0 solid #000;
		width:160upx;
		height: 160upx;
		margin: 50upx 0 50upx 0;
		color: #fff;
		background-color: #d81e06;
		text-align:center;
		line-height: 160upx;
	}
	.placeholder{
		flex: auto;
	}
</style>
