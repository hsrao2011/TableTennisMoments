<template>
	<view class="container">
		<view class='content'>
			<view class="flex flex-direction align-start justify-start">
				<textarea class="title-editor" v-model:value="title"
				 placeholder-style="font-size: 1.6rem; font-weight:500;" :placeholder="placeholder"
					@blur="onTitleBlur" @input="onTitleInput"/>
				<text v-if="titlePrompt" class="title-prompt" >{{titlePrompt}}</text>
			</view>
			<editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar showImgResize
				placeholder-style="font-size: 1.4rem"
				@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady"
				>
			</editor>
		</view>
		<view class='toolbar' :style="{bottom: bottom}">
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
	import apiFile from "@/api/file.js"
	import {mapMutations} from "vuex"
	import {navigateBack} from "@/pages/page.js"
	export default {
		data() {
			return {
				readOnly: false,
				title: "",
				titlePrompt: "",
				placeholder: "请输入标题(5-30个字)",
				formats: {},
				bottom: 0
			}
		},
		computed:{
		},
		mounted(){
			if(document){
				var backButton = document.getElementsByClassName('uni-page-head-hd')[0]
				if(backButton){
					console.log(backButton.firstElementChild);
					backButton.firstElementChild.style.display = "none";
				}
			}
		},
		onLoad(){
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
		},
		methods: {
			...mapMutations("user",[
				"incrementBlogCount"
			]),
			onTitleInput(){
				if(this.title.length > 30){
					this.titlePrompt = "标题字数不可多于30个字"
				}else{
					this.titlePrompt = "";
				}
			},
			onTitleBlur(){
				if(this.title.length < 5){
					this.titlePrompt = "标题字数不可少于5个字";
				}else if(this.title.length > 30){
					this.titlePrompt = "标题字数不可多于30个字"
				}else{
					this.titlePrompt = "";
				}
			},
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
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							},
							failed: (err)=>{
								console.log(err);
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
						url:"/pages/tabbar/home/home"
					})
				}else{
					uni.navigateBack({
						delta: 1,
					})
				}
				
			}else if(e.index == 1){//发布
				if(this.title.length == 0){
					this.titlePrompt = "标题字数不可少于5个字";
				}
				if(this.titlePrompt.length > 0){
					uni.showToast({
						title: this.titlePrompt,
						duration: 2000
					})
					return;
				}
				this.editorCtx.getContents({
					success:res=>{
						console.log(res);
						let delta = res.delta;
						let html  = res.html;
						let images = [];
						if(!res.delta || res.delta.ops.length <= 0){
							uni.showToast({
								title: "正文内容为空",
								duration: 2000
							})
							return;
						}
						let ops = [];
						delta.ops.forEach( (op, index) => {
							if(op.insert && op.insert.image){
								ops.push(op);
							}
						})
						let that = this;
						function createBlog(){
							var data = {};
							data.content = delta;
							data.title = that.title;
							data.html = html;
							data.images = images;
							console.log(data);
							api.createActicle(data).then((res)=>{
								that.incrementBlogCount();
								navigateBack();
								uni.showToast({title: "发布成功！",
								duration: 2000});
								console.log("发布成功！");
							}).catch((err) => {
								console.log("发布异常, 上传文章失败：" + JSON.stringify(err));
							});
						}
						if(ops.length > 0){
							let uploadCount = 0;
							try{
								ops.forEach((op, index) =>{
									console.log(op.insert.image);
									apiFile.uploadFile(op.insert.image).then(path=>{
										console.log(path);
										// #ifdef APP-PLUS
										{// 因为saveFile后，返回的文件非全路径，而无论editor、rich-text控件或jyf-parser
										// 都无法正确显示(image控件可以)，使得无法正确显示文章,
										// 以下用android的固定路径替换，并非全部android机都是该路径，故无法保证所有android机上的图片都能显示
										// iOS肯定无法显示。
										// 有服务器的话，正确的做法应该是上传服务器，再替换服务器路径。
										// 现在只是本地模拟。
											let reg = new RegExp("^_");
											path = path.replace(reg, "file:///storage/emulated/0/Android/data/io.dcloud.HBuilder/apps/HBuilder/")
											console.log(path);
										}
										// #endif
										let reg = new RegExp(op.insert.image, "g")
										html = html.replace(reg, path);
										op.insert.image = path;
										if(op.attributes && op.attributes["data-local"]){
											op.attributes["data-local"] = path;
										}
										uploadCount++;
										images.push(path);
										if(uploadCount == ops.length){
											createBlog();
										}
									});
								})
							}catch(err){
								console.log("发布异常, 图片上传失败：" + JSON.stringify(err));
							}
						}else{
							createBlog();
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	@import "./editor-icon.css";
	.container{
	}
	.content {
		padding: 10upx;
		padding-bottom: 60upx;
	}
	.title-editor{
		font-size: 1.6rem;
		font-weight: 700;
	}
	.title-prompt{
		color:#d81e06;
		font-size: 0.8rem;
		line-height: 1.2;
		border-bottom: 1px #efefef solid;
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
		border-top: 1px solid #fefefe;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		width: 100%;
		position: fixed;
		height: 60upx;
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
		margin-left: 25upx;
	}
	.toolbar>view{
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex: 0 0 auto;
		width: 160upx;
		height: 80upx;
		border-left: 1px #fefefe solid;
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
		font-size: 1.4rem;
		line-height: 1.2;
	}
	.ql-active {
		color: #06c;
	}
</style>
