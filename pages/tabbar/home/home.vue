<template>
	<view>
		<view v-for="microBlog in recommendList">
			<micro-blog :blog-data="microBlog"></micro-blog>
		</view>
		<uni-load-more :status="more"></uni-load-more>
		<uni-popup ref="popup" type="bottom" @change="onPopupChanged">
			<distribute @close="onCloseDistribute"></distribute>
		</uni-popup>
	</view>
</template>

<script>
	import { mapActions, mapState, mapGetters } from "vuex"
	import api from "../../../api/recommend.js";
	import microBlog from "@/pages/components/microblog/microblog.vue";
	import distribute from "@/pages/components/distribute/distribute.vue";
	export default {
		components:{"micro-blog":microBlog,
			"distribute": distribute
		},
		data() {
			return {
				recommendList:[],
				pageIndex:0,
				more:"more"
			}
		},
		mounted() {
			api.getRecommendList({refresh:true}).then((res)=>{
				this.recommendList = res.data.items;
				uni.stopPullDownRefresh();
				this.pageIndex = 0;
			});
		},
		onPullDownRefresh(){
			console.log("onPullDownRefresh");
			api.getRecommendList({refresh:true}).then((res)=>{
				this.recommendList = res.data.items;
				uni.stopPullDownRefresh();
				this.pageIndex = 0;
			});
		},
		onReachBottom(){
			this.more="loading"
			api.getRecommendList({pageIndex:this.pageIndex+1}).then((res)=>{
				if(this.recommendList.length > 200){
					this.recommendList.splice(0,20);
				}
				this.recommendList = this.recommendList.concat(res.data.items);
				
				uni.stopPullDownRefresh();
				this.pageIndex += 1;
				this.more="more"
			});
		},
		onNavigationBarButtonTap(e){
			console.log(e);
			if(e.index == 0){
				if(this.isLogined){
					uni.hideTabBar();
					this.$refs.popup.open();
				}else{
					uni.showToast({
						title: "已经离线，请重新登录后再发布",
						duration: 2000
					});
					uni.navigateTo({
						url: "../../user/login/login",
					})
				}
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
			onPopupChanged(e){
				if(!e.show){
					uni.showTabBar();
				}
			},
			onCloseDistribute(e){
				this.$refs.popup.close();
				uni.showTabBar();
			}
		}
	}
</script>

<style>

</style>
