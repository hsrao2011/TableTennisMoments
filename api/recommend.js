var apiDesc = require("./desc.js")
var {request} = require("./request.js")

export function getRecommendList(params){
	return request(apiDesc.recommend.list, params);
}