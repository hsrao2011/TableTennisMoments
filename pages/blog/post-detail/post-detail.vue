<template>
	<view  v-if="blog" class="container">
		<post  :blog="blog" :imageColCount="2"></post>
		<comment-list ref="commentList" :targetId="blog.data.id" ></comment-list>
		<uni-load-more v-if="more" :status="more"></uni-load-more>
	</view>
</template>

<script>
	import post from "@/pages/components/post/post.vue";
	import commentList from "@/pages/components/comment-list/comment-list.vue"
	export default {
		components:{
			"post": post,
			"comment-list": commentList
		},
		data() {
			return {
				blog: null,
				more: ""
			}
		},
		onLoad(){
			const eventChannel = this.getOpenerEventChannel()
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			let that = this;
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.blog = Object.assign({}, that.blog, data.blog);
			})
		},
		mounted(){
			this.refreshComment();
		},
		onPullDownRefresh(){
			this.refreshComment();
		},
		onReachBottom(){
			if(this.more == "noMore")
				return;
			this.more="loading"
			let that = this;
			this.$refs.commentList.loadMore((res)=>{
				uni.stopPullDownRefresh();
				if(res.pageIndex >= res.pageCount - 1 )
					that.more="noMore"
				else
					that.more="more"
			});
		},
		methods: {
			refreshComment(){
				let that = this;
				this.$refs.commentList.refresh((res)=>{
					uni.stopPullDownRefresh();
					if(res.pageIndex >= res.pageCount - 1 )
						that.more="noMore"
					else
						that.more="more"
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color:#fff;
		margin-bottom: 15upx;
	}
</style>
