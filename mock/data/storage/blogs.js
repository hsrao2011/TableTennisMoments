import utils from "@/utils/utils.js"
import error from "@/api/error.js"
import blog from "../blog.js"
import {kBlogType} from "@/common/types.js"
let blogs = [];

function initBlogs(){
	let info = uni.getStorageInfoSync();
	let reg = new RegExp("^(" + kBlogType.post + "_|" + kBlogType.acticle + "_|" + kBlogType.shortVideo + "_)");
	//let reg = new RegExp("^(" + kBlogType.acticle + "_|" + kBlogType.shortVideo + "_)");
	info.keys.forEach((key, index)=>{
		if(key.search(reg) == 0){
			try{
				let value = uni.getStorageSync(key);
				blogs.push(JSON.parse(value));
			}catch(err){
				console.log(err);
			}
		}
	});
}

function saveBlog(type, {userId, title, content, html, images}){
	if(!kBlogType.some(type))
		return error.errorParam;
	var prefix = type + "_";
	var key = prefix + utils.createGuid();
	var value = {id: blogs.length, userId: userId, type: type, content: content};
	if(images && images.length > 0){
		value.images = images;
	}
	if(title && title.length > 0){
		value.title = title;
	}
	if(html && html.length > 0){
		value.html = html;
	}
	try {
	    uni.setStorageSync(key, JSON.stringify(value));
	} catch (err) {
	    var result = error.errorStorageSave;
		result.msg = JSON.stringify(err);
		return result;
	}
	blogs.push(value);
	blog.updateBlog(value);
	return error.ok;
}

function getBlogCountofUser(userId){
	let total = blogs.reduce((total, post)=>{
		if(post.userId == userId)
			return ++total;
	}, 0);
	return total;
}
(function(){
	initBlogs();
})();

export default {
	saveBlog,
	blogs,
	getBlogCountofUser
}