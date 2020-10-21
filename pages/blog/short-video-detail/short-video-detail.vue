<template>
	<view class="container">
		<view class="content-video-container" >
			<video v-if="blog" id="video-detail" class="content-video" :src="blog.data.content"
			   :controls="true"  show-center-play-btn="true" autoplay="true"
				@play="onVideoPlaying" @ended="onVideoCompleted" @pause="onVideoPaused"
				@timeupdate="onVideoPos">
				<cover-image src="/static/icon/btn-play-return.png" class="backButton" @click="onBack"></cover-image>
			</video>
			<image v-else src="/static/icon/btn-play-return.png" class="backButton" @click="onBack"></image>
		</view>
		<view class="content" v-if="blog">
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
				playState: kPlayState.stopped,
			}
		},
		onLoad(){
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
			
			this.playState = kPlayState.stopped;
			const eventChannel = this.getOpenerEventChannel()
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			let that = this;
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.blog = Object.assign({}, {}, data.blog);
				that.videoContext = uni.createVideoContext("video-detail", that);
			})
			
		},
		onUnload(){
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
		},
		computed:{
			isPlaying(){
				return this.playState == kPlayState.playing;
			}
		},
		destroyed(){
			if(this.observer) {
				this.observer.disconnect()
			}
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
			onVideoPos({currentTime, duration}){
				this.pos = currentTime;
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color:#fff;
		height: 100%;
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
