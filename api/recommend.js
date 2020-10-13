import apiDesc from "./desc.js";
import {request} from "./request.js";

function getRecommendList(params){
	return request({api: apiDesc.recommend.list, params: params});
}

export default {
	getRecommendList
}