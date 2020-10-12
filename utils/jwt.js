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
	var payload = {code:error.ok.code};
	if(!token){
		payload.code = error.tokenNotExist.code;
	}else{
		try{
			var payload = {...payload,...jwt.verify(token, kSecret)};
		}catch(e){
			if(e.err == TokenExpiredError){
				payload.code = error.tokenExpired.code;
			}else if(e.err = JsonWebTokenError){
				payload.code = error.tokenInvalid.code;
			}
		}
	}
	return payload;
}

export default {
	createToken,
	createRefreshToken,
	parseToken
}
