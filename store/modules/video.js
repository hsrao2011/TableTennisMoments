
const state = {
	playPos:[], // [{videoId, pos}]
}
function findPlayPos(state, videoId){
	let playPos = null;
	state.playPos.some((item)=>{
		if(item.videoId == videoId){
			playPos = item;
			return true;
		}
		return false;
	})
	return playPos;
}
const mutations = {
	setPlayPos(state, payload){
		if(!payload)
			return;
		let playPos = findPlayPos(state, payload.videoId);
		if(!playPos){
			playPos = {videoId: payload.videoId, pos: payload.pos};
			state.playPos.push(playPos);
		}else{
			playPos.pos = payload.pos;
		}
	}
}

const getters = {
	playPos(state){
		return (videoId)=>{
			let playPos = findPlayPos(state, videoId);
			return playPos ? playPos.pos : 0;
		}
	}
}

export default {
	namespaced:true,
	state,
	mutations,
	getters
}
