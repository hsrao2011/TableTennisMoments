export default {
	ok:{
		code: 0,
		msg: "ok"
	},
	error: {
		code: -1,
		msg: "error"
	},
	errorStorageSave: {
		code: 1000,
		msg:  "save storage failed"
	},
	// 10000~10100 token错误
	tokenNotExist:{
		code: 10000,
		msg: "token不存在！"
	},
	tokenExpired:{
		code: 10001,
		msg: "token过期！"
	},
	tokenInvalid:{
		code: 10002,
		msg: "token无效！"
	}
}