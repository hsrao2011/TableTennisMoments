<template>
	<view class="container">
		<view class="user-list">
			<scroll-view scroll-x="true">
				<view class="user-item"  v-for="(item, index) in listUser" :key="index">
					<view class="user">
						<image class="avatar" :src="'/static/data/avatar/' + item.user.avatar" alt="头像" mode="aspectFill"></image>
						<text>{{item.user.nickName}}</text>
					</view>
				</view>
				<view class="user-item"  v-for="(item, index) in listUser" :key="index + 100">
					<view class="user">
						<image class="avatar" :src="'/static/data/avatar/' + item.user.avatar" alt="头像" mode="aspectFill"></image>
						<text>{{item.user.nickName}}</text>
					</view>
				</view>
				<view class="user-item"  v-for="(item, index) in listUser" :key="index+ 200">
					<view class="user">
						<image class="avatar" :src="'/static/data/avatar/' + item.user.avatar" alt="头像" mode="aspectFill"></image>
						<text>{{item.user.nickName}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<blog :blogList="listBlog"></blog>
	</view>
</template>

<script>
	import { mapActions, mapState, mapGetters } from "vuex"
	import api from "@/api/follow.js"
	import blog from "@/pages/components/blog/blog.vue"
	export default {
		components:{
			"blog": blog
		},
		data() {
			return {
				listUser:[],
				listBlog: []
			}
		},
		onLoad(){
			
		},
		onShow(){
			if(!this.userInfo)
				this.getUserInfo();
			else if(this.listUser.length == 0){
				this.loadData();
			}
		},
		mounted(){
		},
		watch:{
			userInfo(){
				if(!this.userInfo){
					this.listUser = [];
					this.listBlog = [];
					return;
				}
				this.loadData();
			}
		},
		computed:{
			...mapState("user", {
				userInfo: "userInfo"
			}),
			...mapGetters("user", {
				isLogined: "isLogined"
			})
		},
		methods: {
			...mapActions("user", {
				getUserInfo: "getUserInfo",
				logout: "logout"
			}),
			loadData(){
				api.getFollowUserList({userId: this.userInfo.id}).then((res)=>{
					this.listUser = res.data.items;
				});
				
				api.getFollowBlogList().then((res)=>{
					this.listBlog = res.data.items;
				});
			}
		}
	}
</script>

<style scoped>
	.container{
		padding: 20upx;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}
	.user-list > scroll-view{
		flex: 1 1 auto;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: nowrap;
	}
	.user-list .user-item{
		display: inline-block;
		flex: 0 0 auto;
		margin-left: 40upx;
		width: 100upx;
	}
	.user-item .user{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	.user .avatar{
		flex: 0 0 auto;
		position:relative;
		width:90upx;
		height:90upx;
		border-radius:1000upx;
		border: 2px red solid;
	}
	.user text{
		margin-top: 15upx;
		font-size: 24upx;
		text-overflow: ellipsis;
	}
</style>
