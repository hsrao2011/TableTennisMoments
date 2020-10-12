<template>
	<view>
		<button type="default" @click="login">本机一键登录</button>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
		},
		methods: {
			...mapActions({
				login: "user/login"
			})
		}
	}
</script>

<style>

</style>
