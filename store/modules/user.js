import api from "@/api/user.js";
import error from "@/api/error.js"

var tokenStorage = {
	getToken(){
		try{
			return uni.getStorageSync("token");
		}
		catch(e){
			return "";
		}
	},
	setToken(token){
		try{
			if(token){
				uni.setStorageSync("token", token);
			}else{
				uni.removeStorageSync("token");
			}
		}
		catch(e){
		}
	},
	getRefreshToken(){
		try{
			return uni.getStorageSync("refresh-token");
		}
		catch(e){
			return "";
		}
	},
	setRefreshToken(token){
		try{
			if(token){
				uni.setStorageSync("refresh-token", token);
			}else{
				uni.removeStorageSync("refresh-token");
			}
		}
		catch(e){
		}
	}
}

const state = {
	token: tokenStorage.getToken(),
	refreshToken: tokenStorage.getRefreshToken(),
	userInfo: null
}
const getters = {
	isLogined(state){
		return !!state.token;
	}
}
const mutations = {
	setToken(state, payload){
		if(!payload)
			return;
		state.token = payload.token;
		state.refreshToken = payload.refreshToken;
		tokenStorage.setToken(state.token);
		tokenStorage.setRefreshToken(state.refreshToken);
	},
	resetToken(state){
		state.token = "";
		state.refreshToken = "";
		tokenStorage.setToken();
		tokenStorage.setRefreshToken();
	},
	setUserInfo(state, payload){
		if(payload)
			state.userInfo = payload.userInfo;
		else
			state.userInfo = null;
	},
	incrementBlogCount(state){
		if(state.userInfo)
			state.userInfo.blogsCount ++;
	}
}

const actions = {
	login({state, commit, dispatch}, params){
		if(state.token){
			return new Promise((resolve) => {
				resolve({data:error.ok});
			})
		}else{
			console.log("store: 开始登录...");
			return api.login(params).then((res)=>{
				commit("setToken", res.data);
				console.log("store: 登录成功！" + JSON.stringify(res.data));
				
				dispatch("getUserInfo");
			}).catch( err => {
				console.log("store: 登录失败: " + JSON.stringify(err.data));
				throw err;
			})
		}
	},
	logout({commit}){
		console.log("store: 开始登出...");
		return api.logout().then(res => {
			commit("resetToken");
			commit("setUserInfo");
			console.log("store: 登出成功！");
		}).catch(err => {
			commit("resetToken");
			commit("setUserInfo");
			console.log("store: 登出异常！");
		});
	},
	refreshToken({state, commit, dispatch}){
		console.log("store: 开始刷新token...");
		return api.refreshToken().then((res)=>{
			console.log("store: 刷新token成功！");
			commit("setToken", res.data);
		}).catch(err =>{
			console.log("store: 刷新token异常！" + JSON.stringify(err));
			dispatch("logout");
			throw err;
		});
	},
	getUserInfo({state, commit}){
		console.log("store: 开始获取用户信息...");
		return api.getUserInfo().then( res => {
			console.log("store: 获取用户信息成功");
			commit("setUserInfo", res.data);
		}).catch(err => {
			console.log("store: 获取用户信息失败");
			throw err;
		});
	}
}

export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}