import apiDesc from "./desc.js"
import {request} from "./request.js"

function createPost(data){
	return request({api: apiDesc.blog.createPost, data: data});
}
function createActicle(data){
	return request({api: apiDesc.blog.createActicle, data: data});
}
function createShortVideo(data){
	return request({api: apiDesc.blog.createShortVideo, data: data});
}

export default {
	createPost,
	createActicle,
	createShortVideo
}