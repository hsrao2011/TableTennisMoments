var mockjs = require("better-mock/dist/mock.mp.js")
import postOfStorage from "./storage/posts.js"
import postOfMock  from "./mock/posts.js"
import users from "./users.js";

// 所有微文、文章、短视频数据
let blogs = [];
// 推荐数据
let kMaxCountOfrecommends = 100;
let recommends = [];
function initBlogs(){
	let i = 0;
	let tempPosts = [...postOfStorage.posts, ...postOfMock.posts];
	tempPosts.forEach((post, index) => {
		var userId = post.userId;
		var user = users.find((item)=>{
			if(item.id == userId){
				return item;
			}
		})
		if(!user){
			user = users[0];
		}
		blogs[i++] = {
			type: "post",
			data: post,
			user: user
		};
	})
}
function updatePost(post){
	var user = users.find((item)=>{
		if(item.id == post.userId){
			return item;
		}
	})
	if(!user)
		return;
	let blog = {type:"post", data: post, user: user};
	blogs.push(blog);
	randomPushRecommends(blog);
}

function initRecommends(){
	recommends = [];
	for(var i = 0; i < kMaxCountOfrecommends; i++){
		var blogIndex = mockjs.Random.integer(0, blogs.length-1);
		recommends[i] = blogs[blogIndex];
	}
}

function randomPushRecommends(blog){
	var blogIndex = mockjs.Random.integer(0, kMaxCountOfrecommends);
	recommends.splice(blogIndex, 0, blog);
}
function randomRecomends(){
	recommends = recommends.sort(()=>Math.random()-0.5)
}
function getPageOf(list, pageItemCount, pageIndex){
	var result = list.filter((item, index)=>
		index >= pageIndex * pageItemCount 
		&& index < (pageIndex + 1) * pageItemCount);
	return result;
}

(function(){
	initBlogs();
	initRecommends();
})();

export default {
	updatePost,
	randomRecomends,
	getPageOf,
	recommends
}