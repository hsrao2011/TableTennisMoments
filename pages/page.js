export function navigateBack(){
	var pages = getCurrentPages();
	if(pages.length <= 1){
		uni.switchTab({
			url:"/pages/tabbar/home/home"
		})
	}else{
		uni.navigateBack({
			delta: 1,
		})
	}
}

