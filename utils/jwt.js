var jwt = require('jsonwebtoken');
import error from "@/api/error.js"

const kSecret = "tabletennismoments";
const kExpireTime = 1 * 24 * 60 * 60;

function createToken(userId){
	return jwt.sign({userId:userId}, kSecret, { expiresIn: kExpireTime});
}

function createRefreshToken(){
	return jwt.sign({}, kSecret, { expiresIn: kExpireTime*2});
}

function parseToken(token){
	var payload = error.ok;
	if(!token){
		payload = error.tokenNotExist;
		payload.msg = "token verify: token不存在！";
	}else{
		try{
			var payload = {...payload, ...jwt.verify(token, kSecret)};
		}catch(err){
			if(err.name === "TokenExpiredError"){
				payload = error.tokenExpired;
			}else if(err.name === "JsonWebTokenError"){
				payload = error.tokenInvalid;
			}else{
				payload = error.tokenInvalid;
			}
			payload.msg = "token verify: " + err.message;
		}
	}
	return payload;
}

function decodeToken(token){
	var payload = error.ok;	
	if(!token){
		payload = error.error;
		payload.msg = "token decode: token不存在！";
	}else{
		try{
			payload = {...payload, ...jwt.decode(token)};
		}catch(err){
			payload = error.error;
			payload.msg = "token decode: " + err.message;
		}
	}
	return payload;
}

export default {
	createToken,
	createRefreshToken,
	parseToken,
	decodeToken
}
