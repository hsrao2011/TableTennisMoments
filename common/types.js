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

