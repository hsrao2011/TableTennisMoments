<template>
	<view>
		<view v-for="(blog, index) in recommendList">
			<post v-if="blog.data.type=='post'" :blog="blog" :brief="true" :key="index"></post>
			<acticle v-else-if="blog.data.type=='acticle'" :blog="blog" :key="index"></acticle>
			<short-video ref="shortVideo" v-else="blog.data.type=='short-video'" :blog="blog" 
			:key="index" :uniqueId="index" :brief="true"></short-video>
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
	import post from "@/pages/components/post/post.vue";
	import acticle from "@/pages/components/acticle/acticle.vue";
	import shortVideo from "@/pages/components/short-video/short-video.vue"
	import distribute from "@/pages/components/distribute/distribute.vue";
	export default {
		components:{"post": post,
			"acticle": acticle,
			"short-video": shortVideo,
			"distribute": distribute
		},
		data() {
			return {
				recommendList: [],
				pageIndex: 0,
				more: "more"
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
		onShow(){
			if(this.$refs.shortVideo){
				this.$refs.shortVideo.forEach((sv)=>{
					sv.show();
				})
			}
		},
		onHide(){
			if(this.$refs.shortVideo){
				this.$refs.shortVideo.forEach((sv)=>{
					sv.hide();
				})
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
					if(this.$refs.shortVideo){
						this.$refs.shortVideo.forEach((sv)=>{
							sv.show();
						})
					}
				}else{
					if(this.$refs.shortVideo){
						console.log("beforeForceHide");
						this.$refs.shortVideo.forEach((sv)=>{
							sv.hide();
						})
					}
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
