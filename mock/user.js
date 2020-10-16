import apiDesc from "@/api/desc.js";
import error from "@/api/error.js";
import users from "./data/users.js";
import jwt from "@/utils/jwt.js"

import postOfStorage from "./data/storage/posts.js"

export default [{
		api: apiDesc.user.login,
		response: config=> {
			return {
				...error.ok,
				token: jwt.createToken(1),
				refreshToken: jwt.createRefreshToken()
			};
		}
	},{
		api: apiDesc.user.logout,
		response: config=> {
			var { headers } = config;
			var payload = jwt.decodeToken(headers["x-token"]);
			if(payload.code == error.ok.code){
				console.log("server: user " + payload.userId + " 登出成功！");
			}else{
				console.log("server: " + payload.msg);
			}
			return {
				...error.ok,
			};
		}
	},{
		api: apiDesc.user.refreshToken,
		response: config=> {
			var payload = jwt.parseToken(config.headers["x-refresh-token"]);
			if(payload.code != error.ok.code){
				return payload;
			}
			return {
				...error.ok,
				token: jwt.createToken(1),
				refreshToken: jwt.createRefreshToken()
			}
		}
	},{
		api: apiDesc.user.getUserInfo,
		response: config=> {
			let userInfo = users[0];
			userInfo.blogsCount = postOfStorage.getDistributeCount(1);
			return {
				...error.ok,
				userInfo: userInfo
			}
		}
	}
]