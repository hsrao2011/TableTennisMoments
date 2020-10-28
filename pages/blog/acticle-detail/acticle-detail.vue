<template>
	<view  class="container">
		<view v-if="blog" class="content">
			<view class="title">
				<text>{{blog.data.title}}</text>
			</view>
			<user-base-info :user="blog.user"></user-base-info>
			<view class="ql-container">  
				<jyf-parser class="ql-editor" :html="blog.data.html" ></jyf-parser>  
			</view>
			<comment-list ref="commentList" :targetId="blog.data.id" ></comment-list>
		</view>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import userBaseInfo from "@/pages/components/user-base-info/user-base-info"
	import commentList from "@/pages/components/comment-list/comment-list.vue"
	import jyfParser from "@/components/jyf-parser/jyf-parser"
	export default {
		components:{
			"user-base-info": userBaseInfo,
			"comment-list": commentList,
			"jyf-parser": jyfParser
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
		watch:{
			blog(){
				if(!this.blog)
					return;
				// #ifdef APP-PLUS
				let localPath = "/static/data/upload/"
				let uploadPath = plus.io.convertLocalFileSystemURL(localPath);
				if(uploadPath.search("file://") < 0){
					uploadPath= "file://" + uploadPath;
				}
				let re = new RegExp(localPath, "g");
				this.blog.data.html = this.blog.data.html.replace(re, uploadPath, "g");
				// #endif
			}
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
		background-color:#fff;
		padding: 60upx 30upx 0 30upx;
		min-height: 100%;
	}
	.content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.title{
		padding: 0 10upx 0 10upx;
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.6;
	}
	.ql-container {
		box-sizing: border-box;
		padding: 12upx 15upx;
		width: 100%;
		height: auto;
		background: #fff;
		margin-top: 50upx;
		font-size: 1.4rem;
		line-height: 1.8;
	}
	.ql-editor{
		text-align: justify;
	}
	.ql-active {
		color: #06c;
	}
</style>
