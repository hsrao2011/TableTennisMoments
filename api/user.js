import apiDesc from "./desc.js";
import {request} from "./request.js";

function login(params){
	return request(apiDesc.user.login, params);
}

export default {
	login
}