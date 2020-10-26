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
		login: {
			url: "/user/login",
			type: "post"
		},
		logout: {
			url: "/user/logout",
			type: "post"
		},
		refreshToken: {
			url: "user/refreshToken",
			type: "post"
		},
		getUserInfo:{
			url: "/user/getUserInfo",
			type: "get",
			token: true
		}
	},
	blog:{// 文章、微文或短视频
		createPost:{//发布微文
			url:"/blog/createPost",
			type:"post",
			token: true,
			data: {content:"", images:[]}
		},
		createActicle:{// 发文章
			url: "/blog/createActicle",
			type: "post",
			token: true,
			data: {title:"标题", content:"delta", html:"", images:[]}
		},
		createShortVideo:{
			url: "/blog/createShortVideo",
			type: "post",
			token: true,
			data:{title:"标题", content:"videoUrl"}
		}
	},
	file:{
		uploadFile:{
			url: "/file/uploadFile",
			type: "post"
		}
	},
	comment:{
		list:{
			url: "/comment/list",
			type: "get",
			params: {targetId:"目标Id", targetType:"目标类型：blog, comment"}
		},
		create:{
			url: "/comment/create",
			type: "post",
			token: true,
			data: {targetId:"目标Id", targetType:"目标类型：blog, comment",
			content:"评价内容"}
		}
	},
	follow:{
		listUser:{
			url: "/follow/listUser",
			type: "get",
			token: true,
			params: {userId:"获取谁的关注列表"}
		},
		listBlog:{
			url: "/follow/listBlog",
			type: "get",
			token: true
		}
	}
}