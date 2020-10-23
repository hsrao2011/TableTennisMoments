<template>
	<view class="container">
		<view class="" v-for="(item, index) in commentList" >
			<comment :comment="item" :key="index"></comment>
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
			refresh(success){
				api.getCommentList({targetId:this.targetId, targetType: this.targetType}).then((res)=>{
					this.commentList = res.data.items;
					console.log(res);
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
					console.log(res);
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
	.container{
		background-color: #fff;
	}
</style>
