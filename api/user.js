import apiDesc from "./desc.js";
import {request} from "./request.js";

function login(params){
	return request({api: apiDesc.user.login,
					params: params});
}

function logout(){
	return request({api: apiDesc.user.logout});
}

function refreshToken(){
	return request({api: apiDesc.user.refreshToken});
}

export default {
	login,
	logout,
	refreshToken
}