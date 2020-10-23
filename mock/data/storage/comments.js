var mockjs = require("better-mock/dist/mock.mp.js")


let comments =[];
function initComments(){
	let info = uni.getStorageInfoSync();
	let reg = new RegExp("^(comment_)");
	info.keys.forEach((key, index)=>{
		if(key.search(reg) == 0){
			try{
				let value = uni.getStorageSync(key);
				comments.push(JSON.parse(value));
			}catch(err){
				console.log(err);
			}
		}
	});
}

function saveComment({targetId, targetType, userId, content}){
	if(targetType != "blog")//目前只支持评论blog
		return error.errorParam;
	var prefix = "comment_";
	var key = prefix + utils.createGuid();
	var value = {id: comments.length, targetId, targetType, userId, content};
	value.date = mockjs.Random.now('MM-dd HH:mm')
	try {
	    uni.setStorageSync(key, JSON.stringify(value));
	} catch (err) {
	    var result = error.errorStorageSave;
		result.msg = JSON.stringify(err);
		return result;
	}
	comments.push(value);
	comment.updateComment(value);
	return error.ok;
}

(function(){
	initComments();
})();

export default {
	comments
}
