var mockjs = require("better-mock/dist/mock.mp.js")
import blogOfStorage from "./storage/blogs.js"
import blogOfMock  from "./mock/blogs.js"
import users from "./users.js";
import follow from "./follow.js"

// 所有微文、文章、短视频数据
let blogs = [];
// 推荐数据
let kMaxCountOfrecommends = 100;
let recommends = [];
function initBlogs(){
	let i = 0;
	let tempBlogs = [...blogOfStorage.blogs, ...blogOfMock.blogs];
	tempBlogs.forEach((blog, index) => {
		var userId = blog.userId;
		var user = users.find((item)=>{
			if(item.id == userId){
				return item;
			}
		})
		if(!user){
			user = users[0];
		}
		blogs[i++] = {
			data: blog,
			user: user
		};
	})
}
function updateBlog(blog){
	var user = users.find((item)=>{
		if(item.id == blog.userId){
			return item;
		}
	})
	if(!user)
		return;
	let _blog = {data: blog, user: user};
	blogs.splice(0, 0, _blog);
	follow.updateBlog(_blog);
	randomPushRecommends(_blog);
}

function initRecommends(){
	recommends = [];
	if(blogs.length <= 0)
		return;
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

(function(){
	initBlogs();
	initRecommends();
})();

export default {
	updateBlog,
	randomRecomends,
	recommends,
	blogs
}