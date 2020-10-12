import apiDesc from "../api/desc.js";
import users from "./data/users.js";
import jwt from "../utils/jwt.js"

export default [{
		api: apiDesc.user.login,
		response: config=>{
			return {
				code: 0,
				token: jwt.createToken(1),
				refreshToken: jwt.createRefreshToken()
			};
		}
	}
]