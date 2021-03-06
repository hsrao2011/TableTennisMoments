// 自定义枚举类型
function CustomEnum(enums){
    for(let key in enums){
        this[key] = enums[key];
    }
    //Object.assign(this, enums);
    Object.freeze(this);
}
CustomEnum.prototype.some = function(value){
    for (const key in this) {
        if(this[key] == value)
            return true;
    }
    return false;
}

export let kBlogType = new CustomEnum({post: "post", acticle: "acticle", shortVideo:"short-video"});
export let kPlayState = new CustomEnum({stopped: 0, playing: 1, paused: 2});
export let kShortVideoGetThumbnailStage = new CustomEnum({none: 0, waitingTimer: 1, getting: 2, ready: 3});

