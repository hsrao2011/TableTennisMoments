import apiDesc from "../api/desc.js";
import error from "@/api/error.js"
import jwt from "@/utils/jwt.js"
import commentOfStorage from "./data/storage/comments.js"
import comment from "./data/comment.js"
import data from "./data/data.js"

export default [{
		api: apiDesc.comment.list,
		response: config=>{
			const { query} = config
			let pageItemCount = 10;
			let pageIndex = config.query.pageIndex || 0;
			let comments = comment.getComments({targetId:query.targetId, targetType: query.targetType})
			let page = data.getPageOf(comments, pageItemCount, pageIndex);
			return {
				...error.ok,
				...page
			};
		}
	},{
		api: apiDesc.comment.create,
		response: config=>{
			const {headers, body} = config;
			var token = headers["x-token"];
			var payload = jwt.parseToken(token);
			if(payload.code != error.ok.code){
				return payload;
			}
			commentOfStorage.saveComment({
				userId: payload.userId,
				content: body.content,
				targetId: body.targetId,
				targetType: body.targetType
			})
			return error.ok;
		}
	}
]