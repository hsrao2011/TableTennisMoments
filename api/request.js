var {param2query} = require("@/common/utils.js")
function request(api, param, data){
	// 请求拦截处理
	return new Promise(function(resolve, reject){
		uni.request({
		url: api.url + param2query(param),
		method: api.type,
		data: data,
		success: res => {
			// 响应拦截处理
			
			
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

module.exports = {
	request
}