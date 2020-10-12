import api from "../../api/user.js";

var tokenStorage = {
	getTocken(){
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
	token: "",//tokenStorage.getTocken(),
	refreshToken: tokenStorage.getRefreshToken()
}

const mutations = {
	token(state, payload){
		state.token = payload.token;
	},
	refreshToken(state, payload){
		state.refreshToken = payload.refreshToken;
	}
}

const actions = {
	login({state,commit}, params){
		console.log(api);
		return api.login(params).then((res)=>{
			commit("token", res.data);
			commit("refreshToken", res.data);
			
			tokenStorage.setToken(state.token);
			tokenStorage.setRefreshToken(state.refreshToken);
		}).catch((e)=>{
			
		});
	},
	logout({commit}){
		tokenStorage.setToken();
		tokenStorage.setRefreshToken();
		
		commit("token", "")
		commit("refreshToken", "")
	}
}

export default {
	namespaced:true,
	state,
	mutations,
	actions
}