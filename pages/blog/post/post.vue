<template>
	<view>
		<button type="default" @click="onDistribute">发布</button>
	</view>
</template>

<script>
	import api from "@/api/blog.js"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onDistribute(){
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
