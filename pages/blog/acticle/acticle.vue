<template>
	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
				<editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar showImgResize
					@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
				</editor>
			</view>
		</view>
	
	<view class='toolbar'>
		<scroll-view scroll-x="true" @tap="format">
			<view class="iconfont icon-charutupian" @tap="insertImage"></view>
			<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
			<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
			<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
			 :data-value="1"></view>
			<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
			  data-value="bullet"></view>
			<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
			  data-value="ordered"></view>
			<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
			
			<view class="iconfont icon-charutupian" @tap="insertImage"></view>
			<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
			<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
			<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
			 :data-value="1"></view>
			<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
			  data-value="bullet"></view>
			<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
			  data-value="ordered"></view>
			<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
		</scroll-view>
		<view>
			<view class="iconfont icon-undo" @tap="undo"></view>
			<view class="iconfont icon-redo" @tap="redo"></view>
		</view>
	</view>
	</view>
</template>

<script>
	import api from "@/api/blog.js"
	export default {
		data() {
			return {
				readOnly: false,
				formats: {}
			}
		},
		mounted(){
			var backButton = document.getElementsByClassName('uni-page-head-hd')[0]
			console.log(backButton.firstElementChild);
			backButton.firstElementChild.style.display = "none";
		},
		onLoad(){
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
		},
		methods: {
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		},
		onNavigationBarButtonTap(e){
			console.log(e);
			if(e.index == 0){// 取消
				var pages = getCurrentPages();
				if(pages.length <= 1){
					uni.switchTab({
						url:"../../tabbar/home/home"
					})
				}else{
					uni.navigateBack({
						delta: 1,
					})
				}
				
			}else if(e.index == 1){//发布
				api.create().then((res)=>{
					uni.showToast({title: res.data.msg,
					duration: 2000});
					console.log("发布成功：");
				}).catch((res) => {
					console.log("发布异常：" + JSON.stringify(res));
				});
			}
		}
	}
</script>

<style scoped>
	@import "./editor-icon.css";

	.wrapper {
		padding: 5px;
	}

	.iconfont {
		display: inline-block;
		width: 48upx;
		height: 48upx;
		cursor: pointer;
		font-size: 48upx;
	}

	.toolbar {
		background-color: #f7f7f7;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	.toolbar>scroll-view{
		flex: 1 1 auto;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.toolbar>scroll-view view{
		flex: 0 0 auto;
		margin-left: 15upx;
	}
	.toolbar>view{
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex: 0 0 auto;
		width: 160upx;
		height: 80upx;
		border-left: 1upx #aaa solid;
	}
	.toolbar>view>view{
		flex: 0 0 auto;
		margin-left: 15upx;
	}

	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: auto;
		background: #fff;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>
