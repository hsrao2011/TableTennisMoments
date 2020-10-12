var mockjs = require("better-mock/dist/mock.mp.js")
import utils from "@/utils/utils.js";

import recommend from "./recommend.js";
import user from "./user.js";
import blog from "./blog.js";

var mocks = [
	...recommend,
	...user,
	...blog
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  function XHR2ExpressReqWrap(response) {
    return function(request) {
      let result = null
      if (response instanceof Function) {
        const { url, headers, type, body } = request
        // https://expressjs.com/en/4x/api.html#req
        result = response({
          method: type,
		  headers: headers,
          body: JSON.parse(body),
          query: utils.param2Obj(url)
        })
      } else {
        result = response
      }
      return mockjs.mock(result)
    }
  }

  mocks.forEach( mock=> {
    mockjs.mock(new RegExp(mock.api.url), mock.api.type || 'get', XHR2ExpressReqWrap(mock.response))
  });
  mockjs.setup({timeout:'200-1000'});
}

export default {
  mocks,
  mockXHR
}
