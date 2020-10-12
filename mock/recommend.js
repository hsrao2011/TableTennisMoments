import apiDesc from "../api/desc.js";
var mockjs = require("better-mock/dist/mock.mp.js")
import microBlogs from "./data/microblogs.js";
import users from "./data/users.js";

var recommends = [];
for(var i = 0; i < 100; i++){
	var blogIndex = mockjs.Random.integer(0, microBlogs.length-1);
	var userId = microBlogs[blogIndex].userId;
	var user = users.find((item)=>{
		if(item.id == userId){
			return item;
		}
	})
	recommends[i] = {
		type:"micro-blog",
		data:{content:microBlogs[blogIndex].content,images:microBlogs[blogIndex].images},
		user:user
	};
}

export default [{
		api: apiDesc.recommend.list,
		response: config=>{
			if(config.query.refresh){
				recommends = recommends.sort(()=>Math.random()-0.5)
			}
			var pageItemCount = 20;
			var pageIndex = config.query.pageIndex || 0;
			pageIndex %= 5;
			
			var recommendList = recommends.filter((item,index)=>
				index >= pageIndex * pageItemCount 
				&& index < (pageIndex + 1) * pageItemCount);
			return {
				code: 0,
				items: recommendList
			};
		}
	}
]