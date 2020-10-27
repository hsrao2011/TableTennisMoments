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
		<blog-list ref="blogList" :blogList="listBlog"></blog-list>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import { mapActions, mapState, mapGetters } from "vuex"
	import api from "@/api/follow.js"
	import blogList from "@/pages/components/blog-list/blog-list.vue"
	export default {
		components:{
			"blog-list": blogList
		},
		data() {
			return {
				listUser:[],
				listBlog: [],
				more: "loading"
			}
		},
		onLoad(){
			if(!this.userInfo)
				this.getUserInfo();
		},
		mounted(){
			this.pageIndex = 0;
			this.pageCount = 0;
			if(this.$refs.blogList){
				this.$refs.blogList.show();
			}	
		},
		onShow(){
			if(this.userInfo ){
				if(this.listUser.length == 0){
					this.loadData();
				}else if(getApp().globalData.updateBlog){
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					})
					this.loadBlog();
				}
			}
			if(this.$refs.blogList){
				this.$refs.blogList.show();
			}
		},
		onHide(){
			if(this.$refs.blogList){
				this.$refs.blogList.hide();
			}
		},
		mounted(){
			this.pageIndex = 0;
			this.pageCount = 0;
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
				if(!this.userInfo){
					this.getUserInfo();
					this.more = "noMore";
					uni.stopPullDownRefresh();
					return;
				}
				api.getFollowUserList({userId: this.userInfo.id}).then((res)=>{
					this.listUser = res.data.items;
				}).catch(err=>{
					console.log(err);
				});
				this.loadBlog(true);
			},
			loadBlog(refresh=true){
				if(refresh){
					api.getFollowBlogList({refresh:true}).then((res)=>{
						this.listBlog = res.data.items;
						getApp().globalData.updateBlog = false;
						this.pageCount = res.data.pageCount;
						this.pageIndex = res.data.pageIndex;
						uni.stopPullDownRefresh();
						if(this.pageIndex + 1 == this.pageCount)
							this.more = "noMore";
						else
							this.more="more"
					}).catch(err=>{
						console.log(err);
					});
				}else{
					api.getFollowBlogList({pageIndex: this.pageIndex + 1}).then((res)=>{
						if(this.listBlog.length > 200){
							this.listBlog.splice(0,20);
						}
						this.listBlog = this.listBlog.concat(res.data.items);
						this.pageCount = res.data.pageCount;
						this.pageIndex = res.data.pageIndex;
						if(this.pageIndex + 1 == this.pageCount)
							this.more = "noMore";
						else
							this.more="more"
					}).catch(err=>{
						console.log(err);
					});
				}
			}
		},
		onPullDownRefresh(){
			this.more="loading"
			this.loadData();
		},
		onReachBottom(){
			if(this.more == "noMore")
				return;
			this.more="loading"
			this.loadBlog(false);
		},
	}
</script>

<style scoped>
	.container{
		width: 100%;
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
		margin: 20upx 0 20upx 0;
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
		display: inline-block;
		margin-top: 15upx;
		font-size: 24upx;
		text-overflow: ellipsis;
		width: 100upx;
		overflow: hidden;
		line-height: 30upx;
	}
</style>
