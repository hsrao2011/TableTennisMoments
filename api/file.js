import apiDesc from "./desc.js";

// 模拟上传文件流程，实际直接写在本地
function uploadFile(tempFilePath, isVideo){
	console.log(tempFilePath);
	return new Promise((resolve, reject) => {
		// #ifdef H5
		// h5下不支持保存文件，所以模拟替换为固定文件
		if(isVideo){
			resolve("/static/data/upload/1.mp4");
		}else{
			resolve("/static/data/upload/1.jpg");
		}
		
		// #endif
		// #ifndef H5
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
		// #endif
	})
}

export default {
	uploadFile
}