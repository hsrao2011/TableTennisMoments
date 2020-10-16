import apiDesc from "../api/desc.js";
import error from "@/api/error.js"
import jwt from "@/utils/jwt.js"
import postOfStorage from "./data/storage/posts.js"

export default [{
		api: apiDesc.blog.createPost,
		response: config=>{
			const { headers, body} = config
			var token = headers["x-token"];
			var payload = jwt.parseToken(token);
			if(payload.code != error.ok.code){
				return payload;
			}
			postOfStorage.savePost({
				userId: payload.userId,
				content: body.content,
				images: body.images
			})
			return error.ok;
		}
	}
]