<template>
	<view class="container">
		<user-base-info :user="blog.user"></user-base-info>
		<view class="content">
			<text class="content-title" :class="brief?'content-title-brief':''" @click="onContentClick">{{blog.data.title}}</text>
			<view class="content-video-container" >
				<video v-if="isRenderVideo" :id="videoId" class="content-video" :src="blog.data.content"
				   :controls="false" show-center-play-btn="false"
					:muted="!isThumbnailReady" :initial-time="pos"
					@play="onVideoPlaying"  @ended="onVideoCompleted" @pause="onVideoPaused"
					@timeupdate="onVideoPos" @error="onVideoError">
					<cover-view 
						class="video-cover " :class="isThumbnailReady?'video-conver-transparent':''"
						@click="onVideoClick">
					</cover-view>
					<cover-image v-show="isShowPlayBtn"
						src="/static/icon/btn-play-center.png"
						class="play-btn"
						@click="onPlayVideo">
					</cover-image>
					<cover-image v-show="isGotoDetailBtn"
						src="/static/icon/btn-play-goto-detail.png"
						class="detail-btn"
						@click="onGotoDetail">
					</cover-image>
				</video>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	
	
	import userBaseInfo from "../user-base-info/user-base-info"
	import {kPlayState, kShortVideoGetThumbnailStage} from "@/common/types.js"
	export default {
		components:{
			"user-base-info": userBaseInfo
		},
		props:{
			blog: Object,
			brief: {
				type: Boolean,
				default: false
			},
			uniqueId:{
				type: Number,
				default: Math.floor(Math.random() * 1000000)
			}
		},
		data() {
			return {
				thumbnail: kShortVideoGetThumbnailStage.none,
				pos: 0,
				isInViewPort: false,
				playState: kPlayState.stopped,
				hideVideo: false,
				autoPlay: false
			}
		},
		computed:{
			videoId(){
				return "video-" + this.uniqueId;
			},
			isPlaying(){
				return this.playState == kPlayState.playing;
			},
			isThumbnailReady(){
				return this.thumbnail == kShortVideoGetThumbnailStage.ready;
			},
			isShowPlayBtn(){
				return !this.isPlaying && !this.autoPlay;
			},
			isRenderVideo(){
				return !this.hideVideo && ((this.isInViewPort && this.thumbnail >= kShortVideoGetThumbnailStage.getting) || (
				!this.isInViewPort && this.thumbnail == kShortVideoGetThumbnailStage.ready));
			},
			isGotoDetailBtn(){
				return this.brief && this.isInViewPort;
			}
		},
		mounted(){
			this.debug = true;
			this.videoContext = uni.createVideoContext(this.videoId, this);
			this.timerHide = 0;
			let that = this;
			that.createIntersectionObserver();
			setInterval(function() {
				// fix: uniapp 如果长时间observe，会产生异常，
				//      造成不再触发事件
				that.createIntersectionObserver();
			}, 10000);
		},
		destroyed(){
			this.releaseIntersectionObserver();
		},
		methods: {
			log(msg){
				if(this.debug && this.isInViewPort){
					console.log(msg);
				}
			},
			createIntersectionObserver(){
				this.releaseIntersectionObserver();
				if(this.hideVideo)
					return;
				let that = this;
				try{
					this.observer = uni.createIntersectionObserver(this);
					this.observer.relativeToViewport().observe('.content-video-container', res=>{
						that.intersectionObserver(res);
					});
				}
				catch(err){
				}
			},
			releaseIntersectionObserver(){
				if(this.observer) {
					try{
						console.log("before disconnect");
						this.observer.disconnect()
						console.log("end disconnect");
						this.observer = null;
					}catch(err){
						
					}
				}
			},
			intersectionObserver(res){
				if(this.hideVideo)
					return;
				try{
					if (res.intersectionRatio > 0) {
						if(this.isInViewPort)
							return;
						this.isInViewPort = true;
						this.log("enter viewport: " + this.toString());
						if(this.timerHide){
							clearTimeout(this.timerHide);
							this.timerHide = 0;
						}
						if(this.autoPlay){
							this.thumbnail = kShortVideoGetThumbnailStage.ready;
							if(this.playState != kPlayState.playing ){
								this.$nextTick(function(){
									this.videoContext.play();
								})
							}
						}else{
							this.prepareThumbnail();
						}
					} else{
						if(!this.isInViewPort)
							return;
						this.log("leave viewport: " + this.toString());
						if(this.timerGetThumbnail){
							this.thumbnail = kShortVideoGetThumbnailStage.none;
							clearTimeout(this.timerGetThumbnail);
							this.timerGetThumbnail = 0;
						}
						if(!this.timerHide){
							this.timerHide = setTimeout(()=>{
								this.stop();
								this.timerHide = 0;
							}, 2000);
						}
						if(this.thumbnail == kShortVideoGetThumbnailStage.getting){
							this.videoContext.pause();
							this.thumbnail = kShortVideoGetThumbnailStage.none;
						}else if(this.thumbnail == kShortVideoGetThumbnailStage.ready){
							if(this.playState == kPlayState.playing){
								this.autoPlay = true;
								this.videoContext.pause();
							}
						}
						this.isInViewPort = false;
					}
				}catch(err){
					console.log("intersectionObserver exception!" + JSON.stringify(err));
				}
			},
			stop(){
				if(this.thumbnail == kShortVideoGetThumbnailStage.ready && this.playState == kPlayState.playing){
					this.autoPlay = true;
				}
				this.videoContext.stop();
				this.thumbnail = kShortVideoGetThumbnailStage.none;
				this.playState = kPlayState.stopped;
				this.log("short-video stop: " +  this.toString());
			},
			prepareThumbnail(){
				if(this.thumbnail == kShortVideoGetThumbnailStage.none && this.isInViewPort){
					this.thumbnail = kShortVideoGetThumbnailStage.waitingTimer;
					// 避免快速刷列表时，浪费性能
					this.timerGetThumbnail = setTimeout(()=>{
						this.thumbnail = kShortVideoGetThumbnailStage.getting;
						this.timerGetThumbnail = 0;
						this.$nextTick(function(){
							this.videoContext.play();
						})
					},300);
					this.log("short-video prepareThumbnail start: " + this.toString());
				}
			},
			toString(){
				return "id:"+ this.uniqueId +",isInViewPort:" + this.isInViewPort + ",thumbnail:" + this.thumbnail + ",autoPlay:" + this.autoPlay + ",state:"+this.playState +",pos:"+this.pos;
			},
			hide(){
				this.log("short-video hide: " + this.toString());
				this.stop();
				this.hideVideo = true;
				this.releaseIntersectionObserver();
			},
			show(){
				this.hideVideo = false;
				this.log("short-video show: " + this.toString());
				if(this.autoPlay){
					this.thumbnail = kShortVideoGetThumbnailStage.ready;
					this.$nextTick(function(){
						this.videoContext.play();
					})
				}else{
					this.prepareThumbnail();
				}
				this.createIntersectionObserver();
			},
			gotoDetail(){
				let that = this;
				uni.navigateTo({
					url: "/pages/blog/short-video-detail/short-video-detail",
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', 
						 { blog: that.blog, startPos: that.pos});
						res.eventChannel.on('acceptReturnData', function(data){
							that.pos = data.startPos;
						})
					}
				})
			},
			onGotoDetail(){
				this.gotoDetail();
			},
			onContentClick(){
				this.gotoDetail();
			},
			onVideoClick(){
				if(this.isPlaying){
					this.videoContext.pause();
				}
			},
			onPlayVideo(){
				this.videoContext.play();
			},
			onVideoCompleted(event){
				this.videoContext.seek(0);
				this.playState = kPlayState.stopped;
			},
			onVideoPlaying(){
				if(this.thumbnail == kShortVideoGetThumbnailStage.getting){
					this.$nextTick(function(){
						this.videoContext.pause();
					})
				}
				this.autoPlay = false;
				this.playState = kPlayState.playing;	
			},
			onVideoPaused(){
				this.playState = kPlayState.paused;
				if(this.thumbnail == kShortVideoGetThumbnailStage.getting){
					this.videoContext.seek(this.pos);
					this.thumbnail = kShortVideoGetThumbnailStage.ready;
				}
			},
			onVideoPos(e){
				if(this.thumbnail == kShortVideoGetThumbnailStage.ready)
					this.pos = e.detail.currentTime;
			},
			onVideoError(event){
				uni.showToast({
					title: "视频播放异常！",
					duration: 2000
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		background-color:#fff;
		padding: 15upx 15upx 0 15upx;
		margin-bottom: 10upx;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top:15upx;
	}
	.content-title{
		padding: 10upx 10upx 0 10upx;
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.2;
	}
	.content-title-brief{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;  //需要显示时文本行数
	}
	.content-video-container{
		width: 100%;
		position: relative;
		margin-top: 20upx;
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
	.video-cover{
		width: 100%;
		height: 100%;
	}
	.video-conver-transparent{
		background-color: rgba(0,0,0,0);
	}
	.play-btn{
		position: absolute;
		top: calc(50% - 50upx);
		left: calc(50% - 50upx);
		width: 100upx;
		height: 100upx;
		background-color: rgba(0,0,0,0);
	}
	.detail-btn{
		padding: 5upx;
		position: absolute;
		top: 30upx;
		right: 30upx;
		width: 60upx;
		height: 60upx;
		background-color: rgba(0,0,0,0.2);
	}
</style>
