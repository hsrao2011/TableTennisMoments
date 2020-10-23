import apiDesc from "./desc.js";
import {request} from "./request.js";

function getCommentList(params){
	return request({api: apiDesc.comment.list, params: params});
}

export default {
	getCommentList
}