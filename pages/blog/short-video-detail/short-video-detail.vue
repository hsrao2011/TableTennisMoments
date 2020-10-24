<template>
	<view v-if="blog" class="container">
		<view ref="fixed" class="fixed" id="fixed">
			<view class="content-video-container"
			   :class="onlyVideo?'content-video-container-fullscreen':''">
				<video  id="short-video-detail" class="content-video" 
					:src="blog.data.content" :initial-time="startPos" autoplay
					controls  show-center-play-btn 
					@play="onVideoPlaying" @ended="onVideoCompleted" @pause="onVideoPaused"
					@timeupdate="onVideoPos" >
					<cover-image v-show="!onlyVideo" src="/static/icon/btn-play-return.png" class="backButton" @click="onBack"></cover-image>
				</video>
			</view>
			<user-base-info class="user-base-info" :user="blog.user"></user-base-info>
		</view>
		<view class="content">
			<view class="placeholder" :style="{height: fixedHeight + 'px'}"></view>
			<text class="content-title">{{blog.data.title}}</text>
			<comment-list ref="commentList" :targetId="blog.data.id" ></comment-list>
		</view>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
	import userBaseInfo from "@/pages/components/user-base-info/user-base-info.vue"
	import commentList from "@/pages/components/comment-list/comment-list.vue"
	import {kPlayState} from "@/common/types.js"
	import {navigateBack} from "@/pages/page.js"
	export default {
		components:{
			"user-base-info": userBaseInfo,
			"comment-list": commentList
		},
		data() {
			return {
				blog: null,
				more: "loading",
				pos: 0,
				startPos: 0,
				playState: kPlayState.stopped,
				landscape: false,
				controlBarVisible: true,
				fixedHeight: 0
			}
		},
		onLoad(){
			// #ifdef APP-PLUS
			plus.screen.unlockOrientation(); 
			plus.navigator.setFullscreen(true);
			// #endif
			this.playState = kPlayState.stopped;
			this.eventChannel = this.getOpenerEventChannel()
			let that = this;
			this.eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.startPos = data.startPos;
				that.blog = Object.assign({}, {}, data.blog);
				that.$nextTick(function(){
					that.refreshComment();
					that.$nextTick(function(){
						const query = uni.createSelectorQuery().in(that);
						query.select("#fixed").boundingClientRect(data => {
							that.fixedHeight = data.height;
						}).exec();
					})
					
				})
			})
		},
		onReady(){
			this.videoContext = uni.createVideoContext("short-video-detail", this);
			
		},
		mounted(){
			let that = this;
			this.landscapeObserver = uni.createMediaQueryObserver(this);
			this.landscapeObserver.observe({
				orientation: 'landscape'  //屏幕方向为纵向
			}, matches => {
				console.log("landscapeObserver:" + this.landscape);
				this.landscape = matches
			})
		},
		onUnload(){
			this.landscapeObserver.disconnect();
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			plus.screen.lockOrientation("portrait-primary"); 
			// #endif
			if(this.eventChannel){
				this.eventChannel.emit('acceptReturnData',
				 { startPos: this.pos});
			}
		},
		computed:{
			isPlaying(){
				return this.playState == kPlayState.playing;
			},
			onlyVideo(){
				return this.landscape;
			}
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
		destroyed(){
		},
		methods: {
			onBack(){
				navigateBack();
			},
			onVideoCompleted(event){
				this.videoContext.seek(0);
				this.playState = kPlayState.stopped;
			},
			onVideoPlaying(){
				this.playState = kPlayState.playing;	
			},
			onVideoPaused(){
				this.playState = kPlayState.paused;
			},
			onVideoPos(e){
				this.pos = e.detail.currentTime;
			},
			refreshComment(){
				if(!this.$refs.commentList)
					return;
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
		min-height: 100%;
		padding: 15upx;
	}
	.fixed{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		display:flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		z-index: 10;
	}
	.content-video-container{
		width: 100%;
		position: relative;
		top: 0;
		height: 0;
		padding-bottom: 60%;
		overflow: hidden;
	}
	.content-video-container-fullscreen{
		position: fixed;
		top: 0;
		left: 0;
		padding-bottom: 0;
		height: 100vh;
	},
	.content-video{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30upx;
	}
	.user-base-info{
		padding: 20upx;
	}
	.placeholder{
		width: 100%;
		height: 0;
		background-color: rgba(0,0,0,0);
	}
	.content{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.content-title{
		margin-top: 50upx;
		padding: 10upx 10upx 0 10upx;
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.2;
	}
	.backButton{
		padding: 5upx;
		position: absolute;
		top: 40upx;
		left: 30upx;
		width: 56upx;
		height: 56upx;
		background-color: rgba(0,0,0,0.2);
	}
</style>
