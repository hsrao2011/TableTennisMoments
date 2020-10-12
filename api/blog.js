import apiDesc from "./desc.js"
import {request} from "./request.js"

function create(params){
	return request(apiDesc.blog.create, params);
}

export default {
	create
}