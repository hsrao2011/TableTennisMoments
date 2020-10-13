import utils from "@/utils/utils.js";
import store from "@/store/index.js";
import error from "@/api/error.js";
import apiDesc from "@/api/desc.js"

export function request({api, params, data}){
	var header = {};
	header["x-token"] = store.state.user.token;
	if(api == apiDesc.user.refreshToken){
		header["x-refresh-token"] = store.state.user.refreshToken;	
	}
	return new Promise(function(resolve, reject){
		uni.request({
			url: api.url + utils.param2Query(params),
			header: header,
			method: api.type,
			data: data,
			success: res => {
				// 拦截响应
				var code = res.data.code;
				if(code == error.ok.code){
					resolve(res)
					return;
				}
				console.log("请求失败：" + api.url + " " + JSON.stringify(res.data));
				// 如果是刷新token请求，失败后直接返回，不需要进一步处理
				if(api == apiDesc.user.refreshToken){
					reject(res);
					return;
				}
				if(code == error.tokenExpired.code){
					// token过期，则自动刷新token
					store.dispatch("user/refreshToken").then(res => {
						console.log("重新自动发起请求");
						request({api: api, params: params, data: data}).then(res => {
							console.log("重新请求成功");
							resolve(res);
						}).catch( res => {
							console.log("重新请求失败: " + JSON.stringify(res));
							reject(res);
						})
					}).catch( res => {
						console.log("自动跳转到登录页面");
						uni.navigateTo({
							url: "../../user/login/login",
						})
						reject(res);
					});
				}
				else{
					if(code == error.tokenNotExist.code	|| code == error.tokenInvalid.code){
						// token不存在或者无效，则需要重新登录
						store.dispatch("user/logout").then(
							res => {
								uni.navigateTo({
									url: "../../user/login/login",
								})
							}
						)
					}	
					reject(res);
				}
			},
			fail: (res) => {
				uni.showToast({
					title: res
				});
				reject(res);
			}
		});
	})
}
