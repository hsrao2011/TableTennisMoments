import apiDesc from "./desc.js";
import {request} from "./request.js";

function getRecommendList(params){
	return request(apiDesc.recommend.list, params);
}

export default {
	getRecommendList
}