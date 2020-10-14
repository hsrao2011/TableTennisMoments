<template>
	<view>
		
	</view>
</template>

<script>
	import api from "@/api/blog.js"
	export default {
		data() {
			return {
				
			}
		},
		mounted(){
			var backButton = document.getElementsByClassName('uni-page-head-hd')[0]
			console.log(backButton.firstElementChild);
			backButton.firstElementChild.style.display = "none";
		},
		methods: {
			
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

<style>

</style>
