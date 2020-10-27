<template>
	<view class="container">
		<view v-for="(blog, index) in blogList" :key="index">
			<post v-if="blog.data.type=='post'" :blog="blog" :brief="true" ></post>
			<acticle v-else-if="blog.data.type=='acticle'" :blog="blog"></acticle>
			<short-video v-else-if="blog.data.type=='short-video'" ref="shortVideo" :blog="blog" 
			   :uniqueId="index" :brief="true"></short-video>
		</view>
	</view>
</template>

<script>
	import post from "@/pages/components/post/post.vue";
	import acticle from "@/pages/components/acticle/acticle.vue";
	import shortVideo from "@/pages/components/short-video/short-video.vue"
	export default {
		components:{
			"post": post,
			"acticle": acticle,
			"short-video": shortVideo,
		},
		props:{
			blogList:{
				type: Array,
				default: []
			}
		},
		data() {
			return {
			}
		},
		methods: {
			show(){
				if(this.$refs.shortVideo){
					this.$refs.shortVideo.forEach((sv)=>{
						sv.show();
					})
				}
			},
			hide(){
				if(this.$refs.shortVideo){
					this.$refs.shortVideo.forEach((sv)=>{
						sv.hide();
					})
				}
			}
		}
	}
</script>

<style>
	.container{
	}

</style>
