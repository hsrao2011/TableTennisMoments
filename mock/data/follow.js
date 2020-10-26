import users from "./users.js";
import blog from "./blog.js"
let _follows =[{
		id: 0,
		userId: 1,
		followUserId: 2
	},{
		id: 1,
		userId: 1,
		followUserId: 3
	},{
		id: 2,
		userId: 1,
		followUserId: 4
	},{
		id: 3,
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
function getfollowBlogListOfUser({userId}){
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
function getFollowBlogList({userId}){
	let list = [];
	list = getfollowBlogListOfUser({userId});
	if(list.length)
		return list;
	let blogs = blog.blogs;
	let follows = _follows.filter((item, index)=>{
		if(item.userId == userId)
			return true;
		return false;
	})
	let blogList = [];
	blogs.forEach((blog) => {
		let userId = blog.user.id;
		follows.some((follow)=>{
			if(userId == follow.followUserId){
				blogList.push(blog);
				return true;
			}
			return false;
		})
	})
	blogList.sort(function(a,b){
		return a.date > b.date;
	})
	followBlogListOfUser.push({userId, list: blogList});
	return blogList;
}

export default {
	getFollowUserList,
	getFollowBlogList
}