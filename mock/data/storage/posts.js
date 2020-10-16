import utils from "@/utils/utils.js"
import error from "@/api/error.js"
import blog from "../blog.js"

let posts = [];
function initPosts(){
	console.log("initPosts");
	let info = uni.getStorageInfoSync();
	let reg = new RegExp("^post_");
	info.keys.forEach((key, index)=>{
		if(key.search(reg) == 0){
			try{
				let value = uni.getStorageSync(key);
				posts.push(JSON.parse(value));
			}catch(err){
				console.log(err);
			}
		}
	});
}

function savePost({userId,	content, images}){
	var key = "post_" + utils.createGuid();
	var value = {userId: userId, content: content, images: images};
	console.log(value);
	try {
	    uni.setStorageSync(key, JSON.stringify(value));
	} catch (err) {
	    var result = error.errorStorageSave;
		result.msg = JSON.stringify(err);
		return result;
	}
	posts.push(value);
	blog.updatePost(value);
	return error.ok;
}

function getDistributeCount(userId){
	let total = posts.reduce((total, post)=>{
		if(post.userId == userId)
			return ++total;
	}, 0);
	return total;
}
(function(){
	initPosts();
})();

export default {
	savePost,
	posts,
	getDistributeCount
}