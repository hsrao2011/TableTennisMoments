import apiDesc from "./desc.js"
import {request} from "./request.js"

function create(params){
	return request({api: apiDesc.blog.create, params: params});
}

export default {
	create
}