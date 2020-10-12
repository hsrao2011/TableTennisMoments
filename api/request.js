import utils from "@/utils/utils.js";
import store from "@/store/index.js";
import error from "@/api/error.js";

export function request(api, param, data){
	return new Promise(function(resolve, reject){
		uni.request({
			url: api.url + utils.param2Query(param),
			header: {"x-token":store.state.user.token},
			method: api.type,
			data: data,
			success: res => {
				// 拦截响应
				console.log(res.data);
				if(res.data.code == error.tokenNotExist.code
					|| res.data.code == error.tokenInvalid.code
					|| res.data.code == error.tokenExpired.code){
					// token不存在，无效或者过期重新登录
					console.log(res.data);
					uni.navigateTo({
						url: "../../user/login/login",
						fail:(res)=>{
							console.log(res);
						}
						})
				}
				resolve(res)
			},
			fail: (res) => {
				uni.showToast({
					title: res
				});
			},
			complete: () => {
			}
		});
	})
}
