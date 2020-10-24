<template>
	<view  v-if="blog" class="container">
		<view class="content">
			<post  :blog="blog" :imageColCount="2"></post>
			<comment-list ref="commentList" :targetId="blog.data.id" ></comment-list>
			<uni-load-more :status="more"></uni-load-more>
		</view>
		
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
				more: "loading"
			}
		},
		onLoad(){
			const eventChannel = this.getOpenerEventChannel()
			let that = this;
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.blog = Object.assign({}, that.blog, data.blog);
				that.$nextTick(function(){
					that.refreshComment();
				})
			})
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
				if(res.pageIndex >= res.pageCount - 1 )
					that.more="noMore"
				else
					that.more="more"
			});
		},
		methods: {
			refreshComment(){
				this.more = "loading"
				let that = this;
				this.$refs.commentList.loadFirst((res)=>{
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
		width: 100%;
		background-color:#fff;
		margin-bottom: 15upx;
		min-height: 100%;
		padding: 15upx;
	}
</style>
