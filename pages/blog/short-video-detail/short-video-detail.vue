<template>
	<view v-if="blog" class="bsvd-container">
		<view id="bsvd-video-container" class="bsvd-video-container-fixed">
			<view class="bsvd-video-container-relative">
				<video  id="short-video-detail" class="bsvd-video" 
					:src="blog.data.content" :initial-time="playPos(uniqueName)" autoplay
					controls  show-center-play-btn 
					@play="onVideoPlaying" @ended="onVideoCompleted" @pause="onVideoPaused"
					@timeupdate="onVideoPos" >
					<cover-image v-show="!onlyVideo" src="/static/icon/btn-play-return.png" class="bsvd-back-btn" @click="onBack"></cover-image>
				</video>
			</view>
			<user-base-info class="bsvd-user-base-info" :user="blog.user"></user-base-info>
		</view>
		<view class="bsvd-content">
			<view class="bsvd-placeholder" :style="{height: fixedHeight + 'px'}"></view>
			<text class="bsvd-content-title">{{blog.data.title}}</text>
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
	import { mapMutations, mapGetters } from "vuex"
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
				fixedHeight: 0,
				videoPaddingHeight: 60
			}
		},
		onLoad(){
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			// #endif
			this.playState = kPlayState.stopped;
			this.eventChannel = this.getOpenerEventChannel()
			let that = this;
			this.eventChannel.on('acceptDataFromOpenerPage', function(data) {
				that.blog = Object.assign({}, {}, data.blog);
				that.$nextTick(function(){
					that.refreshComment();
					that.$nextTick(function(){
						const query = uni.createSelectorQuery().in(that);
						query.select("#bsvd-video-container").boundingClientRect(data => {
							if(data){
								that.fixedHeight = data.height;
							}
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
				that.landscape = matches
			})
		},
		onUnload(){
			this.landscapeObserver.disconnect();
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(false);
			// #endif
			this.setPlayPos({videoId: this.uniqueName, pos: this.pos});
		},
		computed:{
			...mapGetters("video",{
				playPos: "playPos"
			}),
			isPlaying(){
				return this.playState == kPlayState.playing;
			},
			onlyVideo(){
				return this.landscape;
			},
			uniqueName(){
				return this.blog.data.id;
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
			...mapMutations("video",{
				setPlayPos: "setPlayPos"
			}),
			initVideoPlaceHolderHeight(){
				that.$nextTick(function(){
					const query = uni.createSelectorQuery().in(that);
					query.select("#fixed").boundingClientRect(data => {
						that.fixedHeight = data.height;
					}).exec();
				})
			},
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
	.bsvd-container{
		width: 100%;
		height: 100%;
		min-height: 100vh;
		background-color: #fff;
	}
	.bsvd-video-container-fixed{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		background-color: #fff;
		z-index: 100;
	}
	.bsvd-video-container-relative{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 60%;
		overflow: hidden;
		background-color: red;
	}
	.bsvd-video{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.bsvd-user-base-info{
		padding: 30upx;
	}
	.bsvd-placeholder{
		width: 100%;
		height: 0;
		background-color: rgba(0,0,0,0);
	}
	.bsvd-content{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.bsvd-content-title{
		padding: 30upx 30upx 30upx 30upx;
		font-size: 1.4rem;
		font-weight: 550;
		line-height:1.2;
	}
	.bsvd-back-btn{
		padding: 15upx;
		position: absolute;
		top: 40upx;
		left: 30upx;
		width: 56upx;
		height: 56upx;
		background-color: rgba(0,0,0,0.2);
	}
</style>
