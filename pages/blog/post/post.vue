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
					
				});
			}
		}
	}
</script>

<style>

</style>
