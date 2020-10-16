import apiDesc from "../api/desc.js";
import error from "@/api/error.js"
import jwt from "@/utils/jwt.js"
import blogOfStorage from "./data/storage/blogs.js"
import {kBlogType} from "@/common/types.js"

export default [{
		api: apiDesc.blog.createPost,
		response: config=>{
			const { headers, body} = config
			var token = headers["x-token"];
			var payload = jwt.parseToken(token);
			if(payload.code != error.ok.code){
				return payload;
			}
			blogOfStorage.saveBlog(kBlogType.post, {
				userId: payload.userId,
				content: body.content,
				images: body.images
			})
			return error.ok;
		}
	},{
		api: apiDesc.blog.createActicle,
		response: config=>{
			const {headers, body} = config;
			var token = headers["x-token"];
			var payload = jwt.parseToken(token);
			if(payload.code != error.ok.code){
				return payload;
			}
			blogOfStorage.saveBlog(kBlogType.acticle, {
				userId: payload.userId,
				content: body.content
			})
			return error.ok;
		}
	}
]