import apiDesc from "../api/desc.js";
import users from "./data/users.js";
import jwt from "../utils/jwt.js"

export default [{
		api: apiDesc.blog.create,
		response: config=>{
			var payload = jwt.parseToken(config.headers["x-token"]);
			return {
				code: payload.code
			};
		}
	}
]