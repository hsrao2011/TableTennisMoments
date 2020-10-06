var mockjs = require("better-mock/dist/mock.mp.js")
const { param2Obj } = require("@/common/utils.js")

var  recommend = require("./recommend.js")

var mocks = [
	...recommend
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  function XHR2ExpressReqWrap(response) {
    return function(request) {
      let result = null
      if (response instanceof Function) {
        const { body, type, url } = request
        // https://expressjs.com/en/4x/api.html#req
        result = response({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
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

module.exports = {
  mocks,
  mockXHR
}
