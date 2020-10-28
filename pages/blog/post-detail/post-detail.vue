<template>
	<view  class="container">
		<view v-if="blog" class="content">
			<post :blog="blog" :imageColCount="2"></post>
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
		min-height: 100%;
		padding: 10upx 30upx 0upx 30upx;
		background-color: #fff;
	}
	.content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
	}
</style>
