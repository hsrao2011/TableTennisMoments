<script>
export default {
	globalData:{
		updateBlog: false
	},
	onLaunch: function() {
		// #ifdef APP-PLUS
		plus.screen.lockOrientation("portrait-primary"); 
		// #endif
		
	},
	onShow: function() {
		
	},
	onHide: function() {
	},
	method:{
		on(type, obj, callback){
			if(type == "screen-orientation"){
				this.onScreenDirectionChanged = callback;
			}
		}
	}
};
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	
	uni-page-body,html,body{ 
		
	} 
	image.loading::after{
		width: 56upx;
		height: 56upx;
		line-height: 56upx;
		font-size: 56upx;
	}
		
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
