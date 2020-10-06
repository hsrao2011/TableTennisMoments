<template>
	<view>
		<editor placeholder=""></editor>
		<view v-for="microBlog in recommendList">
			<micro-blog :blog-data="microBlog"></micro-blog>
		</view>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	var api = require("../../../api/recommend.js")
	import microBlog from "@/pages/components/microblog/microblog.vue"
	export default {
		components:{"micro-blog":microBlog},
		data() {
			return {
				recommendList:[],
				pageIndex:0,
				loading:false,
				more:"more"
			}
		},
		mounted() {
			api.getRecommendList({refresh:true}).then((res)=>{
				this.recommendList = res.data.data.items;
				console.log(this.recommendList);
				uni.stopPullDownRefresh();
				this.pageIndex = 0;
			});
		},
		onPullDownRefresh(){
			console.log("onPullDownRefresh");
			api.getRecommendList({refresh:true}).then((res)=>{
				this.recommendList = res.data.data.items;
				console.log(this.recommendList);
				uni.stopPullDownRefresh();
				this.pageIndex = 0;
			});
		},
		onReachBottom(){
			this.loading = true;
			this.more="loading"
			api.getRecommendList({pageIndex:this.pageIndex+1}).then((res)=>{
				if(this.recommendList.length > 200){
					this.recommendList.splice(0,20);
				}
				this.recommendList = this.recommendList.concat(res.data.data.items);
				
				console.log(this.recommendList);
				uni.stopPullDownRefresh();
				this.pageIndex += 1;
				this.loading = false;
				this.more="more"
				
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
