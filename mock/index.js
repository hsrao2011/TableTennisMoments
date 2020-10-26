var mockjs = require("better-mock/dist/mock.mp.js")

import utils from "@/utils/utils.js";
import jwt from "@/utils/jwt.js"
import error from "@/api/error.js"

import recommend from "./recommend.js";
import user from "./user.js";
import blog from "./blog.js";
import comment from "./comment.js";
import follow from "./follow.js"

var mocks = [
	...recommend,
	...user,
	...blog,
	...comment,
	...follow
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).

var appMocks = [];

function mockXHR() {
	function XHR2ExpressReqWrap(mock) {
		return function(request) {
			let result = null
			if(mock.api.token){
				const { headers } = request
				var payload = jwt.parseToken(headers["x-token"]);
				if(payload.code != error.ok.code){
					result = payload;
					return mockjs.mock(result)
				}
			}
			if (mock.response instanceof Function) {
				const { url, type, body, headers} = request
					// https://expressjs.com/en/4x/api.html#req
				result = mock.response({
				  method: type,
				  headers: headers,
				  query: utils.param2Obj(url),
				  body: body
				});
			} else {
				result = response
			}
			return mockjs.mock(result)
		}
	}
	mocks.forEach( mock=> {
		mockjs.mock(new RegExp(mock.api.url), mock.api.type || 'get', XHR2ExpressReqWrap(mock))
		appMocks.push({reg: new RegExp(mock.api.url), method: mock.api.type || 'get', response: XHR2ExpressReqWrap(mock)})
	});
	mockjs.setup({timeout:'200-1000'});
}

function mockRequest(params){
	appMocks.some(mock => {
		if(params.url.search(mock.reg) != -1){
			if(mock.method === params.method){
				let data = mock.response({url: params.url, 
							type: mock.method,
							body: params.data,
							headers: params.header
							});
				if(params.success){
					setTimeout(()=>{
						params.success({statusCode: 200,
							header:{},
							data: data
							});
					}, mockjs.Random.integer(200,1000));
					
				};
				return true;
			}
		}
		return false;
	})
}

export default {
  mocks,
  mockXHR,
  mockRequest
}
