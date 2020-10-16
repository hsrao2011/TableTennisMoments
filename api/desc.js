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
			params: {content:"", images:[]}
		}
	},
	file:{
		uploadFile:{
			url: "/file/uploadFile",
			type: "post"
		}
	}
}