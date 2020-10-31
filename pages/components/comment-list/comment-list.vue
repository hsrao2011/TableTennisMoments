<template>
	<view class="comment-list-container">
		<view class="" v-for="(item, index) in commentList" :key="index">
			<comment :comment="item"></comment>
		</view>
	</view>
</template>

<script>
	import api from "../../../api/comment.js";
	import comment from "../comment/comment.vue"
	export default {
		components:{
			"comment": comment
		},
		props:{
			targetId: {
				type: Number,
				default: 0
			},
			targetType: {
				type: String,
				default: "blog-comment"
			}
		},
		data() {
			return {
				commentList: [],
				pageIndex: 0,
			}
		},
		methods: {
			loadFirst(success){
				api.getCommentList({targetId:this.targetId, targetType: this.targetType}).then((res)=>{
					this.commentList = res.data.items;
					this.pageCount = res.data.pageCount;
					this.pageIndex = res.data.pageIndex;
					success({pageIndex: this.pageIndex, pageCount: this.pageCount});
				});
			},
			loadMore(success){
				api.getCommentList({targetId:this.targetId, targetType: this.targetType,
				 pageIndex: this.pageIndex+1}).then((res)=>{
					if(this.commentList.length > 200){
						this.commentList.splice(0,20);
					}
					this.commentList = this.commentList.concat(res.data.items);
					this.pageCount = res.data.pageCount;
					this.pageIndex = res.data.pageIndex;
					success({pageIndex: this.pageIndex, pageCount: this.pageCount});
				});
			}
		},
		mounted() {
			
		},
	}
</script>

<style scoped>
	.comment-list-container{
		width: 100%;
		background-color: #fff;
		padding: 0 30upx 0 30upx;
		margin-top: 20upx;
	}
</style>
