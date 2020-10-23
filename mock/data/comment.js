var mockjs = require("better-mock/dist/mock.mp.js")
import commentOfStorage from "./storage/comments.js"
import users from "./users.js";

// 所有评论
let comments = [];
// 推荐数据
let kMaxCountOfComments = 60;
function initComments(){
	let i = 0;
	let tempComments = [...commentOfStorage.comments];
	tempComments.forEach((comment, index) => {
		var userId = comment.userId;
		var user = users.find((item)=>{
			if(item.id == userId){
				return item;
			}
		})
		if(!user){
			user = users[0];
		}
		comments[i++] = {
			data: comment,
			user: user
		};
	})
}
function updateComment(comment){
	var user = users.find((item)=>{
		if(item.id == comment.userId){
			return item;
		}
	})
	if(!user)
		return;
	let _comment = {data: comment, user: user};
	comments.push(_comment);
}

let commentsOfTarget= [];

function getCommentsOfTarget({targetId, targetType}){
	let _comments = [];
	commentsOfTarget.some((item)=>{
		if(item.targetId == targetId && item.targetType == targetType){
			_comments = item.comments;
			return true;
		}
		return false;
	})
	return _comments;
}

function getComments({targetId, targetType}){
	let _comments = [];
	if(targetType != "blog-comment")
		return _comments;
	
	_comments = getCommentsOfTarget({targetId, targetType});
	if(_comments.length)
		return _comments;
	
	comments.filter((comment, index) => {
		if(comment.data.targetId == targetId && 
		   comment.data.targetType == targetType){
		    _comments.push(comment);
			return true;	   
		}
		return false;
	});
	let mockCount = mockjs.Random.integer(0, kMaxCountOfComments -  _comments.length);
	for(let i = 0; i < mockCount; i++){
		let userIndex = mockjs.Random.integer(0, users.length-1);
		var user = users[userIndex];
		let _comment = {targetId, targetType};
		_comment.id = _comments.length;
		_comment.userId = user.id;
		_comment.content = mockjs.Random.cparagraph( 1, 7 );
		_comment.date = mockjs.Random.datetime('MM-dd HH:mm');
		_comments.push({
			data: _comment,
			user
		});
	}
	commentsOfTarget.push({targetId, targetType, comments: _comments});
	return _comments;
}

(function(){
	initComments();
})();

export default {
	getComments,
	updateComment
}

