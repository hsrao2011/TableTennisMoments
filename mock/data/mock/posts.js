var mockjs = require("better-mock/dist/mock.mp.js")

var _posts = [{
		content:"今天回办公室开会，关于泡泡赛和WTT澳门赛的很多媒体服务事宜。很激动，毕竟三月底以来就没回过办公室～一切都在慢慢恢复，希望就在前方。我们，加油！ ​​",
		images:["zhoudao_1.jpg"],
		userId: 2
	},{
		content:"",
		images:["zhoudao_2.jpg"],
		userId:2
	},{
		content:"这难道不是小胖在打小小胖？\
有没有跟我一样，觉得林诗栋很像小胖？！",
		images:["zhoudao_3.png","zhoudao_4.png"],
		userId:2
	},{
		content:"四个打进单打决赛的队员：大胖96年，曼昱99年，大头和莎莎都是00后。四个人面孔青涩稚嫩，球风沉稳老练，少年可畏，未来可期！（图片来源：乒乓世界）",
		images:["2438f0000eaf5c5f9f20f_tplv-obj_1280_929.jpg","2435e000132643aecb0d3_tplv-obj_1280_829.jpg","243ca00006934aad41b68_tplv-obj_1280_880.jpg","243c0000159bc808f58d8_tplv-obj_1080_768.jpg"],
		userId:2
	},{
		content:"2023年，我们德班🇿🇦见～",
		images:["c0c8881ed64e4c8a9497de4672c865a0_tplv-obj_1080_10592.jpg"],
		userId:3
	},{
		content:"1985年——1995年中国乒乓球队领队\
1995年——2014中国乒协副主席\
1995年——2009国际乒联技术委员会主席\
\
\"从儿童到老年人、从业余到专业、从爱好到职业、从运动员 - 教练员 - 中国乒协官员再到国际乒联官员！Table tennis. For all. For life!\"\
\
正在线上进行的国际乒联2020年度代表大会中，姚振绪荣获国际乒联荣誉会员。\
\
姚振绪老先生在会上用英文发表了主题为“乒乓球是我的生命”感言，中国乒协主席刘国梁对他的获奖表达了祝贺。他表示：“十分感谢国际乒联、世界乒乓球大家庭对姚先生和中国 乒协工作的高度支持与肯定。未来，中国乒协将更多地参与国际事务，也希望能为大家提供更多的支持和帮助。”\
\
恭喜 #姚振绪荣获国际乒联荣誉会员#！",
		images:["f0713da929ed4039a7295e339ba6ad77_tplv-obj_3726_2946.jpg","aa76469af38b46a3b35d8c1266153ef8_tplv-obj_3024_3528.jpg","afa2b422fd02453f8cc482e013bd4815_tplv-obj_1080_1373.jpg"],
		userId:3
	},{
		content:"#猜猜这是谁# [思考]",
		images:["ea256a41d6944c738c86e0afa4bb8043_tplv-obj_1280_960.jpg"],
		userId:3
	},{
		content:"周末早上的我们 😴",
		images:["10237ca6034441bc8a48a58fcdd95827_tplv-obj_1368_912.jpg"],
		userId:3
	},{
		content:"WTT世乒联将在2021年上半年在中东、中国和欧洲分别举办三个赛事汇。",
		images:["4de6f2f27cee41188d39a181d5f3bb13_tplv-obj_1176_8362.jpg"],
		userId:3
	},{
		content:"乒乓快乐多～韩国队教练金泽洙分享2018年和队员的欢乐合影 [马思纯的微笑]",
		images:["db067935f0c74b7997bb28526e212804_tplv-obj_1065_609.jpg"],
		userId:3
	},{
		content:"#看图说话# 这是场上发生了什么情况？[思考]",
		images:["003ae6594c64439fa6f045d0c48cc79d_tplv-obj_1600_1066.jpg","ce6b22adbff24c848f4979add655e56a_tplv-obj_1368_912.jpg","da3d18352e0a4afa8979841dfd5d1803_tplv-obj_1600_1066.jpg","3d0f71ebc2a045d3af8d05c778a576aa_tplv-obj_1600_1066.jpg"],
		userId:3
	},{
		content:"倒计时1天！乒乓全锦赛28支战队，奥力给💪",
		images:["7047737e72f146009c9fb965c5079db0_tplv-obj_750_1334.webp"],
		userId:4
	},{
		content:"夜深了！转播、体展、后勤保障团队的工作人员们还在紧张忙碌着……",
		images:["e37dfab8a39c4c80b84e7ccc8d43fdba_tplv-obj_1440_1080.webp"],
		userId:4
	},{
		content:"日本大阪漫画家画的乒乓选手画象，你们觉得怎么样？",
		images:["8b7d8fd0d3004ac69b6dd6580b668491_tplv-obj_737_1116.webp"],
		userId:5
	},{
		content:"13年全运会比赛，现在想想还是记忆犹新啊！",
		images:["797e6fe8d68a4db7a9edadea17e39c91_tplv-obj_1295_983.webp","3a2d5df5b8f64becadea0fa99f6d3599_tplv-obj_1622_964.webp"],
		userId:5
	}
]
let posts= [];
(function(){
	_posts.forEach((post)=>{
		let images = [];
		post.images.forEach((fileName)=>{
			images.push("/static/data/img/" + fileName);
		})
		post.images = images;
		posts.push(post)
	})
})();
export default {
	posts
}