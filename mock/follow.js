import apiDesc from "../api/desc.js";
import error from "@/api/error.js"
import jwt from "@/utils/jwt.js"
import data from "./data/data.js"
import follow from "./data/follow.js";

export default [{
		api: apiDesc.follow.listUser,
		response: config=>{
			let {query, headers} = config;
			
			let followUsers = follow.getFollowUserList({userId: query.userId})
			return {
				...error.ok,
				items: followUsers
			};
		}
	},{
		api: apiDesc.follow.listBlog,
		response: config=>{
			let {query, headers} = config;
			var token = headers["x-token"];
			var payload = jwt.parseToken(token);
			if(payload.code != error.ok.code){
				return payload;
			}
			let refresh = query.refresh || false;
			let followBlogs = follow.getFollowBlogList({userId: payload.userId, refresh})
			
			let pageIndex = Number.parseInt(query.pageIndex) || 0;
			let page = data.getPageOf(followBlogs, 15, pageIndex);
			return {
				...error.ok,
				...page
			};
		}
	}
]