var mockjs = require("better-mock/dist/mock.mp.js")

import apiDesc from "@/api/desc.js";
import error from "@/api/error.js"
import blog from "./data/blog.js";
import data from "./data/data.js"

export default [{
		api: apiDesc.recommend.list,
		response: config=>{
			let {query, headers} = config;
			if(query.refresh){
				blog.randomRecomends();
			}
			let pageItemCount = 20;
			let pageIndex = query.pageIndex || 0;
			pageIndex %= 5;
			
			let page = data.getPageOf(blog.recommends, pageItemCount, pageIndex);
			return {
				...error.ok,
				...page
			};
		}
	}
]