var mockjs = require("better-mock/dist/mock.mp.js")

import apiDesc from "@/api/desc.js";
import error from "@/api/error.js"
import blog from "./data/blog.js";

export default [{
		api: apiDesc.recommend.list,
		response: config=>{
			if(config.query.refresh){
				blog.randomRecomends();
			}
			let pageItemCount = 20;
			let pageIndex = config.query.pageIndex || 0;
			pageIndex %= 5;
			
			let pageList = blog.getPageOf(blog.recommends, pageItemCount, pageIndex);
			return {
				...error.ok,
				items: pageList
			};
		}
	}
]