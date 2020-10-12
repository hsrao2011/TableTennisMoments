/* 接口描述文档 */
export default {
	recommend: {// 推荐
		// 获取推荐列表
		list: {
			url: "/recommend/list",
			type: "get",
		}
	},
	user:{// 登录
		login:{
			url:"/user/login",
			type:"post"
		}
	},
	blog:{// 文章、微博或短视频
		create:{
			url:"/blog/create",
			type:"post"
		}
	}
}