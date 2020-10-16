import apiDesc from "./desc.js"
import {request} from "./request.js"

function createPost(data){
	return request({api: apiDesc.blog.createPost, data: data});
}

export default {
	createPost
}