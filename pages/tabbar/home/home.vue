<template>
	<view>
		<button type="default" @click="onDistribute">发布</button>
		<view v-for="microBlog in recommendList">
			<micro-blog :blog-data="microBlog"></micro-blog>
		</view>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import api from "../../../api/recommend.js";
	import microBlog from "@/pages/components/microblog/microblog.vue";
	export default {
		components:{"micro-blog":microBlog},
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
		methods: {
			onDistribute(){
				/*uni.navigateTo({
					url: "../../user/login/login",
					})*/
				uni.navigateTo({
					url: "../../blog/post/post",
				});
			}
		}
	}
</script>

<style>

</style>
