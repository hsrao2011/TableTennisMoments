import apiDesc from "../api/desc.js";
import users from "./data/users.js";
import error from "@/api/error.js"

export default [{
		api: apiDesc.blog.create,
		response: config=>{
			return error.ok;
		}
	}
]