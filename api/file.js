import apiDesc from "./desc.js";

// 模拟上传文件流程，实际直接写在本地
function uploadFile(tempFilePath){
	console.log(tempFilePath);
	return new Promise((resolve, reject) => {
		uni.saveFile({
			tempFilePath: tempFilePath,
			success: (res) => {
				resolve(res.savedFilePath);
			},
			fail: (res)=>{
				console.log(res);
				reject(res);
			}
		})
	})
}

export default {
	uploadFile
}