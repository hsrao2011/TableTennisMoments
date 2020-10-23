<template>
	<view class="container">
		<view v-if="blog" class="content-video-container"
		   :class="onlyVideo?'content-video-container-fullscreen':''">
			<video  id="short-video-detail" class="content-video" 
				:src="blog.data.content" :initial-time="startPos" autoplay
				controls  show-center-play-btn 
				@play="onVideoPlaying" @ended="onVideoCompleted" @pause="onVideoPaused"
				@timeupdate="onVideoPos" >
				<cover-image v-show="!onlyVideo" src="/static/icon/btn-play-return.png" class="backButton" @click="onBack"></cover-image>
			</video>
		</view>
		<view class="content" v-if="blog && !onlyVideo">
			<user-base-info  :user="blog.user"></user-base-info>
			<text class="content-title">{{blog.data.title}}</text>
		</view>
	</view>
</template>

<script>
	import userBaseInfo from "@/pages/components/user-base-info/user-base-info.vue"
	import {kPlayState} from "@/common/types.js"
	import {navigateBack} from "@/pages/page.js"
	export default {
		components:{
			"user-base-info": userBaseInfo
		},
		data() {
			return {
				blog: null,
				pos: 0,
				startPos: 0,
				playState: kPlayState.stopped,
				landscape: false,
				controlBarVisible: true
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
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color:#fff;
		width: 100%;
		height:100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.content-video-container{
		width: 100%;
		position: relative;
		padding-bottom: 60%;
		height: 0;
		overflow: hidden;
		background-color: #000000;
	}
	.content-video-container-fullscreen{
		padding-bottom: 0;
		height: 100%;
	},
	.content-video{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30upx;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding: 30upx;
		margin-top:15upx;
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
