import users from "./users.js";
import blogjs from "./blog.js"
let _follows =[{
		id: 1,
		userId: 1,
		followUserId: 2
	},{
		id: 2,
		userId: 1,
		followUserId: 3
	},{
		id: 3,
		userId: 1,
		followUserId: 4
	},{
		id: 4,
		userId: 1,
		followUserId: 5
	}
]

function getFollowUserList({userId}){
	let follows = _follows.filter((item, index)=>{
		if(item.userId == userId)
			return true;
		return false;
	})
	follows.push()
	let followUserList = [];
	follows.forEach((follow, index) =>{
		var user = users.find((item)=>{
			if(item.id == follow.followUserId){
				return item;
			}
		})
		if(!user){
			user = users[0];
		}
		followUserList.push({user})
	});
	
	return followUserList;
}

let followBlogListOfUser = [];
function getFollowBlogListOfUser({userId}){
	let list = [];
	followBlogListOfUser.some((item)=>{
		if(item.userId == userId){
			list = item.list;
			return true;
		}
		return false;
	})
	return list;
}
function getFollowBlogList({userId, refresh}){
	let list = [];
	if(!refresh){
		list = getFollowBlogListOfUser({userId});
		if(list.length)
			return list;
	}
	let blogs = blogjs.blogs;
	let follows = _follows.filter((item, index)=>{
		if(item.userId == userId)
			return true;
		return false;
	})
	follows.push({id: 0, userId: userId, followUserId: userId});
	
	let blogList = [];
	blogs.forEach((item) => {
		let itemUserId = item.user.id;
		follows.some((follow)=>{
			if(itemUserId == follow.followUserId){
				blogList.push(item);
				return true;
			}
			return false;
		})
	})
	blogList.sort(function(a,b){
		return a.data.date > b.data.date;
	})
	followBlogListOfUser.push({userId, list: blogList});
	return blogList;
}
function updateBlog(blog){
	let list = [];
	list = getFollowBlogList({userId: 1});
	if(list){
		list.some((item,index,arr)=>{
			if(item.data.id == blog.data.id){
				arr.splice(index,1);
				return true;
			}
			return false;
		})
		list.splice(0, 0, blog)
	}	
}
export default {
	getFollowUserList,
	getFollowBlogList,
	updateBlog
}