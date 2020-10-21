<template>
	<view>
		<view class="container">
			<user-base-info :user="blog.user"></user-base-info>
			<view class="content">
				<text class="content-title" :class="brief?'content-title-brief':''" @click="onContentClick">{{blog.data.title}}</text>
				<view class="content-video-container" >
					<video v-if="showVideo" :id="videoId" class="content-video" :src="blog.data.content"
					   :controls="false"  :muted="!thumbnail" show-center-play-btn="false"
						@play="onVideoPlaying" :initial-time="pos" @ended="onVideoCompleted" @pause="onVideoPaused"
						@timeupdate="onVideoPos">
						<cover-view 
							class="video-cover "	:class="thumbnail?'video-conver-transparent':''"
							@click="onVideoClick">
						</cover-view>
						<cover-image v-show="!isPlaying"
							src="/static/icon/btn-play-center.png"
							class="play-btn"
							@click="onPlayVideo">
						</cover-image>
					</video>
					
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import userBaseInfo from "../user-base-info/user-base-info"
	import {kPlayState} from "@/common/types.js"
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
				thumbnail: false,
				pos: 0,
				showVideo: false,
				playState: kPlayState.stopped
			}
		},
		computed:{
			videoId(){
				return "video-" + this.uniqueId;
			},
			isPlaying(){
				return this.playState == kPlayState.playing;
			}
		},
		mounted(){
			this.playState = kPlayState.stopped;
			this.autoPlay = false;
			this.timer = 0;
			console.log("mounted");
			this.videoContext = uni.createVideoContext(this.videoId, this);
			console.log(this.videoContext != null);
			
			this.observer = uni.createIntersectionObserver(this);
			this.observer.relativeToViewport().observe('.container', (res) => {
				if (res.intersectionRatio > 0) {
					this.showVideo = true;
					if(this.timer){
						clearTimeout(this.timer);
					}
					if(this.autoPlay){
						this.autoPlay = false;
						if(this.playState != kPlayState.playing ){
							this.videoContext.play();
							console.log("video play called")
						}
					}
					if(!this.thumbnail){
						this.$nextTick(function(){
							this.videoContext.play();
						})
					}
				} else{
					if(this.playState == kPlayState.playing){
						this.autoPlay = true;
						this.videoContext.pause();
					}
					this.timer = setTimeout(()=>{
						this.showVideo = false;
						this.thumbnail = false;
						this.playState = kPlayState.stopped
						this.timer = 0;
					}, 30000);
				}
			})
		},
		destroyed(){
			if(this.observer) {
				this.observer.disconnect()
			}
		},
		
		methods: {
			onContentClick(){
				let that = this;
				uni.navigateTo({
					/*url: "/pages/blog/post-detail/post-detail",
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', { blog: that.blog })
					}*/
				})
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
				if(!this.thumbnail){
					this.$nextTick(function(){
						this.videoContext.pause();
					})
				}
				this.playState = kPlayState.playing;	
			},
			onVideoPaused(){
				this.playState = kPlayState.paused;
				if(!this.thumbnail){
					this.videoContext.seek(0);
					this.thumbnail = true;
				}
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
		padding-bottom: 60%;
		height: 0;
		overflow: hidden;
	}
	.content-video{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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
</style>
