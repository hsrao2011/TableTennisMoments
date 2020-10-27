import apiDesc from "./desc.js";
import {request} from "./request.js";

function getFollowUserList(params){
	return request({api: apiDesc.follow.listUser, params: params});
}

function getFollowBlogList(params){
	return request({api: apiDesc.follow.listBlog, params});
}

export default {
	getFollowUserList,
	getFollowBlogList
}