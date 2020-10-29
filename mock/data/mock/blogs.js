var mockjs = require("better-mock/dist/mock.mp.js")

var _blogs = [{
		id: 0,
		content:"今天回办公室开会，关于泡泡赛和WTT澳门赛的很多媒体服务事宜。很激动，毕竟三月底以来就没回过办公室～一切都在慢慢恢复，希望就在前方。我们，加油！ ​​",
		images:["zhoudao_1.jpg"],
		userId: 2,
		type:"post",
	},{
		id: 1,
		content:"",
		images:["zhoudao_2.jpg"],
		userId:2,
		type:"post"
	},{
		id: 2,
		content:"这难道不是小胖在打小小胖？\
有没有跟我一样，觉得林诗栋很像小胖？！",
		images:["zhoudao_3.png","zhoudao_4.png"],
		userId:2,
		type:"post"
	},{
		id: 3,
		content:"四个打进单打决赛的队员：大胖96年，曼昱99年，大头和莎莎都是00后。四个人面孔青涩稚嫩，球风沉稳老练，少年可畏，未来可期！（图片来源：乒乓世界）",
		images:["2438f0000eaf5c5f9f20f_tplv-obj_1280_929.jpg","2435e000132643aecb0d3_tplv-obj_1280_829.jpg","243ca00006934aad41b68_tplv-obj_1280_880.jpg","243c0000159bc808f58d8_tplv-obj_1080_768.jpg"],
		userId:2,
		type:"post"
	},{
		id: 4,
		content:"2023年，我们德班🇿🇦见～",
		images:["c0c8881ed64e4c8a9497de4672c865a0_tplv-obj_1080_10592.jpg"],
		userId:3,
		type:"post"
	},{
		id: 5,
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
		userId:3,
		type:"post"
	},{
		id: 6,
		content:"#猜猜这是谁# [思考]",
		images:["ea256a41d6944c738c86e0afa4bb8043_tplv-obj_1280_960.jpg"],
		userId:3,
		type:"post"
	},{
		id: 7,
		content:"周末早上的我们 😴",
		images:["10237ca6034441bc8a48a58fcdd95827_tplv-obj_1368_912.jpg"],
		userId:3,
		type:"post"
	},{
		id: 8,
		content:"WTT世乒联将在2021年上半年在中东、中国和欧洲分别举办三个赛事汇。",
		images:["4de6f2f27cee41188d39a181d5f3bb13_tplv-obj_1176_8362.jpg"],
		userId:3,
		type:"post"
	},{
		id: 9,
		content:"乒乓快乐多～韩国队教练金泽洙分享2018年和队员的欢乐合影 [马思纯的微笑]",
		images:["db067935f0c74b7997bb28526e212804_tplv-obj_1065_609.jpg"],
		userId:3,
		type:"post"
	},{
		id: 10,
		content:"#看图说话# 这是场上发生了什么情况？[思考]",
		images:["003ae6594c64439fa6f045d0c48cc79d_tplv-obj_1600_1066.jpg","ce6b22adbff24c848f4979add655e56a_tplv-obj_1368_912.jpg","da3d18352e0a4afa8979841dfd5d1803_tplv-obj_1600_1066.jpg","3d0f71ebc2a045d3af8d05c778a576aa_tplv-obj_1600_1066.jpg"],
		userId:3,
		type:"post"
	},{
		id: 11,
		content:"倒计时1天！乒乓全锦赛28支战队，奥力给💪",
		images:["7047737e72f146009c9fb965c5079db0_tplv-obj_750_1334.webp"],
		userId:4,
		type:"post"
	},{
		id: 12,
		content:"夜深了！转播、体展、后勤保障团队的工作人员们还在紧张忙碌着……",
		images:["e37dfab8a39c4c80b84e7ccc8d43fdba_tplv-obj_1440_1080.webp"],
		userId:4,
		type:"post"
	},{
		id: 13,
		content:"日本大阪漫画家画的乒乓选手画象，你们觉得怎么样？",
		images:["8b7d8fd0d3004ac69b6dd6580b668491_tplv-obj_737_1116.webp"],
		userId:5,
		type:"post"
	},{
		id: 14,
		content:"13年全运会比赛，现在想想还是记忆犹新啊！",
		images:["797e6fe8d68a4db7a9edadea17e39c91_tplv-obj_1295_983.webp","3a2d5df5b8f64becadea0fa99f6d3599_tplv-obj_1622_964.webp"],
		userId:5,
		type:"post"
	},/*{
		id: 15,
		title: "老当益壮，七十三岁的大爷，没有几个人能打得过",
		type: "short-video",
		content: "/static/data/upload/5A29D483EE423E8C6F4EA8FA6C50DB47.mp4",
		userId: 3
	},*/{
		id: 16,
		type: "acticle",
		userId: 3,
		content: "{\"ops\":[{\"attributes\":{\"bold\":true},\"insert\":\"石川佳纯轻快靓丽来华参赛，湾省参赛者出行，穿戴严密好像去美国\"},{\"insert\":\"\\n11月将至，参加2020乒乓球世界杯的外国选手们已陆续来华。生命可贵，防疫与隔离工作是重中之重。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556147910.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556147910.jpg\"}},{\"insert\":\"\\n具体流程虽然没有公示，但从石川佳纯、张本智和、韩莹、波尔卡诺娃等球员不断透露的信息来看，已经可以拼出“一张全景图”。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556148001.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556148001.jpg\"}},{\"insert\":\"\\n国乒与组委会的防疫隔离与转场安排，细致周到，严格而又温馨，太不容易啦。\\n日本体育媒体透露：参赛运动员飞到中国，先在上海隔离3天，然后再乘坐10多个小时的专门防疫大巴到山东威海，隔离8天。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556148042.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556148042.jpg\"}},{\"insert\":\"\\n与日本选手石川佳纯的轻车简从明快靓丽相比，中国台湾省队的郑怡静和陈思羽，怕是对神州大陆的优秀防疫工作有什么误会。从湾省动身时那严实的全身包裹，怕是去美国才需要吧？！\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556148073.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556148073.jpg\"}},{\"insert\":\"\\n图：参赛球员抵达威海，工作人员仔细对行李喷洒消毒。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556148094.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556148094.jpg\"}},{\"insert\":\"\\n参赛选手波尔卡诺娃，用小视频分享了威海隔离酒店的住宿条件：12小时的大巴，抵达！我房间觉得很棒，有两张床、2台电视。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556148125.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556148125.jpg\"}},{\"insert\":\"\\n图：德国奥恰洛夫千里迢迢，在莫斯科胶囊旅馆的自拍。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556148156.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556148156.jpg\"}},{\"insert\":\"\\n图：德国女队长青之花韩莹，在上海至威海的专用隔离大巴上。她对中国乒协准备的随身健身包，也是赞不绝口。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556148197.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556148197.jpg\"}},{\"insert\":\"\\n出发前的张本智和，在远程新闻发布会中表示：休赛期间，他特意向WBA世界超最轻量级拳王佐藤修请教过拳击，锤炼了自己的步法，提高了反手和移动能力。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038556148218.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038556148218.jpg\"}},{\"insert\":\"\\n对于来中国参赛，张本智和准备了不少日本全农的食品，应对不时之需。（注：这可真是想多了，中国美食应有尽有，中国人民又极为好客）\\n乒乓网 胡清源\\n\\n\\n\"}]}",
		title: "外国球员陆续来华，世界杯防疫消毒隔离全流程曝光，国乒安排严格",
		html: "<p><strong>石川佳纯轻快靓丽来华参赛，湾省参赛者出行，穿戴严密好像去美国</strong></p><p>11月将至，参加2020乒乓球世界杯的外国选手们已陆续来华。生命可贵，防疫与隔离工作是重中之重。</p><p><img src=\"/static/data/upload/16038556147910.jpg\" data-local=\"/static/data/upload/16038556147910.jpg\" alt=\"图像\"></p><p>具体流程虽然没有公示，但从石川佳纯、张本智和、韩莹、波尔卡诺娃等球员不断透露的信息来看，已经可以拼出“一张全景图”。</p><p><img src=\"/static/data/upload/16038556148001.jpg\" data-local=\"/static/data/upload/16038556148001.jpg\" alt=\"图像\"></p><p>国乒与组委会的防疫隔离与转场安排，细致周到，严格而又温馨，太不容易啦。</p><p>日本体育媒体透露：参赛运动员飞到中国，先在上海隔离3天，然后再乘坐10多个小时的专门防疫大巴到山东威海，隔离8天。</p><p><img src=\"/static/data/upload/16038556148042.jpg\" data-local=\"/static/data/upload/16038556148042.jpg\" alt=\"图像\"></p><p>与日本选手石川佳纯的轻车简从明快靓丽相比，中国台湾省队的郑怡静和陈思羽，怕是对神州大陆的优秀防疫工作有什么误会。从湾省动身时那严实的全身包裹，怕是去美国才需要吧？！</p><p><img src=\"/static/data/upload/16038556148073.jpg\" data-local=\"/static/data/upload/16038556148073.jpg\" alt=\"图像\"></p><p>图：参赛球员抵达威海，工作人员仔细对行李喷洒消毒。</p><p><img src=\"/static/data/upload/16038556148094.jpg\" data-local=\"/static/data/upload/16038556148094.jpg\" alt=\"图像\"></p><p>参赛选手波尔卡诺娃，用小视频分享了威海隔离酒店的住宿条件：12小时的大巴，抵达！我房间觉得很棒，有两张床、2台电视。</p><p><img src=\"/static/data/upload/16038556148125.jpg\" data-local=\"/static/data/upload/16038556148125.jpg\" alt=\"图像\"></p><p>图：德国奥恰洛夫千里迢迢，在莫斯科胶囊旅馆的自拍。</p><p><img src=\"/static/data/upload/16038556148156.jpg\" data-local=\"/static/data/upload/16038556148156.jpg\" alt=\"图像\"></p><p>图：德国女队长青之花韩莹，在上海至威海的专用隔离大巴上。她对中国乒协准备的随身健身包，也是赞不绝口。</p><p><img src=\"/static/data/upload/16038556148197.jpg\" data-local=\"/static/data/upload/16038556148197.jpg\" alt=\"图像\"></p><p>出发前的张本智和，在远程新闻发布会中表示：休赛期间，他特意向WBA世界超最轻量级拳王佐藤修请教过拳击，锤炼了自己的步法，提高了反手和移动能力。</p><p><img src=\"/static/data/upload/16038556148218.jpg\" data-local=\"/static/data/upload/16038556148218.jpg\" alt=\"图像\"></p><p>对于来中国参赛，张本智和准备了不少日本全农的食品，应对不时之需。（注：这可真是想多了，中国美食应有尽有，中国人民又极为好客）</p><p>乒乓网 胡清源</p><p><br></p><p><br></p>",
		images: [
			"/static/data/upload/16038556147910.jpg",
			"/static/data/upload/16038556148001.jpg",
			"/static/data/upload/16038556148042.jpg",
			"/static/data/upload/16038556148073.jpg",
			"/static/data/upload/16038556148094.jpg",
			"/static/data/upload/16038556148125.jpg",
			"/static/data/upload/16038556148156.jpg",
			"/static/data/upload/16038556148197.jpg",
			"/static/data/upload/16038556148218.jpg"
		]
	},{
		id: 17,
		title: "成都市职工比赛(第四赛区)",
		type: "short-video",
		content: "/static/data/upload/82D74E3954EE09BCB956ECC4D9C75B9A.mp4",
		userId: 5
	},{
		id: 18,
		type: "acticle",
		userId: 4,
		content: "{\"ops\":[{\"insert\":\"很多打球的朋友在平时的训练或者比赛中，有时会觉得自己明明已经用了很大的力量，但是打过去的球总是软绵绵的，缺乏穿透力。\\n其实这是没有掌握正确的发力结构，这也是专业选手和业余爱好者的一大区别。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038534907140.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038534907140.jpg\"}},{\"insert\":\"\\n许昕\\n今天我们就来聊一下怎么协调身体发力，拉出高质量的弧圈球。\\n我们平时在拉球，看似是在用手拉球，用手发力，其实并不是，手臂只是起到一个中介作用，把你通过蹬腿转腰所产生的力量传达到拍上，就像很多教练在教学生的时候，总是在强调鞭打式发力，我们的手就像鞭子一样，把球甩出去。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038534907181.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038534907181.jpg\"}},{\"insert\":\"\\n许昕\\n首先我们引拍的时候，要学会用身体去引拍，我们通过转腰胯把身体的重心压在持拍脚上，持拍手随着身体的重心转移摆动，引到适当的位置。\\n完成引板后，我们往前蹬腿，同时我们的胯往前顶，注意这个时候手是处于放松状态的，先不要往前手，等身体回正后，我们的小臂就顺势往前收。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038534907212.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038534907212.jpg\"}},{\"insert\":\"\\n樊振东\\n完成收臂后，小臂随着身体重心的转移再次进行引拍，在整个正手击球的过程中，上半身除了击球的瞬间小臂有一紧，突然刹住的动作外，其他过程都要保持放松的状态。但是下半身要时刻保持绷紧的状态。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038534907243.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038534907243.jpg\"}},{\"insert\":\"\\n马龙\\n\"}]}",
		title: "乒乓球正手拉球总是软绵绵？学一下这个发力结构，让你实力涨球",
		html: "<p>很多打球的朋友在平时的训练或者比赛中，有时会觉得自己明明已经用了很大的力量，但是打过去的球总是软绵绵的，缺乏穿透力。</p><p>其实这是没有掌握正确的发力结构，这也是专业选手和业余爱好者的一大区别。</p><p><img src=\"/static/data/upload/16038534907140.jpg\" data-local=\"/static/data/upload/16038534907140.jpg\" alt=\"图像\"></p><p>许昕</p><p>今天我们就来聊一下怎么协调身体发力，拉出高质量的弧圈球。</p><p>我们平时在拉球，看似是在用手拉球，用手发力，其实并不是，手臂只是起到一个中介作用，把你通过蹬腿转腰所产生的力量传达到拍上，就像很多教练在教学生的时候，总是在强调鞭打式发力，我们的手就像鞭子一样，把球甩出去。</p><p><img src=\"/static/data/upload/16038534907181.jpg\" data-local=\"/static/data/upload/16038534907181.jpg\" alt=\"图像\"></p><p>许昕</p><p>首先我们引拍的时候，要学会用身体去引拍，我们通过转腰胯把身体的重心压在持拍脚上，持拍手随着身体的重心转移摆动，引到适当的位置。</p><p>完成引板后，我们往前蹬腿，同时我们的胯往前顶，注意这个时候手是处于放松状态的，先不要往前手，等身体回正后，我们的小臂就顺势往前收。</p><p><img src=\"/static/data/upload/16038534907212.jpg\" data-local=\"/static/data/upload/16038534907212.jpg\" alt=\"图像\"></p><p>樊振东</p><p>完成收臂后，小臂随着身体重心的转移再次进行引拍，在整个正手击球的过程中，上半身除了击球的瞬间小臂有一紧，突然刹住的动作外，其他过程都要保持放松的状态。但是下半身要时刻保持绷紧的状态。</p><p><img src=\"/static/data/upload/16038534907243.jpg\" data-local=\"/static/data/upload/16038534907243.jpg\" alt=\"图像\"></p><p>马龙</p>",
		images: [
			"/static/data/upload/16038534907140.jpg",
			"/static/data/upload/16038534907181.jpg",
			"/static/data/upload/16038534907212.jpg",
			"/static/data/upload/16038534907243.jpg"
		]
	},{
		id: 19,
		type: "acticle",
		userId: 5,
		content: "{\"ops\":[{\"insert\":\"每个想自己粘拍子的球友都会更种参考评判，只是为了能根据自己的打法配到性价比和手感都最佳的球拍。\\n\\n以下这些搭配方法是错误的，你知道吗？\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038562011410.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038562011410.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"【一】成品拍底板+套胶\"},{\"insert\":\"\\n\\n初学者大都是用成品拍度过了很长的时间，这段时间内，他们对乒乓球产生了浓厚的兴趣，并决定进一步发展它，在不想大量资金投入的情况下只能选择在原来的基础上加配一块套胶，可是这样的配置是错误的。\\n\\n因为成品拍的性能非常的差，导致没有力量的同时也没有速度。加配套胶后严重影响手感，底板的性能被掩盖，同时也影响了套胶性能的发挥。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038562011491.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038562011491.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"【二】重型碳板+硬质套胶\"},{\"insert\":\"\\n\\n业余高手的手感好，控制能力强，当软板不能满足他们的进攻速度后，他们就会换硬质的底版，这样可以弥补自身发力的不足。但是他们同样会选择硬质套胶，这样的搭配就会造成吃球不足，而速度有余。重型碳板加硬质套胶，这样的搭配会让业余选手在比赛中失误严重增多。所以这种配置是错误的搭配。\\n\\n技术全面你就会最大限度的减少输球。而特长突出你就会最大限度的赢球。这样打起球来才能发挥一技之长，才有战胜对手的优势，最终克敌制胜。选择器材的时候也应该这样。\\n\\n选择器材的时候我们至少明白两个问题：第一喜欢什么类型的器材。二是坚决不能用什么类型的器材。这也是球拍配置的前提。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038562011522.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038562011522.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"【三】单桧+传统套胶\"},{\"insert\":\"\\n\\n单桧底板十足的力量与弹性浓缩于一个“喷”字。但是国内众多使用者都是使用狂飙套胶，多数选手都是无论什么底版都配狂飙。但是桧的最佳搭配是内能套胶，而这些套胶多数都是外国生产。\\n\\n国套硬度好、手感死、桧木弹性向外传递的通道被封闭，胶面的粘性又降低了出球速度，这些都与喷射的性能背道而驰。单桧的优越性能被掩盖，也违背了我们用单桧的最初目的。所以这种配置方案也是错误的。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038562011553.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038562011553.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"【四】软板+软胶\"},{\"insert\":\"\\n\\n软板+软胶是非常不合适的球拍配置方案。因为形变大的软板，力量很大，速度却比较慢，需要很大的体力和比较快速的步法。专业的运动员应该选择软底版+硬套胶，这样在有力量的同时，速度也能得到保证，而且手感清晰。\\n\\n业余选手不会配置球拍，所以多会把软板配上软套胶。这样的配置非常耗费体力，而且很多人反手都是摩擦的状态。反撕并不是很多。100%发力几乎不可能，所以硬质套胶，用起来还是很不错的。另外就是国人打球的时间多，手感建立的比较扎实。所以狂飙对我们来说控制起来不是很难。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038562011604.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038562011604.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"【五】超厚放反手\"},{\"insert\":\"\\n\\n进口套胶在国内多见MAX版本，这些MAX的海绵厚度往往是2.2MM甚至更厚。目前国内乒乓球运动员反手用外套颇为流行，于是种种MAX也被放到了反手。力量不足，选择较硬的七夹板或纤维板来弥补是可行的，应注意海绵厚度的影响。\\n\\n把MAX用于发力能力相对较强的正手，问题不大。但MAX如果放在反手，很容易打不透板，手感模糊不清，使不出劲来，“闷”住了球板的力量，性能大打折扣，2.2MM以上的MAX更不适合业余选手放在反手。其实，只要选薄一点的海绵，就容易打透、借上球板的力道，手感立刻就清晰敏锐了。\\n\\n\\n\"}]}",
		title: "这么搭配底板和胶皮是错的，业余乒乓球选手必看",
		html: "<p>每个想自己粘拍子的球友都会更种参考评判，只是为了能根据自己的打法配到性价比和手感都最佳的球拍。</p><p><br></p><p>以下这些搭配方法是错误的，你知道吗？</p><p><img src=\"/static/data/upload/16038562011410.jpg\" data-local=\"/static/data/upload/16038562011410.jpg\" alt=\"图像\"></p><p><strong>【一】成品拍底板+套胶</strong></p><p><br></p><p>初学者大都是用成品拍度过了很长的时间，这段时间内，他们对乒乓球产生了浓厚的兴趣，并决定进一步发展它，在不想大量资金投入的情况下只能选择在原来的基础上加配一块套胶，可是这样的配置是错误的。</p><p><br></p><p>因为成品拍的性能非常的差，导致没有力量的同时也没有速度。加配套胶后严重影响手感，底板的性能被掩盖，同时也影响了套胶性能的发挥。</p><p><img src=\"/static/data/upload/16038562011491.jpg\" data-local=\"/static/data/upload/16038562011491.jpg\" alt=\"图像\"></p><p><strong>【二】重型碳板+硬质套胶</strong></p><p><br></p><p>业余高手的手感好，控制能力强，当软板不能满足他们的进攻速度后，他们就会换硬质的底版，这样可以弥补自身发力的不足。但是他们同样会选择硬质套胶，这样的搭配就会造成吃球不足，而速度有余。重型碳板加硬质套胶，这样的搭配会让业余选手在比赛中失误严重增多。所以这种配置是错误的搭配。</p><p><br></p><p>技术全面你就会最大限度的减少输球。而特长突出你就会最大限度的赢球。这样打起球来才能发挥一技之长，才有战胜对手的优势，最终克敌制胜。选择器材的时候也应该这样。</p><p><br></p><p>选择器材的时候我们至少明白两个问题：第一喜欢什么类型的器材。二是坚决不能用什么类型的器材。这也是球拍配置的前提。</p><p><img src=\"/static/data/upload/16038562011522.jpg\" data-local=\"/static/data/upload/16038562011522.jpg\" alt=\"图像\"></p><p><strong>【三】单桧+传统套胶</strong></p><p><br></p><p>单桧底板十足的力量与弹性浓缩于一个“喷”字。但是国内众多使用者都是使用狂飙套胶，多数选手都是无论什么底版都配狂飙。但是桧的最佳搭配是内能套胶，而这些套胶多数都是外国生产。</p><p><br></p><p>国套硬度好、手感死、桧木弹性向外传递的通道被封闭，胶面的粘性又降低了出球速度，这些都与喷射的性能背道而驰。单桧的优越性能被掩盖，也违背了我们用单桧的最初目的。所以这种配置方案也是错误的。</p><p><img src=\"/static/data/upload/16038562011553.jpg\" data-local=\"/static/data/upload/16038562011553.jpg\" alt=\"图像\"></p><p><strong>【四】软板+软胶</strong></p><p><br></p><p>软板+软胶是非常不合适的球拍配置方案。因为形变大的软板，力量很大，速度却比较慢，需要很大的体力和比较快速的步法。专业的运动员应该选择软底版+硬套胶，这样在有力量的同时，速度也能得到保证，而且手感清晰。</p><p><br></p><p>业余选手不会配置球拍，所以多会把软板配上软套胶。这样的配置非常耗费体力，而且很多人反手都是摩擦的状态。反撕并不是很多。100%发力几乎不可能，所以硬质套胶，用起来还是很不错的。另外就是国人打球的时间多，手感建立的比较扎实。所以狂飙对我们来说控制起来不是很难。</p><p><img src=\"/static/data/upload/16038562011604.jpg\" data-local=\"/static/data/upload/16038562011604.jpg\" alt=\"图像\"></p><p><strong>【五】超厚放反手</strong></p><p><br></p><p>进口套胶在国内多见MAX版本，这些MAX的海绵厚度往往是2.2MM甚至更厚。目前国内乒乓球运动员反手用外套颇为流行，于是种种MAX也被放到了反手。力量不足，选择较硬的七夹板或纤维板来弥补是可行的，应注意海绵厚度的影响。</p><p><br></p><p>把MAX用于发力能力相对较强的正手，问题不大。但MAX如果放在反手，很容易打不透板，手感模糊不清，使不出劲来，“闷”住了球板的力量，性能大打折扣，2.2MM以上的MAX更不适合业余选手放在反手。其实，只要选薄一点的海绵，就容易打透、借上球板的力道，手感立刻就清晰敏锐了。</p><p><br></p><p><br></p>",
		images: [
			"/static/data/upload/16038562011410.jpg",
			"/static/data/upload/16038562011491.jpg",
			"/static/data/upload/16038562011522.jpg",
			"/static/data/upload/16038562011553.jpg",
			"/static/data/upload/16038562011604.jpg"
		]
	},{
		id: 20,
		type: "acticle",
		userId: 3,
		content: "{\"ops\":[{\"insert\":\"#3岁女孩哭着打乒乓球精准接球#一段3岁八个月小女孩子一边叉腰嚎啕大哭，一边坚持挥拍准确接回乒乓球的视频互联网刷屏，个个球都准确打中回球的。萌娃她爸表示“学习乒乓球是女儿自己的兴趣和选择，有的时候孩子只是训练累了，想退缩，只希望能教会她坚持。”通过打乒乓球锻炼培养孩子的意志力。是的，好的兴趣爱好，是需要意志和坚持才能获得好的成绩，为这位小女孩子和萌爸点赞。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038572647450.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038572647450.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"一、意志，是需要不断充电的\"},{\"insert\":\"\\n意志，其实就像手机电池，是会被消耗的，需要不断重复充电。刷屏视频中的小女孩叉腰嚎啕大哭也能准确打回每一个乒乓球，说明她是爱这项运动的，正如萌爸表示“她有点累了，就想退缩。”这就是小女孩子的意志消耗，所以就想退缩了，这也能理解。也说明孩子意志不坚定，萌爸也是为了磨练小孩意志力而为之。\\n现在很多孩子都过上优渥的生活，动不动就会做出过激行为，孩子意志品质的培养必然要排上日程上。\\n而孩子的意志力是需要培养的，需要从娃娃抓起。什么活动可以磨练孩子的意志呢？体育活动就是最佳选项！锻炼孩子意志的运动多到不胜枚举，乒乓球就是其中一个，对孩子意志进行训练是一个不错的选择。\\n\\n下面@吴一钶将给你分享磨练孩子意志的方法……\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038572647531.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038572647531.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"二、意志，会被哪些因素消耗掉\"},{\"insert\":\"\\n●考试\\n●战胜恐惧\\n●拒绝诱惑\\n●压抑情感\\n●防止冲动\\n●培养新习惯\\n●做不喜欢的事\\n●尝试引起他人的注意\\n●选择长期或短期奖励\\n●在长期回报和短期利益间做选择\\n……，还有更多！\\n家长，当你知道孩子意志力薄弱的原因，是什么因素会消磨掉孩子的意志力时，磨练孩子意志的工作就从此刻开始对症下药，进行孩子意志力培养。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038572647572.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038572647572.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"三、作为父母，怎样培养孩子的坚强意志\"},{\"insert\":\"\\n吴一钶曾阅读过一本《10种培养孩子意志力的方法》，书中分享了10种方法，这10种方法都是从孩子日常生活场景中锻炼孩子的意志力。看完这本书后发现，现在在网上找到的分享关于意志力培养的文章，大部分都是这本书里的观点，从这本书中抽几个重要的点分享出来，内容都离不开这本书的观点和内容。\\n在吴一钶看来，10方法都太复杂了，运用起来不方便，因为很多时候在某一生活场景中，你会不记得用上这10种方法或其中一个。吴一钶给你的建议是：你只需要坚持让孩子做好三件事，就能让孩子验证“有志者事竟成”的内涵，收获坚持就是胜利的好结果。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038572647603.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038572647603.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"1、重复做一件最重要的事——意志培养\"},{\"insert\":\"\\n从孩子兴趣出发，挖掘孩子兴趣所在，在孩子想做的事情上，去做一件最重要的事（兴趣项目），从中培养出孩子的意志。如何挖掘孩子的兴趣？\\n给孩子阅读或讲名人成长故事，让孩子找到人生方向，种下目标的苗子。\\n比如，邓亚萍，从小酷爱打乒乓球，由于身材矮小、手腿精短而被拒于国家队，但她并没有气馁，而是把失败转化了动力，重复做一件最重要的事——苦练球技，终于站上世界冠军的领奖台。邓亚萍共夺得了18枚世界冠军奖牌。\\n家长，吴一钶告诉你：只要你有意让孩子重复做一件最重要的事，让意志带领孩子前行，就能培养出孩子的意志力。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038572647634.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038572647634.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"2、把意志培养成习惯——自律培养\"},{\"insert\":\"\\n让孩子在意志支持的基础上，每天有意识地定时、定点、定地、定量去做一件有兴趣的事（自己想做的事），随着时间的推移就能把这个意志培养成习惯，这就是自律。\\n你看那些获得世界冠军的运动员，哪一个不是接受严格的训练才能获得成就。都每天有意识地定时、定点、定地、定量重复去做的结果。\\n家长，吴一钶告诉你：意志是会被消耗的，需要把意志培养成一种行为习惯，经过刻意练习成为自我管理的纪律，自律即养成。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038572647665.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038572647665.jpg\"}},{\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"3、每天自律去做一件最重要的事——坚持养成\"},{\"insert\":\"\\n一件孩子感兴趣的事持之以恒地日复一日去做，365天是怎样结果呢？如果是3650天又是怎样的结果呢？\\n很多父母每当看着娃累了，受苦了就不忍心，就主动向孩子发出放弃的信号了，久而久之，助长孩子意志品质差做什么都没信心了，没有把培养孩子的意志力必要性重视起来。想起钢琴演奏家郎朗曾在回忆录里也曾说过“小时候练琴，都是被爸爸迫着练的。”看看郎朗今天的成绩不难发现，父母在孩子兴趣中培养孩子意志品质的重要性起到的重要作用。\\n家长，吴一钶告诉你：自律不是获得成功的必要条件，你需要做的是用自律这一行为，让孩子长期去做一件他感兴趣的事，这就是坚持。\\n\"},{\"attributes\":{\"alt\":\"图像\",\"data-local\":\"/static/data/upload/16038572647686.jpg\"},\"insert\":{\"image\":\"/static/data/upload/16038572647686.jpg\"}},{\"insert\":\"\\n结 语：\\n在日益激烈竞争的社会态势下，培养孩子意志品质的重要性无需多言。意志是可以培养和加固的，想孩子通过意志力加持下，做一件感兴趣的事获得有所成就，诀窍就是：拒绝一切干扰，长期规律地刻意训练孩子。#聪明孩子养成记##0-6岁育儿经#\\n\\n以上内容是吴一钶为家长分享的亲子教11: 54: 17.625 育心得， 吴一钶15年育儿、 亲子沟通互动经验， 将带着你一起看电影学育儿。 如果你面临跟孩子无法沟通， 或怎么说孩子才会听之类的问题， 你的问题我有解； 更多精彩内容持续更新中！\\ n\"}]}",
		title: "吴一钶：3岁萌娃叉腰大哭精准打回乒乓球，如何锻炼孩子意志力",
		html: "<p>#3岁女孩哭着打乒乓球精准接球#一段3岁八个月小女孩子一边叉腰嚎啕大哭，一边坚持挥拍准确接回乒乓球的视频互联网刷屏，个个球都准确打中回球的。萌娃她爸表示“学习乒乓球是女儿自己的兴趣和选择，有的时候孩子只是训练累了，想退缩，只希望能教会她坚持。”通过打乒乓球锻炼培养孩子的意志力。是的，好的兴趣爱好，是需要意志和坚持才能获得好的成绩，为这位小女孩子和萌爸点赞。</p><p><img src=\"/static/data/upload/16038572647450.jpg\" data-local=\"/static/data/upload/16038572647450.jpg\" alt=\"图像\"></p><p><strong>一、意志，是需要不断充电的</strong></p><p>意志，其实就像手机电池，是会被消耗的，需要不断重复充电。刷屏视频中的小女孩叉腰嚎啕大哭也能准确打回每一个乒乓球，说明她是爱这项运动的，正如萌爸表示“她有点累了，就想退缩。”这就是小女孩子的意志消耗，所以就想退缩了，这也能理解。也说明孩子意志不坚定，萌爸也是为了磨练小孩意志力而为之。</p><p>现在很多孩子都过上优渥的生活，动不动就会做出过激行为，孩子意志品质的培养必然要排上日程上。</p><p>而孩子的意志力是需要培养的，需要从娃娃抓起。什么活动可以磨练孩子的意志呢？体育活动就是最佳选项！锻炼孩子意志的运动多到不胜枚举，乒乓球就是其中一个，对孩子意志进行训练是一个不错的选择。</p><p><br></p><p>下面@吴一钶将给你分享磨练孩子意志的方法……</p><p><img src=\"/static/data/upload/16038572647531.jpg\" data-local=\"/static/data/upload/16038572647531.jpg\" alt=\"图像\"></p><p><strong>二、意志，会被哪些因素消耗掉</strong></p><p>●考试</p><p>●战胜恐惧</p><p>●拒绝诱惑</p><p>●压抑情感</p><p>●防止冲动</p><p>●培养新习惯</p><p>●做不喜欢的事</p><p>●尝试引起他人的注意</p><p>●选择长期或短期奖励</p><p>●在长期回报和短期利益间做选择</p><p>……，还有更多！</p><p>家长，当你知道孩子意志力薄弱的原因，是什么因素会消磨掉孩子的意志力时，磨练孩子意志的工作就从此刻开始对症下药，进行孩子意志力培养。</p><p><img src=\"/static/data/upload/16038572647572.jpg\" data-local=\"/static/data/upload/16038572647572.jpg\" alt=\"图像\"></p><p><strong>三、作为父母，怎样培养孩子的坚强意志</strong></p><p>吴一钶曾阅读过一本《10种培养孩子意志力的方法》，书中分享了10种方法，这10种方法都是从孩子日常生活场景中锻炼孩子的意志力。看完这本书后发现，现在在网上找到的分享关于意志力培养的文章，大部分都是这本书里的观点，从这本书中抽几个重要的点分享出来，内容都离不开这本书的观点和内容。</p><p>在吴一钶看来，10方法都太复杂了，运用起来不方便，因为很多时候在某一生活场景中，你会不记得用上这10种方法或其中一个。吴一钶给你的建议是：你只需要坚持让孩子做好三件事，就能让孩子验证“有志者事竟成”的内涵，收获坚持就是胜利的好结果。</p><p><img src=\"/static/data/upload/16038572647603.jpg\" data-local=\"/static/data/upload/16038572647603.jpg\" alt=\"图像\"></p><p><strong>1、重复做一件最重要的事——意志培养</strong></p><p>从孩子兴趣出发，挖掘孩子兴趣所在，在孩子想做的事情上，去做一件最重要的事（兴趣项目），从中培养出孩子的意志。如何挖掘孩子的兴趣？</p><p>给孩子阅读或讲名人成长故事，让孩子找到人生方向，种下目标的苗子。</p><p>比如，邓亚萍，从小酷爱打乒乓球，由于身材矮小、手腿精短而被拒于国家队，但她并没有气馁，而是把失败转化了动力，重复做一件最重要的事——苦练球技，终于站上世界冠军的领奖台。邓亚萍共夺得了18枚世界冠军奖牌。</p><p>家长，吴一钶告诉你：只要你有意让孩子重复做一件最重要的事，让意志带领孩子前行，就能培养出孩子的意志力。</p><p><img src=\"/static/data/upload/16038572647634.jpg\" data-local=\"/static/data/upload/16038572647634.jpg\" alt=\"图像\"></p><p><strong>2、把意志培养成习惯——自律培养</strong></p><p>让孩子在意志支持的基础上，每天有意识地定时、定点、定地、定量去做一件有兴趣的事（自己想做的事），随着时间的推移就能把这个意志培养成习惯，这就是自律。</p><p>你看那些获得世界冠军的运动员，哪一个不是接受严格的训练才能获得成就。都每天有意识地定时、定点、定地、定量重复去做的结果。</p><p>家长，吴一钶告诉你：意志是会被消耗的，需要把意志培养成一种行为习惯，经过刻意练习成为自我管理的纪律，自律即养成。</p><p><img src=\"/static/data/upload/16038572647665.jpg\" data-local=\"/static/data/upload/16038572647665.jpg\" alt=\"图像\"></p><p><strong>3、每天自律去做一件最重要的事——坚持养成</strong></p><p>一件孩子感兴趣的事持之以恒地日复一日去做，365天是怎样结果呢？如果是3650天又是怎样的结果呢？</p><p>很多父母每当看着娃累了，受苦了就不忍心，就主动向孩子发出放弃的信号了，久而久之，助长孩子意志品质差做什么都没信心了，没有把培养孩子的意志力必要性重视起来。想起钢琴演奏家郎朗曾在回忆录里也曾说过“小时候练琴，都是被爸爸迫着练的。”看看郎朗今天的成绩不难发现，父母在孩子兴趣中培养孩子意志品质的重要性起到的重要作用。</p><p>家长，吴一钶告诉你：自律不是获得成功的必要条件，你需要做的是用自律这一行为，让孩子长期去做一件他感兴趣的事，这就是坚持。</p><p><img src=\"/static/data/upload/16038572647686.jpg\" data-local=\"/static/data/upload/16038572647686.jpg\" alt=\"图像\"></p><p>结 语：</p><p>在日益激烈竞争的社会态势下，培养孩子意志品质的重要性无需多言。意志是可以培养和加固的，想孩子通过意志力加持下，做一件感兴趣的事获得有所成就，诀窍就是：拒绝一切干扰，长期规律地刻意训练孩子。#聪明孩子养成记##0-6岁育儿经#</p><p><br></p><p>以上内容是吴一钶为家长分享的亲子教育心得，吴一钶15年育儿、亲子沟通互动经验，将带着你一起看电影学育儿。如果你面临跟孩子无法沟通，或怎么说孩子才会听之类的问题，你的问题我有解；更多精彩内容持续更新中！</p>",
		images: [
			"/static/data/upload/16038572647450.jpg",
			"/static/data/upload/16038572647531.jpg",
			"/static/data/upload/16038572647572.jpg",
			"/static/data/upload/16038572647603.jpg",
			"/static/data/upload/16038572647634.jpg",
			"/static/data/upload/16038572647665.jpg",
			"/static/data/upload/16038572647686.jpg"
		]
	}
]
let blogs= [];
(function(){
	_blogs.forEach((blog)=>{
		if(blog.images){
			let images = [];
			blog.images.forEach((fileName)=>{
				if(fileName.search("/static/") < 0)
					images.push("/static/data/img/" + fileName);
				else
					images.push(fileName);
			})
			blog.images = images;
		}
		let dateString = mockjs.Random.datetime('y-MM-dd HH:mm:ss');
		blog.date = new Date(Date.parse(dateString.replace(/-/g,"/")));
		blogs.push(blog)
	})
})();
export default {
	blogs
}