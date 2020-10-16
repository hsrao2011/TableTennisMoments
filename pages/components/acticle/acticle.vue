<template>
	<view>
		<text >{{blog.user.nickName}}</text>
		<editor id="editor" class="ql-container" :read-only="readOnly" @ready="onEditorReady">
		</editor>
	</view>
</template>

<script>
	export default {
		props:["blog"],
		data() {
			return {
				readOnly: true,
			}
		},
		onLoad(){
			console.log(blog.data);
		},
		methods: {
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
				console.log(this.blog.data);
				this.editorCtx.setContents({delta:this.blog.data.content});
			},
		}
	}
</script>

<style>

</style>
