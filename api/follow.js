import apiDesc from "./desc.js";
import {request} from "./request.js";

function getFollowUserList(params){
	return request({api: apiDesc.follow.listUser, params: params});
}

function getFollowBlogList(){
	return request({api: apiDesc.follow.listBlog});
}

export default {
	getFollowUserList,
	getFollowBlogList
}